import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  Layers,
  Cpu,
  Sparkles,
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

    const title = p
      ? `${p.title} — Eesub Labs`
      : "Project — Eesub Labs";

    const description =
      p?.longBody ?? "Project case study by Shaik Eesub Vali.";

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

    if (!p) {
      throw notFound();
    }

    return p;
  },

  component: ProjectPage,

  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-display text-4xl">
        Project not found
      </h1>

      <Link
        to="/"
        className="mt-6 inline-block text-sm underline"
      >
        ← Back home
      </Link>
    </div>
  ),
});

function ProjectPage() {
  const p = Route.useLoaderData();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">

      {/* Ambient orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        <div
          className="orb"
          style={{
            width: 600,
            height: 600,
            left: "-10%",
            top: "5%",
            background:
              "radial-gradient(circle, oklch(0.82 0.18 320 / 0.7), transparent 70%)",
            filter: "blur(130px)",
          }}
        />

        <div
          className="orb"
          style={{
            width: 700,
            height: 700,
            right: "-15%",
            top: "30%",
            background:
              "radial-gradient(circle, oklch(0.85 0.15 195 / 0.6), transparent 70%)",
            filter: "blur(140px)",
          }}
        />

      </div>

      <main className="relative z-10 mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">

        {/* Back button */}
        <Link
          to="/"
          hash="projects"
          className="glass-pill inline-flex items-center gap-2 px-4 py-2 text-xs font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to projects
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="glass-card glow-hover relative mt-6 overflow-hidden"
        >

          {/* Cover */}
          <div
            className="relative aspect-[21/9] w-full overflow-hidden"
            style={{ background: p.gradient }}
          >

            <img
              src={p.cover}
              alt={`${p.title} cover`}
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Dark gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 40%, oklch(0 0 0 / 0.45) 100%)",
              }}
            />

            {/* Hero text */}
            <div className="absolute inset-x-4 bottom-4 sm:inset-x-8 sm:bottom-8">

              <div
                className="max-w-2xl rounded-[22px] border border-white/30 bg-black/45 p-4 shadow-2xl backdrop-blur-xl sm:p-6"
                style={{
                  boxShadow:
                    "0 18px 48px -18px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.16)",
                }}
              >

                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur">
                  {p.status === "Live" && (
                    <span className="live-dot" />
                  )}
                  {p.status}
                </span>

                <div className="mt-3 flex items-center gap-2">

                  <h1 className="font-display text-4xl leading-none text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)] sm:text-6xl">
                    {p.title}
                  </h1>

                  <CheckCircle2
                    aria-label="Verified project"
                    className="h-5 w-5 shrink-0 text-sky-400 drop-shadow-[0_2px_8px_rgba(56,189,248,0.7)] sm:h-6 sm:w-6"
                  />

                </div>

                <p className="mt-2 text-sm font-medium text-white/85 sm:text-base">
                  {p.kicker}
                </p>

              </div>

            </div>

          </div>

          {/* Description + buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-6 sm:p-8">

            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              {p.longBody}
            </p>

            <div className="flex gap-3">

              {p.status === "Coming Soon" || !p.demo ? (
                <span className="glass-pill inline-flex cursor-not-allowed items-center gap-2 px-5 py-3 text-sm font-medium opacity-60">
                  Coming Soon
                </span>
              ) : (
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gradient shine-sweep inline-flex items-center gap-2 text-sm"
                >
                  Live Demo
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}

              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="glass-pill inline-flex items-center gap-2 px-5 py-3 text-sm font-medium"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>

            </div>

          </div>

        </motion.div>

        {/* Problem / Solution */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">

          <div className="glass-card glow-hover p-6">

            <div className="flex items-center gap-2">

              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.78 0.18 25), oklch(0.78 0.15 350))",
                }}
              >
                <Sparkles className="h-4 w-4" />
              </span>

              <div className="font-semibold">
                Problem
              </div>

            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {p.problem}
            </p>

          </div>

          <div className="glass-card glow-hover p-6">

            <div className="flex items-center gap-2">

              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
                style={{
                  background: "var(--gradient-button)",
                }}
              >
                <CheckCircle2 className="h-4 w-4" />
              </span>

              <div className="font-semibold">
                Solution
              </div>

            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {p.solution}
            </p>

          </div>

        </div>

        {/* Results */}
        <div className="mt-6">
          <PanelList
            icon={CheckCircle2}
            title="Results"
            items={p.results}
          />
        </div>

        {/* Screenshots */}
        <Section title="Screenshots">

          <div className="grid gap-4 sm:grid-cols-2">

            {(p.screenshots as string[]).map(
              (src: string, i: number) => (
                <motion.a
                  key={src}
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -6 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 22,
                  }}
                  className="glass-card glow-hover block aspect-[4/3] overflow-hidden"
                >

                  <img
                    src={src}
                    alt={`${p.title} screenshot ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />

                </motion.a>
              ),
            )}

          </div>

        </Section>

        {/* Features / Tech */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">

          <PanelList
            icon={Sparkles}
            title="Features"
            items={p.features}
          />

          <PanelList
            icon={Layers}
            title="Tech Stack"
            items={p.tags}
            chip
          />

        </div>

        {/* Architecture / Challenges */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">

          <PanelList
            icon={Cpu}
            title="Architecture"
            items={p.architecture}
          />

          <PanelList
            icon={CheckCircle2}
            title="Challenges"
            items={p.challenges}
          />

        </div>

        {/* More projects */}
        <Section title="More projects">

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {PROJECTS
              .filter((x) => x.slug !== p.slug)
              .slice(0, 3)
              .map((o) => (

                <Link
                  key={o.slug}
                  to="/projects/$slug"
                  params={{ slug: o.slug }}
                  className="glass-card glow-hover relative block overflow-hidden"
                >

                  <div
                    className="relative aspect-[16/10] overflow-hidden"
                    style={{ background: o.gradient }}
                  >

                    <img
                      src={o.cover}
                      alt={`${o.title} cover`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                    />

                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 50%, oklch(0 0 0 / 0.35) 100%)",
                      }}
                    />

                  </div>

                  <div className="p-5">

                    <div className="text-sm font-semibold">
                      {o.title}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {o.kicker}
                    </div>

                  </div>

                </Link>

              ))}

          </div>

        </Section>

      </main>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">

      <h2
        className="mb-5 font-display text-2xl tracking-tight sm:text-3xl"
        style={{ color: "var(--accent-purple)" }}
      >
        {title}
      </h2>

      {children}

    </section>
  );
}

function PanelList({
  icon: Icon,
  title,
  items,
  chip = false,
}: {
  icon: typeof Sparkles;
  title: string;
  items: string[];
  chip?: boolean;
}) {
  return (
    <div className="glass-card glow-hover p-6">

      <div className="flex items-center gap-2">

        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
          style={{
            background: "var(--gradient-button)",
          }}
        >
          <Icon className="h-4 w-4" />
        </span>

        <div className="font-semibold">
          {title}
        </div>

      </div>

      {chip ? (

        <div className="mt-4 flex flex-wrap gap-2">

          {items.map((t) => {

            const meta = TECH_META[t];

            return (
              <span
                key={t}
                className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[12px] font-medium text-black"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(1 0 0 / 0.92), oklch(0.98 0.005 280 / 0.7))",
                  border:
                    "1px solid oklch(1 0 0 / 0.95)",
                  boxShadow:
                    "inset 0 1px 0 oklch(1 0 0 / 0.95), 0 1px 2px oklch(0.3 0.08 280 / 0.08), 0 6px 14px -6px oklch(0.3 0.1 280 / 0.22)",
                }}
              >

                {meta && (
                  <img
                    src={`https://cdn.simpleicons.org/${meta.slug}/${meta.color}`}
                    alt=""
                    width={14}
                    height={14}
                    loading="lazy"
                    decoding="async"
                    className="h-3.5 w-3.5 shrink-0"
                  />
                )}

                {t}

              </span>
            );
          })}

        </div>

      ) : (

        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">

          {items.map((it) => (

            <li
              key={it}
              className="flex items-start gap-2"
            >

              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0"
                style={{
                  color: "var(--accent-purple)",
                }}
              />

              {it}

            </li>

          ))}

        </ul>

      )}

    </div>
  );
}