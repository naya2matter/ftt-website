import { HttpClient } from "@/lib/http/http-client";
import { getAuthToken } from "@/lib/http/auth";
import { CtaListResponse, CtaSingleResponse, CtaUpdatePayload } from "./cta";

const http = new HttpClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  getToken: getAuthToken,
});

export const CtaService = {
  getAll: (): Promise<CtaListResponse> => {
    return http.get<CtaListResponse>("/ctas");
  },

  getById: (id: number): Promise<CtaSingleResponse> => {
    return http.get<CtaSingleResponse>(`/ctas/${id}`);
  },

  update: (id: number, payload: CtaUpdatePayload): Promise<CtaSingleResponse> => {
    return http.post<CtaSingleResponse>(`/ctas/${id}`, payload);
  },
};
