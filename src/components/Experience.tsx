import type { ReactNode } from 'react';
import { useSite } from '../context/SiteContext';
import { projects } from '../data/content';
import { Reveal } from './Reveal';
import { Section } from './Section';

// Linha do tempo: o período numa coluna, o fio com um ponto verde por item.
function Entry({ period, children, delay }: { period: string; children: ReactNode; delay: number }) {
  return (
    <Reveal as="li" delay={delay} className="group relative grid gap-2 pl-8 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10 md:pl-0">
      <span className="font-mono text-[0.8rem] text-muted md:pt-2 md:text-right">{period}</span>
      <div className="pb-12 group-last:pb-0 md:relative md:border-l md:border-line md:pl-10">
        <span aria-hidden className="absolute top-2 -left-[6.5px] size-3 rounded-full bg-accent ring-4 ring-accent-soft md:top-2.5" />
        {children}
      </div>
    </Reveal>
  );
}

export function Experience() {
  const { t } = useSite();

  return (
    <>
      <Section id="experience" title={t.experience.label}>
        <ol className="relative border-l border-line md:border-l-0">
          {t.experience.items.map((item, i) => (
            <Entry key={item.title} period={item.period} delay={i * 0.06}>
              <h3 className="font-display text-[1.9rem] leading-tight text-ink">{item.title}</h3>
              <p className="mt-1 text-[0.95rem] text-muted">{item.org}</p>
              <p className="mt-4 max-w-[44rem] text-[0.98rem] leading-relaxed text-ink">{item.body}</p>

              {item.projects.length > 0 && (
                <p className="mt-3 text-[0.92rem] text-muted">
                  {t.experience.deliveries}:{' '}
                  {item.projects.map((id, i) => (
                    <span key={id}>
                      {i > 0 && ', '}
                      <a href={`#${id}`} className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
                        {projects.find((p) => p.id === id)?.title}
                      </a>
                    </span>
                  ))}
                </p>
              )}
            </Entry>
          ))}
        </ol>
      </Section>

      <Section title={t.education.label} band>
        <ol className="relative border-l border-line md:border-l-0">
          <Entry period={t.education.period} delay={0}>
            <h3 className="font-display text-[1.9rem] leading-tight text-ink">{t.education.course}</h3>
            <p className="mt-1 text-[0.95rem] text-muted">{t.education.school}</p>
            <p className="mt-4 text-[0.98rem] text-ink">
              <span className="font-semibold">{t.education.languagesLabel}:</span> {t.education.languages}
            </p>
          </Entry>
        </ol>
      </Section>
    </>
  );
}
