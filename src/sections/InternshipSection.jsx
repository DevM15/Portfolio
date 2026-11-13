import { motion } from 'framer-motion';

const INTERNSHIPS = [
  {
    id: '01',
    company: 'HORIZON VIEW',
    badge: 'INTERNSHIP // CORE',
    role: 'FULL STACK DEVELOPER & UI/UX INTERN',
    period: '2024 — 2025',
    location: 'HYBRID',
    description: 'Shipped high-performance web applications with Next.js and FastAPI. Architected resilient microservices and continuous telemetry integration.',
    technologies: ['NEXT.JS', 'REACT', 'FASTAPI', 'POSTGRESQL', 'DOCKER'],
  },
  {
    id: '02',
    company: 'APPLIED AI LABS',
    badge: 'RESEARCH // ORCHESTRATION',
    role: 'AGENTIC AI & CLOUD INTERN',
    period: '2025 — PRESENT',
    location: 'REMOTE',
    description: 'Engineered multi-agent consensus protocols, semantic retrieval pipelines, and containerized cloud deployments on AWS with automated telemetry.',
    technologies: ['PYTHON', 'LANGGRAPH', 'MCP PROTOCOL', 'AWS ECS', 'TERRAFORM'],
  },
];

export default function InternshipSection({ onBack }) {
  return (
    <div className="w-full h-full flex flex-col justify-between py-12 px-6 md:px-16 max-w-[1500px] mx-auto select-none text-[var(--text-primary)]">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-wider text-[var(--text-secondary)] uppercase border-b border-[var(--border-primary)] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[var(--accent)] font-semibold">02 / INTERNSHIP</span>
          <span className="opacity-40">•</span>
          <span className="text-[var(--text-secondary)]">COMMISSIONED EXPERIENCE ARCHIVE</span>
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

      {/* Main Internship Horizontal Panels */}
      <div className="my-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        {INTERNSHIPS.map((intern, idx) => (
          <motion.div
            key={intern.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.12 }}
            className="p-8 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-[2px] flex flex-col justify-between shadow-xs hover:border-[var(--accent)] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-[9px] tracking-wider text-[var(--text-secondary)] uppercase mb-3">
                <span className="text-[var(--accent)] font-semibold">{intern.badge}</span>
                <span>{intern.period}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] uppercase tracking-tight leading-none mb-1">
                {intern.company}
              </h3>

              <div className="font-mono text-xs text-[var(--accent)] tracking-wider uppercase mb-4 font-semibold">
                {intern.role}
              </div>

              <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                {intern.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap gap-2">
              {intern.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[9px] tracking-wider uppercase px-2 py-1 bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-secondary)] rounded-[1px]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-[var(--text-secondary)] uppercase border-t border-[var(--border-primary)] pt-4">
        <span>DEV MISTRY // ROLES</span>
        <span>VERIFIED RECORD</span>
      </div>
    </div>
  );
}
