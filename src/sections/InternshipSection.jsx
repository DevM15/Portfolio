import { motion } from 'framer-motion';

const INTERNSHIPS = [
  {
    id: '01',
    company: 'HORIZON VIEW',
    badge: 'INTERNSHIP // CORE',
    role: 'FULL-STACK DEVELOPER & UI/UX INTERN',
    period: '2024 — 2025',
    location: 'HYBRID',
    description: 'Designed and shipped high-performance customer-facing web applications in Next.js and FastAPI. Integrated stateful micro-services and telemetry pipelines.',
    technologies: ['NEXT.JS', 'REACT', 'FASTAPI', 'POSTGRESQL', 'DOCKER'],
  },
  {
    id: '02',
    company: 'APPLIED AI LABS',
    badge: 'RESEARCH // ORCHESTRATION',
    role: 'AGENTIC AI & CLOUD INTERN',
    period: '2025 — PRESENT',
    location: 'REMOTE',
    description: 'Engineered multi-agent consensus networks, RAG search pipelines, and automated cloud deployments on AWS with automated canary verification.',
    technologies: ['PYTHON', 'LANGGRAPH', 'MCP PROTOCOL', 'AWS ECS', 'TERRAFORM'],
  },
];

export default function InternshipSection() {
  return (
    <div className="w-full h-full flex flex-col justify-between py-16 px-6 md:px-16 max-w-[1500px] mx-auto select-none">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#85867C] uppercase border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[#E8E2D5] font-bold">03 / INTERNSHIP</span>
          <span className="text-white/20">•</span>
          <span>COMMISSIONED INDUSTRY EXPERIENCE</span>
        </div>
        <div className="hidden sm:block">ARCHIVAL WORK PANELS</div>
      </div>

      {/* Main Internship Horizontal Panels */}
      <div className="my-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {INTERNSHIPS.map((intern, idx) => (
          <motion.div
            key={intern.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="group relative bg-[#171A15]/85 border border-[#4A4C45]/70 p-8 rounded-[3px] shadow-xl backdrop-blur-md hover:border-[#E8E2D5]/40 transition-colors"
          >
            {/* Top Micro Label */}
            <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-[#85867C] uppercase pb-4 border-b border-white/[0.08] mb-6">
              <span className="text-[#4AC7A5]">{intern.badge}</span>
              <span>{intern.period}</span>
            </div>

            {/* Company Name in Large Typography */}
            <h3 className="text-3xl sm:text-4xl font-display font-black text-[#E8E2D5] uppercase tracking-tight leading-none mb-2 group-hover:text-white transition-colors">
              {intern.company}
            </h3>

            {/* Role & Location */}
            <p className="font-mono text-[11px] text-[#C8C1B2] tracking-wider uppercase mb-5">
              {intern.role} • {intern.location}
            </p>

            {/* 1-2 Line Crisp Description */}
            <p className="font-sans text-xs sm:text-sm text-[#85867C] leading-relaxed font-light mb-6">
              {intern.description}
            </p>

            {/* Technology Tags */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
              {intern.technologies.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[9px] px-2.5 py-1 bg-[#10130F]/90 border border-[#4A4C45]/50 text-[#C8C1B2] uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Technical Note */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#85867C] uppercase border-t border-white/[0.08] pt-4">
        <span>03 / 08 INDUSTRY ARCHIVE</span>
        <span>NEXT: FEATURED PROJECTS →</span>
      </div>
    </div>
  );
}

