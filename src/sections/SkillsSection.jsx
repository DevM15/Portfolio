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
    <div className="w-full h-full flex flex-col justify-between py-16 px-6 md:px-16 max-w-[1500px] mx-auto select-none">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#626A65] uppercase border-b border-[#2A302C] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[#65E6D2] font-bold">03 / SKILLS</span>
          <span className="text-white/10">•</span>
          <span className="text-[#9EA49F]">DIGITAL TECHNICAL MAP & CAPABILITIES</span>
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

      {/* Main Technical Map Grid */}
      <div className="my-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {STACK_MAP.map((group, idx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="flex flex-col justify-between p-6 bg-[#111513] border border-[#2A302C] rounded-[2px] shadow-lg"
          >
            <div>
              {/* Category Header */}
              <div className="font-mono text-[9px] tracking-[0.25em] text-[#65E6D2] uppercase mb-2">
                0{idx + 1} // DOMAIN
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-[#F1EFE8] uppercase tracking-tight leading-none mb-3">
                {group.category}
              </h3>
              <p className="font-sans text-xs text-[#9EA49F] font-light leading-relaxed mb-6">
                {group.description}
              </p>
            </div>

            {/* Clean Typographic Skills List */}
            <ul className="space-y-2.5 pt-4 border-t border-[#2A302C] font-mono text-xs">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center justify-between text-[#9EA49F] hover:text-[#F1EFE8] transition-colors"
                >
                  <span>{skill}</span>
                  <span className="text-[9px] text-[#65E6D2]">●</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Bottom Technical Note */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#626A65] uppercase border-t border-[#2A302C] pt-4">
        <span>05 / 08 TECHNICAL SPECIFICATIONS</span>
        <span>NEXT: JOURNEY TIMELINE →</span>
      </div>
    </div>
  );
}

