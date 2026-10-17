/**
 * Single source of truth for every piece of copy on the invitation, in both
 * languages. Components never hard-code text — edit this file only.
 */
export type Lang = "en" | "ar";
export const LANGS: readonly Lang[] = ["en", "ar"] as const;
export const isLang = (v: unknown): v is Lang => v === "en" || v === "ar";

export interface InvitationCopy {
  dir: "ltr" | "rtl";
  pageTitle: string;
  pageDescription: string;
  couple: { first: string; second: string };
  /** The joiner between the two names ("&" / "و"). */
  amp: string;
  coupleAria: string;
  invited: { top: string; big: string; bottom: string };
  gettingMarried: [string, string];
  saveTheDate: string;
  dateLabel: string;
  timeLabel: string;
  venue: string;
  addressLine: string;
  addToCalendar: string;
  directions: string;
  withLove: string;
  openHint: string;
  openAria: string;
  /** Label of the button that switches *to* the other language. */
  switchLabel: string;
  switchAria: string;
}

/** Language-neutral event facts (machine-readable). */
export const eventMeta = {
  isoStart: "2026-06-27T11:00:00", // local wall-clock time, no timezone suffix
  isoEnd: "2026-06-27T19:00:00",
  mapQuery: "Love Gardens Villa Pearlville CA",
} as const;

export const copy: Record<Lang, InvitationCopy> = {
  en: {
    dir: "ltr",
    pageTitle: "Mahmoud & Aseel — Wedding Invitation",
    pageDescription: "You’re cordially invited to the wedding of Adele & Oliver, June 27, 2026.",
    couple: { first: "Mahmoud", second: "Aseel" },
    amp: "&",
    coupleAria: "Aseel and Mahmoud",
    invited: { top: "You’re", big: "Cordially", bottom: "Invited" },
    gettingMarried: ["We’re getting", "married"],
    saveTheDate: "Save the date",
    dateLabel: "June 27, 2026",
    timeLabel: "11:00 AM — 07:00 PM",
    venue: "Love Gardens Villa",
    addressLine: "Pearlville CA 1238 Miami",
    addToCalendar: "Add to calendar",
    directions: "Directions",
    withLove: "With love",
    openHint: "Tap to open",
    openAria: "Open the invitation",
    switchLabel: "عربي",
    switchAria: "Switch language to Arabic",
  },
  ar: {
    dir: "rtl",
    pageTitle: "محمود و أسيل — دعوة زفاف",
    pageDescription: "أنتم مدعوّون لحضور زفاف أديل وأوليفر، 27 حزيران 2026.",
    couple: { first: "محمود", second: "أسيل" },
    amp: "و",
    coupleAria: "أديل وأوليفر",
    invited: { top: "أنتم", big: "بسم الله الرحمن الرحيم", bottom: "بكل ودّ" },
    gettingMarried: ["يسعدنا أن نعلن", "زواجنا"],
    saveTheDate: "احفظوا الموعد",
    dateLabel: "27 حزيران 2026",
    timeLabel: "05:00 مساءً",
    venue: "قصر اللوتس ",
    addressLine: "شاطيء البحر - بجانب فندق كرزة",
    addToCalendar: "أضف إلى التقويم",
    directions: "الموقع على الخريطة",
    withLove: "بكل حب",
    openHint: "اضغط للفتح",
    openAria: "افتح الدعوة",
    switchLabel: "EN",
    switchAria: "تغيير اللغة إلى الإنجليزية",
  },
};
