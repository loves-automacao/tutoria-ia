import { test, expect } from "@playwright/test";

// RF06 — Responsividade

test("em tela de celular (375px), os cards ficam em coluna única e sem scroll horizontal", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");

  const cards = page.locator("[data-video-card]");
  const firstBox = await cards.nth(0).boundingBox();
  const secondBox = await cards.nth(1).boundingBox();
  expect(firstBox && secondBox).toBeTruthy();
  if (firstBox && secondBox) {
    // Coluna única: o segundo card aparece abaixo do primeiro, não ao lado.
    expect(secondBox.y).toBeGreaterThan(firstBox.y);
  }

  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
});

test("em tela de desktop (1440px), os cards se organizam em múltiplas colunas", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const cards = page.locator("[data-video-card]");
  const firstBox = await cards.nth(0).boundingBox();
  const secondBox = await cards.nth(1).boundingBox();
  expect(firstBox && secondBox).toBeTruthy();
  if (firstBox && secondBox) {
    // Múltiplas colunas: o segundo card aparece ao lado do primeiro (mesma linha).
    expect(Math.abs(secondBox.y - firstBox.y)).toBeLessThan(10);
  }
});
