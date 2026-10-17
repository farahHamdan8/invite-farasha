import { Reveal } from "./Reveal";
import { buildIcsHref, mapHref } from "@/lib/calendar";
import { eventMeta, type InvitationCopy } from "@/lib/invitation";
import styles from "./InvitationCard.module.css";
import Image from "next/image";

interface InvitationCardProps {
  t: InvitationCopy;
  /** Gates the first screen's entrance until the envelope has opened. */
  active: boolean;
}

export function InvitationCard({ t, active }: InvitationCardProps) {
  return (
    <>
      <section className={styles.screen} aria-labelledby="invite-heading">
        <div className={styles.stack}>
          <Reveal when={active} delay={0.35} className={styles.invited}>
            <Image src="/img2.jpg" alt="Mahmoud and Aseel" width={420} height={200} className={styles.img} />
          </Reveal>
          <Reveal when={active} delay={0.35} className={styles.invited}>
            <h3 className={styles.cordially}>أفراح آل الملكي</h3>
          </Reveal>

          {/* تم تعديل as="p" إلى as="div" لإصلاح تداخل عناصر HTML */}
          <Reveal when={active} delay={0.6} as="div" className={styles.eyebrow}>
            <Image src="/img7.jpg" alt="Mahmoud and Aseel" width={300} height={220} className={styles.img} />
            <Image src="/img4.png" alt="Mahmoud and Aseel" width={400} height={100} className={styles.img} />
          </Reveal>

          <div className={styles.names} role="group" aria-label={t.coupleAria}>
            <Reveal when={active} delay={0.8} as="span" className={`${styles.name} ${styles.first}`}>
              {t.couple.first}
            </Reveal>
            <Reveal when={active} delay={0.95} as="span" className={styles.amp}>
              {t.amp}
            </Reveal>
            <Reveal when={active} delay={1.1} as="span" className={`${styles.name} ${styles.second}`}>
              {t.couple.second}
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.screen} aria-labelledby="details-heading">
        <div className={`${styles.stack} ${styles.details}`}>
          <Reveal as="h2" className={styles.saveDate}>
            <span id="details-heading">{t.saveTheDate}</span>
          </Reveal>

          <Reveal delay={0.1} as="p" className={styles.date}>
            <time dateTime={eventMeta.isoStart.slice(0, 10)} suppressHydrationWarning>
              {t.dateLabel}
            </time>
          </Reveal>
          <Reveal delay={0.18} as="p" className={styles.time}>
            {t.timeLabel}
          </Reveal>

          <Reveal delay={0.3} className={styles.venueBlock}>
            <span className={styles.rule} aria-hidden="true" />
            <p className={styles.venue}>{t.venue}</p>
            <address className={styles.address}>{t.addressLine}</address>
          </Reveal>

          <Reveal delay={0.42} className={styles.links}>
            <a className={styles.link} href={buildIcsHref(t)} download="wedding.ics">
              {t.addToCalendar}
            </a>
            <span aria-hidden="true" className={styles.dot} />
            <a className={styles.link} href={mapHref(eventMeta.mapQuery)} target="_blank" rel="noopener noreferrer">
              {t.directions}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}