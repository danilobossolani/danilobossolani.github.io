import { ArrowUpRight, Code, Globe, Workflow } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { profile, projects, tr, type Project } from '../data/content';
import { Reveal } from './Reveal';
import { Section } from './Section';

const subhead = 'text-[0.85rem] font-semibold text-muted';

// O print dentro de uma moldura de navegador. Alterna de lado a cada
// projeto no desktop; no celular vem sempre antes do texto.
function Shot({ project, flip }: { project: Project; flip: boolean }) {
  const { lang } = useSite();
  const base = `/projetos/${project.shot.file}`;

  return (
    <Reveal className={`group ${flip ? 'lg:order-2' : ''}`}>
      <div className="overflow-hidden rounded-xl border border-line-strong bg-surface shadow-[0_24px_60px_-30px_rgb(0_0_0/0.5)]">
        <div aria-hidden className="flex gap-1.5 border-b border-line px-3.5 py-2.5">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </div>
        <img
          src={`${base}-1600.webp`}
          srcSet={`${base}-800.webp 800w, ${base}-1600.webp 1600w`}
          sizes="(min-width: 1024px) 36rem, 100vw"
          width={1600}
          height={1000}
          loading="lazy"
          decoding="async"
          alt={tr(project.shot.alt, lang)}
          className="block aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
        />
      </div>
    </Reveal>
  );
}

function ProjectEntry({ project, index }: { project: Project; index: number }) {
  const { t, lang } = useSite();
  const copy = project[lang];
  const flip = index % 2 === 1;

  return (
    <article id={project.id} className="grid scroll-mt-20 gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
      <Shot project={project} flip={flip} />

      <Reveal delay={0.1} className={flip ? 'lg:order-1' : ''}>
        <p className="font-mono text-[0.78rem] text-muted">
          {tr(project.year, lang)} · {copy.kind}
        </p>
        <h3 className="mt-2 font-display text-[2.4rem] leading-[1.02] text-ink md:text-[2.9rem]">{project.title}</h3>

        <div className="mt-6 space-y-4">
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

          {/* Um dado que o recrutador pode conferir no repositório. */}
          {copy.highlight && (
            <p className="flex gap-3 rounded-xl border border-accent/40 bg-accent-soft px-4 py-3 text-[0.95rem] leading-snug font-medium text-ink">
              <Workflow size={18} className="mt-px shrink-0 text-accent" aria-hidden />
              {copy.highlight}
            </p>
          )}
        </div>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded-full border border-line px-3 py-1 font-mono text-[0.75rem] text-muted">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {project.links.map((link) => {
            const Icon = link.type === 'site' ? Globe : Code;
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="tap inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-[0.88rem] font-medium text-ink hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <Icon size={15} className="text-muted" />
                {tr(link.label, lang)}
                <ArrowUpRight size={14} className="text-muted" />
              </a>
            );
          })}
        </div>
      </Reveal>
    </article>
  );
}

export function Work() {
  const { t } = useSite();

  return (
    <Section id="work" title={t.work.label} band>
      <div className="space-y-24 md:space-y-32">
        {projects.map((project, i) => (
          <ProjectEntry key={project.id} project={project} index={i} />
        ))}
      </div>

      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        className="link-grow mt-20 inline-flex items-center gap-1.5 text-[0.95rem] text-muted hover:text-ink"
      >
        {t.work.viewAll}
        <ArrowUpRight size={14} />
      </a>
    </Section>
  );
}
