// ── Media ───────────────────────────────────────────────────────────────────
export interface GalleryMedia {
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

// ── Gallery Section (from nested GET response) ────────────────────────────────
export interface GallerySectionData {
  hook: string;
  title: string;
  description: string;
  images: GalleryMedia[];
}

export interface GallerySectionWrapper {
  gallery_section: GallerySectionData;
}

export interface GallerySectionGetOriginal {
  success: boolean;
  message: string;
  data: GallerySectionWrapper[];
}

export interface GallerySectionGetDataWrapper {
  headers: Record<string, unknown>;
  original: GallerySectionGetOriginal;
  exception: unknown;
}

export interface GallerySectionListResponse {
  success: boolean;
  message: string;
  data: GallerySectionGetDataWrapper;
}

// ── Gallery Section (from update POST response) ───────────────────────────────
export interface GallerySectionFull {
  id: number;
  hook: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface GallerySectionUpdateResponse {
  success: boolean;
  message: string;
  data: GallerySectionFull;
}

// ── Working section state (combined) ─────────────────────────────────────────
export interface GallerySection {
  id: number;
  hook: string;
  title: string;
  description: string;
  images: GalleryMedia[];
  created_at?: string;
  updated_at?: string;
}

// ── Gallery Item ──────────────────────────────────────────────────────────────
export interface GalleryItem {
  id: number;
  gallery_section_id: number;
  image_media_id: number;
  title: string;
  description: string;
  sort_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  image: GalleryMedia;
}

// ── Gallery Item API Responses ────────────────────────────────────────────────
export interface GalleryItemListResponse {
  success: boolean;
  message: string;
  data: GalleryItem[];
}

export interface GalleryItemSingleResponse {
  success: boolean;
  message: string;
  data: GalleryItem;
}

export interface GalleryItemDeleteResponse {
  success: boolean;
  message: string;
}

// ── Payloads ──────────────────────────────────────────────────────────────────
export interface UpdateGallerySectionPayload {
  hook?: string;
  title?: string;
  description?: string;
}

export interface CreateGalleryItemPayload {
  gallery_section_id: number;
  title: string;
  description: string;
  image: File;
  alt_text: string;
  image_title: string;
  sort_order: number;
}

export interface UpdateGalleryItemPayload {
  gallery_section_id?: number;
  title?: string;
  description?: string;
  image?: File;
  alt_text?: string;
  image_title?: string;
  sort_order?: number;
}
