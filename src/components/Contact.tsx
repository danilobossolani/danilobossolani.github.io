import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy, Download } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { profile } from '../data/content';
import { Reveal, RevealWords } from './Reveal';

export function Contact() {
  const { t } = useSite();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      // Sem permissão de área de transferência: o link mailto ao lado continua servindo.
    }
  };

  const channels = [
    { label: t.contact.emailLabel, value: profile.email, href: `mailto:${profile.email}` },
    { label: t.contact.phoneLabel, value: profile.phone, href: `https://wa.me/${profile.phoneHref}` },
    { label: 'LinkedIn', value: `in/${profile.linkedinHandle}`, href: profile.linkedin },
    { label: 'GitHub', value: `@${profile.githubHandle}`, href: profile.github },
  ];

  return (
    <section id="contact" className="container-page scroll-mt-20 py-28 md:py-40">
      <Reveal>
        <span className="eyebrow">
          {t.contact.eyebrow}
        </span>
      </Reveal>

      <div className="mt-8 grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <h2 className="font-display text-display leading-[0.95] text-ink">
            <RevealWords text={t.contact.title} />
          </h2>

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-lg text-[1.06rem] leading-[1.75] text-ink-soft">
              {t.contact.body}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="tap group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-[0.95rem] font-medium text-accent-ink hover:-translate-y-0.5"
              >
                {profile.email}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className="tap inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3.5 text-[0.88rem] text-ink hover:bg-surface"
              >
                {copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
                {copied ? t.contact.copied : t.contact.copy}
              </button>
            </div>
          </Reveal>
        </div>

        <ul className="divide-y divide-line border-y border-line lg:mt-3">
          {channels.map((channel, i) => (
            <Reveal as="li" key={channel.label} delay={0.05 * i}>
              <a
                href={channel.href}
                target={channel.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                className="tap-line group -mx-3 flex items-center justify-between gap-6 rounded-sm px-3 py-5"
              >
                <span className="font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                  {channel.label}
                </span>
                <span className="flex items-center gap-2 text-[0.97rem] text-ink transition-colors group-hover:text-accent">
                  {channel.value}
                  <ArrowUpRight
                    size={14}
                    className="text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  />
                </span>
              </a>
            </Reveal>
          ))}

          {/* O currículo tem duas versões, então a linha leva dois links
              em vez de um só esticado. */}
          <Reveal as="li" delay={0.05 * channels.length}>
            <div className="flex items-center justify-between gap-6 py-5">
              <span className="font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                {t.contact.cvLabel}
              </span>
              <span className="flex items-center gap-2">
                {(['pt', 'en'] as const).map((l) => (
                  <a
                    key={l}
                    href={profile.cv[l]}
                    download
                    aria-label={l === 'pt' ? t.hero.cvPt : t.hero.cvEn}
                    className="tap tap-ink group inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 font-mono text-[0.78rem] text-ink hover:border-accent hover:text-accent"
                  >
                    {l.toUpperCase()}
                    <Download size={13} className="text-muted group-hover:text-accent" />
                  </a>
                ))}
              </span>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
