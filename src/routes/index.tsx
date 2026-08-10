import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
  AnimatePresence,
  type MotionValue,
} from "motion/react";

import {
  ArrowRight,
  Download,
  Sparkles,
  User,
  Heart,
  Wrench,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  Code2,
  Palette,
  Layers,
  GraduationCap,
  Briefcase,
  FileText,
  Eye,
  Send,
  Sun,
  Moon,
  Menu,
  X,
  MoreHorizontal,
  ExternalLink,
  CheckCircle2,
  Check,
  Maximize2,
  ZoomIn,
  Award,
  Folder,
  Search,
  Share2,
  Printer,
  Rocket,
  type LucideIcon,
} from "lucide-react";

import { PROJECTS, RESUME, PORTRAIT_URL } from "@/lib/projects-data";
import { toast } from "sonner";

/* Certificate images */
import anthropic1 from "@/assets/certificates/anthropic-1.jpg";
import googleAI1 from "@/assets/certificates/google-ai-1.jpg";
import infosys1 from "@/assets/certificates/infosys-1.jpg";
const portrait = PORTRAIT_URL;

/* ============================ Profile Portrait ============================ */
function ProfilePortrait({ src }: { src: string }) {
  return (
    <div style={{ perspective: 1400 }} className="relative">
      {/* Ambient under-glow (static) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[32px] opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 65%, oklch(0.86 0.11 295 / 0.38), oklch(0.88 0.09 210 / 0.24) 55%, transparent 78%)",
        }}
      />
      {/* Frame — stationary; hover-only 3D lift */}
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          boxShadow:
            "0 40px 80px -30px oklch(0.28 0.06 280 / 0.5), 0 22px 44px -22px oklch(0.55 0.16 300 / 0.32), 0 8px 18px -10px oklch(0.55 0.14 210 / 0.25), inset 0 1px 0 oklch(1 0 0 / 0.9)",
        }}
        whileHover={{
          y: -10,
          rotateX: 2,
          rotateY: -2.5,
          transition: { type: "spring", stiffness: 180, damping: 18 },
        }}
        className="relative overflow-hidden rounded-2xl border-2 border-white bg-white"
      >
        <img
          src={src}
          alt="Shaik Eesub Vali"
          loading="lazy"
          decoding="async"
          width={768}
          height={960}
          className="relative block h-auto w-full object-contain object-center"
          draggable={false}
          style={{ transform: "translateZ(30px)" }}
        />
      </motion.div>
    </div>
  );
}



/* =============================== Theme Hook =============================== */
function useTheme() {
  const [theme, setThemeState] = useState<"light" | "dark">("light");
  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem("theme"); } catch { /* ignore */ }
    const t = stored === "dark" ? "dark" : "light";
    setThemeState(t);
    document.documentElement.classList.toggle("dark", t === "dark");
  }, []);
  const setTheme = (t: "light" | "dark") => {
    setThemeState(t);
    document.documentElement.classList.toggle("dark", t === "dark");
    try { localStorage.setItem("theme", t); } catch { /* ignore */ }
  };
  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");
  return { theme, toggle };
}

/* ============================== Mouse Tracker ============================== */
function useMousePos() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);
  return { x, y };
}

/* ================================ Route ==================================== */
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shaik Eesub Vali — Frontend Developer & UI Designer" },
      {
        name: "description",
        content:
          "Premium liquid-glass portfolio of Shaik Eesub Vali. Frontend Developer, UI Designer, Creative Builder from Narasaraopet, Andhra Pradesh.",
      },
      { property: "og:title", content: "Shaik Eesub Vali — Eesub Labs" },
      {
        property: "og:description",
        content:
          "Frontend developer crafting beautiful, functional web experiences at the intersection of design and technology.",
      },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
  { id: "resume", label: "Resume" },
];

function Portfolio() {
  const mouse = useMousePos();
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-background focus:shadow-lg focus:outline-none"
      >
        Skip to content
      </a>
      <BackgroundOrbs mouse={mouse} />
      <Nav />
      <CommandPalette />
      <main id="home" className="relative z-10 mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-8 sm:pt-28 sm:pb-32">
        <Hero mouse={mouse} />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
        <Resume />
        <Certifications />
      </main>
      <Footer />
    </div>
  );
}

/* =========================== Command Palette ============================== */
function CommandPalette() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const go = (id: string) => {
    setOpen(false);
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };
  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          className="fixed inset-0 z-[150] flex items-start justify-center bg-black/40 backdrop-blur-md pt-[15vh] px-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-white/95 shadow-2xl"
          >
            <div className="border-b border-black/5 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/50">
              Jump to section
            </div>
            <ul className="p-2">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => go(n.id)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-black/85 hover:bg-black/5 focus:bg-black/5 focus:outline-none"
                  >
                    <span>{n.label}</span>
                    <span className="text-[10px] uppercase tracking-wider text-black/40">↵</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-black/5 px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-black/40">
              Press <kbd className="rounded bg-black/5 px-1">Esc</kbd> to close · <kbd className="rounded bg-black/5 px-1">⌘K</kbd> to toggle
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ============================== Background ================================ */
function BackgroundOrbs({ mouse }: { mouse: { x: MotionValue<number>; y: MotionValue<number> } }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 2000], [0, 150]);
  const y3 = useTransform(scrollY, [0, 2000], [0, -100]);

  // mouse-reactive glow
  const mx = useSpring(mouse.x, { stiffness: 50, damping: 20 });
  const my = useSpring(mouse.y, { stiffness: 50, damping: 20 });
  const glowX = useTransform(mx, (v) => v - 300);
  const glowY = useTransform(my, (v) => v - 300);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Warm beige base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,oklch(0.97_0.02_75)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_50%_-20%,oklch(0.28_0.04_290)_0%,transparent_60%)]" />

      <motion.div
        className="orb"
        style={{
          width: 620,
          height: 620,
          left: "-10%",
          top: "8%",
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.82 0.18 320 / 0.85), oklch(0.7 0.2 295 / 0.35) 60%, transparent 75%)",
          filter: "blur(130px)",
          y: reduce ? 0 : y1,
        }}
        animate={reduce ? undefined : { x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb"
        style={{
          width: 720,
          height: 720,
          right: "-12%",
          top: "28%",
          background:
            "radial-gradient(circle at 60% 40%, oklch(0.85 0.15 195 / 0.7), oklch(0.7 0.18 220 / 0.3) 55%, transparent 75%)",
          filter: "blur(140px)",
          y: reduce ? 0 : y2,
        }}
        animate={reduce ? undefined : { x: [0, -50, 30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb"
        style={{
          width: 560,
          height: 560,
          left: "32%",
          bottom: "-8%",
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.85 0.16 350 / 0.75), oklch(0.75 0.18 320 / 0.3) 55%, transparent 75%)",
          filter: "blur(130px)",
          y: reduce ? 0 : y3,
        }}
        animate={reduce ? undefined : { x: [0, 30, -40, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Mouse-reactive ambient glow */}
      {!reduce && (
        <motion.div
          className="absolute h-[600px] w-[600px] rounded-full"
          style={{
            x: glowX,
            y: glowY,
            background:
              "radial-gradient(circle, oklch(0.85 0.15 295 / 0.18) 0%, transparent 60%)",
            filter: "blur(40px)",
            mixBlendMode: "screen",
          }}
        />
      )}

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.2 0.05 280) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />
      {/* Top vignette */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/40 to-transparent" />
    </div>
  );
}

/* ================================== Nav =================================== */
function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      // Hide on scroll-down, reveal on scroll-up
      if (y > 80 && y > lastY.current + 4) setHidden(true);
      else if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // lock scroll while sheet open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActive(id);
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollTo(id);
  };

  

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="fixed left-1/2 top-4 z-50 w-[min(960px,calc(100%-1.25rem))] -translate-x-1/2"
      >
        {/* Desktop nav (md+) */}
        <nav
          className={`glass-card hidden items-center justify-between gap-4 px-5 py-2.5 transition-all duration-500 md:flex ${scrolled ? "nav-scrolled" : ""}`}
          aria-label="Primary"
        >
          <a
            href="#home"
            onClick={(e) => handleClick(e, "home")}
            className="brand-logo rounded-md font-display text-[1.22rem] font-semibold tracking-tight text-black transition-all dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            Eesub Labs
          </a>
          <ul className="flex items-center gap-1">
            {NAV.map((n) => {
              const isActive = active === n.id;
              return (
                <li key={n.id} className="relative">
                  <a
                    href={`#${n.id}`}
                    onClick={(e) => handleClick(e, n.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={[
                      "relative z-10 inline-block rounded-full px-3.5 py-1.5 text-sm outline-none transition-colors",
                      "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      isActive ? "text-white" : "text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                  >
                    {n.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="nav-pill-active absolute inset-0 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
            className="glass-pill flex h-9 items-center gap-1.5 px-3 text-[11px] font-medium text-muted-foreground transition-transform hover:scale-105"
          >
            {theme === "dark" ? (
              <Moon className="h-3.5 w-3.5" style={{ color: "var(--accent-purple)" }} />
            ) : (
              <Sun className="h-3.5 w-3.5" style={{ color: "var(--accent-pink)" }} />
            )}
            {theme === "dark" ? "Dark" : "Light"}
          </button>
        </nav>

        {/* Mobile capsule nav — centered brand */}
        <nav
          className="nav-capsule nav-capsule-sheen relative flex h-[52px] items-center px-3 md:hidden"
          aria-label="Mobile"
          style={{ boxShadow: "0 14px 36px -14px oklch(0.3 0.1 280 / 0.4)" }}
        >
          <a
            href="#home"
            onClick={(e) => handleClick(e, "home")}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[21px] font-semibold leading-none tracking-tight text-black dark:text-white"
            style={{
              background: "var(--gradient-name)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 0 10px oklch(0.78 0.18 295 / 0.45))",
            }}
          >
            Eesub Labs
          </a>

          <motion.button
            type="button"
            onClick={() => setOpen((v) => !v)}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="ml-auto relative flex h-9 w-9 items-center justify-center rounded-full"
            style={{ background: "var(--glass-tint-2)", border: "1px solid var(--glass-border)" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "dots"}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ type: "spring", stiffness: 360, damping: 24 }}
                className="flex"
              >
                {open ? (
                  <X className="h-4 w-4" style={{ color: "var(--accent-purple)" }} />
                ) : (
                  <MoreHorizontal className="h-4 w-4" style={{ color: "var(--accent-purple)" }} />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </nav>

      </motion.header>


      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="sheet-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/35 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 400) setOpen(false);
              }}
              className="glass-sheet fixed inset-x-0 bottom-0 z-[61] px-5 pb-8 pt-3 md:hidden"
            >
              <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-foreground/20" />
              <div className="mb-3 px-2 text-[11px] uppercase tracking-wider text-muted-foreground">Navigate</div>
              <ul className="grid gap-1.5">
                {NAV.map((n, i) => {
                  const isActive = active === n.id;
                  return (
                    <motion.li
                      key={n.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 + i * 0.04, type: "spring", stiffness: 320, damping: 26 }}
                    >
                      <button
                        type="button"
                        onClick={() => { setOpen(false); setTimeout(() => scrollTo(n.id), 220); }}
                        className={`group flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-colors ${
                          isActive ? "text-white" : "text-foreground/85 hover:text-foreground"
                        }`}
                        style={isActive ? { background: "var(--gradient-button)" } : { background: "var(--glass-tint-2)" }}
                      >
                        <span className="text-[15px] font-medium">{n.label}</span>
                        <ArrowRight className={`h-4 w-4 transition-transform ${isActive ? "translate-x-0.5" : "opacity-50 group-hover:translate-x-0.5"}`} />
                      </button>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-5 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-tint-1)] p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[13px] font-medium text-foreground">Appearance</div>
                    <div className="text-[11px] text-muted-foreground">{theme === "dark" ? "Dark mode" : "Light mode"}</div>
                  </div>
                  <motion.button
                    type="button"
                    onClick={toggle}
                    whileTap={{ scale: 0.92 }}
                    aria-label="Toggle theme"
                    className="relative flex h-9 w-16 items-center rounded-full p-1"
                    style={{ background: theme === "dark" ? "var(--gradient-button)" : "var(--glass-tint-2)", border: "1px solid var(--glass-border)" }}
                  >
                    <motion.span
                      layout
                      transition={{ type: "spring", stiffness: 480, damping: 32 }}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[0_4px_10px_-2px_oklch(0.3_0.1_280/0.35)]"
                      style={{ marginLeft: theme === "dark" ? "auto" : 0 }}
                    >
                      {theme === "dark" ? (
                        <Moon className="h-3.5 w-3.5" style={{ color: "var(--accent-purple)" }} />
                      ) : (
                        <Sun className="h-3.5 w-3.5" style={{ color: "var(--accent-pink)" }} />
                      )}
                    </motion.span>
                  </motion.button>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between px-1 text-[11px] text-muted-foreground">
                <span>Swipe down to close</span>
                <span className="inline-flex items-center gap-1">
                  <span className="live-dot" /> Online
                </span>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================== Tilt wrapper ============================== */
function Tilt({
  children,
  className = "",
  intensity = 8,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });
  const sx = useSpring(50, { stiffness: 200, damping: 20 });
  const sy = useSpring(50, { stiffness: 200, damping: 20 });
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * intensity * 2);
    rx.set(-(py - 0.5) * intensity * 2);
    sx.set(px * 100);
    sy.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    sx.set(50);
    sy.set(50);
  };
  const spotlightX = useTransform(sx, (v) => `${v}%`);
  const spotlightY = useTransform(sy, (v) => `${v}%`);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        ...style,
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [spotlightX, spotlightY] as unknown as MotionValue<string>[],
            ([x, y]) =>
              `radial-gradient(280px circle at ${x} ${y}, oklch(1 0 0 / 0.22), transparent 60%)`,
          ),
          mixBlendMode: "overlay",
        }}
      />
    </motion.div>
  );
}

/* ============================== Reveal helper ============================= */
function Reveal({
  children,
  delay = 0,
  className = "",
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ================================== Hero ================================== */
function Hero({ mouse }: { mouse: { x: MotionValue<number>; y: MotionValue<number> } }) {
  return (
    <section id="home" className="scroll-mt-28">
      <div className="glass-card relative overflow-hidden p-4 sm:p-10">
        {/* soft ambient wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.86 0.11 300 / 0.55), oklch(0.86 0.09 210 / 0.35) 55%, transparent 78%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-24 h-[380px] w-[380px] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.9 0.08 350 / 0.5), transparent 72%)",
          }}
        />

        <div className="grid gap-3 md:grid-cols-[45fr_55fr] md:items-center md:gap-10">
          {/* LEFT — content */}
          <div>
            <Reveal>
              <span className="glass-pill inline-flex items-center gap-2 px-3 py-1 text-[11px] sm:text-xs">
                <span className="live-dot" />
                Available for Internships
                <Sparkles className="h-3 w-3" style={{ color: "var(--accent-purple)" }} />
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-3 font-display leading-[1.02] tracking-tight text-[1.9rem] sm:mt-6 sm:text-6xl md:text-[68px]">
                <span className="block text-foreground/70 text-[0.9rem] font-medium sm:text-2xl md:text-[26px]">
                  Hi, I&apos;m
                </span>
                <span className="mt-0.5 block text-gradient whitespace-nowrap">
                  Shaik Eesub Vali
                </span>
                <span className="mt-1.5 block text-foreground/85 text-[1rem] sm:text-3xl md:text-[34px]">
                  Frontend Engineer &amp;{" "}
                  <span className="text-gradient">AI Product Builder</span>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-2.5 max-w-md text-[12.5px] leading-relaxed text-muted-foreground sm:mt-5 sm:text-[15px]">
                I build premium React applications and AI-powered products with
                beautiful user experiences under{" "}
                <span className="font-semibold text-foreground/85">Eesub Labs</span>.
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-3 flex flex-nowrap gap-2 sm:mt-7 sm:flex-wrap sm:gap-3">
                <MagneticButton
                  href="#projects"
                  className="btn-gradient inline-flex h-[46px] flex-1 items-center justify-center gap-1.5 px-3 py-0 text-[12px] whitespace-nowrap sm:h-[50px] sm:flex-none sm:px-5 sm:text-sm"
                >
                  Explore Projects <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </MagneticButton>
                <MagneticButton
                  href="#resume"
                  className="glass-pill inline-flex h-[46px] flex-1 items-center justify-center gap-1.5 px-3 py-0 text-[12px] font-medium whitespace-nowrap text-foreground sm:h-[50px] sm:flex-none sm:px-5 sm:text-sm"
                >
                  <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Resume
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.34}>
              <div className="mt-3 grid grid-cols-4 gap-1.5 sm:mt-8 sm:gap-3">
                <Stat value="4+" label="Projects" />
                <Stat value="2" label="Internships" />
                <Stat value="10+" label="Tech" />
                <Stat value="2027" label="Graduate" />
              </div>
            </Reveal>
          </div>

          {/* RIGHT — premium workstation */}
          <div className="mt-1 md:mt-0">
            <HeroWorkstation mouse={mouse} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Minimalist Apple-style workstation with floating glass cards */
function HeroWorkstation({
  mouse,
}: {
  mouse: { x: MotionValue<number>; y: MotionValue<number> };
}) {
  const reduce = useReducedMotion();
  const sx = useSpring(mouse.x, { stiffness: 30, damping: 22 });
  const sy = useSpring(mouse.y, { stiffness: 30, damping: 22 });

  // Main panel — subtle 3D tilt with cursor
  const panelRotY = useTransform(sx, (v) =>
    typeof window === "undefined" ? 0 : (v / window.innerWidth - 0.5) * 6,
  );
  const panelRotX = useTransform(sy, (v) =>
    typeof window === "undefined" ? 0 : -(v / window.innerHeight - 0.5) * 4,
  );
  const panelX = useTransform(sx, (v) =>
    typeof window === "undefined" ? 0 : (v / window.innerWidth - 0.5) * 10,
  );
  const panelY = useTransform(sy, (v) =>
    typeof window === "undefined" ? 0 : (v / window.innerHeight - 0.5) * 8,
  );

  // Behind cards — inverse parallax
  const bgShiftX = useTransform(sx, (v) =>
    typeof window === "undefined" ? 0 : -(v / window.innerWidth - 0.5) * 18,
  );
  const bgShiftY = useTransform(sy, (v) =>
    typeof window === "undefined" ? 0 : -(v / window.innerHeight - 0.5) * 14,
  );

  const bgShiftXNeg = useTransform(bgShiftX, (v) => -v);
  const bgShiftYNeg = useTransform(bgShiftY, (v) => -v);

  const projects = [
    { name: "Tripzy", status: "Live", tone: "var(--accent-teal)" },
    { name: "WhatsApp Travel Bot", status: "Beta", tone: "var(--accent-purple)" },
    { name: "Portfolio", status: "Online", tone: "var(--accent-pink)" },
  ];


  return (
    <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[440px]" style={{ perspective: 1400 }}>
      {/* Ambient gradient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-20 -z-20 rounded-[50%] opacity-45 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, oklch(0.86 0.11 295 / 0.4), transparent 60%), radial-gradient(ellipse at 70% 65%, oklch(0.88 0.09 210 / 0.32), transparent 60%)",
        }}
      />

      {/* Tiny glowing particles */}
      {!reduce && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {[
            { top: "8%", left: "12%", d: 6, dur: 7, tone: "var(--accent-purple)" },
            { top: "18%", left: "88%", d: 4, dur: 9, tone: "var(--accent-teal)" },
            { top: "70%", left: "6%", d: 5, dur: 8, tone: "var(--accent-pink)" },
            { top: "88%", left: "78%", d: 4, dur: 10, tone: "var(--accent-purple)" },
            { top: "45%", left: "94%", d: 3, dur: 11, tone: "var(--accent-teal)" },
          ].map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                top: p.top,
                left: p.left,
                width: p.d,
                height: p.d,
                background: p.tone,
                boxShadow: `0 0 12px ${p.tone}`,
                opacity: 0.55,
              }}
              animate={{ y: [0, -14, 0], opacity: [0.35, 0.75, 0.35] }}
              transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}

      {/* Background glass card #1 — top-left, behind */}
      <motion.div
        aria-hidden
        style={{
          x: reduce ? 0 : bgShiftX,
          y: reduce ? 0 : bgShiftY,
          willChange: "transform",
        }}
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-6 top-2 z-0 hidden h-24 w-40 rounded-2xl sm:block"
      >
        <div
          className="h-full w-full rounded-2xl border backdrop-blur-md"
          style={{
            background:
              "linear-gradient(150deg, oklch(1 0 0 / 0.5), oklch(1 0 0 / 0.22))",
            borderColor: "oklch(1 0 0 / 0.5)",
            boxShadow:
              "0 20px 40px -24px oklch(0.35 0.06 280 / 0.35), inset 0 1px 0 oklch(1 0 0 / 0.7)",
          }}
        />
      </motion.div>

      {/* Background glass card #2 — bottom-right, behind */}
      <motion.div
        aria-hidden
        style={{
          x: reduce ? 0 : bgShiftXNeg,
          y: reduce ? 0 : bgShiftYNeg,
          willChange: "transform",
        }}
        animate={reduce ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute -right-8 bottom-4 z-0 hidden h-28 w-32 rounded-2xl sm:block"
      >
        <div
          className="h-full w-full rounded-2xl border backdrop-blur-md"
          style={{
            background:
              "linear-gradient(200deg, oklch(1 0 0 / 0.45), oklch(1 0 0 / 0.18))",
            borderColor: "oklch(1 0 0 / 0.45)",
            boxShadow:
              "0 22px 44px -24px oklch(0.35 0.06 280 / 0.35), inset 0 1px 0 oklch(1 0 0 / 0.7)",
          }}
        />
      </motion.div>

      {/* ───── MAIN FOUNDER DASHBOARD PANEL ───── */}
      <motion.div
        style={{
          x: reduce ? 0 : panelX,
          y: reduce ? 0 : panelY,
          rotateX: reduce ? 0 : panelRotX,
          rotateY: reduce ? 0 : panelRotY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        animate={reduce ? undefined : { y: [0, -16, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 mx-auto w-full"
      >
        <div
          className="relative overflow-hidden rounded-[22px] sm:rounded-[26px] border p-4 sm:p-6 backdrop-blur-2xl"
          style={{
            background:
              "linear-gradient(155deg, oklch(1 0 0 / 0.72) 0%, oklch(1 0 0 / 0.5) 55%, oklch(1 0 0 / 0.6) 100%)",
            borderColor: "oklch(1 0 0 / 0.7)",
            boxShadow: [
              "0 60px 100px -40px oklch(0.35 0.06 280 / 0.55)",
              "0 34px 60px -28px oklch(0.55 0.18 300 / 0.35)",
              "0 18px 32px -18px oklch(0.55 0.14 210 / 0.32)",
              "inset 0 1px 0 oklch(1 0 0 / 0.95)",
              "inset 0 0 0 1px oklch(1 0 0 / 0.28)",
            ].join(", "),
          }}
        >
          {/* Specular reflection sweep */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "linear-gradient(120deg, oklch(1 0 0 / 0.35) 0%, transparent 28%, transparent 72%, oklch(1 0 0 / 0.15) 100%)",
            }}
          />
          {/* Iridescent edge tint */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[26px] opacity-40"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.85 0.14 295 / 0.18), transparent 40%, transparent 60%, oklch(0.85 0.13 200 / 0.18))",
              mixBlendMode: "screen",
            }}
          />

          {/* Header */}
          <div className="relative flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl font-display text-[14px] text-white shadow-[0_8px_18px_-6px_oklch(0.5_0.2_295/0.5)]"
              style={{ background: "var(--gradient-pink-purple)" }}
            >
              EL
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-display text-[16px] leading-tight text-foreground/90">
                Eesub Labs
              </div>
              <div className="text-[11px] text-muted-foreground">
                Building Premium AI Products
              </div>

            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--glass-border)] bg-white/40 px-2.5 py-1 text-[9.5px] font-medium text-foreground/65">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: "var(--accent-teal)" }} />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent-teal)" }} />
              </span>
              Active
            </span>
          </div>

          {/* Projects */}
          <div className="relative mt-5">
            <div className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-foreground/45">
              Projects
            </div>
            <div className="mt-2 space-y-1.5">
              {projects.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center gap-2.5 rounded-xl border border-[var(--glass-border)] bg-white/30 px-3 py-2"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: p.tone, boxShadow: `0 0 8px ${p.tone}` }}
                  />
                  <span className="truncate text-[11.5px] font-medium text-foreground/80">
                    {p.name}
                  </span>
                  <span className="ml-auto text-[9.5px] font-medium uppercase tracking-wide text-foreground/50">
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Focus */}
          <div className="relative mt-4 rounded-xl border border-[var(--glass-border)] bg-white/25 px-3 py-2.5">
            <div className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-foreground/45">
              Current Focus
            </div>
            <div className="mt-1 text-[11.5px] leading-snug text-foreground/80">
              Building premium AI experiences.
            </div>
            <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full"
                style={{ width: "68%", background: "var(--gradient-pink-purple)" }}
              />
            </div>
          </div>

        </div>

        {/* Realistic soft ground shadow beneath the panel */}
        <div
          aria-hidden
          className="pointer-events-none mx-auto mt-4 h-6 w-[78%] rounded-[50%] blur-2xl"
          style={{ background: "oklch(0.3 0.05 280 / 0.28)" }}
        />
      </motion.div>
    </div>
  );
}



function MagneticButton({
  children,
  href,
  className = "",
  onClick,
  download,
  target,
  rel,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  download?: string | boolean;
  target?: string;
  rel?: string;
  as?: string;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 18 });
  const y = useSpring(0, { stiffness: 220, damping: 18 });
  const reduce = useReducedMotion();
  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };
  const Comp = href ? motion.a : motion.button;
  return (
    <Comp
      // @ts-expect-error ref union
      ref={ref}
      href={href}
      download={download as never}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      className={`relative overflow-hidden shine-sweep ${className}`}
    >
      {children}
    </Comp>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-card-sm px-2 py-2.5 text-center sm:px-4 sm:py-3"
    >
      <div className="text-gradient font-display text-lg leading-none sm:text-2xl">{value}</div>
      <div className="mt-1 truncate text-[9px] uppercase tracking-wide text-muted-foreground sm:text-[11px]">
        {label}
      </div>
    </motion.div>
  );
}



/* ================================== About ================================= */
function About() {
  const whoBullets = [
    { Icon: Code2, label: "Frontend Developer" },
    { Icon: Layers, label: "React Developer" },
    { Icon: Palette, label: "UI Designer" },
    { Icon: Sparkles, label: "AI Builder & Prompt Engineer" },
  ];
  const interests = [
    "React", "AI", "Frontend", "UI Design", "Travel Tech",
    "Animations", "SaaS", "Open Source", "Prompt Engineering",
  ];
  const doItems = [
    "Frontend Development", "Responsive Websites",
    "React Applications", "UI Systems",
    "REST APIs", "Firebase",
    "Animations", "Performance Optimization",
  ];

  return (
    <Section id="about" eyebrow="The person behind the pixels" title="About Me">
      <div aria-hidden className="pointer-events-none absolute -left-10 top-20 h-40 w-40 rounded-full opacity-60 blur-3xl" style={{ background: "oklch(0.82 0.16 320 / 0.5)" }} />
      <div aria-hidden className="pointer-events-none absolute right-0 top-40 h-48 w-48 rounded-full opacity-60 blur-3xl" style={{ background: "oklch(0.82 0.14 195 / 0.5)" }} />

      <div className="grid items-stretch gap-3 sm:gap-6 md:grid-cols-[0.9fr_1.4fr]">
        {/* Profile — single clean card */}
        <Reveal className="flex">
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="glass-card-clean flex w-full flex-col p-3.5 sm:p-4"
          >
            <ProfilePortrait src={portrait} />


            <div className="mt-6 flex flex-1 flex-col">
              <div className="font-display text-xl leading-tight">Shaik Eesub Vali</div>
              <div className="text-xs text-muted-foreground">Frontend Developer</div>

              <div className="mt-5 space-y-2.5 text-[13px] text-muted-foreground">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" style={{ color: "var(--accent-pink)" }} /> Narasaraopet, AP</div>
                <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4" style={{ color: "var(--accent-purple)" }} /> B.Tech CSE (2027)</div>
                <div className="flex items-center gap-2"><Briefcase className="h-4 w-4" style={{ color: "var(--accent-teal)" }} /> Open for Internships</div>
              </div>
            </div>
          </motion.div>
        </Reveal>

        {/* Right side: ONE container, three stacked horizontal cards */}
        <Reveal delay={0.08} className="flex">
          <div className="grid w-full auto-rows-fr gap-2.5 sm:gap-4">
            {/* Who I Am */}
            <Tilt className="group flex" intensity={3}>
              <motion.div
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="glass-card glow-hover flex w-full flex-col p-3.5 sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.08 }}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-[0_10px_24px_-8px_oklch(0.5_0.2_295/0.5)]"
                    style={{ background: "var(--gradient-pink-purple)" }}
                  >
                    <User className="h-5 w-5" />
                  </motion.div>
                  <div className="font-semibold">Who I Am</div>
                </div>
                <ul className="mt-3 grid grid-cols-1 gap-1.5 text-[13px] text-muted-foreground sm:grid-cols-2">
                  {whoBullets.map((b) => (
                    <li key={b.label} className="flex items-center gap-2">
                      <b.Icon className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--accent-purple)" }} />
                      {b.label}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Tilt>

            {/* My Interests */}
            <Tilt className="group flex" intensity={3}>
              <motion.div
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="glass-card glow-hover flex w-full flex-col p-3.5 sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: -8, scale: 1.08 }}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-[0_10px_24px_-8px_oklch(0.5_0.2_295/0.5)]"
                    style={{ background: "var(--gradient-teal-purple)" }}
                  >
                    <Heart className="h-5 w-5" />
                  </motion.div>
                  <div className="font-semibold">My Interests</div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {interests.map((t) => (
                    <motion.span
                      key={t}
                      whileHover={{ y: -2, scale: 1.04 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 320, damping: 16 }}
                      className="glass-pill px-3 py-1 text-[11px] text-foreground"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </Tilt>

            {/* What I Do */}
            <Tilt className="group flex" intensity={3}>
              <motion.div
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="glass-card glow-hover flex w-full flex-col p-3.5 sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.08 }}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-[0_10px_24px_-8px_oklch(0.5_0.2_295/0.5)]"
                    style={{ background: "linear-gradient(135deg, oklch(0.82 0.13 195), oklch(0.82 0.13 350))" }}
                  >
                    <Wrench className="h-5 w-5" />
                  </motion.div>
                  <div className="font-semibold">What I Do</div>
                </div>
                <ul className="mt-3 grid grid-cols-1 gap-1.5 text-[13px] text-muted-foreground sm:grid-cols-2">
                  {doItems.map((it) => (
                    <li key={it} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--accent-teal)" }} />
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Tilt>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}


function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="ig-glyph" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#F58529" />
          <stop offset="35%" stopColor="#DD2A7B" />
          <stop offset="70%" stopColor="#8134AF" />
          <stop offset="100%" stopColor="#515BD4" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="url(#ig-glyph)" />
      <circle cx="12" cy="12" r="4" stroke="url(#ig-glyph)" />
      <circle cx="17.5" cy="6.5" r="1" fill="url(#ig-glyph)" stroke="url(#ig-glyph)" />
    </svg>
  );
}

function SocialIcon({ Icon, color, gradient, href }: { Icon: typeof Mail; color?: string; gradient?: string; href?: string }) {
  const isInstagram = !!gradient;
  const style: CSSProperties = {
    ["--brand" as never]: color ?? "oklch(0.7 0.15 295)",
  };
  const Comp: React.ElementType = href ? motion.a : motion.span;
  const compProps = href ? { href, target: "_blank", rel: "noreferrer" } : {};
  return (
    <Comp
      {...compProps}
      whileHover={{ y: -3, scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 300, damping: 16 }}
      className="glass-pill brand-glow relative flex h-9 w-9 cursor-pointer items-center justify-center"
      style={style}
    >
      {isInstagram ? (
        <InstagramGlyph />
      ) : (
        <Icon className="h-4 w-4" style={{ color: color ?? "var(--accent-purple)" }} />
      )}
    </Comp>
  );
}



/* ================================= Skills ================================= */
type SkillDef = {
  name: string;
  category: string;
  color: string;
  Logo?: React.FC;
};

const SkillLogos = {
  HTML5: () => (
    <svg viewBox="0 0 32 32" className="h-7 w-7"><path fill="#E44D26" d="M4 2l2.2 25 9.8 3 9.8-3L28 2z" /><path fill="#F16529" d="M16 28V4h11.8L26 25z" /><path fill="#fff" d="M16 13h-5l-.3-3H16V7H7l1 11h8zM16 24l-4-1.1-.3-3h-2.7l.5 5.4 6.5 1.8z" /><path fill="#EBEBEB" d="M16 18v-3h4.5l-.5 5-4 1.1V24l6.5-1.8 1-11H16z" /></svg>
  ),
  CSS3: () => (
    <svg viewBox="0 0 32 32" className="h-7 w-7"><path fill="#1572B6" d="M4 2l2.2 25 9.8 3 9.8-3L28 2z" /><path fill="#33A9DC" d="M16 28V4h11.8L26 25z" /><path fill="#fff" d="M16 13h6l-.4 4H16v3h4.9l-.5 5.4-4.4 1.2V24l4-1.1.3-3H16z" /><path fill="#EBEBEB" d="M16 7v3H8.6L8.3 7zm0 6v3h-3l-.2-3z" /></svg>
  ),
  JavaScript: () => (
    <svg viewBox="0 0 32 32" className="h-7 w-7"><rect width="32" height="32" rx="4" fill="#F7DF1E" /><path fill="#000" d="M21.3 25c.6 1 1.4 1.7 2.8 1.7 1.2 0 1.9-.6 1.9-1.4 0-1-.8-1.4-2.1-2l-.7-.3c-2.1-.9-3.5-2-3.5-4.3 0-2.1 1.6-3.7 4.1-3.7 1.8 0 3.1.6 4 2.3l-2.2 1.4c-.5-.9-1-1.2-1.8-1.2-.8 0-1.3.5-1.3 1.2 0 .8.5 1.1 1.7 1.7l.7.3c2.5 1.1 3.9 2.1 3.9 4.5 0 2.6-2 4-4.7 4-2.6 0-4.4-1.3-5.2-2.9zm-8.8.2c.4.8.8 1.4 1.8 1.4.9 0 1.5-.4 1.5-1.7v-9.6h2.9V25c0 3-1.7 4.3-4.2 4.3-2.3 0-3.6-1.2-4.2-2.6z" /></svg>
  ),
  TypeScript: () => (
    <svg viewBox="0 0 32 32" className="h-7 w-7"><rect width="32" height="32" rx="4" fill="#3178C6" /><path fill="#fff" d="M18 15v2.2h2.8V26h2.5v-8.8H26V15zM10 26.4c.5 1 1.5 1.7 3 1.7 1.6 0 2.7-.8 2.7-2.3 0-1.4-.8-2-2.2-2.6l-.4-.2c-.7-.3-1-.5-1-1 0-.4.3-.7.8-.7.5 0 .8.2 1 .7l1.4-.9c-.6-1-1.4-1.4-2.5-1.4-1.5 0-2.5.9-2.5 2.2 0 1.3.7 1.9 2 2.5l.4.2c.8.3 1.2.5 1.2 1.1 0 .5-.4.8-1.1.8-.8 0-1.2-.4-1.6-1z" /></svg>
  ),
  React: () => (
    <svg viewBox="0 0 32 32" className="h-7 w-7"><circle cx="16" cy="16" r="2.4" fill="#61DAFB" /><g fill="none" stroke="#61DAFB" strokeWidth="1.4"><ellipse cx="16" cy="16" rx="11" ry="4.2" /><ellipse cx="16" cy="16" rx="11" ry="4.2" transform="rotate(60 16 16)" /><ellipse cx="16" cy="16" rx="11" ry="4.2" transform="rotate(120 16 16)" /></g></svg>
  ),
  Tailwind: () => (
    <svg viewBox="0 0 32 32" className="h-7 w-7"><path fill="#38BDF8" d="M16 8c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25 1.14.29 1.96 1.12 2.86 2.04C18.08 15.3 19.78 17 23.5 17c4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-1.14-.29-1.95-1.12-2.86-2.04C21.42 9.7 19.72 8 16 8zM8.5 17c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25 1.14.29 1.95 1.12 2.86 2.04C10.58 24.3 12.28 26 16 26c4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-1.14-.29-1.95-1.12-2.86-2.04C13.92 18.7 12.22 17 8.5 17z" /></svg>
  ),
  Node: () => (
    <svg viewBox="0 0 32 32" className="h-7 w-7"><path fill="#539E43" d="M16 2l12 7v14l-12 7L4 23V9z" /><path fill="#fff" d="M20 21.3c-.6.3-1.4.4-2.2.4-2.4 0-3.3-1.1-3.3-2.6V13h-1.6v-1.4l1.7-.2.2-3h1.4v3h2.7V13h-2.7v6c0 1 .4 1.4 1.2 1.4.6 0 1-.1 1.5-.3z" /></svg>
  ),
  Firebase: () => (
    <svg viewBox="0 0 32 32" className="h-7 w-7"><path fill="#FFA000" d="M5 24l3-19 4 7z" /><path fill="#F57C00" d="M5 24L19 5l3 7z" /><path fill="#FFCA28" d="M5 24l22-6-3-13z" /><path fill="#FF8F00" d="M5 24l22-6L16 28z" /></svg>
  ),
  Git: () => (
    <svg viewBox="0 0 32 32" className="h-7 w-7"><path fill="#F05133" d="M30.6 14.6L17.4 1.4c-.8-.8-2-.8-2.8 0L12 4.2l3.4 3.4c.8-.3 1.8-.1 2.5.6.7.7.9 1.7.5 2.5l3.3 3.3c.8-.3 1.8-.1 2.5.6 1 1 1 2.6 0 3.6s-2.6 1-3.6 0c-.7-.7-.9-1.8-.5-2.6l-3.1-3.1v8.1c.2.1.5.3.7.5 1 1 1 2.6 0 3.6s-2.6 1-3.6 0-1-2.6 0-3.6c.3-.3.6-.4.9-.6v-8.2c-.3-.1-.6-.3-.9-.5-.7-.7-.9-1.8-.5-2.6L9.2 6.9 1.4 14.6c-.8.8-.8 2 0 2.8l13.2 13.2c.8.8 2 .8 2.8 0L30.6 17.4c.7-.8.7-2 0-2.8z" /></svg>
  ),
  GitHub: () => (
    <svg viewBox="0 0 32 32" className="h-7 w-7"><path fill="currentColor" d="M16 2C8.3 2 2 8.3 2 16c0 6.2 4 11.4 9.6 13.3.7.1 1-.3 1-.7v-2.6c-3.9.8-4.7-1.9-4.7-1.9-.6-1.6-1.5-2-1.5-2-1.3-.9.1-.9.1-.9 1.4.1 2.1 1.4 2.1 1.4 1.3 2.2 3.3 1.6 4.1 1.2.1-.9.5-1.6.9-1.9-3.1-.4-6.3-1.6-6.3-7 0-1.5.6-2.8 1.4-3.8-.1-.3-.6-1.8.2-3.7 0 0 1.2-.4 3.8 1.4 1.1-.3 2.3-.5 3.5-.5s2.4.2 3.5.5c2.7-1.8 3.8-1.4 3.8-1.4.8 1.9.3 3.4.2 3.7.9 1 1.4 2.3 1.4 3.8 0 5.4-3.3 6.6-6.4 7 .5.4 1 1.3 1 2.6v3.8c0 .4.3.8 1 .7C26 27.4 30 22.2 30 16c0-7.7-6.3-14-14-14z" /></svg>
  ),
  Vercel: () => (
    <svg viewBox="0 0 32 32" className="h-7 w-7"><path fill="currentColor" d="M16 4l14 24H2z" /></svg>
  ),
  Figma: () => (
    <svg viewBox="0 0 32 32" className="h-7 w-7"><path fill="#F24E1E" d="M11 4h5v8h-5a4 4 0 010-8z" /><path fill="#A259FF" d="M16 4h5a4 4 0 010 8h-5z" /><path fill="#0ACF83" d="M16 12h5a4 4 0 010 8h-5z" /><path fill="#FF7262" d="M11 20h5v-8h-5a4 4 0 000 8z" /><path fill="#1ABCFE" d="M11 28a4 4 0 010-8h5v4a4 4 0 01-5 4z" /></svg>
  ),
};

function Monogram({ letter, color }: { letter: string; color: string }) {
  return (
    <div
      className="flex h-7 w-7 items-center justify-center rounded-md text-[12px] font-bold text-white"
      style={{ background: color, boxShadow: `0 4px 10px -2px ${color}66` }}
    >
      {letter}
    </div>
  );
}

const SKILLS: SkillDef[] = [
  { name: "HTML5", category: "Frontend", color: "#E44D26", Logo: SkillLogos.HTML5 },
  { name: "CSS3", category: "Frontend", color: "#1572B6", Logo: SkillLogos.CSS3 },
  { name: "JavaScript", category: "Language", color: "#F7DF1E", Logo: SkillLogos.JavaScript },
  { name: "TypeScript", category: "Language", color: "#3178C6", Logo: SkillLogos.TypeScript },
  { name: "React", category: "Frontend Framework", color: "#61DAFB", Logo: SkillLogos.React },
  { name: "Next.js", category: "Framework", color: "#000000" },
  { name: "Tailwind CSS", category: "CSS Framework", color: "#38BDF8", Logo: SkillLogos.Tailwind },
  { name: "Node.js", category: "Backend", color: "#539E43", Logo: SkillLogos.Node },
  { name: "Express", category: "Backend", color: "#444444" },
  { name: "MongoDB", category: "Database", color: "#47A248" },
  { name: "Firebase", category: "Backend", color: "#FFA000", Logo: SkillLogos.Firebase },
  { name: "Supabase", category: "Backend", color: "#3ECF8E" },
  { name: "PostgreSQL", category: "Database", color: "#336791" },
  { name: "Git", category: "Version Control", color: "#F05133", Logo: SkillLogos.Git },
  { name: "GitHub", category: "Collaboration", color: "#181717", Logo: SkillLogos.GitHub },
  { name: "Docker", category: "DevOps", color: "#2496ED" },
  { name: "Vercel", category: "Deployment", color: "#000000", Logo: SkillLogos.Vercel },
  { name: "Netlify", category: "Deployment", color: "#00C7B7" },
  { name: "Framer Motion", category: "Animation", color: "#BB4B96" },
  { name: "GSAP", category: "Animation", color: "#88CE02" },
  { name: "Figma", category: "Design", color: "#A259FF", Logo: SkillLogos.Figma },
  { name: "Adobe XD", category: "Design", color: "#FF61F6" },
  { name: "REST API", category: "API", color: "#6366F1" },
  { name: "OpenAI API", category: "AI", color: "#10A37F" },
  { name: "Prompt Engineering", category: "AI", color: "#A78BFA" },
  { name: "Cursor AI", category: "AI", color: "#0EA5E9" },
  { name: "Google Stitch", category: "AI UI", color: "#4285F4" },
  { name: "n8n", category: "Automation", color: "#EA4B71" },
  { name: "Make", category: "Automation", color: "#6D28D9" },
  { name: "Cloudinary", category: "Media", color: "#3448C5" },
  { name: "JWT", category: "Authentication", color: "#D63AFF" },
  { name: "Responsive Design", category: "Frontend", color: "#0EA5E9" },
  { name: "Accessibility", category: "UI", color: "#22C55E" },
  { name: "Performance Optimization", category: "Optimization", color: "#F59E0B" },
];

const SKILL_TABS = [
  "Frontend",
  "Backend",
  "Database",
  "Cloud",
  "AI",
  "Design",
  "Tools",
  "Automation",
] as const;
type SkillTab = (typeof SKILL_TABS)[number];

const TAB_MAP: Record<SkillTab, string[]> = {
  Frontend: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion", "GSAP", "Responsive Design", "Accessibility"],
  Backend: ["Node.js", "Express", "Firebase", "Supabase", "REST API", "JWT"],
  Database: ["MongoDB", "PostgreSQL"],
  Cloud: ["Vercel", "Netlify", "Docker", "Cloudinary"],
  AI: ["OpenAI API", "Prompt Engineering", "Cursor AI", "Google Stitch"],
  Design: ["Figma", "Adobe XD"],
  Tools: ["Git", "GitHub", "Performance Optimization"],
  Automation: ["n8n", "Make"],
};

function Skills() {
  const [tab, setTab] = useState<SkillTab>("Frontend");
  const items = SKILLS.filter((s) => TAB_MAP[tab].includes(s.name));
  return (
    <Section id="skills" eyebrow="Technologies I design and build with" title="Stack">
      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-1.5">
        {SKILL_TABS.map((t) => {
          const active = tab === t;
          return (
            <motion.button
              key={t}
              whileTap={{ scale: 0.94 }}
              onClick={() => setTab(t)}
              className={`relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                active ? "text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="skill-tab"
                  className="nav-pill-active absolute inset-0 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{t}</span>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="grid auto-rows-fr gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {items.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex"
          >
            <Tilt className="group flex w-full" intensity={8}>
              <motion.div
                whileHover={{ y: -6 }}
                whileTap={{ y: -3, scale: 0.985 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="glass-card glow-hover relative flex w-full items-center gap-3 overflow-hidden p-4"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                  style={{ background: s.color }}
                />
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-tint-1)] shadow-[0_10px_24px_-8px_oklch(0.3_0.1_280/0.35)]"
                  style={s.name === "GitHub" || s.name === "Vercel" || s.name === "Next.js" ? { color: s.color } : undefined}
                >
                  {s.Logo ? <s.Logo /> : <Monogram letter={s.name[0]} color={s.color} />}
                </motion.div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{s.name}</div>
                  <div className="truncate text-[10px] uppercase tracking-wide text-muted-foreground">
                    {s.category}
                  </div>
                </div>
              </motion.div>
            </Tilt>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}


/* ================================ Projects ================================ */
type Project = {
  slug: string;
  title: string;
  kicker: string;
  body: string;
  tags: string[];
  features: string[];
  status: "Live" | "In Progress" | "Coming Soon";
  demo: string;
  repo: string;
  gradient: string;
  cover: string;
  screenshots: string[];
};



function Projects() {
  const projects: Project[] = PROJECTS;


  return (
    <Section
      id="projects"
      eyebrow="Creative experiments & real-world builds"
      title="Eesub Labs"
    >
      {/* Desktop grid */}
      <div className="hidden gap-7 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06} className="flex">
            <Tilt className="group flex w-full" intensity={8}>
              <motion.div
                whileHover={{ y: -12 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="glass-card glow-hover animated-border relative flex w-full flex-col overflow-hidden"
              >
                <ProjectCardBody p={p} />
              </motion.div>
            </Tilt>
          </Reveal>
        ))}
      </div>

      {/* Mobile swipeable deck */}
      <div className="sm:hidden">
        <MobileProjectsDeck projects={projects} />
      </div>
    </Section>
  );
}

function MobileProjectsDeck({ projects }: { projects: Project[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const total = projects.length;

  // Track which card is centered using IntersectionObserver — no scroll-handler reflows.
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-snap-card]"));
    const io = new IntersectionObserver(
      (entries) => {
        let best = { ratio: 0, idx: active };
        entries.forEach((e) => {
          const idx = Number((e.target as HTMLElement).dataset.idx);
          if (e.intersectionRatio > best.ratio) best = { ratio: e.intersectionRatio, idx };
        });
        if (best.ratio > 0) setActive(best.idx);
      },
      { root, threshold: [0.55, 0.75, 0.9] },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const scrollTo = (i: number) => {
    const root = scrollerRef.current;
    if (!root) return;
    const card = root.querySelector<HTMLElement>(`[data-idx="${i}"]`);
    if (!card) return;
    root.scrollTo({ left: card.offsetLeft - (root.clientWidth - card.clientWidth) / 2, behavior: "smooth" });
  };

  return (
    <div className="relative -mx-4 select-none">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[14%] pb-6 pt-2"
        style={{
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorX: "contain",
        }}
      >
        <style>{`.no-bar::-webkit-scrollbar{display:none}`}</style>
        {projects.map((p, i) => {
          const isActive = i === active;
          return (
            <div
              key={p.slug}
              data-snap-card
              data-idx={i}
              className="no-bar shrink-0 snap-center"
              style={{
                width: "78vw",
                maxWidth: 360,
                transform: `translate3d(0,0,0) scale(${isActive ? 1 : 0.94})`,
                opacity: isActive ? 1 : 0.75,
                transition: "transform 280ms cubic-bezier(0.22,1,0.36,1), opacity 280ms ease",
              }}
            >
              <div
                className="glass-card relative w-full overflow-hidden"
                style={{
                  boxShadow: isActive
                    ? "0 24px 50px -22px oklch(0.3 0.1 280 / 0.4)"
                    : "0 10px 24px -16px oklch(0.3 0.1 280 / 0.3)",
                }}
              >
                <ProjectCardBody p={p} compact />
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress + dots */}
      <div className="mt-2 flex items-center gap-3 px-4">
        <span className="text-[11px] font-medium tabular-nums text-foreground/70">
          {String(active + 1).padStart(2, "0")} <span className="text-foreground/40">/ {String(total).padStart(2, "0")}</span>
        </span>
        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-foreground/10">
          <span
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: "var(--gradient-button)",
              width: `${((active + 1) / total) * 100}%`,
              transition: "width 320ms cubic-bezier(0.22,1,0.36,1)",
            }}
          />
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {projects.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to project ${i + 1}`}
            onClick={() => scrollTo(i)}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === active ? 18 : 6,
              background: i === active ? "var(--accent-purple)" : "oklch(0.7 0.02 280 / 0.4)",
            }}
          />
        ))}
      </div>

      <p className="mt-3 px-4 text-center text-[10.5px] text-muted-foreground">
        Swipe to browse · Tap to open
      </p>
    </div>
  );
}







const TECH_META: Record<string, { slug: string; color: string; glow: string }> = {
  React: { slug: "react", color: "61DAFB", glow: "oklch(0.85 0.13 220 / 0.45)" },
  "Tailwind CSS": { slug: "tailwindcss", color: "06B6D4", glow: "oklch(0.78 0.15 200 / 0.45)" },
  "Framer Motion": { slug: "framer", color: "0055FF", glow: "oklch(0.6 0.22 265 / 0.45)" },
  JavaScript: { slug: "javascript", color: "F7DF1E", glow: "oklch(0.9 0.18 95 / 0.5)" },
  TypeScript: { slug: "typescript", color: "3178C6", glow: "oklch(0.6 0.18 250 / 0.45)" },
  "Node.js": { slug: "nodedotjs", color: "339933", glow: "oklch(0.72 0.18 150 / 0.45)" },
  "Express.js": { slug: "express", color: "555555", glow: "oklch(0.5 0.02 280 / 0.35)" },
  "Socket.IO": { slug: "socketdotio", color: "555555", glow: "oklch(0.5 0.02 280 / 0.35)" },
  OpenAI: { slug: "openai", color: "412991", glow: "oklch(0.5 0.2 290 / 0.45)" },
  n8n: { slug: "n8n", color: "EA4B71", glow: "oklch(0.75 0.2 15 / 0.45)" },
  "WhatsApp Web.js": { slug: "whatsapp", color: "25D366", glow: "oklch(0.78 0.2 150 / 0.5)" },
  Webhooks: { slug: "zapier", color: "FF4A00", glow: "oklch(0.75 0.2 40 / 0.45)" },
  "Travel APIs": { slug: "googlemaps", color: "4285F4", glow: "oklch(0.7 0.18 255 / 0.45)" },
  Vite: { slug: "vite", color: "646CFF", glow: "oklch(0.65 0.2 270 / 0.45)" },
};

function TechIcon({ name }: { name: string }) {
  const meta = TECH_META[name];
  if (!meta) return null;
  return (
    <img
      src={`https://cdn.simpleicons.org/${meta.slug}/${meta.color}`}
      alt=""
      width={12}
      height={12}
      loading="lazy"
      decoding="async"
      className="h-3 w-3 shrink-0"
    />
  );
}

function techGlow(name: string) {
  return TECH_META[name]?.glow ?? "oklch(0.7 0.1 295 / 0.35)";
}

function ProjectCardBody({ p, compact = false }: { p: Project; compact?: boolean }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: p.slug }}
      className="group/card relative flex h-full w-full flex-col"
      aria-label={`Open ${p.title} details`}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{ background: p.gradient }}
      >
        <img
          src={p.cover}
          alt={`${p.title} cover`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.04]"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, oklch(1 0 0 / 0.25) 0%, transparent 35%, transparent 70%, oklch(1 0 0 / 0.12) 100%)",
          }}
        />
        {p.status === "Live" ? (
          <span
            className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.74 0.2 150), oklch(0.66 0.22 158))",
              border: "1px solid oklch(0.88 0.18 150 / 0.7)",
              boxShadow:
                "0 0 18px oklch(0.78 0.22 150 / 0.55), inset 0 1px 0 oklch(1 0 0 / 0.45)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-white"
              style={{ boxShadow: "0 0 8px white" }}
            />
            Live
          </span>
        ) : (
          <span
            className="glass-pill absolute right-3 top-3 px-2.5 py-1 text-[10px] font-medium"
            style={{
              color:
                p.status === "In Progress"
                  ? "oklch(0.6 0.18 60)"
                  : "var(--accent-purple)",
            }}
          >
            {p.status}
          </span>
        )}
      </div>

      <div className={`relative z-10 flex flex-1 flex-col ${compact ? "p-5 sm:p-6" : "p-4 lg:p-5"}`}>
        {/* Title with soft glow underline */}
        <div className="relative inline-flex w-fit flex-col">
          <div className="flex items-center gap-2">
  <h3
    className={`font-display font-semibold leading-tight tracking-tight ${
      compact ? "text-[22px] sm:text-[26px]" : "text-[20px] lg:text-[22px]"
    }`}
  >
    {p.title}
  </h3>

  <CheckCircle2
    aria-label="Verified project"
    className="h-4 w-4 shrink-0 text-sky-500"
    style={{
      filter: "drop-shadow(0 2px 5px rgba(14, 165, 233, 0.35))",
    }}
  />
</div>
        <div className={`${compact ? "mt-2" : "mt-1.5"} text-[12px] font-medium uppercase tracking-wide text-muted-foreground`}>
          {p.kicker}
        </div>
        <p className={`${compact ? "mt-2.5" : "mt-1.5"} text-[13px] leading-relaxed text-muted-foreground`}>{p.body}</p>

        {!compact && (
          <ul className="mt-2.5 grid grid-cols-1 gap-1 text-[12px] text-muted-foreground sm:grid-cols-2">
            {p.features.slice(0, 4).map((f) => (
              <li key={f} className="flex items-start gap-1.5">
                <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0" style={{ color: "var(--accent-purple)" }} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech stack chips with official brand icons */}
        <div className={`${compact ? "mt-4" : "mt-3"} flex flex-wrap items-center gap-1.5`}>
          {p.tags.slice(0, compact ? 4 : p.tags.length).map((t) => (
            <span
              key={t}
              className="inline-flex h-7 items-center justify-center gap-1.5 rounded-full border border-[var(--glass-border)] px-2.5 text-[11px] font-medium leading-none text-foreground/85"
              style={{
                background: "oklch(1 0 0 / 0.55)",
                boxShadow: `0 4px 14px -8px ${techGlow(t)}, inset 0 1px 0 oklch(1 0 0 / 0.55)`,
              }}
            >
              <TechIcon name={t} />
              <span className="whitespace-nowrap">{t}</span>
            </span>
          ))}
        </div>

        {/* Circular arrow CTA (whole card is tappable) */}
        <div className={`mt-auto flex items-center justify-end ${compact ? "pt-5" : "pt-3"}`}>
          <motion.span
            initial={false}
            whileHover={{ x: 3, y: -3, scale: 1.06 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className={`inline-flex items-center justify-center rounded-full border border-[var(--glass-border)] text-foreground/80 backdrop-blur ${compact ? "h-11 w-11" : "h-10 w-10"}`}
            style={{
              background: "oklch(1 0 0 / 0.55)",
              boxShadow:
                "inset 0 1px 0 oklch(1 0 0 / 0.8), 0 12px 30px -14px oklch(0.5 0.18 295 / 0.55)",
            }}
            aria-hidden
          >
            <ArrowRight className="h-4.5 w-4.5 -rotate-45" />
          </motion.span>
        </div>
      </div>
    </div>
    </Link>
  );
}







/* ------------------------- Project mini previews ------------------------- */
function MiniFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-3 overflow-hidden rounded-xl border border-[var(--glass-border)] bg-[var(--glass-tint-1)] shadow-[0_8px_24px_-8px_oklch(0.4_0.1_280/0.25)] backdrop-blur-md">
      <div className="flex h-4 items-center gap-1 border-b border-[var(--glass-border)] bg-[var(--glass-tint-2)] px-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.15_25)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.85_0.15_85)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.15_150)]" />
      </div>
      <div className="relative h-[calc(100%-1rem)] p-2">{children}</div>
    </div>
  );
}

function PortfolioPreview() {
  return (
    <MiniFrame>
      <div className="flex items-center justify-between">
        <div className="h-1.5 w-8 rounded-full bg-[var(--accent-purple)]/70" />
        <div className="flex gap-1">
          <div className="h-1 w-3 rounded-full bg-foreground/30" />
          <div className="h-1 w-3 rounded-full bg-foreground/30" />
          <div className="h-1 w-3 rounded-full bg-foreground/30" />
        </div>
      </div>
      <div className="mt-2 h-3 w-3/4 rounded" style={{ background: "var(--gradient-name)" }} />
      <div className="mt-1 h-1.5 w-1/2 rounded-full bg-foreground/20" />
      <div className="mt-2 grid grid-cols-3 gap-1">
        <div className="h-6 rounded bg-[oklch(0.88_0.1_320/0.6)]" />
        <div className="h-6 rounded bg-[oklch(0.88_0.1_200/0.6)]" />
        <div className="h-6 rounded bg-[oklch(0.88_0.1_280/0.6)]" />
      </div>
    </MiniFrame>
  );
}

function WeatherPreview() {
  return (
    <MiniFrame>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[8px] font-medium text-foreground/60">Mumbai</div>
          <div className="font-display text-lg leading-none" style={{ color: "var(--accent-purple)" }}>28°</div>
        </div>
        <div
          className="h-5 w-5 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, oklch(0.95 0.15 85), oklch(0.78 0.18 50))",
            boxShadow: "0 0 8px oklch(0.85 0.18 65 / 0.6)",
          }}
        />
      </div>
      <svg viewBox="0 0 100 30" className="mt-1 h-8 w-full">
        <defs>
          <linearGradient id="wg" x1="0" x2="1">
            <stop offset="0" stopColor="oklch(0.7 0.18 295)" />
            <stop offset="1" stopColor="oklch(0.78 0.13 195)" />
          </linearGradient>
        </defs>
        <path d="M0 22 L15 18 L30 20 L45 10 L60 14 L75 6 L100 12" fill="none" stroke="url(#wg)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <div className="mt-1 flex justify-between">
        {["M", "T", "W", "T", "F"].map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <div className="h-1 w-1 rounded-full bg-foreground/40" />
            <div className="text-[6px] text-foreground/50">{d}</div>
          </div>
        ))}
      </div>
    </MiniFrame>
  );
}

function TaskPreview() {
  return (
    <MiniFrame>
      <div className="text-[8px] font-semibold text-foreground/70">Today</div>
      {[
        { c: "oklch(0.78 0.15 150)", w: "w-3/4", done: true },
        { c: "oklch(0.78 0.15 295)", w: "w-2/3", done: false },
        { c: "oklch(0.78 0.15 50)", w: "w-1/2", done: false },
      ].map((t, i) => (
        <div key={i} className="mt-1 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-sm border" style={{ background: t.done ? t.c : "transparent", borderColor: t.c }} />
          <div className={`h-1.5 rounded-full ${t.w}`} style={{ background: t.done ? "oklch(0.4 0.02 280 / 0.3)" : "oklch(0.4 0.02 280 / 0.55)" }} />
        </div>
      ))}
    </MiniFrame>
  );
}

function ComponentKitPreview() {
  return (
    <MiniFrame>
      <div className="grid grid-cols-2 gap-1.5">
        <div className="rounded px-1 py-1 text-center text-[6px] font-medium text-white" style={{ background: "var(--gradient-button)" }}>Button</div>
        <div className="rounded border border-foreground/30 px-1 py-1 text-center text-[6px] font-medium text-foreground/70">Outline</div>
        <div className="col-span-2 flex items-center gap-1 rounded border border-[var(--glass-border)] bg-[var(--glass-tint-1)] px-1.5 py-1">
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent-purple)]" />
          <div className="h-1 w-12 rounded-full bg-foreground/30" />
        </div>
        <div className="flex gap-1">
          <div className="h-3 w-3 rounded-full bg-[oklch(0.78_0.15_350)]" />
          <div className="h-3 w-3 rounded-full bg-[oklch(0.72_0.18_295)]" />
          <div className="h-3 w-3 rounded-full bg-[oklch(0.78_0.13_195)]" />
        </div>
        <div className="rounded text-center text-[6px] font-medium" style={{ background: "oklch(0.85 0.12 295 / 0.4)", color: "var(--accent-purple)", padding: "2px" }}>Badge</div>
      </div>
    </MiniFrame>
  );
}

/* ================================ Journey ================================= */
type Milestone = {
  icon: LucideIcon;
  year: string;
  title: string;
  company: string;
  duration: string;
  location: string;
  detail: string;
  achievements: string[];
  tags: string[];
  glow: string; // oklch L C H
};

type MilestoneEx = Milestone & { from: string; to: string };

const JOURNEY_MILESTONES: MilestoneEx[] = [
  {
    icon: Briefcase,
    year: "2023",
    title: "Production Internship",
    company: "Schneider Electric, Bangalore",
    duration: "3 Months · Internship",
    location: "Bangalore, India",
    detail: "Shadowed live production lines and helped refine quality workflows across shifts.",
    achievements: [
      "Improved a QA checklist workflow",
      "Coordinated across 3 shift teams",
      "Documented on-floor SOPs",
    ],
    tags: ["Production Ops", "Quality", "Teamwork"],
    glow: "0.82 0.14 60",
    from: "#fbbf24",
    to: "#f97316",
  },
  {
    icon: Code2,
    year: "2024",
    title: "Frontend Internship",
    company: "National Computers, Nandyal",
    duration: "3 Months · Internship",
    location: "Nandyal, India",
    detail: "Shipped responsive client sites and set up shared Git workflows for the team.",
    achievements: [
      "Shipped 4 responsive client sites",
      "Set up Git workflows for the team",
      "Refined component-level CSS",
    ],
    tags: ["Frontend", "Responsive", "Git"],
    glow: "0.78 0.16 200",
    from: "#22d3ee",
    to: "#3b82f6",
  },
  {
    icon: GraduationCap,
    year: "2024",
    title: "Started B.Tech CSE",
    company: "B.Tech CSE · Graduating 2027",
    duration: "Computer Science & Engineering",
    location: "Andhra Pradesh, India",
    detail: "Joined B.Tech CSE focused on software engineering and modern product development.",
    achievements: [
      "Software engineering core",
      "Side projects every semester",
      "Early product thinking",
    ],
    tags: ["CSE", "Engineering", "Product"],
    glow: "0.8 0.14 295",
    from: "#a855f7",
    to: "#6366f1",
  },
  {
    icon: Rocket,
    year: "2025",
    title: "AI Product Development",
    company: "Eesub Labs · Founder",
    duration: "Building real products end-to-end",
    location: "Remote · India",
    detail: "Founded Eesub Labs, doubled down on React and prompt engineering, shipped live products.",
    achievements: [
      "Founded Eesub Labs",
      "Shipped Tripzy & Lumo Chat",
      "React + prompts focus",
    ],
    tags: ["React", "Prompts", "Shipping"],
    glow: "0.78 0.18 320",
    from: "#fb923c",
    to: "#ef4444",
  },
  {
    icon: Sparkles,
    year: "Present",
    title: "Building the Future",
    company: "Open for internships & collaborations",
    duration: "AI & Frontend Products",
    location: "Available globally · Remote",
    detail: "Designing premium AI products under Eesub Labs while studying — open for internships.",
    achievements: [
      "Designing premium AI products",
      "Polishing frontend craft daily",
      "Open for internships now",
    ],
    tags: ["AI", "Frontend", "Open"],
    glow: "0.78 0.15 350",
    from: "#ec4899",
    to: "#a855f7",
  },
];

/* ---------- Premium Climbing Rope + Titanium Loop ---------- */

/** Continuous braided walnut rope. Absolute-positioned; spans full timeline height.
 *  Idle sway of 1–2px over ~10s. Rope stays BEHIND every pill (z-0) so it hides
 *  behind the card body — only the entering/exiting segments remain visible,
 *  giving the illusion the pill is threaded onto the rope through its loop. */
function ClimbingRope({ thickness = 8, left = 44 }: { thickness?: number; left?: number }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute top-0 bottom-0"
      style={{
        left,
        width: thickness,
        borderRadius: 999,
        background: [
          "repeating-linear-gradient(118deg, rgba(214,163,94,0) 0 3px, rgba(214,163,94,0.55) 3px 4px, rgba(214,163,94,0) 4px 8px)",
          "repeating-linear-gradient(62deg, #4a2a10 0 3px, #7a4a20 3px 5px, #a06a30 5px 6px, #7a4a20 6px 8px, #4a2a10 8px 11px)",
          "linear-gradient(90deg, #3a1f0c 0%, #6b3f1a 28%, #a06a30 50%, #6b3f1a 72%, #3a1f0c 100%)",
        ].join(", "),
        boxShadow: [
          "inset 0 0 0 1px rgba(0,0,0,0.35)",
          "inset 2px 0 3px rgba(255,225,180,0.35)",
          "inset -2px 0 4px rgba(0,0,0,0.45)",
          "0 1px 3px rgba(0,0,0,0.18)",
          "0 4px 12px rgba(80,45,15,0.18)",
        ].join(", "),
        transformOrigin: "50% 0%",
        willChange: "transform",
      }}
      animate={{ x: [0, 1.5, -1, 0], rotate: [0, 0.15, -0.1, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    >
      <span aria-hidden className="absolute -top-1 left-1/2 -translate-x-1/2 rounded-full"
        style={{ width: thickness + 2, height: thickness + 2, background: "radial-gradient(circle at 35% 30%, #b98551, #3a1f0c)", boxShadow: "0 1px 2px rgba(0,0,0,0.3)" }} />
      <span aria-hidden className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full"
        style={{ width: thickness + 2, height: thickness + 2, background: "radial-gradient(circle at 35% 30%, #b98551, #3a1f0c)", boxShadow: "0 1px 2px rgba(0,0,0,0.3)" }} />
    </motion.div>
  );
}

/** Premium brushed-titanium loop embedded into the LEFT edge of the pill.
 *  Rope passes vertically through its opening (rope is behind, loop overlays).
 *  Fixed — never stretches, never moves. */
function TitaniumLoop({ active = false }: { active?: boolean }) {
  return (
    <svg
      aria-hidden
      width="34"
      height="44"
      viewBox="0 0 34 44"
      style={{ overflow: "visible", filter: `drop-shadow(0 2px 3px rgba(20,25,32,0.28))${active ? " drop-shadow(0 0 6px rgba(180,200,230,0.5))" : ""}` }}
    >
      <defs>
        <linearGradient id="tloop-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6f8fa" />
          <stop offset="30%" stopColor="#d2d7dd" />
          <stop offset="60%" stopColor="#8f959d" />
          <stop offset="100%" stopColor="#4a5058" />
        </linearGradient>
        <linearGradient id="tloop-spec" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <pattern id="tloop-brush" width="1.2" height="3" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="3" stroke="rgba(255,255,255,0.18)" strokeWidth="0.3" />
          <line x1="0.6" y1="0" x2="0.6" y2="3" stroke="rgba(0,0,0,0.15)" strokeWidth="0.3" />
        </pattern>
        <radialGradient id="tloop-ambient" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(0,0,0,0.28)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      <ellipse cx="17" cy="41" rx="10" ry="1.8" fill="url(#tloop-ambient)" />

      {/* Outer titanium oval (loop body) — vertical so rope threads through */}
      <path
        d="M 17 3 C 24 3 28 8 28 14 L 28 30 C 28 36 24 41 17 41 C 10 41 6 36 6 30 L 6 14 C 6 8 10 3 17 3 Z"
        fill="url(#tloop-body)"
        stroke="#3a4048"
        strokeWidth="0.7"
      />
      <path
        d="M 17 3 C 24 3 28 8 28 14 L 28 30 C 28 36 24 41 17 41 C 10 41 6 36 6 30 L 6 14 C 6 8 10 3 17 3 Z"
        fill="url(#tloop-brush)"
        opacity="0.55"
      />

      {/* Inner opening (hollow — rope shows through here) */}
      <path
        d="M 17 8 C 21 8 23.5 11 23.5 15 L 23.5 29 C 23.5 33 21 36 17 36 C 13 36 10.5 33 10.5 29 L 10.5 15 C 10.5 11 13 8 17 8 Z"
        fill="rgba(58,32,12,0.75)"
      />
      <path
        d="M 17 8 C 21 8 23.5 11 23.5 15 L 23.5 29 C 23.5 33 21 36 17 36 C 13 36 10.5 33 10.5 29 L 10.5 15 C 10.5 11 13 8 17 8 Z"
        fill="none"
        stroke="rgba(0,0,0,0.6)"
        strokeWidth="0.9"
      />

      <path d="M 10 6 Q 17 3.5 24 6" stroke="url(#tloop-spec)" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M 7 14 Q 6.4 22 7 30" stroke="rgba(255,255,255,0.55)" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      <path d="M 10 38.5 Q 17 40.5 24 38.5" stroke="rgba(0,0,0,0.28)" strokeWidth="0.6" fill="none" strokeLinecap="round" />

      {active && (
        <motion.path
          d="M 12 10 Q 17 8 22 10"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </svg>
  );
}

/** Gradient icon wrapper — frosted glass circle with colored Lucide icon. */
function GradientIcon({ icon: Icon, from, to, active }: { icon: LucideIcon; from: string; to: string; active: boolean }) {
  return (
    <span
      className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.75))",
        backdropFilter: "blur(10px)",
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.95), 0 2px 5px rgba(0,0,0,0.07), 0 0 0 1px ${from}22${active ? `, 0 0 14px -2px ${from}66` : ""}`,
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          padding: 1.5,
          background: `linear-gradient(135deg, ${from}, ${to})`,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          opacity: 0.85,
        }}
      />
      <Icon className="h-[18px] w-[18px]" strokeWidth={2.1} style={{ color: from }} />
    </span>
  );
}

/** Glass pill — 74px desktop / 68px mobile. Sits above rope so rope hides behind. */
function HangingPill({
  mi, isActive, onClick,
}: {
  mi: MilestoneEx;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 320, damping: 22 } }}
      whileTap={{ scale: 0.99 }}
      animate={{ y: [0, -1, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      style={{
        paddingLeft: 20,
        paddingRight: 22,
        borderRadius: 999,
        background: "linear-gradient(135deg, rgba(255,255,255,0.97), rgba(255,255,255,0.9))",
        backdropFilter: "blur(20px) saturate(1.5)",
        WebkitBackdropFilter: "blur(20px) saturate(1.5)",
        border: "1px solid rgba(255,255,255,0.9)",
        boxShadow: isActive
          ? `0 8px 20px rgba(0,0,0,0.08), 0 18px 40px rgba(0,0,0,0.05), 0 0 0 1px ${mi.from}44, 0 0 22px -6px ${mi.from}55, inset 0 1px 0 rgba(255,255,255,0.95)`
          : `0 5px 12px rgba(0,0,0,0.06), 0 14px 32px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.95)`,
        willChange: "transform",
      }}
      className="group relative flex h-[68px] w-full items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.7_0.18_295)] lg:h-[74px]"
    >
      {isActive && (
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full" style={{
          padding: 1,
          background: `linear-gradient(135deg, ${mi.from}88, transparent 50%, ${mi.to}88)`,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }} />
      )}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.5), transparent)" }} />

      <GradientIcon icon={mi.icon} from={mi.from} to={mi.to} active={isActive} />

      <span className="relative ml-3.5 min-w-0 flex-1">
        <span className="block text-[12px] font-medium leading-tight text-black/55">{mi.year}</span>
        <span className="mt-0.5 block truncate text-[16.5px] font-semibold leading-tight text-black lg:text-[17.5px]">{mi.title}</span>
      </span>
    </motion.button>
  );
}

/** Compact detail card — expands beneath the active pill. */
function CompactDetail({ mi, isPresent }: { mi: MilestoneEx; isPresent: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985, filter: "blur(6px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.985, filter: "blur(4px)" }}
      transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.55 }}
      style={{
        borderRadius: 22,
        border: "1px solid rgba(255,255,255,0.85)",
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(22px) saturate(1.5)",
        WebkitBackdropFilter: "blur(22px) saturate(1.5)",
        boxShadow: `0 8px 18px rgba(0,0,0,0.06), 0 20px 48px rgba(0,0,0,0.05), 0 0 28px -10px ${mi.from}55, inset 0 1px 0 rgba(255,255,255,0.95)`,
      }}
      className="relative overflow-hidden p-4 sm:p-5"
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[22px]" style={{
        padding: 1.5,
        background: `linear-gradient(135deg, ${mi.from}55, transparent 55%, ${mi.to}55)`,
        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }} />

      <div className="relative flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-[15px] font-semibold leading-tight text-black truncate">{mi.company}</h3>
          <p className="mt-0.5 text-[11.5px] text-black/55">{mi.duration}</p>
        </div>
        <span
          className="inline-flex flex-shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]"
          style={isPresent
            ? { background: "#fff4e6", color: "#a64f00", border: "1px solid #f3b673" }
            : { background: "#e9faf0", color: "#117a3d", border: "1px solid #8ad7ad" }}
        >
          {isPresent ? "Now" : "Done"}
        </span>
      </div>

      <div className="relative mt-1.5 flex items-center gap-1.5 text-[11px] text-black/50">
        <MapPin className="h-3 w-3 flex-shrink-0" strokeWidth={2} />
        <span className="truncate">{mi.location}</span>
      </div>

      <ul className="relative mt-3 space-y-1.5">
        {mi.achievements.slice(0, 3).map((a) => (
          <li key={a} className="flex items-start gap-2 text-[12.5px] leading-snug text-black/75">
            <CheckCircle2 className="mt-[2px] h-3.5 w-3.5 flex-shrink-0" strokeWidth={2.2} style={{ color: mi.from }} />
            <span>{a}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-3 flex flex-wrap gap-1.5 border-t border-black/[0.06] pt-3">
        {mi.tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="inline-flex items-center rounded-full bg-white/95 px-2 py-0.5 text-[10.5px] font-semibold text-black/70"
            style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.95)" }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function Journey() {
  // Present at top → oldest at bottom
  const ordered = [...JOURNEY_MILESTONES].reverse();
  const [activeKey, setActiveKey] = useState<string | null>(ordered[0].year + ordered[0].title);

  return (
    <Section id="journey" eyebrow="Suspended from a braided climbing rope" title="My Journey">
      <div className="relative mx-auto max-w-3xl">
        {/* Ambient glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
          <motion.div className="absolute -top-10 left-[6%] h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.85 0.18 320 / 0.18), transparent 70%)" }} animate={{ y: [0, 14, 0], opacity: [0.2, 0.34, 0.2] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute top-[35%] right-[5%] h-96 w-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.85 0.16 200 / 0.16), transparent 70%)" }} animate={{ y: [0, -16, 0], opacity: [0.18, 0.3, 0.18] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
        </div>

        {/* Continuous rope — desktop 8px @ left 44, mobile 6px @ left 45 (rope center aligns with titanium loop opening) */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <ClimbingRope thickness={8} left={44} />
        </div>
        <div className="pointer-events-none absolute inset-0 lg:hidden">
          <ClimbingRope thickness={6} left={20} />
        </div>

        <ol className="relative flex flex-col gap-8 lg:gap-10">
          {ordered.map((mi, i) => {
            const key = mi.year + mi.title;
            const isActive = activeKey === key;
            const isPresent = mi.year === "Present";
            return (
              <motion.li
                key={key}
                initial={{ opacity: 0, x: -12, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 220, damping: 24, delay: i * 0.06 }}
                className="relative pl-[46px] lg:pl-[64px]"
              >
                {/* Pill wrapper — z-10 sits above rope (rope hides behind pill body).
                    Titanium loop is positioned relative to the pill so it stays vertically centered on it. */}
                <div className="relative z-10">
                  <HangingPill
                    mi={mi}
                    isActive={isActive}
                    onClick={() => setActiveKey((cur) => (cur === key ? null : key))}
                  />
                  {/* Titanium loop — embedded into pill's LEFT edge; rope threads through its opening.
                      Mobile loop offset aligns with rope at left=20 (loop center at x≈23).
                      Desktop loop offset aligns with rope at left=44 (loop center at x≈48).
                      z-20 overlays both rope and pill left edge. Never moves, never stretches. */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute z-20 lg:hidden"
                    style={{ left: -40, top: "50%", transform: "translateY(-50%)" }}
                  >
                    <TitaniumLoop active={isActive} />
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute z-20 hidden lg:block"
                    style={{ left: -31, top: "50%", transform: "translateY(-50%)" }}
                  >
                    <TitaniumLoop active={isActive} />
                  </div>
                </div>



                {/* Detail unfolds beneath the pill — pill/rope/anchor never move */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key={`d-${key}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ height: { type: "spring", stiffness: 280, damping: 30 }, opacity: { duration: 0.22 } }}
                      className="relative z-10 overflow-hidden"
                    >
                      <div className="mt-3 lg:mt-4">
                        <CompactDetail mi={mi} isPresent={isPresent} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}




/* ================================ Contact ================================= */
function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const validate = () => {
    const okName = name.trim().length >= 2;
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const okMsg = msg.trim().length >= 5;
    return okName && okEmail && okMsg;
  };

  const handleSend = async () => {
    if (!validate()) {
      toast.error("Please fill name, valid email, and a short message.");
      throw new Error("invalid");
    }
    const subject = `Portfolio message from ${name}`;
    const body = `From: ${name} <${email}>\nSent: ${new Date().toLocaleString()}\n\n${msg}`;
    // Formspree-compatible POST if endpoint is set, else mailto fallback.
    const endpoint = (import.meta as { env?: Record<string, string | undefined> }).env?.VITE_CONTACT_ENDPOINT;
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name, email, message: msg, sentAt: new Date().toISOString() }),
        });
        if (!res.ok) throw new Error("send failed");
      } else {
        // Direct mail client fallback — guaranteed delivery channel
        const href = `mailto:shaikeesub376@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = href;
      }
      toast.success("Message ready to send — thanks for reaching out!");
      setSent(true);
      setTimeout(() => {
        setName(""); setEmail(""); setMsg(""); setSent(false);
      }, 1600);
    } catch {
      toast.error("Could not send right now — please email me directly.");
      throw new Error("send failed");
    }
  };

  return (
    <Section id="contact" eyebrow="Open to frontend internships & creative collaborations" title="Connect">
      <div className="grid gap-5 md:grid-cols-2 md:items-stretch">
        <Reveal className="flex">
          <Tilt className="group flex flex-1" intensity={4}>
            <div className="glass-card glow-hover flex flex-1 flex-col p-6">
              <div className="text-base font-semibold">Let's Talk</div>
              <div
                className="mt-2 inline-flex w-max items-center gap-2 rounded-full px-3 py-1 text-[11px]"
                style={{ background: "oklch(0.85 0.12 160 / 0.3)", color: "oklch(0.45 0.12 160)" }}
              >
                <span className="live-dot" /> Open to Opportunities
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <ContactRow Icon={Mail} text="shaikeesub376@gmail.com" color="#EA4335" />
                <ContactRow Icon={Phone} text="+91 9505561854" color="#22C55E" />
                <ContactRow Icon={MapPin} text="Narasaraopet, Andhra Pradesh" color="#EF4444" />
                <ContactRow Icon={MessageCircle} text="Let's start a conversation" color="#3B82F6" />
              </div>

              <div className="mt-6 text-xs text-muted-foreground">Find me on</div>
              <div className="mt-2 flex gap-2">
                <SocialIcon Icon={Linkedin} color="#0A66C2" href="https://www.linkedin.com/in/skeesubvali20040/?skipRedirect=true" />
                <SocialIcon Icon={Github} color="#181717" href="https://github.com/SkEESUB" />
                <SocialIcon
                  Icon={Instagram}
                  gradient="linear-gradient(135deg,#F58529,#DD2A7B,#8134AF,#515BD4)"
                  color="#DD2A7B"
                  href="https://www.instagram.com/cubic_soul_?igsh=M3Y3ejhucXJ0Nm5n"
                />
                <SocialIcon Icon={Mail} color="#EA4335" href="mailto:shaikeesub376@gmail.com" />

              </div>

            </div>
          </Tilt>
        </Reveal>

        <Reveal delay={0.08} className="flex">
          <Tilt className="group flex flex-1" intensity={4}>
            <div className="glass-card glow-hover flex flex-1 flex-col p-6">
              <div className="text-base font-semibold">Send a Message</div>
              <form className="mt-5 flex flex-1 flex-col gap-4" onSubmit={(e) => { e.preventDefault(); handleSend().catch(() => {}); }}>
                <FloatField id="cf-name" label="Your Name" value={name} onChange={setName} />
                <FloatField id="cf-email" label="your@email.com" type="email" value={email} onChange={setEmail} />
                <FloatField id="cf-msg" label="Your message..." textarea value={msg} onChange={setMsg} />
                <SwipeToSend onSend={handleSend} sent={sent} />
              </form>
            </div>
          </Tilt>
        </Reveal>
      </div>
    </Section>
  );
}

function SwipeToSend({ onSend, sent }: { onSend: () => Promise<void>; sent: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [maxX, setMaxX] = useState(220);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      setMaxX(Math.max(80, el.clientWidth - 56));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const progress = useTransform(x, [0, maxX], [0, 1]);
  const fillW = useTransform(progress, (p) => `${Math.min(100, p * 100)}%`);
  const labelOpacity = useTransform(progress, [0, 0.6], [1, 0]);

  return (
    <div
      ref={trackRef}
      className="group/swipe relative h-[54px] w-full select-none overflow-hidden rounded-full border border-[var(--glass-border)] bg-[var(--glass-tint-2)] backdrop-blur transition-shadow duration-300 hover:shadow-[0_0_0_4px_oklch(0.7_0.18_295/0.18),0_14px_36px_-12px_oklch(0.5_0.18_295/0.4)]"
      style={{ boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.5), 0 10px 30px -10px oklch(0.2 0.04 280 / 0.25)" }}
    >
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ width: fillW, background: "#0a0a0a", opacity: 0.95 }}
      />
      <motion.span
        className="absolute inset-0 flex items-center justify-center text-[13px] font-medium text-foreground/80"
        style={{ opacity: labelOpacity }}
      >
        {sent ? "Sent ✓" : busy ? "Sending…" : "Swipe to Send"}
      </motion.span>
      <motion.button
        type="button"
        drag="x"
        dragConstraints={{ left: 0, right: maxX }}
        dragElastic={0}
        dragMomentum={false}
        style={{
          x,
          background: "#0a0a0a",
          border: "1px solid oklch(1 0 0 / 0.12)",
          touchAction: "none",
          boxShadow: "0 8px 22px -6px oklch(0 0 0 / 0.45), inset 0 1px 0 oklch(1 0 0 / 0.15)",
        }}
        whileHover={{ boxShadow: "0 0 0 4px oklch(0.7 0.18 295 / 0.22), 0 10px 26px -6px oklch(0.5 0.18 295 / 0.5), inset 0 1px 0 oklch(1 0 0 / 0.18)" }}
        whileTap={{ scale: 0.96 }}
        onDragEnd={async () => {
          if (x.get() > maxX * 0.85 && !busy) {
            setBusy(true);
            try { await onSend(); }
            catch { /* keep handle in place briefly */ }
            finally {
              setTimeout(() => {
                x.set(0);
                setBusy(false);
              }, 400);
            }
          } else {
            x.set(0);
          }
        }}
        aria-label="Swipe to send message"
        className="absolute left-1 top-1 flex h-[46px] w-[46px] items-center justify-center rounded-full text-white"
      >
        {sent ? <CheckCircle2 className="h-5 w-5" /> : <Send className="h-4 w-4" />}
      </motion.button>
    </div>
  );
}

function FloatField({
  id,
  label,
  type = "text",
  textarea = false,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
  value?: string;
  onChange?: (v: string) => void;
}) {
  const [internal, setInternal] = useState("");
  const controlled = value !== undefined;
  const val = controlled ? value : internal;
  const setVal = (v: string) => { if (controlled) onChange?.(v); else setInternal(v); };
  const [focus, setFocus] = useState(false);
  const active = focus || val.length > 0;
  const common =
    "peer w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-tint-1)] px-4 pt-5 pb-2 text-sm outline-none backdrop-blur transition-all duration-300 placeholder-transparent focus:border-[oklch(0.7_0.15_295)] focus:shadow-[0_0_0_4px_oklch(0.7_0.15_295/0.18)]";

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          rows={5}
          placeholder={label}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`${common} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={label}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={common}
        />
      )}
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          active
            ? "top-1.5 text-[10px] font-medium uppercase tracking-wide text-[oklch(0.55_0.18_295)]"
            : "top-3.5 text-sm text-muted-foreground"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

function ContactRow({ Icon, text, color = "var(--accent-purple)" }: { Icon: typeof Mail; text: string; color?: string }) {
  return (
    <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="flex items-center gap-3">
      <span className="glass-pill brand-glow flex h-9 w-9 items-center justify-center" style={{ ["--brand" as never]: color }}>
        <Icon className="h-4 w-4" style={{ color }} />
      </span>
      <span className="text-foreground/90">{text}</span>
    </motion.div>
  );
}


/* ================================ Resume ================================== */
function MiniResumePage({ scale = 1 }: { scale?: number }) {
  // Base size 168x240, scale multiplies via CSS transform-friendly width/height.
  const w = 168 * scale;
  const h = 240 * scale;
  const f = (n: number) => `${n * scale}px`;
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-lg border border-[var(--glass-border)] bg-white shadow-[0_28px_44px_-14px_oklch(0.3_0.1_280/0.55)]"
      style={{ width: w, height: h, padding: f(8) }}
    >
      {/* Header */}
      <div className="border-b border-foreground/10" style={{ paddingBottom: f(4) }}>
        <div className="font-bold leading-tight text-foreground/90" style={{ fontSize: f(9) }}>Shaik Eesub Vali</div>
        <div className="text-foreground/55" style={{ fontSize: f(6.5) }}>Frontend Developer · UI Designer</div>
        <div className="mt-0.5 flex gap-1 text-foreground/45" style={{ fontSize: f(5) }}>
          <span>shaikeesub376@gmail.com</span><span>·</span><span>Narasaraopet</span>
        </div>
      </div>

      {/* Experience */}
      <div style={{ marginTop: f(5) }}>
        <div className="font-bold uppercase tracking-wider text-[oklch(0.55_0.18_295)]" style={{ fontSize: f(6) }}>Experience</div>
        <div className="mt-0.5 flex items-center justify-between">
          <div className="font-semibold text-foreground/80" style={{ fontSize: f(6.5) }}>Eesub Labs · Founder</div>
          <div className="text-foreground/45" style={{ fontSize: f(5) }}>2024–</div>
        </div>
        <div className="leading-tight text-foreground/55" style={{ fontSize: f(5.5) }}>Designing & shipping AI-native products.</div>
        <div className="mt-1 flex items-center justify-between">
          <div className="font-semibold text-foreground/80" style={{ fontSize: f(6.5) }}>Frontend Intern</div>
          <div className="text-foreground/45" style={{ fontSize: f(5) }}>2024</div>
        </div>
        <div className="leading-tight text-foreground/55" style={{ fontSize: f(5.5) }}>React UIs · design systems · APIs.</div>
      </div>

      {/* Projects */}
      <div style={{ marginTop: f(5) }}>
        <div className="font-bold uppercase tracking-wider text-[oklch(0.55_0.18_295)]" style={{ fontSize: f(6) }}>Projects</div>
        <ul className="mt-0.5 space-y-[1px] text-foreground/70" style={{ fontSize: f(5.5) }}>
          <li>• Eesub Portfolio — Liquid glass site</li>
          <li>• Weather Lens — Forecast dashboard</li>
          <li>• Glass UI Kit — 40+ components</li>
        </ul>
      </div>

      {/* Skills */}
      <div style={{ marginTop: f(5) }}>
        <div className="font-bold uppercase tracking-wider text-[oklch(0.55_0.18_295)]" style={{ fontSize: f(6) }}>Skills</div>
        <div className="mt-0.5 flex flex-wrap gap-0.5">
          {["React","TS","Tailwind","Node","Figma","AI","Motion"].map((s) => (
            <span key={s} className="rounded px-1 py-[1px] font-medium" style={{ background: "oklch(0.85 0.1 295 / 0.35)", color: "oklch(0.4 0.12 295)", fontSize: f(5) }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Education */}
      <div style={{ marginTop: f(5) }}>
        <div className="font-bold uppercase tracking-wider text-[oklch(0.55_0.18_295)]" style={{ fontSize: f(6) }}>Education</div>
        <div className="font-semibold text-foreground/80" style={{ fontSize: f(6.5) }}>B.Tech, Computer Science</div>
        <div className="text-foreground/55" style={{ fontSize: f(5.5) }}>Graduating 2027</div>
      </div>

      {/* paper gloss */}
      <div className="pointer-events-none absolute inset-0 rounded-lg" style={{ background: "linear-gradient(135deg, oklch(1 0 0 / 0.55), transparent 38%)" }} />
      {/* PDF indicator */}
      <div className="absolute bottom-1 right-1 rounded-sm bg-[oklch(0.55_0.22_25)] px-1 py-[1px] font-bold text-white" style={{ fontSize: f(5) }}>PDF</div>
    </div>
  );
}

const RESUME_EMBED = `https://drive.google.com/file/d/${RESUME.driveId}/preview`;

/* ---------- Fullscreen PDF Modal (shared) ---------- */
function ResumeFullscreen({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="rfb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-md"
          />
          <motion.div
            key="rfm"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            className="fixed inset-x-3 top-[3%] z-[90] flex h-[94%] flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl sm:inset-x-8 sm:top-[4%] sm:h-[92%] sm:rounded-[28px]"
          >
            <div className="flex items-center justify-between border-b border-black/10 px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  {["#FF5F57","#FEBC2E","#28C840"].map((c) => (
                    <span key={c} className="block h-3 w-3 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <div className="ml-3 font-display text-[13px] sm:text-[14px] leading-tight text-black/80">Shaik Eesub Vali – Resume.pdf</div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={RESUME.download}
                  download={RESUME.filename}
                  className="glass-pill hidden h-9 items-center gap-2 px-3.5 text-xs font-semibold sm:inline-flex"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close preview"
                  className="glass-pill flex h-9 w-9 items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <iframe src={RESUME_EMBED} title="Resume fullscreen" className="flex-1 w-full border-0" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------- Info Sidebar (shared between desktop + mobile) ---------- */
const RESUME_META = {
  name: "Shaik Eesub Vali",
  role: "Frontend Developer · UI Designer",
  summary: "One-page resume focused on frontend craft, design fluency, and live projects shipped end-to-end.",
  format: "PDF · 1 page",
  graduation: "2027",
  location: "Narasaraopet, Andhra Pradesh",
};


function ResumeMetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-black/[0.06] py-2.5 last:border-b-0">
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-black/45">{label}</span>
      <span className="text-right text-[12.5px] font-medium text-black/80">{value}</span>
    </div>
  );
}

function ResumeSidebar({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div>
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-black/45">Resume</div>
        <h3 className="mt-2 font-display text-[1.6rem] leading-tight text-black">{RESUME_META.name}</h3>
        <div className="mt-1 text-[13px] text-black/60">{RESUME_META.role}</div>
        <p className="mt-4 text-[13px] leading-relaxed text-black/65">{RESUME_META.summary}</p>
      </div>

      <div className="mt-6">
        <ResumeMetaRow label="Last Updated" value={RESUME.lastUpdated} />
        <ResumeMetaRow label="Format" value={RESUME_META.format} />
        <ResumeMetaRow label="Graduation" value={RESUME_META.graduation} />
        <ResumeMetaRow label="Location" value={RESUME_META.location} />
      </div>

      <div className="mt-auto flex flex-col gap-2.5 pt-7">
        <motion.button
          type="button"
          onClick={onOpen}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-2xl px-5 text-[13.5px] font-semibold text-white"
          style={{
            background: "linear-gradient(135deg, oklch(0.32 0.02 280), oklch(0.18 0.02 280))",
            boxShadow: "0 14px 30px -12px oklch(0 0 0 / 0.4), inset 0 1px 0 oklch(1 0 0 / 0.18)",
          }}
        >
          <Eye className="h-4 w-4" /> Open Resume
        </motion.button>
        <motion.a
          href={RESUME.download}
          download={RESUME.filename}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white/60 px-5 text-[13px] font-semibold text-black/85 backdrop-blur transition-colors hover:bg-white/85"
          style={{ boxShadow: "0 6px 16px -10px oklch(0 0 0 / 0.25), inset 0 1px 0 oklch(1 0 0 / 0.85)" }}
        >
          <Download className="h-4 w-4" /> Download Resume
        </motion.a>
      </div>
    </div>
  );
}

/* ---------- Mobile Resume (no inline preview — Apple Files style) ---------- */
function MobileResume() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Reveal>
        <div
          className="relative overflow-hidden rounded-[28px] border border-[var(--glass-border)] bg-white/55 p-7 backdrop-blur-xl"
          style={{
            boxShadow:
              "0 40px 80px -30px oklch(0.3 0.12 290 / 0.4), 0 12px 30px -16px oklch(0.4 0.1 280 / 0.24), inset 0 1px 0 oklch(1 0 0 / 0.7)",
          }}
        >
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-black/45">Resume</div>
          <h3 className="mt-2 font-display text-[1.9rem] leading-tight text-black">{RESUME_META.name}</h3>
          <div className="mt-1 text-[13px] text-black/60">{RESUME_META.role}</div>
          <p className="mt-4 text-[13.5px] leading-relaxed text-black/65">
            {RESUME_META.summary}
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-black/[0.07] pt-4 text-[12px]">
            <span className="font-semibold uppercase tracking-[0.12em] text-black/45">Last Updated</span>
            <span className="font-medium text-black/80">{RESUME.lastUpdated}</span>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              whileTap={{ scale: 0.98 }}
              className="inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-2xl px-5 text-[14px] font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, oklch(0.32 0.02 280), oklch(0.18 0.02 280))",
                boxShadow: "0 14px 30px -12px oklch(0 0 0 / 0.4), inset 0 1px 0 oklch(1 0 0 / 0.18)",
              }}
            >
              <Eye className="h-4 w-4" /> Open Resume
            </motion.button>
            <motion.a
              href={RESUME.download}
              download={RESUME.filename}
              whileTap={{ scale: 0.98 }}
              className="inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white/70 px-5 text-[13px] font-semibold text-black/85 backdrop-blur"
              style={{ boxShadow: "0 6px 16px -10px oklch(0 0 0 / 0.25), inset 0 1px 0 oklch(1 0 0 / 0.85)" }}
            >
              <Download className="h-4 w-4" /> Download Resume
            </motion.a>
          </div>
        </div>

      </Reveal>
      <ResumeFullscreen open={open} onClose={() => setOpen(false)} />
    </>
  );
}


/* ---------- Desktop macOS Preview (unified 70/30 floating panel) ---------- */
/* ---------- Desktop Resume — compact version matching mobile style ---------- */
function DesktopResumePreview() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative hidden lg:block">
      <Reveal>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
          className="relative overflow-hidden rounded-[28px] border border-[var(--glass-border)]"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.99 0.008 280 / 0.74), oklch(0.94 0.025 295 / 0.56) 52%, oklch(0.94 0.025 200 / 0.5))",
            backdropFilter: "blur(24px) saturate(145%)",
            WebkitBackdropFilter: "blur(24px) saturate(145%)",
            boxShadow:
              "0 38px 84px -34px oklch(0.3 0.12 290 / 0.36), 0 16px 34px -20px oklch(0.4 0.08 280 / 0.2), inset 0 1px 0 oklch(1 0 0 / 0.82)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-28 h-64 w-64 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, oklch(0.82 0.18 320 / 0.18), transparent 70%)",
            }}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, oklch(0.82 0.16 200 / 0.17), transparent 70%)",
            }}
          />

          <div className="relative grid min-h-[260px] grid-cols-[1.3fr_0.9fr] gap-8 p-8 xl:p-9">
            {/* Left: same content style as mobile Resume */}
            <div className="flex min-w-0 flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.62 0.2 295 / 0.18), oklch(0.72 0.16 210 / 0.15))",
                      boxShadow:
                        "inset 0 1px 0 oklch(1 0 0 / 0.72), 0 8px 20px -12px oklch(0.4 0.15 295 / 0.35)",
                    }}
                  >
                    <FileText className="h-4 w-4 text-black/70" />
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/45">
                    Resume
                  </span>
                </div>

                <h3 className="mt-5 font-display text-[2.15rem] leading-[1.05] tracking-[-0.025em] text-black">
                  {RESUME_META.name}
                </h3>

                <p className="mt-2 text-[14px] font-medium text-black/60">
                  {RESUME_META.role}
                </p>

                <p className="mt-4 max-w-[560px] text-[13.5px] leading-[1.7] text-black/60">
                  {RESUME_META.summary}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white/50 px-3.5 py-2 text-[11px] font-medium text-black/60 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  One-page PDF
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white/50 px-3.5 py-2 text-[11px] font-medium text-black/60 backdrop-blur-md">
                  <GraduationCap className="h-3.5 w-3.5" />
                  B.Tech CSE · 2027
                </span>
              </div>
            </div>

            {/* Right: compact details and working actions */}
            <div className="flex min-w-0 flex-col justify-between rounded-[22px] border border-black/[0.06] bg-white/35 p-5 backdrop-blur-xl">
              <div>
                <div className="mb-2 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-black/40">
                  Resume Details
                </div>

                <ResumeMetaRow label="Last Updated" value={RESUME.lastUpdated} />
                <ResumeMetaRow label="Format" value={RESUME_META.format} />
                <ResumeMetaRow label="Graduation" value={RESUME_META.graduation} />
                <ResumeMetaRow label="Location" value={RESUME_META.location} />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <motion.button
                  type="button"
                  onClick={() => setOpen(true)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="inline-flex h-[44px] items-center justify-center gap-2 rounded-2xl px-4 text-[12px] font-semibold text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.32 0.02 280), oklch(0.17 0.02 280))",
                    boxShadow:
                      "0 14px 28px -14px oklch(0 0 0 / 0.42), inset 0 1px 0 oklch(1 0 0 / 0.18)",
                  }}
                >
                  <Eye className="h-3.5 w-3.5" />
                  Open
                </motion.button>

                <motion.a
                  href={RESUME.download}
                  download={RESUME.filename}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="inline-flex h-[44px] items-center justify-center gap-2 rounded-2xl border border-black/[0.08] bg-white/65 px-4 text-[12px] font-semibold text-black/75 backdrop-blur-xl transition-colors hover:bg-white/85"
                  style={{
                    boxShadow:
                      "0 8px 18px -12px oklch(0 0 0 / 0.22), inset 0 1px 0 oklch(1 0 0 / 0.85)",
                  }}
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </Reveal>

      <ResumeFullscreen open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

type CredentialIssuer = {
  name: string;
  count: number;
  logo?: string;
  accent: string;
  credentials: string[];
};

/* ---------------- Official-style inline SVG logos ---------------- */
const AnthropicLogo = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="#D97757">
    <path d="M13.827 3.52h3.129L22.87 20.48h-3.129l-1.243-3.42h-6.126l-1.243 3.42H8L13.827 3.52zm3.28 10.99L15.02 8.44l-2.087 6.07h4.174zM7.454 3.52l5.914 16.96h-3.19L4.263 3.52h3.19z" />
  </svg>
);
const GoogleAILogo = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.12A6.6 6.6 0 015.5 12c0-.74.13-1.46.34-2.12V7.04H2.18A10.99 10.99 0 001 12c0 1.77.42 3.45 1.18 4.96l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.65l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" fill="#EA4335"/>
  </svg>
);
const InfosysLogo = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
    <rect width="64" height="64" rx="12" fill="#007CC3"/>
    <text x="32" y="42" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="28" fill="#fff">i</text>
  </svg>
);
const DataValleyLogo = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
    <defs>
      <linearGradient id="dv-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#10B981"/>
        <stop offset="100%" stopColor="#059669"/>
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="14" fill="url(#dv-g)"/>
    <path d="M14 42 L26 22 L38 38 L50 18" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="50" cy="18" r="3.5" fill="#fff"/>
  </svg>
);

const CERTIFICATIONS: CertOrg[] = [
  {
    key: "anthropic",
    name: "Anthropic",
    short: "Anthropic",
    accent: "#D97757",
    Logo: AnthropicLogo,
    items: [
      { title: "Prompt Engineering", year: "2025", credentialId: "ANT-PE-2025-014", pdf: "/certificates/anthropic-1.pdf" },
      { title: "Claude Fundamentals", year: "2025", credentialId: "ANT-CF-2025-027", pdf: "/certificates/anthropic-2.pdf" },
      { title: "AI Safety", year: "2025", credentialId: "ANT-AS-2025-041", pdf: "/certificates/anthropic-3.pdf" },
      { title: "Building AI Assistants", year: "2025", credentialId: "ANT-AA-2025-063", pdf: "/certificates/anthropic-4.pdf" },
      { title: "Advanced Prompt Design", year: "2025", credentialId: "ANT-APD-2025-088", pdf: "/certificates/anthropic-5.pdf" },
    ],
  },
  {
    key: "google-ai",
    name: "Google AI",
    short: "Google AI",
    accent: "#4285F4",
    Logo: GoogleAILogo,
    items: [
      { title: "Generative AI Fundamentals", year: "2024", credentialId: "GCP-GAI-2024-1102", pdf: "/certificates/google-ai-1.pdf" },
      { title: "Introduction to Large Language Models", year: "2024", credentialId: "GCP-LLM-2024-2087", pdf: "/certificates/google-ai-2.pdf" },
      { title: "Responsible AI", year: "2024", credentialId: "GCP-RAI-2024-3141", pdf: "/certificates/google-ai-3.pdf" },
    ],
  },
  {
    key: "infosys",
    name: "Infosys",
    short: "Infosys Python",
    accent: "#007CC3",
    Logo: InfosysLogo,
    items: [
      { title: "Python Foundation", year: "2024", credentialId: "INF-PY-F-8821", pdf: "/certificates/infosys-1.pdf" },
      { title: "Advanced Python Programming", year: "2024", credentialId: "INF-PY-A-9034", pdf: "/certificates/infosys-2.pdf" },
    ],
  },
  {
    key: "datavalley",
    name: "DataValley",
    short: "DataValley Internship",
    accent: "#10B981",
    Logo: DataValleyLogo,
    items: [
      { title: "GenAI Internship Program", year: "2025", credentialId: "DV-GENAI-2025-INT-206", pdf: "/certificates/datavalley-1.pdf" },
    ],
  },
];


/* ---------------- Verified badge ---------------- */
function VerifiedBadge({ color = "#22C55E", size = 12 }: { color?: string; size?: number }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9.5px] font-semibold tracking-wide"
      style={{
        color,
        background: `${color}14`,
        border: `1px solid ${color}33`,
      }}
    >
      <CheckCircle2 style={{ width: size, height: size }} />
      Verified
    </span>
  );
}

/* ---------------- Real PDF certificate viewer ---------------- */
function CertificateArtwork({ org, item }: { org: CertOrg; item: CertItem }) {
  const [status, setStatus] = useState<"loading" | "ok" | "missing">("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetch(item.pdf, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        const type = res.headers.get("content-type") || "";
        setStatus(res.ok && !type.includes("text/html") ? "ok" : "missing");
      })
      .catch(() => {
        if (!cancelled) setStatus("missing");
      });
    return () => {
      cancelled = true;
    };
  }, [item.pdf]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-[18px]"
      style={{
        aspectRatio: "1 / 1.35",
        maxHeight: "62vh",
        background: "rgba(255,255,255,0.72)",
        border: "1px solid rgba(255,255,255,0.65)",
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.8), 0 24px 50px -30px rgba(0,0,0,0.4), 0 0 40px -24px ${org.accent}66`,
      }}
    >
      {status === "ok" ? (
        <object data={`${item.pdf}#toolbar=0&navpanes=0&view=FitH`} type="application/pdf" className="h-full w-full">
          <iframe
            src={`${item.pdf}#toolbar=0&navpanes=0&view=FitH`}
            title={`${org.name} — ${item.title}`}
            className="h-full w-full border-0"
          />
        </object>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
          <FileText className="h-7 w-7 text-black/35" />
          <div className="font-display text-[14px] font-semibold text-black/75">{item.title}</div>
          <div className="text-[11.5px] text-black/50">
            {status === "loading" ? "Loading certificate…" : "PDF not added yet"}
          </div>
          {status === "missing" && (
            <code className="mt-1 rounded-md bg-black/[0.06] px-2 py-1 font-mono text-[10.5px] text-black/55">
              public{item.pdf}
            </code>
          )}
        </div>
      )}
    </div>
  );
}


/* ---------------- Certificate Gallery ---------------- */
function CertGallery({
  open,
  org,
  onClose,
}: {
  open: boolean;
  org: CertOrg | null;
  onClose: () => void;
}) {
  const isMobile = useIsMobileMQ();
  const [index, setIndex] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (open) setIndex(0);
  }, [open, org?.key]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    };
  }, [open]);

  useEffect(() => {
    if (!open || !org) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % org.items.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + org.items.length) % org.items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, org, onClose]);

  if (!org) return null;
  const { Logo, accent } = org;
  const safeIndex = Math.min(index, org.items.length - 1);
  const active = org.items[safeIndex];

  const panelInitial = isMobile
    ? { opacity: 0, y: "100%" }
    : { opacity: 0, scale: 0.94, y: 12 };
  const panelAnimate = isMobile
    ? { opacity: 1, y: 0 }
    : { opacity: 1, scale: 1, y: 0 };
  const panelExit = isMobile
    ? { opacity: 0, y: "100%" }
    : { opacity: 0, scale: 0.96, y: 8 };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) setIndex((i) => (i + 1) % org.items.length);
      else setIndex((i) => (i - 1 + org.items.length) % org.items.length);
    }
    touchStartX.current = null;
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="cg-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/45"
            style={{ backdropFilter: "blur(22px) saturate(140%)" }}
          />
          <motion.div
            key="cg-panel"
            initial={panelInitial}
            animate={panelAnimate}
            exit={panelExit}
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
            className={
              isMobile
                ? "fixed inset-x-0 bottom-0 z-[90] flex max-h-[92vh] flex-col overflow-hidden rounded-t-[28px]"
                : "fixed left-1/2 top-1/2 z-[90] flex max-h-[90vh] w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[28px]"
            }
            style={{
              background: "rgba(250, 247, 240, 0.72)",
              backdropFilter: "blur(28px) saturate(160%)",
              border: "1px solid rgba(255,255,255,0.55)",
              boxShadow: `0 1px 0 rgba(255,255,255,0.7) inset, 0 40px 90px -30px rgba(0,0,0,0.45), 0 0 60px -20px ${accent}55`,
            }}
            role="dialog"
            aria-modal="true"
            aria-label={`${org.name} certificates`}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* mobile drag handle */}
            {isMobile && (
              <div className="flex justify-center pt-2.5">
                <span className="h-1 w-10 rounded-full bg-black/20" />
              </div>
            )}

            {/* Header */}
            <div className="flex items-center gap-3 px-5 pb-4 pt-4 sm:px-6 sm:pt-5">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${accent}26, ${accent}0d)`,
                  border: `1px solid ${accent}33`,
                  boxShadow: `0 0 24px -6px ${accent}55`,
                }}
              >
                <Logo size={24} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-display text-[16px] font-semibold text-black/85">{org.name}</div>
                  <VerifiedBadge color={accent} />
                </div>
                <div className="text-[11.5px] text-black/55">
                  {org.items.length} certificate{org.items.length > 1 ? "s" : ""} · Professional issuer
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close gallery"
                className="glass-pill flex h-9 w-9 items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

            {/* Body — direct viewer, no intermediate list */}
            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`preview-${safeIndex}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="min-w-0 truncate font-display text-[15px] font-semibold text-black/85">
                      {active.title}
                    </h4>
                    <span className="shrink-0 text-[11.5px] tabular-nums text-black/50">{active.year || "—"}</span>
                  </div>

                  <CertificateArtwork org={org} item={active} />

                  <div
                    className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-2xl px-4 py-3 text-[11.5px]"
                    style={{
                      background: "rgba(255,255,255,0.5)",
                      border: "1px solid rgba(255,255,255,0.6)",
                      boxShadow: "0 1px 0 rgba(255,255,255,0.7) inset, 0 10px 24px -18px rgba(0,0,0,0.22)",
                    }}
                  >
                    <div className="text-black/50">Issued by</div>
                    <div className="text-right font-medium text-black/85">{org.name}</div>
                    <div className="text-black/50">Completion</div>
                    <div className="text-right font-medium text-black/85">{active.year || "—"}</div>
                    {active.credentialId && (
                      <>
                        <div className="text-black/50">Credential ID</div>
                        <div className="truncate text-right font-mono text-[11px] text-black/80">
                          {active.credentialId}
                        </div>
                      </>
                    )}
                    <div className="text-black/50">Status</div>
                    <div className="flex justify-end"><VerifiedBadge color={accent} /></div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Prev / Position / Next — fixed footer */}
            <div
              className="flex items-center justify-between gap-3 border-t px-5 py-3.5 sm:px-6"
              style={{ borderColor: "rgba(0,0,0,0.08)", background: "linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0.55))" }}
            >
              <button
                type="button"
                onClick={() => setIndex((i) => (i - 1 + org.items.length) % org.items.length)}
                className="glass-pill inline-flex h-9 items-center gap-1.5 px-3.5 text-[12px] font-semibold"
                aria-label="Previous certificate"
                disabled={org.items.length < 2}
              >
                ← Previous
              </button>
              <div className="text-[11.5px] font-semibold tabular-nums text-black/60">
                {safeIndex + 1} / {org.items.length}
              </div>
              <button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % org.items.length)}
                className="glass-pill inline-flex h-9 items-center gap-1.5 px-3.5 text-[12px] font-semibold"
                aria-label="Next certificate"
                disabled={org.items.length < 2}
              >
                Next →
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/* ---------------- Small hook: reactive isMobile ---------------- */
function useIsMobileMQ() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return m;
}

function Certifications() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const active = CERTIFICATIONS.find((c) => c.key === activeKey) || null;

  return (
    <div className="mt-7 sm:mt-8">
      <div className="mb-3.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <h3 className="font-display text-[15px] font-semibold text-black/80 sm:text-base">
            Professional Certifications
          </h3>
          <span
            className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/55 px-2 py-0.5 text-[10px] font-semibold text-black/60 backdrop-blur-sm"
            style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.7) inset, 0 4px 10px -6px rgba(0,0,0,0.15)" }}
          >
            <CheckCircle2 className="h-3 w-3" style={{ color: "var(--accent-teal)" }} strokeWidth={2.4} />
            {CERTIFICATIONS.reduce((n, c) => n + c.items.length, 0)} Verified
          </span>
        </div>
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-black/45">
          Certified
        </span>
      </div>

      <div className="cert-rail relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[var(--background)] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[var(--background)] to-transparent" />
        <div className="cert-rail-track flex w-max gap-3 py-1.5">
          {[0, 1].map((dup) =>
            CERTIFICATIONS.map((org) => {
              const { Logo } = org;
              return (
                <button
                  key={`${dup}-${org.key}`}
                  type="button"
                  tabIndex={dup === 1 ? -1 : 0}
                  aria-hidden={dup === 1 || undefined}
                  onClick={() => setActiveKey(org.key)}
                  className="group flex h-[54px] w-[236px] shrink-0 items-center gap-2.5 rounded-full border border-white/60 px-3.5 text-left backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[3px] hover:scale-[1.02] active:scale-[0.99]"
                  style={{
                    background: "rgba(255,255,255,0.5)",
                    boxShadow: `0 1px 0 rgba(255,255,255,0.8) inset, 0 8px 24px -16px ${org.accent}66, 0 5px 16px -12px rgba(0,0,0,0.2)`,
                  }}
                  aria-label={`Open ${org.name} certificate gallery`}
                >
                  <span
                    className="relative flex h-[34px] w-[34px] shrink-0 items-center justify-center overflow-hidden rounded-full"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${org.accent}26, ${org.accent}0d)`,
                      border: `1px solid ${org.accent}3d`,
                    }}
                    aria-hidden
                  >
                    <Logo size={18} />
                  </span>
                  <span className="min-w-0 flex-1 truncate font-display text-[13.5px] font-semibold leading-tight text-black/85">
                    {org.short}
                  </span>
                  <span
                    className="inline-flex h-[24px] min-w-[32px] shrink-0 items-center justify-center rounded-full px-2 text-[11px] font-bold tabular-nums"
                    style={{
                      background: `${org.accent}1f`,
                      color: org.accent,
                      border: `1px solid ${org.accent}3d`,
                    }}
                  >
                    ×{org.items.length}
                  </span>
                </button>
              );
            }),
          )}
        </div>
      </div>



      <CertGallery
        open={!!active}
        org={active}
        onClose={() => setActiveKey(null)}
      />
    </div>
  );
}

function Resume() {
  return (
    <Section id="resume" eyebrow="One-page resume focused on frontend development and UI design" title="Resume">
      {/* Mobile: no inline preview — clean summary + fullscreen modal */}
      <div className="lg:hidden">
        <MobileResume />
      </div>

      <DesktopResumePreview />
    </Section>
  );
}

/* ================================ Footer ================================== */
function Footer() {
  const tagline = "Building the web, one pixel at a time.";
  const [typed, setTyped] = useState("");
  useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setTyped(tagline); return; }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(tagline.slice(0, i));
      if (i >= tagline.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative z-10 mt-16 overflow-hidden border-t border-[var(--glass-border)] bg-[var(--glass-tint-2)] backdrop-blur-xl">
      <div className="relative mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-3 sm:items-start">
          {/* Column 1 — Brand */}
          <div>
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="inline-block font-display text-2xl"
              style={{ background: "var(--gradient-name)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
            >
              Eesub Labs
            </motion.div>
            <div className="mt-2 min-h-[1.4em] text-xs text-muted-foreground">
              {typed}
              <span className="type-caret" />
            </div>
            <div className="mt-4 flex gap-2">
              <SocialIcon Icon={Linkedin} color="#0A66C2" href="https://www.linkedin.com/in/skeesubvali20040/?skipRedirect=true" />
              <SocialIcon Icon={Github} color="#181717" href="https://github.com/SkEESUB" />
              <SocialIcon
                Icon={Instagram}
                gradient="linear-gradient(135deg,#F58529,#DD2A7B,#8134AF,#515BD4)"
                color="#DD2A7B"
                href="https://www.instagram.com/cubic_soul_?igsh=M3Y3ejhucXJ0Nm5n"
              />
              <SocialIcon Icon={Mail} color="#EA4335" href="mailto:shaikeesub376@gmail.com" />
            </div>
          </div>

          {/* Column 2 — Navigate */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/70">Navigate</div>
            <ul className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2 text-xs text-muted-foreground">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="story-link transition-colors hover:text-foreground">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div className="text-xs text-muted-foreground sm:text-right">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/70">Contact</div>
            <ul className="mt-3 space-y-1.5">
              <li>
                <a href="mailto:shaikeesub376@gmail.com" className="transition-colors hover:text-foreground">
                  shaikeesub376@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+919381471651" className="transition-colors hover:text-foreground">
                  +91 93814 71651
                </a>
              </li>
              <li>Andhra Pradesh, India</li>
              <li className="inline-flex items-center gap-1.5 sm:justify-end">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: "oklch(0.75 0.18 150)" }} />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "oklch(0.7 0.2 150)" }} />
                </span>
                Open to internships
              </li>
            </ul>
          </div>

        </div>

        <div
          className="mt-10 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.78 0.18 295 / 0.5), oklch(0.78 0.13 195 / 0.5), transparent)",
          }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-5 flex flex-col items-center justify-between gap-2 text-[11px] text-muted-foreground sm:flex-row"
        >
          <div>© 2026 Shaik Eesub Vali · All rights reserved.</div>
          <div>Crafted with <span style={{ color: "var(--accent-purple)" }}>♥</span> · Graduating 2027</div>
        </motion.div>
      </div>
    </footer>
  );
}



/* ================================ Section ================================= */
function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative scroll-mt-32 pt-10 sm:pt-16 md:pt-20">
      <Reveal>
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-3">
            <span className="section-accent-dot" aria-hidden />
            <span className="section-deco-line" aria-hidden />
          </div>
          <h2 className="section-heading mt-4 font-display text-[2rem] font-semibold leading-[1.05] tracking-tight sm:text-[2.85rem]">
            <span className="section-heading-text">{title}</span>
            <span className="section-heading-underline" aria-hidden />
          </h2>
          <p className="mt-3 text-sm tracking-wide text-muted-foreground">{eyebrow}</p>
        </div>
      </Reveal>
      {children}
    </section>
  );
}


