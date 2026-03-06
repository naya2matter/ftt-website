"use client";

import { HttpClient } from "@/lib/http/http-client";
import { getAuthToken } from "@/lib/http/auth";
import {
  WhyUsItemsResponse,
  WhyUsItemResponse,
  DeleteWhyUsItemResponse,
  CreateWhyUsItemPayload,
  UpdateWhyUsItemPayload,
} from "./whyftt";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

const httpClient = new HttpClient({
  baseUrl: BASE_URL,
  getToken: getAuthToken,
});

const buildFormData = (payload: CreateWhyUsItemPayload | UpdateWhyUsItemPayload): FormData => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (key === "icon" && !(value instanceof File)) return;

    if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === "number") {
      formData.append(key, String(value));
    } else if (typeof value === "string") {
      formData.append(key, value);
    } else if (typeof value === "boolean") {
      formData.append(key, String(value ? 1 : 0));
    }
  });

  return formData;
};

export class WhyUsItemsService {
  static async getWhyUsItems(): Promise<WhyUsItemsResponse> {
    return httpClient.get<WhyUsItemsResponse>("/why-us-items");
  }

  static async getWhyUsItem(id: number): Promise<WhyUsItemResponse> {
    return httpClient.get<WhyUsItemResponse>(`/why-us-items/${id}`);
  }

  static async createWhyUsItem(payload: CreateWhyUsItemPayload): Promise<WhyUsItemResponse> {
    const formData = buildFormData(payload);
    return httpClient.requestRaw<WhyUsItemResponse>({
      url: "/why-us-items",
      method: "POST",
      data: formData,
    });
  }

  static async updateWhyUsItem(
    id: number,
    payload: UpdateWhyUsItemPayload
  ): Promise<WhyUsItemResponse> {
    const formData = buildFormData(payload);
    return httpClient.requestRaw<WhyUsItemResponse>({
      url: `/why-us-items/${id}`,
      method: "POST",
      data: formData,
    });
  }

  static async deleteWhyUsItem(id: number): Promise<DeleteWhyUsItemResponse> {
    return httpClient.delete<DeleteWhyUsItemResponse>(`/why-us-items/${id}`);
  }
}
