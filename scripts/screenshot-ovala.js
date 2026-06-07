// Take screenshots of the OVALA landing at different scroll positions
// to verify the scroll-driven carousel works.
const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const URL = process.env.URL || "http://localhost:3004/";
const OUT_DIR = path.join(__dirname, "..", "public");

async function main() {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto(URL, { waitUntil: "networkidle0", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1500));

    // Snapshot at top of page (center=0, first product active)
    await page.screenshot({
      path: path.join(OUT_DIR, "ovala-shot-0.png"),
      fullPage: false,
    });

    // Get the total scrollable height
    const totalScroll = await page.evaluate(() => {
      return document.documentElement.scrollHeight - window.innerHeight;
    });
    console.log("totalScroll", totalScroll);

    // Scroll to the middle (center=1, second product)
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), totalScroll * 0.5);
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({
      path: path.join(OUT_DIR, "ovala-shot-1.png"),
      fullPage: false,
    });

    // Scroll to the bottom (center=2, third product)
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), totalScroll);
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({
      path: path.join(OUT_DIR, "ovala-shot-2.png"),
      fullPage: false,
    });

    console.log("done");
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
