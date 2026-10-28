import { useSite } from '../context/SiteContext';
import { projects } from '../data/content';
import { Section } from './Section';

export function Experience() {
  const { t } = useSite();

  return (
    <>
      <Section id="experience" title={t.experience.label}>
        <ol className="divide-y divide-line">
          {t.experience.items.map((item) => (
            <li key={item.title} className="py-6 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-[1.1rem] font-semibold text-ink">{item.title}</h3>
                <span className="font-mono text-[0.78rem] text-muted">{item.period}</span>
              </div>
              <p className="mt-0.5 text-[0.92rem] text-muted">{item.org}</p>
              <p className="mt-3 max-w-[44rem] text-[0.96rem] leading-relaxed text-ink">{item.body}</p>

              {item.projects.length > 0 && (
                <p className="mt-2 text-[0.92rem] text-muted">
                  {t.experience.deliveries}:{' '}
                  {item.projects.map((id, i) => (
                    <span key={id}>
                      {i > 0 && ', '}
                      <a
                        href={`#${id}`}
                        className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent"
                      >
                        {projects.find((p) => p.id === id)?.title}
                      </a>
                    </span>
                  ))}
                </p>
              )}
            </li>
          ))}
        </ol>
      </Section>

      <Section title={t.education.label}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 className="text-[1.1rem] font-semibold text-ink">{t.education.course}</h3>
          <span className="font-mono text-[0.78rem] text-muted">{t.education.period}</span>
        </div>
        <p className="mt-0.5 text-[0.92rem] text-muted">{t.education.school}</p>
        <p className="mt-4 text-[0.96rem] text-ink">
          <span className="font-semibold">{t.education.languagesLabel}:</span> {t.education.languages}
        </p>
      </Section>
    </>
  );
}
