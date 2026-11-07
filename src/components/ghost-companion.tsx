import React, { useEffect, useRef, useState, useCallback } from "react";
import { Mascot, type MascotState } from "wobnimo";
import { boo } from "wobnimo/characters/boo";
import { GHOST_EMOTION_EVENT, GHOST_POKE_EVENT, type GhostEmotionDetail } from "@/lib/ghost-events";

/**
 * Checks if WebGL2 is available in the current browser environment.
 */
function isWebGL2Supported(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGL2RenderingContext && canvas.getContext("webgl2"));
  } catch {
    return false;
  }
}

/**
 * Fallback SVG character if WebGL2 fails or is unsupported.
 */
function GhostFallback({ emotion }: { emotion: MascotState }) {
  return (
    <div className="relative flex items-center justify-center w-full h-full animate-pulse select-none">
      <svg
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_4px_16px_rgba(138,108,240,0.5)]"
      >
        <path
          d="M20 50 C20 25, 80 25, 80 50 C80 85, 75 105, 68 98 C60 90, 55 105, 50 98 C45 90, 40 105, 32 98 C25 90, 20 85, 20 50 Z"
          fill="url(#ghostGrad)"
        />
        {/* Eyes */}
        <circle cx="40" cy="48" r="4.5" fill="#1b1430" />
        <circle cx="60" cy="48" r="4.5" fill="#1b1430" />
        {/* Cheeks */}
        <ellipse cx="32" cy="56" rx="5" ry="3.5" fill="#ffa3c4" opacity="0.75" />
        <ellipse cx="68" cy="56" rx="5" ry="3.5" fill="#ffa3c4" opacity="0.75" />
        {/* Mouth */}
        {emotion === "celebrating" ? (
          <path
            d="M44 57 Q50 65 56 57"
            stroke="#2a1a4a"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        ) : emotion === "surprised" ? (
          <ellipse cx="50" cy="59" rx="3" ry="4" fill="#2a1a4a" />
        ) : emotion === "error" ? (
          <path
            d="M45 61 Q50 56 55 61"
            stroke="#2a1a4a"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <path
            d="M46 58 Q50 62 54 58"
            stroke="#2a1a4a"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        )}
        <defs>
          <linearGradient
            id="ghostGrad"
            x1="20"
            y1="25"
            x2="80"
            y2="105"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fcfaff" />
            <stop offset="0.6" stopColor="#f1ecff" />
            <stop offset="1" stopColor="#d9cdff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

const GHOST_SPEECHES = [
  "Boo! ✨",
  "Hehe, hi there! 👋",
  "Floating around! 👻",
  "Happy you're here! 💜",
  "Exploring the code! ⚡",
];

export function GhostCompanion() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL2, setHasWebGL2] = useState(true);
  const [currentEmotion, setCurrentEmotion] = useState<MascotState>("idle");
  const [speechText, setSpeechText] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mascotRef = useRef<Mascot | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Position, motion & physics tracking refs (avoids re-rendering React on every frame)
  const motionRef = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    tilt: 0,
    targetTilt: 0,
    scrollTilt: 0,
    targetScrollTilt: 0,
    lastScrollY: 0,
    isScrolling: false,
    hasMovedCursor: false,
    isPointerMoving: false,
    isTouchActive: false,
    isDirectDragging: false,
    pointerDownTime: 0,
    pointerStartX: 0,
    pointerStartY: 0,
    dragPointerId: null as number | null,
    lastPokeTime: 0,
    pointerX: 0,
    pointerY: 0,
    lastPointerMoveTime: 0,
    rafId: 0,
    time: 0,
    isTouchDevice: false,
    initialized: false,
  });

  // Tap counter for playful multi-tap reaction
  const tapStatsRef = useRef({
    count: 0,
    lastTapTime: 0,
    resetTimeout: null as ReturnType<typeof setTimeout> | null,
  });

  // Emotional timer lock (prevents flickering emotions during active actions)
  const emotionLockRef = useRef<{
    isLocked: boolean;
    timeout: ReturnType<typeof setTimeout> | null;
  }>({
    isLocked: false,
    timeout: null,
  });

  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerIdleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Safe emotion transition helper
  const applyEmotion = useCallback((emotion: MascotState, durationMs?: number, force = false) => {
    if (emotionLockRef.current.isLocked && !force) return;

    if (emotionLockRef.current.timeout) {
      clearTimeout(emotionLockRef.current.timeout);
      emotionLockRef.current.timeout = null;
    }

    try {
      mascotRef.current?.setState(emotion);
      setCurrentEmotion(emotion);
    } catch {
      // Ignore transition error
    }

    if (durationMs && durationMs > 0) {
      if (force) {
        emotionLockRef.current.isLocked = true;
      }
      emotionLockRef.current.timeout = setTimeout(() => {
        emotionLockRef.current.isLocked = false;
        try {
          mascotRef.current?.setState("idle");
          setCurrentEmotion("idle");
          setSpeechText(null);
        } catch {
          // Ignore
        }
      }, durationMs);
    }
  }, []);

  // Safe poke handler (hop + 360 spin + hearts + sound/speech)
  const handlePoke = useCallback(() => {
    const now = Date.now();
    if (now - motionRef.current.lastPokeTime < 280) return;
    motionRef.current.lastPokeTime = now;
    const tap = tapStatsRef.current;

    // Detect rapid multi-taps
    if (now - tap.lastTapTime < 900) {
      tap.count++;
    } else {
      tap.count = 1;
    }
    tap.lastTapTime = now;

    if (tap.resetTimeout) clearTimeout(tap.resetTimeout);
    tap.resetTimeout = setTimeout(() => {
      tap.count = 0;
    }, 1400);

    if (tap.count >= 3) {
      // Rapid multi-tap -> Celebration reaction!
      applyEmotion("celebrating", 3500, true);
      setSpeechText("Wheee! Secret tickle unlocked! 🎉✨");
      mascotRef.current?.poke();
      return;
    }

    // Single tap -> Playful poke reaction (triggers hop, 360 spin & heart particles)
    try {
      mascotRef.current?.poke();
      applyEmotion("celebrating", 1800);
      const randomSpeech = GHOST_SPEECHES[Math.floor(Math.random() * GHOST_SPEECHES.length)];
      setSpeechText(randomSpeech);
    } catch {
      applyEmotion("celebrating", 1800);
    }
  }, [applyEmotion]);

  // Handle client mount and responsive detection
  useEffect(() => {
    setMounted(true);
    const webglSupported = isWebGL2Supported();
    setHasWebGL2(webglSupported);

    const checkMobile = () => {
      const small = window.innerWidth < 768;
      const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsMobile(small);
      motionRef.current.isTouchDevice = touch && small;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    window.addEventListener("orientationchange", checkMobile, { passive: true });

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("orientationchange", checkMobile);
    };
  }, []);

  // Initialize Wobnimo mascot with High-Definition Rendering Engine
  useEffect(() => {
    if (!mounted || !hasWebGL2 || !canvasRef.current) return;

    const canvas = canvasRef.current;

    try {
      // Setup 2D target context rendering properties for highest fidelity
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }

      // Configure virtual client dimensions getter to guarantee supersampled resolution
      // on both standard 1080p displays (devicePixelRatio === 1) and high-DPI Retina/mobile screens
      Object.defineProperty(canvas, "clientWidth", {
        get: () => {
          const raw = canvas.parentElement?.clientWidth || 140;
          const dpr = window.devicePixelRatio || 1;
          // Ensure base resolution of at least 260px on desktop and 180px on mobile
          const supersample = dpr < 1.5 ? 2.0 : 1.25;
          return Math.round(raw * supersample);
        },
        configurable: true,
      });

      Object.defineProperty(canvas, "clientHeight", {
        get: () => {
          const raw = canvas.parentElement?.clientHeight || 140;
          const dpr = window.devicePixelRatio || 1;
          const supersample = dpr < 1.5 ? 2.0 : 1.25;
          return Math.round(raw * supersample);
        },
        configurable: true,
      });

      // Pristine white pastel ghost with subtle lavender undertones
      const ghostPalette = {
        ghost: "#fbfaff",
      };

      const mascot = new Mascot(canvas, boo, {
        state: "idle",
        interactive: false, // We control interactions, head gaze and cursor physics custom for full-page precision
        effects: true,
        floor: 0.72,
        shadow: [0.12, 0.08, 0.24],
        exposure: 1.08,
        framing: 1.05,
        maxPixelRatio: Math.max(window.devicePixelRatio || 1, 2.5),
        respectReducedMotion: true,
        palette: ghostPalette,
      });

      // CRITICAL FIX FOR PIXELATION / BLURRINESS:
      // Wobnimo has an internal adaptive quality downsampler (Re.adapt) that drops resolution to 0.55
      // whenever any frame takes >22ms during page scroll or layout.
      // We wrap mascot.tick to lock quality at 1.0, preserving razor-sharp raymarched SDF fidelity!
      const origTick = mascot.tick.bind(mascot);
      mascot.tick = (dt: number, time: number) => {
        return origTick(dt, time, 1.0);
      };

      mascotRef.current = mascot;
    } catch (err) {
      console.warn("Wobnimo initialization failed, activating graceful fallback", err);
      setHasWebGL2(false);
    }

    return () => {
      mascotRef.current?.dispose();
      mascotRef.current = null;
    };
  }, [mounted, hasWebGL2, handlePoke]);

  // Listen to external portfolio events (e.g. form submission, element hovers)
  useEffect(() => {
    if (!mounted) return;

    const onEmotionEvent = (e: Event) => {
      const customEvent = e as CustomEvent<GhostEmotionDetail>;
      if (!customEvent.detail) return;
      const { emotion, durationMs, priority } = customEvent.detail;
      const isHigh = priority === "high";

      if (emotion === "celebrating") {
        setSpeechText("Yay! Message sent successfully! 💌✨");
      }
      applyEmotion(emotion, durationMs ?? 2000, isHigh);
    };

    const onPokeEvent = () => {
      handlePoke();
    };

    window.addEventListener(GHOST_EMOTION_EVENT, onEmotionEvent);
    window.addEventListener(GHOST_POKE_EVENT, onPokeEvent);

    return () => {
      window.removeEventListener(GHOST_EMOTION_EVENT, onEmotionEvent);
      window.removeEventListener(GHOST_POKE_EVENT, onPokeEvent);
    };
  }, [mounted, applyEmotion, handlePoke]);

  // Global Pointer (Mouse) & Passive Mobile Touch Tracking
  useEffect(() => {
    if (!mounted) return;

    const m = motionRef.current;

    // Desktop mouse move
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;

      m.hasMovedCursor = true;
      m.isPointerMoving = true;
      m.pointerX = e.clientX;
      m.pointerY = e.clientY;
      m.lastPointerMoveTime = performance.now();

      if (pointerIdleTimeoutRef.current) clearTimeout(pointerIdleTimeoutRef.current);
      pointerIdleTimeoutRef.current = setTimeout(() => {
        m.isPointerMoving = false;
      }, 140);
    };

    const onPointerLeave = () => {
      m.isPointerMoving = false;
      if (!emotionLockRef.current.isLocked && currentEmotion === "listening") {
        applyEmotion("idle", 0);
      }
      if (
        mascotRef.current &&
        (mascotRef.current as unknown as { brain?: { pointer?: unknown } }).brain
      ) {
        (mascotRef.current as unknown as { brain: { pointer: unknown } }).brain.pointer = null;
      }
    };

    // Mobile passive touch tracking (PASSIVE: NEVER delays or blocks vertical scrolling!)
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      m.pointerX = touch.clientX;
      m.pointerY = touch.clientY;
      m.isTouchActive = true;
      m.isPointerMoving = true;
      m.lastPointerMoveTime = performance.now();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      m.pointerX = touch.clientX;
      m.pointerY = touch.clientY;
      m.isTouchActive = true;
      m.isPointerMoving = true;
      m.lastPointerMoveTime = performance.now();

      if (pointerIdleTimeoutRef.current) clearTimeout(pointerIdleTimeoutRef.current);
      pointerIdleTimeoutRef.current = setTimeout(() => {
        m.isPointerMoving = false;
      }, 160);
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        m.isTouchActive = false;
        m.isPointerMoving = false;
        if (!emotionLockRef.current.isLocked && currentEmotion === "listening") {
          applyEmotion("idle", 0);
        }
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave, { passive: true });

    // Passive listeners on window guarantee 100% normal page scrolling
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      if (pointerIdleTimeoutRef.current) clearTimeout(pointerIdleTimeoutRef.current);
    };
  }, [mounted, applyEmotion, currentEmotion]);

  // Scroll Tracking & Section-aware response
  useEffect(() => {
    if (!mounted) return;

    const m = motionRef.current;
    m.lastScrollY = window.scrollY || window.pageYOffset || 0;

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const delta = scrollY - m.lastScrollY;
      m.lastScrollY = scrollY;
      const absDelta = Math.abs(delta);

      if (absDelta > 1) {
        m.isScrolling = true;

        // Dynamic scroll tilt:
        // Scrolling down: forward buoyant dive (+tilt)
        // Scrolling up: backward buoyant rise (-tilt)
        const scrollDir = delta > 0 ? 1 : -1;
        m.targetScrollTilt = Math.min(absDelta * 0.22, 9) * scrollDir;

        // Active travel state: set emotion to thinking/active if currently idle
        if (!emotionLockRef.current.isLocked && currentEmotion === "idle") {
          applyEmotion("thinking", 0);
        }

        // Debounce scroll stop
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          m.isScrolling = false;
          m.targetScrollTilt = 0;
          if (!emotionLockRef.current.isLocked && currentEmotion === "thinking") {
            applyEmotion("idle", 0);
          }
        }, 160);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [mounted, applyEmotion, currentEmotion]);

  // Main Animation & Physics Loop (Single continuous rAF)
  useEffect(() => {
    if (!mounted) return;

    const m = motionRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Set initial position
    const isSmall = window.innerWidth < 768;
    const ghostWidth = isSmall ? 84 : 136;
    const ghostHeight = isSmall ? 84 : 136;

    if (!m.initialized) {
      m.currentX = window.innerWidth - ghostWidth - (isSmall ? 12 : 36);
      m.currentY = isSmall ? 90 : 120;
      m.targetX = m.currentX;
      m.targetY = m.currentY;
      m.pointerX = m.currentX;
      m.pointerY = m.currentY;
      m.initialized = true;
    }

    let active = true;

    const tick = (now: number) => {
      if (!active) return;
      m.time = now * 0.001;

      const winWidth = window.innerWidth || 1200;
      const winHeight = window.innerHeight || 800;
      const isMobileDevice = winWidth < 768;
      const gWidth = isMobileDevice ? 84 : 136;
      const gHeight = isMobileDevice ? 84 : 136;

      // Safe viewport boundary limits
      const minX = isMobileDevice ? 10 : 16;
      const maxX = winWidth - gWidth - (isMobileDevice ? 10 : 16);
      const minY = 68; // Clear top navigation bar
      const maxY = winHeight - gHeight - 18;

      // Immediate boundary enforcement on window resize or orientation rotation
      if (m.currentX > maxX) m.currentX = maxX;
      if (m.currentX < minX) m.currentX = minX;
      if (m.currentY > maxY) m.currentY = maxY;
      if (m.currentY < minY) m.currentY = minY;

      // Determine Target Position
      if (m.isDirectDragging) {
        // DIRECT TOUCH DRAGGING: Follow finger directly with slight lift so finger does not cover Ghost
        const desiredX = m.pointerX - gWidth * 0.5;
        const desiredY = m.pointerY - gHeight * 0.72;
        m.targetX = Math.max(minX, Math.min(maxX, desiredX));
        m.targetY = Math.max(minY, Math.min(maxY, desiredY));

        if (mascotRef.current) {
          const brain = (
            mascotRef.current as unknown as {
              brain?: { pointer?: { x: number; y: number } | null };
            }
          ).brain;
          if (brain) {
            brain.pointer = { x: 0, y: 0.6 }; // Looks downward toward user's touch
          }
        }
      } else if (isMobileDevice && m.isTouchActive) {
        // MOBILE FINGER-FOLLOWING MODE (Active finger touch anywhere on screen):
        // Maintain comfortable distance from finger:
        // If finger is on right half, float to the left of the finger;
        // If finger is on left half, float to the right of the finger.
        // Hover slightly elevated so finger and palm don't obscure Ghost.
        const isRightHalf = m.pointerX > winWidth * 0.5;
        const desiredX = isRightHalf ? m.pointerX - gWidth - 18 : m.pointerX + 22;
        const desiredY = m.pointerY - gHeight * 0.65;

        m.targetX = Math.max(minX, Math.min(maxX, desiredX));
        m.targetY = Math.max(minY, Math.min(maxY, desiredY));

        // Update Wobnimo 3D Head & Eye Gaze toward finger
        if (mascotRef.current) {
          const brain = (
            mascotRef.current as unknown as {
              brain?: { pointer?: { x: number; y: number } | null };
            }
          ).brain;
          if (brain) {
            const ghostCenterX = m.currentX + gWidth / 2;
            const ghostCenterY = m.currentY + gHeight * 0.45;
            const relX = (m.pointerX - ghostCenterX) / (gWidth * 1.25);
            const relY = (m.pointerY - ghostCenterY) / (gHeight * 1.25);
            const dist = Math.hypot(relX, relY);

            brain.pointer = {
              x: Math.max(-1, Math.min(1, relX)),
              y: Math.max(-1, Math.min(1, relY)),
            };

            // Curious gaze when finger approaches close
            if (dist < 1.3 && currentEmotion === "idle" && !emotionLockRef.current.isLocked) {
              applyEmotion("listening", 1200);
            }
          }
        }
      } else if (isMobileDevice || !m.hasMovedCursor) {
        // MOBILE RESTING / DOCKED MODE (When finger is released or idle):
        // Position gracefully along viewport height based on scroll progress
        const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 1;
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const maxScroll = Math.max(1, docHeight - winHeight);
        const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

        const dockedX = winWidth - gWidth - (isMobileDevice ? 10 : 28);
        const dockedY = minY + scrollProgress * (maxY - minY);

        m.targetX = dockedX;
        m.targetY = dockedY;

        // Reset gaze when idle
        if (mascotRef.current) {
          const brain = (
            mascotRef.current as unknown as {
              brain?: { pointer?: unknown };
            }
          ).brain;
          if (brain && brain.pointer) {
            brain.pointer = null;
          }
        }
      } else {
        // DESKTOP CURSOR-FOLLOWING MODE (Completely preserved):
        // Maintain comfortable distance from cursor:
        // If cursor is on right half of screen, ghost floats on left side of cursor;
        // if cursor is on left half of screen, ghost floats on right side of cursor.
        const isRightHalf = m.pointerX > winWidth * 0.52;
        const desiredX = isRightHalf ? m.pointerX - gWidth - 28 : m.pointerX + 32;
        const desiredY = m.pointerY - gHeight * 0.45;

        m.targetX = Math.max(minX, Math.min(maxX, desiredX));
        m.targetY = Math.max(minY, Math.min(maxY, desiredY));

        // Update Wobnimo 3D Head & Eye Gaze Tracking
        if (mascotRef.current) {
          const brain = (
            mascotRef.current as unknown as {
              brain?: { pointer?: { x: number; y: number } | null };
            }
          ).brain;
          if (brain) {
            const ghostCenterX = m.currentX + gWidth / 2;
            const ghostCenterY = m.currentY + gHeight * 0.45;
            const relX = (m.pointerX - ghostCenterX) / (gWidth * 1.25);
            const relY = (m.pointerY - ghostCenterY) / (gHeight * 1.25);
            const dist = Math.hypot(relX, relY);

            // Directly drive head yaw, pitch and eye glance
            brain.pointer = {
              x: Math.max(-1, Math.min(1, relX)),
              y: Math.max(-1, Math.min(1, relY)),
            };

            // Curiosity glance when cursor approaches close
            if (dist < 1.15 && currentEmotion === "idle" && !emotionLockRef.current.isLocked) {
              applyEmotion("listening", 1200);
            }
          }
        }
      }

      // Smooth Physics Interpolation (Spring / Lerp)
      const dx = m.targetX - m.currentX;
      const dy = m.targetY - m.currentY;
      const posLerp = reducedMotion
        ? 0.28
        : m.isDirectDragging
          ? 0.16
          : isMobileDevice
            ? 0.088
            : 0.075;

      m.currentX += dx * posLerp;
      m.currentY += dy * posLerp;

      // Dynamic Movement Tilt
      const vx = dx * posLerp;
      const targetTilt =
        m.isPointerMoving && !reducedMotion ? Math.max(-10, Math.min(10, vx * 0.75)) : 0;
      m.tilt += (targetTilt - m.tilt) * 0.12;

      // Dynamic Scroll Tilt
      m.scrollTilt += (m.targetScrollTilt - m.scrollTilt) * 0.15;

      // Floating wave animation when stationary
      let waveX = 0;
      let waveY = 0;
      if (!m.isPointerMoving && !m.isScrolling && !reducedMotion) {
        waveY = Math.sin(m.time * 2.3) * 5.2;
        waveX = Math.cos(m.time * 1.4) * 2.4;
      }

      // Render transform
      if (containerRef.current) {
        const totalX = (m.currentX + waveX).toFixed(2);
        const totalY = (m.currentY + waveY).toFixed(2);
        const totalRot = reducedMotion ? "" : ` rotate(${(m.tilt + m.scrollTilt).toFixed(2)}deg)`;
        containerRef.current.style.transform = `translate3d(${totalX}px, ${totalY}px, 0)${totalRot}`;
      }

      m.rafId = requestAnimationFrame(tick);
    };

    m.rafId = requestAnimationFrame(tick);

    return () => {
      active = false;
      cancelAnimationFrame(m.rafId);
    };
  }, [mounted, applyEmotion, currentEmotion]);

  if (!mounted) return null;

  // Responsive dimension variables
  const sizeClass = isMobile ? "w-[84px] h-[84px]" : "w-[136px] h-[136px]";

  return (
    <aside
      aria-label="Interactive Ghost Companion"
      className="fixed inset-0 pointer-events-none select-none z-[48] overflow-hidden"
    >
      <div
        ref={containerRef}
        className="pointer-events-auto will-change-transform absolute top-0 left-0 flex flex-col items-center"
        style={{
          transform: `translate3d(${motionRef.current.currentX}px, ${motionRef.current.currentY}px, 0)`,
        }}
      >
        {/* Subtle frosted glass speech bubble */}
        {speechText && (
          <div
            role="status"
            aria-live="polite"
            className="absolute -top-11 right-0 max-w-[calc(100vw-2rem)] whitespace-nowrap rounded-full px-3.5 py-1 text-[11.5px] font-medium backdrop-blur-md shadow-lg border animate-in fade-in zoom-in-95 duration-200 select-none pointer-events-none"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.92)",
              borderColor: "rgba(185, 164, 255, 0.55)",
              color: "#3b2361",
              boxShadow: "0 6px 20px -2px rgba(111, 82, 217, 0.28)",
            }}
          >
            {speechText}
          </div>
        )}

        {/* Interactive Companion Container */}
        <div
          role="button"
          tabIndex={0}
          aria-label={`Ghost companion Boo, currently ${currentEmotion}. Click or tap to play.`}
          onPointerDown={(e) => {
            const m = motionRef.current;
            m.pointerDownTime = Date.now();
            m.pointerStartX = e.clientX;
            m.pointerStartY = e.clientY;
            m.dragPointerId = e.pointerId;

            try {
              (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            } catch {
              // Ignore if capture unsupported
            }

            if (e.pointerType === "touch" || isMobile) {
              m.isDirectDragging = true;
              m.isTouchActive = true;
              m.isPointerMoving = true;
              m.pointerX = e.clientX;
              m.pointerY = e.clientY;
              applyEmotion("listening", 0);
            }
          }}
          onPointerMove={(e) => {
            const m = motionRef.current;
            if (m.isDirectDragging && m.dragPointerId === e.pointerId) {
              m.pointerX = e.clientX;
              m.pointerY = e.clientY;
              m.isPointerMoving = true;
              m.lastPointerMoveTime = performance.now();
            }
          }}
          onPointerUp={(e) => {
            const m = motionRef.current;
            if (m.dragPointerId === e.pointerId) {
              try {
                (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
              } catch {
                // Ignore
              }
              const dist = Math.hypot(e.clientX - m.pointerStartX, e.clientY - m.pointerStartY);
              const duration = Date.now() - m.pointerDownTime;
              const wasDragging = m.isDirectDragging;

              m.isDirectDragging = false;
              m.dragPointerId = null;
              m.isTouchActive = false;

              // Clean tap detection (< 12px move & < 380ms)
              if (dist < 12 && duration < 380) {
                handlePoke();
              } else if (wasDragging) {
                if (!emotionLockRef.current.isLocked) {
                  applyEmotion("idle", 0);
                }
              }
            }
          }}
          onPointerCancel={(e) => {
            const m = motionRef.current;
            if (m.dragPointerId === e.pointerId) {
              try {
                (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
              } catch {
                // Ignore
              }
              m.isDirectDragging = false;
              m.dragPointerId = null;
              m.isTouchActive = false;
              if (!emotionLockRef.current.isLocked) {
                applyEmotion("idle", 0);
              }
            }
          }}
          onClick={() => {
            // Mouse clicks on desktop fallback
            if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
              handlePoke();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handlePoke();
            }
          }}
          onMouseEnter={() => {
            if (currentEmotion === "idle" || currentEmotion === "listening") {
              mascotRef.current?.poke();
              applyEmotion("celebrating", 1600);
              setSpeechText("Happy to see you! ✨");
            }
          }}
          onMouseLeave={() => {
            if (!emotionLockRef.current.isLocked && currentEmotion === "celebrating") {
              applyEmotion("idle", 0);
              setSpeechText(null);
            }
          }}
          className={`group relative flex items-center justify-center cursor-pointer rounded-full transition-transform duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 ${sizeClass}`}
          style={{
            touchAction: "none", // Allows fluid direct dragging of Ghost without page scrolling
          }}
        >
          {/* Subtle purple & cyan ambient lighting glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-2 rounded-full blur-2xl opacity-60 group-hover:opacity-85 transition-opacity duration-500 -z-10"
            style={{
              background:
                "radial-gradient(circle, rgba(168, 85, 247, 0.38) 0%, rgba(56, 189, 248, 0.22) 42%, rgba(138, 108, 240, 0.12) 68%, transparent 82%)",
            }}
          />

          {/* WebGL2 Canvas or Graceful SVG Fallback */}
          {hasWebGL2 ? (
            <canvas
              ref={canvasRef}
              className="w-full h-full block"
              style={{
                imageRendering: "auto",
                touchAction: "manipulation",
              }}
            />
          ) : (
            <GhostFallback emotion={currentEmotion} />
          )}

          {/* Soft purple/cyan ground contact shadow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-3 rounded-[50%] blur-sm -z-20 opacity-35 group-hover:opacity-50 transition-opacity"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(88, 48, 180, 0.55) 0%, rgba(56, 189, 248, 0.25) 35%, transparent 75%)",
            }}
          />
        </div>
      </div>
    </aside>
  );
}
