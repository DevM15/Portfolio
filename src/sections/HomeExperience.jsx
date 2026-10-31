import { motion } from 'framer-motion';

export default function HomeExperience({ onExploreWork }) {
  return (
    <section className="relative w-screen h-screen flex-shrink-0 flex items-center px-6 md:px-16 pt-20 pb-12 overflow-hidden select-none">
      {/* Background Architectural subtle line */}
      <div className="absolute top-20 left-6 right-6 md:left-16 md:right-16 h-px bg-white/[0.06] pointer-events-none" />

      <div className="w-full h-full flex flex-col justify-between max-w-[1700px] mx-auto relative z-10">
        {/* Top Metadata */}
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-olive uppercase pt-4">
          <div className="flex items-center gap-4">
            <span className="text-ivory font-medium">01 / HOME</span>
            <span className="hidden sm:inline text-white/10">•</span>
            <span className="hidden sm:inline">DEV MISTRY</span>
          </div>
          <div>WEB / CLOUD / AGENTIC AI</div>
        </div>

        {/* Center Main Composition: HUGE TYPOGRAPHY & EDITORIAL PORTRAIT SIDE-BY-SIDE */}
        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left: Huge Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-giant font-display font-black text-ivory tracking-tighter uppercase mb-6">
                DEV
                <br />
                MISTRY
              </h1>

              <div className="text-display-lg font-display font-medium text-olive tracking-tight uppercase leading-[0.92]">
                BUILDING
                <br />
                INTELLIGENT
                <br />
                SYSTEMS.
              </div>
            </motion.div>
          </div>

          {/* Right: Large Rectangular Editorial Portrait (No circle, no profile card) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[420px] aspect-[3/4] bg-[#090A08] border border-white/10 overflow-hidden group"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
                alt="Dev Mistry Portrait"
                className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 group-hover:contrast-110 group-hover:brightness-100 transition-all duration-700 ease-out"
              />

              {/* Minimal Editorial Photo Tag */}
              <div className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.2em] text-ivory/80 bg-black/60 px-2.5 py-1 backdrop-blur-sm border border-white/10 uppercase">
                PORTRAIT / DEV MISTRY
              </div>

              <div className="absolute bottom-4 right-4 font-mono text-[9px] tracking-[0.2em] text-olive bg-black/80 px-2 py-0.5">
                EST. 2026
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Metadata & Scroll Prompt */}
        <div className="flex items-end justify-between font-mono text-[10px] tracking-[0.25em] text-olive uppercase pb-2 border-t border-white/[0.06] pt-4">
          <div className="flex items-center gap-6">
            <span className="text-ivory-secondary">PORTFOLIO / 2026</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span className="hidden md:inline">SYSTEM / ONLINE</span>
          </div>

          <button
            onClick={onExploreWork}
            className="flex items-center gap-3 text-ivory hover:text-white transition-colors group cursor-pointer"
          >
            <span className="tracking-[0.25em]">SCROLL OR CLICK TO EXPLORE</span>
            <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

