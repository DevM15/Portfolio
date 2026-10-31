import { motion } from 'framer-motion';

export default function HomeSection({ onExplore }) {
  return (
    <div className="w-full h-full flex flex-col justify-between py-12 px-6 md:px-16 max-w-[1600px] mx-auto select-none">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#626A65] uppercase border-b border-[#2A302C] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[#65E6D2] font-bold">01 / HOME</span>
          <span className="text-white/10">•</span>
          <span className="text-[#9EA49F]">DIGITAL ARCHITECTURE & SYSTEM SPECIFICATIONS</span>
        </div>
        <div className="hidden sm:block text-[#9EA49F]">FULL STACK DEVELOPER // MUMBAI</div>
      </div>

      {/* Main Clean Horizontal Composition: Left Huge Typography, Right Clean Rectangular Portrait */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Column: Monolithic Engineered Headlines */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-mono text-[10px] tracking-[0.25em] text-[#65E6D2] uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#65E6D2] animate-pulse" />
              <span>DEV MISTRY • FULL STACK DEVELOPER</span>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-black text-[#F1EFE8] tracking-tight uppercase leading-[0.88] mb-6">
              BUILDING
              <br />
              INTELLIGENT
              <br />
              <span className="text-[#65E6D2]">SYSTEMS.</span>
            </h1>

            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#9EA49F] tracking-[0.2em] uppercase pt-2">
              <span className="px-3 py-1 bg-[#171B19] border border-[#2A302C] rounded-[2px] text-[#F1EFE8]">
                WEB
              </span>
              <span>•</span>
              <span className="px-3 py-1 bg-[#171B19] border border-[#2A302C] rounded-[2px] text-[#F1EFE8]">
                CLOUD
              </span>
              <span>•</span>
              <span className="px-3 py-1 bg-[#171B19] border border-[#2A302C] rounded-[2px] text-[#F1EFE8]">
                AGENTIC AI
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Clean Rectangular Archive Photograph (No tape, no paper, no fake frame) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[360px] aspect-[3/4] bg-[#111513] border border-[#2A302C] rounded-[2px] overflow-hidden group shadow-2xl"
          >
            {/* Crisp Portrait Photo */}
            <img
              src="/img/dev_portrait.jpg"
              alt="Dev Mistry"
              className="w-full h-full object-cover contrast-[1.08] brightness-[0.95] grayscale-[30%] group-hover:grayscale-0 group-hover:contrast-105 group-hover:brightness-100 transition-all duration-700 ease-out"
            />

            {/* Corner Digital Technical Tags */}
            <div className="absolute top-4 left-4 font-mono text-[9px] tracking-widest text-[#F1EFE8] bg-[#0B0D0C]/85 px-2.5 py-1 backdrop-blur-sm border border-[#2A302C] uppercase">
              ID: 01 // DEV MISTRY
            </div>

            <div className="absolute bottom-4 right-4 font-mono text-[9px] tracking-widest text-[#65E6D2] bg-[#0B0D0C]/85 px-2.5 py-1 backdrop-blur-sm border border-[#2A302C] uppercase">
              LOC: MUMBAI
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Exploration Prompts */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-[#626A65] uppercase border-t border-[#2A302C] pt-4">
        <span>DEV MISTRY • MUMBAI</span>
        <button
          onClick={onExplore}
          className="flex items-center gap-2 text-[#F1EFE8] hover:text-[#65E6D2] transition-colors cursor-pointer"
        >
          <span>SCROLL TO EXPLORE ARCHIVE</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
