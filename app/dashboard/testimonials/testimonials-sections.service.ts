"use client";

import { HttpClient } from "@/lib/http/http-client";
import { getAuthToken } from "@/lib/http/auth";
import {
  TestimonialSectionsResponse,
  UpdateTestimonialSectionPayload,
  TestimonialResponse,
  CreateTestimonialPayload,
  UpdateTestimonialPayload,
} from "./testimonials-sections";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

const httpClient = new HttpClient({
  baseUrl: BASE_URL,
  getToken: getAuthToken,
});

export class TestimonialSectionsService {
  static async getTestimonialSections(): Promise<TestimonialSectionsResponse> {
    return httpClient.get<TestimonialSectionsResponse>(
      "/testimonials-sections"
    );
  }

  static async updateTestimonialSection(
    id: number,
    payload: UpdateTestimonialSectionPayload
  ): Promise<TestimonialSectionsResponse> {
    return httpClient.post<TestimonialSectionsResponse>(
      `/testimonials-sections/${id}`,
      payload
    );
  }

  // Testimonials CRUD operations
  static async getTestimonials(): Promise<TestimonialResponse> {
    return httpClient.get<TestimonialResponse>("/testimonials");
  }

  static async getTestimonial(id: number): Promise<TestimonialResponse> {
    return httpClient.get<TestimonialResponse>(`/testimonials/${id}`);
  }

  static async createTestimonial(
    payload: CreateTestimonialPayload
  ): Promise<TestimonialResponse> {
    const formData = new FormData();

    // Append each field, converting types appropriately for FormData
    Object.entries(payload).forEach(([key, value]) => {
      // Skip undefined/null values
      if (value === undefined || value === null) {
        return;
      }

      // Skip file if it doesn't exist
      if (key === "video" && !(value instanceof File)) {
        return;
      }

      // Convert non-file values to strings for FormData
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

    return httpClient.requestRaw<TestimonialResponse>({
      url: "/testimonials",
      method: "POST",
      data: formData,
    });
  }

  static async updateTestimonial(
    id: number,
    payload: UpdateTestimonialPayload
  ): Promise<TestimonialResponse> {
    const formData = new FormData();

    // Append each field, converting types appropriately for FormData
    Object.entries(payload).forEach(([key, value]) => {
      // Skip undefined/null values and empty files
      if (value === undefined || value === null) {
        return;
      }

      // Skip file if it doesn't exist (i.e., user didn't select a new one)
      if (key === "video" && !(value instanceof File)) {
        return;
      }

      // Convert non-file values to strings for FormData
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

    // Use POST for updates to support large video uploads
    // Don't set headers for FormData - let axios/browser handle Content-Type automatically
    return httpClient.requestRaw<TestimonialResponse>({
      url: `/testimonials/${id}`,
      method: "POST",
      data: formData,
    });
  }

  static async deleteTestimonial(id: number): Promise<TestimonialResponse> {
    return httpClient.delete<TestimonialResponse>(`/testimonials/${id}`);
  }
}
