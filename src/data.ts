export type Track = "build" | "design";

export type Project = {
  slug: string;
  title: string;
  year: string;
  tracks: Track[];
  kind: string;
  status: string;
  summary: string;
  did: string[];
  stack: string[];
  cover: string;
  tone: string; // tile colour
  links: { label: string; href: string }[];
  note?: string;
};

const STUDIO = "https://ferasportfolio.vercel.app";

export const projects: Project[] = [
  {
    slug: "brightdoor",
    title: "Brightdoor Homes",
    year: "2026",
    tracks: ["build", "design"],
    kind: "Real estate website · Concept",
    status: "Concept",
    summary:
      "A Lagos estate agency site built around what renters and buyers actually struggle with: the full move-in cost on every listing, a title-document check on every sale, a price map and free inspection booking.",
    did: ["Research into Lagos rent fees and title documents", "UX and visual design", "React build with an owner dashboard"],
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    cover: import.meta.env.BASE_URL + "work/ilemi-cover.webp",
    tone: "bg-mint",
    links: [{ label: "Open the site", href: `${STUDIO}/concepts/brightdoor` }],
  },
  {
    slug: "sweetsips",
    title: "SweetSips",
    year: "2025 · redesigned 2026",
    tracks: ["build"],
    kind: "Brand website & ordering",
    status: "Live",
    summary:
      "A bright, animated website for a student-run parfait and smoothie brand in Cotonou: smoothies that change on their own, a parfait that builds as you scroll, topping customisation and a delivery checkout.",
    did: ["Sole designer and developer", "Scroll-driven animation", "Redesign from a school project"],
    stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    cover: import.meta.env.BASE_URL + "work/sweetsips-hero.webp",
    tone: "bg-pink",
    links: [
      { label: "Live site", href: "https://sweetsips-landing-page-project.vercel.app/" },
      { label: "Case study", href: `${STUDIO}/work/sweetsips` },
    ],
  },
  {
    slug: "gracelink",
    title: "Gracelink Empire",
    year: "2026",
    tracks: ["build"],
    kind: "E-commerce · Client project",
    status: "In progress",
    summary:
      "An online store for a Nigerian hair business selling human hair, extensions and ponytails, with guest checkout, order tracking, bank-transfer payments and an owner dashboard.",
    did: ["Web design", "Front-end and back-end development", "Admin tools for the owner"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
    cover: import.meta.env.BASE_URL + "work/gracelink-hero.webp",
    tone: "bg-sun",
    links: [{ label: "Case study", href: `${STUDIO}/work/gracelink-empire` }],
    note: "Launching soon",
  },
  {
    slug: "readsmartly",
    title: "ReadSmartly",
    year: "2026",
    tracks: ["build", "design"],
    kind: "Progressive web app · Thesis",
    status: "Live",
    summary:
      "My final-year Computer Science thesis: an AI-assisted study companion that tracks reading, plans the semester around exam dates and quizzes students on their own notes.",
    did: ["Product and UX/UI design", "Front-end development", "Firebase integration", "Thesis research"],
    stack: ["JavaScript", "Bootstrap 5", "Firebase", "Chart.js", "PWA"],
    cover: import.meta.env.BASE_URL + "work/readsmartly-landing.webp",
    tone: "bg-sky",
    links: [
      { label: "Live app", href: "https://readsmartly.vercel.app/" },
      { label: "Case study", href: `${STUDIO}/work/readsmartly` },
    ],
  },
  {
    slug: "we-go",
    title: "WE-GO",
    year: "2026",
    tracks: ["design"],
    kind: "Mobile app · UX/UI",
    status: "In progress",
    summary:
      "A mobile app for finding company when your usual people can't make it. Pick a plan, see who else is going and ask someone to go with you.",
    did: ["UX research and user flows", "UI design", "Prototyping in Figma"],
    stack: ["Figma"],
    cover: import.meta.env.BASE_URL + "work/wego-cover.webp",
    tone: "bg-lilac",
    links: [{ label: "Case study", href: `${STUDIO}/work/we-go` }],
  },
  {
    slug: "temu",
    title: "Compare Before Buying",
    year: "2026",
    tracks: ["design"],
    kind: "Feature design · UX/UI",
    status: "Concept",
    summary:
      "A proposed comparison feature for Temu that lets shoppers put similar products side by side instead of jumping between listings, explored through Samsung Galaxy Buds.",
    did: ["Survey and research", "User flow", "UI design"],
    stack: ["Figma", "Tally"],
    cover: import.meta.env.BASE_URL + "work/temu-cover.webp",
    tone: "bg-tangerine",
    links: [{ label: "Case study", href: `${STUDIO}/work/temu-product-comparison` }],
  },
  {
    slug: "studio",
    title: "Fera's Studio",
    year: "2026",
    tracks: ["build"],
    kind: "My studio's website",
    status: "Live",
    summary:
      "The website for my web studio, designed as a walk-through exhibition in English and French, with a 3D gallery, an application form and a private back office for applications and site visits.",
    did: ["Brand and UX design", "React build in EN and FR", "Supabase back office with row-level security", "SEO and analytics"],
    stack: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
    cover: import.meta.env.BASE_URL + "work/studio-cover.webp",
    tone: "bg-sun",
    links: [{ label: "Visit", href: STUDIO }],
  },
];

export const experience = [
  { role: "Founder, web designer and developer", org: "Fera's Studio", place: "Cotonou", when: "2026 – now", text: "Designing and building websites for small businesses in Nigeria and Benin." },
  { role: "IT Intern, front-end and full stack", org: "Techverse Global", place: "Cotonou", when: "Jun – Sep 2025" },
  { role: "Student Information Officer", org: "St. Louis Africa University", place: "", when: "Jun – Aug 2024", text: "Handled student enquiries." },
  { role: "IT Support and Studio Assistant", org: "Fresh FM", place: "Ado-Ekiti", when: "Jan – Jun 2023" },
  { role: "SIWES Intern, Broadcast Engineering", org: "Splash FM", place: "Ibadan", when: "Apr – Jun 2021" },
];

export const education = [
  { what: "Product Management", where: "TS Academy", when: "In progress" },
  { what: "B.Sc. Computer Science", where: "ESTAM University", when: "2023 – 2026" },
  { what: "Diploma, Electrical Engineering", where: "Federal Polytechnic Ado-Ekiti", when: "2019 – 2022" },
];

export const skills = {
  build: ["React", "TypeScript", "Next.js", "Vite", "Tailwind CSS", "Framer Motion", "Supabase", "Firebase", "HTML, CSS, JavaScript", "PWAs", "Vercel", "SEO"],
  design: ["Figma", "UX research", "User flows", "Wireframes", "Prototyping", "UI design", "Design systems", "Canva"],
};

export const contact = {
  email: "ferrababs@gmail.com",
  studio: STUDIO,
};
