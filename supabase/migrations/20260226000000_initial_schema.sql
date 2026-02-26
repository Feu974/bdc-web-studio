-- ============================================================
-- BDC Web Studio - Schema initial
-- Kap Numerik Revenue Operations Pipeline
-- Migration: 20260226000000_initial_schema
-- ============================================================
-- REGLES FEDER INVIOLABLES encodees dans ce schema :
--   1. Signature Devis INTERDITE avant reception AR Region
--   2. Demarrage Production INTERDIT avant acompte 50% + delai 5 jours
--   3. Toute transition d'etat est auditee et irreversible
-- ============================================================

-- ============================================================
-- 1. EXTENSIONS
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- 2. CUSTOM TYPES (ENUMS)
-- ============================================================

-- 9 etapes coeur du Kap Numerik + etats terminaux
CREATE TYPE project_status AS ENUM (
  'lead_captured',            -- 1. Lead capte via formulaire
  'dossier_deposited',        -- 2. Dossier FEDER depose
  'awaiting_ar_region',       -- 3. Attente Accuse de Reception Region
  'ar_received',              -- 4. AR Region recu
  'quote_sent',               -- 5. Devis envoye au client
  'quote_signed',             -- 6. Devis signe (INTERDIT avant etape 4)
  'awaiting_deposit',         -- 7. Attente acompte 50%
  'deposit_received',         -- 8. Acompte 50% recu
  'production_in_progress',   -- 9. Production demarree (delai 5j apres etape 8)
  'production_completed',     -- Livraison terminee
  'final_invoiced',           -- Facture solde emise
  'closed',                   -- Dossier cloture avec succes
  'cancelled',                -- Dossier annule
  'on_hold'                   -- Dossier suspendu
);

CREATE TYPE company_size AS ENUM ('tpe', 'pme', 'eti', 'ge');

CREATE TYPE budget_range AS ENUM (
  'moins_2k',   -- < 2 000 EUR
  '2k_5k',      -- 2 000 - 5 000 EUR
  '5k_10k',     -- 5 000 - 10 000 EUR
  'plus_10k'    -- > 10 000 EUR
);

CREATE TYPE document_type AS ENUM (
  'devis',
  'facture_acompte',
  'facture_solde',
  'cgv',
  'bon_commande',
  'pv_recette'
);

CREATE TYPE user_role AS ENUM ('admin', 'commercial', 'production', 'readonly');

-- ============================================================
-- 3. HELPER FUNCTIONS
-- ============================================================

-- Verifie si l'utilisateur courant est admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Verifie si l'utilisateur courant a un role specifique
CREATE OR REPLACE FUNCTION has_role(required_role user_role)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = required_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Verifie si l'utilisateur courant est authentifie avec un role quelconque
CREATE OR REPLACE FUNCTION is_team_member()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Fonction auto-update de updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 4. TABLES
-- ============================================================

-- -----------------------------------------------
-- 4.1 USER ROLES (controle d'acces interne)
-- -----------------------------------------------
CREATE TABLE user_roles (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role       user_role NOT NULL DEFAULT 'readonly',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- -----------------------------------------------
-- 4.2 LEADS (donnees du EligibilityForm)
-- -----------------------------------------------
CREATE TABLE leads (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Identite
  name                    TEXT NOT NULL,
  company                 TEXT NOT NULL,
  siret                   TEXT,  -- 14 chiffres, optionnel a la capture
  email                   TEXT NOT NULL,
  phone                   TEXT NOT NULL,
  -- Qualification
  company_size            company_size NOT NULL,
  budget_range            budget_range NOT NULL,
  message                 TEXT,
  -- Conformite
  consent_given           BOOLEAN NOT NULL DEFAULT FALSE,
  consent_given_at        TIMESTAMPTZ,
  -- Tracking
  source                  TEXT DEFAULT 'eligibility_form',
  utm_source              TEXT,
  utm_medium              TEXT,
  utm_campaign            TEXT,
  ip_address              INET,  -- Pour anti-fraude uniquement
  -- Conversion
  converted_to_project_id UUID,  -- FK ajoutee apres creation table projects
  converted_at            TIMESTAMPTZ,
  -- Meta
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------
-- 4.3 PROJECTS (Pipeline Kap Numerik)
-- -----------------------------------------------
CREATE TABLE projects (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id                   UUID NOT NULL REFERENCES leads(id) ON DELETE RESTRICT,
  -- Client (copie denormalisee du lead pour autonomie du dossier)
  client_name               TEXT NOT NULL,
  client_company            TEXT NOT NULL,
  client_email              TEXT NOT NULL,
  client_phone              TEXT NOT NULL,
  client_siret              TEXT,
  -- Etat du dossier (STATE MACHINE)
  status                    project_status NOT NULL DEFAULT 'lead_captured',
  -- FEDER / Kap Numerik
  feder_dossier_number      TEXT,
  feder_dossier_deposited_at TIMESTAMPTZ,
  ar_region_reference       TEXT,
  ar_region_received_at     TIMESTAMPTZ,
  -- Devis
  quote_amount_ht           NUMERIC(10,2),  -- Montant total HT
  feder_coverage_rate       NUMERIC(5,4) DEFAULT 0.5000,  -- Taux couverture FEDER (50%)
  feder_amount_ht           NUMERIC(10,2),  -- Montant pris en charge FEDER
  remaining_charge_ht       NUMERIC(10,2),  -- Reste a charge client (800 EUR HT standard)
  tva_rate                  NUMERIC(5,4) DEFAULT 0.2000,  -- TVA 20%
  quote_sent_at             TIMESTAMPTZ,
  quote_signed_at           TIMESTAMPTZ,
  quote_valid_until         DATE,
  -- Facturation
  deposit_amount_ht         NUMERIC(10,2),  -- Acompte 50% du reste a charge
  deposit_received_at       TIMESTAMPTZ,
  deposit_payment_method    TEXT,
  final_invoice_amount_ht   NUMERIC(10,2),
  final_invoice_sent_at     TIMESTAMPTZ,
  final_invoice_paid_at     TIMESTAMPTZ,
  -- Production
  assigned_subcontractor_id UUID,  -- FK ajoutee apres creation table subcontractors
  production_started_at     TIMESTAMPTZ,
  production_deadline       TIMESTAMPTZ,
  production_completed_at   TIMESTAMPTZ,
  deliverable_url           TEXT,
  -- Cloture
  pv_recette_signed_at      TIMESTAMPTZ,
  closed_at                 TIMESTAMPTZ,
  cancellation_reason       TEXT,
  -- Notes internes
  internal_notes            TEXT,
  -- Meta
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- FK lead -> project (conversion)
ALTER TABLE leads
  ADD CONSTRAINT fk_leads_converted_project
  FOREIGN KEY (converted_to_project_id)
  REFERENCES projects(id) ON DELETE SET NULL;

-- -----------------------------------------------
-- 4.4 SUBCONTRACTORS (Modele Dropservicing)
-- -----------------------------------------------
CREATE TABLE subcontractors (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Identite
  name             TEXT NOT NULL,
  company          TEXT NOT NULL,
  email            TEXT NOT NULL UNIQUE,
  phone            TEXT,
  siret            TEXT,
  -- Competences
  specialties      TEXT[] DEFAULT '{}',
  hourly_rate_ht   NUMERIC(10,2),
  -- Statut
  is_active        BOOLEAN NOT NULL DEFAULT TRUE,
  -- Score qualite agrege (mis a jour par trigger)
  quality_score    NUMERIC(4,2) DEFAULT 0.00,  -- 0.00 a 10.00
  total_projects   INTEGER DEFAULT 0,
  -- Meta
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- FK project -> subcontractor
ALTER TABLE projects
  ADD CONSTRAINT fk_projects_subcontractor
  FOREIGN KEY (assigned_subcontractor_id)
  REFERENCES subcontractors(id) ON DELETE SET NULL;

-- -----------------------------------------------
-- 4.5 QUALITY SCORES (Zero Defect - 7 criteres)
-- -----------------------------------------------
CREATE TABLE quality_scores (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subcontractor_id      UUID NOT NULL REFERENCES subcontractors(id) ON DELETE CASCADE,
  project_id            UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  -- 7 criteres Zero Defect (note sur 10)
  perf_score            SMALLINT NOT NULL CHECK (perf_score BETWEEN 0 AND 10),
  a11y_score            SMALLINT NOT NULL CHECK (a11y_score BETWEEN 0 AND 10),
  seo_score             SMALLINT NOT NULL CHECK (seo_score BETWEEN 0 AND 10),
  security_score        SMALLINT NOT NULL CHECK (security_score BETWEEN 0 AND 10),
  responsive_score      SMALLINT NOT NULL CHECK (responsive_score BETWEEN 0 AND 10),
  code_quality_score    SMALLINT NOT NULL CHECK (code_quality_score BETWEEN 0 AND 10),
  deadline_score        SMALLINT NOT NULL CHECK (deadline_score BETWEEN 0 AND 10),
  -- Score total calcule
  total_score           NUMERIC(4,2) GENERATED ALWAYS AS (
    (perf_score + a11y_score + seo_score + security_score
     + responsive_score + code_quality_score + deadline_score)::NUMERIC / 7.0
  ) STORED,
  -- Meta
  evaluated_by          UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  notes                 TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(subcontractor_id, project_id)
);

-- -----------------------------------------------
-- 4.6 PROJECT STATUS HISTORY (Audit trail)
-- -----------------------------------------------
CREATE TABLE project_status_history (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  previous_status project_status,
  new_status      project_status NOT NULL,
  changed_by      UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  metadata        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------
-- 4.7 DOCUMENTS (Pack Juridique genere)
-- -----------------------------------------------
CREATE TABLE documents (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  type          document_type NOT NULL,
  file_url      TEXT,
  file_name     TEXT,
  -- Signature electronique
  signed_at     TIMESTAMPTZ,
  signed_by     TEXT,
  signature_ref TEXT,  -- Reference du service de signature
  -- Generation
  template_version TEXT DEFAULT '1.0',
  generation_data  JSONB DEFAULT '{}',  -- Donnees injectees dans le template
  -- Meta
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 5. TRIGGERS & STATE MACHINE VALIDATION
-- ============================================================

-- -----------------------------------------------
-- 5.1 MATRICE DE TRANSITIONS VALIDES
-- -----------------------------------------------
CREATE OR REPLACE FUNCTION validate_project_status_transition()
RETURNS TRIGGER AS $$
DECLARE
  valid_transition BOOLEAN := FALSE;
BEGIN
  -- Si le statut n'a pas change, on laisse passer (update d'autres colonnes)
  IF OLD.status = NEW.status THEN
    RETURN NEW;
  END IF;

  -- Matrice de transitions autorisees
  valid_transition := CASE
    WHEN OLD.status = 'lead_captured'          AND NEW.status = 'dossier_deposited'       THEN TRUE
    WHEN OLD.status = 'dossier_deposited'      AND NEW.status = 'awaiting_ar_region'      THEN TRUE
    WHEN OLD.status = 'awaiting_ar_region'     AND NEW.status = 'ar_received'             THEN TRUE
    WHEN OLD.status = 'ar_received'            AND NEW.status = 'quote_sent'              THEN TRUE
    WHEN OLD.status = 'quote_sent'             AND NEW.status = 'quote_signed'            THEN TRUE
    WHEN OLD.status = 'quote_signed'           AND NEW.status = 'awaiting_deposit'        THEN TRUE
    WHEN OLD.status = 'awaiting_deposit'       AND NEW.status = 'deposit_received'        THEN TRUE
    WHEN OLD.status = 'deposit_received'       AND NEW.status = 'production_in_progress'  THEN TRUE
    WHEN OLD.status = 'production_in_progress' AND NEW.status = 'production_completed'    THEN TRUE
    WHEN OLD.status = 'production_completed'   AND NEW.status = 'final_invoiced'          THEN TRUE
    WHEN OLD.status = 'final_invoiced'         AND NEW.status = 'closed'                  THEN TRUE
    -- Transitions speciales
    WHEN NEW.status = 'cancelled' AND OLD.status NOT IN ('closed', 'cancelled')           THEN TRUE
    WHEN NEW.status = 'on_hold'   AND OLD.status NOT IN ('closed', 'cancelled', 'on_hold') THEN TRUE
    -- Reprise depuis on_hold (retour au statut precedent stocke en metadata)
    WHEN OLD.status = 'on_hold'   AND NEW.status NOT IN ('closed', 'cancelled')           THEN TRUE
    ELSE FALSE
  END;

  IF NOT valid_transition THEN
    RAISE EXCEPTION 'TRANSITION INVALIDE: % -> % interdit par la state machine Kap Numerik.',
      OLD.status, NEW.status;
  END IF;

  -- ============================================================
  -- REGLES FEDER INVIOLABLES
  -- ============================================================

  -- REGLE 1 : Devis INTERDIT avant AR Region
  IF NEW.status = 'quote_sent' AND NEW.ar_region_received_at IS NULL THEN
    RAISE EXCEPTION 'VIOLATION FEDER: Impossible d''envoyer le devis avant reception de l''AR Region. '
      'ar_region_received_at est NULL.';
  END IF;

  IF NEW.status = 'quote_signed' AND NEW.ar_region_received_at IS NULL THEN
    RAISE EXCEPTION 'VIOLATION FEDER: Impossible de signer le devis avant reception de l''AR Region.';
  END IF;

  -- REGLE 2 : Production INTERDITE avant acompte
  IF NEW.status = 'production_in_progress' AND NEW.deposit_received_at IS NULL THEN
    RAISE EXCEPTION 'VIOLATION FEDER: Impossible de demarrer la production avant reception de l''acompte 50%%.';
  END IF;

  -- REGLE 3 : Delai 5 jours entre acompte et production
  IF NEW.status = 'production_in_progress'
     AND NEW.deposit_received_at IS NOT NULL
     AND (NEW.deposit_received_at + INTERVAL '5 days') > NOW()
  THEN
    RAISE EXCEPTION 'VIOLATION FEDER: Delai de 5 jours obligatoire apres reception acompte. '
      'Acompte recu le %. Production autorisee a partir du %.',
      NEW.deposit_received_at::DATE,
      (NEW.deposit_received_at + INTERVAL '5 days')::DATE;
  END IF;

  -- Auto-set des timestamps selon transition
  CASE NEW.status
    WHEN 'production_in_progress' THEN
      NEW.production_started_at := COALESCE(NEW.production_started_at, NOW());
      -- Deadline par defaut : 30 jours ouvres
      NEW.production_deadline := COALESCE(NEW.production_deadline, NOW() + INTERVAL '45 days');
    WHEN 'production_completed' THEN
      NEW.production_completed_at := COALESCE(NEW.production_completed_at, NOW());
    WHEN 'closed' THEN
      NEW.closed_at := COALESCE(NEW.closed_at, NOW());
    ELSE
      -- Pas d'action automatique
      NULL;
  END CASE;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validate_project_status
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION validate_project_status_transition();

-- -----------------------------------------------
-- 5.2 AUDIT TRAIL AUTOMATIQUE
-- -----------------------------------------------
CREATE OR REPLACE FUNCTION log_project_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO project_status_history (project_id, previous_status, new_status, changed_by, metadata)
    VALUES (
      NEW.id,
      OLD.status,
      NEW.status,
      auth.uid(),
      jsonb_build_object(
        'ar_region_received_at', NEW.ar_region_received_at,
        'quote_signed_at', NEW.quote_signed_at,
        'deposit_received_at', NEW.deposit_received_at,
        'production_started_at', NEW.production_started_at
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_log_project_status
  AFTER UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION log_project_status_change();

-- -----------------------------------------------
-- 5.3 MISE A JOUR DU SCORE QUALITE SOUS-TRAITANT
-- -----------------------------------------------
CREATE OR REPLACE FUNCTION update_subcontractor_quality_score()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE subcontractors SET
    quality_score = (
      SELECT COALESCE(AVG(total_score), 0)
      FROM quality_scores
      WHERE subcontractor_id = NEW.subcontractor_id
    ),
    total_projects = (
      SELECT COUNT(*)
      FROM quality_scores
      WHERE subcontractor_id = NEW.subcontractor_id
    )
  WHERE id = NEW.subcontractor_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_update_quality_score
  AFTER INSERT OR UPDATE ON quality_scores
  FOR EACH ROW
  EXECUTE FUNCTION update_subcontractor_quality_score();

-- -----------------------------------------------
-- 5.4 AUTO UPDATE updated_at
-- -----------------------------------------------
CREATE TRIGGER trg_leads_updated_at
  BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_projects_updated_at
  BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_subcontractors_updated_at
  BEFORE UPDATE ON subcontractors FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_documents_updated_at
  BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- -----------------------------------------------
-- 5.5 WEBHOOK : Notification sur nouveau lead
-- -----------------------------------------------
-- Supabase Realtime + Database Webhooks
-- Ce trigger insere un evenement que Supabase Realtime peut broadcaster
-- et qu'un webhook externe (n8n, Make) peut consommer
CREATE OR REPLACE FUNCTION notify_new_lead()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify(
    'new_lead',
    json_build_object(
      'id', NEW.id,
      'name', NEW.name,
      'company', NEW.company,
      'email', NEW.email,
      'budget_range', NEW.budget_range,
      'created_at', NEW.created_at
    )::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_notify_new_lead
  AFTER INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_lead();

-- ============================================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Activer RLS sur toutes les tables
ALTER TABLE user_roles             ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects               ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcontractors         ENABLE ROW LEVEL SECURITY;
ALTER TABLE quality_scores         ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents              ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------
-- 6.1 USER ROLES
-- -----------------------------------------------
CREATE POLICY "Admins can manage roles"
  ON user_roles FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Users can view own role"
  ON user_roles FOR SELECT
  USING (user_id = auth.uid());

-- -----------------------------------------------
-- 6.2 LEADS
-- -----------------------------------------------
-- Les visiteurs anonymes peuvent soumettre le formulaire
CREATE POLICY "Anonymous can insert leads"
  ON leads FOR INSERT
  WITH CHECK (TRUE);

-- L'equipe peut lire tous les leads
CREATE POLICY "Team can view leads"
  ON leads FOR SELECT
  USING (is_team_member());

-- L'equipe peut mettre a jour les leads
CREATE POLICY "Team can update leads"
  ON leads FOR UPDATE
  USING (is_team_member())
  WITH CHECK (is_team_member());

-- Seuls les admins peuvent supprimer
CREATE POLICY "Admins can delete leads"
  ON leads FOR DELETE
  USING (is_admin());

-- -----------------------------------------------
-- 6.3 PROJECTS
-- -----------------------------------------------
CREATE POLICY "Team can view projects"
  ON projects FOR SELECT
  USING (is_team_member());

CREATE POLICY "Team can insert projects"
  ON projects FOR INSERT
  WITH CHECK (is_team_member());

CREATE POLICY "Team can update projects"
  ON projects FOR UPDATE
  USING (is_team_member())
  WITH CHECK (is_team_member());

CREATE POLICY "Admins can delete projects"
  ON projects FOR DELETE
  USING (is_admin());

-- -----------------------------------------------
-- 6.4 SUBCONTRACTORS
-- -----------------------------------------------
CREATE POLICY "Team can view subcontractors"
  ON subcontractors FOR SELECT
  USING (is_team_member());

CREATE POLICY "Admins can manage subcontractors"
  ON subcontractors FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- -----------------------------------------------
-- 6.5 QUALITY SCORES
-- -----------------------------------------------
CREATE POLICY "Team can view quality scores"
  ON quality_scores FOR SELECT
  USING (is_team_member());

CREATE POLICY "Team can insert quality scores"
  ON quality_scores FOR INSERT
  WITH CHECK (is_team_member());

CREATE POLICY "Admins can manage quality scores"
  ON quality_scores FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

-- -----------------------------------------------
-- 6.6 PROJECT STATUS HISTORY
-- -----------------------------------------------
CREATE POLICY "Team can view status history"
  ON project_status_history FOR SELECT
  USING (is_team_member());

-- INSERT est gere par le trigger SECURITY DEFINER, pas besoin de policy INSERT

-- -----------------------------------------------
-- 6.7 DOCUMENTS
-- -----------------------------------------------
CREATE POLICY "Team can view documents"
  ON documents FOR SELECT
  USING (is_team_member());

CREATE POLICY "Team can manage documents"
  ON documents FOR ALL
  USING (is_team_member())
  WITH CHECK (is_team_member());

-- ============================================================
-- 7. INDEXES
-- ============================================================

-- Leads
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_converted ON leads(converted_to_project_id) WHERE converted_to_project_id IS NOT NULL;

-- Projects
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_lead_id ON projects(lead_id);
CREATE INDEX idx_projects_subcontractor ON projects(assigned_subcontractor_id) WHERE assigned_subcontractor_id IS NOT NULL;
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_projects_ar_date ON projects(ar_region_received_at) WHERE ar_region_received_at IS NOT NULL;

-- Status History
CREATE INDEX idx_status_history_project ON project_status_history(project_id);
CREATE INDEX idx_status_history_created ON project_status_history(created_at DESC);

-- Quality Scores
CREATE INDEX idx_quality_subcontractor ON quality_scores(subcontractor_id);
CREATE INDEX idx_quality_project ON quality_scores(project_id);

-- Documents
CREATE INDEX idx_documents_project ON documents(project_id);
CREATE INDEX idx_documents_type ON documents(project_id, type);

-- Subcontractors
CREATE INDEX idx_subcontractors_active ON subcontractors(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_subcontractors_quality ON subcontractors(quality_score DESC) WHERE is_active = TRUE;

-- ============================================================
-- 8. VUES UTILITAIRES
-- ============================================================

-- Vue pipeline : resume du dossier pour le dashboard
CREATE OR REPLACE VIEW v_pipeline_overview AS
SELECT
  p.id,
  p.client_company,
  p.client_name,
  p.status,
  p.quote_amount_ht,
  p.remaining_charge_ht,
  p.feder_amount_ht,
  p.ar_region_received_at,
  p.quote_signed_at,
  p.deposit_received_at,
  p.production_started_at,
  p.production_deadline,
  s.name AS subcontractor_name,
  s.quality_score AS subcontractor_quality,
  p.created_at,
  -- Calcul du nombre de jours dans l'etat actuel
  EXTRACT(DAY FROM NOW() - COALESCE(
    (SELECT MAX(created_at) FROM project_status_history WHERE project_id = p.id),
    p.created_at
  ))::INTEGER AS days_in_current_status,
  -- Flag retard production
  CASE
    WHEN p.status = 'production_in_progress'
         AND p.production_deadline IS NOT NULL
         AND NOW() > p.production_deadline
    THEN TRUE
    ELSE FALSE
  END AS is_overdue
FROM projects p
LEFT JOIN subcontractors s ON p.assigned_subcontractor_id = s.id
WHERE p.status NOT IN ('cancelled', 'closed')
ORDER BY p.created_at DESC;

-- Vue leads non convertis (pour relance commerciale)
CREATE OR REPLACE VIEW v_unconverted_leads AS
SELECT
  l.*,
  EXTRACT(DAY FROM NOW() - l.created_at)::INTEGER AS days_since_capture
FROM leads l
WHERE l.converted_to_project_id IS NULL
ORDER BY l.created_at DESC;
