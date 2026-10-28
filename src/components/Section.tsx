import type { ReactNode } from 'react';

/**
 * Bloco de seção com a cara do currículo: um fio em cima e, no desktop, o
 * título numa coluna à esquerda. No celular o título vai por cima.
 */
export function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="container-page scroll-mt-14">
      <div className="grid gap-5 border-t border-line py-10 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10 md:py-14">
        <h2 className="text-[1.05rem] font-semibold text-ink">{title}</h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
