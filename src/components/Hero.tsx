import type { CSSProperties } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { profile, tr } from '../data/content';
import { HeroShots } from './HeroShots';
import { Reveal } from './Reveal';

const textLink =
  'link-grow inline-flex items-center gap-1 py-1 text-[0.95rem] font-medium text-ink hover:text-accent';

const delay = (s: number) => ({ '--delay': `${s}s` }) as CSSProperties;

// O nome monta linha a linha e o resto chega logo depois. Tudo o que o
// recrutador precisa (cargo, onde, regime, currículo, contato, LinkedIn e
// GitHub) cabe na primeira tela, também no celular.
export function Hero() {
  const { t, lang } = useSite();
  const other = lang === 'pt' ? 'en' : 'pt';
  const [first, ...rest] = profile.name.split(' ');

  return (
    <>
      <section id="top" className="container-page relative flex min-h-[100svh] flex-col justify-end pt-24 pb-14 md:pb-20">
        <HeroShots className="mb-10 aspect-[16/9] w-full max-w-[34rem] lg:absolute lg:top-28 lg:right-10 lg:mb-0 lg:aspect-[16/11] lg:w-[44%] lg:max-w-none" />

        <h1 className="font-display text-display text-ink" aria-label={profile.name}>
          <span aria-hidden className="block overflow-hidden pb-[0.06em]">
            <span className="rise" style={delay(0.05)}>
              {first}
            </span>
          </span>
          <span aria-hidden className="block overflow-hidden pb-[0.06em]">
            <span className="rise" style={delay(0.15)}>
              {rest.join(' ')}
            </span>
          </span>
        </h1>

        <div
          className="fade-up mt-10 grid gap-8 border-t border-line-strong pt-7 md:mt-14 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12"
          style={delay(0.45)}
        >
          <div>
            <p className="text-[1.15rem] font-medium text-accent md:text-[1.4rem]">{t.hero.role.replace(/ · /g, ' · ')}</p>
            <p className="mt-3 text-[0.98rem] text-muted">{tr(profile.location, lang)}</p>
            <p className="mt-1 text-[0.98rem] text-ink">{t.hero.available}</p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex flex-wrap gap-3">
              <a
                href={profile.cv[lang]}
                download
                className="tap inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[0.95rem] font-medium text-accent-ink hover:-translate-y-0.5"
              >
                <Download size={16} />
                {t.hero.cv}
              </a>
              <a
                href="#contact"
                className="tap inline-flex items-center rounded-full border border-line-strong px-6 py-3 text-[0.95rem] font-medium text-ink hover:-translate-y-0.5 hover:border-accent"
              >
                {t.hero.contact}
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className={textLink}>
                LinkedIn
                <ArrowUpRight size={14} className="text-muted" />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className={textLink}>
                GitHub
                <ArrowUpRight size={14} className="text-muted" />
              </a>
              <a href={profile.cv[other]} download className="link-grow py-1 text-[0.85rem] text-muted hover:text-ink">
                {t.hero.cvOther}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-20 md:pb-28">
        <Reveal as="p" className="max-w-[46rem] text-[1.15rem] leading-relaxed text-ink md:text-[1.35rem]">
          {t.hero.summary}
        </Reveal>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {t.hero.highlights.map((item, i) => (
            <Reveal as="li" key={item.label} delay={i * 0.08} className="bg-bg p-6 md:p-7">
              <p className="font-display text-[1.75rem] leading-tight text-accent">{item.label}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
