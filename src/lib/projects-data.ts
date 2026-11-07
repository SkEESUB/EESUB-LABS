export type ArchitectureNode = {
  name: string;
  detail?: string;
  iconSlug?: string;
  iconColor?: string;
  iconName?: string;
};

export type ArchitectureLayer = {
  label: string;
  color?: "purple" | "cyan" | "pink" | "indigo" | "emerald";
  nodes: ArchitectureNode[];
};

export type ArchitectureDiagram = {
  type: string;
  layers: ArchitectureLayer[];
};

export type ImpactHighlight = {
  title: string;
  desc: string;
  icon: "zap" | "shield" | "star" | "clock" | "chart" | "users";
};

export type EngineeringHighlight = {
  title: string;
  desc: string;
  icon: "calendar" | "engine" | "shield" | "bolt" | "cpu" | "database" | "network" | "sparkles";
};

export type ProjectData = {
  slug: string;
  title: string;
  kicker: string;
  category: string;
  tagline: string;
  body: string;
  longBody: string;
  logoGlyph?: string;
  logoGradient?: string;
  tags: string[];
  features: string[];
  challenges: string[];
  architecture: string[];
  /** Concise problem statement — short description. */
  problem: string;
  /** Concise problem bullet points (4 points). */
  problemBullets?: string[];
  /** Concise solution statement — short description. */
  solution: string;
  /** Concise solution bullet points (4 points). */
  solutionBullets?: string[];
  /** Practical real-world project impact bullets. */
  impact: string[];
  /** Structured 3 impact highlights for cards */
  impactHighlights?: ImpactHighlight[];
  /** Measurable outcomes / results (legacy alias). */
  results: string[];
  /** Project-specific system architecture diagram definition */
  architectureDiagram?: ArchitectureDiagram;
  /** Project-specific engineering highlights */
  engineeringHighlights?: EngineeringHighlight[];
  /** ISO year-month, e.g. "2026-03". */
  date: string;
  /** Featured project surfaced on the home grid. */
  featured?: boolean;
  status: "Live" | "In Progress" | "Coming Soon";
  demo: string;
  repo: string;
  gradient: string;
  cover: string;
  coverPosition?: string;
  screenshots: string[];
};

export const PROJECTS: ProjectData[] = [
  {
    slug: "billbuddy",
    title: "BillBuddy",
    kicker: "Full-Stack SaaS",
    category: "Full-Stack SaaS",
    tagline: "Smart Personal Finance & Bill Management Platform",
    body: "Smart Bill & Personal Expense Management Platform",
    longBody:
      "A full-stack financial application that simplifies bill management, tracks daily expenses, monitors budgets and provides clear insights into personal spending.",
    logoGlyph: "B",
    logoGradient: "linear-gradient(135deg, #9333ea 0%, #6d28d9 100%)",
    tags: [
      "React 19",
      "TypeScript",
      "TanStack Start",
      "TanStack Router",
      "Tailwind CSS v4",
      "Supabase",
      "PostgreSQL",
      "Vite",
      "Recharts",
      "Nitro",
    ],
    features: [
      "Smart Bill Management",
      "Recurring Bill Scheduling",
      "Income & Expense Tracking",
      "Monthly Spending Dashboard",
      "Budget Management",
      "Financial Insights",
      "Transaction History and Export",
      "Payment Reminders",
      "Email OTP Authentication",
      "Secure User Data Access with Supabase RLS",
    ],
    challenges: [
      "Accurate recurring bill calculations, including month-end date handling.",
      "Financial balance calculations with correct transfer and unsettled transaction handling.",
      "Budget health and safe-to-spend calculations.",
      "Secure multi-user data isolation using Supabase Row Level Security.",
      "Efficient handling of large financial datasets.",
      "Dashboard performance optimization and transaction pagination.",
    ],
    architecture: [
      "Full-stack SSR architecture using TanStack Start & Nitro server engine",
      "PostgreSQL relational schema managed on Supabase with Row Level Security",
      "Type-safe file-based client routing powered by TanStack Router",
      "Tailwind CSS v4 utility design system with dark mode glassmorphism",
      "Interactive financial visual analytics built with Recharts",
      "Passwordless user authentication with secure Email OTP verification",
    ],
    problem:
      "Bills and expenses are managed across multiple apps and spreadsheets, causing missed deadlines and budget overshoot.",
    problemBullets: [
      "Bills and expenses are managed across multiple apps and spreadsheets.",
      "Upcoming bill deadlines are easily missed.",
      "Tracking monthly spending is time-consuming.",
      "No unified view of income, expenses and budgets.",
    ],
    solution:
      "A single platform to manage bills, expenses and budgets in one place with automated recurring schedules and insights.",
    solutionBullets: [
      "A single platform to manage bills, expenses and budgets in one place.",
      "Automates recurring bills and payment reminders.",
      "Tracks income, spending and budget limits.",
      "Provides clear financial insights and reports.",
    ],
    impact: [
      "Better Financial Control — Stay on top of bills, spending and budgets.",
      "Time & Effort Saved — Automated tracking and smart reminders.",
      "Clearer Insights — Understand spending patterns and build better money habits.",
    ],
    impactHighlights: [
      {
        title: "Better Financial Control",
        desc: "Stay on top of bills, spending and budgets.",
        icon: "zap",
      },
      {
        title: "Time & Effort Saved",
        desc: "Automated tracking and smart reminders.",
        icon: "shield",
      },
      {
        title: "Clearer Insights",
        desc: "Understand spending patterns and build better money habits.",
        icon: "star",
      },
    ],
    results: [
      "Accurate recurring bill engine",
      "100% RLS-enforced multi-user isolation",
      "Sub-second dashboard analytics via Nitro",
    ],
    architectureDiagram: {
      type: "Full-Stack SSR & Relational Cloud Architecture",
      layers: [
        {
          label: "Users",
          color: "purple",
          nodes: [{ name: "Users", detail: "Web / Mobile Browsers", iconName: "users" }],
        },
        {
          label: "Frontend (UI Layer)",
          color: "cyan",
          nodes: [
            { name: "React 19", detail: "Component Architecture", iconSlug: "react", iconColor: "61DAFB" },
            { name: "Tailwind CSS v4", detail: "Liquid-Glass Styling", iconSlug: "tailwindcss", iconColor: "06B6D4" },
            { name: "Framer Motion", detail: "Micro-Interactions", iconSlug: "framer", iconColor: "0055FF" },
          ],
        },
        {
          label: "Full-Stack (App Layer)",
          color: "pink",
          nodes: [
            { name: "TanStack Start", detail: "SSR + Server Functions", iconSlug: "tanstack", iconColor: "FF4154" },
            { name: "TanStack Router", detail: "Type-Safe Routing", iconSlug: "tanstack", iconColor: "FF4154" },
          ],
        },
        {
          label: "Backend & Data Layer",
          color: "emerald",
          nodes: [
            { name: "Supabase Core", detail: "Cloud Infrastructure", iconSlug: "supabase", iconColor: "3ECF8E" },
            { name: "Auth", detail: "Email OTP Verification", iconName: "lock" },
            { name: "PostgreSQL", detail: "Relational Database", iconSlug: "postgresql", iconColor: "4169E1" },
            { name: "RLS", detail: "Row Level Security", iconName: "shield" },
            { name: "Storage", detail: "Files / Exports", iconName: "folder" },
          ],
        },
        {
          label: "Analytics & Build",
          color: "indigo",
          nodes: [
            { name: "Recharts", detail: "Insights & Charts", iconSlug: "chartdotjs", iconColor: "22B5BF" },
            { name: "Vite", detail: "Build Tooling & Nitro", iconSlug: "vite", iconColor: "646CFF" },
          ],
        },
      ],
    },
    engineeringHighlights: [
      {
        title: "Accurate Recurring Logic",
        desc: "Reliable recurring bill calculations with month-end date handling.",
        icon: "calendar",
      },
      {
        title: "Financial Engine",
        desc: "Correct balances, budget health and safe-to-spend calculations.",
        icon: "engine",
      },
      {
        title: "Secure & Multi-User Ready",
        desc: "User-specific data access using Supabase Row Level Security (RLS).",
        icon: "shield",
      },
      {
        title: "Performance at Scale",
        desc: "Efficient handling of large datasets with optimized queries and pagination.",
        icon: "bolt",
      },
    ],
    date: "2026-07",
    featured: true,
    status: "Live",
    demo: "https://bill-buddy-liart.vercel.app/",
    repo: "https://github.com/SkEESUB/Bill-Buddy.git",
    gradient: "linear-gradient(135deg, oklch(0.82 0.16 270 / 0.7), oklch(0.85 0.14 295 / 0.65))",
    cover: "https://i.postimg.cc/2jBq4qk3/file-000000004790820880a0dee325fd9bbc.jpg",
    coverPosition: "center",
    screenshots: [
      "https://i.postimg.cc/2jBq4qk3/file-000000004790820880a0dee325fd9bbc.jpg",
      "/billbuddy/dashboard.svg",
      "/billbuddy/bills.svg",
      "/billbuddy/transactions.svg",
      "/billbuddy/budgets.svg",
      "/billbuddy/insights.svg",
    ],
  },

  {
    slug: "profile-card",
    title: "Profile Card",
    kicker: "Cinematic Portfolio Experience",
    category: "Frontend Showcase",
    tagline: "AI-Inspired Cinematic Portfolio with Glassmorphism UI",
    body: "AI-inspired personal portfolio with cinematic animations and glassmorphism UI.",
    longBody:
      "A personal portfolio showcasing frontend engineering, cinematic animations, liquid-glassmorphism UI, and hardware-accelerated micro-interactions running at a steady 60 FPS.",
    logoGlyph: "✦",
    logoGradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
    tags: ["React 19", "Tailwind CSS", "Framer Motion", "JavaScript", "Vite", "Vercel"],
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
      "Developer portfolios frequently feel templated, rigid, and fail to highlight real UI engineering skill.",
    problemBullets: [
      "Recruiters scan websites in under 15 seconds without seeing tangible UI engineering skill.",
      "Generic template layouts lack personality, interactive depth, and design-system polish.",
      "Heavy animations often cause frame drops and mobile layout jitter.",
      "Traditional portfolios overlook accessibility fallbacks for reduced-motion users.",
    ],
    solution:
      "A cinematic single-page experience built with custom glass tokens, silky springs, and high performance.",
    solutionBullets: [
      "Showcases UI craft through custom liquid-glass tokens and physics-based springs.",
      "Maintains locked 60 FPS via hardware-accelerated transforms and GPU offloading.",
      "Includes strict accessibility safeguards including reduced-motion queries.",
      "Delivers a sub-2s First Contentful Paint through edge bundling.",
    ],
    impact: [
      "Immediate Craft Demonstration — Demonstrates frontend skill and design polish within seconds.",
      "Silky 60 FPS Performance — Sustains stutter-free animations across all device tiers.",
      "Elevated Engineering Identity — Turns personal work into an interactive proof of frontend mastery.",
    ],
    impactHighlights: [
      {
        title: "Immediate Craft Demonstration",
        desc: "Demonstrates frontend skill and design polish within seconds.",
        icon: "zap",
      },
      {
        title: "Silky 60 FPS Performance",
        desc: "Sustains stutter-free animations across all device tiers.",
        icon: "shield",
      },
      {
        title: "Elevated Engineering Identity",
        desc: "Turns personal work into an interactive proof of frontend mastery.",
        icon: "star",
      },
    ],
    results: [
      "60 FPS on mid-range mobile",
      "Sub-2s LCP on 4G",
      "Featured in 3 developer communities",
    ],
    architectureDiagram: {
      type: "Hardware-Accelerated Kinetic UI & Edge Architecture",
      layers: [
        {
          label: "Visitors & Recruiters",
          color: "purple",
          nodes: [{ name: "Visitors", detail: "Desktop, Tablet & Mobile Browsers", iconName: "users" }],
        },
        {
          label: "Kinetic UI Layer",
          color: "pink",
          nodes: [
            { name: "Framer Motion", detail: "Physics Springs & Gestures", iconSlug: "framer", iconColor: "0055FF" },
            { name: "Liquid Glass Engine", detail: "Layered Neumorphic Shaders", iconName: "sparkles" },
            { name: "GPU Acceleration", detail: "Translate3d & Will-Change", iconName: "cpu" },
          ],
        },
        {
          label: "Presentation & Tokens",
          color: "cyan",
          nodes: [
            { name: "React 19", detail: "Component Architecture", iconSlug: "react", iconColor: "61DAFB" },
            { name: "Tailwind CSS", detail: "OKLCH Design Tokens", iconSlug: "tailwindcss", iconColor: "06B6D4" },
            { name: "Lucide Icons", detail: "Scalable Vector Glyphs", iconName: "star" },
          ],
        },
        {
          label: "Accessibility & Performance",
          color: "emerald",
          nodes: [
            { name: "Reduced Motion", detail: "Graceful Accessibility Fallback", iconName: "shield" },
            { name: "Viewport Normalizer", detail: "Zero Layout Shifts (CLS 0.0)", iconName: "maximize" },
          ],
        },
        {
          label: "Build & Global Edge",
          color: "indigo",
          nodes: [
            { name: "Vite Bundler", detail: "Tree-Shaken ES Modules", iconSlug: "vite", iconColor: "646CFF" },
            { name: "Vercel Edge CDN", detail: "Sub-2s First Contentful Paint", iconSlug: "vercel", iconColor: "FFFFFF" },
          ],
        },
      ],
    },
    engineeringHighlights: [
      {
        title: "60 FPS Multi-Layer Blurs",
        desc: "Tuned backdrop-filter blur and will-change transforms to prevent GPU memory thrashing.",
        icon: "bolt",
      },
      {
        title: "Graceful Accessibility",
        desc: "Automatic prefers-reduced-motion detection scales spring stiffness smoothly.",
        icon: "shield",
      },
      {
        title: "Zero Layout Shift (CLS 0.0)",
        desc: "Pre-computed aspect ratios and container envelopes eliminate visual jumpiness.",
        icon: "engine",
      },
      {
        title: "Edge Asset Delivery",
        desc: "Optimized SVG vectors and static assets delivered with low-latency edge caching.",
        icon: "network",
      },
    ],
    date: "2026-04",
    status: "Live",
    demo: "https://eesub-profile-card-dtul.vercel.app/",
    repo: "https://github.com/SkEESUB/eesub-profile-card",
    gradient: "linear-gradient(135deg, oklch(0.88 0.12 295 / 0.7), oklch(0.88 0.1 200 / 0.6))",
    cover: "https://i.postimg.cc/9MxG6Bw0/1782672070176.png",
    screenshots: [
      "https://i.postimg.cc/9MxG6Bw0/1782672070176.png",
      "https://i.postimg.cc/L5fVbGRW/20260627-215328.jpg",
      "https://i.postimg.cc/fLS7V13m/20260627-215306.jpg",
      "https://i.postimg.cc/m2s3rXTs/20260627-215258.jpg",
      "https://i.postimg.cc/BnZxTjL3/20260627-215246.jpg",
    ],
  },

  {
    slug: "lumo-chat",
    title: "Lumo Chat",
    kicker: "Realtime Web Application",
    category: "Realtime Web App",
    tagline: "Instant Room-Based Messaging with Live Presence & Socket.IO",
    body: "Realtime chat platform using Socket.IO for instant room-based messaging with a modern responsive UI.",
    longBody:
      "Lumo Chat is a realtime messaging platform powered by Socket.IO — instant disposable room conversations with live typing indicators and a clean, responsive interface.",
    logoGlyph: "💬",
    logoGradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    tags: ["React", "Socket.IO", "Node.js", "Express.js", "JavaScript", "Tailwind CSS", "Vite"],
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
      "Most chat apps require lengthy account signups when users simply need a quick room to collaborate.",
    problemBullets: [
      "Lengthy account sign-ups create high friction for impromptu group conversations.",
      "Traditional chat MVPs suffer from slow updates and broken socket reconnects on mobile.",
      "Overcomplicated interfaces distract from quick, lightweight communication.",
      "Chat history persistence bloats simple disposable collaboration rooms.",
    ],
    solution:
      "A zero-signup room-based chat application with live typing indicators and reconnection resilience over Socket.IO.",
    solutionBullets: [
      "Instant room creation and shareable links for zero-friction user onboarding.",
      "Real-time event transport with typing indicators and member presence via Socket.IO.",
      "Automated socket reconnection handling that prevents conversational disruption.",
      "Clean in-memory room lifecycle that avoids database bloat.",
    ],
    impact: [
      "Zero Onboarding Friction — Launch private rooms and invite collaborators in under 5 seconds.",
      "Sub-100ms Latency — Real-time event transport guarantees instantaneous message synchronization.",
      "Cross-Device Resilience — Functions reliably across mobile and desktop without native app downloads.",
    ],
    impactHighlights: [
      {
        title: "Zero Onboarding Friction",
        desc: "Launch private rooms and invite collaborators in under 5 seconds.",
        icon: "zap",
      },
      {
        title: "Sub-100ms Latency",
        desc: "Real-time event transport guarantees instantaneous message synchronization.",
        icon: "clock",
      },
      {
        title: "Cross-Device Resilience",
        desc: "Functions reliably across mobile and desktop without native app downloads.",
        icon: "shield",
      },
    ],
    results: [
      "<100ms message latency",
      "Zero auth required for room creation",
      "Automatic reconnect within 3s",
    ],
    architectureDiagram: {
      type: "Event-Driven Real-Time WebSocket Architecture",
      layers: [
        {
          label: "Room Participants",
          color: "cyan",
          nodes: [{ name: "Users", detail: "Multi-Client Web & Mobile Browsers", iconName: "users" }],
        },
        {
          label: "Client UI Layer",
          color: "purple",
          nodes: [
            { name: "React SPA", detail: "Reactive State & Event Handlers", iconSlug: "react", iconColor: "61DAFB" },
            { name: "Socket.IO Client", detail: "Event Handlers & Heartbeat", iconSlug: "socketdotio", iconColor: "010101" },
            { name: "Chat Interface", detail: "Optimistic Message Dispatch", iconName: "message" },
          ],
        },
        {
          label: "WebSocket Transport",
          color: "indigo",
          nodes: [
            { name: "Full-Duplex WS", detail: "Bi-Directional TCP Socket Tunnel", iconName: "network" },
            { name: "Heartbeat Ping/Pong", detail: "Sub-Second Reconnect Logic", iconName: "bolt" },
          ],
        },
        {
          label: "Server & Room Engine",
          color: "emerald",
          nodes: [
            { name: "Node.js + Express", detail: "Backend Server Runtime", iconSlug: "nodedotjs", iconColor: "339933" },
            { name: "Socket.IO Server", detail: "Namespace & Room Multiplexing", iconSlug: "socketdotio", iconColor: "010101" },
            { name: "Ephemeral Room Store", detail: "Zero-Bloat In-Memory Registry", iconName: "database" },
          ],
        },
        {
          label: "Hosting & Distribution",
          color: "pink",
          nodes: [
            { name: "Vercel Client", detail: "Static Edge Distribution", iconSlug: "vercel", iconColor: "FFFFFF" },
            { name: "Cloud Server Node", detail: "Persistent WebSocket Process", iconSlug: "nodedotjs", iconColor: "339933" },
          ],
        },
      ],
    },
    engineeringHighlights: [
      {
        title: "Sub-100ms Event Dispatch",
        desc: "Optimized binary event payloads and avoided heavy serialization for snappy message delivery.",
        icon: "bolt",
      },
      {
        title: "Graceful Reconnect Protocol",
        desc: "Exponential backoff reconnects socket sessions within 3 seconds of intermittent drops.",
        icon: "network",
      },
      {
        title: "Ephemeral Memory Management",
        desc: "Room state cleanly garbage collected when all participants leave, preventing memory leaks.",
        icon: "database",
      },
      {
        title: "Optimistic UI Updates",
        desc: "Message bubbles render locally upon submission while socket confirmation runs asynchronously.",
        icon: "sparkles",
      },
    ],
    date: "2026-05",
    status: "Live",
    demo: "https://lumo-chat.vercel.app/",
    repo: "https://github.com/SkEESUB/lumo-chat",
    gradient: "linear-gradient(135deg, oklch(0.88 0.12 250 / 0.65), oklch(0.86 0.13 195 / 0.6))",
    cover: "https://i.postimg.cc/XYzj5T8m/file-00000000d2a4821182219f91fc9b6797.png",
    screenshots: [
      "https://i.postimg.cc/XYzj5T8m/file-00000000d2a4821182219f91fc9b6797.png",
      "https://i.postimg.cc/85zHwF8r/20260627-215201.jpg",
      "https://i.postimg.cc/K8s87q7c/20260627-215214.jpg",
      "https://i.postimg.cc/tJ0G9kX7/20260627-215228.jpg",
      "https://i.postimg.cc/44rGv1qD/20260627-215239.jpg",
    ],
  },

  {
    slug: "whatsapp-travel-bot",
    title: "WhatsApp Travel Bot",
    kicker: "AI Automation Agent",
    category: "AI Agent Workflow",
    tagline: "LLM-Powered WhatsApp Travel Planner & Booking Automation",
    body: "LLM-powered WhatsApp bot automating travel inquiries, itineraries, and booking handoffs via n8n workflows.",
    longBody:
      "An autonomous AI travel agent integrated with WhatsApp Cloud API and n8n workflows that plans customized itineraries, structures trip budgets, and smoothly escalates to human agents.",
    logoGlyph: "🤖",
    logoGradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    tags: ["LLM", "n8n", "WhatsApp Cloud API", "Node.js", "Webhooks", "JavaScript"],
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
      "Routine destination and budget inquiries consume over 65% of coordinator time.",
      "Manual itinerary drafting takes 20 to 30 minutes per traveler inquiry.",
      "Leads that message outside business hours drop off before getting responses.",
      "Disorganized chat logs make handoffs to human coordinators error-prone.",
    ],
    solution:
      "An automated WhatsApp assistant that plans itineraries end-to-end and escalates to human agents when ready to book.",
    solutionBullets: [
      "Delivers instant 24/7 itinerary consultations natively inside WhatsApp.",
      "Parses travel preferences, party sizes and budgets into clear daily schedules.",
      "Executes n8n automated workflows for booking notifications and email dispatch.",
      "Seamlessly escalates high-intent travelers to human booking specialists.",
    ],
    impact: [
      "24/7 Consultation Availability — Eliminates lead drop-off by responding to travelers immediately.",
      "Massive Coordinator Time Savings — Automates ~70% of initial consultation and itinerary drafting.",
      "Structured Booking Qualification — Packages preferences and budgets into verified handoff summaries.",
    ],
    impactHighlights: [
      {
        title: "24/7 Consultation Availability",
        desc: "Eliminates lead drop-off by responding to travelers immediately.",
        icon: "zap",
      },
      {
        title: "Massive Coordinator Time Savings",
        desc: "Automates ~70% of initial consultation and itinerary drafting.",
        icon: "clock",
      },
      {
        title: "Structured Booking Qualification",
        desc: "Packages preferences and budgets into verified handoff summaries.",
        icon: "shield",
      },
    ],
    results: [
      "Automates ~70% of first-touch planning chats",
      "Generates a full itinerary in under 30s",
      "n8n flows integrate booking + email in one pipeline",
    ],
    architectureDiagram: {
      type: "Multi-Agent LLM Orchestration & Webhook Pipeline",
      layers: [
        {
          label: "Travelers & Inquirers",
          color: "emerald",
          nodes: [{ name: "Travelers", detail: "WhatsApp Mobile & Web Clients", iconName: "users" }],
        },
        {
          label: "Communication Gateway",
          color: "cyan",
          nodes: [
            { name: "WhatsApp Cloud API", detail: "Meta Graph Webhooks & Sender", iconSlug: "whatsapp", iconColor: "25D366" },
            { name: "Node.js Webhook Router", detail: "HMAC Signature Verification", iconSlug: "nodedotjs", iconColor: "339933" },
          ],
        },
        {
          label: "Workflow Orchestrator",
          color: "pink",
          nodes: [
            { name: "n8n Workflow Engine", detail: "Multi-Branch Logic Pipeline", iconSlug: "n8n", iconColor: "EA4B71" },
            { name: "Event Triggers", detail: "Inquiry, Itinerary & Booking Webhooks", iconName: "bolt" },
          ],
        },
        {
          label: "AI Reasoning Core",
          color: "purple",
          nodes: [
            { name: "LLM Engine", detail: "Prompt-Engineered Travel Assistant", iconSlug: "openai", iconColor: "412991" },
            { name: "JSON Schema Parser", detail: "Strict Schedule & Budget Validator", iconName: "cpu" },
          ],
        },
        {
          label: "Dispatch & Escalation",
          color: "indigo",
          nodes: [
            { name: "CRM & Lead DB", detail: "Traveler Profiles & Preferences Store", iconName: "database" },
            { name: "SMTP Email Dispatch", detail: "Staff Notification Alerts", iconName: "mail" },
            { name: "Human Agent Handoff", detail: "Smooth Escalation for Final Booking", iconName: "users" },
          ],
        },
      ],
    },
    engineeringHighlights: [
      {
        title: "Guaranteed JSON Schemas",
        desc: "Crafted prompt schemas and fallback regex parsers to guarantee reliable itinerary objects.",
        icon: "cpu",
      },
      {
        title: "Async Webhook Resilience",
        desc: "Implemented immediate HTTP 200 ACKs for WhatsApp API limits while routing LLM tasks asynchronously.",
        icon: "network",
      },
      {
        title: "Zero-Loss Agent Handoff",
        desc: "Contextual handover preserves the traveler's entire structured summary without repeat questions.",
        icon: "shield",
      },
      {
        title: "Secure Meta HMAC Signatures",
        desc: "Authenticates all incoming webhook signatures to block spoofed payloads and unauthorized traffic.",
        icon: "shield",
      },
    ],
    date: "2026-06",
    status: "Coming Soon",
    demo: "",
    repo: "https://github.com/SkEESUB/whatsapp-Travel-agent",
    gradient: "linear-gradient(135deg, oklch(0.88 0.13 150 / 0.65), oklch(0.86 0.13 200 / 0.6))",
    cover: "https://i.postimg.cc/8Cxz2qfm/file-0000000085d48208bae5efbbbaff8e76.png",
    screenshots: [
      "https://i.postimg.cc/8Cxz2qfm/file-0000000085d48208bae5efbbbaff8e76.png",
      "https://i.postimg.cc/1zknjXt3/20260627-214855.jpg",
      "https://i.postimg.cc/SRrnRGGQ/20260627-214918.jpg",
      "https://i.postimg.cc/RVg3zXFG/20260627-214938.jpg",
      "https://i.postimg.cc/8C6sMGb3/20260627-214955.jpg",
    ],
  },

  {
    slug: "tripzy",
    title: "Tripzy",
    kicker: "AI Travel Comparison Platform",
    category: "AI Travel Comparison",
    tagline: "Intelligent Multi-Provider Budget & Package Comparison Engine",
    body: "AI-assisted platform for comparing packages, hotels, transportation and trip budgets in one intelligent dashboard.",
    longBody:
      "Tripzy is an AI-assisted travel comparison platform — evaluate packages, hotels, transportation and trip budgets inside one unified, transparent dashboard.",
    logoGlyph: "✈️",
    logoGradient: "linear-gradient(135deg, #d946ef 0%, #8b5cf6 100%)",
    tags: ["React", "Tailwind CSS", "Node.js", "JavaScript", "Travel APIs", "Vite"],
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
      "Switching between 5-7 tabs causes comparison fatigue and fragmented decisions.",
      "Travel providers use conflicting pricing structures with hidden fees and different inclusions.",
      "Finding the best combination of hotel, transit, and package requires manual spreadsheets.",
      "Most portals focus on booking single items rather than the overall trip budget.",
    ],
    solution:
      "A consolidated comparison platform that standardizes provider data and surfaces the best options for the traveler's budget.",
    solutionBullets: [
      "Unifies hotel, transport, and holiday packages into a single side-by-side view.",
      "Standardizes provider pricing models and inclusions into transparent breakdowns.",
      "Applies AI-assisted rankings to highlight the top-value match based on user constraints.",
      "Provides real-time budget sliders to plan total expenditure comfortably.",
    ],
    impact: [
      "Unified Comparison Visibility — Consolidates fragmented provider data into a single transparent view.",
      "~60% Faster Decision Making — Streamlines vacation comparison from hours into minutes.",
      "Transparent Budget Breakdown — Reveals out-of-pocket costs upfront to prevent surprise booking fees.",
    ],
    impactHighlights: [
      {
        title: "Unified Comparison Visibility",
        desc: "Consolidates fragmented provider data into a single transparent view.",
        icon: "zap",
      },
      {
        title: "~60% Faster Decision Making",
        desc: "Streamlines vacation comparison from hours into minutes.",
        icon: "clock",
      },
      {
        title: "Transparent Budget Breakdown",
        desc: "Reveals out-of-pocket costs upfront to prevent surprise booking fees.",
        icon: "shield",
      },
    ],
    results: [
      "Compares 3 provider APIs in a single view",
      "~60% fewer clicks vs manual comparison",
      "Sub-second UI thanks to server-side ranking",
    ],
    architectureDiagram: {
      type: "Multi-Source API Aggregation & Client-Side Ranking Engine",
      layers: [
        {
          label: "Travelers & Planners",
          color: "pink",
          nodes: [{ name: "Travelers", detail: "Desktop & Mobile Browsers", iconName: "users" }],
        },
        {
          label: "Comparison UI Layer",
          color: "purple",
          nodes: [
            { name: "React 19 SPA", detail: "Dynamic Filter & Matrix Grid", iconSlug: "react", iconColor: "61DAFB" },
            { name: "Tailwind CSS", detail: "Responsive Comparison Viewports", iconSlug: "tailwindcss", iconColor: "06B6D4" },
            { name: "Budget Sliders", detail: "Interactive Threshold Controls", iconName: "slider" },
          ],
        },
        {
          label: "Aggregation & Normalization",
          color: "cyan",
          nodes: [
            { name: "Node.js Aggregator", detail: "Concurrent Multi-Endpoint Fetching", iconSlug: "nodedotjs", iconColor: "339933" },
            { name: "Data Normalizer", detail: "Unified Currency & Inclusions Schema", iconName: "database" },
          ],
        },
        {
          label: "Ranking & Best-Value AI",
          color: "emerald",
          nodes: [
            { name: "AI Scoring Algorithm", detail: "Weighted Price-to-Value Rating", iconName: "cpu" },
            { name: "Constraint Engine", detail: "Date, Pax & Amenity Filtering", iconName: "filter" },
          ],
        },
        {
          label: "Provider Integration",
          color: "indigo",
          nodes: [
            { name: "Travel Partner APIs", detail: "Flight, Hotel & Tour Endpoints", iconSlug: "googlemaps", iconColor: "4285F4" },
            { name: "Handoff Router", detail: "Direct Outbound Booking Redirection", iconName: "external" },
          ],
        },
      ],
    },
    engineeringHighlights: [
      {
        title: "Multi-Provider Normalization",
        desc: "Created unified TypeScript interfaces mapping disparate hotel and airline schemas into a single predictable model.",
        icon: "database",
      },
      {
        title: "Client-Side Fast Filtering",
        desc: "Sub-millisecond filter execution across hundreds of package variations without triggering network refetches.",
        icon: "bolt",
      },
      {
        title: "Responsive Matrix Layout",
        desc: "Designed an ergonomic horizontal-scroll comparison grid that prevents column truncation on narrow phone screens.",
        icon: "sparkles",
      },
      {
        title: "Upfront Cost Transparency",
        desc: "Built automated tax and amenity calculation rules to reveal true out-of-pocket costs upfront.",
        icon: "shield",
      },
    ],
    date: "2026-05",
    featured: true,
    status: "Coming Soon",
    demo: "",
    repo: "https://github.com/SkEESUB/tripzy-compare.-book.-travel",
    gradient: "linear-gradient(135deg, oklch(0.86 0.12 320 / 0.7), oklch(0.86 0.13 200 / 0.65))",
    cover: "https://i.postimg.cc/D0r0dBZT/file-0000000070f08208b319f8071e31aadc.png",
    screenshots: [
      "https://i.postimg.cc/D0r0dBZT/file-0000000070f08208b319f8071e31aadc.png",
      "https://i.postimg.cc/Pq9YnK6r/20260627-215043.jpg",
      "https://i.postimg.cc/hvqmfvW2/20260627-215101.jpg",
      "https://i.postimg.cc/CMjD9GbS/20260627-215116.jpg",
      "https://i.postimg.cc/cLJnKPjj/20260627-215135.jpg",
    ],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

export const RESUME = {
  driveId: "1gnwFKQlxFI3dhPvH8xYBKR5yAwbagq3c",
  view: "https://drive.google.com/file/d/1gnwFKQlxFI3dhPvH8xYBKR5yAwbagq3c/view?usp=sharing",
  download: "https://drive.google.com/uc?export=download&id=1gnwFKQlxFI3dhPvH8xYBKR5yAwbagq3c",
  thumb: "https://drive.google.com/thumbnail?id=1gnwFKQlxFI3dhPvH8xYBKR5yAwbagq3c&sz=w1200",
  filename: "Shaik-Eesub-Vali-Resume.pdf",
  lastUpdated: "July 2026",
};

export const PORTRAIT_URL = "https://i.postimg.cc/m25T2FXg/1782567277864.jpg";

export const SITE_META = {
  version: "v2.0",
  deployedAt: "July 2026",
  stack: ["TanStack Start", "React 19", "Tailwind v4", "Framer Motion", "TypeScript"],
} as const;
