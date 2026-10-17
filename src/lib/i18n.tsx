"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { copy, type InvitationCopy, type Lang } from "./invitation";

interface LangContextValue {
  lang: Lang;
  t: InvitationCopy;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextValue | null>(null);

/**
 * Holds the active language. `initial` comes from the server (cookie or
 * Accept-Language) so the first paint already has the right lang/dir.
 * Switching is instant and client-side: the envelope state is preserved.
 */
export function LangProvider({ initial, children }: { initial: Lang; children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initial);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`;
    } catch {
      /* cookies blocked: the choice simply won't persist */
    }
    const root = document.documentElement;
    root.lang = next;
    root.dir = copy[next].dir;
    document.title = copy[next].pageTitle;
  }, []);

  const value = useMemo(() => ({ lang, t: copy[lang], setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
