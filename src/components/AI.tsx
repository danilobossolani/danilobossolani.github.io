import { Binoculars, Blocks, GitPullRequestArrow, Sparkles } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { Reveal, RevealWords } from './Reveal';

const icons = [GitPullRequestArrow, Blocks, Sparkles, Binoculars];

export function AI() {
  const { t } = useSite();

  return (
    <section className="container-page py-28 md:py-40">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <span className="eyebrow">
              {t.ai.eyebrow}
            </span>
          </Reveal>

          <h2 className="mt-7 font-display text-title text-ink">
            <RevealWords text={t.ai.title} />
          </h2>
        </div>

        <div>
          <Reveal delay={0.08}>
            <p className="text-[1.06rem] leading-[1.75] text-ink-soft">{t.ai.p}</p>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
            {t.ai.cards.map((card, i) => {
              const Icon = icons[i] ?? Sparkles;
              return (
                <Reveal
                  as="div"
                  key={card.title}
                  delay={0.05 * i}
                  className="group bg-bg p-7 transition-colors duration-500 hover:bg-surface"
                >
                  <Icon
                    size={19}
                    className="text-muted transition-colors duration-500 group-hover:text-accent"
                  />
                  <h3 className="mt-5 text-[1.02rem] font-medium text-ink">{card.title}</h3>
                  <p className="mt-2.5 text-[0.9rem] leading-relaxed text-muted">{card.body}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
