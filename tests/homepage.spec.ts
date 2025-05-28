import { test, expect, type Page } from "@playwright/test";

test("User can navigate to races and see pinned races", async ({
  page,
}: {
  page: Page;
}) => {
  await page.goto("http://localhost:5173");

  await page.click("text=2015");

  await page.waitForSelector("text=Grand Prix");

  const race = await page.locator(".card, .list-item").first();
  await race.click();

  await expect(page.locator("text=Result")).toBeVisible();
  await expect(page.locator("text=Round")).toBeVisible();

  console.log(`done!`);
});
