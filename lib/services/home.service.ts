import type { HomeData } from "./home.types";

const CMS_BASE_URL = process.env.CMS_API_URL ?? "http://cms.1ftt.com/api";

export async function fetchHomeData(): Promise<HomeData | null> {
  try {
    const res = await fetch(`${CMS_BASE_URL}/home`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.error(`[fetchHomeData] HTTP ${res.status}`);
      return null;
    }
    const json = await res.json();
    // API response structure: json.data.original.data
    return (json?.data?.original?.data as HomeData) ?? null;
  } catch (err) {
    console.error("[fetchHomeData] Error:", err);
    return null;
  }
}
