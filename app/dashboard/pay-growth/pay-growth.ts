// ── Media ────────────────────────────────────────────────────────────────────
export interface TemptationMedia {
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

// ── Temptation Requirement ────────────────────────────────────────────────────
export interface TemptationRequirement {
  id: number;
  temptation_section_id: number;
  text: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ── Temptation Section ────────────────────────────────────────────────────────
export interface TemptationSection {
  id: number;
  hook: string;
  title: string;
  description: string;
  button1_text: string;
  button1_link: string;
  button2_text: string;
  button2_link: string;
  image_media_id: number;
  created_at: string;
  updated_at: string;
  image: TemptationMedia;
  requirements: TemptationRequirement[];
}

// ── API Responses ─────────────────────────────────────────────────────────────
export interface TemptationSectionListResponse {
  success: boolean;
  message: string;
  data: TemptationSection[];
}

export interface TemptationSectionSingleResponse {
  success: boolean;
  message: string;
  data: TemptationSection;
}

export interface TemptationRequirementListResponse {
  success: boolean;
  message: string;
  data: TemptationRequirement[];
}

export interface TemptationRequirementSingleResponse {
  success: boolean;
  message: string;
  data: TemptationRequirement;
}

export interface TemptationRequirementDeleteResponse {
  success: boolean;
  message: string;
}

// ── Payloads ──────────────────────────────────────────────────────────────────
export interface UpdateTemptationSectionPayload {
  hook?: string;
  title?: string;
  description?: string;
  button1_text?: string;
  button1_link?: string;
  button2_text?: string;
  button2_link?: string;
  image?: File;
  image_title?: string;
  image_alt_text?: string;
}

export interface CreateTemptationRequirementPayload {
  temptation_section_id: number;
  text: string;
  sort_order: number;
}

export interface UpdateTemptationRequirementPayload {
  temptation_section_id?: number;
  text?: string;
  sort_order?: number;
}
