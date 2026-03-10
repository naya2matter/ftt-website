// ── Media ────────────────────────────────────────────────────────────────────
export interface OfferMedia {
  id: number;
  path: string;
  type: string;
  mime_type: string;
  width: number;
  height: number;
  size_bytes: number;
  alt_text: string;
  title: string;
  created_at: string;
  updated_at: string;
  url: string;
}

// ── Offer Requirement ─────────────────────────────────────────────────────────
export interface OfferRequirement {
  id: number;
  offer_section_id: number;
  text: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  offer_section?: Omit<OfferSection, "requirements">;
}

// ── Offer Section ─────────────────────────────────────────────────────────────
export interface OfferSection {
  id: number;
  hook: string;
  title: string;
  description: string;
  button_text: string;
  button_link: string;
  image_media_id: number;
  created_at: string;
  updated_at: string;
  image: OfferMedia;
  requirements: OfferRequirement[];
}

// ── API Responses ─────────────────────────────────────────────────────────────
export interface OfferSectionListResponse {
  success: boolean;
  message: string;
  data: OfferSection[];
}

export interface OfferSectionSingleResponse {
  success: boolean;
  message: string;
  data: OfferSection;
}

export interface OfferRequirementListResponse {
  success: boolean;
  message: string;
  data: OfferRequirement[];
}

export interface OfferRequirementSingleResponse {
  success: boolean;
  message: string;
  data: OfferRequirement;
}

export interface OfferRequirementDeleteResponse {
  success: boolean;
  message: string;
}

// ── Payloads ──────────────────────────────────────────────────────────────────
export interface UpdateOfferSectionPayload {
  hook?: string;
  title?: string;
  description?: string;
  button_text?: string;
  button_link?: string;
  image?: File;
  image_title?: string;
  alt_text?: string;
}

export interface CreateOfferRequirementPayload {
  offer_section_id: number;
  text: string;
  sort_order: number;
}

export interface UpdateOfferRequirementPayload {
  offer_section_id?: number;
  text?: string;
  sort_order?: number;
}
