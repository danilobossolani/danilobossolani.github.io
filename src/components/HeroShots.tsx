import type { CSSProperties } from 'react';
import { useSite } from '../context/SiteContext';
import { projects, tr } from '../data/content';

// Posição e giro de cada print no leque, do fundo para a frente.
const layout = [
  { left: '0%', top: '16%', rotate: -7 },
  { left: '20%', top: '0%', rotate: 3 },
  { left: '40%', top: '22%', rotate: -2 },
];

/**
 * Os prints dos três primeiros projetos em leque, ocupando o espaço ao lado
 * do nome. Cada um é um atalho para o projeto lá embaixo.
 */
export function HeroShots({ className = '' }: { className?: string }) {
  const { lang } = useSite();

  return (
    <div className={`relative ${className}`}>
      {projects.slice(0, 3).map((project, i) => {
        const pos = layout[i];
        return (
          <a
            key={project.id}
            href={`#${project.id}`}
            aria-label={project.title}
            className="fade-up absolute w-[60%] [--lift:0px] hover:z-10 hover:[--lift:-10px]"
            style={{ left: pos.left, top: pos.top, '--delay': `${0.55 + i * 0.12}s` } as CSSProperties}
          >
            <span
              className="block overflow-hidden rounded-lg border border-line-strong bg-surface shadow-[0_30px_60px_-25px_rgb(0_0_0/0.6)] transition-transform duration-500 ease-[var(--ease-out-soft)]"
              style={{ transform: `translateY(var(--lift)) rotate(${pos.rotate}deg)` }}
            >
              <span aria-hidden className="flex gap-1 border-b border-line px-2.5 py-1.5">
                <span className="size-1.5 rounded-full bg-line-strong" />
                <span className="size-1.5 rounded-full bg-line-strong" />
                <span className="size-1.5 rounded-full bg-line-strong" />
              </span>
              <img
                src={`/projetos/${project.shot.file}-800.webp`}
                srcSet={`/projetos/${project.shot.file}-800.webp 800w, /projetos/${project.shot.file}-1600.webp 1600w`}
                sizes="(min-width: 1024px) 21rem, 60vw"
                width={800}
                height={500}
                alt={tr(project.shot.alt, lang)}
                fetchPriority="low"
                decoding="async"
                className="block aspect-[16/10] w-full object-cover object-top"
              />
            </span>
          </a>
        );
      })}
    </div>
  );
}
