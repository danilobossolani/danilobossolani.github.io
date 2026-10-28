import { ArrowUpRight, Download } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { profile, tr } from '../data/content';
import { Section } from './Section';

const textLink =
  'inline-flex items-center gap-1 py-2 text-[0.95rem] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent';

// Tudo o que o recrutador precisa ver sem rolar: nome, cargo, onde, regime,
// currículo, contato, LinkedIn e GitHub. Nada aqui é animado.
export function Hero() {
  const { t, lang } = useSite();
  const other = lang === 'pt' ? 'en' : 'pt';

  return (
    <>
      <section id="top" className="container-page pt-24 pb-12 md:pt-32 md:pb-16">
        <h1 className="text-[2.25rem] leading-[1.1] font-bold tracking-[-0.02em] text-ink md:text-[3.25rem]">
          {profile.fullName}
        </h1>
        <p className="mt-3 text-[1.05rem] font-medium text-accent md:text-[1.3rem]">{t.hero.role}</p>

        <p className="mt-6 text-[0.95rem] text-muted">{tr(profile.location, lang)}</p>
        <p className="mt-1 text-[0.95rem] font-medium text-ink">{t.hero.available}</p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href={profile.cv[lang]}
            download
            className="tap inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-[0.95rem] font-medium text-accent-ink hover:opacity-90"
          >
            <Download size={16} />
            {t.hero.cv}
          </a>
          <a
            href="#contact"
            className="tap inline-flex items-center rounded-md border border-line-strong px-5 py-3 text-[0.95rem] font-medium text-ink hover:bg-surface"
          >
            {t.hero.contact}
          </a>

          <span className="flex items-center gap-5 sm:ml-3">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className={textLink}>
              LinkedIn
              <ArrowUpRight size={14} className="text-muted" />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className={textLink}>
              GitHub
              <ArrowUpRight size={14} className="text-muted" />
            </a>
          </span>
        </div>

        <a
          href={profile.cv[other]}
          download
          className="mt-3 inline-block text-[0.85rem] text-muted underline decoration-line-strong underline-offset-4 hover:text-ink"
        >
          {t.hero.cvOther}
        </a>
      </section>

      <Section title={t.hero.summaryLabel}>
        <p className="max-w-[44rem] text-[1rem] leading-relaxed text-ink md:text-[1.05rem]">{t.hero.summary}</p>

        <ul className="mt-6 grid gap-3 lg:grid-cols-3">
          {t.hero.highlights.map((item) => (
            <li key={item.label} className="border-l-[3px] border-accent bg-accent-soft px-4 py-3">
              <p className="text-[0.85rem] font-semibold text-accent">{item.label}</p>
              <p className="mt-1 text-[0.9rem] leading-snug text-ink">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
