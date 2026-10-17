"use client";

import { motion, useReducedMotion } from "framer-motion";
import { VictorianFrame } from "./VictorianFrame";
import { springs } from "@/lib/motion";
import type { InvitationCopy } from "@/lib/invitation";
import styles from "./ClosingScreen.module.css";

export function ClosingScreen({ t }: { t: InvitationCopy }) {
  const { couple } = t;
  const reduce = useReducedMotion();
  const word = (delay: number, dx: number) => ({
    initial: { opacity: 0, x: reduce ? 0 : dx },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { ...springs.silk, delay },
  });

  return (
    <section className={styles.section} aria-label={t.coupleAria}>
      <VictorianFrame label={t.coupleAria}>
        <div className={styles.names}>
          <motion.span className={`${styles.name} ${styles.first}`} {...word(0.35, -24)}>
            {couple.first}
          </motion.span>
          <motion.span className={styles.amp} aria-hidden="true" {...word(0.55, 0)}>
            {t.amp}
          </motion.span>
          <motion.span className={`${styles.name} ${styles.second}`} {...word(0.75, 24)}>
            {couple.second}
          </motion.span>
        </div>
      </VictorianFrame>
      <motion.p
        className={styles.sign}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.1, duration: 1 }}
      >
        {t.withLove}
      </motion.p>
    </section>
  );
}
