export interface TestimonialSection {
  id: number;
  hook: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

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

export interface Testimonial {
  id: number;
  testimonials_section_id: number;
  video_media_id: number;
  text: string;
  name: string;
  position: string;
  duration_seconds: number;
  sort_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  video?: Media;
}

export interface TestimonialResponse {
  success: boolean;
  message: string;
  data: Testimonial | Testimonial[];
}

export interface TestimonialSectionsResponse {
  success: boolean;
  message: string;
  data: TestimonialSection[];
  meta: unknown[];
}

export interface UpdateTestimonialSectionPayload {
  hook: string;
  title: string;
  description: string;
}

export interface CreateTestimonialPayload {
  testimonials_section_id: number;
  text: string;
  name: string;
  position: string;
  duration_seconds: number;
  sort_order: number;
  is_active: number;
  video?: File;
  title?: string;
  alt_text?: string;
}

export interface UpdateTestimonialPayload extends CreateTestimonialPayload {}
