import { motion } from 'framer-motion';

export default function ContactSection({ onOpenMessage }) {
  return (
    <div className="w-full h-full flex flex-col justify-between py-16 px-6 md:px-16 max-w-[1500px] mx-auto select-none text-[var(--text-primary)]">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-wider text-[var(--text-secondary)] uppercase border-b border-[var(--border-primary)] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[var(--accent)] font-semibold">08 / CONTACT</span>
          <span className="opacity-40">•</span>
          <span className="text-[var(--text-secondary)]">COMMISSIONS & CORRESPONDENCE</span>
        </div>
        <div className="hidden sm:block text-[var(--accent)] font-medium">STATUS: AVAILABLE 2026</div>
      </div>

      {/* Main Editorial Contact Composition */}
      <div className="grid items-center grid-cols-1 gap-10 my-auto lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Monumental Headline */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[10px] tracking-wider text-[var(--accent)] uppercase block mb-3 font-medium">
              WHAT'S NEXT
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-[var(--text-primary)] uppercase tracking-tight leading-[0.9] mb-6">
              LET'S
              <br />
              BUILD
              <br />
              <span className="text-[var(--accent)]">SOMETHING.</span>
            </h2>
            <p className="font-sans text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed max-w-lg mb-8">
              Available for architectural consulting, full-stack systems engineering, and autonomous AI workflow deployments.
            </p>
            <button
              onClick={onOpenMessage}
              data-cursor="button"
              className="px-6 py-3.5 bg-[var(--accent)] text-[#F7F6F2] font-sans text-xs tracking-wider uppercase font-semibold hover:bg-[var(--accent-hover)] transition-all shadow-md flex items-center gap-3 cursor-pointer"
            >
              <span>SEND A MESSAGE</span>
              <span>↗</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Direct Channels */}
        <div className="space-y-4 font-mono text-xs lg:col-span-5">
          <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-[2px] space-y-4 shadow-sm">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                PRIMARY EMAIL
              </span>
              <a
                href="mailto:devmistry1510@gmail.com"
                data-cursor="archive"
                className="text-sm font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors block"
              >
                devmistry1510@gmail.com ↗
              </a>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)]">
              <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                PROFESSIONAL NETWORK
              </span>
              <a
                href="https://www.linkedin.com/in/dev-mistry-828586298/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="archive"
                className="text-sm font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors block"
              >
                LINKEDIN PROFILE ↗
              </a>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)]">
              <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                CODE ARCHIVES
              </span>
              <a
                href="https://github.com/DevM15"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="archive"
                className="text-sm font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors block"
              >
                GITHUB REPOSITORIES ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-[var(--text-secondary)] uppercase border-t border-[var(--border-primary)] pt-4">
        <span>TRANSMISSION HUB</span>
        <span>MUMBAI, INDIA • UTC+05:30</span>
      </div>
    </div>
  );
}
