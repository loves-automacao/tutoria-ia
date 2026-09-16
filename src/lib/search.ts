import type { Video } from "../data/videos";

export function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

export function filterVideos(videos: Video[], query: string): Video[] {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return videos;

  return videos.filter((video) =>
    normalizeText(video.title).includes(normalizedQuery)
  );
}
