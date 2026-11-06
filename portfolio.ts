/**
 * Central portfolio data for SHIVANSHU — Video Editing & Graphic Designer Creative Services.
 * Every component reads from this file. Edit it here and the whole site follows.
 *
 * PLACEHOLDER CONVENTION: any text wrapped in [square brackets] is a placeholder.
 * The UI renders it with a dashed outline so it is obvious what still needs your real details.
 * Nothing in this file is a claim, statistic or testimonial — add those only when they are true.
 */

export type Palette = { from: string; via: string; to: string; accent: string };

export const brand = {
  name: 'SHIVANSHU',
  displayName: 'Shivanshu',
  studioTag: 'CREATIVE SERVICES',
  role: 'Video Editing & Graphic Designer',
  positioning: 'Video Editing & Graphic Designer Creative Services',
  /** Short line shown under the name on the opening and in the hero. */
  tagline: ['Video Editing', 'Graphic Design', 'Social Media'],
  headline: 'Cinematic edits and design for brands that want to be remembered.',
  intro:
    'I turn raw footage and rough ideas into polished reels, documentary-style films and promo content — and the captions, visuals and strategy that keep a brand consistent online.',
  /** Placeholder until you add the real city / region. */
  location: '[Your city, country]',
  availability: '[Add availability — e.g. open for new projects]',
  /** Add a portrait here when you have one, e.g. { src: '/assets/portrait.jpg', alt: 'Portrait of Shivanshu' }. Leave null to show a marked placeholder. */
  portrait: null as { src: string; alt: string } | null,
};

/** Contact details. Leave `value` empty until you have real details — the site then shows a marked placeholder instead of a dead link. */
export type Channel = { id: 'whatsapp' | 'instagram' | 'email'; label: string; display: string; value: string; hint: string };

export const contact: Channel[] = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    display: '[+91 XXXXX XXXXX]',
    /** Digits only with country code, e.g. '919876543210' → https://wa.me/919876543210 */
    value: '',
    hint: 'Fastest way to start a project',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    display: '[@your_instagram_handle]',
    /** Handle without the @, e.g. 'shivanshu.studio' */
    value: '',
    hint: 'See reels and recent work',
  },
  {
    id: 'email',
    label: 'Email',
    display: '[hello@your-email.com]',
    /** Full address, e.g. 'hello@yourdomain.com' */
    value: '',
    hint: 'Briefs, quotes and longer projects',
  },
];

export function channelHref(c: Channel): string | undefined {
  if (!c.value) return undefined;
  if (c.id === 'whatsapp') return `https://wa.me/${c.value.replace(/\D/g, '')}?text=${encodeURIComponent("Hi Shivanshu, I'd like to talk about a project.")}`;
  if (c.id === 'instagram') return `https://instagram.com/${c.value.replace(/^@/, '')}`;
  return `mailto:${c.value}?subject=${encodeURIComponent('New project enquiry')}`;
}

/** True when a string is an unfilled placeholder, i.e. wrapped in [brackets]. */
export const isPlaceholder = (s: string) => /^\[.*\]$/.test(s.trim());

/* ───────────────────────── Services ───────────────────────── */

export type ServiceIconId = 'reels' | 'documentary' | 'cafe' | 'content' | 'captions' | 'management';

export type Service = {
  id: ServiceIconId;
  title: string;
  blurb: string;
  points: string[];
};

export const services: Service[] = [
  {
    id: 'reels',
    title: 'Short-form Video & Reels Editing',
    blurb: 'Vertical edits built around the first three seconds — tight pacing, motion text and music timed for Reels, Shorts and TikTok.',
    points: ['Hook-first cuts', 'Captions & motion text', 'Music & beat sync'],
  },
  {
    id: 'documentary',
    title: 'Documentary-style Video Editing',
    blurb: 'Story-led edits for people, places and brands — interviews, b-roll and narration shaped into a clean, cinematic narrative.',
    points: ['Story structure', 'Interview & b-roll', 'Clean cinematic finish'],
  },
  {
    id: 'cafe',
    title: 'Cafe & Restaurant Promotional Videos',
    blurb: 'Appetite-first promos for cafes and restaurants: menu launches, ambience reels and teasers that make people want to walk in.',
    points: ['Menu & launch promos', 'Ambience reels', 'Ready for social & screens'],
  },
  {
    id: 'content',
    title: 'Social Media Content Creation',
    blurb: 'Posts, carousels, covers and thumbnails designed as one visual system, so a feed reads as a brand rather than a collection.',
    points: ['Posts & carousels', 'Covers & thumbnails', 'Consistent visual system'],
  },
  {
    id: 'captions',
    title: 'Captions & Content Strategy',
    blurb: 'Captions that sound like you, plus a content plan — themes, formats and rhythm — so every post has a job to do.',
    points: ['Caption writing', 'Content themes & formats', 'Posting plan'],
  },
  {
    id: 'management',
    title: 'Social Media Management',
    blurb: 'Planning, scheduling and publishing handled end to end, so your page stays active and on-brand while you run the business.',
    points: ['Planning & scheduling', 'Publishing & upkeep', 'One point of contact'],
  },
];

/* ───────────────────────── Selected work ───────────────────────── */

export type ProjectMotif = 'wheel' | 'reel' | 'cafe' | 'doc';

export type Project = {
  id: string;
  title: string;
  /** 'live' = a real project; 'placeholder' = a slot waiting for your own project. */
  status: 'live' | 'placeholder';
  category: string;
  logline: string;
  tags: string[];
  snapshot: { label: string; value: string }[];
  deliverables: string[];
  tools: string[];
  /** Add your final video: `src` for an .mp4/.webm file, or `embed` for a YouTube / Vimeo embed URL. */
  video?: { src?: string; embed?: string; poster?: string };
  /** Optional public link to the finished work (Instagram post, YouTube, website…). */
  link?: string;
  palette: Palette;
  motif: ProjectMotif;
};

export const projects: Project[] = [
  {
    id: 'urbanwheels',
    title: 'UrbanWheels',
    status: 'live',
    category: 'Featured Project',
    logline: '[Add a one-line summary of the UrbanWheels project]',
    tags: ['UrbanWheels', '[Services delivered]'],
    snapshot: [
      { label: 'Project', value: 'UrbanWheels' },
      { label: 'My role', value: '[Your role on this project]' },
      { label: 'Platform', value: '[e.g. Instagram, YouTube, website]' },
      { label: 'Format', value: '[e.g. reel, promo video, design set]' },
    ],
    deliverables: ['[What you delivered — e.g. edited video, graphics, captions]', '[Add another deliverable]'],
    tools: ['[Editing software]', '[Design software]'],
    palette: { from: '#1a1204', via: '#8a5a10', to: '#0a0806', accent: '#f0a93a' },
    motif: 'wheel',
  },
  {
    id: 'reel-slot',
    title: 'Reel Project',
    status: 'placeholder',
    category: 'Short-form · Reels',
    logline: '[Placeholder — replace with one of your reels: what it was for and how you edited it]',
    tags: ['Reels', '[Add tags]'],
    snapshot: [
      { label: 'Project', value: '[Project / client name]' },
      { label: 'My role', value: '[Your role]' },
      { label: 'Platform', value: '[Instagram / Shorts / TikTok]' },
      { label: 'Format', value: '9:16 vertical' },
    ],
    deliverables: ['[Deliverable 1]', '[Deliverable 2]'],
    tools: ['[Editing software]'],
    palette: { from: '#031615', via: '#0d5a55', to: '#050a0a', accent: '#35d3c0' },
    motif: 'reel',
  },
  {
    id: 'cafe-slot',
    title: 'Cafe Promo',
    status: 'placeholder',
    category: 'Cafe & Restaurant',
    logline: '[Placeholder — replace with a cafe or restaurant promo you edited]',
    tags: ['Promo', '[Add tags]'],
    snapshot: [
      { label: 'Project', value: '[Cafe / restaurant name]' },
      { label: 'My role', value: '[Your role]' },
      { label: 'Platform', value: '[Where it was published]' },
      { label: 'Format', value: '[e.g. 9:16 promo, 16:9 teaser]' },
    ],
    deliverables: ['[Deliverable 1]', '[Deliverable 2]'],
    tools: ['[Editing software]'],
    palette: { from: '#1c0f05', via: '#6b3a14', to: '#0a0705', accent: '#ffb066' },
    motif: 'cafe',
  },
  {
    id: 'documentary-slot',
    title: 'Documentary Cut',
    status: 'placeholder',
    category: 'Documentary-style',
    logline: '[Placeholder — replace with a documentary-style edit and the story it told]',
    tags: ['Documentary', '[Add tags]'],
    snapshot: [
      { label: 'Project', value: '[Project / subject]' },
      { label: 'My role', value: '[Your role]' },
      { label: 'Platform', value: '[Where it was published]' },
      { label: 'Format', value: '[e.g. 16:9, 3 min]' },
    ],
    deliverables: ['[Deliverable 1]', '[Deliverable 2]'],
    tools: ['[Editing software]'],
    palette: { from: '#0a1020', via: '#24407a', to: '#05070d', accent: '#8fb4ff' },
    motif: 'doc',
  },
];

/* ───────────────────────── Creative process ───────────────────────── */

export type Step = { n: string; title: string; text: string; tag: string };

export const process: Step[] = [
  { n: '01', title: 'Brief & Discovery', tag: 'Listen', text: 'We talk goals, audience, platforms and references, then agree on scope and timeline before any editing starts.' },
  { n: '02', title: 'Concept & Plan', tag: 'Shape', text: 'A script, shot list or content plan gives the footage and the visuals one clear direction.' },
  { n: '03', title: 'Edit & Design', tag: 'Build', text: 'The first cut and graphics come together: pacing, text, motion and audio built around the story.' },
  { n: '04', title: 'Review & Refine', tag: 'Polish', text: 'You share feedback in one place and it is applied to the cut, so the result matches what you pictured.' },
  { n: '05', title: 'Deliver & Grow', tag: 'Publish', text: 'Final files in the right formats for each platform, with captions and posting guidance where needed.' },
];

/* ───────────────────────── About ───────────────────────── */

export const principles = [
  { title: 'Story before software', text: 'Good tools do not rescue a weak structure. Every edit starts with what the viewer should feel and do.' },
  { title: 'Built for the platform', text: 'A reel, a restaurant screen and a documentary need different pacing, framing and sound. I cut for where it will be watched.' },
  { title: 'Consistent, not just pretty', text: 'Visuals, captions and posting rhythm should feel like one brand across every post.' },
];

/* ───────────────────────── Studio reel (overlay) ───────────────────────── */

export type ReelSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const reelSlides: ReelSlide[] = [
  { kicker: 'Short-form', title: 'Reels that hook.', lines: ['Vertical edits built around the first three seconds'], chips: ['Reels', 'Shorts', 'TikTok'] },
  { kicker: 'Long-form', title: 'Stories with shape.', lines: ['Documentary-style edits for people, places and brands'] },
  { kicker: 'Hospitality', title: 'Appetite first.', lines: ['Promotional videos for cafes and restaurants'] },
  { kicker: 'Brand', title: 'One visual system.', lines: ['Content creation, captions and strategy that stay consistent'], chips: ['Content', 'Captions', 'Strategy'] },
  { kicker: 'Always on', title: 'Handled end to end.', lines: ['Planning, scheduling and managing your social presence'] },
];
