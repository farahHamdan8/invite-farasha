"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./GoldButterfly.module.css";

interface GoldButterflyProps {
  /** Rendered width in px; height follows the 10:7 viewBox. */
  size?: number;
  /** Enables the hovering float and the periodic wing flutter. */
  alive?: boolean;
  /** Faster, more excited flutter (used while the envelope opens). */
  excited?: boolean;
  className?: string;
}

/* One right-hand wing pair; the left pair is the same geometry mirrored. */
const UPPER = "M102 67 C118 32 158 6 187 20 C197 26 194 50 180 69 C165 84 128 86 102 73 Z";
const LOWER = "M102 75 C127 85 150 93 156 113 C158 127 140 135 124 124 C108 112 102 94 102 75 Z";
const VEINS = [
  "M102 70 C130 52 160 34 184 26",
  "M102 72 C132 62 162 54 189 44",
  "M102 74 C130 74 160 72 186 62",
  "M103 78 C124 90 140 100 150 116",
  "M103 78 C116 94 122 106 128 121",
];

function Wings({ gradId, edgeId }: { gradId: string; edgeId: string }) {
  return (
    <>
      <path d={LOWER} fill={`url(#${gradId})`} />
      <path d={UPPER} fill={`url(#${gradId})`} />
      <g fill="none" stroke="#c9a468" strokeWidth="0.7" strokeLinecap="round" opacity="0.65">
        {VEINS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {/* solid gold rim + beaded inner rim, like the enamel butterfly in the reference */}
      <g fill="none" stroke={`url(#${edgeId})`} strokeLinejoin="round">
        <path d={UPPER} strokeWidth="2.4" />
        <path d={LOWER} strokeWidth="2.4" />
      </g>
      <g fill="none" stroke="#e8d09a" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="0.1 3.4" opacity="0.95">
        <path d="M112 70 C128 40 160 17 184 27" />
        <path d="M136 92 C148 98 152 108 148 119" />
      </g>
    </>
  );
}

export function GoldButterfly({ size = 150, alive = true, excited = false, className }: GoldButterflyProps) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const gradId = `wing-${uid}`;
  const edgeId = `edge-${uid}`;
  const animated = alive && !reduce;

  return (
    <motion.div
      className={`${styles.wrap} ${className ?? ""}`}
      style={{ width: size, height: size * 0.7 }}
      animate={animated ? { y: [0, -5, 0], rotate: [-1.2, 1.2, -1.2] } : undefined}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 200 140" width="100%" height="100%" aria-hidden="true" focusable="false" className={styles.svg}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff7f3" />
            <stop offset="0.55" stopColor="#f4d9d4" />
            <stop offset="1" stopColor="#e9bfc0" />
          </linearGradient>
          <linearGradient id={edgeId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a67c3d" />
            <stop offset="0.5" stopColor="#e9d08e" />
            <stop offset="1" stopColor="#b48a4a" />
          </linearGradient>
        </defs>

        <ellipse cx="100" cy="132" rx="46" ry="3.5" fill="#3b0a10" opacity="0.08" />

        <g className={`${styles.wing} ${excited ? styles.excited : ""} ${animated ? styles.flutter : ""}`}>
          <Wings gradId={gradId} edgeId={edgeId} />
        </g>
        <g className={`${styles.wing} ${excited ? styles.excited : ""} ${animated ? styles.flutter : ""}`}>
          <g transform="translate(200 0) scale(-1 1)">
            <Wings gradId={gradId} edgeId={edgeId} />
          </g>
        </g>

        {/* body & antennae */}
        <path d="M100 56 C97 70 97 92 100 108 C103 92 103 70 100 56Z" fill="#a87f3f" />
        <circle cx="100" cy="55" r="2.6" fill="#8d6a30" />
        <path d="M99 53 C95 44 92 38 87 33 M101 53 C105 44 108 38 113 33" stroke="#8d6a30" strokeWidth="0.9" strokeLinecap="round" fill="none" />
      </svg>
    </motion.div>
  );
}
