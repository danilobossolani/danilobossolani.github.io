import { useSite } from '../context/SiteContext';
import { profile } from '../data/content';

export function Footer() {
  const { t } = useSite();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg-elevated">
      <div className="container-page pb-safe flex flex-wrap items-center justify-between gap-4 pt-6 text-[0.82rem] text-muted">
        <span>
          © {year} {profile.fullName}. {t.footer.updated}.
        </span>
        <a href="#top" className="underline decoration-line-strong underline-offset-4 hover:text-ink">
          {t.footer.top}
        </a>
      </div>
    </footer>
  );
}
