import { motion } from 'framer-motion';

export default function ProjectsSection({ onOpenProject, projects, activeFilter, onFilterChange, filters }) {
  const filtered = activeFilter === 'ALL WORK'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="w-full h-full flex flex-col justify-between py-16 px-6 md:px-16 max-w-[1600px] mx-auto select-none overflow-y-auto no-scrollbar">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-wider text-[#788477] uppercase border-b border-[#DED9CE] pb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-[#B96F52] font-semibold">04 / PROJECTS</span>
          <span className="text-black/10">•</span>
          <span className="text-[#788477]">SYSTEM SPECIFICATIONS & ARCHITECTURE</span>
        </div>
        <div className="hidden sm:block text-[#788477]">0{filtered.length} / 0{projects.length} SYSTEMS</div>
      </div>

      {/* Main Layout: Filters & Technical Cards Grid */}
      <div className="my-auto py-8">
        {/* Filters Strip */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-normal uppercase mb-8">
          <span className="text-[#788477] text-[10px] mr-2">CATEGORY:</span>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={`px-3 py-1 transition-all rounded-[2px] cursor-pointer ${
                activeFilter === f
                  ? 'bg-[#B96F52] text-[#F7F6F2] font-semibold shadow-sm'
                  : 'text-[#788477] hover:text-[#252A27] bg-[#FFFFFF] border border-[#DED9CE]'
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
              className="group cursor-pointer flex flex-col bg-[#FFFFFF] border border-[#DED9CE] rounded-[2px] p-5 hover:border-[#B96F52] transition-all shadow-sm hover:shadow-md"
            >
              {/* Project Image Container */}
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[1px] mb-4 bg-[#F7F6F2]">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-[#F7F6F2]/90 border border-[#DED9CE] text-[8px] font-mono tracking-wider text-[#252A27] px-2 py-0.5 rounded-[1px]">
                  {p.category}
                </div>
              </div>

              {/* Title & Description */}
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-display font-bold text-lg text-[#252A27] group-hover:text-[#B96F52] transition-colors">
                  {p.title}
                </h4>
                <span className="text-[#B96F52] text-sm group-hover:translate-x-0.5 transition-transform">↗</span>
              </div>
              <p className="font-sans text-xs text-[#788477] line-clamp-2 leading-relaxed mb-4">
                {p.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-[#DED9CE]/60">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[8px] tracking-wider text-[#788477] bg-[#F7F6F2] px-2 py-0.5 rounded-[1px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Technical Note */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-[#788477] uppercase border-t border-[#DED9CE] pt-4 flex-shrink-0">
        <span>04 / 08 ARCHITECTURAL SYSTEMS</span>
        <span>NEXT: TECHNICAL SKILLS →</span>
      </div>
    </div>
  );
}

