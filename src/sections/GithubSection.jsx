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

export default function GithubSection({ onBack }) {
  return (
    <div className="w-full h-full flex flex-col justify-between py-16 px-6 md:px-16 max-w-[1500px] mx-auto select-none">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-wider text-[#788477] uppercase border-b border-[#DED9CE] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[#B96F52] font-semibold">05 / GITHUB</span>
          <span className="text-black/10">•</span>
          <span className="text-[#788477]">BUILDING IN PUBLIC // CODE ARCHIVE</span>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            className="text-[#B96F52] hover:text-[#252A27] transition-colors cursor-pointer"
          >
            ← BACK TO HOME
          </button>
        )}
      </div>

      {/* Main Content Area: Overview Metrics + Repository Grid */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Code Archive Header & Minimal Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <span className="font-mono text-[10px] tracking-wider text-[#B96F52] uppercase block mb-2 font-semibold">
              OPEN REPOSITORIES
            </span>
            <h3 className="text-3xl sm:text-5xl font-display font-bold text-[#252A27] uppercase tracking-tight leading-none mb-4">
              CODE
              <br />
              ARCHIVE<span className="text-[#B96F52]">.</span>
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#788477] font-normal leading-relaxed">
              Open-source tooling, full-stack prototypes, and distributed infrastructure templates released for community collaboration.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 font-mono text-xs pt-4 border-t border-[#DED9CE]/80">
            <div>
              <span className="text-[9px] text-[#788477] block uppercase font-medium">TOP LANGUAGES</span>
              <span className="text-[#252A27] font-semibold block mt-1">PYTHON • TS • JS</span>
            </div>
            <div>
              <span className="text-[9px] text-[#788477] block uppercase font-medium">DEVELOPER</span>
              <span className="text-[#B96F52] font-semibold block mt-1">@DEVM15</span>
            </div>
          </div>

          <a
            href="https://github.com/DevM15"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B96F52] text-[#F7F6F2] font-sans text-xs tracking-wider uppercase font-semibold hover:bg-[#C98369] transition-all shadow-sm rounded-[1px]"
          >
            <span>VISIT GITHUB REPOSITORY</span>
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
              className="group p-6 bg-[#FFFFFF] border border-[#DED9CE] rounded-[2px] hover:border-[#B96F52] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#DED9CE]/60 mb-4">
                  <span className="font-mono text-[9px] tracking-wider text-[#B96F52] uppercase font-semibold">
                    {repo.stars}
                  </span>
                  <span className="font-mono text-xs text-[#788477] group-hover:text-[#B96F52] group-hover:translate-x-1 transition-all">
                    ↗
                  </span>
                </div>

                <h4 className="text-xl font-display font-bold text-[#252A27] tracking-tight group-hover:text-[#B96F52] transition-colors mb-2">
                  {repo.name}
                </h4>

                <p className="font-sans text-xs text-[#788477] font-normal leading-relaxed mb-6">
                  {repo.tagline}
                </p>
              </div>

              <div className="font-mono text-[9px] tracking-wider text-[#788477] uppercase pt-3 border-t border-[#DED9CE]/60 flex items-center justify-between">
                <span>{repo.language}</span>
                <span className="text-[#B96F52] font-semibold">SRC</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Bottom Technical Note */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#626A65] uppercase border-t border-[#2A302C] pt-4">
        <span>07 / 08 GITHUB PROFILE & REPOSITORIES</span>
        <span>FINAL SECTION: CONTACT →</span>
      </div>
    </div>
  );
}
