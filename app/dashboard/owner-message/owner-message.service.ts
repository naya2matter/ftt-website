import { HttpClient } from "@/lib/http/http-client";
import { getAuthToken } from "@/lib/http/auth";
import { FounderSectionResponse, FounderSectionUpdateResponse, UpdateFounderPayload } from "./owner-message";
import { normalizeFounderVideo } from "./utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

class OwnerMessageService {
  private client: HttpClient;

  constructor() {
    this.client = new HttpClient({
      baseUrl: API_BASE_URL,
      getToken: getAuthToken,
    });
  }

  async getFounderSection(): Promise<FounderSectionResponse> {
    const res = await this.client.get<FounderSectionResponse>("/founder-sections");
    // Normalize video URLs from response
    return {
      ...res,
      data: res.data?.map(section => ({
        ...section,
        video: normalizeFounderVideo(section.video),
      })) || [],
    };
  }

  async updateFounderSection(id: number, payload: UpdateFounderPayload): Promise<FounderSectionUpdateResponse> {
    // Build FormData to support both text and file upload
    const form = new FormData();
    form.append("hook_text", payload.hook_text);
    form.append("title", payload.title);
    form.append("description", payload.description);
    
    if (payload.video) {
      form.append("video", payload.video);
    }
    if (payload.title_video) {
      form.append("title_video", payload.title_video);
    }
    if (payload.alt_text) {
      form.append("alt_text", payload.alt_text);
    }

    const res = await this.client.put<FounderSectionUpdateResponse>(`/founder-sections/${id}`, form);
    // Normalize video URLs from response
    return {
      ...res,
      data: {
        ...res.data,
        video: normalizeFounderVideo(res.data?.video),
      },
    };
  }
}

export const ownerMessageService = new OwnerMessageService();
