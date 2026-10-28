import { useSite } from '../context/SiteContext';
import { stackGroups, tr } from '../data/content';
import { Reveal } from './Reveal';
import { Section } from './Section';

// Mesma tabela do currículo: nível à esquerda, ferramentas à direita. O que
// uso no dia a dia ganha o verde.
export function Stack() {
  const { t, lang } = useSite();

  return (
    <Section id="stack" title={t.stack.label}>
      <dl className="divide-y divide-line border-y border-line">
        {stackGroups.map((group, i) => (
          <Reveal
            key={group.id}
            delay={i * 0.06}
            className="grid gap-4 py-7 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-10"
          >
            <dt className="font-display text-[1.6rem] leading-tight text-ink">{group[lang]}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={tr(item, lang)}
                    className={`rounded-full px-3.5 py-1.5 text-[0.9rem] ${
                      i === 0 ? 'bg-accent-soft font-medium text-accent' : 'border border-line text-ink'
                    }`}
                  >
                    {tr(item, lang)}
                  </li>
                ))}
              </ul>
            </dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
