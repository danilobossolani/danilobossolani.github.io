import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useSite } from '../context/SiteContext';
import { profile } from '../data/content';
import { Reveal, RevealWords } from './Reveal';

// A moldura ocupa a largura toda no celular e pouco menos de metade da coluna
// no desktop. O navegador usa isso para escolher a largura do srcset — o
// scale-110 da imagem entra na conta, por isso sobra uma folga aqui.
const SIZES = [
  '(min-width: 1280px) 620px',
  '(min-width: 1024px) 52vw',
  '(min-width: 768px) calc(100vw - 5rem)',
  'calc(100vw - 2.5rem)',
].join(', ');

const srcSet = (ext: string) =>
  profile.photo.widths.map((w) => `/img/danilo-${w}.${ext} ${w}w`).join(', ');

/** True em aparelhos com ponteiro — ou seja, onde `hover` realmente acontece. */
function useHoverCapable() {
  const [can, setCan] = useState(() => window.matchMedia('(hover: hover)').matches);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover)');
    const sync = () => setCan(mq.matches);
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return can;
}

export function About() {
  const { t } = useSite();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // A foto anda devagar dentro da moldura enquanto a seção passa. O deslocamento
  // fica abaixo da folga do scale-110, senão a borda da imagem apareceria.
  const imageY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-4%', '4%']);

  // No desktop quem tira o preto e branco é o hover, exatamente como antes.
  // No celular não existe hover, então quem revela a cor é a própria rolagem:
  // a foto ganha cor ao chegar ao centro da tela e volta ao sair. Os dois
  // caminhos nunca coexistem — senão um sobrescreveria o outro.
  const hoverCapable = useHoverCapable();
  const gray = useTransform(scrollYProgress, [0.12, 0.38, 0.62, 0.9], [100, 0, 0, 100]);
  const filter = useMotionTemplate`grayscale(${gray}%)`;
  const revelaRolando = !hoverCapable && !reduced;

  return (
    <section id="about" className="container-page scroll-mt-20 py-28 md:py-40">
      <Reveal>
        <span className="eyebrow">
          {t.about.eyebrow}
        </span>
      </Reveal>

      <h2 className="mt-7 max-w-4xl font-display text-title text-ink">
        <RevealWords text={t.about.title} />
      </h2>

      <div ref={ref} className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line bg-surface">
              <picture>
                <source srcSet={srcSet('avif')} sizes={SIZES} type="image/avif" />
                <source srcSet={srcSet('webp')} sizes={SIZES} type="image/webp" />
                <motion.img
                  src={profile.photo.fallback}
                  alt={profile.fullName}
                  width={profile.photo.intrinsic.width}
                  height={profile.photo.intrinsic.height}
                  loading="lazy"
                  decoding="async"
                  style={revelaRolando ? { y: imageY, filter } : { y: imageY }}
                  className={`size-full scale-110 object-cover object-center ${
                    hoverCapable
                      ? 'grayscale transition-[filter] duration-700 hover:grayscale-0'
                      : ''
                  }`}
                />
              </picture>
            </div>

            <div className="mt-5 flex items-baseline justify-between gap-4 font-mono text-[0.68rem] tracking-[0.12em] text-muted uppercase">
              <span>{profile.fullName}</span>
              <span>Sorocaba · BR</span>
            </div>
          </div>
        </Reveal>

        <div>
          <div className="space-y-6 text-[1.06rem] leading-[1.75] text-ink-soft">
            <Reveal delay={0.05}>
              <p>{t.about.p1}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>{t.about.p2}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>{t.about.p3}</p>
            </Reveal>
          </div>

          <dl className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
            {t.about.facts.map((fact, i) => (
              <Reveal as="div" key={fact.label} delay={0.06 * i} className="bg-bg p-6">
                <dt className="font-mono text-[0.64rem] tracking-[0.16em] text-muted uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-2.5 text-[0.98rem] text-ink">{fact.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
