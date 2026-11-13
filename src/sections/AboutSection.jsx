import { useState } from 'react';
import { motion } from 'framer-motion';
import DecayCard from '../components/DecayCard/DecayCard';

export default function AboutSection({ onBack }) {
  const [photoVariant, setPhotoVariant] = useState('cutout'); // 'cutout' | 'studio'
  const activeImage = photoVariant === 'cutout' ? '/img/dev_pic.png' : '/img/dev_portrait.jpg';

  return (
    <div className="w-full h-full flex flex-col justify-between py-10 px-6 md:px-14 max-w-[1600px] mx-auto select-none text-[var(--text-primary)]">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-wider text-[var(--text-secondary)] uppercase border-b border-[var(--border-primary)] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[var(--accent)] font-semibold">01 / ABOUT</span>
          <span className="opacity-40">•</span>
          <span className="text-[var(--text-secondary)]">IDENTITY & ARCHITECTURAL SPECIFICATION</span>
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

      {/* Main Exhibition Content */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4">
        {/* Left Column: Monolithic Headline, Statement & Technical Badges */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[10px] tracking-wider text-[var(--accent)] uppercase block mb-3 font-semibold">
              PROFILE SPECIFICATION // REF. 01
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-[var(--text-primary)] uppercase tracking-tight leading-[0.94] mb-5">
              DEV MISTRY
              <br />
              <span className="text-[var(--text-secondary)]">SOFTWARE ARCHITECT</span>
              <br />
              <span className="text-[var(--accent)]">CLOUD • AGENTIC AI</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed max-w-xl mb-6">
              Engineering high-availability client architectures, resilient distributed microservices, and autonomous multi-agent reasoning graphs. Rooted in Mumbai, building for global scale.
            </p>
          </motion.div>

          {/* Technical Attribute Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-[2px] shadow-xs">
              <span className="text-[9px] tracking-[0.2em] text-[var(--text-muted)] uppercase block mb-1">
                LOCATION
              </span>
              <h4 className="text-sm font-bold text-[var(--text-primary)]">MUMBAI, IN</h4>
              <p className="text-[10px] text-[var(--accent)] mt-1 font-semibold">19°N · 72°E</p>
            </div>

            <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-[2px] shadow-xs">
              <span className="text-[9px] tracking-[0.2em] text-[var(--text-muted)] uppercase block mb-1">
                DISCIPLINE
              </span>
              <h4 className="text-sm font-bold text-[var(--text-primary)]">SYSTEM ARCH</h4>
              <p className="text-[10px] text-[var(--accent)] mt-1 font-semibold">WEB • CLOUD • AI</p>
            </div>

            <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-[2px] shadow-xs">
              <span className="text-[9px] tracking-[0.2em] text-[var(--text-muted)] uppercase block mb-1">
                CONTRACT
              </span>
              <h4 className="text-sm font-bold text-[var(--text-primary)]">OPEN 2026</h4>
              <p className="text-[10px] text-[var(--accent)] mt-1 font-semibold">DEPLOYABLE</p>
            </div>
          </div>

          {/* Active Research Banner */}
          <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-[2px] font-mono text-xs shadow-xs">
            <div className="flex items-center justify-between uppercase text-[9px] text-[var(--accent)] font-semibold mb-1">
              <span>ACTIVE RESEARCH & EXPERIMENTS</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                RUNTIME 01
              </span>
            </div>
            <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed">
              Decentralized consensus engines, deterministic state constraints, and agentic reasoning swarms.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive <DecayCard /> dev_pic Showcase */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-3 rounded-[3px] border border-[var(--border-primary)] bg-[var(--bg-surface)]/80 backdrop-blur-md shadow-lg flex flex-col items-center"
          >
            {/* Specimen Header & Variant Controls */}
            <div className="w-full flex items-center justify-between pb-2.5 mb-2.5 border-b border-[var(--border-subtle)] font-mono text-[9px] tracking-wider text-[var(--text-secondary)] uppercase">
              <div className="flex items-center gap-1.5 font-bold text-[var(--text-primary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                <span>DEV MISTRY // SPEC.01</span>
              </div>

              {/* Photo Mode Switcher */}
              <div className="flex items-center gap-1 bg-[var(--bg-primary)] p-0.5 rounded-[2px] border border-[var(--border-subtle)]">
                <button
                  onClick={() => setPhotoVariant('cutout')}
                  data-cursor="button"
                  className={`px-2 py-0.5 rounded-[1px] transition-colors cursor-pointer ${
                    photoVariant === 'cutout'
                      ? 'bg-[var(--accent)] text-[#F7F6F2] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  CUTOUT
                </button>
                <button
                  onClick={() => setPhotoVariant('studio')}
                  data-cursor="button"
                  className={`px-2 py-0.5 rounded-[1px] transition-colors cursor-pointer ${
                    photoVariant === 'studio'
                      ? 'bg-[var(--accent)] text-[#F7F6F2] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  STUDIO
                </button>
              </div>
            </div>

            {/* Central WebGL DecayCard Component */}
            <div
              className="relative overflow-visible flex items-center justify-center"
              data-cursor="explore"
            >
              <DecayCard
                image={activeImage}
                width={310}
                height={400}
                intensity={0.55}
                sensitivity={0.5}
                hoverDecay={0.06}
                recovery={0.65}
                idle={0.3}
                grain={0.28}
                detail={5}
                pattern={4}
                flow={0.35}
                chroma={0.15}
                travel={35}
                tilt={10}
                scope="card"
                radius={2}
              >
                {/* Floating Architectural Badge */}
                <div className="font-mono text-xs uppercase tracking-wider bg-[var(--bg-surface)]/85 backdrop-blur-md p-3 rounded-[2px] border border-[var(--border-primary)] shadow-md">
                  <div className="flex items-center justify-between text-[var(--accent)] font-bold text-[8.5px] mb-1">
                    <span>DEV MISTRY // PORTRAIT</span>
                    <span>FIG. 01</span>
                  </div>
                  <div className="text-[var(--text-primary)] font-display font-bold text-sm leading-tight">
                    DEV MISTRY
                  </div>
                  <div className="text-[var(--text-secondary)] text-[8.5px]">
                    FULL STACK ARCHITECT • MUMBAI
                  </div>
                </div>
              </DecayCard>
            </div>

            {/* Bottom Interaction Guide */}
            <div className="w-full flex items-center justify-between pt-2.5 mt-2.5 border-t border-[var(--border-subtle)] font-mono text-[8px] text-[var(--text-secondary)] uppercase">
              <span>HOVER & MOVE CURSOR TO DECAY</span>
              <span className="text-[var(--accent)] font-semibold">GLSL SIMPLEX SHADER</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Architectural Metadata */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-[var(--text-secondary)] uppercase border-t border-[var(--border-primary)] pt-4">
        <span>DEV MISTRY // SPEC 01 • EXHIBITION</span>
        <span>MUMBAI • 2026 // 19°N · 72°E</span>
      </div>
    </div>
  );
}
