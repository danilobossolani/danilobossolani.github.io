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
  location: {
    pt: 'Sorocaba, SP · remoto, híbrido ou presencial',
    en: 'Sorocaba, Brazil · remote (GMT-3)',
  } as Localized,
  github: 'https://github.com/danilobossolani',
  githubHandle: 'danilobossolani',
  linkedin: 'https://linkedin.com/in/danilobossolani',
  linkedinHandle: 'danilobossolani',
  // Os PDFs moram em public/, entao sao servidos na raiz do site.
  cv: {
    pt: '/Curriculo_Danilo_Bossolani_PT.pdf',
    en: '/Resume_Danilo_Bossolani_EN.pdf',
  },
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
  year: Localized;
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
    stack: ['Java 21', 'Spring Boot', 'JPA', 'PostgreSQL', 'Docker', 'Thymeleaf', 'Playwright'],
    featured: true,
    private: true,
    links: [],
    pt: {
      role: 'Freelance · sistema sob medida para cliente',
      summary:
        'Sistema em Java e Spring Boot, em uso por um cliente, que coleta e organiza imóveis de leilão judicial. Código e dados privados por confidencialidade do cliente.',
      highlights: [
        'Coleta automática de imóveis de leilão judicial em várias fontes públicas (Sorocaba e Votorantim), cruzando com dados processuais.',
        'Deduplicação de cadastros, filtros (cidade, bairro, status), acompanhamento de praças e valores, e central de auditoria com histórico de cada coleta.',
        'Feito para usuário não técnico: abre por atalho, roda no navegador e tem encerramento seguro que libera recursos sem apagar banco nem histórico.',
      ],
    },
    en: {
      role: 'Freelance · custom system for a client',
      summary:
        'Java and Spring Boot system, used by a client, that collects and tracks judicial-auction properties. Source code and data are private under client confidentiality.',
      highlights: [
        'Automatically collects judicial-auction property listings from several public sources and cross-references them with court case data.',
        'Duplicate detection, filters (city, neighborhood, status), tracking of auction rounds and prices, and an audit center logging every collection run.',
        'Built for a non-technical user: opens from a desktop shortcut, runs in the browser, and has a safe shutdown that frees resources without losing the database or history.',
      ],
    },
  },
  {
    id: 'atelier-chris',
    year: '2026',
    title: 'Ateliê Chris Camacho',
    stack: ['React', 'Vite', 'Cloudflare Workers'],
    links: [],
    pt: {
      role: 'Freelance · ateliê de cerâmica, São Paulo',
      summary:
        'Site do Ateliê Chris Camacho, entregue como trabalho freelance e publicado na Cloudflare.',
      highlights: [
        'Página própria por atividade (jantares, aulas, decalques), com FAQ.',
        'Contato pelo WhatsApp com mensagem pré-preenchida.',
        'Site estático com CSP restritiva e deploy na Cloudflare.',
      ],
    },
    en: {
      role: 'Freelance · ceramics studio, São Paulo',
      summary:
        'Website for the Ateliê Chris Camacho ceramics studio, delivered as freelance work and deployed on Cloudflare.',
      highlights: [
        'A page per activity (dinners, classes, decals), with FAQs.',
        'WhatsApp contact using pre-filled messages.',
        'Static site with a strict CSP, deployed on Cloudflare.',
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
      role: 'Teste técnico de processo seletivo · RAG',
      summary:
        'Catálogo de veículos com captura de leads em PostgreSQL e assistente de IA baseado em RAG.',
      highlights: [
        'Embeddings no pgvector com busca por distância de cosseno.',
        'O assistente responde só com dados do catálogo e mantém o histórico da conversa.',
        '17+ commits em Conventional Commits.',
      ],
    },
    en: {
      role: 'Take-home test for a hiring process · RAG',
      summary: 'Car catalog with lead capture in PostgreSQL and a RAG-based AI assistant.',
      highlights: [
        'Embeddings in pgvector with cosine-distance search.',
        'The assistant answers only from catalog data and keeps conversation history.',
        '17+ commits using Conventional Commits.',
      ],
    },
  },
  {
    id: 'party-landing',
    year: '2026',
    title: '+Party Landing Page',
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
    year: { pt: 'mar – jun/2026', en: 'Mar – Jun 2026' },
    title: 'Energy Wise',
    stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap 5'],
    links: [
      { label: 'Site', href: 'https://energywise1.netlify.app' },
      { label: 'GitHub', href: 'https://github.com/CodeWatt-UPX3/ENERGY-WISE' },
    ],
    pt: {
      role: 'Projeto acadêmico · equipe de 5 com Scrum',
      summary:
        'Calculadora de viabilidade econômica de energia solar, feita em equipe de cinco pessoas com Scrum.',
      highlights: [
        'Cálculo de VPL, TIR e payback do investimento, com o resultado exibido em gráficos.',
        'Trabalho em equipe com Scrum e divisão de responsabilidades por sprint.',
      ],
    },
    en: {
      role: 'University team project · 5 people, Scrum',
      summary: 'Solar energy investment calculator, built by a team of five using Scrum.',
      highlights: [
        'NPV, IRR and payback calculations for the investment, shown in charts.',
        'Teamwork under Scrum, with responsibilities split per sprint.',
      ],
    },
  },
  {
    id: 'data-structures',
    year: '2025 a 2026',
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
        'Coleção de implementações em Java feitas ao longo do curso e por conta própria. É a base que sustenta o resto do trabalho back-end.',
      highlights: [
        'Sistema de ranking de jogadores e agenda de contatos com árvore binária de busca.',
        'Listas encadeadas, pilhas e filas implementadas do zero, sem biblioteca pronta.',
        'Exercícios de orientação a objetos com foco em modelagem e responsabilidade única.',
      ],
    },
    en: {
      role: 'Fundamentals · Java',
      summary:
        'A collection of Java implementations built through coursework and on my own. It is the foundation the rest of the back-end work stands on.',
      highlights: [
        'Player ranking system and a contact book backed by a binary search tree.',
        'Linked lists, stacks and queues implemented from scratch, no ready-made library.',
        'Object-oriented exercises focused on modeling and single responsibility.',
      ],
    },
  },
];

type StackGroup = { id: string; pt: string; en: string; items: Localized[] };

// Os mesmos quatro niveis do curriculo, na mesma ordem.
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
      'Thymeleaf',
      'Playwright',
      'pgvector',
      'Python/FastAPI',
      'GitHub Actions',
      'Tailwind',
      'Bootstrap',
    ],
  },
  {
    id: 'ai',
    pt: 'IA no desenvolvimento',
    en: 'AI-assisted dev',
    items: [
      {
        pt: 'Claude Code no dia a dia, sempre revisando o código gerado',
        en: 'Claude Code daily, always reviewing generated code',
      },
      {
        pt: 'Integração de LLM via API (Gemini, RAG com pgvector)',
        en: 'LLM integration via API (Gemini, RAG on pgvector)',
      },
      {
        pt: 'Curso de Engenharia de Prompt (DIO/Bradesco)',
        en: 'Prompt Engineering course (DIO/Bradesco)',
      },
    ],
  },
  {
    id: 'fundamentals',
    pt: 'Fundamentos',
    en: 'Fundamentals',
    items: [
      { pt: 'POO', en: 'OOP' },
      { pt: 'APIs REST', en: 'REST APIs' },
      { pt: 'Arquitetura em camadas', en: 'Layered architecture' },
      'UML',
      'Scrum',
      { pt: 'Estruturas de dados', en: 'Data structures' },
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
      available: 'Disponível para primeira vaga como dev júnior · CLT ou PJ',
      role: 'Desenvolvedor Back-end Júnior · Java · Spring Boot · Node.js',
      line1: 'Construo',
      line2: 'APIs, sistemas',
      line3: 'e produtos',
      accent: 'que aguentam o mundo real.',
      intro:
        'Desenvolvo back-end em Java e Spring Boot com PostgreSQL e também trabalho com Node.js e TypeScript. Desde agosto de 2026 atuo como freelancer e entrego software para clientes reais, do levantamento de requisitos ao deploy. Estou no 4º período de ADS na FACENS, com conclusão prevista para junho de 2027.',
      ctaWork: 'Ver projetos',
      ctaContact: 'Falar comigo',
      cv: 'Baixar currículo',
      cvPt: 'Baixar currículo em português',
      cvEn: 'Baixar currículo em inglês',
      scroll: 'Role para ver',
    },
    about: {
      eyebrow: 'Sobre',
      title: 'Quem está do outro lado do commit',
      p1: 'Sou Danilo, desenvolvedor back-end júnior em Sorocaba. Trabalho principalmente com Java 21, Spring Boot, JPA e PostgreSQL, e também com Node.js, TypeScript e Express. Estou no 4º período de Análise e Desenvolvimento de Sistemas na FACENS, com conclusão prevista para junho de 2027.',
      p2: 'Desde agosto de 2026 atuo como freelancer: escopo, prazo, desenvolvimento, deploy e suporte negociados direto com o cliente. Hoje tenho um sistema em Java e Spring em uso por um cliente, que coleta e organiza imóveis de leilão judicial, e um site no ar para um ateliê de cerâmica em São Paulo.',
      p3: 'Uso Claude Code no dia a dia e sempre reviso o código gerado. Também integro LLM via API: o AutoStore AI é um assistente RAG com pgvector que responde só com base nos dados do catálogo. Agora busco minha primeira vaga como dev júnior, CLT ou PJ.',
      facts: [
        { label: 'Base', value: 'Sorocaba, SP · remoto, híbrido ou presencial' },
        { label: 'Formação', value: 'ADS · FACENS · 2025 – jun/2027 · 4º período' },
        {
          label: 'Idiomas',
          value: 'Português nativo · Inglês B2 · Espanhol intermediário · Japonês A1',
        },
        {
          label: 'Disponibilidade',
          value: 'CLT ou PJ · remoto em todo o Brasil ou presencial/híbrido em Sorocaba',
        },
      ],
    },
    stack: {
      eyebrow: 'Stack',
      title: 'Ferramentas que uso de verdade',
      note: 'Separado por nível: o que uso no dia a dia e o que já usei em projeto.',
    },
    ai: {
      eyebrow: 'Como eu trabalho',
      title: 'IA como par, não como piloto automático',
      p: 'Uso Claude Code no dia a dia e sempre reviso o código gerado. A decisão continua sendo minha; a ferramenta só acelera o caminho até ela. Também integro LLM via API: no AutoStore AI, os embeddings ficam no pgvector, a busca é por distância de cosseno e o assistente responde só com dados do catálogo.',
      cards: [
        {
          title: 'Claude Code no dia a dia',
          body: 'Faz parte do meu fluxo de desenvolvimento para escrever, entender e ajustar código.',
        },
        {
          title: 'Revisão do código gerado',
          body: 'Todo código gerado passa pela minha revisão antes de entrar no projeto.',
        },
        {
          title: 'RAG com pgvector',
          body: 'No AutoStore AI: embeddings no pgvector, busca por distância de cosseno e respostas só com dados do catálogo.',
        },
        {
          title: 'Engenharia de Prompt',
          body: 'Curso de Engenharia de Prompt pela DIO/Bradesco.',
        },
      ],
    },
    work: {
      eyebrow: 'Projetos',
      title: 'Trabalho selecionado',
      note: 'Trabalho freelance para clientes, teste técnico e projetos acadêmicos e em equipe, do back-end em Java a sistemas com IA.',
      private: 'Código privado',
      viewAll: 'Ver tudo no GitHub',
    },
    path: {
      eyebrow: 'Trajetória',
      title: 'Como cheguei aqui',
      items: [
        {
          period: 'ago/2026 – atual',
          title: 'Desenvolvedor Freelance',
          org: 'Autônomo · remoto',
          body: 'Escopo, prazo, desenvolvimento, deploy e suporte negociados direto com o cliente. Entregas: o Judicial Property Pipeline, em Java e Spring Boot, e o site do Ateliê Chris Camacho.',
        },
        {
          period: '2025 – jun/2027',
          title: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
          org: 'FACENS · Sorocaba, SP',
          body: '4º período, conclusão prevista para junho de 2027. Fundamentos: POO, APIs REST, arquitetura em camadas, UML, Scrum e estruturas de dados.',
        },
        {
          period: 'out/2025 – mai/2026',
          title: 'Auxiliar de Pós-vendas',
          org: 'Óticas Prevent · Sorocaba',
          body: 'Pós-venda e atendimento em loja de alto fluxo com metas; cadastro e atualização de dados de clientes no sistema de gestão da loja.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contato',
      title: 'Vamos construir algo',
      body: 'Busco minha primeira vaga como dev júnior, CLT ou PJ, remoto em todo o Brasil ou presencial/híbrido em Sorocaba. Se você tem uma vaga ou um projeto de back-end, me chama.',
      emailLabel: 'E-mail',
      phoneLabel: 'WhatsApp',
      cvLabel: 'Currículo',
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
      available: 'Open to a first junior developer role · contractor or full-time',
      role: 'Junior Backend Developer · Java · Spring Boot · Node.js',
      line1: 'I build',
      line2: 'APIs, systems',
      line3: 'and products',
      accent: 'that hold up in the real world.',
      intro:
        "I build backends in Java and Spring Boot with PostgreSQL, and also work with Node.js and TypeScript. Since August 2026 I've been freelancing, shipping software to real clients from requirements to deployment. I'm finishing an associate degree in Systems Analysis and Development (expected June 2027).",
      ctaWork: 'See the work',
      ctaContact: 'Get in touch',
      cv: 'Download résumé',
      cvPt: 'Download résumé in Portuguese',
      cvEn: 'Download résumé in English',
      scroll: 'Scroll',
    },
    about: {
      eyebrow: 'About',
      title: 'Who is on the other side of the commit',
      p1: "I'm Danilo, a junior backend developer based in Sorocaba, Brazil. I work mainly with Java 21, Spring Boot, JPA and PostgreSQL, and also with Node.js, TypeScript and Express. I'm finishing an associate degree in Systems Analysis and Development at FACENS, expected June 2027.",
      p2: "Since August 2026 I've been freelancing: I handle scope, timeline, development, deployment and support directly with each client. Right now that means a Java/Spring system used by a client, which collects and tracks judicial-auction properties, and a live website for a ceramics studio in São Paulo.",
      p3: "I use Claude Code daily and always review the generated code. I also integrate LLMs via API: AutoStore AI is a RAG assistant on pgvector that answers only from catalog data. I'm looking for my first role as a junior developer, contractor or full-time.",
      facts: [
        { label: 'Based in', value: 'Sorocaba, Brazil · remote (GMT-3)' },
        { label: 'Studying', value: 'Systems Analysis & Dev · FACENS · 2025 – Jun 2027' },
        {
          label: 'Languages',
          value: 'Portuguese (native) · English (B2) · Spanish (intermediate) · Japanese (A1)',
        },
        {
          label: 'Availability',
          value: 'GMT-3, overlaps US business hours · contractor or full-time',
        },
      ],
    },
    stack: {
      eyebrow: 'Stack',
      title: 'Tools I actually use',
      note: 'Split by level: what I use daily and what I have used in projects.',
    },
    ai: {
      eyebrow: 'How I work',
      title: 'AI as a partner, not as autopilot',
      p: 'I use Claude Code daily and always review the generated code. The decision stays mine; the tool just shortens the path to it. I also integrate LLMs via API: in AutoStore AI, embeddings live in pgvector, search uses cosine distance and the assistant answers only from catalog data.',
      cards: [
        {
          title: 'Claude Code daily',
          body: 'Part of my development workflow for writing, understanding and adjusting code.',
        },
        {
          title: 'Reviewing generated code',
          body: 'Every piece of generated code goes through my review before it enters the project.',
        },
        {
          title: 'RAG on pgvector',
          body: 'In AutoStore AI: embeddings in pgvector, cosine-distance search and answers only from catalog data.',
        },
        {
          title: 'Prompt Engineering',
          body: 'Prompt Engineering course by DIO/Bradesco.',
        },
      ],
    },
    work: {
      eyebrow: 'Work',
      title: 'Selected projects',
      note: 'Freelance client work, a take-home test, and academic and team projects, from Java backends to AI systems.',
      private: 'Private source',
      viewAll: 'See everything on GitHub',
    },
    path: {
      eyebrow: 'Path',
      title: 'How I got here',
      items: [
        {
          period: 'Aug 2026 – present',
          title: 'Freelance Developer',
          org: 'Self-employed · remote',
          body: 'I handle scope, timeline, development, deployment and support directly with each client. Delivered so far: the Judicial Property Pipeline, in Java and Spring Boot, and the Ateliê Chris Camacho website.',
        },
        {
          period: '2025 – Jun 2027',
          title: 'Associate Degree in Systems Analysis and Development',
          org: 'FACENS · Sorocaba, Brazil',
          body: 'Expected June 2027. Fundamentals: OOP, REST APIs, layered architecture, UML, Scrum and data structures.',
        },
        {
          period: 'Oct 2025 – May 2026',
          title: 'After-sales Assistant',
          org: 'Óticas Prevent (optical retail) · Brazil',
          body: "After-sales and customer service in a high-traffic, target-driven store; kept customer records up to date in the store's management system.",
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Let us build something',
      body: "I'm looking for my first role as a junior developer, contractor or full-time. I work remotely from Brazil (GMT-3), overlapping US business hours. If you have an opening or a backend project, reach out.",
      emailLabel: 'Email',
      phoneLabel: 'WhatsApp',
      cvLabel: 'Résumé',
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
