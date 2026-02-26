/**
 * Types generes manuellement a partir du schema SQL.
 * En production, utiliser `supabase gen types typescript` pour auto-generation.
 */

export type ProjectStatus =
  | "lead_captured"
  | "dossier_deposited"
  | "awaiting_ar_region"
  | "ar_received"
  | "quote_sent"
  | "quote_signed"
  | "awaiting_deposit"
  | "deposit_received"
  | "production_in_progress"
  | "production_completed"
  | "final_invoiced"
  | "closed"
  | "cancelled"
  | "on_hold";

export type CompanySize = "tpe" | "pme" | "eti" | "ge";

export type BudgetRange = "moins_2k" | "2k_5k" | "5k_10k" | "plus_10k";

export type DocumentType =
  | "devis"
  | "facture_acompte"
  | "facture_solde"
  | "cgv"
  | "bon_commande"
  | "pv_recette";

export type UserRole = "admin" | "commercial" | "production" | "readonly";

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          name: string;
          company: string;
          siret: string | null;
          email: string;
          phone: string;
          company_size: CompanySize;
          budget_range: BudgetRange;
          message: string | null;
          consent_given: boolean;
          consent_given_at: string | null;
          source: string;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          ip_address: string | null;
          converted_to_project_id: string | null;
          converted_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          company: string;
          siret?: string | null;
          email: string;
          phone: string;
          company_size: CompanySize;
          budget_range: BudgetRange;
          message?: string | null;
          consent_given: boolean;
          consent_given_at?: string | null;
          source?: string;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          ip_address?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
      };
      projects: {
        Row: {
          id: string;
          lead_id: string;
          client_name: string;
          client_company: string;
          client_email: string;
          client_phone: string;
          client_siret: string | null;
          status: ProjectStatus;
          feder_dossier_number: string | null;
          feder_dossier_deposited_at: string | null;
          ar_region_reference: string | null;
          ar_region_received_at: string | null;
          quote_amount_ht: number | null;
          feder_coverage_rate: number;
          feder_amount_ht: number | null;
          remaining_charge_ht: number | null;
          tva_rate: number;
          quote_sent_at: string | null;
          quote_signed_at: string | null;
          quote_valid_until: string | null;
          deposit_amount_ht: number | null;
          deposit_received_at: string | null;
          deposit_payment_method: string | null;
          final_invoice_amount_ht: number | null;
          final_invoice_sent_at: string | null;
          final_invoice_paid_at: string | null;
          assigned_subcontractor_id: string | null;
          production_started_at: string | null;
          production_deadline: string | null;
          production_completed_at: string | null;
          deliverable_url: string | null;
          pv_recette_signed_at: string | null;
          closed_at: string | null;
          cancellation_reason: string | null;
          internal_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          client_name: string;
          client_company: string;
          client_email: string;
          client_phone: string;
          client_siret?: string | null;
          status?: ProjectStatus;
          feder_dossier_number?: string | null;
          quote_amount_ht?: number | null;
          feder_coverage_rate?: number;
          feder_amount_ht?: number | null;
          remaining_charge_ht?: number | null;
          assigned_subcontractor_id?: string | null;
          internal_notes?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]> & {
          ar_region_reference?: string | null;
          ar_region_received_at?: string | null;
          quote_sent_at?: string | null;
          quote_signed_at?: string | null;
          deposit_amount_ht?: number | null;
          deposit_received_at?: string | null;
          deposit_payment_method?: string | null;
          status?: ProjectStatus;
        };
      };
      subcontractors: {
        Row: {
          id: string;
          name: string;
          company: string;
          email: string;
          phone: string | null;
          siret: string | null;
          specialties: string[];
          hourly_rate_ht: number | null;
          is_active: boolean;
          quality_score: number;
          total_projects: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          company: string;
          email: string;
          phone?: string | null;
          siret?: string | null;
          specialties?: string[];
          hourly_rate_ht?: number | null;
          is_active?: boolean;
        };
        Update: Partial<
          Database["public"]["Tables"]["subcontractors"]["Insert"]
        >;
      };
      quality_scores: {
        Row: {
          id: string;
          subcontractor_id: string;
          project_id: string;
          perf_score: number;
          a11y_score: number;
          seo_score: number;
          security_score: number;
          responsive_score: number;
          code_quality_score: number;
          deadline_score: number;
          total_score: number;
          evaluated_by: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          subcontractor_id: string;
          project_id: string;
          perf_score: number;
          a11y_score: number;
          seo_score: number;
          security_score: number;
          responsive_score: number;
          code_quality_score: number;
          deadline_score: number;
          evaluated_by?: string | null;
          notes?: string | null;
        };
        Update: Partial<
          Database["public"]["Tables"]["quality_scores"]["Insert"]
        >;
      };
      documents: {
        Row: {
          id: string;
          project_id: string;
          type: DocumentType;
          file_url: string | null;
          file_name: string | null;
          signed_at: string | null;
          signed_by: string | null;
          signature_ref: string | null;
          template_version: string;
          generation_data: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          type: DocumentType;
          file_url?: string | null;
          file_name?: string | null;
          template_version?: string;
          generation_data?: Record<string, unknown>;
        };
        Update: Partial<Database["public"]["Tables"]["documents"]["Insert"]>;
      };
    };
    Views: {
      v_pipeline_overview: {
        Row: {
          id: string;
          client_company: string;
          client_name: string;
          status: ProjectStatus;
          quote_amount_ht: number | null;
          remaining_charge_ht: number | null;
          feder_amount_ht: number | null;
          ar_region_received_at: string | null;
          quote_signed_at: string | null;
          deposit_received_at: string | null;
          production_started_at: string | null;
          production_deadline: string | null;
          subcontractor_name: string | null;
          subcontractor_quality: number | null;
          created_at: string;
          days_in_current_status: number;
          is_overdue: boolean;
        };
      };
      v_unconverted_leads: {
        Row: Database["public"]["Tables"]["leads"]["Row"] & {
          days_since_capture: number;
        };
      };
    };
  };
}
