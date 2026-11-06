// Builds the social share image (1200x630) at public/assets/og-image.jpg from the brand text — no photos needed.
// Run with: npm run images
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const OUT = 'public/assets';
mkdirSync(OUT, { recursive: true });

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="78%" cy="35%" r="55%"><stop offset="0" stop-color="#f0a93a" stop-opacity="0.42"/><stop offset="1" stop-color="#f0a93a" stop-opacity="0"/></radialGradient>
    <radialGradient id="t" cx="10%" cy="100%" r="45%"><stop offset="0" stop-color="#35d3c0" stop-opacity="0.22"/><stop offset="1" stop-color="#35d3c0" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#08090b"/>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#t)"/>
  <g fill="none" stroke="#f0a93a" stroke-width="4" stroke-linecap="round" opacity="0.9">
    <path d="M60 110V70a10 10 0 0 1 10-10h40M1090 60h40a10 10 0 0 1 10 10v40M1140 520v40a10 10 0 0 1-10 10h-40M110 570H70a10 10 0 0 1-10-10v-40"/>
  </g>
  <text x="96" y="318" font-family="Impact, 'Arial Narrow', sans-serif" font-size="150" fill="#f4f1ec" letter-spacing="6">SHIVANSHU</text>
  <text x="102" y="376" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="26" fill="#ffc766" letter-spacing="14">CREATIVE SERVICES</text>
  <text x="102" y="450" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="20" fill="#a9a8a3" letter-spacing="5">VIDEO EDITING • GRAPHIC DESIGN • SOCIAL MEDIA</text>
  <circle cx="1088" cy="106" r="7" fill="#ef4444"/>
  <text x="1040" y="112" text-anchor="end" font-family="Courier New, monospace" font-size="20" fill="#f4f1ec" opacity="0.8">REC</text>
</svg>`;

await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(`${OUT}/og-image.jpg`);
console.log('og-image built');
