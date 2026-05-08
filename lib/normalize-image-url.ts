export function normalizeImageUrl(rawUrl: string): string {
  const trimmedUrl = rawUrl.trim();

  if (!trimmedUrl) {
    return "";
  }

  return trimmedUrl.replace(
    /^http:\/\/(k|t1)\.kakaocdn\.net\//,
    "https://$1.kakaocdn.net/",
  );
}
