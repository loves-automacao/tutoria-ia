import { test, expect } from "@playwright/test";

// RF01 — Listagem de vídeos

test("exibe um card para cada vídeo com thumbnail, título e duração", async ({ page }) => {
  await page.goto("/");

  const cards = page.locator("[data-video-card]");
  await expect(cards.first()).toBeVisible();
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);

  const firstCard = cards.first();
  await expect(firstCard.locator("img")).toBeVisible();
  await expect(firstCard.locator(".video-card-title")).not.toBeEmpty();
  await expect(firstCard.locator(".video-card-duration")).toContainText("min");
});

test("mostra mensagem amigável quando não há vídeos cadastrados", async ({ page }) => {
  // Rota de apoio a QA que renderiza o catálogo sem vídeos (ver src/pages/qa/catalogo-vazio.astro).
  await page.goto("/qa/catalogo-vazio");

  await expect(page.locator("#no-videos-message")).toBeVisible();
  await expect(page.locator("[data-video-card]")).toHaveCount(0);
});
