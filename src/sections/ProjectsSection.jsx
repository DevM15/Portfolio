import { motion } from 'framer-motion';

export default function ProjectsSection({ onOpenProject, projects, activeFilter, onFilterChange, filters }) {
  const filtered = activeFilter === 'ALL WORK'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="w-full h-full flex flex-col justify-between py-16 px-6 md:px-16 max-w-[1600px] mx-auto select-none overflow-y-auto no-scrollbar text-[var(--text-primary)]">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-wider text-[var(--text-secondary)] uppercase border-b border-[var(--border-primary)] pb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-[var(--accent)] font-semibold">04 / PROJECTS</span>
          <span className="opacity-40">•</span>
          <span className="text-[var(--text-secondary)]">SYSTEM SPECIFICATIONS & ARCHITECTURE</span>
        </div>
        <div className="hidden sm:block text-[var(--text-secondary)]">0{filtered.length} / 0{projects.length} SYSTEMS</div>
      </div>

      {/* Main Layout: Filters & Technical Cards Grid */}
      <div className="my-auto py-8">
        {/* Filters Strip */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-normal uppercase mb-8">
          <span className="text-[var(--text-secondary)] text-[10px] mr-2">CATEGORY:</span>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              data-cursor="button"
              className={`px-3 py-1 transition-all rounded-[2px] cursor-pointer ${
                activeFilter === f
                  ? 'bg-[var(--accent)] text-[#F7F6F2] font-semibold shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-surface)] border border-[var(--border-primary)]'
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
              data-cursor="project"
              className="group cursor-pointer flex flex-col bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-[2px] p-5 hover:border-[var(--accent)] transition-all shadow-sm hover:shadow-md"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1px] bg-[var(--bg-primary)] mb-4">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover contrast-[1.03] transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-[var(--bg-primary)]/90 border border-[var(--border-primary)] text-[8px] font-mono tracking-wider text-[var(--text-primary)] px-2 py-0.5 rounded-[1px]">
                  {p.year}
                </div>
              </div>

              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-[9px] tracking-wider text-[var(--accent)] uppercase font-semibold">
                  {p.num} // {p.badge}
                </span>
                <span className="font-mono text-[8px] tracking-wider text-[var(--text-secondary)] uppercase">
                  {p.category}
                </span>
              </div>

              <div className="flex items-center justify-between mb-2">
                <h4 className="font-display font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {p.title}
                </h4>
                <span className="text-[var(--accent)] text-sm group-hover:translate-x-0.5 transition-transform">↗</span>
              </div>

              <p className="font-sans text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-4">
                {p.type}
              </p>

              <div className="mt-auto pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[8px] font-mono uppercase text-[var(--text-secondary)]">
                <span>SPECIFICATION VIEW</span>
                <span className="text-[var(--accent)] font-semibold">INSPECT →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-[var(--text-secondary)] uppercase border-t border-[var(--border-primary)] pt-4 flex-shrink-0">
        <span>ARCHITECTURAL WORK CATALOG</span>
        <span>MUMBAI • 2026</span>
      </div>
    </div>
  );
}
