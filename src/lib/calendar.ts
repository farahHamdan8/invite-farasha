import { eventMeta, type InvitationCopy } from "./invitation";

const compact = (iso: string) => iso.replace(/[-:]/g, "");

/** Builds a data-URI .ics so guests can save the date with one tap. */
export function buildIcsHref(c: InvitationCopy): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    `UID:${compact(eventMeta.isoStart)}@wedding-invitation`,
    `DTSTAMP:${compact(new Date().toISOString().slice(0, 19))}Z`,
    `DTSTART:${compact(eventMeta.isoStart)}`,
    `DTEND:${compact(eventMeta.isoEnd)}`,
    `SUMMARY:${c.couple.first} ${c.amp} ${c.couple.second}`,
    `LOCATION:${c.venue}\\, ${c.addressLine}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

export const mapHref = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
