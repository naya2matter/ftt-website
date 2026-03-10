import { HttpClient } from "@/lib/http/http-client";
import { getAuthToken } from "@/lib/http/auth";
import {
  FooterContactListResponse,
  FooterContactSingleResponse,
  FooterSocialLinkListResponse,
  FooterSocialLinkSingleResponse,
  UpdateFooterContactPayload,
  UpdateFooterSocialLinkPayload,
} from "./footer";

const http = new HttpClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  getToken: getAuthToken,
});

export const FooterService = {
  // ── Footer Contact ──────────────────────────────────────────────────────────
  getFooterContacts: (): Promise<FooterContactListResponse> => {
    return http.get<FooterContactListResponse>("/footer-contacts");
  },

  updateFooterContact: (
    id: number,
    payload: UpdateFooterContactPayload
  ): Promise<FooterContactSingleResponse> => {
    return http.post<FooterContactSingleResponse>(
      `/footer-contacts/${id}`,
      payload
    );
  },

  // ── Footer Social Links ─────────────────────────────────────────────────────
  getFooterSocialLinks: (): Promise<FooterSocialLinkListResponse> => {
    return http.get<FooterSocialLinkListResponse>("/footer-social-links/");
  },

  updateFooterSocialLink: (
    id: number,
    payload: UpdateFooterSocialLinkPayload
  ): Promise<FooterSocialLinkSingleResponse> => {
    return http.post<FooterSocialLinkSingleResponse>(
      `/footer-social-links/${id}`,
      payload
    );
  },
};
