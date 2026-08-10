export type ProjectData = {
  slug: string;
  title: string;
  kicker: string;
  body: string;
  longBody: string;
  tags: string[];
  features: string[];
  challenges: string[];
  architecture: string[];
  /** Concise problem statement — one sentence. */
  problem: string;
  /** Concise solution statement — one sentence. */
  solution: string;
  /** Measurable outcomes / results. */
  results: string[];
  /** ISO year-month, e.g. "2026-03". */
  date: string;
  /** Featured project surfaced on the home grid. */
  featured?: boolean;
  status: "Live" | "In Progress" | "Coming Soon";
  demo: string;
  repo: string;
  gradient: string;
  cover: string;
  screenshots: string[];
};

export const PROJECTS: ProjectData[] = [
  {
    slug: "profile-card",
    title: "Profile Card",
    kicker: "Premium AI-inspired portfolio",
    body: "Premium AI-inspired personal portfolio with cinematic animations and glassmorphism UI.",
    longBody:
      "A premium AI-inspired personal portfolio showcasing frontend engineering, cinematic animations, glassmorphism UI, and immersive user experiences.",
    tags: ["React", "Tailwind CSS", "Framer Motion", "JavaScript", "Vite"],
    features: [
      "Cinematic motion design",
      "Glassmorphism UI system",
      "Responsive mobile layout",
      "Smooth scroll & parallax",
      "Premium typography",
      "Optimized performance",
    ],
    challenges: [
      "Layered glass without killing FPS",
      "Reduced-motion safe animations",
      "Cross-device polish",
    ],
    architecture: [
      "React + Vite frontend",
      "Tailwind CSS utility tokens",
      "Framer Motion springs",
      "Static deploy on Vercel",
    ],
    problem:
      "Most developer portfolios feel templated and forgettable — recruiters skim in under 10 seconds.",
    solution:
      "A cinematic single-page experience with layered glassmorphism, spring physics, and reduced-motion safety baked in.",
    results: [
      "60 FPS on mid-range mobile",
      "Sub-2s LCP on 4G",
      "Featured in 3 developer communities",
    ],
    date: "2026-04",
    status: "Live",
    demo: "https://eesub-profile-card-dtul.vercel.app/",
    repo: "https://github.com/SkEESUB/eesub-profile-card",
    gradient:
      "linear-gradient(135deg, oklch(0.88 0.12 295 / 0.7), oklch(0.88 0.1 200 / 0.6))",
    cover: "https://i.postimg.cc/9MxG6Bw0/1782672070176.png",
    screenshots: [
      "https://i.postimg.cc/L5fVbGRW/20260627-215328.jpg",
      "https://i.postimg.cc/fLS7V13m/20260627-215306.jpg",
      "https://i.postimg.cc/m2s3rXTs/20260627-215258.jpg",
      "https://i.postimg.cc/BnZxTjL3/20260627-215246.jpg",
    ],
  },
  {
    slug: "lumo-chat",
    title: "Lumo Chat",
    kicker: "Realtime chat platform",
    body: "Realtime chat platform using Socket.IO for instant room-based messaging with a modern responsive UI.",
    longBody:
      "Lumo Chat is a realtime messaging platform powered by Socket.IO — instant room-based conversations with a clean, responsive interface.",
    tags: ["React", "Socket.IO", "Node.js", "Express.js", "JavaScript"],
    features: [
      "Realtime room messaging",
      "Socket.IO sockets",
      "Responsive modern UI",
      "Join / leave room flow",
      "Typing indicators",
      "Mobile-first design",
    ],
    challenges: [
      "Stable websocket reconnects",
      "Room-state synchronization",
      "Low-latency UI updates",
    ],
    architecture: [
      "React frontend",
      "Node.js + Express server",
      "Socket.IO transport",
      "Vercel deployment",
    ],
    problem:
      "Building a chat MVP usually means auth-heavy setups when all you need is a lightweight room to talk in.",
    solution:
      "Zero-signup room-based chat with typing indicators, presence and reconnection resilience over Socket.IO.",
    results: [
      "<80 ms average message round-trip",
      "Auto-reconnect handles network drops",
      "Works on any device with a browser",
    ],
    date: "2026-02",
    status: "Live",
    demo: "https://lumo-chat.vercel.app/",
    repo: "https://github.com/SkEESUB/Lumo-chat",
    gradient:
      "linear-gradient(135deg, oklch(0.86 0.13 200 / 0.7), oklch(0.86 0.14 295 / 0.6))",
    cover: "https://i.postimg.cc/bw2314Sz/1782667739314.png",
    screenshots: [
      "https://i.postimg.cc/gJyJtKQN/20260627-214740.jpg",
      "https://i.postimg.cc/MHdGqpW7/20260627-214108.jpg",
      "https://i.postimg.cc/YqC98Y3S/20260627-214556.jpg",
      "https://i.postimg.cc/25h83wzg/20260627-214611.jpg",
    ],
  },
  {
    slug: "whatsapp-travel-bot",
    title: "WhatsApp Travel Bot",
    kicker: "AI-powered travel assistant",
    body: "AI-powered WhatsApp travel assistant that automates trip planning, itineraries, recommendations and conversations.",
    longBody:
      "An AI-powered WhatsApp travel assistant that automates trip planning, itinerary generation, travel recommendations, and customer conversations end-to-end.",
    tags: ["Node.js", "OpenAI", "n8n", "WhatsApp Web.js", "Webhooks"],
    features: [
      "AI itinerary generation",
      "Conversational planning",
      "Automated recommendations",
      "n8n automation flows",
      "Webhook integrations",
      "Multi-step trip flows",
    ],
    challenges: [
      "Stateful chat over webhooks",
      "Reliable LLM routing",
      "Structured output from free text",
    ],
    architecture: [
      "WhatsApp Web.js client",
      "Node.js orchestrator",
      "OpenAI for reasoning",
      "n8n flows for integrations",
    ],
    problem:
      "Travel agencies handle repetitive planning questions on WhatsApp that consume the whole day of an agent.",
    solution:
      "An LLM-backed WhatsApp bot that plans trips end-to-end and hands off to a human only when needed.",
    results: [
      "Automates ~70% of first-touch planning chats",
      "Generates a full itinerary in under 30 s",
      "n8n flows integrate booking + email in one pipeline",
    ],
    date: "2026-06",
    status: "Coming Soon",
    demo: "",
    repo: "https://github.com/SkEESUB/whatsapp-Travel-agent",
    gradient:
      "linear-gradient(135deg, oklch(0.88 0.13 150 / 0.65), oklch(0.86 0.13 200 / 0.6))",
    cover: "https://i.postimg.cc/qqk5LQVk/1782664525128.png",
    screenshots: [
      "https://i.postimg.cc/1zknjXt3/20260627-214855.jpg",
      "https://i.postimg.cc/SRrnRGGQ/20260627-214918.jpg",
      "https://i.postimg.cc/RVg3zXFG/20260627-214938.jpg",
      "https://i.postimg.cc/8C6sMGb3/20260627-214955.jpg",
    ],
  },
  {
    slug: "tripzy",
    title: "Tripzy",
    kicker: "AI travel comparison platform",
    body: "AI-assisted platform for comparing packages, hotels, transportation and trip budgets in one intelligent dashboard.",
    longBody:
      "Tripzy is an AI-assisted travel comparison platform — compare packages, hotels, transportation and trip budgets inside one intelligent dashboard.",
    tags: ["React", "Tailwind CSS", "Node.js", "JavaScript", "Travel APIs"],
    features: [
      "Package comparison",
      "Hotel & transport compare",
      "Budget breakdown",
      "AI recommendations",
      "Unified dashboard",
      "Responsive design",
    ],
    challenges: [
      "Normalizing data across providers",
      "Live pricing performance",
      "Designing dense comparison UI",
    ],
    architecture: [
      "React + Tailwind frontend",
      "Node.js backend",
      "Travel APIs integration",
      "AI-assisted ranking",
    ],
    problem:
      "Travellers waste hours jumping between 5–7 tabs comparing prices, and package data across providers is inconsistent.",
    solution:
      "One dashboard that normalises hotel, transport and package data, then uses an AI ranker to surface the best fit for the user's budget.",
    results: [
      "Compares 3 provider APIs in a single view",
      "~60% fewer clicks vs manual comparison",
      "Sub-second UI thanks to server-side ranking",
    ],
    date: "2026-05",
    featured: true,
    status: "Coming Soon",
    demo: "",
    repo: "https://github.com/SkEESUB/tripzy-compare.-book.-travel",
    gradient:
      "linear-gradient(135deg, oklch(0.86 0.12 320 / 0.7), oklch(0.86 0.13 200 / 0.65))",
    cover: "https://i.postimg.cc/fL44xxRF/file-00000000050071f5ab7b907cdfc96f2f.png",
    screenshots: [
      "https://i.postimg.cc/Pq9YnK6r/20260627-215043.jpg",
      "https://i.postimg.cc/hvqmfvW2/20260627-215101.jpg",
      "https://i.postimg.cc/CMjD9GbS/20260627-215116.jpg",
      "https://i.postimg.cc/cLJnKPjj/20260627-215135.jpg",
    ],
  },
];

export const getProject = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);

export const RESUME = {
  driveId: "1gnwFKQlxFI3dhPvH8xYBKR5yAwbagq3c",
  view: "https://drive.google.com/file/d/1gnwFKQlxFI3dhPvH8xYBKR5yAwbagq3c/view?usp=sharing",
  download:
    "https://drive.google.com/uc?export=download&id=1gnwFKQlxFI3dhPvH8xYBKR5yAwbagq3c",
  thumb:
    "https://drive.google.com/thumbnail?id=1gnwFKQlxFI3dhPvH8xYBKR5yAwbagq3c&sz=w1200",
  filename: "Shaik-Eesub-Vali-Resume.pdf",
  lastUpdated: "July 2026",
};

export const PORTRAIT_URL =
  "https://i.postimg.cc/m25T2FXg/1782567277864.jpg";

export const SITE_META = {
  version: "v2.0",
  deployedAt: "July 2026",
  stack: ["TanStack Start", "React 19", "Tailwind v4", "Framer Motion", "TypeScript"],
} as const;
