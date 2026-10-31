import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 max-w-[1700px] mx-auto bg-grid-architectural"
    >
      {/* Top Editorial Index Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-[11px] tracking-[0.2em] text-text-muted">
        <div className="flex items-center gap-3">
          <span className="text-white font-medium">[ 00 ]</span>
          <span className="uppercase">PORTFOLIO & SYSTEM ARCHITECTURE</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline">LAT 23°01'N / LON 72°35'E</span>
          <span className="text-stone-500">CURATED WORKS (2023—2026)</span>
        </div>
      </div>

      {/* Center Cinematic Statement */}
      <div className="my-auto py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-stone-500 mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-stone-600 inline-block" />
            <span>DISCIPLINE & SCALE</span>
          </div>

          <h1 className="text-display-hero font-display font-medium text-white tracking-tight leading-[0.92] uppercase">
            ARCHITECTING
            <br />
            <span className="text-stone-500">DIGITAL</span> SYSTEMS
            <br />
            WITH PURPOSE.
          </h1>
        </motion.div>

        {/* Sub-editorial split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 pt-8 border-t border-white/[0.08]">
          <div className="md:col-span-5">
            <p className="font-sans text-stone-400 text-base md:text-lg leading-relaxed font-light">
              Crafting resilient infrastructure, autonomous intelligence, and minimal software ecosystems. Rooted in structural discipline, restrained aesthetics, and uncompromising engineering.
            </p>
          </div>
          <div className="md:col-span-3 md:col-start-7 flex flex-col justify-end">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone-600 block mb-1">
              FOCUS AREAS
            </span>
            <p className="font-mono text-xs text-stone-300 tracking-wider">
              AI AGENTS • DISTRIBUTED SYSTEMS • CLOUD INFRASTRUCTURE
            </p>
          </div>
          <div className="md:col-span-3 flex flex-col justify-end">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone-600 block mb-1">
              PROJECT STATUS
            </span>
            <p className="font-mono text-xs text-stone-300 tracking-wider">
              ACCEPTING COMMISSIONED PLATFORMS & ARCHITECTURE
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Ticker / Quick Jump Bar */}
      <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-stone-500">
        <div className="flex items-center gap-4">
          <span className="text-white">SCROLL TO EXPLORE</span>
          <span className="animate-bounce">↓</span>
        </div>
        <div className="flex items-center gap-6 tracking-widest text-[10px]">
          <span>INDEX: 01—04</span>
          <span className="text-stone-700">|</span>
          <a href="#projects" className="text-white hover:underline underline-offset-4">
            VIEW CURATED WORKS
          </a>
        </div>
      </div>
    </section>
  );
}
