import { motion } from 'framer-motion';

const REPOSITORIES = [
  {
    name: 'Arcade',
    tagline: 'Architectural portfolio & spatial presentation platform',
    language: 'JavaScript / HTML / CSS',
    stars: 'Public',
    link: 'https://github.com/DevM15/Arcade',
  },
  {
    name: 'PDFdecoder',
    tagline: 'Client-side binary manipulation & document extraction pipeline',
    language: 'JavaScript / PDF.js',
    stars: 'Public',
    link: 'https://github.com/DevM15/PDFdecoder',
  },
  {
    name: 'Futuredesks',
    tagline: 'Responsive workspace infrastructure showcase',
    language: 'JavaScript / Bootstrap',
    stars: 'Public',
    link: 'https://github.com/DevM15/Futuredesks',
  },
  {
    name: 'agentic-consensus',
    tagline: 'Decentralized multi-agent reasoning fabric with MCP interoperability',
    language: 'Python / LangGraph',
    stars: 'Core Engine',
    link: 'https://github.com/DevM15',
  },
];

export default function GithubSection() {
  return (
    <div className="w-full h-full flex flex-col justify-between py-16 px-6 md:px-16 max-w-[1500px] mx-auto select-none">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#85867C] uppercase border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[#E8E2D5] font-bold">07 / GITHUB</span>
          <span className="text-white/20">•</span>
          <span>BUILDING IN PUBLIC // CODE ARCHIVE</span>
        </div>
        <div className="hidden sm:block">GITHUB.COM/DEVM15</div>
      </div>

      {/* Main Content Area: Overview Metrics + Repository Grid */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Code Archive Header & Minimal Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#4AC7A5] uppercase block mb-2">
              OPEN REPOSITORIES
            </span>
            <h3 className="text-3xl sm:text-5xl font-display font-black text-[#E8E2D5] uppercase tracking-tight leading-none mb-4">
              CODE
              <br />
              ARCHIVE.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#85867C] font-light leading-relaxed">
              Open-source tooling, full-stack prototypes, and distributed infrastructure templates released for community collaboration.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 font-mono text-xs pt-4 border-t border-white/[0.08]">
            <div>
              <span className="text-[9px] text-[#85867C] block uppercase">TOP LANGUAGES</span>
              <span className="text-[#E8E2D5] font-bold block mt-1">PYTHON • TS • JS</span>
            </div>
            <div>
              <span className="text-[9px] text-[#85867C] block uppercase">DEVELOPER</span>
              <span className="text-[#E8E2D5] font-bold block mt-1">@DEVM15</span>
            </div>
          </div>

          <a
            href="https://github.com/DevM15"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#E8E2D5] hover:text-white uppercase pt-2 border-b border-white/20 pb-1"
          >
            <span>VISIT FULL GITHUB PROFILE</span>
            <span>↗</span>
          </a>
        </div>

        {/* Right Column: 4 Minimal Repository Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {REPOSITORIES.map((repo, idx) => (
            <motion.a
              key={repo.name}
              href={repo.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group p-6 bg-[#171A15]/80 border border-[#4A4C45]/60 rounded-[3px] backdrop-blur-sm hover:border-[#E8E2D5]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                  <span className="font-mono text-[9px] tracking-widest text-[#4AC7A5] uppercase">
                    {repo.stars}
                  </span>
                  <span className="font-mono text-xs text-[#85867C] group-hover:text-[#E8E2D5] group-hover:translate-x-1 transition-all">
                    ↗
                  </span>
                </div>

                <h4 className="text-xl font-display font-bold text-[#E8E2D5] uppercase tracking-tight group-hover:text-white transition-colors mb-2">
                  {repo.name}
                </h4>

                <p className="font-sans text-xs text-[#85867C] font-light leading-relaxed mb-6">
                  {repo.tagline}
                </p>
              </div>

              <div className="font-mono text-[9px] tracking-widest text-[#C8C1B2] uppercase pt-3 border-t border-white/[0.06]">
                {repo.language}
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Bottom Technical Note */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#85867C] uppercase border-t border-white/[0.08] pt-4">
        <span>07 / 08 GITHUB PROFILE & REPOSITORIES</span>
        <span>FINAL SECTION: CONTACT →</span>
      </div>
    </div>
  );
}
