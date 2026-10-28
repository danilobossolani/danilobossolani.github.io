import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy, Download } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { profile } from '../data/content';
import { Reveal } from './Reveal';
import { Section } from './Section';
import { WhatsAppIcon } from './WhatsAppIcon';

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

  const pill =
    'tap inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-[0.95rem] font-medium text-ink hover:-translate-y-0.5 hover:border-accent hover:text-accent';

  return (
    <Section id="contact" title={t.contact.label}>
      <Reveal as="p" className="max-w-[40rem] text-[1.1rem] leading-relaxed text-muted">
        {t.contact.body}
      </Reveal>

      <Reveal delay={0.08} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
        <a
          href={`mailto:${profile.email}`}
          className="link-grow font-display text-[clamp(2rem,6.5vw,4.5rem)] leading-[1.1] break-all text-ink hover:text-accent"
        >
          {profile.email}
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="tap inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-[0.85rem] text-muted hover:text-ink"
        >
          {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
          {copied ? t.contact.copied : t.contact.copy}
        </button>
      </Reveal>

      <Reveal delay={0.16} className="mt-10 flex flex-wrap gap-3">
        <a href={profile.whatsapp} target="_blank" rel="noreferrer" className={pill}>
          <WhatsAppIcon size={17} className="text-accent" />
          {t.contact.whatsapp}
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className={pill}>
          LinkedIn
          <ArrowUpRight size={15} className="text-muted" />
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer" className={pill}>
          GitHub
          <ArrowUpRight size={15} className="text-muted" />
        </a>
        {(['pt', 'en'] as const).map((l) => (
          <a key={l} href={profile.cv[l]} download className={pill}>
            <Download size={15} className="text-muted" />
            {l === 'pt' ? t.contact.cvPt : t.contact.cvEn}
          </a>
        ))}
      </Reveal>
    </Section>
  );
}
