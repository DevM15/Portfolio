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
    <div className="w-full h-full flex flex-col justify-between py-12 px-6 md:px-16 max-w-[1500px] mx-auto select-none">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#626A65] uppercase border-b border-[#2A302C] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[#65E6D2] font-bold">02 / INTERNSHIP</span>
          <span className="text-white/10">•</span>
          <span className="text-[#9EA49F]">COMMISSIONED EXPERIENCE ARCHIVE</span>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            className="text-[#65E6D2] hover:text-white transition-colors cursor-pointer"
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
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.12 }}
            className="group relative bg-[#111513] border border-[#2A302C] p-8 rounded-[2px] shadow-xl hover:border-[#65E6D2]/40 transition-colors"
          >
            {/* Top Micro Label */}
            <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-[#626A65] uppercase pb-4 border-b border-[#2A302C] mb-6">
              <span className="text-[#65E6D2]">{intern.badge}</span>
              <span>{intern.period}</span>
            </div>

            {/* Company Name in Large Typography */}
            <h3 className="text-3xl sm:text-4xl font-display font-black text-[#F1EFE8] uppercase tracking-tight leading-none mb-2 group-hover:text-[#65E6D2] transition-colors">
              {intern.company}
            </h3>

            {/* Role & Location */}
            <p className="font-mono text-[11px] text-[#9EA49F] tracking-wider uppercase mb-5">
              {intern.role} • {intern.location}
            </p>

            {/* 1-2 Line Crisp Description */}
            <p className="font-sans text-xs sm:text-sm text-[#9EA49F] leading-relaxed font-light mb-6">
              {intern.description}
            </p>

            {/* Technology Tags */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[#2A302C]">
              {intern.technologies.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[9px] px-2.5 py-1 bg-[#171B19] border border-[#2A302C] text-[#9EA49F] uppercase rounded-[2px]"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Technical Note */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#626A65] uppercase border-t border-[#2A302C] pt-4">
        <span>03 / 08 INDUSTRY ARCHIVE</span>
        <span>NEXT: FEATURED PROJECTS →</span>
      </div>
    </div>
  );
}
