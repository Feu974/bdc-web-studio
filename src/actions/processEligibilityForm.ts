/**
 * processEligibilityForm.ts
 *
 * LIVRABLE 2 : Lead-to-Pipeline processing.
 *
 * Architecture actuelle (Vite SPA) :
 *   Le client appelle cette fonction qui valide via Zod,
 *   insere dans Supabase via le client anon (RLS autorise l'INSERT anonyme),
 *   et le trigger DB `notify_new_lead` emet un pg_notify pour le traitement async.
 *
 * Migration Next.js :
 *   Ajouter "use server" en haut du fichier, remplacer le client anon
 *   par createServiceClient(), et le tour est joue.
 */

import { supabase } from "@/lib/supabase/client";
import {
  eligibilityFormRawSchema,
  leadInsertSchema,
  type EligibilityFormRaw,
} from "@/schemas/lead.schema";

// ============================================================
// TYPES DE REPONSE
// ============================================================

interface ProcessResult {
  success: boolean;
  leadId?: string;
  errors?: Record<string, string[]>;
  message: string;
}

// ============================================================
// ACTION PRINCIPALE
// ============================================================

export async function processEligibilityForm(
  rawData: EligibilityFormRaw
): Promise<ProcessResult> {
  // -----------------------------------------------
  // 1. HONEYPOT CHECK (anti-bot, pre-validation)
  // -----------------------------------------------
  if (rawData.honeypot && rawData.honeypot.length > 0) {
    // Retourne un faux succes pour ne pas alerter le bot
    return {
      success: true,
      message: "Formulaire soumis avec succes.",
    };
  }

  // -----------------------------------------------
  // 2. VALIDATION ZOD
  // -----------------------------------------------
  const parseResult = leadInsertSchema.safeParse(rawData);

  if (!parseResult.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parseResult.error.issues) {
      const field = issue.path.join(".");
      if (!fieldErrors[field]) fieldErrors[field] = [];
      fieldErrors[field].push(issue.message);
    }
    return {
      success: false,
      errors: fieldErrors,
      message: "Erreurs de validation dans le formulaire.",
    };
  }

  const leadData = parseResult.data;

  // -----------------------------------------------
  // 3. RATE LIMITING (basique, cote client)
  // -----------------------------------------------
  // En production, implementer un rate limit serveur via
  // Supabase Edge Function ou middleware Vercel.
  const lastSubmit = sessionStorage.getItem("bdc_last_submit");
  if (lastSubmit) {
    const elapsed = Date.now() - parseInt(lastSubmit, 10);
    if (elapsed < 30_000) {
      return {
        success: false,
        message: "Veuillez patienter 30 secondes entre chaque soumission.",
      };
    }
  }

  // -----------------------------------------------
  // 4. INSERTION SUPABASE
  // -----------------------------------------------
  const { data: lead, error } = await supabase
    .from("leads")
    .insert({
      name: leadData.name,
      company: leadData.company,
      phone: leadData.phone,
      email: leadData.email,
      company_size: leadData.company_size,
      budget_range: leadData.budget_range,
      message: leadData.message,
      consent_given: leadData.consent_given,
      consent_given_at: leadData.consent_given_at,
      source: leadData.source,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[processEligibilityForm] Supabase error:", error);
    return {
      success: false,
      message:
        "Une erreur technique est survenue. Veuillez reessayer ou nous contacter directement.",
    };
  }

  // -----------------------------------------------
  // 5. POST-INSERTION
  // -----------------------------------------------
  // Le trigger DB `trg_notify_new_lead` a deja emis un pg_notify('new_lead', ...).
  // Les listeners suivants peuvent reagir :
  //   - Supabase Realtime (dashboard admin en temps reel)
  //   - Webhook Supabase -> n8n/Make (envoi email de confirmation, Slack notif)
  //   - Edge Function schedulee (scoring / enrichissement SIRET via API INSEE)

  sessionStorage.setItem("bdc_last_submit", Date.now().toString());

  return {
    success: true,
    leadId: lead.id,
    message: "Votre demande a ete enregistree. Nous vous recontactons sous 24h.",
  };
}

// ============================================================
// EQUIVALENT NEXT.JS SERVER ACTION (pour migration future)
// ============================================================
//
// "use server";
//
// import { createServiceClient } from "@/lib/supabase/client";
// import { leadInsertSchema } from "@/schemas/lead.schema";
// import { headers } from "next/headers";
// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";
//
// const ratelimit = new Ratelimit({
//   redis: Redis.fromEnv(),
//   limiter: Ratelimit.slidingWindow(3, "1 m"), // 3 req/min
// });
//
// export async function processEligibilityFormAction(formData: FormData) {
//   // Rate limit par IP
//   const headersList = await headers();
//   const ip = headersList.get("x-forwarded-for") ?? "127.0.0.1";
//   const { success: rateLimitOk } = await ratelimit.limit(ip);
//   if (!rateLimitOk) {
//     return { success: false, message: "Trop de requetes. Reessayez dans 1 minute." };
//   }
//
//   // Honeypot
//   if (formData.get("honeypot")) {
//     return { success: true, message: "OK" };
//   }
//
//   // Validation Zod
//   const raw = Object.fromEntries(formData);
//   const parsed = leadInsertSchema.safeParse(raw);
//   if (!parsed.success) {
//     return { success: false, errors: parsed.error.flatten().fieldErrors };
//   }
//
//   // Insertion via service client (bypass RLS)
//   const supabase = createServiceClient();
//   const { data, error } = await supabase
//     .from("leads")
//     .insert(parsed.data)
//     .select("id")
//     .single();
//
//   if (error) throw new Error("DB insert failed");
//
//   // Revalidation du cache si page admin
//   // revalidatePath("/admin/leads");
//
//   return { success: true, leadId: data.id };
// }
