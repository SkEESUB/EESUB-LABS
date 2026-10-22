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
} from "lucide-react";
import { getProject, PROJECTS } from "@/lib/projects-data";

const TECH_META: Record<string, { slug: string; color: string }> = {
  React: { slug: "react", color: "61DAFB" },
  "Tailwind CSS": { slug: "tailwindcss", color: "06B6D4" },
  "Framer Motion": { slug: "framer", color: "0055FF" },
  JavaScript: { slug: "javascript", color: "F7DF1E" },
  TypeScript: { slug: "typescript", color: "3178C6" },
  "Node.js": { slug: "nodedotjs", color: "339933" },
  "Express.js": { slug: "express", color: "000000" },
  "Socket.IO": { slug: "socketdotio", color: "010101" },
  OpenAI: { slug: "openai", color: "412991" },
  n8n: { slug: "n8n", color: "EA4B71" },
  "WhatsApp Web.js": { slug: "whatsapp", color: "25D366" },
  Webhooks: { slug: "zapier", color: "FF4A00" },
  "Travel APIs": { slug: "googlemaps", color: "4285F4" },
  Vite: { slug: "vite", color: "646CFF" },
  MongoDB: { slug: "mongodb", color: "47A248" },
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
      <div className="glass-card max-w-md p-6 sm:p-8 shadow-2xl">
        <div className="font-mono text-5xl font-bold text-accent-purple">404</div>
        <h1 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-foreground">Project Not Found</h1>
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
  const p = Route.useLoaderData() as any;
  const hasDemo = Boolean(p.demo && p.demo.trim().length > 0);
  const hasRepo = Boolean(p.repo && p.repo.trim().length > 0);

  // Consolidated gallery list starting with cover, followed by unique screenshots
  const allScreenshots = [p.cover, ...(p.screenshots || []).filter((s: string) => s !== p.cover)];
  const [activeImage, setActiveImage] = useState<string>(allScreenshots[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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

  const impactItems = p.impact && p.impact.length > 0 ? p.impact : p.results || [];
  const problemBullets = p.problemBullets && p.problemBullets.length > 0 
    ? p.problemBullets 
    : (p.problem ? [p.problem] : []);
  const solutionBullets = p.solutionBullets && p.solutionBullets.length > 0 
    ? p.solutionBullets 
    : (p.solution ? [p.solution] : []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground selection:bg-accent-purple/20">
      {/* Ambient background glass orbs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="orb"
          style={{
            width: 580,
            height: 580,
            left: "-10%",
            top: "4%",
            background: "radial-gradient(circle, oklch(0.82 0.18 320 / 0.4), transparent 70%)",
            filter: "blur(130px)",
          }}
        />
        <div
          className="orb"
          style={{
            width: 650,
            height: 650,
            right: "-12%",
            top: "28%",
            background: "radial-gradient(circle, oklch(0.85 0.15 195 / 0.35), transparent 70%)",
            filter: "blur(140px)",
          }}
        />
      </div>

      <main className="relative z-10 mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 sm:py-10 space-y-8 sm:space-y-10">
        {/* Top Navigation Row: Back to Projects & Eyebrow */}
        <header className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            hash="projects"
            search={{ project: p.slug }}
            onClick={rememberProject}
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-white/70 dark:bg-black/30 px-3.5 py-1.5 text-xs font-semibold text-foreground backdrop-blur-md shadow-xs transition-all duration-200 hover:bg-white/95 dark:hover:bg-black/50 hover:scale-[1.02] active:scale-[0.98]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Back to Projects</span>
          </Link>

          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-muted-foreground uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-purple)]" />
            <span>Eesub Labs · Case Study</span>
            {p.date && (
              <span className="text-muted-foreground/60 hidden sm:inline">· {p.date}</span>
            )}
          </div>
        </header>

        {/* ================= A. PROJECT HERO SECTION ================= */}
        <section aria-label="Project Hero" className="space-y-5 sm:space-y-6">
          {/* Hero Header Area: Badges, Title, Summary, Actions */}
          <div className="space-y-3 sm:space-y-3.5">
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              {p.status === "Live" ? (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white shadow-xs"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.72 0.2 150), oklch(0.65 0.22 160))",
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  Live Project
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--glass-border)] bg-white/70 dark:bg-black/30 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold tracking-wide text-foreground backdrop-blur-md shadow-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  {p.status}
                </span>
              )}

              <span className="inline-flex items-center gap-1 rounded-full border border-[var(--glass-border)] bg-white/60 dark:bg-black/20 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-muted-foreground backdrop-blur-md">
                {p.kicker}
              </span>

              {p.date && (
                <span className="inline-flex sm:hidden items-center gap-1 text-[10px] font-mono text-muted-foreground/75">
                  <Calendar className="h-3 w-3" /> {p.date}
                </span>
              )}
            </div>

            {/* Project Title */}
            <div className="flex flex-wrap items-baseline gap-2.5">
              <h1 className="font-display text-2.5xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground drop-shadow-xs">
                {p.title}
              </h1>
              <CheckCircle2
                aria-label="Verified Project"
                className="h-5 w-5 sm:h-6 sm:w-6 text-sky-500 drop-shadow-xs shrink-0 self-center"
              />
            </div>

            {/* Case Study Lead Description */}
            <p className="max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              {p.longBody || p.body}
            </p>

            {/* Hero Actions Row: Live Demo & Glass Source Code button */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {hasDemo && (
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gradient inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105 active:scale-95"
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
                  className="group inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-white/70 dark:bg-white/10 px-4.5 py-2 text-xs sm:text-sm font-semibold text-foreground backdrop-blur-md shadow-xs transition-all duration-200 hover:bg-white/95 dark:hover:bg-white/20 hover:border-black/20 dark:hover:border-white/30 hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    boxShadow:
                      "inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 2px 8px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <Github className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-6" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Sharp, Balanced Cover Image Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="neu-card relative overflow-hidden rounded-2xl sm:rounded-3xl"
          >
            <div
              className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden flex items-center justify-center"
              style={{ background: p.gradient }}
            >
              <img
                src={p.cover}
                alt={`${p.title} cover showcase`}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover sm:object-contain transition-transform duration-500 ease-out hover:scale-[1.01]"
              />

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 45%, transparent 70%, rgba(255,255,255,0.1) 100%)",
                }}
              />
            </div>
          </motion.div>
        </section>

        {/* ================= B & C. THE PROBLEM & THE SOLUTION ================= */}
        {(p.problem || p.solution) && (
          <section
            aria-label="Problem and Solution"
            className="grid gap-4 sm:gap-5 md:grid-cols-2 items-start"
          >
            {/* B. The Problem Card */}
            {p.problem && (
              <div
                className="neu-card relative overflow-hidden rounded-2xl p-4.5 sm:p-5.5 transition-all duration-300"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-rose-500/10 blur-2xl"
                />

                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-rose-500/20 bg-rose-500/10 text-rose-500 dark:bg-rose-500/20 dark:text-rose-400 shadow-xs">
                      <AlertCircle className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-rose-500 dark:text-rose-400 block">
                        The Challenge
                      </span>
                      <h2 className="font-display text-base sm:text-lg font-bold text-foreground">
                        The Problem
                      </h2>
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    {problemBullets.map((pt: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" />
                        <span className="leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* C. The Solution Card */}
            {p.solution && (
              <div
                className="neu-card relative overflow-hidden rounded-2xl p-4.5 sm:p-5.5 transition-all duration-300"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-teal-500/10 blur-2xl"
                />

                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-teal-500/20 bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400 shadow-xs">
                      <Lightbulb className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">
                        The Approach
                      </span>
                      <h2 className="font-display text-base sm:text-lg font-bold text-foreground">
                        The Solution
                      </h2>
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    {solutionBullets.map((pt: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0" />
                        <span className="leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ================= D. PROJECT IMPACT — COMPACT ================= */}
        {impactItems.length > 0 && (
          <section aria-label="Project Impact">
            <div
              className="neu-card relative overflow-hidden rounded-2xl p-5 sm:p-6"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-accent-purple/10 blur-3xl"
              />

              <div className="flex items-center gap-2.5 mb-3.5">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white shadow-xs"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.68 0.2 260))",
                  }}
                >
                  <TrendingUp className="h-3.5 w-3.5" />
                </span>
                <div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--accent-purple)] block">
                    Outcomes & Value
                  </span>
                  <h2 className="font-display text-base sm:text-lg font-bold text-foreground">
                    Project Impact
                  </h2>
                </div>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2">
                {impactItems.map((point: string, idx: number) => (
                  <div
                    key={idx}
                    className="neu-card-subtle flex items-start gap-2 rounded-xl p-3"
                  >
                    <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                    <span className="text-xs sm:text-sm text-foreground/85 leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ================= E. SCREENSHOT GALLERY ================= */}
        {allScreenshots.length > 0 && (
          <section aria-label="Screenshot Gallery" className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground block">
                  Interface Showcase
                </span>
                <h2
                  className="font-display text-xl sm:text-2xl font-bold tracking-tight"
                  style={{ color: "var(--accent-purple)" }}
                >
                  Screenshot Gallery
                </h2>
              </div>
              <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
                {allScreenshots.length} {allScreenshots.length === 1 ? "Image" : "Screenshots"}
              </span>
            </div>

            <div className="neu-card rounded-2xl p-3 sm:p-4.5">
              {/* Active Screenshot Display */}
              <div
                className="neu-card-inset relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-xl cursor-pointer group flex items-center justify-center"
                onClick={() => setIsLightboxOpen(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt={`${p.title} interface preview`}
                    loading="lazy"
                    initial={{ opacity: 0.35, scale: 0.995 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.35, scale: 0.995 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="h-full w-full object-contain sm:object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 glass-pill px-3 py-1.5 text-xs font-semibold text-white inline-flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span>View Fullscreen</span>
                  </span>
                </div>
              </div>

              {/* Thumbnail rail */}
              {allScreenshots.length > 1 && (
                <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar snap-x">
                  {allScreenshots.map((shot: string, idx: number) => {
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
                            ? "border-[var(--accent-purple)] ring-2 ring-[var(--accent-purple)]/50 shadow-sm scale-[1.02] opacity-100"
                            : "border-[var(--glass-border)] opacity-60 hover:opacity-100"
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
          </section>
        )}

        {/* ================= F. KEY FEATURES & TECH STACK ================= */}
        <section
          aria-label="Features and Technology"
          className="grid gap-4 sm:gap-5 md:grid-cols-2 items-start"
        >
          {/* Key Features */}
          {p.features && p.features.length > 0 && (
            <div className="neu-card rounded-2xl p-4.5 sm:p-5.5">
              <div className="flex items-center gap-2.5 mb-3">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white shadow-xs"
                  style={{ background: "var(--gradient-button)" }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-accent-purple block">
                    Core Highlights
                  </span>
                  <h2 className="font-display text-base sm:text-lg font-bold text-foreground">
                    Key Features
                  </h2>
                </div>
              </div>

              <ul className="space-y-1.5 text-xs sm:text-sm">
                {p.features.map((feat: string) => (
                  <li key={feat} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-purple shrink-0" />
                    <span className="leading-snug text-foreground/85">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology Stack */}
          {p.tags && p.tags.length > 0 && (
            <div className="neu-card rounded-2xl p-4.5 sm:p-5.5">
              <div className="flex items-center gap-2.5 mb-3">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white shadow-xs"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.7 0.18 190), oklch(0.65 0.2 240))",
                  }}
                >
                  <Layers className="h-3.5 w-3.5" />
                </span>
                <div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-accent-cyan block">
                    Tools & Technologies
                  </span>
                  <h2 className="font-display text-base sm:text-lg font-bold text-foreground">
                    Technology Stack
                  </h2>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {p.tags.map((t: string) => {
                  const meta = TECH_META[t];
                  return (
                    <span
                      key={t}
                      className="neu-card-subtle inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-[var(--accent-purple)]/40"
                    >
                      {meta && (
                        <img
                          src={`https://cdn.simpleicons.org/${meta.slug}/${meta.color}`}
                          alt=""
                          width={13}
                          height={13}
                          loading="lazy"
                          decoding="async"
                          className="h-3 w-3 shrink-0"
                        />
                      )}
                      <span>{t}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* ================= G. ARCHITECTURE & CHALLENGES ================= */}
        {((p.architecture && p.architecture.length > 0) ||
          (p.challenges && p.challenges.length > 0)) && (
          <section
            aria-label="Architecture and Challenges"
            className="grid gap-4 sm:gap-5 md:grid-cols-2 items-start"
          >
            {/* Architecture */}
            {p.architecture && p.architecture.length > 0 && (
              <div className="neu-card rounded-2xl p-4.5 sm:p-5.5">
                <div className="flex items-center gap-2.5 mb-3">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white shadow-xs"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.82 0.13 195), oklch(0.72 0.18 290))",
                    }}
                  >
                    <Cpu className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-sky-500 block">
                      System Design
                    </span>
                    <h2 className="font-display text-base sm:text-lg font-bold text-foreground">
                      Architecture
                    </h2>
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs sm:text-sm">
                  {p.architecture.map((item: string) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-teal shrink-0" />
                      <span className="leading-snug text-foreground/85">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Engineering Challenges */}
            {p.challenges && p.challenges.length > 0 && (
              <div className="neu-card rounded-2xl p-4.5 sm:p-5.5">
                <div className="flex items-center gap-2.5 mb-3">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white shadow-xs"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.78 0.15 350), oklch(0.7 0.18 295))",
                    }}
                  >
                    <Layers2 className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-pink-500 block">
                      Problem Solving
                    </span>
                    <h2 className="font-display text-base sm:text-lg font-bold text-foreground">
                      Engineering Challenges
                    </h2>
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs sm:text-sm">
                  {p.challenges.map((item: string) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-pink shrink-0" />
                      <span className="leading-snug text-foreground/85">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* ================= H. EXPLORE OTHER PROJECTS ================= */}
        <section aria-label="Other Projects" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground block">
                More Work
              </span>
              <h2
                className="font-display text-xl sm:text-2xl font-bold tracking-tight"
                style={{ color: "var(--accent-purple)" }}
              >
                Explore Other Projects
              </h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.filter((x) => x.slug !== p.slug)
              .slice(0, 3)
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
                    className="relative aspect-[16/10] overflow-hidden"
                    style={{ background: o.gradient }}
                  >
                    <img
                      src={o.cover}
                      alt={`${o.title} preview`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
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
                      <div className="text-xs sm:text-sm font-bold text-foreground truncate">{o.title}</div>
                      <div className="text-[11px] text-muted-foreground truncate">{o.kicker}</div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:text-foreground group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
          </div>
        </section>

        {/* ================= BOTTOM RETURN ACTION ================= */}
        <footer className="text-center pt-6 border-t border-[var(--glass-border)]">
          <Link
            to="/"
            hash="projects"
            search={{ project: p.slug }}
            onClick={rememberProject}
            className="btn-gradient inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
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
              className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-4 w-4" />
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
