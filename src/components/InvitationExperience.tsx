"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { IntroEnvelope } from "./IntroEnvelope";
import { InvitationCard } from "./InvitationCard";
import { LanguageToggle } from "./LanguageToggle";
import { ClosingScreen } from "./ClosingScreen";
import { GoldButterfly } from "./GoldButterfly";
import { useLang } from "@/lib/i18n";
import styles from "./InvitationExperience.module.css";

/** Orchestrates envelope → cream card → burgundy royal screen. */
export function InvitationExperience() {
  const { t } = useLang();
  const [opened, setOpened] = useState(false);

  // Lock scroll while the envelope is closed (no layout shift: overlay is fixed).
  useEffect(() => {
    document.documentElement.style.overflow = opened ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [opened]);

  const handleOpen = useCallback(() => setOpened(true), []);

  return (
    <>
      <LanguageToggle />
      <AnimatePresence>{!opened && <IntroEnvelope key="envelope" onOpen={handleOpen} />}</AnimatePresence>

      <main className={styles.panel} aria-hidden={!opened} inert={!opened}>
        <div className={styles.paper}>
          {/* the butterfly stays perched while pages change beneath it, as in the reference */}
          <div className={styles.rail} aria-hidden="true">
            <div className={styles.fade} />
            <div className={styles.perch}>
              <GoldButterfly size={150} />
            </div>
          </div>
          <InvitationCard t={t} active={opened} />
        </div>
        <ClosingScreen t={t} />
      </main>
    </>
  );
}
