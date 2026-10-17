"use client";

import { useId, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { springs } from "@/lib/motion";
import styles from "./VictorianFrame.module.css";

/* ------------------------------------------------------------------ *
 *  Procedural baroque border
 *  Two phase-shifted wavy strands wrap an ellipse; scrolls ("curls")
 *  bloom at every outer peak and acanthus leaves sit at each crossing.
 *  Geometry is computed once at module load (pure + deterministic, so
 *  server and client markup always match).
 * ------------------------------------------------------------------ */

type P = [number, number];
const CX = 150;
const CY = 200;
const A = 104;
const B = 146;
const WAVES = 7;
const AMP = 6.5;

const f = (n: number) => n.toFixed(2);

function ellipsePoint(t: number, off = 0): { p: P; n: P } {
  const nx0 = Math.sin(t) / A;
  const ny0 = -Math.cos(t) / B;
  const l = Math.hypot(nx0, ny0);
  const n: P = [nx0 / l, ny0 / l];
  return { p: [CX + A * Math.sin(t) + n[0] * off, CY - B * Math.cos(t) + n[1] * off], n };
}

/** Catmull-Rom → cubic Bézier, for smooth hand-drawn-looking curves. */
function smooth(pts: P[]): string {
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1: P = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: P = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

function spiral(anchor: P, n: P, r0: number, dir: 1 | -1, turns = 1.3, steps = 28): string {
  const c: P = [anchor[0] + n[0] * r0, anchor[1] + n[1] * r0];
  const a0 = Math.atan2(-n[1], -n[0]);
  const pts: P[] = [];
  for (let i = 0; i <= steps; i++) {
    const u = i / steps;
    const r = r0 * (1 - 0.86 * Math.pow(u, 0.85));
    const a = a0 + dir * turns * Math.PI * 2 * u;
    pts.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]);
  }
  return smooth(pts);
}

const T0 = 0.16;
const T1 = Math.PI - 0.16;

function strand(phase: number): string {
  const pts: P[] = [];
  for (let i = 0; i <= 70; i++) {
    const t = T0 + ((T1 - T0) * i) / 70;
    pts.push(ellipsePoint(t, AMP * Math.sin(t * WAVES + phase)).p);
  }
  return smooth(pts);
}

interface Leaf { x: number; y: number; deg: number; s: number }
const curls: string[] = [];
const leaves: Leaf[] = [];
(() => {
  let flip: 1 | -1 = 1;
  for (let m = 0; m < WAVES; m++) {
    const t = (Math.PI / 2 + m * Math.PI) / WAVES;
    if (t < T0 + 0.05 || t > T1 - 0.05) continue;
    // outward-most point of whichever strand is currently on the outside
    const sgn = Math.sin(t * WAVES) > 0 ? 1 : -1;
    const { p, n } = ellipsePoint(t, AMP * sgn);
    // lean the scroll away from the ellipse along the tangent for a more organic S
    curls.push(spiral(p, n, 9 - Math.abs(Math.cos(t)) * 2, flip));
    leaves.push({ x: p[0], y: p[1], deg: (Math.atan2(n[1], n[0]) * 180) / Math.PI + flip * 38, s: 1.05 });
    flip = (flip * -1) as 1 | -1;
  }
  for (let m = 1; m < WAVES; m++) {
    const t = (m * Math.PI) / WAVES;
    if (t < T0 + 0.1 || t > T1 - 0.1) continue;
    const { p, n } = ellipsePoint(t, 0);
    leaves.push({ x: p[0], y: p[1], deg: (Math.atan2(n[1], n[0]) * 180) / Math.PI, s: 0.8 });
    leaves.push({ x: p[0], y: p[1], deg: (Math.atan2(n[1], n[0]) * 180) / Math.PI + 180, s: 0.7 });
  }
})();

const STRAND_A = strand(0);
const STRAND_B = strand(Math.PI);
const LEAF = "M0 0 C3 -5 10 -7.5 17 -4 C12 0 6 3.4 0 0Z";

/* crest + base flourish: right half only, mirrored by <use> */
const CREST_HALF = [
  "M150 60 C161 58 172 47 174 33 C163 36 154 45 150 60Z",
  "M153 63 C176 64 196 58 205 74",
  spiral([205, 74], [0.2, 0.98], 8, -1, 1.25),
  "M152 66 C168 74 180 78 190 72",
  spiral([190, 72], [-0.3, 0.95], 4.5, 1, 1.2, 20),
];
const BASE_HALF = [
  "M150 340 C160 342 170 350 172 362 C162 360 154 352 150 340Z",
  "M153 337 C174 336 192 342 200 328",
  spiral([200, 328], [0.25, -0.97], 7, 1, 1.25),
  "M154 345 C166 356 178 358 187 352",
  "M150 346 C146 358 148 368 150 376 C152 368 154 358 150 346Z",
];

function Half({ gradId }: { gradId: string }) {
  return (
    <g fill="none" stroke={`url(#${gradId})`} strokeLinecap="round" strokeLinejoin="round">
      <path d={STRAND_A} strokeWidth="1.5" />
      <path d={STRAND_B} strokeWidth="1.1" opacity="0.85" />
      {curls.map((d, i) => (
        <path key={i} d={d} strokeWidth="1.5" />
      ))}
      {CREST_HALF.map((d, i) => (
        <path key={`c${i}`} d={d} strokeWidth="1.4" fill={d.endsWith("Z") ? `url(#${gradId})` : "none"} fillOpacity="0.28" />
      ))}
      {BASE_HALF.map((d, i) => (
        <path key={`b${i}`} d={d} strokeWidth="1.4" fill={d.endsWith("Z") ? `url(#${gradId})` : "none"} fillOpacity="0.28" />
      ))}
      {leaves.map((l, i) => (
        <path
          key={`l${i}`}
          d={LEAF}
          transform={`translate(${f(l.x)} ${f(l.y)}) rotate(${f(l.deg)}) scale(${l.s})`}
          strokeWidth="1"
          fill={`url(#${gradId})`}
          fillOpacity="0.32"
        />
      ))}
    </g>
  );
}

interface VictorianFrameProps {
  children?: ReactNode;
  label?: string;
  className?: string;
}

/** Ornate baroque cartouche for the royal closing screen. */
export function VictorianFrame({ children, label, className }: VictorianFrameProps) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const gradId = `rg-${uid}`;
  const halfId = `half-${uid}`;

  return (
    <motion.div
      className={`${styles.oval} ${className ?? ""}`}
      initial={{ opacity: 0, scale: reduce ? 1 : 0.9, rotate: reduce ? 0 : -1.5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={springs.silk}
      role="group"
      aria-label={label}
    >
      <svg className={styles.ovalSvg} viewBox="0 0 300 400" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor="#f6dcd2" />
            <stop offset="0.5" stopColor="#e9c1b4" />
            <stop offset="1" stopColor="#f1d3c6" />
          </linearGradient>
          <g id={halfId}>
            <Half gradId={gradId} />
          </g>
        </defs>
        {/* hairline inner cartouche */}
        <ellipse cx={CX} cy={CY} rx={A - 11} ry={B - 11} fill="none" stroke={`url(#${gradId})`} strokeWidth="0.6" opacity="0.7" />
        <use href={`#${halfId}`} />
        <use href={`#${halfId}`} transform={`translate(${CX * 2} 0) scale(-1 1)`} />
        {/* centre petals */}
        <g fill={`url(#${gradId})`} fillOpacity="0.3" stroke={`url(#${gradId})`} strokeWidth="1.4">
          <path d="M150 20 C141 32 141 46 150 62 C159 46 159 32 150 20Z" />
          <path d="M150 336 C145 346 145 360 150 380 C155 360 155 346 150 336Z" />
        </g>
        <circle cx="150" cy="64" r="2.4" fill={`url(#${gradId})`} />
      </svg>
      <div className={styles.ovalContent}>{children}</div>
    </motion.div>
  );
}
