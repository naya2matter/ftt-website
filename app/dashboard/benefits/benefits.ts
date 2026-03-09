// ── Benefits Section ─────────────────────────────────────────────────────────
export interface BenefitsSection {
  id: number;
  hook: string;
  title: string;
  created_at: string;
  updated_at: string;
}

// ── Benefits Item ─────────────────────────────────────────────────────────────
export interface BenefitsItem {
  id: number;
  benefits_section_id: number;
  text: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ── API Responses ─────────────────────────────────────────────────────────────
export interface BenefitsSectionListResponse {
  success: boolean;
  message: string;
  data: BenefitsSection[];
  meta: unknown[];
}

export interface BenefitsSectionSingleResponse {
  success: boolean;
  message: string;
  data: BenefitsSection;
  meta: unknown[];
}

export interface BenefitsItemListResponse {
  success: boolean;
  message: string;
  data: BenefitsItem[];
  meta: unknown[];
}

export interface BenefitsItemSingleResponse {
  success: boolean;
  message: string;
  data: BenefitsItem;
  meta: unknown[];
}

export interface BenefitsItemDeleteResponse {
  success: boolean;
  message: string;
  data: unknown[];
  meta: unknown[];
}

// ── Payloads ──────────────────────────────────────────────────────────────────
export interface UpdateBenefitsSectionPayload {
  hook?: string;
  title?: string;
}

export interface CreateBenefitsItemPayload {
  benefits_section_id: number;
  text: string;
  sort_order: number;
}

export interface UpdateBenefitsItemPayload {
  text?: string;
  sort_order?: number;
}
