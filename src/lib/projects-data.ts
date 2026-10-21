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
  /** Concise problem statement — short description or primary point. */
  problem: string;
  /** Concise problem bullet points (2-3 points). */
  problemBullets?: string[];
  /** Concise solution statement — short description or primary point. */
  solution: string;
  /** Concise solution bullet points (2-3 points). */
  solutionBullets?: string[];
  /** Practical real-world project impact bullets (2-4 concise points). */
  impact: string[];
  /** Measurable outcomes / results (legacy alias). */
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
    kicker: "Cinematic portfolio experience",
    body: "AI-inspired personal portfolio with cinematic animations and glassmorphism UI.",
    longBody:
      "A personal portfolio showcasing frontend engineering, cinematic animations, glassmorphism UI, and responsive micro-interactions.",
    tags: ["React", "Tailwind CSS", "Framer Motion", "JavaScript", "Vite"],
    features: [
      "Cinematic spring motion",
      "Layered glassmorphism UI",
      "Mobile-first responsive design",
      "Hardware-accelerated transforms",
      "Accessible reduced-motion fallbacks",
      "Sub-2s page load performance",
    ],
    challenges: [
      "Optimizing multi-layer backdrop-filter blur without dropping 60 FPS",
      "Implementing graceful reduced-motion fallbacks for all springs",
      "Preventing layout shifts across dynamic mobile viewports",
    ],
    architecture: [
      "React + Vite component architecture",
      "Tailwind CSS custom glass tokens",
      "Framer Motion physics-based springs",
      "Static edge hosting on Vercel",
    ],
    problem:
      "Developer portfolios frequently feel templated, cluttered, and fail to highlight real UI engineering skill.",
    problemBullets: [
      "Recruiters spend under 10 seconds scanning candidate websites without seeing tangible frontend craftsmanship.",
      "Generic template layouts lack personality, interactive polish, and design-system rigor.",
      "Complex animations often cause lag and layout jank on low-end mobile devices.",
    ],
    solution:
      "A cinematic single-page experience built with custom glassmorphic tokens, silky springs, and high performance.",
    solutionBullets: [
      "Showcase frontend craft through custom glassmorphism, spring physics, and subtle micro-interactions.",
      "Maintain 60 FPS performance via hardware-accelerated transforms and lightweight CSS tokens.",
      "Build in accessibility safeguards including reduced-motion queries and responsive layouts.",
    ],
    impact: [
      "Delivers an immediate demonstration of UI craftsmanship and design-system polish within seconds.",
      "Sustains silky 60 FPS animation performance across mobile, tablet, and desktop viewports.",
      "Elevates personal engineering identity into an interactive, memorable proof of frontend skill.",
    ],
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
    kicker: "Realtime messaging platform",
    body: "Realtime chat platform using Socket.IO for instant room-based messaging with a modern responsive UI.",
    longBody:
      "Lumo Chat is a realtime messaging platform powered by Socket.IO — instant room-based conversations with a clean, responsive interface.",
    tags: ["React", "Socket.IO", "Node.js", "Express.js", "JavaScript"],
    features: [
      "Instant room-based messaging",
      "Bi-directional Socket.IO events",
      "Live typing indicators & user presence",
      "Seamless join and leave room flows",
      "Zero-signup guest onboarding",
      "Responsive mobile and desktop UI",
    ],
    challenges: [
      "Managing reliable WebSocket reconnection during intermittent network drops",
      "Synchronizing ephemeral room participant state without persistent database bloat",
      "Eliminating message dispatch latency under concurrent active rooms",
    ],
    architecture: [
      "React single-page interface",
      "Node.js + Express WebSocket server",
      "Socket.IO bi-directional transport",
      "Cloud edge deployment",
    ],
    problem:
      "Most chat apps require heavy authentication flows when all users need is a quick, disposable room to collaborate.",
    problemBullets: [
      "Lengthy account sign-ups create high friction for impromptu group conversations and study sessions.",
      "Traditional chat MVPs suffer from slow updates and broken socket connections on mobile.",
      "Overcomplicated interfaces distract from quick, lightweight communication.",
    ],
    solution:
      "A zero-signup room-based chat application with live typing indicators and reconnection resilience over Socket.IO.",
    solutionBullets: [
      "Instant room creation and shareable links for zero-friction user onboarding.",
      "Real-time event transport with typing indicators and member presence via Socket.IO.",
      "Automated socket reconnection handling that prevents conversational disruption.",
    ],
    impact: [
      "Eliminates onboarding barriers for remote teams and study sessions through instant room creation.",
      "Enables low-latency real-time collaboration with sub-second message delivery over WebSockets.",
      "Functions smoothly across modern desktop and mobile browsers without requiring native apps.",
    ],
    results: [
      "<100ms message latency",
      "Zero auth required for room creation",
      "Automatic reconnect within 3s",
    ],
    date: "2026-05",
    status: "Live",
    demo: "https://lumo-chat.vercel.app/",
    repo: "https://github.com/SkEESUB/lumo-chat",
    gradient:
      "linear-gradient(135deg, oklch(0.88 0.12 250 / 0.65), oklch(0.86 0.13 195 / 0.6))",
    cover: "https://i.postimg.cc/Y9D98z3g/1782672322589.png",
    screenshots: [
      "https://i.postimg.cc/85zHwF8r/20260627-215201.jpg",
      "https://i.postimg.cc/K8s87q7c/20260627-215214.jpg",
      "https://i.postimg.cc/tJ0G9kX7/20260627-215228.jpg",
      "https://i.postimg.cc/44rGv1qD/20260627-215239.jpg",
    ],
  },
  {
    slug: "whatsapp-travel-bot",
    title: "WhatsApp Travel Bot",
    kicker: "AI travel assistant",
    body: "LLM-powered WhatsApp bot automating travel inquiries, itineraries, and booking handoffs via n8n workflows.",
    longBody:
      "An LLM-backed WhatsApp travel agent that automates trip inquiries, itinerary generation, and lead qualification via n8n workflow pipelines.",
    tags: ["LLM", "n8n", "WhatsApp Cloud API", "Node.js", "Webhooks"],
    features: [
      "24/7 conversational itinerary planning",
      "WhatsApp Cloud API integration",
      "Structured multi-day trip schedules",
      "Automated n8n webhook pipelines",
      "Budget and destination breakdown",
      "Human-agent booking escalation",
    ],
    challenges: [
      "Enforcing structured JSON output from conversational LLM responses",
      "Handling asynchronous webhook timeouts within WhatsApp API limits",
      "Coordinating smooth escalation between AI and human coordinators",
    ],
    architecture: [
      "WhatsApp Cloud API webhook receiver",
      "n8n orchestrator for logic and email dispatch",
      "LLM engine with prompt-engineered trip schemas",
      "Node.js webhook handler for status callbacks",
    ],
    problem:
      "Travel coordinators spend hours answering repetitive inquiries instead of finalizing high-value bookings.",
    problemBullets: [
      "Handling routine destination and budget questions consumes 60-70% of an agent's working hours.",
      "Manual itinerary drafting takes 20-30 minutes per traveler inquiry.",
      "Leads that message outside business hours often drop off before receiving an answer.",
    ],
    solution:
      "An automated WhatsApp assistant that plans itineraries end-to-end and escalates to human agents when ready to book.",
    solutionBullets: [
      "Deliver instant 24/7 itinerary consultations directly inside WhatsApp.",
      "Parse user travel preferences, group sizes, and budgets into clear daily schedules.",
      "Trigger n8n automated workflows for booking notifications, lead capture, and handoffs.",
    ],
    impact: [
      "Automates first-touch trip consultations and personalized itinerary generation 24/7 inside WhatsApp.",
      "Synthesizes schedules, destinations, and budgets into clear conversational answers within 30 seconds.",
      "Frees travel coordinators from repetitive inquiries so they can focus on booking confirmations.",
    ],
    results: [
      "Automates ~70% of first-touch planning chats",
      "Generates a full itinerary in under 30s",
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
      "Side-by-side package comparison",
      "Hotel and transport price matrices",
      "Granular travel budget breakdown",
      "AI-assisted best-value recommendation",
      "Unified responsive comparison dashboard",
      "Custom filter and sorting criteria",
    ],
    challenges: [
      "Normalizing disparate data models and currency formats across travel providers",
      "Designing a dense comparison grid that remains legible on small mobile screens",
      "Maintaining fast search performance when querying multiple mock and live endpoints",
    ],
    architecture: [
      "React + Tailwind CSS responsive frontend",
      "Node.js API aggregation layer",
      "Normalized provider data schema",
      "Client-side filter and AI-ranking engine",
    ],
    problem:
      "Travelers waste hours jumping between multiple tabs to compare prices across inconsistent provider listings.",
    problemBullets: [
      "Switching between 5-7 tabs causes comparison fatigue and fragmented booking decisions.",
      "Travel providers use conflicting pricing structures with hidden fees and different inclusions.",
      "Finding the best combination of hotel, transit, and package within budget requires manual spreadsheets.",
    ],
    solution:
      "A consolidated comparison platform that standardizes provider data and surfaces the best options for the traveler's budget.",
    solutionBullets: [
      "Unify hotel, transport, and holiday packages into a single side-by-side view.",
      "Standardize provider pricing models and inclusions into transparent breakdowns.",
      "Apply AI-assisted rankings to highlight the top-value match based on user constraints.",
    ],
    impact: [
      "Consolidates fragmented provider data into a unified, transparent comparison dashboard.",
      "Eliminates multi-tab browsing fatigue by standardizing pricing and inclusions side-by-side.",
      "Shortens the research-to-booking decision cycle with intuitive category filters and breakdowns.",
    ],
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
