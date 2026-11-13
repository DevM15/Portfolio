// Clean architectural SVG icons and metadata for core programming languages & runtimes

export const PROGRAMMING_LANGUAGES = [
  {
    id: 'typescript',
    title: 'TypeScript',
    badge: 'Strict Types',
    category: 'Full Stack',
    level: 'Advanced',
    experience: '4+ Years',
    description: 'Static type checking, interfaces, generics, and enterprise scalable architecture.',
    iconSvg: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect width="48" height="48" rx="8" fill="#3178C6" fillOpacity="0.15" stroke="#3178C6" strokeWidth="1.5" />
        <path d="M12 18H24M18 18V34" stroke="#3178C6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 31C27.5 32.5 30 33.5 32.5 33.5C35 33.5 36.5 32 36.5 30C36.5 26.5 27 27.5 27 22.5C27 20 29 18 32.5 18C34.5 18 36.5 19 37.5 20" stroke="#3178C6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'python',
    title: 'Python',
    badge: 'AI & Backend',
    category: 'Intelligence',
    level: 'Advanced',
    experience: '4+ Years',
    description: 'FastAPI, PyTorch, LangChain, algorithmic pipelines, and high-throughput data processing.',
    iconSvg: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect width="48" height="48" rx="8" fill="#3776AB" fillOpacity="0.15" stroke="#3776AB" strokeWidth="1.5" />
        <path d="M23 12C17.5 12 18 14.5 18 14.5V17H24V18H15C15 18 12 17.5 12 23C12 28.5 14.5 28 14.5 28H17V25.5C17 25.5 16.5 22 20.5 22H27C27 22 30 22 30 19V14.5C30 14.5 30.5 12 23 12Z" stroke="#3776AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="15" r="1" fill="#3776AB" />
        <path d="M25 36C30.5 36 30 33.5 30 33.5V31H24V30H33C33 30 36 30.5 36 25C36 19.5 33.5 20 33.5 20H31V22.5C31 22.5 31.5 26 27.5 26H21C21 26 18 26 18 29V33.5C18 33.5 17.5 36 25 36Z" stroke="#E5A93C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="28" cy="33" r="1" fill="#E5A93C" />
      </svg>
    )
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    badge: 'ESNext Core',
    category: 'Client & Server',
    level: 'Mastery',
    experience: '5+ Years',
    description: 'Modern asynchronous programming, event loop internals, V8 optimizations, and DOM mastery.',
    iconSvg: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect width="48" height="48" rx="8" fill="#F7DF1E" fillOpacity="0.15" stroke="#F7DF1E" strokeWidth="1.5" />
        <path d="M19 23V31C19 33 17.5 34 15 34C13 34 11.5 33 11 32" stroke="#F7DF1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 31C27.5 32.5 30 33.5 32.5 33.5C35.5 33.5 37 32 37 30C37 26.5 27 27.5 27 22.5C27 20 29 18 32.5 18C34.5 18 36.5 19 37.5 20" stroke="#F7DF1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'go',
    title: 'Go (Golang)',
    badge: 'Concurrent Core',
    category: 'Cloud Services',
    level: 'Intermediate',
    experience: '2+ Years',
    description: 'Goroutines, channels, deterministic microservices, and network proxies.',
    iconSvg: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect width="48" height="48" rx="8" fill="#00ADD8" fillOpacity="0.15" stroke="#00ADD8" strokeWidth="1.5" />
        <path d="M14 24C14 19.5 17 16 22 16C26 16 28.5 18.5 29.5 21H22M22 25H29.5V31C27.5 32 25 32 22 32C17 32 14 28.5 14 24Z" stroke="#00ADD8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M33 22H37M32 26H36M33 30H38" stroke="#00ADD8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'rust',
    title: 'Rust',
    badge: 'Memory Safe',
    category: 'Systems & WASM',
    level: 'Working Knowledge',
    experience: '1+ Years',
    description: 'Ownership semantics, borrow checker, concurrency primitives, and WebAssembly compilation.',
    iconSvg: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect width="48" height="48" rx="8" fill="#CE412B" fillOpacity="0.15" stroke="#CE412B" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="12" stroke="#CE412B" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M19 18H25C27 18 28.5 19.5 28.5 21.5C28.5 23.5 27 25 25 25H19V32M19 25H24L28 32" stroke="#CE412B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'sql',
    title: 'PostgreSQL / SQL',
    badge: 'Relational DB',
    category: 'Persistence',
    level: 'Advanced',
    experience: '4+ Years',
    description: 'ACID transactions, indexed schemas, query execution plans, CTEs, and connection pooling.',
    iconSvg: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect width="48" height="48" rx="8" fill="#336791" fillOpacity="0.15" stroke="#336791" strokeWidth="1.5" />
        <ellipse cx="24" cy="16" rx="12" ry="4" stroke="#336791" strokeWidth="2" />
        <path d="M12 16V24C12 26.2 17.4 28 24 28C30.6 28 36 26.2 36 24V16" stroke="#336791" strokeWidth="2" />
        <path d="M12 24V32C12 34.2 17.4 36 24 36C30.6 36 36 34.2 36 32V24" stroke="#336791" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: 'nodejs',
    title: 'Node.js',
    badge: 'Async Engine',
    category: 'Runtime',
    level: 'Advanced',
    experience: '4+ Years',
    description: 'Event-driven non-blocking I/O, stream processing, clusters, and native modules.',
    iconSvg: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect width="48" height="48" rx="8" fill="#5FA04E" fillOpacity="0.15" stroke="#5FA04E" strokeWidth="1.5" />
        <path d="M24 12L35 18.5V31.5L24 38L13 31.5V18.5L24 12Z" stroke="#5FA04E" strokeWidth="2" strokeLinejoin="round" />
        <path d="M24 19V29M20 23L24 25L28 23" stroke="#5FA04E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'cpp',
    title: 'C / C++',
    badge: 'Low Latency',
    category: 'Systems',
    level: 'Proficient',
    experience: '3+ Years',
    description: 'Memory layout, pointers, cache coherence, algorithms, and high-performance computation.',
    iconSvg: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect width="48" height="48" rx="8" fill="#00599C" fillOpacity="0.15" stroke="#00599C" strokeWidth="1.5" />
        <path d="M22 18C20 16 16 16 14 18C11 21 11 27 14 30C16 32 20 32 22 30" stroke="#00599C" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M27 24H31M29 22V26M34 24H38M36 22V26" stroke="#00599C" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'bash',
    title: 'Bash / Shell',
    badge: 'Linux Runtime',
    category: 'Infrastructure',
    level: 'Advanced',
    experience: '4+ Years',
    description: 'POSIX compliance, piping, daemon supervision, systemd units, and deployment scripting.',
    iconSvg: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect width="48" height="48" rx="8" fill="#4EAA25" fillOpacity="0.15" stroke="#4EAA25" strokeWidth="1.5" />
        <path d="M14 18L21 24L14 30" stroke="#4EAA25" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 30H34" stroke="#4EAA25" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'graphql',
    title: 'GraphQL',
    badge: 'Schema APIs',
    category: 'API Contract',
    level: 'Advanced',
    experience: '3+ Years',
    description: 'Strongly typed queries, resolvers, federated schemas, batching, and DataLoader caches.',
    iconSvg: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect width="48" height="48" rx="8" fill="#E10098" fillOpacity="0.15" stroke="#E10098" strokeWidth="1.5" />
        <polygon points="24,14 34,20 34,30 24,36 14,30 14,20" stroke="#E10098" strokeWidth="2" />
        <line x1="24" y1="14" x2="24" y2="36" stroke="#E10098" strokeWidth="1.5" />
        <line x1="14" y1="20" x2="34" y2="30" stroke="#E10098" strokeWidth="1.5" />
        <line x1="14" y1="30" x2="34" y2="20" stroke="#E10098" strokeWidth="1.5" />
        <circle cx="24" cy="14" r="2" fill="#E10098" />
        <circle cx="34" cy="20" r="2" fill="#E10098" />
        <circle cx="34" cy="30" r="2" fill="#E10098" />
        <circle cx="24" cy="36" r="2" fill="#E10098" />
        <circle cx="14" cy="30" r="2" fill="#E10098" />
        <circle cx="14" cy="20" r="2" fill="#E10098" />
      </svg>
    )
  },
  {
    id: 'solidity',
    title: 'Solidity',
    badge: 'Smart Contracts',
    category: 'Web3 & EVM',
    level: 'Proficient',
    experience: '2+ Years',
    description: 'EVM opcode optimization, gas profiling, reentrancy guards, and cryptographic verification.',
    iconSvg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect width="48" height="48" rx="8" fill="#627EEA" fillOpacity="0.15" stroke="#627EEA" strokeWidth="1.5" />
        <path d="M24 12L31 24L24 28L17 24L24 12Z" stroke="#627EEA" strokeWidth="2" strokeLinejoin="round" />
        <path d="M17 26L24 36L31 26L24 29.5L17 26Z" stroke="#627EEA" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'htmlcss',
    title: 'HTML5 & CSS3',
    badge: 'DOM & Design',
    category: 'UI Architecture',
    level: 'Mastery',
    experience: '5+ Years',
    description: 'Semantic markup, accessibility (a11y), CSS Grid, 3D CSS transforms, and design tokens.',
    iconSvg: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect width="48" height="48" rx="8" fill="#E34F26" fillOpacity="0.15" stroke="#E34F26" strokeWidth="1.5" />
        <path d="M14 16H34L32 30L24 33L16 30L15 23H29" stroke="#E34F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
];
