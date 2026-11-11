import { motion } from 'framer-motion';

export default function ProjectsSection({ onOpenProject, projects, activeFilter, onFilterChange, filters }) {
  const filtered = activeFilter === 'ALL WORK'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="w-full h-full flex flex-col justify-between py-16 px-6 md:px-16 max-w-[1600px] mx-auto select-none overflow-y-auto no-scrollbar">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#626A65] uppercase border-b border-[#2A302C] pb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-[#F1EFE8] font-bold">04 / PROJECTS</span>
          <span className="text-white/10">•</span>
          <span className="text-[#9EA49F]">SYSTEM SPECIFICATIONS & ARCHITECTURE</span>
        </div>
        <div className="hidden sm:block text-[#9EA49F]">0{filtered.length} / 0{projects.length} SYSTEMS</div>
      </div>

      {/* Main Layout: Filters & Technical Cards Grid */}
      <div className="my-auto py-8">
        {/* Filters Strip */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-wider uppercase mb-8">
          <span className="text-[#788477] text-[10px] mr-2">CATEGORY:</span>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={`px-3 py-1 transition-all rounded-[2px] ${
                activeFilter === f
                  ? 'bg-[#788477] text-[#F7F6F2] font-bold'
                  : 'text-[#788477] hover:text-[#F7F6F2] bg-[#171B19] border border-[#2A302C]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => onOpenProject(p)}
              className="group cursor-pointer flex flex-col bg-[#111513] border border-[#2A302C] rounded-[2px] p-5 hover:border-[#788477] transition-all shadow-lg"
            >
              <div className="relative aspect-[16/10] bg-[#0B0D0C] border border-[#2A302C] overflow-hidden rounded-[2px]">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0B0D0C]/60 backdrop-blur-[2px]">
                  <span className="font-mono font-bold text-xs tracking-widest uppercase bg-[#65E6D2] text-[#0B0D0C] px-4 py-2 border border-[#65E6D2] shadow-lg">
                    {p.badge}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-mono text-xs text-[#65E6D2]">{p.num}</span>
                <h4 className="font-display font-bold text-base md:text-lg text-[#F1EFE8] tracking-tight group-hover:text-[#65E6D2] uppercase transition-colors">
                  {p.title}
                </h4>
              </div>

              <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-[#9EA49F] uppercase border-t border-[#2A302C]/60 pt-2">
                <span>{p.type}</span>
                <span className="text-[#626A65]">{p.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Technical Note */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#626A65] uppercase border-t border-[#2A302C] pt-4 flex-shrink-0">
        <span>04 / 08 ARCHITECTURAL SYSTEMS</span>
        <span>NEXT: TECHNICAL SKILLS →</span>
      </div>
    </div>
  );
}

