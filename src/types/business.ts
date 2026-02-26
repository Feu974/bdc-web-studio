/**
 * Types métier — Source unique de vérité pour les données commerciales et légales.
 * Conforme NAF 62.01Z / ZFANG — Vocabulaire exclusivement technique.
 */

/** Représente un plan tarifaire conforme à la logique Kap Numérik / FEDER. */
export interface PricingPlan {
  /** Identifiant unique du plan */
  id: string;
  /** Nom commercial du pack */
  name: string;
  /** Prix de base HT en euros (avant subvention) */
  basePriceHT: number;
  /** Taux de prise en charge FEDER (entre 0 et 1) */
  federCoverageRate: number;
  /** Montant de la subvention FEDER en euros */
  federAmountHT: number;
  /** Reste à charge client HT en euros */
  remainingChargeHT: number;
  /** Liste des fonctionnalités incluses */
  features: FeatureItem[];
  /** Indique si ce plan est mis en avant */
  highlighted?: boolean;
}

/** Fonctionnalité d'un plan tarifaire */
export interface FeatureItem {
  /** Libellé de la fonctionnalité */
  label: string;
  /** Incluse dans le plan */
  included: boolean;
}

/** Service de maintenance récurrent — "Pacte de Sérénité" */
export interface MaintenanceContract {
  /** Nom du contrat */
  name: string;
  /** Prix mensuel HT en euros */
  monthlyPriceHT: number;
  /** Prestations incluses */
  services: string[];
}

/** Mentions légales obligatoires */
export interface LegalMentions {
  /** Mention FEDER/FSE+ */
  federNotice: string;
  /** Activité fiscale NAF */
  nafActivity: string;
  /** Code NAF */
  nafCode: string;
  /** Raison sociale */
  companyName: string;
}

/** Métrique affichée dans la barre de KPIs */
export interface Metric {
  /** Valeur affichée */
  value: string;
  /** Libellé */
  label: string;
  /** Précision / disclaimer */
  disclaimer?: string;
}

/** Carte infrastructure */
export interface InfrastructureCard {
  /** Titre de la carte */
  title: string;
  /** Description courte */
  description: string;
  /** Liste de fonctionnalités */
  features: string[];
  /** Identifiant d'icône */
  icon: 'zap' | 'shield' | 'code' | 'server';
}

/** Étape de la méthodologie Zero Defect */
export interface MethodologyStep {
  /** Titre de l'étape */
  title: string;
  /** Description */
  description: string;
  /** Identifiant d'icône */
  icon: 'zap' | 'shield' | 'server';
}

/** Données du formulaire d'éligibilité */
export interface EligibilityFormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  size: string;
  budget: string;
  message: string;
  consent: boolean;
  honeypot: string;
}

// ============================================================
// TYPES BACKEND — Pipeline Kap Numérik
// Re-exportes depuis les types Supabase pour usage dans les composants.
// ============================================================

export type {
  ProjectStatus,
  CompanySize,
  BudgetRange,
  DocumentType,
} from "@/lib/supabase/database.types";

export type { GuardResult } from "@/lib/supabase/guards";

/** Données du devis pour génération PDF (Livrable 3) */
export interface QuoteGenerationData {
  projectId: string;
  clientName: string;
  clientCompany: string;
  clientSiret: string;
  clientEmail: string;
  clientPhone: string;
  quoteAmountHT: number;
  federCoverageRate: number;
  federAmountHT: number;
  remainingChargeHT: number;
  tvaRate: number;
  federDossierNumber: string;
  arRegionReference: string;
  arRegionReceivedAt: string;
  quoteValidUntil: string;
  features: FeatureItem[];
  legalMentions: LegalMentions;
}
