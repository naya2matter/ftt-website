import { HttpClient } from "@/lib/http/http-client";
import { getAuthToken } from "@/lib/http/auth";
import {
  BenefitsSectionListResponse,
  BenefitsSectionSingleResponse,
  BenefitsItemListResponse,
  BenefitsItemSingleResponse,
  BenefitsItemDeleteResponse,
  UpdateBenefitsSectionPayload,
  CreateBenefitsItemPayload,
  UpdateBenefitsItemPayload,
} from "./benefits";

const http = new HttpClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  getToken: getAuthToken,
});

export const BenefitsService = {
  // ── Benefits Section ────────────────────────────────────────────────────────
  getBenefitsSections: (): Promise<BenefitsSectionListResponse> => {
    return http.get<BenefitsSectionListResponse>("/benefits-sections/");
  },

  updateBenefitsSection: (
    id: number,
    payload: UpdateBenefitsSectionPayload
  ): Promise<BenefitsSectionSingleResponse> => {
    return http.post<BenefitsSectionSingleResponse>(
      `/benefits-sections/${id}`,
      payload
    );
  },

  // ── Benefits Items ──────────────────────────────────────────────────────────
  getBenefitsItems: (): Promise<BenefitsItemListResponse> => {
    return http.get<BenefitsItemListResponse>("/benefits-items/");
  },

  createBenefitsItem: (
    payload: CreateBenefitsItemPayload
  ): Promise<BenefitsItemSingleResponse> => {
    return http.post<BenefitsItemSingleResponse>("/benefits-items", payload);
  },

  updateBenefitsItem: (
    id: number,
    payload: UpdateBenefitsItemPayload
  ): Promise<BenefitsItemSingleResponse> => {
    return http.put<BenefitsItemSingleResponse>(
      `/benefits-items/${id}`,
      payload
    );
  },

  deleteBenefitsItem: (
    id: number
  ): Promise<BenefitsItemDeleteResponse> => {
    return http.delete<BenefitsItemDeleteResponse>(`/benefits-items/${id}`);
  },
};
