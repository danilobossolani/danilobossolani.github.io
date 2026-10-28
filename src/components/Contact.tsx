import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy, Download } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { profile } from '../data/content';
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

  const channels = [
    { label: 'LinkedIn', value: profile.linkedinLabel, href: profile.linkedin },
    { label: 'GitHub', value: profile.githubLabel, href: profile.github },
  ];

  const rowClass = 'grid gap-1 py-3.5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-center sm:gap-6';
  const labelClass = 'text-[0.92rem] font-semibold text-muted';

  return (
    <Section id="contact" title={t.contact.label}>
      <p className="max-w-[44rem] text-[1rem] leading-relaxed text-ink">{t.contact.body}</p>

      <ul className="mt-6 max-w-2xl divide-y divide-line border-y border-line">
        <li className={rowClass}>
          <span className={labelClass}>{t.contact.emailLabel}</span>
          <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href={`mailto:${profile.email}`}
              className="text-[0.98rem] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent"
            >
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="tap inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-[0.8rem] text-muted hover:text-ink"
            >
              {copied ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
              {copied ? t.contact.copied : t.contact.copy}
            </button>
          </span>
        </li>

        <li className={rowClass}>
          <span className={labelClass}>{t.contact.phoneLabel}</span>
          <a
            href={profile.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="tap inline-flex items-center gap-2 justify-self-start rounded-md border border-line-strong px-3 py-1.5 text-[0.9rem] font-medium text-ink hover:border-accent hover:text-accent"
          >
            <WhatsAppIcon size={16} className="text-accent" />
            {t.contact.whatsapp}
          </a>
        </li>

        {channels.map((channel) => (
          <li key={channel.label} className={rowClass}>
            <span className={labelClass}>{channel.label}</span>
            <a
              href={channel.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 justify-self-start text-[0.98rem] text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent"
            >
              {channel.value}
              <ArrowUpRight size={14} className="text-muted" />
            </a>
          </li>
        ))}

        <li className={rowClass}>
          <span className={labelClass}>{t.contact.cvLabel}</span>
          <span className="flex gap-2">
            {(['pt', 'en'] as const).map((l) => (
              <a
                key={l}
                href={profile.cv[l]}
                download
                aria-label={l === 'pt' ? t.contact.cvPt : t.contact.cvEn}
                className="tap inline-flex items-center gap-1.5 rounded-md border border-line-strong px-3 py-1.5 font-mono text-[0.8rem] text-ink hover:border-accent hover:text-accent"
              >
                <Download size={13} className="text-muted" />
                {l.toUpperCase()}
              </a>
            ))}
          </span>
        </li>
      </ul>
    </Section>
  );
}
