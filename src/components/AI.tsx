import { useSite } from '../context/SiteContext';
import { Section } from './Section';

// Os três itens de "IA no desenvolvimento" do currículo, sem nada a mais.
export function AI() {
  const { t } = useSite();

  return (
    <Section title={t.ai.label}>
      <ul className="space-y-1.5">
        {t.ai.items.map((item) => (
          <li key={item} className="flex gap-3 text-[0.96rem] leading-relaxed text-ink">
            <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}
