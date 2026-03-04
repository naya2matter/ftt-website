"use client";

import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { HttpError } from "./errors";

export type HttpClientOptions = {
  baseUrl: string;
  getToken?: () => string | null;
  timeoutMs?: number;
};

export class HttpClient {
  private client: AxiosInstance;

  constructor(private opts: HttpClientOptions) {
    this.client = axios.create({
      baseURL: opts.baseUrl,
      timeout: opts.timeoutMs ?? 3000000,
      headers: {
        Accept: "application/json",
      },
    });

    // Attach Bearer token automatically
    this.client.interceptors.request.use((config) => {
      const token = this.opts.getToken?.();
      const isLogin = config.url?.includes("/login");

      if (token && !isLogin) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }

      // For FormData requests, don't set Content-Type header
      // Let axios/browser handle it automatically with proper boundary
      if (config.data instanceof FormData) {
        // Remove Content-Type if it exists to let axios handle it
        if (config.headers["Content-Type"]) {
          delete config.headers["Content-Type"];
        }
      }

      return config;
    });

    // Standardized error handling
    this.client.interceptors.response.use(
      (res) => res,
      (error: AxiosError) => {
        const status = error.response?.status ?? 0;
        const details = error.response?.data ?? {
          message: error.message,
        };

        throw new HttpError(
          `HTTP ${status || "ERR"} for ${error.config?.url}`,
          status,
          details
        );
      }
    );
  }

  private async request<T>(
    config: AxiosRequestConfig
  ): Promise<T> {
    // log method/url for easier debugging when requests fail
    try {
      // eslint-disable-next-line no-console
      console.debug("HTTP ->", config.method?.toString().toUpperCase(), config.url);
    } catch {}

    const res: AxiosResponse<T> = await this.client.request<T>(config);
    return res.data;
  }

  // Expose a raw request method for cases where precise control is needed
  requestRaw<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>(config);
  }

  login<T = any>(payload: {
    email: string;
    password: string;
  }): Promise<T> {
    const formData = new FormData();
    formData.append("email", payload.email);
    formData.append("password", payload.password);

    return this.request<T>({
      url: "/login",
      method: "POST",
      data: formData,
      headers: { Accept: "application/json" },
    });
  }

  logout<T = any>(): Promise<T> {
    return this.post<T>("/logout", {});
  }

  get<T>(path: string, config?: AxiosRequestConfig) {
    return this.request<T>({
      ...config,
      url: path,
      method: "GET",
    });
  }

  post<T>(
    path: string,
    payload?: unknown,
    config?: AxiosRequestConfig
  ) {
    return this.request<T>({
      ...config,
      url: path,
      method: "POST",
      data: payload,
    });
  }

  put<T>(
    path: string,
    payload?: unknown,
    config?: AxiosRequestConfig
  ) {
    return this.request<T>({
      ...config,
      url: path,
      method: "POST",
      data: payload,
    });
  }

  delete<T>(path: string, config?: AxiosRequestConfig) {
    return this.request<T>({
      ...config,
      url: path,
      method: "DELETE",
    });
  }
}