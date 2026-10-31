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

export default function JourneySection() {
  return (
    <div className="w-full h-full flex flex-col justify-between py-16 px-6 md:px-16 max-w-[1600px] mx-auto select-none">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#85867C] uppercase border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[#E8E2D5] font-bold">06 / JOURNEY</span>
          <span className="text-white/20">•</span>
          <span>HORIZONTAL EVOLUTION TIMELINE</span>
        </div>
        <div className="hidden sm:block">2022 ━━━━━ 2026</div>
      </div>

      {/* Main Horizontal Timeline Bar and Milestone Columns */}
      <div className="my-auto py-8">
        {/* Continuous Horizontal Progression Line */}
        <div className="relative w-full h-px bg-white/10 mb-12 hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4AC7A5]/40 via-[#E8E2D5]/30 to-[#4AC7A5]/60" />
        </div>

        {/* 5-Stage Evolution Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {MILESTONES.map((step, idx) => (
            <motion.div
              key={step.year}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col relative group"
            >
              {/* Year Marker */}
              <div className="flex items-baseline justify-between mb-3 pb-2 border-b border-white/[0.08]">
                <span className="text-3xl sm:text-4xl font-display font-black text-[#E8E2D5] tracking-tight group-hover:text-white transition-colors">
                  {step.year}
                </span>
                <span className="font-mono text-[9px] tracking-widest text-[#4AC7A5] uppercase">
                  {step.stage}
                </span>
              </div>

              {/* Stage Headline */}
              <h4 className="font-display font-bold text-sm text-[#E8E2D5] uppercase tracking-tight mb-2">
                {step.headline}
              </h4>

              {/* One Short Phrase Only */}
              <p className="font-sans text-xs text-[#85867C] font-light leading-relaxed">
                {step.description}
              </p>

              {/* Indicator dot */}
              <div className="mt-4 flex items-center gap-2 font-mono text-[9px] text-[#66705E] uppercase">
                <span>STAGE 0{idx + 1}</span>
                <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Technical Note */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#85867C] uppercase border-t border-white/[0.08] pt-4">
        <span>06 / 08 SYSTEM EVOLUTION</span>
        <span>NEXT: OPEN SOURCE ARCHIVE →</span>
      </div>
    </div>
  );
}
