import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  Layers,
  Cpu,
  Sparkles,
  Maximize2,
  X,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  ShieldCheck,
  Calendar,
  Layers2,
  Target,
  Zap,
  Shield,
  Star,
  Clock,
  Database,
  Network,
  Lock,
  Folder,
  Users,
  Smartphone,
  Laptop,
  MessageSquare,
  Bot,
  Plane,
  Sliders,
  Code2,
  Radio,
  FileSpreadsheet,
  Check,
} from "lucide-react";
import { getProject, PROJECTS, type ProjectData, type ArchitectureLayer } from "@/lib/projects-data";

const TECH_META: Record<string, { slug: string; color: string }> = {
  React: { slug: "react", color: "61DAFB" },
  "React 19": { slug: "react", color: "61DAFB" },
  "Tailwind CSS": { slug: "tailwindcss", color: "06B6D4" },
  "Tailwind CSS v4": { slug: "tailwindcss", color: "06B6D4" },
  "Framer Motion": { slug: "framer", color: "0055FF" },
  JavaScript: { slug: "javascript", color: "F7DF1E" },
  TypeScript: { slug: "typescript", color: "3178C6" },
  "Node.js": { slug: "nodedotjs", color: "339933" },
  "Express.js": { slug: "express", color: "000000" },
  "Socket.IO": { slug: "socketdotio", color: "010101" },
  OpenAI: { slug: "openai", color: "412991" },
  LLM: { slug: "openai", color: "412991" },
  n8n: { slug: "n8n", color: "EA4B71" },
  "WhatsApp Web.js": { slug: "whatsapp", color: "25D366" },
  "WhatsApp Cloud API": { slug: "whatsapp", color: "25D366" },
  Webhooks: { slug: "zapier", color: "FF4A00" },
  "Travel APIs": { slug: "googlemaps", color: "4285F4" },
  Vite: { slug: "vite", color: "646CFF" },
  Vercel: { slug: "vercel", color: "000000" },
  MongoDB: { slug: "mongodb", color: "47A248" },
  "TanStack Start": { slug: "tanstack", color: "FF4154" },
  "TanStack Router": { slug: "tanstack", color: "FF4154" },
  Supabase: { slug: "supabase", color: "3ECF8E" },
  PostgreSQL: { slug: "postgresql", color: "4169E1" },
  Recharts: { slug: "chartdotjs", color: "22B5BF" },
  Nitro: { slug: "unjs", color: "F43F5E" },
};

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const p = getProject(params.slug);
    const title = p ? `${p.title} — Case Study | Eesub Labs` : "Project — Eesub Labs";
    const description = p?.longBody || p?.body || "Project case study by Shaik Eesub Vali.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  loader: ({ params }) => {
    const p = getProject(params.slug);
    if (!p) throw notFound();
    return p as NonNullable<typeof p>;
  },
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-4 py-20 text-center">
      <div className="neu-card max-w-md p-6 sm:p-8 shadow-2xl">
        <div className="font-mono text-5xl font-bold text-accent-purple">404</div>
        <h1 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-foreground">
          Project Not Found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The project you requested does not exist or may have been moved.
        </p>
        <Link
          to="/"
          hash="projects"
          className="btn-gradient inline-flex items-center gap-2 mt-6 px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 rounded-full"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Link>
      </div>
    </div>
  ),
});

function ProjectPage() {
  const p = Route.useLoaderData() as ProjectData;
  const hasDemo = Boolean(p.demo && p.demo.trim().length > 0);
  const hasRepo = Boolean(p.repo && p.repo.trim().length > 0);

  // Consolidated gallery list
  const allScreenshots = p.screenshots && p.screenshots.length > 0
    ? p.screenshots
    : [p.cover];

  const [activeImage, setActiveImage] = useState<string>(allScreenshots[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeSectionTab, setActiveSectionTab] = useState<"architecture" | "screenshots">("architecture");

  // Keep activeImage in sync when navigating between project slugs
  useEffect(() => {
    if (allScreenshots.length > 0) {
      setActiveImage(allScreenshots[0]);
    }
  }, [p.slug]);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    if (isLightboxOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  const rememberProject = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("eesub_active_project", p.slug);
    }
  };

  const problemPoints =
    p.problemBullets && p.problemBullets.length > 0
      ? p.problemBullets
      : [
          p.problem,
          "Manual and fragmented workflows lead to errors and oversights.",
          "Users lack centralized visibility and timely notifications.",
          "Inefficient tooling slows down decision-making.",
        ];

  const solutionPoints =
    p.solutionBullets && p.solutionBullets.length > 0
      ? p.solutionBullets
      : [
          p.solution,
          "Centralized intelligent dashboard streamlining the entire workflow.",
          "Automated pipelines ensuring data accuracy and timeliness.",
          "Intuitive responsive interface built for speed and ease of use.",
        ];

  const impactItems =
    p.impactHighlights && p.impactHighlights.length > 0
      ? p.impactHighlights
      : [
          {
            title: "Better Control & Efficiency",
            desc: "Stay on top of critical operations with streamlined workflows.",
            icon: "zap" as const,
          },
          {
            title: "Time & Effort Saved",
            desc: "Automated processes eliminate repetitive manual tasks.",
            icon: "shield" as const,
          },
          {
            title: "Clearer Insights",
            desc: "Actionable visibility helps users make informed decisions.",
            icon: "star" as const,
          },
        ];

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground selection:bg-accent-purple/20">
      {/* Ambient background glass orbs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="orb"
          style={{
            width: 650,
            height: 650,
            left: "-12%",
            top: "2%",
            background: "radial-gradient(circle, oklch(0.82 0.18 320 / 0.35), transparent 70%)",
            filter: "blur(140px)",
          }}
        />
        <div
          className="orb"
          style={{
            width: 720,
            height: 720,
            right: "-15%",
            top: "22%",
            background: "radial-gradient(circle, oklch(0.85 0.15 195 / 0.3), transparent 70%)",
            filter: "blur(150px)",
          }}
        />
        <div
          className="orb"
          style={{
            width: 580,
            height: 580,
            left: "25%",
            top: "60%",
            background: "radial-gradient(circle, oklch(0.8 0.18 290 / 0.22), transparent 70%)",
            filter: "blur(150px)",
          }}
        />
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 sm:py-10 space-y-8 sm:space-y-12">
        {/* Top Navigation Row */}
        <header className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            hash="projects"
            search={{ project: p.slug }}
            onClick={rememberProject}
            className="neu-pill group inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-foreground backdrop-blur-md shadow-xs transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1 text-accent-purple" />
            <span>Back to Projects</span>
          </Link>

          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-muted-foreground uppercase">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-purple)] animate-pulse" />
            <span className="font-semibold text-foreground/80">Eesub Labs</span>
            <span>· Case Study</span>
            {p.date && (
              <span className="text-muted-foreground/60 hidden sm:inline">· {p.date}</span>
            )}
          </div>
        </header>

        {/* ================= SECTION 1 — PROJECT INTRODUCTION (PREMIUM SPLIT HERO) ================= */}
        <section
          aria-label="Project Introduction"
          className="grid gap-8 lg:grid-cols-12 lg:items-center pt-2 pb-4"
        >
          {/* Left Hero Column: Details & Actions */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {p.featured && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] sm:text-xs font-bold text-white shadow-xs"
                  style={{
                    background: "linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)",
                    boxShadow: "0 2px 8px rgba(147, 51, 234, 0.35)",
                  }}
                >
                  <Star className="h-3 w-3 fill-white text-white" />
                  Featured Project
                </span>
              )}

              <span className="neu-pill px-3 py-1 text-[11px] sm:text-xs font-semibold text-foreground/85">
                {p.category || p.kicker}
              </span>

              {p.status === "Live" ? (
                <span className="neu-pill px-3 py-1 text-[11px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Project
                </span>
              ) : (
                <span className="neu-pill px-3 py-1 text-[11px] sm:text-xs font-semibold text-amber-600 dark:text-amber-400 gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  {p.status}
                </span>
              )}
            </div>

            {/* Project Header with 3D Icon & Title */}
            <div className="flex items-center gap-3.5 sm:gap-4 pt-1">
              {/* 3D Squircle Logo Icon */}
              <div
                className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg relative overflow-hidden"
                style={{
                  background: p.logoGradient || "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                  boxShadow:
                    "0 10px 24px -4px rgba(139, 92, 246, 0.4), inset 1px 1px 2px rgba(255,255,255,0.6), inset -1px -1px 2px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-4 -right-4 h-10 w-10 rounded-full bg-white/30 blur-md"
                />
                <span className="font-display text-2xl sm:text-3xl font-black tracking-tight drop-shadow-sm">
                  {p.logoGlyph || p.title.charAt(0)}
                </span>
              </div>

              <div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground drop-shadow-xs">
                  {p.title}
                </h1>
                <p className="text-xs sm:text-sm font-medium text-foreground/80 mt-0.5">
                  {p.tagline || p.body}
                </p>
              </div>
            </div>

            {/* Concise Description */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">
              {p.longBody || p.body}
            </p>

            {/* Live Actions Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {hasDemo && (
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gradient inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              {hasRepo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neu-pill inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-foreground transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Hero Column: 3D Pedestal & Realistic Laptop Device Showcase */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[500px]">
              {/* Circular Pedestal Base with Glowing Rings */}
              <div
                aria-hidden
                className="absolute -bottom-8 sm:-bottom-12 left-1/2 -translate-x-1/2 w-[92%] h-28 sm:h-36 rounded-[100%] -z-10"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(168, 85, 247, 0.45) 0%, rgba(99, 102, 241, 0.25) 45%, transparent 75%)",
                  filter: "blur(22px)",
                }}
              />
              <div
                aria-hidden
                className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 w-[84%] h-16 sm:h-20 rounded-[100%] border border-white/60 dark:border-white/20 -z-10 shadow-lg"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(243, 232, 255, 0.5) 100%)",
                }}
              />

              {/* Floating Ambient Crystal Gems */}
              <motion.div
                animate={{ y: [-4, 4, -4], rotate: [0, 4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
                className="hidden sm:block absolute -top-4 -right-2 w-9 h-9 rounded-xl border border-white/80 dark:border-white/30 backdrop-blur-md shadow-md -z-5"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(192, 132, 252, 0.3) 100%)",
                  transform: "rotate(25deg)",
                }}
              />
              <motion.div
                animate={{ y: [4, -4, 4], rotate: [0, -6, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                aria-hidden
                className="hidden sm:block absolute top-12 -left-3 w-8 h-8 rounded-lg border border-white/80 dark:border-white/30 backdrop-blur-md shadow-md -z-5"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(129, 140, 248, 0.35) 100%)",
                  transform: "rotate(-15deg)",
                }}
              />

              {/* Realistic 3D Laptop Frame */}
              <div
                className="relative mx-auto rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 bg-gradient-to-b from-slate-800 to-slate-950 border border-slate-700/80 shadow-2xl transition-transform duration-500 hover:scale-[1.01]"
                style={{
                  boxShadow:
                    "0 25px 50px -12px rgba(30, 20, 60, 0.45), 0 0 0 1px rgba(255,255,255,0.1) inset",
                }}
              >
                {/* Laptop Camera Notch */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-900 border border-slate-700" />
                </div>

                {/* Laptop Inner Screen Display */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-950 shadow-inner flex items-center justify-center">
                  <img
                    src={activeImage}
                    alt={`${p.title} hero showcase`}
                    loading="eager"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== "/billbuddy-placeholder.svg") {
                        target.src = "/billbuddy-placeholder.svg";
                      }
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      objectPosition: "center",
                    }}
                    className="h-full w-full object-contain object-center transition-transform duration-700 hover:scale-105"
                  />
                  {/* Glass Sheen overlay */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-20"
                    style={{
                      background:
                        "linear-gradient(120deg, rgba(255,255,255,0.6) 0%, transparent 45%, transparent 70%, rgba(255,255,255,0.15) 100%)",
                    }}
                  />
                </div>

                {/* Laptop Keyboard Lip Base */}
                <div className="relative mt-2 h-2 sm:h-2.5 w-[104%] -left-[2%] rounded-b-xl bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 shadow-sm flex justify-center">
                  <div className="h-1 w-14 rounded-full bg-slate-500/60" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 2 — THREE MAIN PILLARS ================= */}
        <section aria-label="Three Main Pillars" className="space-y-4">
          <div className="grid gap-5 md:grid-cols-3 items-stretch">
            {/* Pillar 1: The Problem */}
            <div className="neu-card relative overflow-hidden rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-pink-500/10 blur-2xl"
              />
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="neu-icon-holder-pink h-10 w-10 shrink-0">
                    <Target className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-lg sm:text-xl font-bold text-foreground">
                      The Problem
                    </h2>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {problemPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-pink-500 shrink-0 shadow-xs" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pillar 2: The Solution */}
            <div className="neu-card relative overflow-hidden rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-cyan-500/10 blur-2xl"
              />
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="neu-icon-holder-cyan h-10 w-10 shrink-0">
                    <Lightbulb className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-lg sm:text-xl font-bold text-foreground">
                      The Solution
                    </h2>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {solutionPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-cyan-500 shrink-0 shadow-xs" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pillar 3: The Impact */}
            <div className="neu-card relative overflow-hidden rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-purple-500/10 blur-2xl"
              />
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="neu-icon-holder-purple h-10 w-10 shrink-0">
                    <TrendingUp className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-lg sm:text-xl font-bold text-foreground">
                      The Impact
                    </h2>
                  </div>
                </div>

                <div className="space-y-3">
                  {impactItems.map((item, idx) => {
                    const iconMap = {
                      zap: <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />,
                      shield: <ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />,
                      star: <Star className="h-4 w-4 text-amber-500" />,
                      clock: <Clock className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />,
                      chart: <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
                      users: <Users className="h-4 w-4 text-pink-600 dark:text-pink-400" />,
                    };
                    const icon = iconMap[item.icon] || <Check className="h-4 w-4 text-purple-600" />;

                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 shadow-xs">
                          {icon}
                        </span>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-foreground leading-snug">
                            {item.title}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-snug mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 3 & 4 — INTERACTIVE SYSTEM ARCHITECTURE & PRODUCT SHOWCASE ================= */}
        <section aria-label="System Architecture and Screenshots" className="space-y-4">
          {/* Section Header with View Toggle on Mobile & Desktop */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="neu-icon-holder-purple h-8 w-8">
                <Layers className="h-4 w-4" />
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                System Architecture
              </h2>
            </div>

            {/* Toggle Switch for mobile viewports */}
            <div className="inline-flex lg:hidden items-center p-1 rounded-full bg-slate-200/70 dark:bg-slate-800/80 border border-white/50 dark:border-white/10 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveSectionTab("architecture")}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                  activeSectionTab === "architecture"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Architecture
              </button>
              <button
                type="button"
                onClick={() => setActiveSectionTab("screenshots")}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                  activeSectionTab === "screenshots"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Screenshots
              </button>
            </div>
          </div>

          {/* 2-Column Split Presentation: Left Architecture, Right Screenshots */}
          <div className="grid gap-6 lg:grid-cols-12 items-start">
            {/* LEFT: Project-Specific System Architecture Diagram */}
            <div
              className={`lg:col-span-7 neu-card rounded-2xl p-4 sm:p-6 space-y-4 ${
                activeSectionTab === "screenshots" ? "hidden lg:block" : "block"
              }`}
            >
              <div className="flex items-center justify-between border-b border-[var(--neu-border)] pb-3">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-purple-500" />
                  <span>
                    {p.architectureDiagram?.type || "Project System Architecture"}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-muted-foreground/80 hidden sm:inline">
                  Directional Data Flow
                </span>
              </div>

              {/* Architecture Layered Diagram */}
              {p.architectureDiagram ? (
                <div className="space-y-3.5 py-1">
                  {p.architectureDiagram.layers.map((layer, lIdx) => (
                    <div key={lIdx} className="space-y-2">
                      <div className="grid grid-cols-12 items-center gap-2.5 sm:gap-3">
                        {/* Layer Category Label Pill */}
                        <div className="col-span-12 sm:col-span-4">
                          <span className="inline-block w-full rounded-xl bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 px-2.5 py-1.5 text-center sm:text-left text-[11px] sm:text-xs font-bold text-purple-700 dark:text-purple-300 shadow-xs">
                            {layer.label}
                          </span>
                        </div>

                        {/* Layer Components Box */}
                        <div className="col-span-12 sm:col-span-8 flex flex-wrap gap-2">
                          {layer.nodes.map((node, nIdx) => {
                            const meta = node.iconSlug ? TECH_META[node.iconSlug] : null;
                            return (
                              <div
                                key={nIdx}
                                className="neu-card-subtle flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-xs transition-transform hover:scale-[1.02]"
                              >
                                {meta ? (
                                  <img
                                    src={`https://cdn.simpleicons.org/${meta.slug}/${meta.color}`}
                                    alt=""
                                    width={14}
                                    height={14}
                                    loading="lazy"
                                    className="h-3.5 w-3.5 shrink-0"
                                  />
                                ) : (
                                  <span className="h-2 w-2 rounded-full bg-cyan-500 shrink-0" />
                                )}
                                <div>
                                  <span className="font-bold text-foreground text-[11px] sm:text-xs">
                                    {node.name}
                                  </span>
                                  {node.detail && (
                                    <span className="block text-[10px] text-muted-foreground font-normal">
                                      {node.detail}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Directional Connector Arrow between layers */}
                      {lIdx < p.architectureDiagram!.layers.length - 1 && (
                        <div className="flex justify-center sm:justify-start sm:ml-40 my-0.5">
                          <span className="text-muted-foreground/60 text-xs font-mono">↓</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                /* Fallback bullet list if diagram undefined */
                <ul className="space-y-2 text-xs sm:text-sm">
                  {p.architecture.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-teal shrink-0" />
                      <span className="leading-snug text-foreground/85">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* RIGHT: Interactive Product Screenshot Gallery */}
            <div
              className={`lg:col-span-5 neu-card rounded-2xl p-4 sm:p-5 space-y-3 ${
                activeSectionTab === "architecture" ? "hidden lg:block" : "block"
              }`}
            >
              <div className="flex items-center justify-between border-b border-[var(--neu-border)] pb-2.5">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                  Product Screenshots
                </span>
                <span className="text-[11px] font-mono text-muted-foreground/80">
                  {allScreenshots.length} {allScreenshots.length === 1 ? "View" : "Views"}
                </span>
              </div>

              {/* Large Active Screenshot Preview Card */}
              <div
                className="neu-card-inset relative aspect-[16/10] w-full overflow-hidden rounded-xl cursor-pointer group flex items-center justify-center bg-slate-950/20"
                onClick={() => setIsLightboxOpen(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt={`${p.title} preview`}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== "/billbuddy-placeholder.svg") {
                        target.src = "/billbuddy-placeholder.svg";
                      }
                    }}
                    initial={{ opacity: 0.35, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.35, scale: 0.99 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="h-full w-full object-contain sm:object-cover sm:object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </AnimatePresence>

                {/* Hover Fullscreen Pill */}
                <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-200 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 neu-pill px-3 py-1.5 text-xs font-semibold text-foreground inline-flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                    <Maximize2 className="h-3.5 w-3.5 text-accent-purple" />
                    <span>View Fullscreen</span>
                  </span>
                </div>
              </div>

              {/* Smaller Thumbnail Strip Navigation with Active Purple Indicator */}
              {allScreenshots.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 custom-scrollbar snap-x">
                  {allScreenshots.map((shot, idx) => {
                    const isSelected = activeImage === shot;
                    return (
                      <button
                        key={shot + idx}
                        type="button"
                        onClick={() => setActiveImage(shot)}
                        aria-label={`View screenshot ${idx + 1}`}
                        aria-pressed={isSelected}
                        className={`relative aspect-[16/10] h-12 sm:h-14 shrink-0 overflow-hidden rounded-lg border transition-all duration-200 snap-start focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-purple)] ${
                          isSelected
                            ? "border-[var(--accent-purple)] ring-2 ring-[var(--accent-purple)]/60 shadow-md scale-[1.03] opacity-100"
                            : "border-[var(--neu-border)] opacity-60 hover:opacity-100 hover:scale-[1.01]"
                        }`}
                      >
                        <img
                          src={shot}
                          alt={`Thumbnail ${idx + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= SECTION 5 & 6 — TECHNOLOGY STACK & ENGINEERING HIGHLIGHTS ================= */}
        <section
          aria-label="Technology Stack and Engineering Highlights"
          className="grid gap-6 md:grid-cols-2 items-stretch"
        >
          {/* Section 5: Technology Stack */}
          <div className="neu-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="neu-icon-holder-cyan h-9 w-9 shrink-0">
                  <Layers className="h-4.5 w-4.5" />
                </span>
                <div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block">
                    Verified Tools
                  </span>
                  <h2 className="font-display text-lg sm:text-xl font-bold text-foreground">
                    Technology Stack
                  </h2>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {p.tags.map((t) => {
                  const meta = TECH_META[t];
                  return (
                    <span
                      key={t}
                      className="neu-card-subtle inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold text-foreground transition-all duration-200 hover:border-purple-500/40 hover:scale-[1.02]"
                    >
                      {meta ? (
                        <img
                          src={`https://cdn.simpleicons.org/${meta.slug}/${meta.color}`}
                          alt=""
                          width={14}
                          height={14}
                          loading="lazy"
                          decoding="async"
                          className="h-3.5 w-3.5 shrink-0"
                        />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                      )}
                      <span>{t}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 6: Engineering Highlights */}
          <div className="neu-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="neu-icon-holder-purple h-9 w-9 shrink-0">
                  <Code2 className="h-4.5 w-4.5" />
                </span>
                <div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">
                    Technical Decisions
                  </span>
                  <h2 className="font-display text-lg sm:text-xl font-bold text-foreground">
                    Engineering Highlights
                  </h2>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                {p.engineeringHighlights ? (
                  p.engineeringHighlights.map((hl, idx) => {
                    const iconMap = {
                      calendar: <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />,
                      engine: <Cpu className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />,
                      shield: <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
                      bolt: <Zap className="h-4 w-4 text-amber-500" />,
                      cpu: <Cpu className="h-4 w-4 text-pink-600 dark:text-pink-400" />,
                      database: <Database className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />,
                      network: <Network className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
                      sparkles: <Sparkles className="h-4 w-4 text-purple-500" />,
                    };
                    const icon = iconMap[hl.icon] || <CheckCircle2 className="h-4 w-4 text-purple-600" />;

                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 shadow-xs">
                          {icon}
                        </span>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-foreground leading-snug">
                            {hl.title}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-snug mt-0.5">
                            {hl.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <ul className="space-y-2 text-xs sm:text-sm">
                    {p.challenges.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0" />
                        <span className="text-muted-foreground leading-snug">{c}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 7 — EXPLORE OTHER PROJECTS ================= */}
        <section aria-label="Explore Other Projects" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground block">
                More Case Studies
              </span>
              <h2
                className="font-display text-xl sm:text-2xl font-bold tracking-tight"
                style={{ color: "var(--accent-purple)" }}
              >
                Explore Other Projects
              </h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROJECTS.filter((x) => x.slug !== p.slug)
              .slice(0, 4)
              .map((o) => (
                <Link
                  key={o.slug}
                  to="/projects/$slug"
                  params={{ slug: o.slug }}
                  search={{ project: o.slug }}
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      sessionStorage.setItem("eesub_active_project", o.slug);
                    }
                  }}
                  className="neu-card neu-card-interactive group relative block overflow-hidden rounded-xl transition-all duration-300"
                >
                  <div
                    className="relative aspect-[16/10] w-full overflow-hidden flex items-center justify-center"
                    style={{ background: o.gradient }}
                  >
                    <img
                      src={o.cover}
                      alt={`${o.title} preview`}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== "/billbuddy-placeholder.svg") {
                          target.src = "/billbuddy-placeholder.svg";
                        }
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: o.coverPosition || "center",
                      }}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.55) 100%)",
                      }}
                    />
                  </div>
                  <div className="p-3 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-foreground truncate">
                        {o.title}
                      </div>
                      <div className="text-[11px] text-muted-foreground truncate">{o.category || o.kicker}</div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:text-foreground group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
          </div>
        </section>

        {/* ================= BOTTOM RETURN ACTION ================= */}
        <footer className="text-center pt-6 pb-8 border-t border-[var(--neu-border)]">
          <Link
            to="/"
            hash="projects"
            search={{ project: p.slug }}
            onClick={rememberProject}
            className="btn-gradient inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Projects Section</span>
          </Link>
        </footer>
      </main>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl"
          >
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close fullscreen view"
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              src={activeImage}
              alt="Fullscreen screenshot"
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
