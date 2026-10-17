import "server-only";
import { cookies, headers } from "next/headers";
import { isLang, type Lang } from "./invitation";

/** Cookie wins; otherwise the browser's first preferred language decides. */
export async function resolveLang(): Promise<Lang> {
  const saved = (await cookies()).get("lang")?.value;
  if (isLang(saved)) return saved;
  const accept = (await headers()).get("accept-language") ?? "";
  return accept.trim().toLowerCase().startsWith("ar") ? "ar" : "en";
}
