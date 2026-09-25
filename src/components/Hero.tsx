import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, Download } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { profile, tr } from '../data/content';

const ease = [0.22, 1, 0.36, 1] as const;

// Nomes proprios de tecnologia: iguais nos dois idiomas.
const destaques = ['Java', 'Spring Boot', 'PostgreSQL', 'Node.js', 'TypeScript', 'Docker'];

export function Hero() {
  const { t, lang } = useSite();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Paralaxe leve: o bloco de texto sobe um pouco mais devagar que a página.
  const y = useTransform(scrollYProgress, [0, 0.25], [0, reduced ? 0 : -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.18], [1, reduced ? 1 : 0.15]);

  const line = (text: string, delay: number, className = '') => (
    <span className="block overflow-hidden">
      <motion.span
        className={`block ${className}`}
        initial={reduced ? false : { y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.05, delay, ease }}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden pt-[72px]">
      {/* Brilho quente atrás do texto, bem discreto. Menor no celular: em 900px
          de largura ele vazava pelas laterais e virava uma mancha chapada. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 left-1/2 h-[380px] w-[560px] -translate-x-1/2 rounded-full opacity-[0.16] blur-[90px] md:-top-40 md:h-[560px] md:w-[900px] md:blur-[120px]"
        style={{ background: 'radial-gradient(closest-side, var(--accent), transparent)' }}
      />

      <motion.div
        style={{ y, opacity }}
        className="container-page flex min-h-[calc(100svh-72px)] flex-col justify-center py-12 md:py-16"
      >
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-3 md:mb-10"
        >
          <span className="flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pr-4 pl-3 font-mono text-[0.61rem] tracking-[0.1em] text-ink-soft uppercase md:text-[0.68rem] md:tracking-[0.12em]">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            {t.hero.available}
          </span>
          <span className="font-mono text-[0.68rem] tracking-[0.12em] text-muted uppercase">
            {tr(profile.location, lang)}
          </span>
        </motion.div>

        <h1 className="font-display text-display text-ink">
          {line(t.hero.line1, 0.12)}
          {line(t.hero.line2, 0.2)}
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={reduced ? false : { y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.05, delay: 0.28, ease }}
            >
              {t.hero.line3}{' '}
              <em className="italic text-accent">{t.hero.accent}</em>
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease }}
          className="mt-10 grid gap-8 border-t border-line pt-7 md:mt-12 md:grid-cols-[1.1fr_1fr] md:gap-16 md:pt-8 lg:grid-cols-[1fr_1fr_auto]"
        >
          <div>
            <p className="font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
              {t.hero.role}
            </p>
            <p className="mt-3 max-w-md text-[1.02rem] leading-relaxed text-ink-soft">
              {t.hero.intro}
            </p>
          </div>

          {/* Escondido no celular de propósito: a faixa rolante logo abaixo já
              diz a mesma coisa, e estas pílulas empurravam os botões para
              fora da primeira tela. */}
          <div className="hidden flex-wrap content-start gap-2 md:flex">
            {destaques.map((item) => (
              <span
                key={item}
                className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[0.7rem] text-ink-soft"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Largura travada no desktop: com os três botões numa linha só,
              esta coluna engolia o espaço da apresentação ao lado. */}
          <div className="flex flex-wrap content-start items-start gap-3 lg:max-w-[20.5rem]">
            <a
              href="#work"
              className="tap group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink hover:-translate-y-0.5"
            >
              {t.hero.ctaWork}
              <ArrowDownRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </a>
            <a
              href="#contact"
              className="tap group inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-ink hover:bg-surface"
            >
              {t.hero.ctaContact}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            {/* Um botão só com as duas versões do PDF, em vez de dois botões
                quase iguais disputando espaço com os outros dois. */}
            <div className="inline-flex items-stretch overflow-hidden rounded-full border border-line-strong text-sm font-medium text-ink">
              <span className="flex items-center gap-2 py-3 pr-3 pl-5">
                <Download size={15} className="text-muted" />
                {t.hero.cv}
              </span>
              {(['pt', 'en'] as const).map((l) => (
                <a
                  key={l}
                  href={profile.cv[l]}
                  download
                  aria-label={l === 'pt' ? t.hero.cvPt : t.hero.cvEn}
                  className="tap tap-ink flex items-center border-l border-line-strong px-4 py-3 font-mono text-[0.78rem] tracking-[0.08em] hover:bg-surface hover:text-accent"
                >
                  {l.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Convite a rolar. No desktop cabe a legenda; no celular ela roubava
          espaço, então vira um fio com um pulso descendo. */}
      <motion.div
        aria-hidden
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center md:bottom-7"
      >
        <span className="hidden font-mono text-[0.62rem] tracking-[0.2em] text-muted uppercase md:block">
          {t.hero.scroll}
        </span>

        <span className="relative block h-9 w-px overflow-hidden bg-line md:hidden">
          <motion.span
            className="absolute inset-x-0 block h-3.5 bg-accent"
            initial={{ y: -14 }}
            animate={reduced ? { y: 12 } : { y: [-14, 36] }}
            transition={{ duration: 1.9, repeat: reduced ? 0 : Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  );
}
