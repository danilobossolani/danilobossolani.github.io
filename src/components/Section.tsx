import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

/**
 * Seção com o título grande na serifa. `band` pinta o fundo da faixa
 * inteira, para separar os blocos sem precisar de fios.
 */
export function Section({
  id,
  title,
  band = false,
  children,
}: {
  id?: string;
  title: string;
  band?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-14 ${band ? 'bg-bg-elevated' : ''}`}>
      <div className="container-page py-20 md:py-28">
        <Reveal as="h2" className="font-display text-title text-ink">
          {title}
        </Reveal>
        <div className="mt-10 min-w-0 md:mt-14">{children}</div>
      </div>
    </section>
  );
}
