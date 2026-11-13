import { motion } from 'framer-motion';

export default function AboutSection({ onBack }) {
  return (
    <div className="w-full h-full flex flex-col justify-between py-12 px-6 md:px-16 max-w-[1500px] mx-auto select-none text-[var(--text-primary)]">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-wider text-[var(--text-secondary)] uppercase border-b border-[var(--border-primary)] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[var(--accent)] font-semibold">01 / ABOUT</span>
          <span className="opacity-40">•</span>
          <span className="text-[var(--text-secondary)]">IDENTITY & ENGINEERING SPECIFICATION</span>
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

      {/* Main Editorial Content */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Monolithic Headline & Compact Statement */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[10px] tracking-wider text-[var(--accent)] uppercase block mb-3 font-medium">
              PROFILE SPECIFICATION
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-[var(--text-primary)] uppercase tracking-tight leading-[0.95] mb-6">
              DEV MISTRY
              <br />
              <span className="text-[var(--text-secondary)]">SOFTWARE</span>
              <br />
              <span className="text-[var(--accent)]">CLOUD • AI</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed max-w-xl mb-6">
              Building intelligent digital systems across web, cloud, and autonomous AI swarms. Clean architecture, high availability, and deterministic execution.
            </p>
          </motion.div>
        </div>

        {/* Right Column: Technical Attribute Blocks */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-[2px]">
            <span className="text-[9px] tracking-[0.25em] text-[var(--text-muted)] uppercase block mb-1">
              BASED IN
            </span>
            <h4 className="text-sm font-bold text-[var(--text-primary)]">MUMBAI, INDIA</h4>
            <p className="text-[10px] text-[var(--accent)] mt-1">AVAILABLE WORLDWIDE</p>
          </div>

          <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-[2px]">
            <span className="text-[9px] tracking-[0.25em] text-[var(--text-muted)] uppercase block mb-1">
              DISCIPLINES
            </span>
            <h4 className="text-sm font-bold text-[var(--text-primary)]">WEB / CLOUD / AI</h4>
            <p className="text-[10px] text-[var(--accent)] mt-1">DISTRIBUTED SYSTEMS</p>
          </div>

          <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-[2px] sm:col-span-2">
            <span className="text-[9px] tracking-[0.25em] text-[var(--text-muted)] uppercase block mb-1">
              ACTIVE RESEARCH
            </span>
            <h4 className="text-sm font-bold text-[var(--text-primary)]">BUILDING AGENTIC REASONING RUNTIMES</h4>
            <p className="text-[11px] text-[var(--text-secondary)] mt-1 font-sans">
              Decentralized consensus engines, deterministic state constraints, and LLM orchestration networks.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Architectural Metadata */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-[var(--text-secondary)] uppercase border-t border-[var(--border-primary)] pt-4">
        <span>DEV MISTRY // SPEC 01</span>
        <span>MUMBAI • 2026</span>
      </div>
    </div>
  );
}
