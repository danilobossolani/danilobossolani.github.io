import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'motion/react';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { profile } from '../data/content';

const sections = ['work', 'about', 'stack', 'path', 'contact'] as const;

export function Nav() {
  const { t, theme, toggleTheme, lang, toggleLang } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, 'change', (value) => {
    setScrolled(value > 40);

    // No celular a barra sai do caminho quando a pessoa está descendo e volta
    // ao primeiro gesto para cima. São 72px de tela de volta em cada seção.
    const previous = lastY.current;
    lastY.current = value;
    if (open) return;
    if (value > previous && value > 420) setHidden(true);
    else if (previous - value > 8) setHidden(false);
  });

  // Trava a rolagem do body enquanto o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-accent-ink"
      >
        {lang === 'pt' ? 'Pular para o conteúdo' : 'Skip to content'}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-line bg-bg/80 backdrop-blur-xl'
            : 'border-b border-transparent'
        } ${hidden && !open ? 'max-md:-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="container-page flex h-[72px] items-center justify-between gap-6">
          <a
            href="#top"
            className="group flex items-center gap-2.5 font-mono text-[0.78rem] tracking-[0.14em] uppercase"
          >
            <span className="inline-block size-2 rounded-full bg-accent transition-transform duration-500 group-hover:scale-125" />
            <span className="text-ink">Danilo Bossolani</span>
          </a>

          <nav className="hidden items-center gap-9 md:flex" aria-label={t.nav.menu}>
            {sections.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="link-underline text-[0.9rem] text-ink-soft transition-colors hover:text-ink"
              >
                {t.nav[id]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t.nav.langLabel}
              title={t.nav.langLabel}
              className="tap flex h-9 items-center rounded-full border border-line px-3 font-mono text-[0.7rem] tracking-[0.1em] text-ink-soft uppercase hover:border-line-strong hover:text-ink"
            >
              <span className={lang === 'pt' ? 'text-ink' : 'text-muted'}>PT</span>
              <span className="mx-1.5 text-muted">/</span>
              <span className={lang === 'en' ? 'text-ink' : 'text-muted'}>EN</span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={t.nav.themeLabel}
              title={t.nav.themeLabel}
              className="tap grid size-9 place-items-center rounded-full border border-line text-ink-soft hover:border-line-strong hover:text-ink"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.nav.menu}
              className="tap grid size-9 place-items-center rounded-full border border-line text-ink hover:border-line-strong md:hidden"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] flex flex-col overflow-y-auto overscroll-contain bg-bg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Mesmo brilho do hero: o menu é uma tela do site, não um painel
                de sistema colado por cima dele. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[520px] -translate-x-1/2 rounded-full opacity-[0.18] blur-[90px]"
              style={{ background: 'radial-gradient(closest-side, var(--accent), transparent)' }}
            />

            <div className="container-page relative flex h-[72px] shrink-0 items-center justify-between">
              <span className="font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                {t.nav.menu}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.nav.close}
                className="tap grid size-9 place-items-center rounded-full border border-line text-ink"
              >
                <X size={16} />
              </button>
            </div>

            <nav className="container-page relative flex flex-col pt-4" aria-label={t.nav.menu}>
              {sections.map((id, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="tap tap-line group flex items-baseline gap-4 border-b border-line py-5"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-mono text-[0.68rem] text-muted tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="font-display text-4xl text-ink">{t.nav[id]}</span>
                  <ArrowUpRight size={18} className="ml-auto self-center text-muted" />
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42, duration: 0.5 }}
              className="container-page pb-safe relative mt-auto pt-10"
            >
              <div className="flex flex-col gap-1 font-mono text-xs text-muted">
                <a href={`mailto:${profile.email}`} className="tap-ink py-1.5">
                  {profile.email}
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="tap-ink py-1.5"
                >
                  github.com/{profile.githubHandle}
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="tap-ink py-1.5"
                >
                  linkedin.com/in/{profile.linkedinHandle}
                </a>
              </div>

              {/* Tema e idioma ficam repetidos aqui porque o cabeçalho some
                  atrás do menu — sem isso não dá para trocar de tema com o
                  menu aberto. */}
              <div className="mt-8 flex items-center gap-2 border-t border-line pt-6">
                <button
                  type="button"
                  onClick={toggleLang}
                  aria-label={t.nav.langLabel}
                  className="tap flex h-10 items-center rounded-full border border-line px-4 font-mono text-[0.7rem] tracking-[0.1em] uppercase"
                >
                  <span className={lang === 'pt' ? 'text-ink' : 'text-muted'}>PT</span>
                  <span className="mx-1.5 text-muted">/</span>
                  <span className={lang === 'en' ? 'text-ink' : 'text-muted'}>EN</span>
                </button>

                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={t.nav.themeLabel}
                  className="tap grid size-10 place-items-center rounded-full border border-line text-ink-soft"
                >
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
