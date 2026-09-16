import { test, expect } from "@playwright/test";

// RNF01, RNF02, RNF10 — Acessibilidade / legibilidade

test("tamanho de fonte do corpo do texto é de pelo menos 16px (18px no desktop)", async ({
  page,
}) => {
  await page.goto("/");

  const bodyFontSize = await page.evaluate(() => {
    return parseFloat(window.getComputedStyle(document.body).fontSize);
  });

  expect(bodyFontSize).toBeGreaterThanOrEqual(18);
});

test("em tela de celular a fonte do corpo nunca fica abaixo de 16px", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");

  const bodyFontSize = await page.evaluate(() => {
    return parseFloat(window.getComputedStyle(document.body).fontSize);
  });

  expect(bodyFontSize).toBeGreaterThanOrEqual(16);
});

test("navegação por teclado: campo de busca e cards são alcançáveis via Tab", async ({ page }) => {
  await page.goto("/");

  await page.locator("#search-input").focus();
  await expect(page.locator("#search-input")).toBeFocused();

  // Tab a partir da busca deve alcançar o primeiro card de vídeo.
  await page.keyboard.press("Tab");
  const focused = page.locator(":focus");
  await expect(focused).toHaveAttribute("data-video-card", "");
});

test("cards de vídeo têm indicação visual de foco ao navegar por teclado", async ({ page }) => {
  await page.goto("/");

  await page.locator("#search-input").focus();
  await page.keyboard.press("Tab");

  const focusedCard = page.locator("[data-video-card]:focus");
  const outlineWidth = await focusedCard.evaluate(
    (el) => window.getComputedStyle(el).outlineWidth
  );
  expect(outlineWidth).not.toBe("0px");
});

test("imagens dos cards têm marcação alt e título textual visível ao lado", async ({ page }) => {
  await page.goto("/");

  const firstCard = page.locator("[data-video-card]").first();
  await expect(firstCard.locator("img")).toHaveAttribute("alt", "");
  await expect(firstCard.locator(".video-card-title")).not.toBeEmpty();
});
