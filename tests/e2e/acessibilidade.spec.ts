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

async function tabToFirstVideoCard(page: import("@playwright/test").Page) {
  await page.locator("#search-input").focus();
  await expect(page.locator("#search-input")).toBeFocused();

  // A partir da busca, avança por Tab (botão "Buscar", atalhos de categoria)
  // até alcançar o primeiro card — nada disso pode ser uma armadilha de foco.
  for (let i = 0; i < 10; i++) {
    const isOnCard = await page.evaluate(
      () => document.activeElement?.hasAttribute("data-video-card") ?? false
    );
    if (isOnCard) return;
    await page.keyboard.press("Tab");
  }
  throw new Error("Não foi possível alcançar um card de vídeo via Tab a partir da busca.");
}

test("navegação por teclado: campo de busca e cards são alcançáveis via Tab", async ({ page }) => {
  await page.goto("/");

  await tabToFirstVideoCard(page);
  const focused = page.locator(":focus");
  await expect(focused).toHaveAttribute("data-video-card", "");
});

test("cards de vídeo têm indicação visual de foco ao navegar por teclado", async ({ page }) => {
  await page.goto("/");

  await tabToFirstVideoCard(page);

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
