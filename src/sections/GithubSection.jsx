import { motion } from 'framer-motion';

const REPOSITORIES = [
  {
    name: 'Arcade',
    tagline: 'Architectural portfolio & spatial presentation platform',
    language: 'JavaScript / HTML / CSS',
    stars: 'Public',
    link: 'https://github.com/DevM15/Arcade',
  },
  {
    name: 'PDFdecoder',
    tagline: 'Client-side binary manipulation & document extraction pipeline',
    language: 'JavaScript / PDF.js',
    stars: 'Public',
    link: 'https://github.com/DevM15/PDFdecoder',
  },
  {
    name: 'Futuredesks',
    tagline: 'Responsive workspace infrastructure showcase',
    language: 'JavaScript / Bootstrap',
    stars: 'Public',
    link: 'https://github.com/DevM15/Futuredesks',
  },
  {
    name: 'agentic-consensus',
    tagline: 'Decentralized multi-agent reasoning fabric with MCP interoperability',
    language: 'Python / LangGraph',
    stars: 'Core Engine',
    link: 'https://github.com/DevM15',
  },
];

export default function GithubSection({ onBack }) {
  return (
    <div className="w-full h-full flex flex-col justify-between py-16 px-6 md:px-16 max-w-[1500px] mx-auto select-none text-[var(--text-primary)]">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-wider text-[var(--text-secondary)] uppercase border-b border-[var(--border-primary)] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[var(--accent)] font-semibold">05 / GITHUB</span>
          <span className="opacity-40">•</span>
          <span className="text-[var(--text-secondary)]">BUILDING IN PUBLIC // CODE ARCHIVE</span>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            data-cursor="button"
            className="text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            ← BACK TO HOME
          </button>
        )}
      </div>

      {/* Main Content Area: Overview Metrics + Repository Grid */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Code Archive Header & Minimal Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <span className="font-mono text-[10px] tracking-wider text-[var(--accent)] uppercase block mb-2 font-medium">
              OPEN SOURCE ECOSYSTEM
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[var(--text-primary)] uppercase tracking-tight leading-none mb-4">
              PUBLIC
              <br />
              REPOSITORIES
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Explore public implementations, spatial design prototypes, and core autonomous agentic experiments.
            </p>
          </div>

          <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-[2px] font-mono text-xs space-y-3">
            <div className="flex justify-between items-center text-[var(--text-secondary)]">
              <span>GITHUB PROFILE:</span>
              <a
                href="https://github.com/DevM15"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="archive"
                className="font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
              >
                @DevM15 ↗
              </a>
            </div>
            <div className="flex justify-between items-center text-[var(--text-secondary)]">
              <span>STATUS:</span>
              <span className="font-bold text-[var(--accent)]">ACTIVE COMMITTER</span>
            </div>
          </div>
        </div>

        {/* Right Column: Repository Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {REPOSITORIES.map((repo, idx) => (
            <motion.a
              key={repo.name}
              href={repo.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              data-cursor="archive"
              className="p-5 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-[2px] hover:border-[var(--accent)] transition-all flex flex-col justify-between group shadow-xs hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[9px] text-[var(--text-secondary)] mb-2">
                  <span className="text-[var(--accent)] font-semibold">{repo.stars}</span>
                  <span>OPEN SOURCE</span>
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2">
                  {repo.name} ↗
                </h3>
                <p className="font-sans text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                  {repo.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] font-mono text-[9px] text-[var(--text-secondary)] flex items-center justify-between">
                <span>{repo.language}</span>
                <span className="text-[var(--accent)] group-hover:translate-x-1 transition-transform">VIEW →</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Bottom Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-[var(--text-secondary)] uppercase border-t border-[var(--border-primary)] pt-4">
        <span>DEV MISTRY // CODE REPOSITORIES</span>
        <span>GITHUB CLOUD</span>
      </div>
    </div>
  );
}
