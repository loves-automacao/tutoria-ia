import { test, expect } from "@playwright/test";

// RF02 — Reprodução de vídeo
// Nota: a lista de produção ainda usa IDs de vídeo placeholder
// (ver src/data/videos.ts) até a equipe cadastrar os vídeos reais.
// Por isso os testes abaixo verificam o comportamento de navegação/estado
// da interface, que independe do conteúdo real do YouTube.

test("reproduzir vídeo a partir da lista: carrega o player embutido sem redirecionar", async ({
  page,
}) => {
  await page.goto("/");
  const urlBefore = page.url();

  const firstCard = page.locator("[data-video-card]").first();
  const title = await firstCard.locator(".video-card-title").innerText();
  await firstCard.click();

  await expect(page.locator("#player-section")).toBeVisible();
  await expect(page.locator("#video-list-section")).toBeHidden();
  await expect(page.locator("#player-title")).toHaveText(title);
  expect(page.url()).toBe(urlBefore);

  await expect(page.locator("#back-to-list")).toBeFocused();
});

test("vídeo indisponível: exibe erro e caminho claro de volta à lista", async ({ page }) => {
  await page.goto("/");

  await page.locator("[data-video-card]").first().click();

  await expect(page.locator("#player-error")).toBeVisible({ timeout: 10_000 });

  await page.locator("#player-error-back").click();
  await expect(page.locator("#video-list-section")).toBeVisible();
  await expect(page.locator("#player-section")).toBeHidden();
});

test("botão voltar à lista funciona a partir do player", async ({ page }) => {
  await page.goto("/");

  await page.locator("[data-video-card]").first().click();
  await expect(page.locator("#player-section")).toBeVisible();

  await page.locator("#back-to-list").click();

  await expect(page.locator("#video-list-section")).toBeVisible();
  await expect(page.locator("#player-section")).toBeHidden();
});
