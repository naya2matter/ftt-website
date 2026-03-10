export interface FounderVideo {
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

export interface FounderSection {
  id: number;
  hook_text: string;
  title: string;
  description: string;
  video_media_id: number;
  created_at: string;
  updated_at: string;
  video: FounderVideo;
}

export interface FounderSectionResponse {
  success: boolean;
  message: string;
  data: FounderSection[];
  meta: any[];
}

export interface FounderSectionUpdateResponse {
  success: boolean;
  message: string;
  data: FounderSection;
  meta: any[];
}

export interface UpdateFounderPayload {
  hook_text: string;
  title: string;
  description: string;
  video?: File;
  title_video?: string;
  alt_text?: string;
}
