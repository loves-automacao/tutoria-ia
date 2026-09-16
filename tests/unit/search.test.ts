import { describe, expect, it } from "vitest";
import { filterVideos } from "../../src/lib/search";
import type { Video } from "../../src/data/videos";

const videos: Video[] = [
  {
    id: "1",
    title: "Como usar o ChatGPT",
    youtubeId: "abc123",
    category: "Primeiros passos",
    durationLabel: "5 min",
    startHere: true,
  },
  {
    id: "2",
    title: "Inteligência Artificial no dia a dia",
    youtubeId: "def456",
    category: "Assistentes de IA no dia a dia",
    durationLabel: "8 min",
  },
  {
    id: "3",
    title: "Cuidados e segurança com IA",
    youtubeId: "ghi789",
    category: "Cuidados e segurança",
    durationLabel: "6 min",
  },
];

describe("filterVideos (RF03)", () => {
  it("encontra um vídeo existente pelo título", () => {
    const result = filterVideos(videos, "chatgpt");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Como usar o ChatGPT");
  });

  it("retorna lista vazia quando o termo não existe", () => {
    const result = filterVideos(videos, "xyz123");
    expect(result).toHaveLength(0);
  });

  it("ignora maiúsculas/minúsculas e acentuação", () => {
    const result = filterVideos(videos, "inteligencia artificial");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("retorna todos os vídeos quando a busca está vazia", () => {
    const result = filterVideos(videos, "");
    expect(result).toHaveLength(videos.length);
  });
});
