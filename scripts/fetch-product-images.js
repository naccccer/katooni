// Download product/hero/editorial images from Picsum (free, deterministic, no key).
// Saves to /public/products and /public/images so they are served as static assets
// with zero external dependency at runtime.

const fs = require("node:fs");
const path = require("node:path");
const https = require("node:https");

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const products = [
  { id: "kat-runner-volt", seed: "katooni-volt-runner-2", w: 1200, h: 1200 },
  { id: "kat-trail-monolith", seed: "katooni-trail-monolith-2", w: 1200, h: 1200 },
  { id: "kat-track-spike", seed: "katooni-track-spike-2", w: 1200, h: 1200 },
  { id: "kat-court-leather", seed: "katooni-court-leather-2", w: 1200, h: 1200 },
  { id: "kat-knit-pulse", seed: "katooni-knit-pulse-2", w: 1200, h: 1200 },
  { id: "kat-runner-pro", seed: "katooni-runner-pro-2", w: 1200, h: 1200 },
  { id: "kat-trail-storm", seed: "katooni-trail-storm-2", w: 1200, h: 1200 },
  { id: "kat-court-low", seed: "katooni-court-low-2", w: 1200, h: 1200 },
  { id: "kat-runner-cruiser", seed: "katooni-runner-cruiser-2", w: 1200, h: 1200 },
  { id: "kat-knit-trail", seed: "katooni-knit-trail-2", w: 1200, h: 1200 },
  { id: "kat-court-mid", seed: "katooni-court-mid-2", w: 1200, h: 1200 },
  { id: "kat-lifestyle-cruise", seed: "katooni-cruise-2", w: 1200, h: 1200 },
];

const images = [
  { out: "public/images/hero-lifestyle.jpg", seed: "katooni-hero-runner-3", w: 1800, h: 2200 },
  { out: "public/images/editorial-runner.jpg", seed: "katooni-editorial-1", w: 1800, h: 2400 },
  { out: "public/images/editorial-track.jpg", seed: "katooni-editorial-2", w: 2400, h: 1350 },
];

function fetchBinary(url, out) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { "User-Agent": UA } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // follow redirect
        fetchBinary(res.headers.location, out).then(resolve, reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        fs.mkdirSync(path.dirname(out), { recursive: true });
        fs.writeFileSync(out, Buffer.concat(chunks));
        resolve();
      });
      res.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(15000, () => req.destroy(new Error("timeout")));
  });
}

async function main() {
  console.log("Downloading 12 product images...");
  for (const p of products) {
    const out = `public/products/${p.id}.jpg`;
    const url = `https://picsum.photos/seed/${p.seed}/${p.w}/${p.h}`;
    try {
      await fetchBinary(url, out);
      const size = fs.statSync(out).size;
      console.log(`  OK ${p.id}.jpg (${(size / 1024).toFixed(0)} KB)`);
    } catch (e) {
      console.error(`  FAIL ${p.id}: ${e.message}`);
    }
  }
  console.log("Downloading hero + editorial images...");
  for (const img of images) {
    const url = `https://picsum.photos/seed/${img.seed}/${img.w}/${img.h}`;
    try {
      await fetchBinary(url, img.out);
      const size = fs.statSync(img.out).size;
      console.log(`  OK ${img.out} (${(size / 1024).toFixed(0)} KB)`);
    } catch (e) {
      console.error(`  FAIL ${img.out}: ${e.message}`);
    }
  }
  console.log("Done.");
}

main();
