import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['ALL', 'SYSTEM ARCHITECTURE', 'INTELLIGENT AGENTS', 'CLOUD INFRASTRUCTURE'];

const PROJECTS = [
  {
    id: '01',
    title: 'ONEPLAN ARCHITECTURE',
    category: 'SYSTEM ARCHITECTURE',
    year: '2025',
    scale: 'ENTERPRISE DEPLOYMENT',
    typology: 'Productivity Platform & Orchestration',
    description: 'High-concurrency planning platform featuring reactive event streaming, multi-tier state isolation, and deterministic task resolution.',
    metrics: ['Sub-40ms latency', '99.99% Availability', 'AWS Cloud Native'],
    stack: ['React', 'FastAPI', 'PostgreSQL', 'AWS ECS', 'Redis'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    blueprint: 'TIER-1 CORE ARCHITECTURE',
  },
  {
    id: '02',
    title: 'VISION INFERENCE LAB',
    category: 'INTELLIGENT AGENTS',
    year: '2025',
    scale: 'DISTRIBUTED PIPELINE',
    typology: 'Real-Time Neural Inference',
    description: 'Autonomous computer vision system equipped with parallel model dispatching, edge caching, and self-calibrating observation pipelines.',
    metrics: ['60 FPS Pipeline', 'Zero-downtime Canary', 'TensorRT Runtime'],
    stack: ['Python', 'PyTorch', 'S3', 'Lambda', 'Docker'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    blueprint: 'NEURAL SIGNAL DEPLOYMENT',
  },
  {
    id: '03',
    title: 'TERRAFORM CLOUD MESH',
    category: 'CLOUD INFRASTRUCTURE',
    year: '2024',
    scale: 'MULTI-REGION TOPOLOGY',
    typology: 'Resilient Cloud Backbone',
    description: 'Reproducible multi-region AWS infrastructure defined completely via declarative IaC, automated zero-trust security boundaries, and telemetry.',
    metrics: ['3 Global Regions', 'Immutable Topology', '100% IaC Governed'],
    stack: ['Terraform', 'AWS', 'Kubernetes', 'Prometheus', 'WireGuard'],
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
    blueprint: 'MULTI-AZ FAULT ISOLATION',
  },
  {
    id: '04',
    title: 'AUTONOMOUS AGENT LAB',
    category: 'INTELLIGENT AGENTS',
    year: '2026',
    scale: 'REACTIVE WORKSPACE',
    typology: 'Multi-Agent Consensus Network',
    description: 'Collaborative swarm execution harness using structured protocol messaging, self-correcting validation loops, and dynamic tool orchestration.',
    metrics: ['Multi-Agent Swarm', 'Deterministic Fallbacks', 'MCP Interop'],
    stack: ['Python', 'LangGraph', 'FastAPI', 'Vector DB', 'MCP'],
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
    blueprint: 'RECURSIVE REASONING TOPOLOGY',
  },
];

export default function HorizontalProjects() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' | 'index'
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = activeCategory === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-[1700px] mx-auto bg-[#080809]">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-stone-500 mb-3">
            <span>[ 01 ]</span>
            <span>PORTFOLIO ARCHIVE</span>
          </div>
          <h2 className="text-display-section font-display font-medium text-white tracking-tight uppercase">
            SELECTED PROJECTS
          </h2>
        </div>

        {/* View Toggle & Count */}
        <div className="flex items-center gap-6 font-mono text-xs">
          <div className="flex items-center border border-white/10 p-0.5">
            <button
              onClick={() => setViewMode('gallery')}
              className={`px-3 py-1.5 transition-colors uppercase tracking-wider ${
                viewMode === 'gallery' ? 'bg-white text-black' : 'text-stone-400 hover:text-white'
              }`}
            >
              GALLERY
            </button>
            <button
              onClick={() => setViewMode('index')}
              className={`px-3 py-1.5 transition-colors uppercase tracking-wider ${
                viewMode === 'index' ? 'bg-white text-black' : 'text-stone-400 hover:text-white'
              }`}
            >
              INDEX LIST
            </button>
          </div>
          <span className="text-stone-500 hidden sm:inline">
            TOTAL: {PROJECTS.length.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 md:gap-4 py-6 border-b border-white/[0.08] font-mono text-[11px] tracking-[0.16em]">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 transition-all ${
              activeCategory === cat
                ? 'text-white border-b-2 border-white font-medium'
                : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GALLERY VIEW (Kerimov Monograph Style) */}
      {viewMode === 'gallery' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 pt-12">
          {filtered.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setSelectedProject(proj)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image Frame with Architectural Aspect Ratio */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-900 border border-white/10">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover grayscale contrast-110 brightness-90 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-out"
                />
                
                {/* Architectural Stamp Overlay */}
                <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest text-white/90 bg-black/60 px-2.5 py-1 backdrop-blur-sm border border-white/10">
                  {proj.id} / {proj.blueprint}
                </div>

                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[10px] tracking-widest text-black bg-white px-3 py-1">
                  VIEW DOSSIER ↗
                </div>
              </div>

              {/* Metadata strip below image */}
              <div className="mt-5 flex items-baseline justify-between border-b border-white/[0.08] pb-3">
                <h3 className="font-display font-medium text-xl md:text-2xl text-white tracking-tight group-hover:text-stone-300 transition-colors">
                  {proj.title}
                </h3>
                <span className="font-mono text-xs text-stone-500">{proj.year}</span>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-stone-400 font-mono">
                <span>{proj.typology}</span>
                <span className="text-[10px] tracking-wider text-stone-600 uppercase">
                  {proj.scale}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* INDEX LIST VIEW (Kerimov Architectural Archive Table) */
        <div className="pt-8 divide-y divide-white/[0.08]">
          <div className="grid grid-cols-12 py-3 font-mono text-[10px] tracking-[0.2em] text-stone-600 uppercase">
            <div className="col-span-1">NO.</div>
            <div className="col-span-4 md:col-span-4">PROJECT TITLE</div>
            <div className="col-span-4 hidden md:block">TYPOLOGY & STACK</div>
            <div className="col-span-2 text-right md:text-left">SCALE</div>
            <div className="col-span-1 text-right">YEAR</div>
          </div>

          {filtered.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="grid grid-cols-12 items-center py-5 group cursor-pointer hover:bg-white/[0.02] transition-colors"
            >
              <div className="col-span-1 font-mono text-xs text-stone-500">{proj.id}</div>
              <div className="col-span-7 md:col-span-4 font-display font-medium text-lg md:text-xl text-white group-hover:translate-x-2 transition-transform duration-200">
                {proj.title}
              </div>
              <div className="col-span-4 hidden md:block font-mono text-xs text-stone-400">
                {proj.typology}
              </div>
              <div className="col-span-2 hidden md:block font-mono text-[11px] text-stone-500">
                {proj.scale}
              </div>
              <div className="col-span-4 md:col-span-1 text-right font-mono text-xs text-stone-400">
                {proj.year} ↗
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ARCHITECTURAL DOSSIER MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0d0d0f] border border-white/20 p-6 md:p-10 text-white"
            >
              <div className="flex items-start justify-between pb-6 border-b border-white/10">
                <div>
                  <div className="font-mono text-[10px] tracking-widest text-stone-500 uppercase mb-2">
                    PROJECT DOSSIER // {selectedProject.id}
                  </div>
                  <h3 className="font-display font-medium text-3xl tracking-tight uppercase">
                    {selectedProject.title}
                  </h3>
                  <p className="font-mono text-xs text-stone-400 mt-1">{selectedProject.typology}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="font-mono text-xs uppercase tracking-widest px-3 py-1.5 border border-white/20 hover:bg-white hover:text-black transition-colors"
                >
                  CLOSE [ESC]
                </button>
              </div>

              <div className="my-6 aspect-video bg-stone-900 overflow-hidden border border-white/10">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="font-sans text-stone-300 text-base leading-relaxed mb-6 font-light">
                {selectedProject.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-stone-500 uppercase block mb-3">
                    SYSTEM SPECS & METRICS
                  </span>
                  <ul className="space-y-1 font-mono text-xs text-stone-300">
                    {selectedProject.metrics.map((m) => (
                      <li key={m}>— {m}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-stone-500 uppercase block mb-3">
                    TECHNOLOGICAL FRAMEWORK
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[11px] px-2.5 py-1 bg-white/[0.04] border border-white/10 text-stone-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
