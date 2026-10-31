import { motion } from 'framer-motion';

export default function ContactSection({ onOpenMessage }) {
  return (
    <div className="w-full h-full flex flex-col justify-between py-16 px-6 md:px-16 max-w-[1500px] mx-auto select-none">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#85867C] uppercase border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[#E8E2D5] font-bold">08 / CONTACT</span>
          <span className="text-white/20">•</span>
          <span>COMMISSIONS & CORRESPONDENCE</span>
        </div>
        <div className="hidden sm:block">STATUS: AVAILABLE 2026</div>
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
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#4AC7A5] uppercase block mb-3">
              WHAT'S NEXT
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-[#E8E2D5] uppercase tracking-tight leading-[0.88] mb-6">
              LET'S
              <br />
              BUILD
              <br />
              SOMETHING.
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#C8C1B2] font-light leading-relaxed max-w-lg mb-8">
              Available for architectural consulting, full-stack systems engineering, and autonomous AI workflow deployments.
            </p>
            <button
              onClick={onOpenMessage}
              className="px-6 py-3.5 bg-[#E8E2D5] text-[#10130F] font-mono text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors flex items-center gap-3"
            >
              <span>SEND A MESSAGE</span>
              <span>↗</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Direct Channels */}
        <div className="lg:col-span-5 space-y-4 font-mono text-xs">
          <div className="p-6 bg-[#171A15]/80 border border-[#4A4C45]/60 rounded-[3px] space-y-4 backdrop-blur-sm">
            <span className="text-[9px] tracking-[0.25em] text-[#85867C] uppercase block mb-2">
              DIRECT CHANNELS
            </span>
            <a
              href="mailto:devmistry1510@gmail.com"
              className="flex items-center justify-between py-2 border-b border-white/[0.08] text-[#E8E2D5] hover:text-white transition-colors"
            >
              <span>EMAIL</span>
              <span className="text-[#85867C]">DEVMISTRY1510@GMAIL.COM ↗</span>
            </a>
            <a
              href="https://github.com/DevM15"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-2 border-b border-white/[0.08] text-[#E8E2D5] hover:text-white transition-colors"
            >
              <span>GITHUB</span>
              <span className="text-[#85867C]">/DEVM15 ↗</span>
            </a>
            <a
              href="https://www.linkedin.com/in/dev-mistry-828586298/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-2 border-b border-white/[0.08] text-[#E8E2D5] hover:text-white transition-colors"
            >
              <span>LINKEDIN</span>
              <span className="text-[#85867C]">/DEV-MISTRY ↗</span>
            </a>
          </div>

          <div className="p-4 bg-[#10130F]/90 border border-white/[0.06] rounded-[3px] text-[10px] text-[#85867C] tracking-wider uppercase">
            RESPONSE TIMEFRAME: WITHIN 24 HOURS • WORLDWIDE
          </div>
        </div>
      </div>

      {/* Bottom Technical Note */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#85867C] uppercase border-t border-white/[0.08] pt-4">
        <span>08 / 08 FINAL EXHIBITION SCENE</span>
        <span>DEV MISTRY © 2026</span>
      </div>
    </div>
  );
}
