// Todo o texto do site sai dos currículos em public/ (PT e EN). Nada aqui
// pode ir além do que está neles.

export type Lang = 'pt' | 'en';

/** Um rotulo que ou e igual nos dois idiomas, ou traz uma versao para cada. */
export type Localized = string | { pt: string; en: string };

export function tr(value: Localized, lang: Lang): string {
  return typeof value === 'string' ? value : value[lang];
}

export const profile = {
  name: 'Danilo Bossolani',
  fullName: 'Danilo Yamazaki Bossolani',
  email: 'danbossolani@gmail.com',
  // O número não aparece na tela: o site mostra só o botão do WhatsApp.
  whatsapp: 'https://wa.me/5515991197670',
  location: {
    pt: 'Sorocaba, SP · remoto, híbrido ou presencial',
    en: 'Sorocaba, Brazil · remote (GMT-3)',
  } as Localized,
  github: 'https://github.com/danilobossolani',
  githubLabel: 'github.com/danilobossolani',
  linkedin: 'https://linkedin.com/in/danilobossolani',
  linkedinLabel: 'linkedin.com/in/danilobossolani',
  // Os PDFs moram em public/, entao sao servidos na raiz do site.
  cv: {
    pt: '/Curriculo_Danilo_Bossolani_PT.pdf',
    en: '/Resume_Danilo_Bossolani_EN.pdf',
  },
};

type ProjectCopy = {
  kind: string;
  /** Que problema o projeto resolve, em uma frase. */
  problem: string;
  /** O que eu fiz nele. */
  did: string[];
  /** Dado que merece destaque visual no card. */
  highlight?: string;
};

export type Project = {
  id: string;
  year: Localized;
  title: string;
  stack: string[];
  links: { type: 'code' | 'site'; label: Localized; href: string }[];
  pt: ProjectCopy;
  en: ProjectCopy;
};

// Mesma ordem em que o recrutador deve ler: o sistema em uso por cliente
// primeiro, o site do ateliê por último.
export const projects: Project[] = [
  {
    id: 'judicial-pipeline',
    year: '2026',
    title: 'Judicial Property Pipeline',
    stack: ['Java 21', 'Spring Boot', 'JPA', 'Flyway', 'PostgreSQL', 'Docker', 'Thymeleaf', 'Playwright'],
    links: [
      {
        type: 'code',
        label: { pt: 'Código', en: 'Code' },
        href: 'https://github.com/danilobossolani/judicial-property-pipeline',
      },
    ],
    pt: {
      kind: 'Freelance, sistema sob medida em uso por cliente',
      problem:
        'Coleta e organiza imóveis de leilão judicial publicados em cerca de 10 fontes públicas de Sorocaba e Votorantim.',
      did: [
        'Coleta automática com cada fonte isolada em seu próprio provider; falha em uma fonte não interrompe as outras.',
        'Deduplicação de cadastros, filtros (cidade, bairro, status), acompanhamento de praças e valores, e central de auditoria com histórico de cada coleta.',
      ],
      highlight:
        '72 testes automatizados (JUnit 5 e Mockito) rodando no CI do GitHub Actions a cada push e PR.',
    },
    en: {
      kind: 'Freelance, custom system used by a client',
      problem: 'Collects and tracks judicial-auction listings published across about 10 public sources.',
      did: [
        'Automatic collection with each source isolated in its own provider, so one failing source never stops the others.',
        'Duplicate detection, filters (city, neighborhood, status), tracking of auction rounds and prices, and an audit center logging every collection run.',
      ],
      highlight: '72 automated tests (JUnit 5 and Mockito) running in GitHub Actions CI on every push and PR.',
    },
  },
  {
    id: 'autostore-ai',
    year: '2026',
    title: 'AutoStore AI',
    stack: ['Node.js', 'TypeScript', 'Express', 'PostgreSQL', 'pgvector', 'Gemini API'],
    links: [
      {
        type: 'code',
        label: { pt: 'Código', en: 'Code' },
        href: 'https://github.com/danilobossolani/car-store-rag',
      },
    ],
    pt: {
      kind: 'Teste técnico de processo seletivo',
      problem:
        'Catálogo de veículos que capta leads e tem um assistente de IA que responde só com dados do catálogo.',
      did: [
        'Captura de leads em PostgreSQL e assistente de IA baseado em RAG, que mantém o histórico da conversa.',
        'Embeddings no pgvector com busca por distância de cosseno.',
        '17+ commits em Conventional Commits.',
      ],
    },
    en: {
      kind: 'Take-home test for a hiring process',
      problem: 'Car catalog with lead capture and an AI assistant that answers only from catalog data.',
      did: [
        'Lead capture in PostgreSQL and a RAG-based AI assistant that keeps conversation history.',
        'Embeddings in pgvector with cosine-distance search.',
        '17+ commits using Conventional Commits.',
      ],
    },
  },
  {
    id: 'plus-party',
    year: { pt: '2026 · em andamento', en: '2026 · in progress' },
    title: '+party',
    stack: ['Angular 22', 'TypeScript', 'SCSS', 'Bootstrap 5', 'Supabase', 'Figma'],
    links: [
      {
        type: 'code',
        label: { pt: 'Código do sistema', en: 'System code' },
        href: 'https://github.com/PedroLima-07/Startup-PlusParty',
      },
      {
        type: 'code',
        label: { pt: 'Código da landing page', en: 'Landing page code' },
        href: 'https://github.com/PedroLima-07/Landing-page-Party',
      },
    ],
    pt: {
      kind: 'Projeto da disciplina Startup One (FACENS), equipe de 5 com Scrum e Trello',
      problem:
        'Comanda digital para bares, do pedido ao pagamento, com áreas para cliente, equipe e gestor.',
      did: [
        'Um dos responsáveis pelo desenvolvimento: liderei a landing page e colaboro nas demais frentes do sistema junto ao time.',
        'Projeto elogiado pelos professores da disciplina.',
      ],
    },
    en: {
      kind: 'Startup One course project (FACENS), team of 5 using Scrum and Trello',
      problem:
        'Digital tab app for bars, from ordering to payment, with areas for customers, staff and managers.',
      did: [
        'One of the developers responsible: I led the landing page and contribute across the rest of the system.',
        'Praised by the course professors.',
      ],
    },
  },
  {
    id: 'atelier-chris',
    year: '2026',
    title: 'Ateliê Chris Camacho',
    stack: ['React', 'Vite', 'Cloudflare Workers'],
    links: [{ type: 'site', label: 'atelierccamacho.com.br', href: 'https://www.atelierccamacho.com.br/' }],
    pt: {
      kind: 'Freelance para um ateliê de cerâmica em São Paulo',
      problem:
        'Site do ateliê com uma página própria para cada atividade (jantares, aulas, decalques) e FAQ.',
      did: [
        'Contato pelo WhatsApp com mensagem pré-preenchida.',
        'Site estático com CSP restritiva e deploy na Cloudflare.',
      ],
    },
    en: {
      kind: 'Freelance for a ceramics studio in São Paulo',
      problem: 'Studio website with a page per activity (dinners, classes, decals) and FAQs.',
      did: [
        'WhatsApp contact using pre-filled messages.',
        'Static site with a strict CSP, deployed on Cloudflare.',
      ],
    },
  },
];

type StackGroup = { id: string; pt: string; en: string; items: Localized[] };

// Os níveis do currículo, na mesma ordem. "IA no desenvolvimento" tem
// seção própria (AI.tsx), por isso não se repete aqui.
export const stackGroups: StackGroup[] = [
  {
    id: 'daily',
    pt: 'Uso no dia a dia',
    en: 'Daily use',
    items: [
      'Java 21',
      'Spring Boot',
      'JPA',
      'PostgreSQL',
      'SQL',
      'Node.js',
      'TypeScript',
      'Express',
      'Git/GitHub',
      'Docker',
    ],
  },
  {
    id: 'projects',
    pt: 'Já usei em projeto',
    en: 'Used in projects',
    items: [
      'React',
      'Angular',
      'MongoDB',
      'pgvector',
      'Thymeleaf',
      'Playwright',
      'Python/FastAPI',
      'Power BI',
      'GitHub Actions',
      'Tailwind',
      'Bootstrap',
    ],
  },
  {
    id: 'fundamentals',
    pt: 'Fundamentos',
    en: 'Fundamentals',
    items: [
      { pt: 'POO', en: 'OOP' },
      { pt: 'APIs REST', en: 'REST APIs' },
      { pt: 'arquitetura em camadas', en: 'layered architecture' },
      { pt: 'testes unitários (JUnit 5, Mockito)', en: 'unit testing (JUnit 5, Mockito)' },
      'UI/UX',
      { pt: 'metodologias ágeis (Scrum)', en: 'Agile (Scrum)' },
      'UML',
      { pt: 'estruturas de dados', en: 'data structures' },
    ],
  },
];

export const content = {
  pt: {
    meta: {
      title: 'Danilo Bossolani · Desenvolvedor Júnior · Java · Spring Boot',
      description:
        'Desenvolvedor júnior em Java e Spring Boot com PostgreSQL, Node.js e TypeScript. Freelancer desde agosto de 2026, em Sorocaba, SP. Disponível para CLT ou PJ.',
    },
    nav: {
      work: 'Projetos',
      experience: 'Experiência',
      stack: 'Stack',
      contact: 'Contato',
      menu: 'Menu',
      close: 'Fechar',
      skip: 'Pular para o conteúdo',
      themeLabel: 'Alternar tema',
      langLabel: 'Switch to English',
    },
    hero: {
      role: 'Desenvolvedor Júnior · Java · Spring Boot · IA aplicada',
      available: 'Disponível para CLT ou PJ',
      summary:
        'Desenvolvo back-end em Java e Spring Boot com PostgreSQL e também trabalho com Node.js e TypeScript. Desde agosto de 2026 atuo como freelancer e entrego software para clientes reais, do levantamento de requisitos ao deploy. Estou no 4º período de ADS na FACENS, com conclusão prevista para junho de 2027, e busco minha primeira vaga júnior.',
      cv: 'Baixar currículo',
      cvOther: 'Versão em inglês (PDF)',
      contact: 'Contato',
      summaryLabel: 'Resumo',
      highlights: [
        {
          label: 'Em uso por cliente',
          body: 'Sistema Java/Spring com 72 testes e CI que coleta imóveis de leilão judicial',
        },
        {
          label: 'IA com dados reais',
          body: 'Assistente RAG com pgvector que responde só com base no catálogo',
        },
        {
          label: 'Disponível',
          body: 'CLT ou PJ · remoto em todo o Brasil ou presencial/híbrido em Sorocaba',
        },
      ],
    },
    work: {
      label: 'Projetos',
      problem: 'O que resolve',
      did: 'O que fiz',
      viewAll: 'Todos os repositórios no GitHub',
    },
    experience: {
      label: 'Experiência',
      deliveries: 'Entregas',
      items: [
        {
          title: 'Desenvolvedor Freelance',
          org: 'Autônomo, remoto',
          period: 'ago/2026 – atual',
          body: 'Escopo, prazo, desenvolvimento, deploy e suporte negociados direto com o cliente.',
          projects: ['judicial-pipeline', 'atelier-chris'],
        },
        {
          title: 'Auxiliar de Pós-vendas',
          org: 'Óticas Prevent, Sorocaba',
          period: 'out/2025 – mai/2026',
          body: 'Pós-venda e atendimento em loja de alto fluxo com metas; cadastro de clientes no sistema de gestão.',
          projects: [],
        },
      ],
    },
    education: {
      label: 'Formação',
      course: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
      school: 'FACENS, Sorocaba',
      period: '2025 – jun/2027 (previsão), 4º período',
      languagesLabel: 'Idiomas',
      languages: 'português nativo, inglês B2, espanhol intermediário (boa compreensão), japonês A1',
    },
    stack: {
      label: 'Stack',
    },
    ai: {
      label: 'IA no desenvolvimento',
      items: [
        'Claude Code no dia a dia, sempre revisando o código gerado.',
        'Integração de LLM via API: Gemini com RAG sobre pgvector no AutoStore AI.',
        'Curso de Engenharia de Prompt (DIO/Bradesco).',
      ],
    },
    contact: {
      label: 'Contato',
      body: 'Busco minha primeira vaga júnior, CLT ou PJ, remoto em todo o Brasil ou presencial/híbrido em Sorocaba.',
      emailLabel: 'E-mail',
      phoneLabel: 'WhatsApp',
      whatsapp: 'Conversar no WhatsApp',
      cvLabel: 'Currículo',
      cvPt: 'Baixar currículo em português (PDF)',
      cvEn: 'Baixar currículo em inglês (PDF)',
      copy: 'Copiar e-mail',
      copied: 'Copiado',
    },
    footer: {
      updated: 'Atualizado em outubro de 2026',
      top: 'Voltar ao topo',
    },
  },

  en: {
    meta: {
      title: 'Danilo Bossolani · Junior Developer · Java · Spring Boot',
      description:
        'Junior developer building backends in Java and Spring Boot with PostgreSQL, plus Node.js and TypeScript. Freelancing since August 2026. Remote from Brazil (GMT-3).',
    },
    nav: {
      work: 'Projects',
      experience: 'Experience',
      stack: 'Stack',
      contact: 'Contact',
      menu: 'Menu',
      close: 'Close',
      skip: 'Skip to content',
      themeLabel: 'Toggle theme',
      langLabel: 'Mudar para português',
    },
    hero: {
      role: 'Junior Developer · Java · Spring Boot · Applied AI',
      available: 'Available for contractor or full-time roles',
      summary:
        "I build backends in Java and Spring Boot with PostgreSQL, and also work with Node.js and TypeScript. Since August 2026 I've been freelancing, shipping software to real clients from requirements to deployment. I'm finishing an associate degree in Systems Analysis and Development (expected June 2027) and looking for my first junior role.",
      cv: 'Download résumé',
      cvOther: 'Portuguese version (PDF)',
      contact: 'Contact',
      summaryLabel: 'Summary',
      highlights: [
        {
          label: 'Used by a client',
          body: 'Java/Spring system with 72 tests and CI that tracks judicial-auction properties',
        },
        {
          label: 'Grounded AI',
          body: 'RAG assistant on pgvector that answers only from catalog data',
        },
        {
          label: 'Remote-ready',
          body: 'GMT-3, overlaps US business hours · contractor or full-time',
        },
      ],
    },
    work: {
      label: 'Projects',
      problem: 'What it solves',
      did: 'What I did',
      viewAll: 'All repositories on GitHub',
    },
    experience: {
      label: 'Experience',
      deliveries: 'Delivered',
      items: [
        {
          title: 'Freelance Developer',
          org: 'Self-employed, remote',
          period: 'Aug 2026 – present',
          body: 'I handle scope, timeline, development, deployment and support directly with each client.',
          projects: ['judicial-pipeline', 'atelier-chris'],
        },
        {
          title: 'After-sales Assistant',
          org: 'Óticas Prevent (optical retail), Brazil',
          period: 'Oct 2025 – May 2026',
          body: 'After-sales and customer service in a high-traffic, target-driven store; kept customer records up to date.',
          projects: [],
        },
      ],
    },
    education: {
      label: 'Education',
      course: 'Associate Degree in Systems Analysis and Development',
      school: 'FACENS, Sorocaba, Brazil',
      period: '2025 – Jun 2027 (expected)',
      languagesLabel: 'Languages',
      languages:
        'Portuguese (native), English (B2), Spanish (intermediate, strong comprehension), Japanese (A1)',
    },
    stack: {
      label: 'Stack',
    },
    ai: {
      label: 'AI-assisted development',
      items: [
        'Claude Code daily, always reviewing generated code.',
        'LLM integration via API: Gemini with RAG on pgvector in AutoStore AI.',
        'Prompt Engineering course (DIO/Bradesco).',
      ],
    },
    contact: {
      label: 'Contact',
      body: "I'm looking for my first junior role, contractor or full-time. I work remotely from Brazil (GMT-3), overlapping US business hours.",
      emailLabel: 'Email',
      phoneLabel: 'WhatsApp',
      whatsapp: 'Message on WhatsApp',
      cvLabel: 'Résumé',
      cvPt: 'Download résumé in Portuguese (PDF)',
      cvEn: 'Download résumé in English (PDF)',
      copy: 'Copy email',
      copied: 'Copied',
    },
    footer: {
      updated: 'Updated October 2026',
      top: 'Back to top',
    },
  },
};

export type Dict = typeof content.pt;

/** Falha o build se os dois idiomas sairem de sincronia. */
const mesmaForma: Record<Lang, Dict> = content;
void mesmaForma;
