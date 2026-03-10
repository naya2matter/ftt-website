export interface Media {
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

export interface WhyUsItem {
  id: number;
  name: string;
  icon_media_id: number;
  sort_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  icon?: Media;
}

export interface WhyUsItemsResponse {
  success: boolean;
  message: string;
  data: WhyUsItem[];
}

export interface WhyUsItemResponse {
  success: boolean;
  message: string;
  data: WhyUsItem;
}

export interface DeleteWhyUsItemResponse {
  success: boolean;
  message: string;
}

export interface CreateWhyUsItemPayload {
  name: string;
  sort_order: number;
  is_active: number;
  alt_text: string;
  title: string;
  icon?: File;
}

export interface UpdateWhyUsItemPayload extends CreateWhyUsItemPayload {}
