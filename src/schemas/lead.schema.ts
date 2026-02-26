import { z } from "zod";

// ============================================================
// SCHEMA ZOD : Validation du formulaire d'eligibilite
// Utilise cote client (EligibilityForm) ET cote serveur
// ============================================================

/**
 * Mapping entre les valeurs du select HTML actuel et les ENUMs de la BDD.
 * Le formulaire envoie "moins-2k" mais la BDD attend "moins_2k".
 */
const BUDGET_MAPPING = {
  "moins-2k": "moins_2k",
  "2k-5k": "2k_5k",
  "5k-10k": "5k_10k",
  "plus-10k": "plus_10k",
} as const;

export const companySizeEnum = z.enum(["tpe", "pme", "eti", "ge"]);

export const budgetRangeEnum = z.enum([
  "moins_2k",
  "2k_5k",
  "5k_10k",
  "plus_10k",
]);

/**
 * Schema brut tel que le formulaire HTML l'envoie.
 * Les valeurs budget utilisent des tirets (ex: "moins-2k").
 */
export const eligibilityFormRawSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caracteres")
    .max(100, "Le nom ne peut pas depasser 100 caracteres")
    .trim(),
  company: z
    .string()
    .min(1, "Le nom de la societe est requis")
    .max(200)
    .trim(),
  phone: z
    .string()
    .regex(
      /^(?:(?:\+33|0033|0)\s?[1-9](?:[\s.-]?\d{2}){4})$/,
      "Numero de telephone invalide (format FR attendu)"
    ),
  email: z
    .string()
    .email("Adresse email invalide")
    .max(254)
    .toLowerCase()
    .trim(),
  size: companySizeEnum,
  budget: z.enum(["moins-2k", "2k-5k", "5k-10k", "plus-10k"]),
  message: z
    .string()
    .max(2000, "Le message ne peut pas depasser 2000 caracteres")
    .optional()
    .default(""),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "Vous devez accepter d'etre recontacte",
    }),
  }),
  honeypot: z.string().max(0, "Bot detected").optional().default(""),
});

/**
 * Schema normalise pour l'insertion en BDD.
 * Transforme les valeurs du formulaire vers le format attendu par Supabase.
 */
export const leadInsertSchema = eligibilityFormRawSchema.transform((data) => ({
  name: data.name,
  company: data.company,
  phone: data.phone.replace(/[\s.-]/g, ""), // Normalise le telephone
  email: data.email,
  company_size: data.size,
  budget_range:
    BUDGET_MAPPING[data.budget as keyof typeof BUDGET_MAPPING] ?? data.budget,
  message: data.message || null,
  consent_given: data.consent,
  consent_given_at: new Date().toISOString(),
  source: "eligibility_form" as const,
}));

export type EligibilityFormRaw = z.input<typeof eligibilityFormRawSchema>;
export type LeadInsert = z.output<typeof leadInsertSchema>;

// ============================================================
// SCHEMA : Transition de statut projet
// ============================================================

export const projectStatusEnum = z.enum([
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
  "closed",
  "cancelled",
  "on_hold",
]);

export const projectTransitionSchema = z.object({
  projectId: z.string().uuid(),
  newStatus: projectStatusEnum,
  metadata: z
    .record(z.unknown())
    .optional()
    .default({}),
});

export type ProjectTransition = z.infer<typeof projectTransitionSchema>;
