"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { GoldButterfly } from "./GoldButterfly";
import { EMBOSSED_BURGUNDY } from "@/lib/textures";
import { springs } from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import styles from "./IntroEnvelope.module.css";

interface IntroEnvelopeProps {
  /** Called once the flaps have swung clear and the overlay may unmount. */
  onOpen: () => void;
}

type FlapName = "top" | "right" | "bottom" | "left";
const FLAPS: FlapName[] = ["top", "left", "right", "bottom"];

const flapVariants: Variants = {
  closed: { x: 0, y: 0, rotate: 0 },
  open: (name: FlapName) => {
    const to = {
      top: { y: "-106%", rotate: -3 },
      bottom: { y: "106%", rotate: 3 },
      left: { x: "-106%", rotate: 2.5 },
      right: { x: "106%", rotate: -2.5 },
    }[name];
    const delay = { top: 0.05, left: 0.14, right: 0.2, bottom: 0.28 }[name];
    return { ...to, transition: { ...springs.flap, delay } };
  },
};

export function IntroEnvelope({ onOpen }: IntroEnvelopeProps) {
  const reduce = useReducedMotion();
  const { t } = useLang();
  const [opening, setOpening] = useState(false);
  const touchStart = useRef<number | null>(null);

  const open = useCallback(() => setOpening(true), []);

  useEffect(() => {
    if (!opening) return;
    const id = window.setTimeout(onOpen, reduce ? 250 : 1500);
    return () => window.clearTimeout(id);
  }, [opening, onOpen, reduce]);

  return (
    <motion.div
      className={styles.root}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      onWheel={(e) => e.deltaY > 12 && open()}
      onTouchStart={(e) => {
        touchStart.current = e.touches[0].clientY;
      }}
      onTouchMove={(e) => {
        if (touchStart.current !== null && touchStart.current - e.touches[0].clientY > 36) open();
      }}
    >
      {/* hides sub-pixel seams between flaps until they part */}
      <motion.div
        className={styles.backing}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.25 }}
      />

      {FLAPS.map((name) => (
        <motion.div
          key={name}
          className={`${styles.flap} ${styles[name]}`}
          style={{ backgroundImage: EMBOSSED_BURGUNDY }}
          custom={name}
          variants={flapVariants}
          initial="closed"
          animate={opening ? "open" : "closed"}
          aria-hidden="true"
        />
      ))}

      <motion.div
        className={styles.sealZone}
        animate={
          opening
            ? { scale: reduce ? 1 : 2.1, y: reduce ? 0 : "-30svh", opacity: 0 }
            : { scale: 1, y: 0, opacity: 1 }
        }
        transition={{
          ...springs.silk,
          opacity: { delay: opening ? 0.75 : 0, duration: 0.45 },
        }}
      >
        <motion.button
          type="button"
          className={styles.seal}
          onClick={open}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          transition={springs.touch}
          aria-label={t.openAria}
          disabled={opening}
        >
          <span className={styles.glow} aria-hidden="true" />
          <span className={styles.pulse} aria-hidden="true" />
          <GoldButterfly size={86} excited={opening} />
        </motion.button>
      </motion.div>

      <motion.p
        className={styles.hint}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      >
        {t.openHint}
      </motion.p>
    </motion.div>
  );
}
