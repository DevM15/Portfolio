import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InfiniteSpiral from '../components/InfiniteSpiral/InfiniteSpiral';
import { PROGRAMMING_LANGUAGES } from '../components/InfiniteSpiral/languagesData';

const STACK_MAP = [
  {
    category: 'WEB',
    description: 'Reactive client architecture & high-throughput APIs',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit'],
  },
  {
    category: 'BACKEND',
    description: 'Deterministic micro-services & stateful storage',
    skills: ['Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    category: 'CLOUD & DEVOPS',
    description: 'Multi-region topology & zero-trust boundaries',
    skills: ['AWS ECS / S3', 'Terraform IaC', 'Docker', 'Kubernetes', 'CI/CD Pipelines'],
  },
  {
    category: 'AGENTIC AI',
    description: 'Cognitive reasoning networks & model telemetry',
    skills: ['LangGraph', 'MCP Protocol', 'LLM Agents', 'RAG Retrieval', 'Computer Vision / PyTorch'],
  },
];

export default function SkillsSection({ onBack }) {
  const [activeTab, setActiveTab] = useState('spiral'); // 'spiral' | 'matrix'
  const [selectedLanguage, setSelectedLanguage] = useState(PROGRAMMING_LANGUAGES[0]);

  return (
    <div className="w-full h-full flex flex-col justify-between py-8 px-6 md:px-12 max-w-[1600px] mx-auto select-none text-[var(--text-primary)]">
      {/* Top Section Metadata & Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-wider text-[var(--text-secondary)] uppercase border-b border-[var(--border-primary)] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[var(--accent)] font-semibold">03 / SKILLS</span>
          <span className="opacity-40">•</span>
          <span className="text-[var(--text-secondary)]">DIGITAL TECHNICAL MAP & CORE LANGUAGES</span>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 p-1 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-[2px]">
          <button
            onClick={() => setActiveTab('spiral')}
            data-cursor="button"
            className={`px-3 py-1 rounded-[2px] transition-all cursor-pointer font-semibold ${
              activeTab === 'spiral'
                ? 'bg-[var(--accent)] text-[#F7F6F2] shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            01 // 3D LANGUAGE SPIRAL
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            data-cursor="button"
            className={`px-3 py-1 rounded-[2px] transition-all cursor-pointer font-semibold ${
              activeTab === 'matrix'
                ? 'bg-[var(--accent)] text-[#F7F6F2] shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            02 // DOMAIN ARCHITECTURE
          </button>
        </div>

        {onBack && (
          <button
            onClick={onBack}
            data-cursor="button"
            className="text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            ← BACK TO HOME
          </button>
        )}
      </div>

      {/* Main Exhibition Content Area */}
      <div className="my-auto py-4 w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'spiral' ? (
            <motion.div
              key="language-spiral-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Side: 3D Infinite Spiral Container */}
              <div className="lg:col-span-8 relative h-[480px] sm:h-[540px] rounded-[2px] border border-[var(--border-primary)] bg-[var(--bg-surface)]/60 backdrop-blur-xs overflow-hidden shadow-xs flex flex-col">
                {/* Spiral Header Overlay */}
                <div className="absolute top-4 left-6 right-6 z-20 flex items-center justify-between font-mono text-[10px] tracking-wider text-[var(--text-secondary)] pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                    <span className="font-semibold text-[var(--text-primary)]">CORE LANGUAGES // 3D HELIX</span>
                  </div>
                  <span className="hidden sm:inline opacity-70">
                    DRAG VERTICALLY TO SPIN • HOVER TO PAUSE
                  </span>
                </div>

                {/* 3D Infinite Spiral Component */}
                <div className="w-full h-full pt-8 pb-4">
                  <InfiniteSpiral
                    items={PROGRAMMING_LANGUAGES}
                    animationMode="all"
                    speed={0.45}
                    direction="up"
                    radius={190}
                    cardWidth={130}
                    cardHeight={130}
                    verticalSpacing={70}
                    perspective={1100}
                    cardsPerTurn={6.5}
                    cardRadius={10}
                    centerScale={1.22}
                    edgeFade={0.28}
                    edgeBlur={4}
                    pauseOnHover={true}
                    onSelect={(lang) => setSelectedLanguage(lang)}
                  />
                </div>

                {/* Bottom Spiral Guide */}
                <div className="absolute bottom-3 left-6 right-6 z-20 flex items-center justify-between font-mono text-[9px] text-[var(--text-secondary)] pointer-events-none border-t border-[var(--border-subtle)] pt-2">
                  <span>12 PRODUCTION RUNTIMES & COMPILERS</span>
                  <span className="text-[var(--accent)]">CLICK ANY CARD TO INSPECT SPEC</span>
                </div>
              </div>

              {/* Right Side: Active Language Spec & Architecture Detail Card */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <motion.div
                  key={selectedLanguage.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-[2px] shadow-xs hover:border-[var(--accent)] transition-colors"
                >
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-[var(--accent)] uppercase mb-4 font-semibold border-b border-[var(--border-subtle)] pb-2">
                    <span>RUNTIME SPECIFICATION</span>
                    <span>{selectedLanguage.badge}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                      {selectedLanguage.iconSvg}
                    </div>
                    <div>
                      <h4 className="text-2xl font-display font-bold text-[var(--text-primary)] leading-tight">
                        {selectedLanguage.title}
                      </h4>
                      <p className="font-mono text-xs text-[var(--text-secondary)]">
                        Domain: {selectedLanguage.category}
                      </p>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                    {selectedLanguage.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 font-mono text-xs border-t border-[var(--border-subtle)] pt-4">
                    <div>
                      <span className="text-[10px] text-[var(--text-secondary)] uppercase block mb-1">Proficiency</span>
                      <span className="text-[var(--text-primary)] font-semibold">{selectedLanguage.level}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--text-secondary)] uppercase block mb-1">Production Time</span>
                      <span className="text-[var(--accent)] font-semibold">{selectedLanguage.experience}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Quick Capability Matrix Mini-Card */}
                <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-[2px] font-mono text-[11px] text-[var(--text-secondary)]">
                  <div className="flex items-center justify-between uppercase text-[10px] text-[var(--text-primary)] font-semibold mb-3">
                    <span>SYSTEM COMPILER PIPELINE</span>
                    <span className="text-[var(--accent)]">ONLINE</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Interactive Drag Physics</span>
                      <span className="text-[var(--accent)]">ACTIVE</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>3D Space Perspective</span>
                      <span className="text-[var(--text-primary)]">1100px</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Adaptive Inertia</span>
                      <span className="text-[var(--text-primary)]">60 FPS</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="domain-matrix-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {STACK_MAP.map((group, idx) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="p-6 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-[2px] flex flex-col justify-between shadow-xs hover:border-[var(--accent)] transition-colors min-h-[380px]"
                >
                  <div>
                    <div className="font-mono text-[9px] tracking-wider text-[var(--accent)] uppercase mb-2 font-semibold">
                      DOMAIN / 0{idx + 1}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] uppercase tracking-tight leading-none mb-3">
                      {group.category}
                    </h3>
                    <p className="font-sans text-xs text-[var(--text-secondary)] font-normal leading-relaxed mb-6">
                      {group.description}
                    </p>
                  </div>

                  <ul className="space-y-2.5 font-mono text-xs border-t border-[var(--border-subtle)] pt-4">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center justify-between text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <span>{skill}</span>
                        <span className="text-[var(--accent)] text-[10px]">↗</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-[var(--text-secondary)] uppercase border-t border-[var(--border-primary)] pt-4">
        <span>ARCHITECTURAL STACK MAP & 3D RUNTIME ENGINE</span>
        <span>DEPLOYABLE 2026 // MUMBAI 19°N</span>
      </div>
    </div>
  );
}
