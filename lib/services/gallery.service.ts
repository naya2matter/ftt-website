import type { GallerySection } from "./gallery.types";

const CMS_BASE_URL = process.env.CMS_API_URL ?? "http://cms.1ftt.com/api";

export async function fetchGalleryData(): Promise<GallerySection | null> {
  try {
    const res = await fetch(`${CMS_BASE_URL}/gallery`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.error(`[fetchGalleryData] HTTP ${res.status}`);
      return null;
    }
    const json = await res.json();
    const sections = json?.data?.gallery_section;
    return Array.isArray(sections) && sections.length > 0 ? sections[0] : null;
  } catch (err) {
    console.error("[fetchGalleryData] Error:", err);
    return null;
  }
}
