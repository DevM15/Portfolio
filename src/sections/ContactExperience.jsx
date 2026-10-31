import { motion } from 'framer-motion';

export default function ContactExperience({ onBackToHome }) {
  return (
    <section className="relative w-screen h-screen flex-shrink-0 flex flex-col justify-between px-6 md:px-16 pt-20 pb-10 overflow-hidden select-none bg-[#11140F]">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-olive uppercase border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-4">
          <span className="text-ivory font-medium">03 / CONTACT</span>
          <span className="text-white/10">•</span>
          <span className="text-ivory-secondary">DIRECT DIALOGUE</span>
        </div>
        <div>AVAILABLE WORLDWIDE</div>
      </div>

      {/* Main Composition: Almost Empty, Generous Whitespace, Monumental Typography */}
      <div className="my-auto w-full max-w-[1700px] mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Monumental Statement */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-giant font-display font-black text-ivory tracking-tighter uppercase leading-[0.88]">
                LET'S
                <br />
                BUILD
                <br />
                SOMETHING.
              </h2>
            </motion.div>
          </div>

          {/* RIGHT: Large Minimal Direct Links (No Cards, No form) */}
          <div className="lg:col-span-5 flex flex-col justify-between pt-4 lg:pt-8 space-y-12">
            <div className="space-y-6">
              <span className="font-mono text-[10px] tracking-[0.25em] text-olive uppercase block mb-4">
                CHANNELS & CORRESPONDENCE
              </span>

              {/* EMAIL */}
              <div>
                <a
                  href="mailto:devmistry1510@gmail.com"
                  className="group flex items-baseline justify-between font-display font-bold text-3xl sm:text-5xl md:text-6xl text-ivory hover:text-ivory-secondary transition-colors py-2 border-b border-white/10"
                >
                  <span>EMAIL</span>
                  <span className="font-mono text-xl sm:text-3xl text-olive group-hover:text-ivory group-hover:translate-x-2 group-hover:-translate-y-1 transition-all duration-200">
                    →
                  </span>
                </a>
              </div>

              {/* GITHUB */}
              <div>
                <a
                  href="https://github.com/DevM15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between font-display font-bold text-3xl sm:text-5xl md:text-6xl text-ivory hover:text-ivory-secondary transition-colors py-2 border-b border-white/10"
                >
                  <span>GITHUB</span>
                  <span className="font-mono text-xl sm:text-3xl text-olive group-hover:text-ivory group-hover:translate-x-2 group-hover:-translate-y-1 transition-all duration-200">
                    →
                  </span>
                </a>
              </div>

              {/* LINKEDIN */}
              <div>
                <a
                  href="https://www.linkedin.com/in/dev-mistry-828586298/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between font-display font-bold text-3xl sm:text-5xl md:text-6xl text-ivory hover:text-ivory-secondary transition-colors py-2 border-b border-white/10"
                >
                  <span>LINKEDIN</span>
                  <span className="font-mono text-xl sm:text-3xl text-olive group-hover:text-ivory group-hover:translate-x-2 group-hover:-translate-y-1 transition-all duration-200">
                    →
                  </span>
                </a>
              </div>
            </div>

            {/* Response Timeline note */}
            <div className="font-mono text-[10px] tracking-[0.2em] text-olive uppercase">
              COGNITIVE SYSTEMS • ARCHITECTURAL CONSULTING • COMMISSIONED CODE
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Metadata Bar */}
      <div className="border-t border-white/[0.06] pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] tracking-[0.2em] text-olive uppercase">
        <div className="flex items-center gap-6">
          <span className="text-ivory">DEV MISTRY</span>
          <span>WEB / CLOUD / AGENTIC AI</span>
          <span>© 2026</span>
        </div>

        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-ivory hover:text-white transition-colors cursor-pointer"
        >
          <span>RETURN TO HOME</span>
          <span>↑</span>
        </button>
      </div>
    </section>
  );
}

