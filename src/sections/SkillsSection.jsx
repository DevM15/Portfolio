import { motion } from 'framer-motion';

const STACK_MAP = [
  {
    category: 'WEB',
    description: 'Reactive client architecture & high-throughput APIs',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit'],
  },
  {
    category: 'BACKEND',
    description: 'Deterministic micro-services & stateful storage',
    skills: ['Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    category: 'CLOUD & DEVOPS',
    description: 'Multi-region topology & zero-trust boundaries',
    skills: ['AWS ECS / S3', 'Terraform IaC', 'Docker', 'Kubernetes', 'CI/CD Pipelines'],
  },
  {
    category: 'AGENTIC AI',
    description: 'Cognitive reasoning networks & model telemetry',
    skills: ['LangGraph', 'MCP Protocol', 'LLM Agents', 'RAG Retrieval', 'Computer Vision / PyTorch'],
  },
];

export default function SkillsSection({ onBack }) {
  return (
    <div className="w-full h-full flex flex-col justify-between py-16 px-6 md:px-16 max-w-[1500px] mx-auto select-none text-[var(--text-primary)]">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-wider text-[var(--text-secondary)] uppercase border-b border-[var(--border-primary)] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[var(--accent)] font-semibold">03 / SKILLS</span>
          <span className="opacity-40">•</span>
          <span className="text-[var(--text-secondary)]">DIGITAL TECHNICAL MAP & CAPABILITIES</span>
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

      {/* Main Technical Map Grid */}
      <div className="my-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {STACK_MAP.map((group, idx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="p-6 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-[2px] flex flex-col justify-between shadow-xs hover:border-[var(--accent)] transition-colors"
          >
            <div>
              <div className="font-mono text-[9px] tracking-wider text-[var(--accent)] uppercase mb-2 font-semibold">
                DOMAIN / 0{idx + 1}
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] uppercase tracking-tight leading-none mb-3">
                {group.category}
              </h3>
              <p className="font-sans text-xs text-[var(--text-secondary)] font-normal leading-relaxed mb-6">
                {group.description}
              </p>
            </div>

            <ul className="space-y-2.5 font-mono text-xs border-t border-[var(--border-subtle)] pt-4">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center justify-between text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <span>{skill}</span>
                  <span className="text-[var(--accent)] text-[10px]">↗</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Bottom Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-[var(--text-secondary)] uppercase border-t border-[var(--border-primary)] pt-4">
        <span>ARCHITECTURAL STACK MAP</span>
        <span>DEPLOYABLE 2026</span>
      </div>
    </div>
  );
}
