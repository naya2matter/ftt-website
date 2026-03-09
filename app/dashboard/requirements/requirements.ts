// ── NeedsSection ─────────────────────────────────────────────────────────────
export interface NeedsSection {
  id: number;
  hook: string;
  title: string;
  created_at: string;
  updated_at: string;
}

// ── NeedsItem ─────────────────────────────────────────────────────────────────
export interface NeedsItem {
  id: number;
  needs_section_id: number;
  text: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ── API Responses ─────────────────────────────────────────────────────────────
export interface NeedsSectionListResponse {
  success: boolean;
  message: string;
  data: NeedsSection[];
  meta: unknown[];
}

export interface NeedsSectionSingleResponse {
  success: boolean;
  message: string;
  data: NeedsSection;
  meta: unknown[];
}

export interface NeedsItemListResponse {
  success: boolean;
  message: string;
  data: NeedsItem[];
  meta: unknown[];
}

export interface NeedsItemSingleResponse {
  success: boolean;
  message: string;
  data: NeedsItem;
  meta: unknown[];
}

export interface NeedsItemDeleteResponse {
  success: boolean;
  message: string;
  data: unknown[];
  meta: unknown[];
}

// ── Payloads ──────────────────────────────────────────────────────────────────
export interface UpdateNeedsSectionPayload {
  hook?: string;
  title?: string;
}

export interface CreateNeedsItemPayload {
  needs_section_id: number;
  text: string;
  sort_order: number;
}

export interface UpdateNeedsItemPayload {
  needs_section_id?: number;
  text?: string;
  sort_order?: number;
}
