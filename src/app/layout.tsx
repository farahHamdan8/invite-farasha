import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { LangProvider } from "@/lib/i18n";
import { copy } from "@/lib/invitation";
import { resolveLang } from "@/lib/lang.server";
import "./globals.css";

export const metadata: Metadata = {
  title: "محمود & أسيل | دعوة زفاف",
  description: "يسرنا دعوتكم لحضور حفل زفافنا",
  icons: {
    icon: "/logo.png", // مسار الصورة داخل مجلد public
    // إذا كان لديكِ صورة خاصة لأجهزة آبل:
    apple: "/logo.png", 
  },
};

// Self-hosted latin subsets: no runtime request to Google, size-adjusted fallbacks => no layout shift.
const serif = localFont({
  src: [
    { path: "../fonts/cormorant-garamond-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-300-italic.woff2", weight: "300", style: "italic" },
    { path: "../fonts/cormorant-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-500-italic.woff2", weight: "500", style: "italic" },
    { path: "../fonts/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-600-italic.woff2", weight: "600", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});
const sans = localFont({
  src: [
    { path: "../fonts/jost-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../fonts/jost-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/jost-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});
const script = localFont({
  src: "../fonts/pinyon-script-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

// Arabic faces: loaded lazily (preload: false) so English visitors never download them.
const arScript = localFont({
  src: [
    { path: "../fonts/aref-ruqaa-arabic-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/aref-ruqaa-arabic-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-ar-script",
  display: "swap",
  preload: false,
});
const arSerif = localFont({
  src: [
    { path: "../fonts/amiri-arabic-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/amiri-arabic-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-ar-serif",
  display: "swap",
  preload: false,
});
const arSans = localFont({
  src: [
    { path: "../fonts/tajawal-arabic-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/tajawal-arabic-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-ar-sans",
  display: "swap",
  preload: false,
});



export const viewport: Viewport = {
  themeColor: "#3b0a10",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await resolveLang();
  const fontVars = [serif, sans, script, arScript, arSerif, arSans].map((f) => f.variable).join(" ");
  return (
    <html lang="ar" dir="rtl" className={fontVars}>
      <body>
        <LangProvider initial={lang}>{children}</LangProvider>
      </body>
    </html>
  );
}
