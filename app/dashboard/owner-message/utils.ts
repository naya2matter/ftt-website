// Normalize media URLs to ensure they have full domain
const CMS_DOMAIN = "http://cms.1ftt.com";
const STORAGE_PREFIX = "/storage";

export function normalizeMediaUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;

  // Already a full URL
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Relative path - prepend CMS domain and storage prefix
  if (url.startsWith("/")) {
    return `${CMS_DOMAIN}${STORAGE_PREFIX}${url}`;
  }

  // Just filename without path - add storage prefix
  return `${CMS_DOMAIN}${STORAGE_PREFIX}/${url}`;
}

export function normalizeFounderVideo(video: any) {
  if (!video) return video;
  return {
    ...video,
    url: normalizeMediaUrl(video.url),
    path: normalizeMediaUrl(video.path),
  };
}
