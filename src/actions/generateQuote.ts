/**
 * generateQuote.ts
 *
 * LIVRABLE 3 : Automatisation de la generation du Pack Juridique.
 *
 * Ce module orchestre la generation du devis Kap Numerik en respectant
 * les gardes FEDER (AR Region obligatoire avant generation).
 *
 * Stack de generation PDF recommandee :
 *   Option A : PDFMonkey (SaaS) — Templates visuels, API REST, zero infra.
 *   Option B : @react-pdf/renderer — Generation cote serveur, controle total.
 *   Option C : Puppeteer/Playwright — HTML->PDF, plus lourd mais flexible.
 *
 * Ce fichier implemente l'Option A (PDFMonkey) avec fallback documenté.
 */

import { supabase } from "@/lib/supabase/client";
import { canGenerateDocument } from "@/lib/supabase/guards";
import type { QuoteGenerationData } from "@/types/business";
import type { Database } from "@/lib/supabase/database.types";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

// ============================================================
// CONSTANTES LEGALES FEDER
// ============================================================

const FEDER_LEGAL_NOTICE = [
  "Ce projet beneficie d'une aide europeenne au titre du programme operationnel FEDER",
  "dans le cadre du dispositif Kap Numerik de la Region.",
  "Subvention FEDER accordee sous reserve de la validation definitive du dossier.",
].join(" ");

const BDC_COMPANY_INFO = {
  companyName: "BDC Web Studio",
  nafCode: "62.01Z",
  nafActivity: "Programmation informatique",
  federNotice: FEDER_LEGAL_NOTICE,
} as const;

// ============================================================
// GENERATION DU DEVIS
// ============================================================

interface GenerateQuoteResult {
  success: boolean;
  documentId?: string;
  pdfUrl?: string;
  error?: string;
}

/**
 * Genere le devis pour un projet Kap Numerik.
 *
 * FLUX :
 * 1. Charge le projet depuis Supabase
 * 2. Verifie la garde FEDER (AR Region obligatoire)
 * 3. Calcule les montants (HT, FEDER, reste a charge, TVA)
 * 4. Envoie les donnees a l'API de generation PDF
 * 5. Stocke la reference du document en BDD
 */
export async function generateQuote(
  projectId: string
): Promise<GenerateQuoteResult> {
  // -----------------------------------------------
  // 1. CHARGER LE PROJET
  // -----------------------------------------------
  const { data: project, error: fetchError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (fetchError || !project) {
    return { success: false, error: "Projet introuvable." };
  }

  // -----------------------------------------------
  // 2. GARDE FEDER : AR Region obligatoire
  // -----------------------------------------------
  const guard = canGenerateDocument(
    {
      status: project.status,
      arRegionReceivedAt: project.ar_region_received_at,
      depositReceivedAt: project.deposit_received_at,
      quoteSignedAt: project.quote_signed_at,
    },
    "devis"
  );

  if (!guard.allowed) {
    return { success: false, error: guard.reason };
  }

  // -----------------------------------------------
  // 3. CALCUL DES MONTANTS
  // -----------------------------------------------
  const quoteData = computeQuoteAmounts(project);

  // -----------------------------------------------
  // 4. GENERATION PDF
  // -----------------------------------------------
  const pdfResult = await callPdfGeneration(quoteData);

  if (!pdfResult.success) {
    return { success: false, error: pdfResult.error };
  }

  // -----------------------------------------------
  // 5. ENREGISTREMENT DU DOCUMENT
  // -----------------------------------------------
  const { data: doc, error: docError } = await supabase
    .from("documents")
    .insert({
      project_id: projectId,
      type: "devis",
      file_url: pdfResult.url,
      file_name: `devis-${project.feder_dossier_number ?? projectId}.pdf`,
      generation_data: quoteData as unknown as Record<string, unknown>,
    })
    .select("id")
    .single();

  if (docError) {
    return { success: false, error: "Erreur lors de l'enregistrement du document." };
  }

  return {
    success: true,
    documentId: doc.id,
    pdfUrl: pdfResult.url,
  };
}

// ============================================================
// CALCUL DES MONTANTS
// ============================================================

function computeQuoteAmounts(project: ProjectRow): QuoteGenerationData {
  const quoteHT = project.quote_amount_ht ?? 1600;
  const coverageRate = project.feder_coverage_rate ?? 0.5;
  const federAmount = Math.round(quoteHT * coverageRate * 100) / 100;
  const remainingHT = Math.round((quoteHT - federAmount) * 100) / 100;
  const tvaRate = project.tva_rate ?? 0.2;

  return {
    projectId: project.id,
    clientName: project.client_name,
    clientCompany: project.client_company,
    clientSiret: project.client_siret ?? "",
    clientEmail: project.client_email,
    clientPhone: project.client_phone,
    quoteAmountHT: quoteHT,
    federCoverageRate: coverageRate,
    federAmountHT: federAmount,
    remainingChargeHT: remainingHT, // 800 EUR HT pour le pack standard 1600 EUR
    tvaRate,
    federDossierNumber: project.feder_dossier_number ?? "",
    arRegionReference: project.ar_region_reference ?? "",
    arRegionReceivedAt: project.ar_region_received_at ?? "",
    quoteValidUntil:
      project.quote_valid_until ??
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    features: [], // A peupler depuis la config du plan choisi
    legalMentions: BDC_COMPANY_INFO,
  };
}

// ============================================================
// APPEL API PDF (PDFMonkey)
// ============================================================
//
// PDFMonkey utilise un template ID + un payload JSON.
// Le template est concu dans leur editeur web avec les placeholders.
//
// Alternative : Supabase Edge Function + @react-pdf/renderer
// pour une generation 100% self-hosted.

interface PdfResult {
  success: boolean;
  url?: string;
  error?: string;
}

async function callPdfGeneration(
  data: QuoteGenerationData
): Promise<PdfResult> {
  const apiKey = import.meta.env.VITE_PDFMONKEY_API_KEY;
  const templateId = import.meta.env.VITE_PDFMONKEY_DEVIS_TEMPLATE_ID;

  if (!apiKey || !templateId) {
    // Fallback : retourne un placeholder si PDF non configure
    console.warn(
      "[generateQuote] PDFMonkey non configure. " +
        "Definir VITE_PDFMONKEY_API_KEY et VITE_PDFMONKEY_DEVIS_TEMPLATE_ID."
    );
    return {
      success: true,
      url: `#pdf-generation-pending-${data.projectId}`,
    };
  }

  try {
    const response = await fetch(
      "https://api.pdfmonkey.io/api/v1/documents",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          document: {
            document_template_id: templateId,
            status: "pending",
            payload: {
              // Identite client
              client_name: data.clientName,
              client_company: data.clientCompany,
              client_siret: data.clientSiret,
              client_email: data.clientEmail,
              client_phone: data.clientPhone,
              // Montants
              quote_amount_ht: data.quoteAmountHT.toFixed(2),
              feder_coverage_rate: `${(data.federCoverageRate * 100).toFixed(0)}%`,
              feder_amount_ht: data.federAmountHT.toFixed(2),
              remaining_charge_ht: data.remainingChargeHT.toFixed(2),
              tva_rate: `${(data.tvaRate * 100).toFixed(0)}%`,
              tva_amount: (data.remainingChargeHT * data.tvaRate).toFixed(2),
              total_ttc: (
                data.remainingChargeHT * (1 + data.tvaRate)
              ).toFixed(2),
              // FEDER
              feder_dossier_number: data.federDossierNumber,
              ar_region_reference: data.arRegionReference,
              ar_region_date: data.arRegionReceivedAt
                ? new Date(data.arRegionReceivedAt).toLocaleDateString("fr-FR")
                : "",
              // Meta
              quote_date: new Date().toLocaleDateString("fr-FR"),
              quote_valid_until: data.quoteValidUntil
                ? new Date(data.quoteValidUntil).toLocaleDateString("fr-FR")
                : "",
              // Mention legale FEDER (obligatoire)
              feder_legal_notice: data.legalMentions.federNotice,
              company_name: data.legalMentions.companyName,
              naf_code: data.legalMentions.nafCode,
              naf_activity: data.legalMentions.nafActivity,
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("[generateQuote] PDFMonkey error:", errorBody);
      return { success: false, error: "Erreur lors de la generation du PDF." };
    }

    const result = await response.json();
    const downloadUrl: string =
      result.document?.download_url ?? result.document?.preview_url ?? "";

    return { success: true, url: downloadUrl };
  } catch (err) {
    console.error("[generateQuote] Network error:", err);
    return {
      success: false,
      error: "Impossible de contacter le service de generation PDF.",
    };
  }
}
