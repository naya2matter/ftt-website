import { HttpClient } from "@/lib/http/http-client";
import { getAuthToken } from "@/lib/http/auth";
import {
  OfferSectionListResponse,
  OfferSectionSingleResponse,
  OfferRequirementListResponse,
  OfferRequirementSingleResponse,
  OfferRequirementDeleteResponse,
  UpdateOfferSectionPayload,
  CreateOfferRequirementPayload,
  UpdateOfferRequirementPayload,
} from "./sign-on-bonus";

const http = new HttpClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  getToken: getAuthToken,
});

export const signOnBonusService = {
  // ── Offer Section ──────────────────────────────────────────────────────────
  getOfferSections: (): Promise<OfferSectionListResponse> => {
    return http.get<OfferSectionListResponse>("/offer-sections/");
  },

  updateOfferSection: (
    id: number,
    payload: UpdateOfferSectionPayload
  ): Promise<OfferSectionSingleResponse> => {
    const formData = new FormData();
    (Object.keys(payload) as (keyof UpdateOfferSectionPayload)[]).forEach(
      (key) => {
        const val = payload[key];
        if (val === undefined || val === null) return;
        if (val instanceof File) {
          formData.append(key, val);
        } else {
          formData.append(key, String(val));
        }
      }
    );
    return http.post<OfferSectionSingleResponse>(
      `/offer-sections/${id}`,
      formData
    );
  },

  // ── Offer Requirements ─────────────────────────────────────────────────────
  getOfferRequirements: (): Promise<OfferRequirementListResponse> => {
    return http.get<OfferRequirementListResponse>("/offer-requirements/");
  },

  getOfferRequirement: (
    id: number
  ): Promise<OfferRequirementSingleResponse> => {
    return http.get<OfferRequirementSingleResponse>(
      `/offer-requirements/${id}`
    );
  },

  createOfferRequirement: (
    payload: CreateOfferRequirementPayload
  ): Promise<OfferRequirementSingleResponse> => {
    return http.post<OfferRequirementSingleResponse>(
      "/offer-requirements",
      payload
    );
  },

  updateOfferRequirement: (
    id: number,
    payload: UpdateOfferRequirementPayload
  ): Promise<OfferRequirementSingleResponse> => {
    return http.put<OfferRequirementSingleResponse>(
      `/offer-requirements/${id}`,
      payload
    );
  },

  deleteOfferRequirement: (
    id: number
  ): Promise<OfferRequirementDeleteResponse> => {
    return http.delete<OfferRequirementDeleteResponse>(
      `/offer-requirements/${id}`
    );
  },
};
