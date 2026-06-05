// Expand catalog: download 24 more product images for multi-brand store.
// Existing 12 Katooni images stay. Adding 24 more for Nike/Adidas/On/Asics/NB/Hoka.
const https = require("node:https");
const fs = require("node:fs");
const path = require("node:path");
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const newProducts = [
  // Nike running
  { id: "nike-pegasus-41", seed: "nike-pegasus-2024" },
  { id: "nike-vaporfly-3", seed: "nike-vaporfly-pro" },
  { id: "nike-infinityrn-4", seed: "nike-infinityrn-4" },
  { id: "nike-alphafly-3", seed: "nike-alphafly-next" },
  // Nike lifestyle
  { id: "nike-dunk-low", seed: "nike-dunk-low-2024" },
  { id: "nike-airmax-90", seed: "nike-airmax-90-classic" },
  { id: "nike-airforce-1", seed: "nike-airforce-1-white" },
  // Adidas
  { id: "adidas-ultraboost-23", seed: "adidas-ultraboost-23" },
  { id: "adidas-adizero-boston", seed: "adidas-adizero-boston-12" },
  { id: "adidas-samba-og", seed: "adidas-samba-classic" },
  { id: "adidas-gazelle", seed: "adidas-gazelle-indoor" },
  // On
  { id: "on-cloudmonster", seed: "on-cloudmonster-2" },
  { id: "on-cloudflow-4", seed: "on-cloudflow-4" },
  { id: "on-roger-clubhouse", seed: "on-roger-clubhouse" },
  // Asics
  { id: "asics-novablast-4", seed: "asics-novablast-4" },
  { id: "asics-gel-nimbus-26", seed: "asics-gel-nimbus-26" },
  { id: "asics-metaspd-2", seed: "asics-metaracer-sp" },
  // New Balance
  { id: "nb-1080v13", seed: "newbalance-1080v13" },
  { id: "nb-fuelcell-rebel", seed: "newbalance-fuelrebel" },
  { id: "nb-990v6", seed: "newbalance-990v6-made" },
  { id: "nb-2002r-protection", seed: "newbalance-2002r-pro" },
  // Hoka
  { id: "hoka-clifton-9", seed: "hoka-clifton-9" },
  { id: "hoka-mach-6", seed: "hoka-mach-6" },
  { id: "hoka-speedgoat-5", seed: "hoka-speedgoat-5" },
];

function fetchBinary(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { "User-Agent": UA } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBinary(res.headers.location).then(resolve, reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(15000, () => req.destroy(new Error("timeout")));
  });
}

async function main() {
  console.log(`Downloading ${newProducts.length} new product images...`);
  for (const p of newProducts) {
    const out = path.join(__dirname, "..", "public", "products", `${p.id}.jpg`);
    try {
      const buf = await fetchBinary(`https://picsum.photos/seed/${p.seed}/1200/1200`);
      fs.writeFileSync(out, buf);
      console.log(`  OK ${p.id}.jpg (${(buf.length / 1024).toFixed(0)} KB)`);
    } catch (e) {
      console.error(`  FAIL ${p.id}: ${e.message}`);
    }
  }
  console.log("Done.");
}

main();
