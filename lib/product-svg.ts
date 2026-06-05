// High-fidelity shoe silhouette SVG generator.
// Each category gets a distinct, recognizable side-profile silhouette.
// Volt accent (#D7FF1E) on dark ink background. Always loads, no network.
import type { Product } from "./product-types";

const INK_0 = "#0A0A0B";
const INK_1 = "#101013";
const INK_2 = "#161619";
const INK_3 = "#1F1F24";
const INK_4 = "#2A2A30";
const VOLT = "#D7FF1E";
const VOLT_DIM = "#8FA012";
const PAPER_2 = "#A8A8A4";
const PAPER_3 = "#6E6E6A";

function hashString(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i);
  return Math.abs(h | 0);
}

function pickAccent(seed: number, colorways: { hex: string }[]): string {
  const volt = colorways.find((c) => c.hex.toLowerCase() === "#d7ff1e");
  if (volt) return VOLT;
  return colorways[seed % colorways.length]?.hex ?? VOLT;
}

// Build a side-profile shoe silhouette based on type.
// All paths draw at viewBox -400 -200 800 400 (centered). The renderer
// will scale to fit the 1600x1600 canvas.

function runnerPath(accent: string): string {
  // Modern running shoe profile (like a Pegasus / Vaporfly silhouette).
  return `
    <g>
      <!-- sole shadow -->
      <ellipse cx="0" cy="120" rx="320" ry="14" fill="#000" opacity="0.5"/>
      <!-- midsole (white-ish foam wedge) -->
      <path d="M -320 90
               C -330 60, -320 30, -290 20
               C -200 0, -80 -10, 40 -20
               C 160 -28, 270 -10, 320 30
               C 350 60, 340 100, 310 110
               L -290 110
               C -310 110, -325 105, -320 90 Z"
            fill="${INK_3}" stroke="${INK_4}" stroke-width="1.5"/>
      <!-- volt accent stripe along midsole -->
      <path d="M -290 60
               C -200 40, -80 30, 40 20
               C 160 10, 270 25, 310 55"
            fill="none" stroke="${accent}" stroke-width="4" opacity="0.95"/>
      <path d="M -290 50
               C -200 30, -80 20, 40 10
               C 160 0, 270 15, 310 45"
            fill="none" stroke="${accent}" stroke-width="2" opacity="0.45"/>
      <!-- upper main panel -->
      <path d="M -280 20
               C -300 -10, -290 -50, -260 -80
               C -200 -110, -120 -130, -40 -140
               C 60 -148, 160 -150, 240 -130
               C 290 -110, 310 -70, 305 -30
               C 300 0, 280 20, 240 25
               L -260 25
               C -275 25, -285 22, -280 20 Z"
            fill="${INK_1}" stroke="${INK_3}" stroke-width="1.5"/>
      <!-- toe cap (front curved section) -->
      <path d="M 220 -120
               C 270 -100, 305 -60, 305 -20
               C 305 5, 285 22, 250 25
               C 220 26, 200 20, 195 0
               C 192 -40, 200 -90, 220 -120 Z"
            fill="${INK_2}" stroke="${INK_3}" stroke-width="1.5"/>
      <!-- heel cup -->
      <path d="M -290 0
               C -310 -10, -315 -50, -300 -80
               C -280 -110, -240 -125, -200 -130
               C -180 -132, -170 -120, -175 -100
               C -180 -70, -200 -30, -240 -10
               C -270 5, -290 8, -290 0 Z"
            fill="${INK_2}" stroke="${INK_3}" stroke-width="1.5"/>
      <!-- tongue (slight raised panel) -->
      <path d="M -50 -130
               C -50 -160, 0 -170, 60 -168
               C 110 -166, 130 -150, 125 -130
               C 120 -110, 80 -100, 30 -100
               C -10 -100, -50 -110, -50 -130 Z"
            fill="${INK_1}" stroke="${INK_3}" stroke-width="1.5"/>
      <!-- collar padding (ankle opening) -->
      <ellipse cx="0" cy="-140" rx="80" ry="22" fill="${INK_0}" stroke="${INK_3}" stroke-width="1.5"/>
      <ellipse cx="0" cy="-140" rx="68" ry="14" fill="${INK_1}"/>
      <!-- lace eyelets (4 pairs) -->
      ${[-40, 0, 40, 80]
        .map(
          (x) =>
            `<circle cx="${x}" cy="-130" r="4" fill="${INK_0}" stroke="${accent}" stroke-width="1.5"/>` +
            `<circle cx="${x + 10}" cy="-120" r="4" fill="${INK_0}" stroke="${accent}" stroke-width="1.5"/>`,
        )
        .join("")}
      <!-- lace crisscross -->
      <path d="M -40 -130 L 10 -120 M 0 -130 L 50 -120 M 40 -130 L 90 -120 M 80 -130 L 130 -120"
            stroke="${accent}" stroke-width="1.5" opacity="0.6"/>
      <!-- volt heel tab -->
      <rect x="-310" y="-70" width="14" height="22" rx="3" fill="${accent}"/>
      <!-- mesh perforation dots on upper -->
      ${Array.from({ length: 18 })
        .map((_, i) => {
          const x = -200 + (i % 6) * 50;
          const y = -80 - Math.floor(i / 6) * 18;
          return `<circle cx="${x}" cy="${y}" r="1.5" fill="${INK_3}" opacity="0.7"/>`;
        })
        .join("")}
      <!-- volt volt swoosh-like side stripe -->
      <path d="M -100 -60 C -40 -90, 80 -100, 200 -50"
            fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round" opacity="0.9"/>
    </g>`;
}

function trailPath(accent: string): string {
  return `
    <g>
      <ellipse cx="0" cy="125" rx="330" ry="14" fill="#000" opacity="0.5"/>
      <!-- aggressive lugged outsole -->
      <path d="M -330 95
               C -340 70, -330 50, -300 45
               C -200 35, -80 25, 40 18
               C 160 12, 280 22, 320 55
               C 345 85, 335 115, 305 120
               L -310 120
               C -330 118, -340 110, -330 95 Z"
            fill="${INK_2}" stroke="${INK_4}" stroke-width="1.5"/>
      <!-- lugs (zigzag) -->
      <path d="M -310 115 L -300 130 L -290 115 L -280 130 L -270 115 L -260 130 L -250 115 L -240 130 L -230 115 L -220 130 L -210 115 L -200 130 L -190 115 L -180 130 L -170 115 L -160 130 L -150 115 L -140 130 L -130 115 L -120 130 L -110 115 L -100 130 L -90 115 L -80 130 L -70 115 L -60 130 L -50 115 L -40 130 L -30 115 L -20 130 L -10 115 L 0 130 L 10 115 L 20 130 L 30 115 L 40 130 L 50 115 L 60 130 L 70 115 L 80 130 L 90 115 L 100 130 L 110 115 L 120 130 L 130 115 L 140 130 L 150 115 L 160 130 L 170 115 L 180 130 L 190 115 L 200 130 L 210 115 L 220 130 L 230 115 L 240 130 L 250 115 L 260 130 L 270 115 L 280 130 L 290 115 L 300 130"
            fill="${INK_3}"/>
      <!-- volt midsole stripe -->
      <path d="M -300 60
               C -200 40, -80 30, 40 22
               C 160 16, 280 30, 315 60"
            fill="none" stroke="${accent}" stroke-width="4"/>
      <!-- upper: reinforced toe box -->
      <path d="M 220 -100
               C 280 -80, 315 -40, 312 0
               C 310 25, 290 35, 260 30
               C 230 28, 215 15, 215 -10
               C 215 -50, 218 -85, 220 -100 Z"
            fill="${INK_2}" stroke="${INK_3}" stroke-width="1.5"/>
      <!-- upper main body (chunkier than road runner) -->
      <path d="M -280 30
               C -310 -5, -300 -50, -270 -75
               C -210 -110, -120 -125, -40 -130
               C 60 -135, 160 -130, 220 -100
               C 240 -50, 240 0, 220 30
               L -260 30
               C -275 30, -285 28, -280 30 Z"
            fill="${INK_1}" stroke="${INK_3}" stroke-width="1.5"/>
      <!-- gusseted tongue -->
      <path d="M -40 -125
               C -40 -150, 20 -160, 70 -158
               C 120 -156, 140 -140, 130 -120
               C 120 -105, 80 -95, 30 -95
               C 0 -95, -40 -105, -40 -125 Z"
            fill="${INK_2}" stroke="${INK_3}" stroke-width="1.5"/>
      <!-- collar -->
      <ellipse cx="0" cy="-135" rx="75" ry="20" fill="${INK_0}"/>
      <!-- thick laces -->
      <path d="M -40 -110 Q 0 -100 40 -110" stroke="${accent}" stroke-width="3" fill="none"/>
      <path d="M 0 -118 Q 40 -108 80 -118" stroke="${accent}" stroke-width="3" fill="none"/>
      <path d="M 40 -110 Q 80 -100 120 -110" stroke="${accent}" stroke-width="3" fill="none"/>
      <!-- heel pull tab -->
      <path d="M -310 -50 L -290 -50 L -290 -20 L -310 -20 Z" fill="${accent}"/>
      <!-- rock plate indicator (volt patch) -->
      <ellipse cx="-50" cy="40" rx="40" ry="10" fill="${accent}" opacity="0.5"/>
    </g>`;
}

function trackPath(accent: string): string {
  // Competition racing flat / spike - very low profile
  return `
    <g>
      <ellipse cx="0" cy="80" rx="290" ry="10" fill="#000" opacity="0.5"/>
      <!-- very thin midsole -->
      <path d="M -300 60
               C -310 40, -300 20, -270 15
               C -180 0, -80 -8, 30 -15
               C 140 -20, 250 -8, 290 15
               C 315 35, 305 65, 280 70
               L -280 70
               C -298 68, -310 65, -300 60 Z"
            fill="${INK_2}" stroke="${INK_3}" stroke-width="1.5"/>
      <!-- spike pins -->
      <g transform="translate(0 70)">
        <line x1="-220" y1="0" x2="-200" y2="14" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
        <line x1="-130" y1="0" x2="-110" y2="14" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
        <line x1="-40" y1="0" x2="-20" y2="14" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
        <line x1="50" y1="0" x2="70" y2="14" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
        <line x1="140" y1="0" x2="160" y2="14" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
        <line x1="220" y1="0" x2="240" y2="14" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
      </g>
      <!-- volt racing stripe -->
      <path d="M -260 30
               C -160 15, -40 5, 80 -2
               C 180 -8, 250 0, 290 25"
            fill="none" stroke="${accent}" stroke-width="3"/>
      <!-- super thin upper -->
      <path d="M -250 0
               C -280 -30, -270 -70, -240 -90
               C -180 -110, -100 -120, -20 -125
               C 80 -128, 170 -120, 220 -100
               C 250 -75, 260 -40, 250 -10
               C 245 10, 230 18, 210 20
               L -240 20
               C -255 18, -262 12, -250 0 Z"
            fill="${INK_1}" stroke="${INK_3}" stroke-width="1.5"/>
      <!-- volt carbon plate visible on top -->
      <path d="M -100 -60 C -20 -90, 100 -100, 200 -80"
            fill="none" stroke="${accent}" stroke-width="5" opacity="0.85"/>
      <!-- tongue -->
      <path d="M -20 -118
               C -20 -135, 30 -140, 70 -138
               C 100 -136, 110 -125, 100 -115
               C 90 -108, 60 -100, 30 -100
               C 0 -100, -20 -110, -20 -118 Z"
            fill="${INK_1}" stroke="${INK_3}" stroke-width="1.2"/>
      <!-- minimal collar -->
      <ellipse cx="0" cy="-128" rx="50" ry="14" fill="${INK_0}"/>
      <!-- no laces, single strap -->
      <path d="M -10 -120 L 70 -120" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
    </g>`;
}

function courtPath(accent: string): string {
  // Classic court / low-top silhouette (Samba / Air Force style)
  return `
    <g>
      <ellipse cx="0" cy="100" rx="300" ry="13" fill="#000" opacity="0.5"/>
      <!-- gum-style midsole (slightly cream-ish at edges) -->
      <path d="M -300 75
               C -315 55, -305 30, -275 22
               C -180 8, -80 0, 30 -8
               C 140 -15, 250 -5, 290 25
               C 315 50, 305 90, 280 95
               L -285 95
               C -300 92, -312 85, -300 75 Z"
            fill="${INK_3}" stroke="${INK_4}" stroke-width="1.5"/>
      <!-- gum sole bottom (lighter band) -->
      <rect x="-280" y="80" width="560" height="14" fill="#E0D5BD" opacity="0.85"/>
      <!-- volt mid stripe -->
      <path d="M -270 45
               C -180 30, -80 22, 30 15
               C 140 8, 240 20, 280 40"
            fill="none" stroke="${accent}" stroke-width="3"/>
      <!-- upper: classic low-top, low ankle -->
      <path d="M -270 18
               C -290 -10, -280 -50, -250 -75
               C -180 -100, -100 -110, -20 -115
               C 80 -118, 170 -112, 230 -90
               C 260 -65, 270 -30, 260 0
               C 255 15, 240 22, 220 22
               L -250 22
               C -265 22, -275 20, -270 18 Z"
            fill="${INK_1}" stroke="${INK_3}" stroke-width="1.5"/>
      <!-- toe cap with stitching -->
      <path d="M 210 -90
               C 250 -65, 265 -30, 260 0
               C 255 15, 240 22, 215 22
               C 200 18, 195 5, 200 -25
               C 203 -55, 208 -75, 210 -90 Z"
            fill="${INK_2}" stroke="${INK_3}" stroke-width="1.5"/>
      <!-- stitching on toe cap -->
      <path d="M 200 -25 C 210 -20, 220 -15, 230 -5" stroke="${accent}" stroke-width="1" fill="none" opacity="0.6" stroke-dasharray="3,2"/>
      <!-- volt side stripes (Adidas-like) -->
      <path d="M -100 -60 L 80 -55" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>
      <path d="M -110 -45 L 90 -40" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>
      <!-- eyestay panel -->
      <path d="M -100 -100
               C -100 -120, -20 -125, 60 -122
               C 110 -120, 130 -108, 125 -95
               C 120 -85, 80 -80, 20 -82
               C -40 -84, -100 -90, -100 -100 Z"
            fill="${INK_2}" stroke="${INK_3}" stroke-width="1.5"/>
      <!-- eyelets -->
      ${[-60, -20, 20, 60]
        .map(
          (x) =>
            `<circle cx="${x}" cy="-100" r="3.5" fill="${INK_0}" stroke="${accent}" stroke-width="1.2"/>`,
        )
        .join("")}
      <!-- collar padding (low for court shoe) -->
      <ellipse cx="0" cy="-115" rx="60" ry="14" fill="${INK_0}"/>
      <!-- heel tab -->
      <rect x="-265" y="-65" width="12" height="20" rx="2" fill="${accent}"/>
      <!-- stitched volt logo on heel -->
      <text x="-205" y="-40" font-family="ui-monospace, monospace" font-size="14" fill="${accent}" letter-spacing="2">${accent === VOLT ? "KT" : "•"}</text>
    </g>`;
}

function lifestylePath(accent: string): string {
  // Low-profile canvas / knit lifestyle
  return `
    <g>
      <ellipse cx="0" cy="100" rx="290" ry="12" fill="#000" opacity="0.5"/>
      <!-- vulcanized cup sole -->
      <path d="M -290 75
               C -305 55, -295 30, -265 22
               C -180 8, -80 0, 30 -8
               C 140 -15, 245 -5, 280 25
               C 305 50, 295 90, 270 95
               L -280 95
               C -295 92, -302 85, -290 75 Z"
            fill="${INK_2}" stroke="${INK_3}" stroke-width="1.5"/>
      <!-- foxing tape (white strip on vulcanized) -->
      <rect x="-275" y="50" width="555" height="10" fill="${INK_3}"/>
      <path d="M -275 50 C -180 38, -80 30, 30 24 C 140 18, 240 30, 275 50"
            fill="none" stroke="${accent}" stroke-width="2"/>
      <!-- upper: knit / canvas, simple -->
      <path d="M -270 18
               C -290 -10, -280 -50, -250 -72
               C -180 -100, -100 -110, -20 -115
               C 80 -118, 170 -112, 225 -90
               C 255 -65, 265 -30, 255 0
               C 250 15, 235 22, 215 22
               L -250 22
               C -265 22, -275 20, -270 18 Z"
            fill="${INK_1}" stroke="${INK_3}" stroke-width="1.5"/>
      <!-- subtle knit texture -->
      ${Array.from({ length: 30 })
        .map((_, i) => {
          const x = -240 + (i % 10) * 48;
          const y = -100 + Math.floor(i / 10) * 25;
          return `<line x1="${x}" y1="${y}" x2="${x + 30}" y2="${y + 5}" stroke="${INK_3}" stroke-width="0.8" opacity="0.5"/>`;
        })
        .join("")}
      <!-- volt eyestay + swoop -->
      <path d="M -120 -70 C -40 -95, 100 -100, 200 -60"
            fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round" opacity="0.9"/>
      <!-- eyestay panel -->
      <path d="M -100 -100
               C -100 -118, -20 -122, 60 -120
               C 110 -118, 130 -108, 125 -95
               C 120 -85, 80 -82, 20 -84
               C -40 -86, -100 -92, -100 -100 Z"
            fill="${INK_2}" stroke="${INK_3}" stroke-width="1.5"/>
      <!-- eyelets -->
      ${[-60, -20, 20, 60]
        .map(
          (x) =>
            `<circle cx="${x}" cy="-100" r="3" fill="${INK_0}" stroke="${accent}" stroke-width="1"/>`,
        )
        .join("")}
      <!-- laces -->
      <path d="M -50 -100 L 60 -100" stroke="${accent}" stroke-width="2" opacity="0.7"/>
      <path d="M -45 -110 L 50 -110" stroke="${accent}" stroke-width="2" opacity="0.7"/>
      <!-- heel tab volt -->
      <rect x="-265" y="-60" width="12" height="18" rx="2" fill="${accent}"/>
    </g>`;
}

function silhouetteFor(p: Product, accent: string): string {
  switch (p.category) {
    case "running":
      return runnerPath(accent);
    case "trail":
      return trailPath(accent);
    case "track":
      return trackPath(accent);
    case "court":
      return courtPath(accent);
    case "lifestyle":
    default:
      return lifestylePath(accent);
  }
}

export function productImageSvg(p: Product, w = 1600, h = 1600): string {
  const seed = hashString(p.id);
  const accent = pickAccent(seed, p.colorways);

  // Atmospheric speed lines (more refined)
  const lines = Array.from({ length: 8 })
    .map((_, i) => {
      const y = 300 + i * 130 + (seed % 30);
      const len = 200 + ((seed + i * 17) % 700);
      const op = 0.04 + ((seed + i) % 8) / 90;
      return `<line x1="0" y1="${y}" x2="${len}" y2="${y}" stroke="${accent}" stroke-width="1" opacity="${op.toFixed(2)}"/>`;
    })
    .join("");

  // Background grid (subtle)
  const grid = Array.from({ length: 6 })
    .map((_, i) => {
      const y = 200 + i * 220;
      return `<line x1="0" y1="${y}" x2="2400" y2="${y}" stroke="${INK_3}" stroke-width="0.5" opacity="0.3"/>`;
    })
    .join("");

  const silhouette = silhouetteFor(p, accent);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1600" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bg-${p.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${INK_0}"/>
      <stop offset="60%" stop-color="${INK_1}"/>
      <stop offset="100%" stop-color="${INK_2}"/>
    </linearGradient>
    <radialGradient id="spot-${p.id}" cx="55%" cy="50%" r="55%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.18"/>
      <stop offset="50%" stop-color="${accent}" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette-${p.id}" cx="50%" cy="50%" r="75%">
      <stop offset="60%" stop-color="${INK_0}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${INK_0}" stop-opacity="0.5"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="1600" fill="url(#bg-${p.id})"/>
  <g opacity="0.5">${grid}</g>
  <g opacity="0.5">${lines}</g>
  <rect width="1600" height="1600" fill="url(#spot-${p.id})"/>
  <g transform="translate(800 800) scale(1.5)">${silhouette}</g>
  <rect width="1600" height="1600" fill="url(#vignette-${p.id})"/>
  <g opacity="0.5" font-family="ui-monospace, monospace" fill="${PAPER_3}">
    <text x="40" y="50" font-size="14" letter-spacing="3">${p.id.toUpperCase()}</text>
    <text x="40" y="1560" font-size="14" letter-spacing="3">${p.brand.toUpperCase()} / ${p.category.toUpperCase()}</text>
    <text x="1560" y="1560" font-size="14" letter-spacing="3" text-anchor="end">${p.weightGrams}G / ${p.drop}MM DROP</text>
  </g>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function heroLifestyleSvg(w = 1800, h = 2200): string {
  // Hero silhouette: large runner in motion
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 2200" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="hero-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${INK_0}"/>
      <stop offset="50%" stop-color="${INK_1}"/>
      <stop offset="100%" stop-color="${INK_2}"/>
    </linearGradient>
    <radialGradient id="hero-spot" cx="60%" cy="40%" r="50%">
      <stop offset="0%" stop-color="${VOLT}" stop-opacity="0.22"/>
      <stop offset="60%" stop-color="${VOLT}" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="${VOLT}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1800" height="2200" fill="url(#hero-bg)"/>
  <rect width="1800" height="2200" fill="url(#hero-spot)"/>
  <g transform="translate(1100 1200) scale(2.2)">${runnerPath(VOLT)}</g>
  <g opacity="0.45" font-family="ui-monospace, monospace" fill="${PAPER_2}">
    <text x="60" y="80" font-size="20" letter-spacing="5">RUN / FIRST</text>
    <text x="60" y="2120" font-size="20" letter-spacing="5">VOLT 02 / KATOONI / KYOTO</text>
  </g>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
