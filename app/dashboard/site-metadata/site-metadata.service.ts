import { HttpClient } from "@/lib/http/http-client";
import { SiteMetadataResponse, SiteMetadataUpdateResponse } from "./site-metadata";
import { getAuthToken } from "@/lib/http/auth";

const http = new HttpClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL!,
  getToken: getAuthToken,
});
export const SiteMetadataService = {
  get: async () => {
    const res = await http.get<SiteMetadataResponse>("/site_metadata");
    return res.data;
  },

  update: async (id: number, data: FormData) => {
    const res = await http.post<SiteMetadataUpdateResponse>(`/site_metadata/${id}`, data);
    return res.data;
  },
};