import { ArrowUpRight, Code, Globe, Workflow } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { profile, projects, tr, type Project } from '../data/content';
import { Section } from './Section';

const subhead = 'text-[0.85rem] font-semibold text-muted';

function ProjectEntry({ project }: { project: Project }) {
  const { t, lang } = useSite();
  const copy = project[lang];

  return (
    <article id={project.id} className="scroll-mt-16 py-8 first:pt-0 last:pb-0">
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-[1.35rem] font-semibold tracking-[-0.01em] text-ink">{project.title}</h3>
        <span className="font-mono text-[0.78rem] text-muted">{tr(project.year, lang)}</span>
      </header>
      <p className="mt-0.5 text-[0.92rem] text-muted">{copy.kind}</p>

      <div className="mt-5 max-w-[44rem] space-y-4">
        <div>
          <h4 className={subhead}>{t.work.problem}</h4>
          <p className="mt-1 text-[0.98rem] leading-relaxed text-ink">{copy.problem}</p>
        </div>

        <div>
          <h4 className={subhead}>{t.work.did}</h4>
          <ul className="mt-1 space-y-1">
            {copy.did.map((item) => (
              <li key={item} className="flex gap-3 text-[0.96rem] leading-relaxed text-ink">
                <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* O único destaque visual da página: um dado que o recrutador pode
            conferir no repositório. */}
        {copy.highlight && (
          <p className="flex gap-3 rounded-md border border-accent/40 bg-accent-soft px-4 py-3 text-[0.95rem] leading-snug font-medium text-ink">
            <Workflow size={18} className="mt-px shrink-0 text-accent" aria-hidden />
            {copy.highlight}
          </p>
        )}

        <p className="font-mono text-[0.82rem] leading-relaxed text-accent">{project.stack.join(' · ')}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {project.links.map((link) => {
          const Icon = link.type === 'site' ? Globe : Code;
          return (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="tap inline-flex items-center gap-2 rounded-md border border-line-strong px-3.5 py-2 text-[0.88rem] font-medium text-ink hover:border-accent hover:text-accent"
            >
              <Icon size={15} className="text-muted" />
              {tr(link.label, lang)}
              <ArrowUpRight size={14} className="text-muted" />
            </a>
          );
        })}
      </div>
    </article>
  );
}

export function Work() {
  const { t } = useSite();

  return (
    <Section id="work" title={t.work.label}>
      <div className="divide-y divide-line">
        {projects.map((project) => (
          <ProjectEntry key={project.id} project={project} />
        ))}
      </div>

      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center gap-1.5 text-[0.9rem] text-muted underline decoration-line-strong underline-offset-4 hover:text-ink"
      >
        {t.work.viewAll}
        <ArrowUpRight size={14} />
      </a>
    </Section>
  );
}
