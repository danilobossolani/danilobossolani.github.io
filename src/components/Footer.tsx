import { ArrowUp } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { profile, tr } from '../data/content';

export function Footer() {
  const { t, lang } = useSite();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg-elevated">
      <div className="container-page pb-safe pt-12">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <p className="max-w-sm text-[0.85rem] leading-relaxed text-muted">{t.footer.built}</p>

          <a
            href="#top"
            className="tap tap-ink group inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.12em] text-muted uppercase hover:text-ink"
          >
            {t.footer.top}
            <ArrowUp
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[0.68rem] tracking-[0.08em] text-muted">
          <span>
            © {year} {profile.fullName}. {t.footer.rights}
          </span>
          <span>{tr(profile.location, lang)}</span>
        </div>
      </div>
    </footer>
  );
}
