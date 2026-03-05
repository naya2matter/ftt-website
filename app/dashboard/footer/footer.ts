// ── Footer Contact ─────────────────────────────────────────────────────────────
export interface FooterContact {
  id: number;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  created_at: string;
  updated_at: string;
}

// ── Footer Social Link ─────────────────────────────────────────────────────────
export interface FooterSocialLink {
  id: number;
  platform: string;
  url: string;
  sort_order: number;
  is_active: number; // 1 = active, 0 = inactive
  created_at: string;
  updated_at: string;
}

// ── API Response Wrappers ──────────────────────────────────────────────────────
export interface FooterContactListResponse {
  success: boolean;
  message: string;
  data: FooterContact[];
  meta: unknown[];
}

export interface FooterContactSingleResponse {
  success: boolean;
  message: string;
  data: FooterContact;
  meta: unknown[];
}

export interface FooterSocialLinkListResponse {
  success: boolean;
  message: string;
  data: FooterSocialLink[];
  meta: unknown[];
}

export interface FooterSocialLinkSingleResponse {
  success: boolean;
  message: string;
  data: FooterSocialLink;
  meta: unknown[];
}

// ── Payloads ───────────────────────────────────────────────────────────────────
export interface UpdateFooterContactPayload {
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
}

export interface UpdateFooterSocialLinkPayload {
  platform?: string;
  url?: string;
  sort_order?: number;
  is_active?: number;
}
