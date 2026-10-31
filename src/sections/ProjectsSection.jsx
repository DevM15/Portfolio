import { motion } from 'framer-motion';

export default function ProjectsSection({ onOpenProject, projects, activeFilter, onFilterChange, filters }) {
  const filtered = activeFilter === 'ALL WORK'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="w-full h-full flex flex-col justify-between py-16 px-6 md:px-16 max-w-[1600px] mx-auto select-none overflow-y-auto no-scrollbar">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#85867C] uppercase border-b border-white/[0.08] pb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-[#E8E2D5] font-bold">04 / PROJECTS</span>
          <span className="text-white/20">•</span>
          <span>CURATED TECHNICAL EXHIBITION</span>
        </div>
        <div className="hidden sm:block">0{filtered.length} / 0{projects.length} PROJECTS</div>
      </div>

      {/* Main Layout: Headline, Filters & Grid */}
      <div className="my-auto py-8">
        {/* Filters Strip */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-wider uppercase mb-8">
          <span className="text-[#66705E] text-[10px] mr-2">FILTER:</span>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={`px-3 py-1 transition-all rounded-[2px] ${
                activeFilter === f
                  ? 'bg-[#E8E2D5] text-[#10130F] font-bold'
                  : 'text-[#85867C] hover:text-[#E8E2D5] bg-[#171A15]/60 border border-[#4A4C45]/40'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Horizontal/Grid Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => onOpenProject(p)}
              className="group cursor-pointer flex flex-col bg-[#171A15]/60 border border-[#4A4C45]/60 rounded-[3px] p-4 backdrop-blur-sm hover:border-[#E8E2D5]/40 transition-all"
            >
              <div className="relative aspect-[16/10] bg-[#090A08] border border-white/10 overflow-hidden rounded-[2px]">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                  <span className="font-display font-bold text-xs tracking-widest uppercase bg-[#176D6C] text-[#E8E1D2] px-4 py-2 border border-white/20 shadow-lg">
                    {p.badge}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-mono text-xs text-[#4AC7A5]">{p.num}</span>
                <h4 className="font-display font-bold text-base md:text-lg text-[#E8E2D5] tracking-tight group-hover:text-white uppercase">
                  {p.title}
                </h4>
              </div>

              <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-[#85867C] uppercase">
                <span>{p.type}</span>
                <span>{p.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Technical Note */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#85867C] uppercase border-t border-white/[0.08] pt-4 flex-shrink-0">
        <span>04 / 08 ARCHITECTURAL SYSTEMS</span>
        <span>NEXT: TECHNICAL SKILLS →</span>
      </div>
    </div>
  );
}

