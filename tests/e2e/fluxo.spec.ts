import { test, expect } from "@playwright/test";

// RNF03 — Poucos cliques até o conteúdo

test("chegar a um vídeo leva no máximo 1 clique a partir da página inicial", async ({ page }) => {
  await page.goto("/");

  const firstCard = page.locator("[data-video-card]").first();
  await firstCard.click();

  // Nenhuma etapa intermediária (confirmação, login) deve aparecer.
  await expect(page.locator("#player-section")).toBeVisible();
});

// RF05 — "Primeiros passos" é a primeira categoria da página e também é
// alcançável em 1 clique pelo atalho "Ou desça a página" (esse atalho é
// removido no mobile por design — lá a categoria já é a primeira coisa
// visível ao rolar, então o atalho seria redundante).
test("atalho 'ou desça a página' leva direto à categoria de primeiros passos", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "jump-row é removida no mobile por design");
  await page.goto("/");

  await page.getByRole("link", { name: "Primeiros passos" }).click();

  await expect(page.locator("#categoria-primeiros-passos")).toBeInViewport();
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
