/**
 * guards.ts
 *
 * LIVRABLE 3 : State Machine Guards pour le pipeline Kap Numerik.
 *
 * Ces gardes verifient les preconditions FEDER AVANT de tenter une transition.
 * Le trigger SQL `trg_validate_project_status` est le dernier rempart (fail-safe DB),
 * mais ces gardes evitent les erreurs cote application et fournissent des messages UX.
 */

import type { ProjectStatus } from "./database.types";

// ============================================================
// MATRICE DE TRANSITIONS
// ============================================================

const VALID_TRANSITIONS: Record<ProjectStatus, ProjectStatus[]> = {
  lead_captured: ["dossier_deposited"],
  dossier_deposited: ["awaiting_ar_region"],
  awaiting_ar_region: ["ar_received"],
  ar_received: ["quote_sent"],
  quote_sent: ["quote_signed"],
  quote_signed: ["awaiting_deposit"],
  awaiting_deposit: ["deposit_received"],
  deposit_received: ["production_in_progress"],
  production_in_progress: ["production_completed"],
  production_completed: ["final_invoiced"],
  final_invoiced: ["closed"],
  closed: [],
  cancelled: [],
  on_hold: [], // Reprise geree dynamiquement
};

// Etats qui autorisent l'annulation
const CANCELLABLE_STATES: ProjectStatus[] = [
  "lead_captured",
  "dossier_deposited",
  "awaiting_ar_region",
  "ar_received",
  "quote_sent",
  "quote_signed",
  "awaiting_deposit",
  "deposit_received",
  "production_in_progress",
  "production_completed",
  "final_invoiced",
];

// Etats qui autorisent la mise en pause
const HOLDABLE_STATES: ProjectStatus[] = [
  "lead_captured",
  "dossier_deposited",
  "awaiting_ar_region",
  "ar_received",
  "quote_sent",
  "quote_signed",
  "awaiting_deposit",
  "deposit_received",
  "production_in_progress",
];

// ============================================================
// TYPES
// ============================================================

export interface GuardResult {
  allowed: boolean;
  reason?: string;
  /** Delai restant en ms avant autorisation (pour la regle des 5 jours) */
  waitMs?: number;
}

interface ProjectGuardContext {
  status: ProjectStatus;
  arRegionReceivedAt: string | null;
  depositReceivedAt: string | null;
  quoteSignedAt: string | null;
}

// ============================================================
// GARDES INDIVIDUELLES
// ============================================================

/**
 * Verifie si une transition est structurellement valide.
 */
export function canTransitionTo(
  current: ProjectStatus,
  target: ProjectStatus
): GuardResult {
  // Transitions speciales
  if (target === "cancelled") {
    return CANCELLABLE_STATES.includes(current)
      ? { allowed: true }
      : { allowed: false, reason: "Ce dossier ne peut plus etre annule." };
  }
  if (target === "on_hold") {
    return HOLDABLE_STATES.includes(current)
      ? { allowed: true }
      : { allowed: false, reason: "Ce dossier ne peut pas etre mis en pause." };
  }

  const allowed = VALID_TRANSITIONS[current]?.includes(target) ?? false;
  return allowed
    ? { allowed: true }
    : {
        allowed: false,
        reason: `Transition ${current} -> ${target} non autorisee. Etape suivante attendue : ${VALID_TRANSITIONS[current]?.join(", ") || "aucune"}.`,
      };
}

/**
 * REGLE FEDER : Le devis ne peut pas etre envoye/signe avant l'AR Region.
 */
export function guardQuoteRequiresAR(
  ctx: Pick<ProjectGuardContext, "arRegionReceivedAt">
): GuardResult {
  if (!ctx.arRegionReceivedAt) {
    return {
      allowed: false,
      reason:
        "VIOLATION FEDER : L'accuse de reception Region doit etre enregistre " +
        "avant toute operation sur le devis.",
    };
  }
  return { allowed: true };
}

/**
 * REGLE FEDER : La production ne peut demarrer que 5 jours apres l'acompte.
 */
export function guardProductionDelay(
  ctx: Pick<ProjectGuardContext, "depositReceivedAt">
): GuardResult {
  if (!ctx.depositReceivedAt) {
    return {
      allowed: false,
      reason: "L'acompte 50% doit etre recu avant le demarrage production.",
    };
  }

  const depositDate = new Date(ctx.depositReceivedAt);
  const earliestStart = new Date(
    depositDate.getTime() + 5 * 24 * 60 * 60 * 1000
  );
  const now = new Date();

  if (now < earliestStart) {
    const waitMs = earliestStart.getTime() - now.getTime();
    const waitDays = Math.ceil(waitMs / (24 * 60 * 60 * 1000));
    return {
      allowed: false,
      waitMs,
      reason:
        `DELAI FEDER : Le demarrage production est autorise a partir du ` +
        `${earliestStart.toLocaleDateString("fr-FR")} (encore ${waitDays} jour(s)).`,
    };
  }

  return { allowed: true };
}

// ============================================================
// GARDE COMPOSITE : Verifie TOUTES les preconditions pour une transition
// ============================================================

export function validateTransition(
  ctx: ProjectGuardContext,
  target: ProjectStatus
): GuardResult {
  // 1. Transition structurelle
  const structureCheck = canTransitionTo(ctx.status, target);
  if (!structureCheck.allowed) return structureCheck;

  // 2. Gardes FEDER specifiques
  if (target === "quote_sent" || target === "quote_signed") {
    const arCheck = guardQuoteRequiresAR(ctx);
    if (!arCheck.allowed) return arCheck;
  }

  if (target === "production_in_progress") {
    const delayCheck = guardProductionDelay(ctx);
    if (!delayCheck.allowed) return delayCheck;
  }

  return { allowed: true };
}

// ============================================================
// GARDE DOCUMENT : Bloque la generation de devis si AR manquant
// ============================================================

/**
 * Verifie si un document peut etre genere pour un projet donne.
 * Utilise par le systeme de generation PDF (Livrable 3).
 */
export function canGenerateDocument(
  ctx: ProjectGuardContext,
  documentType: "devis" | "facture_acompte" | "facture_solde" | "cgv"
): GuardResult {
  switch (documentType) {
    case "devis":
      // Le devis ne peut etre genere que si l'AR Region est recu
      if (!ctx.arRegionReceivedAt) {
        return {
          allowed: false,
          reason:
            "BLOCAGE : Generation du devis impossible. " +
            "L'accuse de reception Region n'a pas ete enregistre.",
        };
      }
      return { allowed: true };

    case "facture_acompte":
      // La facture d'acompte necessite un devis signe
      if (!ctx.quoteSignedAt) {
        return {
          allowed: false,
          reason: "Le devis doit etre signe avant de generer la facture d'acompte.",
        };
      }
      return { allowed: true };

    case "facture_solde":
      // La facture de solde necessite que l'acompte soit recu
      if (!ctx.depositReceivedAt) {
        return {
          allowed: false,
          reason: "L'acompte doit etre recu avant de generer la facture de solde.",
        };
      }
      return { allowed: true };

    case "cgv":
      // Les CGV peuvent toujours etre generees
      return { allowed: true };

    default:
      return { allowed: false, reason: "Type de document non reconnu." };
  }
}

// ============================================================
// HELPERS : Labels et metadata pour l'UI
// ============================================================

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  lead_captured: "Lead capte",
  dossier_deposited: "Dossier depose",
  awaiting_ar_region: "Attente AR Region",
  ar_received: "AR Region recu",
  quote_sent: "Devis envoye",
  quote_signed: "Devis signe",
  awaiting_deposit: "Attente acompte",
  deposit_received: "Acompte recu",
  production_in_progress: "Production en cours",
  production_completed: "Production terminee",
  final_invoiced: "Facture solde emise",
  closed: "Cloture",
  cancelled: "Annule",
  on_hold: "En pause",
};

/** Indice de progression (0-100) pour les barres de progression UI */
export const STATUS_PROGRESS: Record<ProjectStatus, number> = {
  lead_captured: 0,
  dossier_deposited: 10,
  awaiting_ar_region: 20,
  ar_received: 30,
  quote_sent: 40,
  quote_signed: 50,
  awaiting_deposit: 55,
  deposit_received: 65,
  production_in_progress: 75,
  production_completed: 90,
  final_invoiced: 95,
  closed: 100,
  cancelled: 0,
  on_hold: 0,
};
