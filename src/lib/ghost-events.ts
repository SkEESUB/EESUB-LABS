import type { MascotState } from "wobnimo";

export type GhostEmotion = MascotState;

export interface GhostEmotionDetail {
  emotion: GhostEmotion;
  durationMs?: number;
  priority?: "normal" | "high";
}

const GHOST_EMOTION_EVENT = "eesub:ghost:emotion";
const GHOST_POKE_EVENT = "eesub:ghost:poke";

/**
 * Triggers a temporary or persistent emotion on the Ghost companion.
 */
export function triggerGhostEmotion(
  emotion: GhostEmotion,
  durationMs = 1500,
  priority: "normal" | "high" = "normal",
) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<GhostEmotionDetail>(GHOST_EMOTION_EVENT, {
      detail: { emotion, durationMs, priority },
    }),
  );
}

/**
 * Pokes the Ghost companion (hop + 360 spin + happy expression + heart particles).
 */
export function triggerGhostPoke() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(GHOST_POKE_EVENT));
}

/**
 * Trigger celebration reaction (e.g. successful form submission or milestone).
 */
export function triggerGhostCelebration(durationMs = 4000) {
  triggerGhostEmotion("celebrating", durationMs, "high");
}

export { GHOST_EMOTION_EVENT, GHOST_POKE_EVENT };
