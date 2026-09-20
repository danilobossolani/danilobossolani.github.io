import { useSite } from '../context/SiteContext';
import { stackGroups, tr } from '../data/content';
import { Reveal, RevealWords } from './Reveal';

export function Stack() {
  const { t, lang } = useSite();

  return (
    <section id="stack" className="scroll-mt-20 border-y border-line bg-bg-elevated py-28 md:py-40">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <span className="eyebrow">
                {t.stack.eyebrow}
              </span>
            </Reveal>
            <h2 className="mt-7 max-w-3xl font-display text-title text-ink">
              <RevealWords text={t.stack.title} />
            </h2>
          </div>

          <Reveal delay={0.15}>
            <p className="max-w-xs text-[0.95rem] leading-relaxed text-muted">{t.stack.note}</p>
          </Reveal>
        </div>

        <dl className="mt-16 divide-y divide-line border-t border-line">
          {stackGroups.map((group, i) => (
            <Reveal
              as="div"
              key={group.id}
              delay={Math.min(i, 3) * 0.06}
              className="grid gap-5 py-8 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-10"
            >
              <dt className="font-display text-2xl text-ink">{group[lang]}</dt>
              <dd className="flex flex-wrap gap-2.5">
                {group.items.map((item) => {
                  const label = tr(item, lang);
                  return (
                    <span
                      key={label}
                      className="tap tap-ink rounded-full border border-line px-4 py-2 text-[0.87rem] text-ink-soft hover:border-accent hover:text-accent"
                    >
                      {label}
                    </span>
                  );
                })}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
