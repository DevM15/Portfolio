import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <div className="w-full h-full flex flex-col justify-between py-16 px-6 md:px-16 max-w-[1500px] mx-auto select-none">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#85867C] uppercase border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[#E8E2D5] font-bold">02 / ABOUT</span>
          <span className="text-white/20">•</span>
          <span>IDENTITY & ARCHITECTURAL MANIFESTO</span>
        </div>
        <div className="hidden sm:block">SYSTEM BUILDER</div>
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
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#66705E] uppercase block mb-3">
              PROFILE PHILOSOPHY
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-[#E8E2D5] uppercase tracking-tight leading-[0.9] mb-8">
              DEV MISTRY
              <br />
              <span className="text-[#85867C]">SOFTWARE</span>
              <br />
              CLOUD • AI
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#C8C1B2] font-light leading-relaxed max-w-xl mb-8">
              Building intelligent digital systems across web, cloud, and autonomous AI swarms. Committed to structural simplicity, zero decorative clutter, and bulletproof engineering.
            </p>
          </motion.div>
        </div>

        {/* Right Column: Editorial Attribute Blocks */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
          <div className="p-5 bg-[#171A15]/80 border border-[#4A4C45]/60 rounded-[3px] backdrop-blur-sm">
            <span className="text-[9px] tracking-[0.25em] text-[#85867C] uppercase block mb-2">
              BASED IN
            </span>
            <h4 className="text-sm font-bold text-[#E8E2D5]">AHMEDABAD, INDIA</h4>
            <p className="text-[10px] text-[#66705E] mt-1">AVAILABLE WORLDWIDE</p>
          </div>

          <div className="p-5 bg-[#171A15]/80 border border-[#4A4C45]/60 rounded-[3px] backdrop-blur-sm">
            <span className="text-[9px] tracking-[0.25em] text-[#85867C] uppercase block mb-2">
              CORE FOCUS
            </span>
            <h4 className="text-sm font-bold text-[#E8E2D5]">WEB / CLOUD / AI</h4>
            <p className="text-[10px] text-[#66705E] mt-1">MULTI-REGION SYSTEMS</p>
          </div>

          <div className="p-5 bg-[#171A15]/80 border border-[#4A4C45]/60 rounded-[3px] backdrop-blur-sm sm:col-span-2">
            <span className="text-[9px] tracking-[0.25em] text-[#85867C] uppercase block mb-2">
              CURRENT ACTIVITY
            </span>
            <h4 className="text-sm font-bold text-[#E8E2D5]">BUILDING AGENTIC REASONING RUNTIMES</h4>
            <p className="text-[10px] text-[#66705E] mt-1 font-sans">
              Specializing in LangGraph workflows, MCP interoperability, and high-concurrency event telemetry.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Technical Note */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#85867C] uppercase border-t border-white/[0.08] pt-4">
        <span>02 / 08 EXHIBITION SEQUENCE</span>
        <span>SCROLL OR CLICK TO PROCEED →</span>
      </div>
    </div>
  );
}

