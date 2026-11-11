import { motion } from 'framer-motion';

export default function ContactSection({ onOpenMessage }) {
  return (
    <div className="w-full h-full flex flex-col justify-between py-16 px-6 md:px-16 max-w-[1500px] mx-auto select-none">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-wider text-[#788477] uppercase border-b border-[#2A302C] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[#B96F52] font-semibold">08 / CONTACT</span>
          <span className="text-white/10">•</span>
          <span className="text-[#788477]">COMMISSIONS & CORRESPONDENCE</span>
        </div>
        <div className="hidden sm:block text-[#B96F52] font-medium">STATUS: AVAILABLE 2026</div>
      </div>

      {/* Main Editorial Contact Composition */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Monumental Headline */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[10px] tracking-wider text-[#B96F52] uppercase block mb-3 font-medium">
              WHAT'S NEXT
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-[#F7F6F2] uppercase tracking-tight leading-[0.9] mb-6">
              LET'S
              <br />
              BUILD
              <br />
              <span className="text-[#B96F52]">SOMETHING.</span>
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#788477] font-normal leading-relaxed max-w-lg mb-8">
              Available for architectural consulting, full-stack systems engineering, and autonomous AI workflow deployments.
            </p>
            <button
              onClick={onOpenMessage}
              className="px-6 py-3.5 bg-[#B96F52] text-[#F7F6F2] font-sans text-xs tracking-wider uppercase font-semibold hover:bg-[#C98369] transition-all shadow-lg flex items-center gap-3 cursor-pointer"
            >
              <span>SEND A MESSAGE</span>
              <span>↗</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Direct Channels */}
        <div className="lg:col-span-5 space-y-4 font-mono text-xs">
          <div className="p-6 bg-[#111513] border border-[#2A302C] rounded-[2px] space-y-4 shadow-lg">
            <span className="text-[9px] tracking-[0.25em] text-[#626A65] uppercase block mb-2">
              DIRECT CHANNELS
            </span>
            <a
              href="mailto:devmistry1510@gmail.com"
              className="flex items-center justify-between py-2 border-b border-[#2A302C] text-[#F1EFE8] hover:text-[#65E6D2] transition-colors"
            >
              <span>EMAIL</span>
              <span className="text-[#9EA49F]">DEVMISTRY1510@GMAIL.COM ↗</span>
            </a>
            <a
              href="https://github.com/DevM15"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-2 border-b border-[#2A302C] text-[#F1EFE8] hover:text-[#65E6D2] transition-colors"
            >
              <span>GITHUB</span>
              <span className="text-[#9EA49F]">/DEVM15 ↗</span>
            </a>
            <a
              href="https://www.linkedin.com/in/dev-mistry-828586298/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-2 border-b border-[#2A302C] text-[#F1EFE8] hover:text-[#65E6D2] transition-colors"
            >
              <span>LINKEDIN</span>
              <span className="text-[#9EA49F]">/DEV-MISTRY ↗</span>
            </a>
          </div>

          <div className="p-4 bg-[#171B19] border border-[#2A302C] rounded-[2px] text-[10px] text-[#9EA49F] tracking-wider uppercase">
            RESPONSE TIMEFRAME: WITHIN 24 HOURS • WORLDWIDE
          </div>
        </div>
      </div>

      {/* Bottom Technical Note */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#626A65] uppercase border-t border-[#2A302C] pt-4">
        <span>08 / 08 FINAL EXHIBITION SCENE</span>
        <span>DEV MISTRY © 2026</span>
      </div>
    </div>
  );
}
