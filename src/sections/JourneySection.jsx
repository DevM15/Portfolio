import { motion } from 'framer-motion';

const MILESTONES = [
  {
    year: '2022',
    stage: 'LEARNING',
    focus: 'FOUNDATIONS',
    headline: 'ALGORITHMS & CORE WEB',
    description: 'Mastered JavaScript, data structures, and foundational front-end paradigms.',
  },
  {
    year: '2023',
    stage: 'BUILDING',
    focus: 'FULL-STACK SYSTEMS',
    headline: 'REACTIVE PLATFORMS',
    description: 'Developed complete microservices using React, FastAPI, and relational PostgreSQL storage.',
  },
  {
    year: '2024',
    stage: 'CLOUD',
    focus: 'DEVOPS & AWS',
    headline: 'INFRASTRUCTURE AS CODE',
    description: 'Architected declarative cloud deployments on AWS with Terraform, Docker, and CI/CD meshes.',
  },
  {
    year: '2025',
    stage: 'AI SYSTEMS',
    focus: 'NEURAL & RAG',
    headline: 'INTELLIGENT TELEMETRY',
    description: 'Engineered real-time neural observation pipelines and vector-based semantic retrieval engines.',
  },
  {
    year: '2026',
    stage: 'AGENTIC SWARMS',
    focus: 'AUTONOMOUS REASONING',
    headline: 'MCP & CONSENSUS RUNTIMES',
    description: 'Pioneering decentralized multi-agent execution fabrics with deterministic self-correction.',
  },
];

export default function JourneySection({ onBack }) {
  return (
    <div className="w-full h-full flex flex-col justify-between py-16 px-6 md:px-16 max-w-[1600px] mx-auto select-none text-[var(--text-primary)]">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-wider text-[var(--text-secondary)] uppercase border-b border-[var(--border-primary)] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[var(--accent)] font-bold">04 / JOURNEY</span>
          <span className="opacity-40">•</span>
          <span className="text-[var(--text-secondary)]">HORIZONTAL EVOLUTION TIMELINE</span>
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

      {/* Main Horizontal Timeline Content */}
      <div className="my-auto py-8 overflow-x-auto no-scrollbar">
        <div className="flex items-stretch gap-6 min-w-[1100px] pb-4">
          {MILESTONES.map((m, idx) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex-1 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-[2px] p-6 flex flex-col justify-between shadow-xs hover:border-[var(--accent)] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[9px] text-[var(--text-secondary)] mb-4">
                  <span className="px-2 py-0.5 rounded-[1px] bg-[var(--accent)] text-[#F7F6F2] font-semibold">
                    {m.year}
                  </span>
                  <span>{m.stage}</span>
                </div>

                <div className="font-mono text-[10px] text-[var(--accent)] tracking-wider uppercase mb-1 font-semibold">
                  {m.focus}
                </div>

                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] uppercase tracking-tight mb-2">
                  {m.headline}
                </h3>

                <p className="font-sans text-xs text-[var(--text-secondary)] font-normal leading-relaxed">
                  {m.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-[8px] text-[var(--text-secondary)] uppercase">
                <span>PHASE 0{idx + 1}</span>
                <span className="text-[var(--accent)]">MILESTONE</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-[var(--text-secondary)] uppercase border-t border-[var(--border-primary)] pt-4">
        <span>ARCHITECTURAL TIMELINE</span>
        <span>2022 — 2026</span>
      </div>
    </div>
  );
}
