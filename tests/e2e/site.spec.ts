import { expect, test } from "@playwright/test";

test.beforeEach(async ({ context }) => {
  // Tests use only the local build. Analytics and external sites are not needed.
  await context.route("**/*", (route) => {
    const url = new URL(route.request().url());
    return url.origin === "http://127.0.0.1:3108" ? route.continue() : route.abort();
  });
});

for (const width of [320, 375, 480, 481, 760, 768, 1000, 1001, 1024, 1100, 1180, 1181, 1199, 1200, 1201, 1440, 1920]) {
  test(`workbench fits without clipping at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const workbench = page.locator(".open-ena-preview");
    await expect(workbench).toBeVisible();
    const bounds = await workbench.boundingBox();
    expect(bounds).not.toBeNull();
    for (const selector of [".preview-control-panel", ".preview-visual-toolbar", ".preview-comparison-plot", ".preview-side-column"]) {
      const box = await page.locator(selector).boundingBox();
      expect(box, selector).not.toBeNull();
      expect(box!.x, selector).toBeGreaterThanOrEqual(bounds!.x);
      expect(box!.x + box!.width, selector).toBeLessThanOrEqual(bounds!.x + bounds!.width);
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test("all five modes switch by keyboard and keep analysis actions disabled", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const modes = [
    ["Sets", "Shared-space sets"],
    ["Data", "Open coded data"],
    ["Model", "Configure jENA"],
    ["Plot", "Visual encoding"],
    ["Stats", "Inference & diagnostics"],
  ];
  for (const [mode, heading] of [...modes, ...modes.slice().reverse()]) {
    const button = page.getByRole("button", { name: `Show ${mode} interface panel` });
    await button.focus();
    await button.press("Enter");
    await expect(button).toHaveAttribute("aria-current", "step");
    await expect(page.locator(".preview-rail-modes [aria-current]")).toHaveCount(1);
    await expect(page.getByRole("complementary", { name: `${mode} interface preview` }).getByRole("heading", { name: heading })).toBeVisible();
    await expect(page.locator('[aria-live="polite"]')).toHaveText(`Showing the ${mode} interface preview.`);
    await expect(page.locator(".preview-control-panel :is(button, input, select):not(:disabled)")).toHaveCount(0);
  }
  await expect(page.locator('.preview-visual-workspace :is(button, input, select):not(:disabled)')).toHaveCount(0);
  await expect(page.locator('input[type="file"]')).toHaveCount(0);
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
  expect(errors).toEqual([]);
});

test("local navigation, metadata and publication images survive client navigation", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL("/about");
  await expect(page).toHaveTitle("About | Open ENA");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.open-ena.com/about");
  await expect(page.locator(".team-card")).toHaveCount(4);
  await expect(page.locator(".publication-card")).toHaveCount(3);
  for (const img of await page.locator(".team-card img, .publication-card img").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  }
  const data = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
  expect(data["@graph"]).toHaveLength(7);
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Open ENA", exact: true }).click();
  await expect(page).toHaveURL("/");
  await expect(page).toHaveTitle("Open ENA");
  await page.getByRole("button", { name: "Show Data interface panel" }).click();
  await expect(page.getByRole("heading", { name: "Open coded data" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("static routes, redirects and image validation behave in production", async ({ request }) => {
  for (const path of ["/", "/about", "/robots.txt", "/sitemap.xml", "/manifest.webmanifest", "/favicon.svg"]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    expect(response.headers()["x-powered-by"]).toBeUndefined();
  }
  const missing = await request.get("/this-route-does-not-exist");
  expect(missing.status()).toBe(404);
  const legacy = await request.get("/open-ena?example=1", { maxRedirects: 0 });
  expect(legacy.status()).toBe(308);
  expect(legacy.headers().location).toBe("/?example=1");
  const canonical = await request.get("/about?example=1", { headers: { host: "open-ena.com" }, maxRedirects: 0 });
  expect(canonical.status()).toBe(308);
  expect(canonical.headers().location).toBe("https://www.open-ena.com/about?example=1");
  const image = await request.get("/_next/image?url=%2Fteam%2Fpeter-hu-dongpin.png&w=256&q=75");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toMatch(/^image\//);
  const invalidWidth = await request.get("/_next/image?url=%2Fteam%2Fpeter-hu-dongpin.png&w=invalid&q=75");
  expect(invalidWidth.status()).toBe(400);
});

test("keyboard focus on the dark mode rail has at least 3:1 contrast", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  for (const button of await page.locator(".preview-rail-modes button").all()) {
    await button.focus();
    await expect(button).toBeFocused();
    const colors = await button.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        visible: element.matches(":focus-visible") && style.outlineStyle !== "none" && parseFloat(style.outlineWidth) > 0,
        outline: style.outlineColor,
        background: getComputedStyle(element.closest("nav")!).backgroundColor,
      };
    });
    expect(colors.visible).toBe(true);
    const luminance = (color: string) => {
      const rgb = color.match(/[\d.]+/g)!.slice(0, 3).map(Number).map((channel) => {
        const s = channel / 255;
        return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      });
      return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
    };
    const a = luminance(colors.outline);
    const b = luminance(colors.background);
    expect((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)).toBeGreaterThanOrEqual(3);
  }
});
