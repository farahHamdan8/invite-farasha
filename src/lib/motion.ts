import type { Transition } from "framer-motion";

/** Shared spring vocabulary so every element moves with the same "weight". */
export const springs = {
  /** Soft, slow settle — large ornaments, frames. */
  silk: { type: "spring", stiffness: 70, damping: 18, mass: 1.1 } as Transition,
  /** Default entrance for text blocks. */
  gentle: { type: "spring", stiffness: 110, damping: 20, mass: 0.9 } as Transition,
  /** Responsive, tactile — buttons and toggles. */
  touch: { type: "spring", stiffness: 420, damping: 24, mass: 0.6 } as Transition,
  /** Flaps of the envelope swinging away. */
  flap: { type: "spring", stiffness: 55, damping: 15, mass: 1.2 } as Transition,
};

export const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const;
