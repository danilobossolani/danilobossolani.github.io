import { useEffect, useRef, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { profile } from '../data/content';

const sections = ['work', 'experience', 'stack', 'contact'] as const;

function LangButton({ className = '' }: { className?: string }) {
  const { t, lang, toggleLang } = useSite();
  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t.nav.langLabel}
      title={t.nav.langLabel}
      className={`tap flex items-center rounded-md border border-line px-2.5 font-mono text-[0.75rem] hover:border-line-strong ${className}`}
    >
      <span className={lang === 'pt' ? 'text-ink' : 'text-muted'}>PT</span>
      <span className="mx-1 text-muted">/</span>
      <span className={lang === 'en' ? 'text-ink' : 'text-muted'}>EN</span>
    </button>
  );
}

function ThemeButton({ className = '' }: { className?: string }) {
  const { t, theme, toggleTheme } = useSite();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t.nav.themeLabel}
      title={t.nav.themeLabel}
      className={`tap grid place-items-center rounded-md border border-line text-muted hover:border-line-strong hover:text-ink ${className}`}
    >
      {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}

export function Nav() {
  const { t } = useSite();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  // No celular a barra sai do caminho quando a pessoa está descendo e volta
  // ao primeiro gesto para cima.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const previous = lastY.current;
      lastY.current = y;
      if (y > previous && y > 400) setHidden(true);
      else if (previous - y > 8) setHidden(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Trava a rolagem do body enquanto o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-ink"
      >
        {t.nav.skip}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-line bg-bg transition-transform duration-200 ${
          hidden && !open ? 'max-md:-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="container-page flex h-14 items-center justify-between gap-4">
          <a href="#top" className="text-[0.95rem] font-semibold whitespace-nowrap text-ink">
            {profile.name}
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label={t.nav.menu}>
            {sections.map((id) => (
              <a key={id} href={`#${id}`} className="text-[0.9rem] text-muted transition-colors hover:text-ink">
                {t.nav[id]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LangButton className="h-9" />
            <ThemeButton className="size-9" />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.nav.menu}
              aria-expanded={open}
              className="tap grid size-9 place-items-center rounded-md border border-line text-ink md:hidden"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
          className="fixed inset-0 z-[55] flex flex-col overflow-y-auto overscroll-contain bg-bg md:hidden"
        >
          <div className="container-page flex h-14 shrink-0 items-center justify-between border-b border-line">
            <span className="text-[0.95rem] font-semibold text-ink">{profile.name}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.nav.close}
              className="tap grid size-9 place-items-center rounded-md border border-line text-ink"
            >
              <X size={16} />
            </button>
          </div>

          <nav className="container-page flex flex-col pt-2" aria-label={t.nav.menu}>
            {sections.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="tap border-b border-line py-4 text-[1.35rem] font-medium text-ink"
              >
                {t.nav[id]}
              </a>
            ))}
          </nav>

          <div className="container-page pb-safe mt-auto pt-8">
            <div className="flex flex-col gap-1 font-mono text-[0.8rem] text-muted">
              <a href={`mailto:${profile.email}`} className="py-1.5">
                {profile.email}
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="py-1.5">
                {profile.linkedinLabel}
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="py-1.5">
                {profile.githubLabel}
              </a>
            </div>

            {/* Tema e idioma ficam repetidos aqui porque o cabeçalho some
                atrás do menu. */}
            <div className="mt-6 flex items-center gap-2 border-t border-line pt-5">
              <LangButton className="h-10 px-4" />
              <ThemeButton className="size-10" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
