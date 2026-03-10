import { HttpClient } from "@/lib/http/http-client";
import { getAuthToken } from "@/lib/http/auth";
import {
  GallerySectionListResponse,
  GallerySectionUpdateResponse,
  GalleryItemListResponse,
  GalleryItemSingleResponse,
  GalleryItemDeleteResponse,
  UpdateGallerySectionPayload,
  CreateGalleryItemPayload,
  UpdateGalleryItemPayload,
} from "./gallery";

const http = new HttpClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  getToken: getAuthToken,
});

export const GalleryService = {
  // ── Gallery Section ──────────────────────────────────────────────────────────────
  getGallerySections: (): Promise<GallerySectionListResponse> => {
    return http.get<GallerySectionListResponse>("/gallery-sections");
  },

  updateGallerySection: (
    id: number,
    payload: UpdateGallerySectionPayload
  ): Promise<GallerySectionUpdateResponse> => {
    return http.post<GallerySectionUpdateResponse>(
      `/gallery-sections/${id}`,
      payload
    );
  },

  // ── Gallery Items ───────────────────────────────────────────────────────────────
  getGalleryItems: (): Promise<GalleryItemListResponse> => {
    return http.get<GalleryItemListResponse>("/gallery-items/");
  },

  getGalleryItemById: (id: number): Promise<GalleryItemSingleResponse> => {
    return http.get<GalleryItemSingleResponse>(`/gallery-items/${id}`);
  },

  createGalleryItem: (
    payload: CreateGalleryItemPayload
  ): Promise<GalleryItemSingleResponse> => {
    const formData = new FormData();
    (Object.keys(payload) as (keyof CreateGalleryItemPayload)[]).forEach((key) => {
      const val = payload[key];
      if (val === undefined || val === null) return;
      if (val instanceof File) {
        formData.append(key, val);
      } else {
        formData.append(key, String(val));
      }
    });
    return http.post<GalleryItemSingleResponse>("/gallery-items", formData);
  },

  updateGalleryItem: (
    id: number,
    payload: UpdateGalleryItemPayload
  ): Promise<GalleryItemSingleResponse> => {
    const formData = new FormData();
    (Object.keys(payload) as (keyof UpdateGalleryItemPayload)[]).forEach((key) => {
      const val = payload[key];
      if (val === undefined || val === null) return;
      if (val instanceof File) {
        formData.append(key, val);
      } else {
        formData.append(key, String(val));
      }
    });
    return http.post<GalleryItemSingleResponse>(`/gallery-items/${id}`, formData);
  },

  deleteGalleryItem: (id: number): Promise<GalleryItemDeleteResponse> => {
    return http.delete<GalleryItemDeleteResponse>(`/gallery-items/${id}`);
  },
};
