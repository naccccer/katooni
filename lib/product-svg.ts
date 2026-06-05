// Generate a deterministic, on-brand SVG placeholder for a product image.
// Returns a data URL. Always loads, no external dependency, on-brand.
import type { Product } from "./product-types";

function hashString(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i);
  return Math.abs(h | 0);
}

function pickAccent(seed: number, colorways: { hex: string }[]): string {
  // Prefer volt if present, else the first colorway.
  const volt = colorways.find((c) => c.hex.toLowerCase() === "#d7ff1e");
  if (volt) return volt.hex;
  return colorways[seed % colorways.length]?.hex ?? "#D7FF1E";
}

export function productImageSvg(p: Product, w = 1600, h = 1600): string {
  const seed = hashString(p.id);
  const accent = pickAccent(seed, p.colorways);
  const ink0 = "#0A0A0B";
  const ink1 = "#101013";
  const ink2 = "#161619";
  const ink3 = "#1F1F24";

  // Background gradient angle varies by product
  const angle = (seed % 360) - 180;
  // Number of "speed lines" varies
  const lines = 6 + (seed % 8);
  // Determine silhouette type
  const type = ["runner", "trail", "court", "track", "lifestyle"][
    p.category === "running"
      ? 0
      : p.category === "trail"
        ? 1
        : p.category === "court"
          ? 2
          : p.category === "track"
            ? 3
            : 4
  ];

  // Build silhouette path based on type
  let silhouette = "";
  if (type === "runner" || type === "trail" || type === "lifestyle") {
    // Low-profile running shoe silhouette
    silhouette = `
      <g transform="translate(800 800)">
        <path d="M -520 40
                 C -520 -20, -480 -60, -400 -80
                 C -280 -110, -180 -150, -80 -160
                 C 40 -170, 160 -180, 280 -160
                 C 380 -145, 460 -120, 500 -60
                 C 540 0, 540 60, 500 100
                 C 460 140, 380 150, 280 150
                 L -480 150
                 C -500 150, -520 130, -520 100 Z"
              fill="${ink2}" stroke="${ink3}" stroke-width="3"/>
        <path d="M -480 30 C -380 -10, -200 -60, 0 -80 C 200 -100, 360 -80, 480 -30"
              fill="none" stroke="${accent}" stroke-width="6" opacity="0.85"/>
        <path d="M -480 60 C -380 20, -200 -30, 0 -50 C 200 -70, 360 -50, 480 0"
              fill="none" stroke="${accent}" stroke-width="3" opacity="0.4"/>
        <ellipse cx="-280" cy="-40" rx="80" ry="30" fill="${ink3}" opacity="0.5"/>
        <ellipse cx="100" cy="-60" rx="100" ry="35" fill="${ink3}" opacity="0.4"/>
        <circle cx="-200" cy="0" r="3" fill="${accent}"/>
        <circle cx="-100" cy="-20" r="3" fill="${accent}"/>
        <circle cx="0" cy="-30" r="3" fill="${accent}"/>
        <circle cx="100" cy="-40" r="3" fill="${accent}"/>
      </g>`;
  } else if (type === "court") {
    // Mid-top silhouette
    silhouette = `
      <g transform="translate(800 800)">
        <path d="M -480 0
                 L -480 -200
                 C -480 -240, -460 -270, -420 -280
                 L -200 -310
                 C -100 -320, 0 -320, 100 -310
                 L 320 -280
                 C 380 -270, 460 -250, 500 -200
                 C 540 -140, 540 -40, 500 40
                 C 460 120, 380 150, 280 150
                 L -480 150
                 C -500 150, -520 130, -520 100 Z"
              fill="${ink2}" stroke="${ink3}" stroke-width="3"/>
        <path d="M -480 -20 L 480 -20" stroke="${accent}" stroke-width="4" opacity="0.7"/>
        <ellipse cx="-280" cy="-100" rx="60" ry="20" fill="${ink3}" opacity="0.5"/>
        <ellipse cx="0" cy="-180" rx="100" ry="20" fill="${ink3}" opacity="0.4"/>
        <rect x="-100" y="-260" width="200" height="6" fill="${accent}" opacity="0.5"/>
      </g>`;
  } else {
    // Track spike
    silhouette = `
      <g transform="translate(800 800)">
        <path d="M -500 60
                 C -500 0, -460 -40, -380 -50
                 C -260 -60, -160 -80, -60 -90
                 C 60 -100, 180 -100, 280 -90
                 C 360 -80, 420 -50, 440 0
                 C 460 50, 440 90, 380 110
                 L -460 130
                 C -480 130, -500 110, -500 80 Z"
              fill="${ink2}" stroke="${ink3}" stroke-width="3"/>
        <path d="M -480 50 C -380 10, -200 -30, 0 -50 C 200 -70, 360 -50, 440 -10"
              fill="none" stroke="${accent}" stroke-width="4" opacity="0.7"/>
        <g transform="translate(0 130)">
          <line x1="-400" y1="0" x2="-380" y2="40" stroke="${accent}" stroke-width="3"/>
          <line x1="-300" y1="0" x2="-280" y2="40" stroke="${accent}" stroke-width="3"/>
          <line x1="-200" y1="0" x2="-180" y2="40" stroke="${accent}" stroke-width="3"/>
          <line x1="-100" y1="0" x2="-80" y2="40" stroke="${accent}" stroke-width="3"/>
          <line x1="0" y1="0" x2="20" y2="40" stroke="${accent}" stroke-width="3"/>
          <line x1="100" y1="0" x2="120" y2="40" stroke="${accent}" stroke-width="3"/>
          <line x1="200" y1="0" x2="220" y2="40" stroke="${accent}" stroke-width="3"/>
          <line x1="300" y1="0" x2="320" y2="40" stroke="${accent}" stroke-width="3"/>
        </g>
      </g>`;
  }

  // Atmospheric speed lines
  const speedLines = Array.from({ length: lines })
    .map((_, i) => {
      const y = 200 + i * 140 + (seed % 40);
      const len = 200 + ((seed + i * 13) % 600);
      const op = 0.05 + ((seed + i) % 10) / 60;
      return `<line x1="0" y1="${y}" x2="${len}" y2="${y}" stroke="${accent}" stroke-width="1" opacity="${op.toFixed(2)}"/>`;
    })
    .join("");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1600" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bg-${p.id}" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(${angle} 0.5 0.5)">
      <stop offset="0%" stop-color="${ink0}"/>
      <stop offset="60%" stop-color="${ink1}"/>
      <stop offset="100%" stop-color="${ink2}"/>
    </linearGradient>
    <radialGradient id="spot-${p.id}" cx="50%" cy="55%" r="50%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.12"/>
      <stop offset="50%" stop-color="${accent}" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="1600" fill="url(#bg-${p.id})"/>
  <rect width="1600" height="1600" fill="url(#spot-${p.id})"/>
  <g opacity="0.6">${speedLines}</g>
  ${silhouette}
  <g opacity="0.4" font-family="ui-monospace, monospace" font-size="14" fill="${ink3}">
    <text x="40" y="50" letter-spacing="3">${p.id.toUpperCase()}</text>
    <text x="40" y="1560" letter-spacing="3">${p.category.toUpperCase()} / ${p.gender.toUpperCase()}</text>
    <text x="1560" y="1560" letter-spacing="3" text-anchor="end">${p.weightGrams}G / ${p.drop}MM</text>
  </g>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function heroLifestyleSvg(w = 2400, h = 1350): string {
  const accent = "#D7FF1E";
  const ink0 = "#0A0A0B";
  const ink1 = "#101013";
  const ink2 = "#161619";

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 1350" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="hero-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${ink0}"/>
      <stop offset="50%" stop-color="${ink1}"/>
      <stop offset="100%" stop-color="${ink2}"/>
    </linearGradient>
    <radialGradient id="hero-spot" cx="60%" cy="40%" r="45%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.18"/>
      <stop offset="60%" stop-color="${accent}" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="2400" height="1350" fill="url(#hero-bg)"/>
  <rect width="2400" height="1350" fill="url(#hero-spot)"/>
  <g opacity="0.5" stroke="${accent}" stroke-width="1" fill="none">
    <line x1="0" y1="200" x2="2400" y2="200" opacity="0.08"/>
    <line x1="0" y1="400" x2="2400" y2="400" opacity="0.06"/>
    <line x1="0" y1="600" x2="2400" y2="600" opacity="0.05"/>
    <line x1="0" y1="800" x2="2400" y2="800" opacity="0.04"/>
    <line x1="0" y1="1000" x2="2400" y2="1000" opacity="0.03"/>
  </g>
  <g transform="translate(1500 700)">
    <ellipse cx="0" cy="200" rx="500" ry="40" fill="#000" opacity="0.5"/>
    <path d="M -380 60
             C -380 -10, -340 -50, -260 -70
             C -140 -100, -40 -130, 60 -140
             C 180 -150, 300 -150, 420 -130
             C 500 -120, 540 -90, 540 -30
             C 540 30, 500 70, 440 100
             C 380 130, 280 150, 160 150
             L -340 150
             C -360 150, -380 130, -380 100 Z"
          fill="${ink2}" stroke="${ink2}" stroke-width="2"/>
    <path d="M -340 50 C -240 10, -60 -40, 140 -60 C 280 -75, 420 -50, 500 0"
          fill="none" stroke="${accent}" stroke-width="8" opacity="0.9"/>
    <path d="M -340 80 C -240 40, -60 -10, 140 -30 C 280 -45, 420 -20, 500 30"
          fill="none" stroke="${accent}" stroke-width="4" opacity="0.5"/>
  </g>
  <g opacity="0.6" font-family="ui-monospace, monospace" font-size="16" fill="${accent}" letter-spacing="4">
    <text x="60" y="60">RUN / FIRST</text>
    <text x="60" y="1300">VOLT 02 / KATOONI / KYOTO</text>
  </g>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function editorialSvg(variant: 1 | 2, w = 1800, h = 2400): string {
  const accent = "#D7FF1E";
  const ink0 = "#0A0A0B";
  const ink1 = "#101013";
  const seed = variant === 1 ? "EDITORIAL-1" : "EDITORIAL-2";
  const h2 = variant === 1 ? 2400 : 1350;

  if (variant === 2) {
    // Track-at-night horizontal
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 1350" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="ed2-bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${ink0}"/>
      <stop offset="60%" stop-color="${ink1}"/>
      <stop offset="100%" stop-color="${ink0}"/>
    </linearGradient>
    <radialGradient id="ed2-light" cx="20%" cy="30%" r="35%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="2400" height="1350" fill="url(#ed2-bg)"/>
  <rect width="2400" height="1350" fill="url(#ed2-light)"/>
  <g stroke="#1F1F24" stroke-width="1" opacity="0.5">
    ${Array.from({ length: 12 })
      .map((_, i) => {
        const y = 100 + i * 100;
        return `<line x1="0" y1="${y}" x2="2400" y2="${y}" opacity="${0.5 - i * 0.03}"/>`;
      })
      .join("")}
  </g>
  <g transform="translate(1700 850)">
    <ellipse cx="0" cy="150" rx="350" ry="20" fill="#000" opacity="0.6"/>
    <path d="M -260 40 C -260 -10, -220 -40, -160 -55 C -80 -75, 0 -90, 80 -90 C 160 -90, 220 -70, 240 -30 C 260 20, 230 50, 180 70 C 130 90, 60 100, -20 100 L -240 100 C -250 100, -260 90, -260 80 Z" fill="${ink1}" stroke="#1F1F24" stroke-width="2"/>
    <path d="M -240 30 C -160 0, -40 -30, 80 -45 C 160 -55, 220 -30, 240 0" fill="none" stroke="${accent}" stroke-width="5" opacity="0.8"/>
  </g>
</svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 2400" width="${w}" height="${h2}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="ed1-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${ink0}"/>
      <stop offset="100%" stop-color="${ink1}"/>
    </linearGradient>
    <radialGradient id="ed1-spot" cx="40%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1800" height="2400" fill="url(#ed1-bg)"/>
  <rect width="1800" height="2400" fill="url(#ed1-spot)"/>
  <g stroke="#1F1F24" stroke-width="1" opacity="0.4">
    <line x1="200" y1="0" x2="200" y2="2400"/>
    <line x1="400" y1="0" x2="400" y2="2400"/>
    <line x1="1600" y1="0" x2="1600" y2="2400"/>
  </g>
  <g transform="translate(900 1300)">
    <ellipse cx="0" cy="200" rx="500" ry="30" fill="#000" opacity="0.5"/>
    <path d="M -400 50 C -400 -20, -360 -60, -280 -80 C -160 -110, -60 -130, 60 -140 C 180 -150, 300 -150, 420 -130 C 500 -120, 540 -90, 540 -30 C 540 30, 500 70, 440 100 C 380 130, 280 150, 160 150 L -360 150 C -380 150, -400 130, -400 100 Z" fill="#161619" stroke="#1F1F24" stroke-width="2"/>
    <path d="M -360 40 C -260 0, -80 -40, 120 -60 C 260 -75, 420 -50, 500 0" fill="none" stroke="${accent}" stroke-width="6" opacity="0.85"/>
  </g>
  <g opacity="0.5" font-family="ui-monospace, monospace" font-size="22" fill="${accent}" letter-spacing="6">
    <text x="200" y="100">${seed}</text>
  </g>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
