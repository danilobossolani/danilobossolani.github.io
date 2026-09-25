import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Lock, Plus } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { profile, projects, tr, type Project } from '../data/content';
import { Reveal, RevealWords } from './Reveal';

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { t, lang } = useSite();
  const [open, setOpen] = useState(index === 0);
  const copy = project[lang];
  const panelId = `project-panel-${project.id}`;

  return (
    <Reveal as="li" delay={Math.min(index, 3) * 0.05} className="border-b border-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="tap-line group -mx-3 grid w-full grid-cols-[1fr_auto] items-center gap-5 rounded-sm px-3 py-7 text-left md:grid-cols-[1fr_auto_auto] md:gap-8 md:py-9"
      >
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-display text-[1.85rem] leading-tight text-ink transition-colors duration-300 group-hover:text-accent md:text-[2.5rem]">
              {tr(project.title, lang)}
            </span>
            {project.private && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.1em] text-muted uppercase">
                <Lock size={10} />
                {t.work.private}
              </span>
            )}
          </span>
          <span className="mt-1.5 block font-mono text-[0.7rem] tracking-[0.08em] text-muted">
            {/* O ano tem coluna própria no desktop; no celular ela não cabe,
                então ele entra aqui em vez de sumir. */}
            <span className="md:hidden">{tr(project.year, lang)} · </span>
            {copy.role}
          </span>
        </span>

        <span className="hidden font-mono text-[0.7rem] text-muted tabular-nums md:block">
          {tr(project.year, lang)}
        </span>

        <span
          className={`grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink-soft transition-all duration-500 group-hover:border-accent group-hover:text-accent ${
            open ? 'rotate-45' : ''
          }`}
        >
          <Plus size={15} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10">
              <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
                <div>
                  <p className="max-w-xl text-[1rem] leading-relaxed text-ink-soft">
                    {copy.summary}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {copy.highlights.map((item) => (
                      <li key={item} className="flex gap-3.5 text-[0.93rem] leading-relaxed text-muted">
                        <span className="mt-[0.6em] size-1 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => {
                      const label = tr(tech, lang);
                      return (
                        <span
                          key={label}
                          className="rounded-full bg-surface px-3 py-1.5 font-mono text-[0.68rem] text-ink-soft"
                        >
                          {label}
                        </span>
                      );
                    })}
                  </div>

                  {project.links.length > 0 && (
                    <div className="flex flex-wrap gap-2.5">
                      {project.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="tap tap-ink group/link inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-[0.82rem] text-ink hover:border-accent hover:text-accent"
                        >
                          {tr(link.label, lang)}
                          <ArrowUpRight
                            size={13}
                            className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                          />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}

export function Work() {
  const { t } = useSite();

  return (
    <section id="work" className="container-page scroll-mt-20 py-28 md:py-40">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <Reveal>
            <span className="eyebrow">
              {t.work.eyebrow}
            </span>
          </Reveal>
          <h2 className="mt-7 max-w-3xl font-display text-title text-ink">
            <RevealWords text={t.work.title} />
          </h2>
        </div>

        <Reveal delay={0.15}>
          <p className="max-w-xs text-[0.95rem] leading-relaxed text-muted">{t.work.note}</p>
        </Reveal>
      </div>

      <ul className="mt-16 border-t border-line">
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
      </ul>

      <Reveal delay={0.1}>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="tap tap-ink group mt-10 inline-flex items-center gap-2 font-mono text-[0.78rem] tracking-[0.1em] text-muted uppercase hover:text-ink"
        >
          {t.work.viewAll}
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </Reveal>
    </section>
  );
}
