import { useSite } from '../context/SiteContext';
import { Reveal } from './Reveal';
import { Section } from './Section';

// Os três itens de "IA no desenvolvimento" do currículo, sem nada a mais.
export function AI() {
  const { t } = useSite();

  return (
    <Section title={t.ai.label} band>
      <ul className="grid gap-4 md:grid-cols-3">
        {t.ai.items.map((item, i) => (
          <Reveal
            as="li"
            key={item}
            delay={i * 0.08}
            className="rounded-2xl border border-line bg-bg p-6 text-[0.98rem] leading-relaxed text-ink"
          >
            <span aria-hidden className="mb-4 block h-1 w-10 rounded-full bg-accent" />
            {item}
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
