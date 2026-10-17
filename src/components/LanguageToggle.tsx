"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { springs } from "@/lib/motion";
import styles from "./LanguageToggle.module.css";

/** Always-visible pill that flips between English and Arabic without a reload. */
export function LanguageToggle() {
  const { lang, t, setLang } = useLang();
  const next = lang === "en" ? "ar" : "en";

  return (
    <div className={styles.bar}>
    
    </div>
  );
}
