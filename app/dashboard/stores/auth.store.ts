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
  hydrate: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => {
  // Always start with null on both server and client to avoid hydration mismatch.
  // The actual localStorage values are loaded in the hydrate() call below.
  return {
    token: null,
    user: null,
    isAuthenticated: false,

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

    hydrate: () => {
      if (typeof window === "undefined") return;
      const token = localStorage.getItem("cms_token");
      const rawUser = localStorage.getItem("cms_user");
      const user = rawUser ? JSON.parse(rawUser) : null;
      set({ token, user, isAuthenticated: !!token });
    },
  };
});

// Hydrate the store on the client once the module loads
if (typeof window !== "undefined") {
  useAuthStore.getState().hydrate();
}