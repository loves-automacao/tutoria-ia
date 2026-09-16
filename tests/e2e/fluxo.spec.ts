import { test, expect } from "@playwright/test";

// RNF03 — Poucos cliques até o conteúdo

test("chegar a um vídeo leva no máximo 1 clique a partir da página inicial", async ({ page }) => {
  await page.goto("/");

  const firstCard = page.locator("[data-video-card]").first();
  await firstCard.click();

  // Nenhuma etapa intermediária (confirmação, login) deve aparecer.
  await expect(page.locator("#player-section")).toBeVisible();
});

// RF05 — "Comece por aqui" também deve levar ao vídeo em 1 clique.
test("links de 'comece aqui' levam direto ao vídeo em 1 clique", async ({ page }) => {
  await page.goto("/");

  const startHereLink = page.locator("[data-start-here-link]").first();
  await startHereLink.click();

  await expect(page.locator("#player-section")).toBeVisible();
});

// RF07 — Botão "voltar ao topo"
test("botão voltar ao topo leva de volta ao início da página", async ({ page }) => {
  await page.goto("/");

  await page.locator("[data-video-card]").last().scrollIntoViewIfNeeded();
  const scrolledY = await page.evaluate(() => window.scrollY);
  expect(scrolledY).toBeGreaterThan(0);

  await page.locator("#back-to-top").click();
  await page.waitForFunction(() => window.scrollY === 0);

  const finalY = await page.evaluate(() => window.scrollY);
  expect(finalY).toBe(0);
});
