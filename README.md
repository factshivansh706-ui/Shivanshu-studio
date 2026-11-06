# SHIVANSHU — Creative Services Portfolio

A cinematic, mobile-first portfolio for **Shivanshu — Video Editing & Graphic Designer Creative Services**.
Built with React 18, TypeScript, Vite 6, Tailwind CSS 4, Framer Motion 11 and Lenis smooth scroll.

## Run it locally

Requires **Node.js 18+**.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

`dist/` is a static site — deploy it to Netlify, Vercel, Cloudflare Pages, GitHub Pages or any static host.

## Where to put your own details

**Everything lives in one file: [`src/data/portfolio.ts`](src/data/portfolio.ts).**
Text wrapped in `[square brackets]` is a placeholder; the site shows it with a dashed gold underline so nothing unfinished goes unnoticed.

| To change… | Edit |
| --- | --- |
| Name, headline, intro, city, availability, portrait | `brand` |
| WhatsApp number, Instagram handle, email | `contact` (set each `value`; empty = marked placeholder, no dead link) |
| The six services | `services` |
| Selected work (add / replace projects, add videos & links) | `projects` |
| Creative process steps | `process` |
| About-page principles | `principles` |
| Studio Reel slides (the ▶ button in the hero) | `reelSlides` |

### Adding a video to a project
In a `projects` entry, add either:

```ts
video: { src: '/videos/urbanwheels.mp4' }                       // file placed in /public/videos
video: { embed: 'https://www.youtube.com/embed/VIDEO_ID' }      // YouTube / Vimeo embed URL
```

`link` adds a "Watch ↗" button to the card and the project overlay (e.g. an Instagram reel URL).

### Contact values
```ts
whatsapp  value: '919876543210'          // digits with country code
instagram value: 'your_handle'           // without @
email     value: 'hello@yourdomain.com'
```

### Share image
`npm run images` regenerates `public/assets/og-image.jpg` (1200×630) from the brand text. Replace that file with your own artwork any time.

## Structure

```
src/
  data/portfolio.ts        ← single source of truth for all content
  App.tsx                  ← opening → home; lazy-loaded overlays
  components/
    OpeningSequence        ← title sequence: studio card → SHIVANSHU → viewfinder + timecode → ENTER
    Navbar                 ← hide-on-scroll nav, active underline, mobile menu
    Hero                   ← parallax 9:16 "reel" frame, floating chips, editor timeline strip
    About                  ← brand statement, facts, principles, portrait placeholder
    Services               ← six service cards with tilt + hover glow
    Work / ProjectCard     ← pinned horizontal scroll on desktop, swipe rail on touch
    ProjectModal           ← full-screen project overlay with shared-element transition + video panel
    Process                ← scroll-drawn vertical timeline of "takes"
    Contact                ← WhatsApp / Instagram / Email cards + footer
    Showreel               ← ▶ Studio Reel: film-leader countdown + title reel overlay
    CustomCursor, fx.tsx   ← cursor states, magnetic buttons, 3D tilt, text reveals, particles, timecode
  hooks/                   ← Lenis smooth scroll + scroll lock, media queries
scripts/build-images.mjs   ← generates the share image (sharp)
```

## Accessibility and performance
- `prefers-reduced-motion` is respected: smooth scroll, custom cursor, tilt, particles, grain, the pinned horizontal scroll and the hero animations switch off.
- Hover-only effects run only on devices with a precise pointer; touch devices get tap interactions and native swipe rails.
- Overlays close with **Esc**; the Studio Reel supports **Space** and **← →**.
- Overlays are code-split and particles pause when off screen.
