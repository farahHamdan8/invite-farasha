"use client";

import type { ElementType, ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { springs } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  /** When provided, the reveal is driven by this flag instead of scroll position. */
  when?: boolean;
  className?: string;
  as?: "div" | "p" | "h1" | "h2" | "h3" | "span" | "li";
}

/** Spring-driven fade/rise. Transform + opacity only, so it stays on the GPU. */
export function Reveal({ children, delay = 0, y = 22, when, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hide: { opacity: 0, y: reduce ? 0 : y },
    show: { opacity: 1, y: 0, transition: { ...springs.gentle, delay } },
  };
  const Tag = motion[as as Extract<ElementType, "div">] as typeof motion.div;
  const trigger =
    when === undefined
      ? { initial: "hide", whileInView: "show", viewport: { once: true, amount: 0.4 } }
      : { initial: "hide", animate: when ? "show" : "hide" };

  return (
    <Tag className={className} variants={variants} {...trigger}>
      {children}
    </Tag>
  );
}
