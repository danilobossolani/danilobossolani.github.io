import { useSite } from '../context/SiteContext';
import { Reveal, RevealWords } from './Reveal';

export function Path() {
  const { t } = useSite();

  return (
    <section
      id="path"
      className="scroll-mt-20 border-y border-line bg-bg-elevated py-28 md:py-40"
    >
      <div className="container-page">
        <Reveal>
          <span className="eyebrow">
            {t.path.eyebrow}
          </span>
        </Reveal>

        <h2 className="mt-7 max-w-3xl font-display text-title text-ink">
          <RevealWords text={t.path.title} />
        </h2>

        <ol className="mt-16">
          {t.path.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 0.07}
              className="group relative grid gap-4 border-t border-line py-9 md:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] md:gap-12"
            >
              {/* Marcador na linha divisória, alinhado ao topo do item. */}
              <span
                aria-hidden
                className="absolute -top-[3px] left-0 size-1.5 rounded-full bg-line-strong transition-colors duration-500 group-hover:bg-accent"
              />

              <span className="font-mono text-[0.72rem] tracking-[0.08em] text-muted">
                {item.period}
              </span>

              <div>
                <h3 className="font-display text-[1.7rem] leading-tight text-ink md:text-[2rem]">
                  {item.title}
                </h3>
                <p className="mt-1 text-[0.88rem] text-accent">{item.org}</p>
                <p className="mt-4 max-w-2xl text-[0.97rem] leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
