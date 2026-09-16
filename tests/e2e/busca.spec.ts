import { test, expect } from "@playwright/test";

// RF03 — Busca

test("busca vídeo existente pelo título", async ({ page }) => {
  await page.goto("/");

  await page.locator("#search-input").fill("chatgpt");

  const visibleCards = page.locator("[data-video-card]:visible");
  await expect(visibleCards).toHaveCount(1);
  await expect(visibleCards.first().locator(".video-card-title")).toContainText("ChatGPT");
});

test("busca por termo inexistente mostra mensagem e permite limpar a busca", async ({ page }) => {
  await page.goto("/");

  await page.locator("#search-input").fill("xyz123");

  await expect(page.locator("#empty-state")).toBeVisible();
  await expect(page.locator("[data-video-card]:visible")).toHaveCount(0);

  await page.locator("#clear-search").click();

  await expect(page.locator("#empty-state")).toBeHidden();
  const totalCards = await page.locator("[data-video-card]").count();
  await expect(page.locator("[data-video-card]:visible")).toHaveCount(totalCards);
  await expect(page.locator("#search-input")).toHaveValue("");
});

test("busca é case-insensitive e ignora acentuação", async ({ page }) => {
  await page.goto("/");

  await page.locator("#search-input").fill("inteligencia artificial");

  const visibleCards = page.locator("[data-video-card]:visible");
  await expect(visibleCards).toHaveCount(1);
  await expect(visibleCards.first().locator(".video-card-title")).toContainText(
    "inteligência artificial"
  );
});
