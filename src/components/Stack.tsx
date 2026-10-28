import { useSite } from '../context/SiteContext';
import { stackGroups, tr } from '../data/content';
import { Section } from './Section';

// Mesma tabela do currículo: nível à esquerda, ferramentas à direita.
export function Stack() {
  const { t, lang } = useSite();

  return (
    <Section id="stack" title={t.stack.label}>
      <dl className="divide-y divide-line">
        {stackGroups.map((group) => (
          <div key={group.id} className="grid gap-1 py-3.5 first:pt-0 last:pb-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6">
            <dt className="text-[0.92rem] font-semibold text-muted">{group[lang]}</dt>
            <dd className="text-[0.96rem] leading-relaxed text-ink">
              {group.items.map((item) => tr(item, lang)).join(', ')}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
