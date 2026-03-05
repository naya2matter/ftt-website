// Represents a single button inside a CTA (local UI model)
export interface CtaButton {
  text: string;
  link: string;
  is_active: 0 | 1;
}

// API shape (what the backend sends / expects)
export interface Cta {
  id: number;
  title: string;
  description: string;
  button1_text: string;
  button1_link: string;
  button2_text?: string;
  button2_link?: string;
  sort_order: number;
  is_active: 0 | 1;
  created_at?: string;
  updated_at?: string;
}

// Local editing model — replaces fixed button fields with a flexible array
export interface CtaEditState {
  id?: number;
  title: string;
  description: string;
  buttons: CtaButton[];
  sort_order: number;
  is_active: 0 | 1;
}

export interface CtaListResponse {
  success: boolean;
  message: string;
  data: Cta[];
  meta: {
    pagination?: {
      current_page: number;
      per_page: number;
      total: number;
      last_page: number;
    };
  };
}

export interface CtaSingleResponse {
  success: boolean;
  message: string;
  data: Cta;
  meta: [] | Record<string, unknown>;
}

export interface CtaUpdatePayload {
  title?: string;
  description?: string;
  button1_text?: string;
  button1_link?: string;
  button2_text?: string;
  button2_link?: string;
  sort_order?: number;
  is_active?: 0 | 1;
}
