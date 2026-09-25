const words = [
  'Java',
  'Spring Boot',
  'PostgreSQL',
  'Node.js',
  'TypeScript',
  'React',
  'Angular',
  'REST APIs',
  'Docker',
  'pgvector',
  'RAG',
  'Cloudflare',
];

/**
 * Faixa rolante entre o hero e o conteúdo. A lista é duplicada e o
 * keyframe anda -50%, então o loop é contínuo sem emenda visível.
 */
export function Marquee() {
  return (
    <div
      className="marquee-host relative flex overflow-hidden border-y border-line bg-bg-elevated py-5 select-none"
      aria-hidden
    >
      <div className="animate-marquee flex shrink-0 items-center whitespace-nowrap">
        {[...words, ...words].map((word, i) => (
          <span key={`${word}-${i}`} className="flex items-center">
            <span className="px-7 font-display text-2xl text-ink-soft md:text-3xl">{word}</span>
            <span className="size-1 rounded-full bg-accent" />
          </span>
        ))}
      </div>

      {/* Esmaece as bordas para a faixa nascer e morrer no fundo. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-bg-elevated to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-bg-elevated to-transparent md:w-24" />
    </div>
  );
}
