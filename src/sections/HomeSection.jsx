import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function HomeSection({
  onOpenSection,
  onNavigateToProjects,
  onNavigateToContact,
}) {
  const scrollContainerRef = useRef(null);

  // Home Secondary Cards Definition
  const CARDS = [
    {
      id: 'about',
      num: '01',
      tag: 'IDENTITY',
      title: 'ABOUT',
      headline: 'DEV MISTRY',
      sub: 'FULL STACK DEVELOPER • MUMBAI',
      description: 'Building scalable web platforms, cloud systems, and intelligent workflows.',
      cta: 'VIEW ABOUT',
      sectionId: 'about',
    },
    {
      id: 'internship',
      num: '02',
      tag: 'EXPERIENCE',
      title: 'INTERNSHIP',
      headline: 'WORK HISTORY',
      sub: 'HORIZON VIEW • APPLIED AI LABS',
      description: '2024 — 2025: Software & UI/UX / 2025 — Present: Agentic AI & Cloud.',
      cta: 'VIEW EXPERIENCE',
      sectionId: 'internship',
    },
    {
      id: 'skills',
      num: '03',
      tag: 'TECH STACK',
      title: 'SKILLS',
      headline: 'SYSTEM MAP',
      sub: 'WEB • BACKEND • CLOUD • AI',
      description: 'React, Next.js, Python, FastAPI, AWS ECS, LangGraph, Terraform.',
      cta: 'VIEW STACK',
      sectionId: 'skills',
    },
    {
      id: 'journey',
      num: '04',
      tag: 'TIMELINE',
      title: 'JOURNEY',
      headline: 'EVOLUTION',
      sub: '2022 ━━━━━ 2026',
      description: 'From web core algorithms to declarative cloud and autonomous AI swarms.',
      cta: 'VIEW JOURNEY',
      sectionId: 'journey',
    },
    {
      id: 'github',
      num: '05',
      tag: 'CODE ARCHIVE',
      title: 'GITHUB',
      headline: 'OPEN SOURCE',
      sub: '@DEVM15 • PUBLIC REPOSITORIES',
      description: 'Arcade, PDFdecoder, Futuredesks, and decentralized multi-agent runtimes.',
      cta: 'OPEN GITHUB',
      sectionId: 'github',
    },
  ];

  // Drag / Horizontal Wheel handler inside cards tray
  const handleWheelOnTray = (e) => {
    if (!scrollContainerRef.current) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // Already horizontal
    scrollContainerRef.current.scrollLeft += e.deltaY;
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-6 md:py-8 px-6 md:px-12 max-w-[1700px] mx-auto select-none overflow-hidden">
      {/* Top Section Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#626A65] uppercase border-b border-[#2A302C] pb-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-[#65E6D2] font-bold">01 / HOME</span>
          <span className="text-white/10">•</span>
          <span className="text-[#9EA49F]">DIGITAL ARCHITECTURE & SYSTEM SPECIFICATIONS</span>
        </div>
        <div className="hidden sm:block text-[#9EA49F]">FULL STACK DEVELOPER // MUMBAI</div>
      </div>

      {/* Main Home Split Layout: Hero On Top, Horizontal Cards Below */}
      <div className="my-auto flex flex-col gap-6 md:gap-8 justify-center overflow-hidden">
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left Column: Monolithic Engineered Headlines */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="font-mono text-[10px] tracking-[0.25em] text-[#65E6D2] uppercase mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#65E6D2] animate-pulse" />
                <span>DEV MISTRY • FULL STACK DEVELOPER</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-[#F1EFE8] tracking-tight uppercase leading-[0.9] mb-4">
                BUILDING
                <br />
                INTELLIGENT
                <br />
                <span className="text-[#65E6D2]">SYSTEMS.</span>
              </h1>

              <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-[#9EA49F] tracking-[0.2em] uppercase">
                <span className="px-2.5 py-0.5 bg-[#171B19] border border-[#2A302C] rounded-[2px] text-[#F1EFE8]">
                  WEB
                </span>
                <span>•</span>
                <span className="px-2.5 py-0.5 bg-[#171B19] border border-[#2A302C] rounded-[2px] text-[#F1EFE8]">
                  CLOUD
                </span>
                <span>•</span>
                <span className="px-2.5 py-0.5 bg-[#171B19] border border-[#2A302C] rounded-[2px] text-[#F1EFE8]">
                  AGENTIC AI
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Clean Rectangular Archive Photograph */}
          <div className="lg:col-span-5 flex justify-start lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/3] sm:aspect-[16/11] bg-[#0D1211] border border-[rgba(241,239,232,0.15)] rounded-[2px] overflow-hidden group shadow-2xl"
            >
              <img
                src="/img/dev_portrait.jpg"
                alt="Dev Mistry"
                className="w-full h-full object-cover contrast-[1.08] brightness-[0.95] grayscale-[30%] group-hover:grayscale-0 group-hover:contrast-105 group-hover:brightness-100 transition-all duration-700 ease-out"
              />
              <div className="absolute top-3 left-3 font-mono text-[8px] tracking-widest text-[#F1EFE8] bg-[#050706]/85 px-2 py-0.5 backdrop-blur-sm border border-[rgba(241,239,232,0.12)] uppercase">
                ID: 01 // DEV MISTRY
              </div>
              <div className="absolute bottom-3 right-3 font-mono text-[8px] tracking-widest text-[#65E6D2] bg-[#050706]/85 px-2 py-0.5 backdrop-blur-sm border border-[rgba(241,239,232,0.12)] uppercase">
                LOC: MUMBAI
              </div>
            </motion.div>
          </div>
        </div>

        {/* HORIZONTAL CARDS EXHIBITION TRAY */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3 font-mono text-[10px] tracking-[0.2em] text-[#626A65] uppercase">
            <span className="flex items-center gap-2">
              <span className="text-[#65E6D2]">SYSTEM SPECIFICATION CARDS</span>
              <span className="text-white/10">•</span>
              <span>SCROLL HORIZONTALLY</span>
            </span>
            <span className="hidden sm:inline text-[#9EA49F]">DRAG / WHEEL ━━━━━→</span>
          </div>

          <div
            ref={scrollContainerRef}
            onWheel={handleWheelOnTray}
            className="flex items-stretch gap-4 overflow-x-auto pb-3 no-scrollbar scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* 5 Secondary Cards */}
            {CARDS.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => onOpenSection(card.sectionId)}
                className="group snap-start flex-shrink-0 w-[260px] sm:w-[290px] md:w-[320px] bg-[#111513]/90 border border-[#2A302C] hover:border-[#65E6D2]/60 p-5 rounded-[2px] transition-all duration-300 opacity-85 hover:opacity-100 hover:-translate-y-1.5 shadow-lg flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#2A302C] mb-3 font-mono text-[9px] uppercase tracking-widest text-[#626A65]">
                    <span className="text-[#65E6D2] font-bold">{card.num} / {card.title}</span>
                    <span>{card.tag}</span>
                  </div>

                  <h3 className="font-display font-black text-xl text-[#F1EFE8] uppercase tracking-tight group-hover:text-[#65E6D2] transition-colors leading-none mb-1">
                    {card.headline}
                  </h3>
                  <div className="font-mono text-[9px] text-[#9EA49F] uppercase tracking-wider mb-3">
                    {card.sub}
                  </div>

                  <p className="font-sans text-xs text-[#9EA49F] font-light leading-relaxed mb-4">
                    {card.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#2A302C] flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-[#F1EFE8] group-hover:text-[#65E6D2] transition-colors">
                  <span>{card.cta}</span>
                  <span className="transition-transform group-hover:translate-x-1">→ →</span>
                </div>
              </motion.div>
            ))}

            {/* Card 06: Selected Projects Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              onClick={onNavigateToProjects}
              className="group snap-start flex-shrink-0 w-[260px] sm:w-[290px] md:w-[320px] bg-[#111513]/90 border border-[#2A302C] hover:border-[#65E6D2]/60 p-5 rounded-[2px] transition-all duration-300 opacity-85 hover:opacity-100 hover:-translate-y-1.5 shadow-lg flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#2A302C] mb-3 font-mono text-[9px] uppercase tracking-widest text-[#626A65]">
                  <span className="text-[#65E6D2] font-bold">06 / EXHIBITION</span>
                  <span>PORTFOLIO</span>
                </div>

                <h3 className="font-display font-black text-xl text-[#F1EFE8] uppercase tracking-tight group-hover:text-[#65E6D2] transition-colors leading-none mb-1">
                  SELECTED PROJECTS
                </h3>
                <div className="font-mono text-[9px] text-[#9EA49F] uppercase tracking-wider mb-3">
                  ARCADE • PDF DECODER • CLUSTER
                </div>

                <p className="font-sans text-xs text-[#9EA49F] font-light leading-relaxed mb-4">
                  Curated case studies covering distributed architecture, agentic AI, and responsive web platforms.
                </p>
              </div>

              <div className="pt-3 border-t border-[#2A302C] flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-[#F1EFE8] group-hover:text-[#65E6D2] transition-colors">
                <span>VIEW ALL PROJECTS</span>
                <span className="transition-transform group-hover:translate-x-1">→ →</span>
              </div>
            </motion.div>

            {/* Card 07: Direct Contact CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.52 }}
              onClick={onNavigateToContact}
              className="group snap-start flex-shrink-0 w-[260px] sm:w-[290px] md:w-[320px] bg-[#171B19]/90 border border-[#65E6D2]/40 hover:border-[#65E6D2] p-5 rounded-[2px] transition-all duration-300 opacity-90 hover:opacity-100 hover:-translate-y-1.5 shadow-lg flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#2A302C] mb-3 font-mono text-[9px] uppercase tracking-widest text-[#626A65]">
                  <span className="text-[#65E6D2] font-bold">07 / CORRESPONDENCE</span>
                  <span>AVAILABLE '26</span>
                </div>

                <h3 className="font-display font-black text-xl text-[#F1EFE8] uppercase tracking-tight group-hover:text-[#65E6D2] transition-colors leading-none mb-1">
                  LET'S BUILD
                </h3>
                <div className="font-mono text-[9px] text-[#65E6D2] uppercase tracking-wider mb-3">
                  CONSULTING & ENGINEERING
                </div>

                <p className="font-sans text-xs text-[#9EA49F] font-light leading-relaxed mb-4">
                  Have a challenging distributed architecture or agentic deployment? Transmit an inquiry.
                </p>
              </div>

              <div className="pt-3 border-t border-[#2A302C] flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-[#65E6D2] font-bold">
                <span>INITIATE CONTACT</span>
                <span className="transition-transform group-hover:translate-x-1">↗</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Exploration Prompts */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-[#626A65] uppercase border-t border-[#2A302C] pt-3 flex-shrink-0">
        <span>DEV MISTRY • MUMBAI</span>
        <div className="flex items-center gap-6">
          <button
            onClick={onNavigateToProjects}
            className="text-[#9EA49F] hover:text-[#65E6D2] transition-colors cursor-pointer"
          >
            PROJECTS [02] →
          </button>
          <button
            onClick={onNavigateToContact}
            className="text-[#F1EFE8] hover:text-[#65E6D2] transition-colors cursor-pointer"
          >
            CONTACT [03] →
          </button>
        </div>
      </div>
    </div>
  );
}
