import { create } from "zustand";

type User = {
  name?: string;
  email?: string;
  avatar?: string;
};

type AuthState = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => {
  let token: string | null = null;
  let user: User | null = null;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("cms_token");

    const rawUser = localStorage.getItem("cms_user");
    user = rawUser ? JSON.parse(rawUser) : null;
  }

  return {
    token,
    user,
    isAuthenticated: !!token,

    login: (token, user) => {
      localStorage.setItem("cms_token", token);
      localStorage.setItem("cms_user", JSON.stringify(user));

      set({
        token,
        user,
        isAuthenticated: true,
      });
    },

    logout: () => {
      localStorage.removeItem("cms_token");
      localStorage.removeItem("cms_user");

      set({
        token: null,
        user: null,
        isAuthenticated: false,
      });
    },
  };
});