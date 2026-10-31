import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PROJECTS = [
  {
    id: '01',
    title: 'ONEPLAN',
    category: 'WEB / DATA / CLOUD',
    tagline: 'Financial intelligence platform.',
    details: 'Autonomous fiscal telemetry pipeline with sub-40ms event ingestion, reactive state synchronization, and secure multi-tier storage.',
    accent: '#176D6C', // Muted Teal
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
    meta: ['HIGH CONCURRENCY', 'EVENT STREAMING', 'REDIS / AWS ECS'],
  },
  {
    id: '02',
    title: 'AGENT SYSTEMS',
    category: 'AI / LLM / ORCHESTRATION',
    tagline: 'Multi-agent consensus & execution fabric.',
    details: 'Decentralized cognitive network utilizing structured tool invocation, dynamic context distillation, and deterministic self-correcting validation loops.',
    accent: '#686B5C', // Muted Olive
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
    meta: ['AGENTS', 'TOOLS', 'MEMORY', 'EXECUTION'],
  },
  {
    id: '03',
    title: 'CLOUD INFRASTRUCTURE',
    category: 'AWS / DEVOPS / AUTOMATION',
    tagline: 'Immutable multi-region mesh architecture.',
    details: 'Declarative Terraform topology with zero-trust network boundaries, canary deploy orchestration, and unified distributed tracing.',
    accent: '#582C2B', // Muted Burgundy
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
    meta: ['TERRAFORM', 'KUBERNETES', 'MULTI-REGION', 'WIREGUARD'],
  },
  {
    id: '04',
    title: 'COMPUTER VISION',
    category: 'PYTORCH / ML / CV',
    tagline: 'Real-time neural observation pipeline.',
    details: 'Continuous video inference engine with edge tensor dispatching, low-latency spatial segmentation, and automated model health telemetry.',
    accent: '#E8D9DD', // Soft Dusty Pink
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1600&q=80',
    meta: ['TENSORRT', '60 FPS INFERENCE', 'EDGE PIPELINE', 'ZERO DOWNTIME'],
  },
];

export default function WorkExperience({ onNavigateContact }) {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [modalProject, setModalProject] = useState(null);

  const activeProj = PROJECTS[activeProjectIdx];

  return (
    <section className="relative w-screen h-screen flex-shrink-0 flex flex-col justify-between px-6 md:px-16 pt-20 pb-10 overflow-hidden select-none bg-[#11140F]">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-olive uppercase border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-4">
          <span className="text-ivory font-medium">02 / MY WORK</span>
          <span className="text-white/10">•</span>
          <span className="text-ivory-secondary">SELECTED EXHIBITION</span>
        </div>
        <div className="hidden sm:block">HORIZONTAL EXHIBIT // 01—04</div>
      </div>

      {/* Main Exhibition Layout: Project Stage occupying 85% width */}
      <div className="my-auto w-full max-w-[1700px] mx-auto py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left: Project Number, Huge Title & Minimal 1-2 line description */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="font-mono text-sm tracking-[0.25em] text-olive mb-4 flex items-center gap-3">
              <span>{activeProj.id}</span>
              <span className="w-8 h-px bg-olive/40 inline-block" />
              <span className="text-ivory-secondary">{activeProj.category}</span>
            </div>

            {/* Huge Headline Title */}
            <h2 className="text-giant font-display font-black text-ivory tracking-tighter uppercase leading-[0.88] mb-6">
              {activeProj.title}
            </h2>

            {/* 1-2 Line Description Only */}
            <p className="font-sans text-ivory-secondary text-base md:text-xl font-light leading-snug max-w-md mb-8">
              {activeProj.tagline}
            </p>

            {/* View Project Button */}
            <div>
              <button
                onClick={() => setModalProject(activeProj)}
                className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-ivory uppercase pb-1 border-b border-ivory group hover:text-ivory-secondary hover:border-ivory-secondary transition-all"
              >
                <span>VIEW PROJECT</span>
                <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">
                  ↗
                </span>
              </button>
            </div>
          </div>

          {/* Right: Large Editorial Visual Frame with Peek of Next Project */}
          <div className="lg:col-span-7 relative flex items-center">
            {/* Primary Project Visual */}
            <div
              onClick={() => setModalProject(activeProj)}
              className="relative w-full aspect-[16/10] bg-[#090A08] border border-white/10 overflow-hidden cursor-pointer group"
            >
              <img
                src={activeProj.image}
                alt={activeProj.title}
                className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-out"
              />

              {/* Architectural Technical Micro-Labels */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
                {activeProj.meta.map((label) => (
                  <span
                    key={label}
                    className="font-mono text-[9px] tracking-widest text-ivory/90 bg-black/70 px-2.5 py-1 backdrop-blur-sm border border-white/10 uppercase"
                  >
                    {label}
                  </span>
                ))}
              </div>

              {/* Accent corner marker */}
              <div
                className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
                style={{ backgroundColor: activeProj.accent, opacity: 0.6 }}
              />
            </div>

            {/* Peek of Next Project on the Right edge to communicate "THERE IS MORE →" */}
            <div
              onClick={() => setActiveProjectIdx((prev) => (prev + 1) % PROJECTS.length)}
              className="hidden xl:flex absolute -right-28 top-0 bottom-0 w-24 bg-stone-900/40 border border-white/5 opacity-40 hover:opacity-80 transition-opacity cursor-pointer overflow-hidden items-center justify-center"
            >
              <span className="rotate-90 font-mono text-[9px] tracking-[0.25em] text-ivory whitespace-nowrap">
                NEXT // 0{((activeProjectIdx + 1) % PROJECTS.length) + 1} →
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Timeline & Navigation: 01 ━━━━━ 02 ━━━━━ 03 ━━━━━ 04 */}
      <div className="border-t border-white/[0.06] pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] tracking-[0.2em] text-olive uppercase">
        {/* Project Selector Numbers & Progress Line */}
        <div className="flex items-center gap-4 sm:gap-6">
          {PROJECTS.map((proj, idx) => (
            <div key={proj.id} className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={() => setActiveProjectIdx(idx)}
                className={`transition-colors cursor-pointer ${
                  activeProjectIdx === idx ? 'text-ivory font-bold' : 'text-olive hover:text-ivory-secondary'
                }`}
              >
                0{idx + 1}
              </button>

              {idx < PROJECTS.length - 1 && (
                <span
                  className={`w-8 sm:w-16 h-px transition-colors ${
                    activeProjectIdx >= idx ? 'bg-ivory/60' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Quick link to Contact */}
        <button
          onClick={onNavigateContact}
          className="flex items-center gap-2 text-ivory hover:text-white transition-colors cursor-pointer"
        >
          <span>PROCEED TO CONTACT</span>
          <span>→</span>
        </button>
      </div>

      {/* MODAL DOSSIER */}
      <AnimatePresence>
        {modalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-[#11140F] border border-white/20 p-6 md:p-10 text-ivory"
            >
              <div className="flex items-start justify-between pb-6 border-b border-white/10">
                <div>
                  <div className="font-mono text-[10px] tracking-widest text-olive uppercase mb-1">
                    PROJECT DOSSIER // {modalProject.id}
                  </div>
                  <h3 className="font-display font-bold text-3xl tracking-tight uppercase">
                    {modalProject.title}
                  </h3>
                  <p className="font-mono text-xs text-olive mt-1">{modalProject.category}</p>
                </div>
                <button
                  onClick={() => setModalProject(null)}
                  className="font-mono text-xs uppercase tracking-widest px-3 py-1.5 border border-white/20 hover:bg-ivory hover:text-black transition-colors"
                >
                  CLOSE [ESC]
                </button>
              </div>

              <div className="my-6 aspect-video bg-[#090A08] border border-white/10 overflow-hidden">
                <img
                  src={modalProject.image}
                  alt={modalProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="font-sans text-ivory-secondary text-base leading-relaxed font-light mb-6">
                {modalProject.details}
              </p>

              <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
                {modalProject.meta.map((m) => (
                  <span
                    key={m}
                    className="font-mono text-[10px] px-3 py-1 bg-white/[0.04] border border-white/10 text-ivory-secondary"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

