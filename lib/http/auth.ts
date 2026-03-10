export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("cms_token");
};

export const getStoredUser = (): { name?: string; email?: string; avatar?: string } | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("cms_user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};
