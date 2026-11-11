import { motion } from 'framer-motion';

export default function AboutSection({ onBack }) {
  return (
    <div className="w-full h-full flex flex-col justify-between py-12 px-6 md:px-16 max-w-[1500px] mx-auto select-none">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-wider text-[#788477] uppercase border-b border-[#2A302C] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[#B96F52] font-semibold">01 / ABOUT</span>
          <span className="text-white/10">•</span>
          <span className="text-[#788477]">IDENTITY & ENGINEERING SPECIFICATION</span>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            className="text-[#B96F52] hover:text-[#F7F6F2] transition-colors cursor-pointer"
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
            <span className="font-mono text-[10px] tracking-wider text-[#B96F52] uppercase block mb-3 font-medium">
              PROFILE SPECIFICATION
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-[#F7F6F2] uppercase tracking-tight leading-[0.95] mb-6">
              DEV MISTRY
              <br />
              <span className="text-[#788477]">SOFTWARE</span>
              <br />
              <span className="text-[#B96F52]">CLOUD • AI</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#788477] font-normal leading-relaxed max-w-xl mb-6">
              Building intelligent digital systems across web, cloud, and autonomous AI swarms. Clean architecture, high availability, and deterministic execution.
            </p>
          </motion.div>
        </div>

        {/* Right Column: Technical Attribute Blocks */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-5 bg-[#111513] border border-[#2A302C] rounded-[2px]">
            <span className="text-[9px] tracking-[0.25em] text-[#626A65] uppercase block mb-1">
              BASED IN
            </span>
            <h4 className="text-sm font-bold text-[#F1EFE8]">MUMBAI, INDIA</h4>
            <p className="text-[10px] text-[#65E6D2] mt-1">AVAILABLE WORLDWIDE</p>
          </div>

          <div className="p-5 bg-[#111513] border border-[#2A302C] rounded-[2px]">
            <span className="text-[9px] tracking-[0.25em] text-[#626A65] uppercase block mb-1">
              CORE FOCUS
            </span>
            <h4 className="text-sm font-bold text-[#F1EFE8]">WEB / CLOUD / AI</h4>
            <p className="text-[10px] text-[#65E6D2] mt-1">DISTRIBUTED SYSTEMS</p>
          </div>

          <div className="p-5 bg-[#111513] border border-[#2A302C] rounded-[2px] sm:col-span-2">
            <span className="text-[9px] tracking-[0.25em] text-[#626A65] uppercase block mb-1">
              CURRENT ACTIVITY
            </span>
            <h4 className="text-sm font-bold text-[#F1EFE8]">BUILDING AGENTIC REASONING RUNTIMES</h4>
            <p className="text-[11px] text-[#9EA49F] mt-1 font-sans">
              Specializing in LangGraph workflows, MCP protocol interoperability, and high-concurrency event telemetry.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Technical Note */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#626A65] uppercase border-t border-[#2A302C] pt-4">
        <span>02 / 08 EXHIBITION SEQUENCE</span>
        <span>PROCEED TO INTERNSHIPS →</span>
      </div>
    </div>
  );
}
