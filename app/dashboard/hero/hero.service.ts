import { HttpClient } from "@/lib/http/http-client";
import { getAuthToken } from "@/lib/http/auth";
import { HeroResponse, HeroUpdateResponse } from "./hero";

const http = new HttpClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  getToken: getAuthToken,
});

export const HeroService = {
  get: async () => {
    // The GET response is wrapped in data.original.data as an array
    return http.get<HeroResponse>("/hero_sections");
  },

  update: async (id: number, data: FormData) => {
    // The POST response is wrapped similarly - POST to endpoint with ID
    return http.post<HeroUpdateResponse>(`/hero_sections/${id}`, data);
  },
};

