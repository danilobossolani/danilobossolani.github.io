import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  id?: string;
};

/**
 * Entra uma vez, quando aparece na tela. A animação mora no CSS (.reveal);
 * aqui só se marca o momento. Sem a classe js-reveal no <html> nada fica
 * escondido, então o conteúdo nunca depende disto para aparecer.
 */
export function Reveal({ children, as: Tag = 'div', delay = 0, className = '', id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !document.documentElement.classList.contains('js-reveal')) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-shown');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} id={id} className={`reveal ${className}`} style={{ '--delay': `${delay}s` } as CSSProperties}>
      {children}
    </Tag>
  );
}
