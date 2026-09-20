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
  phone: '+55 15 99119-7670',
  phoneHref: '+5515991197670',
  location: { pt: 'Sorocaba, SP — Brasil', en: 'Sorocaba, SP — Brazil' } as Localized,
  github: 'https://github.com/danilobossolani',
  githubHandle: 'danilobossolani',
  linkedin: 'https://linkedin.com/in/danilobossolani',
  linkedinHandle: 'danilobossolani',
  cv: 'https://drive.google.com/file/d/1uEGQTDuKholBuhJlCpuojS4NZRh-pJNm/view',
  // Retrato do "Sobre". As larguras sao geradas por `npm run images` a partir
  // de assets-src/danilo-original.png; o srcset deixa o navegador escolher.
  photo: {
    fallback: '/img/danilo-800.jpg',
    widths: [480, 640, 800, 1024, 1200],
    intrinsic: { width: 1200, height: 1500 },
  },
};

export type Project = {
  id: string;
  year: string;
  title: Localized;
  stack: Localized[];
  featured?: boolean;
  private?: boolean;
  links: { label: Localized; href: string }[];
  pt: { role: string; summary: string; highlights: string[] };
  en: { role: string; summary: string; highlights: string[] };
};

export const projects: Project[] = [
  {
    id: 'judicial-pipeline',
    year: '2026',
    title: 'Judicial Property Pipeline',
    stack: ['Java 21', 'Spring Boot', 'PostgreSQL', 'JPA', 'Thymeleaf'],
    featured: true,
    private: true,
    links: [],
    pt: {
      role: 'Back-end · projeto autoral',
      summary:
        'Aplicação web para organizar e acompanhar oportunidades imobiliárias vindas de fontes públicas. Código-fonte privado por confidencialidade comercial.',
      highlights: [
        'Back-end em Java 21 com Spring Boot, estruturado em camadas — Controller, Service e Repository.',
        'Modelagem e persistência das entidades em PostgreSQL via JPA.',
        'Painel web em Thymeleaf para consulta e acompanhamento dos imóveis cadastrados.',
      ],
    },
    en: {
      role: 'Back-end · personal project',
      summary:
        'Web application that organizes and tracks real estate opportunities sourced from public data. Source code kept private for commercial confidentiality.',
      highlights: [
        'Java 21 and Spring Boot back-end, structured in layers — Controller, Service and Repository.',
        'Entity modeling and persistence on PostgreSQL through JPA.',
        'Thymeleaf dashboard for querying and following up on registered properties.',
      ],
    },
  },
  {
    id: 'autostore-ai',
    year: '2026',
    title: 'AutoStore AI',
    stack: ['Node.js', 'TypeScript', 'Express', 'PostgreSQL', 'pgvector', 'Gemini API'],
    featured: true,
    links: [{ label: 'GitHub', href: 'https://github.com/danilobossolani/car-store-rag' }],
    pt: {
      role: 'Full stack · RAG',
      summary:
        'Plataforma full stack de catálogo de veículos com captura de leads e assistente virtual baseado em RAG — busca semântica no banco combinada com respostas contextualizadas do modelo.',
      highlights: [
        'Busca semântica sobre o catálogo usando PostgreSQL com pgvector, alimentando o contexto do assistente.',
        'Respostas geradas pela Gemini API a partir apenas dos veículos realmente disponíveis, reduzindo alucinação.',
        'Back-end em Node.js, TypeScript e Express, com persistência do catálogo e do histórico de leads.',
      ],
    },
    en: {
      role: 'Full stack · RAG',
      summary:
        'Full stack car marketplace with lead capture and a RAG-powered assistant — semantic search over the database combined with context-grounded model answers.',
      highlights: [
        'Semantic search across the catalog using PostgreSQL with pgvector, feeding the assistant its context.',
        'Answers generated through the Gemini API from actually available vehicles only, cutting hallucination.',
        'Node.js, TypeScript and Express back-end, persisting both the catalog and the lead history.',
      ],
    },
  },
  {
    id: 'party-landing',
    year: '2026',
    title: '+Party — Landing Page',
    stack: ['Angular', 'TypeScript', 'SCSS', 'Cloudflare Workers', 'GitHub Actions'],
    featured: true,
    links: [{ label: 'GitHub', href: 'https://github.com/PedroLima-07/Landing-page-Party' }],
    pt: {
      role: 'Front-end · deploy',
      summary:
        'Landing page institucional de uma startup de eventos, feita em Angular com rotas para equipe, planos e sobre. Projeto em equipe, com entrega contínua em produção.',
      highlights: [
        'Aplicação Angular com design system próprio, header responsivo e quatro páginas secundárias.',
        'Publicação automática na Cloudflare a cada push, via GitHub Actions e Wrangler.',
        'Rotas do SPA servidas corretamente no reload, sem depender de arquivo de redirects.',
      ],
    },
    en: {
      role: 'Front-end · deploy',
      summary:
        'Institutional landing page for an events startup, built in Angular with routes for team, plans and about. Team project with continuous delivery to production.',
      highlights: [
        'Angular application with its own design system, responsive header and four secondary pages.',
        'Automatic publishing to Cloudflare on every push, through GitHub Actions and Wrangler.',
        'SPA routes served correctly on reload, without relying on a redirects file.',
      ],
    },
  },
  {
    id: 'energy-wise',
    year: '2026',
    title: 'Energy Wise',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5', 'Scrum'],
    links: [
      { label: 'Site', href: 'https://energywise1.netlify.app' },
      { label: 'GitHub', href: 'https://github.com/CodeWatt-UPX3/ENERGY-WISE' },
    ],
    pt: {
      role: 'Front-end · equipe de 5',
      summary:
        'Plataforma web de viabilidade econômica de energia solar, desenvolvida em equipe de cinco pessoas sob Scrum ao longo de um semestre.',
      highlights: [
        'Cálculo de VPL, TIR e Payback do investimento, com resultado apresentado em gráficos.',
        'Interface responsiva em Bootstrap 5, pensada para quem não é do setor técnico.',
        'Trabalho em equipe com ritos de Scrum e divisão de responsabilidades por sprint.',
      ],
    },
    en: {
      role: 'Front-end · team of 5',
      summary:
        'Web platform for assessing the economic viability of solar energy, built by a team of five under Scrum over one semester.',
      highlights: [
        'NPV, IRR and Payback calculations for the investment, presented through charts.',
        'Responsive Bootstrap 5 interface, designed for non-technical audiences.',
        'Teamwork with Scrum ceremonies and responsibilities split per sprint.',
      ],
    },
  },
  {
    id: 'atelier-chris',
    year: '2026',
    title: 'Ateliê Chris Camacho',
    stack: ['Front-end', 'Cloudflare', 'Freelance'],
    links: [],
    pt: {
      role: 'Freelance · site institucional',
      summary:
        'Site institucional para o ateliê, desenvolvido como trabalho freelance e publicado na Cloudflare.',
      highlights: [
        'Projeto entregue direto para a cliente, do layout ao domínio no ar.',
        'Hospedagem e publicação na Cloudflare.',
      ],
    },
    en: {
      role: 'Freelance · brand site',
      summary:
        'Brand site for the atelier, delivered as freelance work and published on Cloudflare.',
      highlights: [
        'Project delivered directly to the client, from layout to live domain.',
        'Hosting and publishing on Cloudflare.',
      ],
    },
  },
  {
    id: 'data-structures',
    year: '2025 — 2026',
    title: { pt: 'Algoritmos & Estruturas de Dados', en: 'Algorithms & Data Structures' },
    stack: [
      'Java',
      { pt: 'POO', en: 'OOP' },
      { pt: 'Árvores', en: 'Trees' },
      { pt: 'Listas encadeadas', en: 'Linked lists' },
    ],
    links: [
      {
        label: { pt: 'Estruturas', en: 'Structures' },
        href: 'https://github.com/danilobossolani/Estrutura-de-Dados-3s',
      },
      { label: 'Ranking', href: 'https://github.com/danilobossolani/Ranking-de-Jogadores-ED' },
      { label: { pt: 'POO', en: 'OOP' }, href: 'https://github.com/danilobossolani/POO-Saves' },
    ],
    pt: {
      role: 'Fundamentos · Java',
      summary:
        'Coleção de implementações em Java feitas ao longo do curso e por conta própria — a base que sustenta o resto do trabalho back-end.',
      highlights: [
        'Sistema de ranking de jogadores e agenda de contatos com árvore binária de busca.',
        'Listas encadeadas, pilhas e filas implementadas do zero, sem biblioteca pronta.',
        'Exercícios de orientação a objetos com foco em modelagem e responsabilidade única.',
      ],
    },
    en: {
      role: 'Fundamentals · Java',
      summary:
        'A collection of Java implementations built through coursework and on my own — the foundation the rest of the back-end work stands on.',
      highlights: [
        'Player ranking system and a contact book backed by a binary search tree.',
        'Linked lists, stacks and queues implemented from scratch, no ready-made library.',
        'Object-oriented exercises focused on modeling and single responsibility.',
      ],
    },
  },
];

type StackGroup = { id: string; pt: string; en: string; items: Localized[] };

export const stackGroups: StackGroup[] = [
  {
    id: 'backend',
    pt: 'Back-end',
    en: 'Back-end',
    items: ['Java', 'Spring Boot', 'Node.js', 'Express', 'FastAPI', 'REST APIs', 'JPA / Hibernate'],
  },
  {
    id: 'frontend',
    pt: 'Front-end',
    en: 'Front-end',
    items: [
      'React',
      'Angular',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Tailwind',
      'Bootstrap',
      'Thymeleaf',
    ],
  },
  {
    id: 'data',
    pt: 'Dados',
    en: 'Data',
    items: [
      'PostgreSQL',
      'SQL',
      'pgvector',
      'Power BI',
      { pt: 'Modelagem relacional', en: 'Relational modeling' },
    ],
  },
  {
    id: 'ai',
    pt: 'IA',
    en: 'AI',
    items: [
      'Gemini API',
      'RAG',
      { pt: 'Busca vetorial', en: 'Vector search' },
      'Claude Code',
      'Codex',
      { pt: 'Engenharia de contexto', en: 'Context engineering' },
    ],
  },
  {
    id: 'infra',
    pt: 'Infra & Ferramentas',
    en: 'Infra & Tooling',
    items: [
      'Git',
      'GitHub',
      'Docker',
      'Cloudflare Workers',
      'GitHub Actions',
      'IntelliJ IDEA',
      'VS Code',
    ],
  },
];

export const content = {
  pt: {
    nav: {
      work: 'Projetos',
      about: 'Sobre',
      stack: 'Stack',
      path: 'Trajetória',
      contact: 'Contato',
      menu: 'Menu',
      close: 'Fechar',
      themeLabel: 'Alternar tema',
      langLabel: 'Switch to English',
    },
    hero: {
      available: 'Disponível para estágio e freelance',
      role: 'Desenvolvedor back-end',
      line1: 'Construo',
      line2: 'APIs, sistemas',
      line3: 'e produtos',
      accent: 'que aguentam o mundo real.',
      intro:
        'Foco em Java e back-end, com gosto real por front-end e full stack. Estudante de ADS na FACENS, em Sorocaba.',
      ctaWork: 'Ver projetos',
      ctaContact: 'Falar comigo',
      scroll: 'Role para ver',
    },
    about: {
      eyebrow: 'Sobre',
      title: 'Quem está do outro lado do commit',
      p1: 'Sou Danilo, desenvolvedor back-end em Sorocaba. Estudo Análise e Desenvolvimento de Sistemas na FACENS e passo a maior parte do tempo em Java e Spring Boot — arquitetura em camadas, APIs REST, modelagem de dados e a parte chata e importante de fazer o sistema não quebrar em produção.',
      p2: 'Meu foco continua sendo back-end, mas front-end nunca foi obrigação para mim: gosto de React e Angular, de cuidar do detalhe visual e de entregar a coisa inteira — do banco até a tela. É o que me deixa confortável em trabalho full stack e em freelance, onde não existe alguém para passar a bola.',
      p3: 'Aprendi que código bom vem de revisão honesta. Uso Claude Code, Codex e Gemini todos os dias como par de revisão — questionar decisão, achar caso de borda, discutir arquitetura antes de escrever. Não é atalho, é um jeito de aprender mais rápido e entregar com menos retrabalho.',
      facts: [
        { label: 'Base', value: 'Sorocaba, SP' },
        { label: 'Formação', value: 'ADS · FACENS · 2025–2027' },
        { label: 'Idiomas', value: 'Português · Inglês B2 · 日本語 A1' },
        { label: 'Foco', value: 'Java · Spring Boot · PostgreSQL' },
      ],
    },
    stack: {
      eyebrow: 'Stack',
      title: 'Ferramentas que uso de verdade',
      note: 'Nada de lista decorativa — é o que aparece nos projetos acima e no dia a dia.',
    },
    ai: {
      eyebrow: 'Como eu trabalho',
      title: 'IA como par, não como piloto automático',
      p: 'Uso Claude Code, Codex e Gemini no fluxo de trabalho todo dia — para revisar código antes do commit, discutir arquitetura antes de escrever a primeira linha, entender stack nova e caçar o caso de borda que eu ainda não tinha enxergado. Também construo com IA: o AutoStore AI é um sistema RAG de ponta a ponta, com busca vetorial em pgvector e respostas ancoradas em dados reais. A decisão continua sendo minha; a máquina só acelera o caminho até ela.',
      cards: [
        {
          title: 'Revisão de código',
          body: 'Segunda leitura em cada mudança relevante — caso de borda, nome ruim, lógica que só funciona no caminho feliz.',
        },
        {
          title: 'Arquitetura',
          body: 'Discutir o desenho antes de escrever: onde a responsabilidade mora, o que vai doer para mudar depois.',
        },
        {
          title: 'Construir com IA',
          body: 'RAG, busca vetorial e integração com LLM em produto de verdade, não em demo de slide.',
        },
        {
          title: 'Aprender mais rápido',
          body: 'Stack nova explicada no contexto do meu código, não em tutorial genérico de internet.',
        },
      ],
    },
    work: {
      eyebrow: 'Projetos',
      title: 'Trabalho selecionado',
      note: 'Projetos autorais, acadêmicos e freelance — do back-end em Java a sistemas com IA.',
      private: 'Código privado',
      viewAll: 'Ver tudo no GitHub',
    },
    path: {
      eyebrow: 'Trajetória',
      title: 'Como cheguei aqui',
      items: [
        {
          period: '2026 — agora',
          title: 'Desenvolvedor freelance',
          org: 'Projetos próprios e para clientes',
          body: 'Sites e sistemas entregues direto para o cliente, do layout ao deploy na Cloudflare. Em paralelo, o Judicial Property Pipeline em Java e Spring Boot.',
        },
        {
          period: '2025 — 2027',
          title: 'Análise e Desenvolvimento de Sistemas',
          org: 'FACENS — Sorocaba, SP',
          body: '4º período. Estruturas de dados, orientação a objetos, banco de dados, engenharia de software e desenvolvimento web.',
        },
        {
          period: 'Out/2025 — Mai/2026',
          title: 'Auxiliar de vendas',
          org: 'JVN Ótica Sorocaba',
          body: 'Atendimento ao público em ambiente de alto fluxo, com metas e trabalho em equipe. Onde aprendi a ouvir o problema antes de propor solução.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contato',
      title: 'Vamos construir algo',
      body: 'Estou aberto a estágio, primeira vaga de desenvolvedor e projetos freelance. Se você tem um problema de back-end, uma API para desenhar ou um site para colocar no ar, me chama.',
      emailLabel: 'E-mail',
      phoneLabel: 'WhatsApp',
      cvLabel: 'Currículo',
      cvValue: 'Baixar PDF',
      copy: 'Copiar e-mail',
      copied: 'Copiado',
    },
    footer: {
      built: 'Feito com React, TypeScript e Tailwind. Publicado no GitHub Pages.',
      rights: 'Todos os direitos reservados.',
      top: 'Voltar ao topo',
    },
  },

  en: {
    nav: {
      work: 'Work',
      about: 'About',
      stack: 'Stack',
      path: 'Path',
      contact: 'Contact',
      menu: 'Menu',
      close: 'Close',
      themeLabel: 'Toggle theme',
      langLabel: 'Mudar para português',
    },
    hero: {
      available: 'Open to internships and freelance',
      role: 'Back-end developer',
      line1: 'I build',
      line2: 'APIs, systems',
      line3: 'and products',
      accent: 'that hold up in the real world.',
      intro:
        'Focused on Java and back-end, with a genuine pull toward front-end and full stack. Systems development student at FACENS, in Sorocaba, Brazil.',
      ctaWork: 'See the work',
      ctaContact: 'Get in touch',
      scroll: 'Scroll',
    },
    about: {
      eyebrow: 'About',
      title: 'Who is on the other side of the commit',
      p1: 'I am Danilo, a back-end developer based in Sorocaba, Brazil. I study Systems Analysis and Development at FACENS and spend most of my time in Java and Spring Boot — layered architecture, REST APIs, data modeling, and the tedious, important work of keeping things from breaking in production.',
      p2: 'Back-end is still my focus, but front-end has never felt like an obligation: I enjoy React and Angular, care about the visual detail, and like shipping the whole thing — from the database to the screen. That is what makes me comfortable in full stack and freelance work, where there is nobody to pass the ball to.',
      p3: 'I learned that good code comes from honest review. I use Claude Code, Codex and Gemini every day as a reviewing partner — to question a decision, find an edge case, argue about architecture before writing anything. Not a shortcut: a way to learn faster and ship with less rework.',
      facts: [
        { label: 'Based in', value: 'Sorocaba, Brazil' },
        { label: 'Studying', value: 'Systems Dev · FACENS · 2025–2027' },
        { label: 'Languages', value: 'Portuguese · English B2 · 日本語 A1' },
        { label: 'Focus', value: 'Java · Spring Boot · PostgreSQL' },
      ],
    },
    stack: {
      eyebrow: 'Stack',
      title: 'Tools I actually use',
      note: 'Not a decorative list — this is what shows up in the projects above and in daily work.',
    },
    ai: {
      eyebrow: 'How I work',
      title: 'AI as a partner, not as autopilot',
      p: 'I use Claude Code, Codex and Gemini across my workflow every day — reviewing code before the commit, arguing about architecture before the first line, learning a new stack, hunting the edge case I had not seen yet. I also build with AI: AutoStore AI is an end-to-end RAG system, with vector search on pgvector and answers grounded in real data. The decision stays mine; the machine just shortens the path to it.',
      cards: [
        {
          title: 'Code review',
          body: 'A second read on every meaningful change — edge cases, bad names, logic that only works on the happy path.',
        },
        {
          title: 'Architecture',
          body: 'Arguing the design before writing it: where responsibility lives, what will hurt to change later.',
        },
        {
          title: 'Building with AI',
          body: 'RAG, vector search and LLM integration in a real product, not in a slide demo.',
        },
        {
          title: 'Learning faster',
          body: 'A new stack explained in the context of my own code, not in a generic internet tutorial.',
        },
      ],
    },
    work: {
      eyebrow: 'Work',
      title: 'Selected projects',
      note: 'Personal, academic and freelance work — from Java back-ends to AI-powered systems.',
      private: 'Private source',
      viewAll: 'See everything on GitHub',
    },
    path: {
      eyebrow: 'Path',
      title: 'How I got here',
      items: [
        {
          period: '2026 — now',
          title: 'Freelance developer',
          org: 'Personal and client projects',
          body: 'Sites and systems delivered straight to the client, from layout to Cloudflare deploy. Alongside it, the Judicial Property Pipeline in Java and Spring Boot.',
        },
        {
          period: '2025 — 2027',
          title: 'Systems Analysis and Development',
          org: 'FACENS — Sorocaba, Brazil',
          body: '4th semester. Data structures, object orientation, databases, software engineering and web development.',
        },
        {
          period: 'Oct 2025 — May 2026',
          title: 'Sales assistant',
          org: 'JVN Ótica Sorocaba',
          body: 'Customer-facing work in a high-traffic store, with targets and teamwork. Where I learned to hear the problem before proposing a solution.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Let us build something',
      body: 'I am open to internships, a first developer role and freelance projects. If you have a back-end problem, an API to design or a site to put online, reach out.',
      emailLabel: 'Email',
      phoneLabel: 'WhatsApp',
      cvLabel: 'Résumé',
      cvValue: 'Download PDF',
      copy: 'Copy email',
      copied: 'Copied',
    },
    footer: {
      built: 'Built with React, TypeScript and Tailwind. Published on GitHub Pages.',
      rights: 'All rights reserved.',
      top: 'Back to top',
    },
  },
};

export type Dict = typeof content.pt;

/** Falha o build se os dois idiomas sairem de sincronia. */
const mesmaForma: Record<Lang, Dict> = content;
void mesmaForma;
