import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HomeSection({
  onOpenSection,
  onNavigateToProjects,
  onNavigateToContact,
}) {
  const containerRef = useRef(null);
  const [activePane, setActivePane] = useState(0);

  // 4 Horizontal Canvas Zones:
  // 0: HERO (Building Intelligent Systems)
  // 1: PROFILE ANCHOR (Center Photograph with Asymmetric Surrounding Image Cards)
  // 2: HORIZONTAL FLOATING EXHIBITION GALLERY (Spaced 3D Perspective Floating Objects)
  // 3: SELECTED PROJECTS & CONTACT CTA
  const PANES_COUNT = 4;

  const handleWheel = (e) => {
    if (!containerRef.current) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    containerRef.current.scrollLeft += delta;
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const scrollPos = el.scrollLeft;
      const paneWidth = el.clientWidth || window.innerWidth;
      const index = Math.round(scrollPos / paneWidth);
      setActivePane(Math.min(Math.max(index, 0), PANES_COUNT - 1));
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToPane = (index) => {
    if (!containerRef.current) return;
    const paneWidth = containerRef.current.clientWidth || window.innerWidth;
    containerRef.current.scrollTo({
      left: index * paneWidth,
      behavior: 'smooth',
    });
  };

  // Image-First Floating Cards Definition
  const FLOATING_CARDS = [
    {
      id: 'about',
      sectionId: 'about',
      num: '01',
      label: '01 / IDENTITY',
      title: 'PROFILE',
      meta: 'DEV MISTRY',
      image: '/img/dev_portrait.jpg',
      rotation: -2,
      perspectiveY: 4,
      offsetY: -25,
    },
    {
      id: 'internship',
      sectionId: 'internship',
      num: '02',
      label: '02 / EXPERIENCE',
      title: 'WORK HISTORY',
      meta: 'HORIZON • APPLIED AI',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      rotation: 1.5,
      perspectiveY: -3,
      offsetY: 35,
    },
    {
      id: 'skills',
      sectionId: 'skills',
      num: '03',
      label: '03 / STACK',
      title: 'SYSTEM MAP',
      meta: 'WEB / CLOUD / AI',
      image: './img/project1.png',
      rotation: -1,
      perspectiveY: 5,
      offsetY: -15,
    },
    {
      id: 'journey',
      sectionId: 'journey',
      num: '04',
      label: '04 / TIMELINE',
      title: 'EVOLUTION',
      meta: '2022 ━━━━━ 2026',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      rotation: 2.2,
      perspectiveY: -4,
      offsetY: 28,
    },
    {
      id: 'github',
      sectionId: 'github',
      num: '05',
      label: '05 / CODE',
      title: 'OPEN SOURCE',
      meta: '@DEVM15 • PUBLIC',
      image: './img/project2.png',
      rotation: -1.8,
      perspectiveY: 3,
      offsetY: -30,
    },
  ];

  return (
    <div
      onWheel={handleWheel}
      className="relative w-full h-full flex flex-col justify-between select-none overflow-hidden"
    >
      {/* ==================== CONTINUOUS HORIZONTAL CANVAS ==================== */}
      <div
        ref={containerRef}
        className="flex-1 w-full flex flex-row overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* ==================== ZONE 01: HERO ==================== */}
        <section className="relative w-screen h-full flex-shrink-0 snap-start flex flex-col justify-between py-8 px-6 md:px-16 max-w-full">
          {/* Top Section Metadata */}
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#626A65] uppercase border-b border-[#2A302C] pb-3">
            <div className="flex items-center gap-3">
              <span className="text-[#65E6D2] font-bold">01 / HERO</span>
              <span className="text-white/10">•</span>
              <span className="text-[#9EA49F]">DIGITAL ARCHITECTURE & SYSTEM SPECIFICATIONS</span>
            </div>
            <div className="hidden sm:block text-[#9EA49F]">HORIZONTAL EXHIBITION [01 / 04]</div>
          </div>

          {/* Hero Main Graphic Composition */}
          <div className="my-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="font-mono text-xs tracking-[0.28em] text-[#65E6D2] uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#65E6D2] animate-pulse" />
                <span>DEV MISTRY • FULL STACK ARCHITECT</span>
              </div>

              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black text-[#F1EFE8] tracking-tight uppercase leading-[0.88] mb-8">
                BUILDING
                <br />
                INTELLIGENT
                <br />
                <span className="text-[#65E6D2]">SYSTEMS.</span>
              </h1>

              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#9EA49F] tracking-[0.22em] uppercase">
                <span className="px-3.5 py-1 bg-[#111513] border border-[#2A302C] rounded-[2px] text-[#F1EFE8]">
                  WEB PLATFORMS
                </span>
                <span>•</span>
                <span className="px-3.5 py-1 bg-[#111513] border border-[#2A302C] rounded-[2px] text-[#F1EFE8]">
                  CLOUD & AWS
                </span>
                <span>•</span>
                <span className="px-3.5 py-1 bg-[#111513] border border-[#2A302C] rounded-[2px] text-[#F1EFE8]">
                  AGENTIC AI SWARMS
                </span>
              </div>
            </motion.div>
          </div>

          {/* Prompt to Advance Horizontally */}
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#626A65] uppercase border-t border-[#2A302C] pt-3">
            <span>SCROLL OR DRAG TO ENTER EXHIBITION</span>
            <button
              onClick={() => scrollToPane(1)}
              className="flex items-center gap-2 text-[#65E6D2] hover:text-white transition-colors cursor-pointer font-bold"
            >
              <span>PROFILE & ANCHOR</span>
              <span className="text-base">→</span>
            </button>
          </div>
        </section>

        {/* ==================== ZONE 02: PROFILE ANCHOR (CENTER PHOTO + ORBITING EDITORIAL CARDS) ==================== */}
        <section className="relative w-screen h-full flex-shrink-0 snap-start flex flex-col justify-between py-6 md:py-8 px-4 md:px-12 max-w-full">
          {/* Top Section Metadata */}
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#626A65] uppercase border-b border-[#2A302C] pb-3">
            <div className="flex items-center gap-3">
              <span className="text-[#65E6D2] font-bold">02 / PROFILE</span>
              <span className="text-white/10">•</span>
              <span className="text-[#9EA49F]">CENTRAL EXHIBITION OBJECT & ASYMMETRIC SATELLITES</span>
            </div>
            <div className="hidden sm:block text-[#9EA49F]">GALLERY CORE [02 / 04]</div>
          </div>

          {/* Spatial 3D Composition with generous negative space */}
          <div
            className="relative my-auto w-full max-w-[1400px] mx-auto min-h-[480px] md:min-h-[540px] flex items-center justify-center"
            style={{ perspective: '1200px' }}
          >
            {/* 1. CENTER PHOTOGRAPH ANCHOR (Medium-Large, Dominant) */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 w-[260px] sm:w-[300px] md:w-[340px] aspect-[3/4] bg-[#0D1211] border border-[rgba(241,239,232,0.18)] hover:border-[#65E6D2] rounded-[2px] overflow-hidden group shadow-2xl transition-all duration-500 hover:scale-[1.02]"
            >
              <img
                src="/img/dev_portrait.jpg"
                alt="Dev Mistry Portrait"
                className="w-full h-full object-cover contrast-[1.08] brightness-[0.95] grayscale-[25%] group-hover:grayscale-0 group-hover:contrast-110 group-hover:brightness-100 transition-all duration-700 ease-out"
              />
              <div className="absolute top-3 left-3 font-mono text-[8px] tracking-widest text-[#F1EFE8] bg-[#050706]/85 px-2 py-0.5 backdrop-blur-sm border border-[rgba(241,239,232,0.14)] uppercase">
                ID: 01 // DEV MISTRY
              </div>
              <div className="absolute bottom-3 right-3 font-mono text-[8px] tracking-widest text-[#65E6D2] bg-[#050706]/85 px-2 py-0.5 backdrop-blur-sm border border-[rgba(241,239,232,0.14)] uppercase">
                LOC: MUMBAI
              </div>
            </motion.div>

            {/* 2. SATELLITE IMAGE-FIRST EDITORIAL CARDS SURROUNDING THE CENTER PHOTO */}

            {/* Card 01: ABOUT (Top-Left Offset, rotate -2deg) */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08 }}
              onClick={() => onOpenSection('about')}
              className="hidden lg:flex absolute -top-4 left-8 xl:left-20 z-10 w-[210px] xl:w-[230px] aspect-[3/4] flex-col cursor-pointer group transition-all duration-500"
              style={{
                transform: 'rotate(-2deg) translateZ(10px)',
              }}
            >
              <div className="relative w-full h-[88%] bg-[#0D1211] border border-[rgba(241,239,232,0.15)] group-hover:border-[#65E6D2]/80 rounded-[2px] overflow-hidden shadow-2xl transition-all duration-300 group-hover:brightness-105 group-hover:scale-[1.02]">
                <img
                  src="/img/dev_portrait.jpg"
                  alt="About"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-2.5 left-2.5 font-mono text-[8px] tracking-widest text-[#F1EFE8] bg-[#050706]/85 px-2 py-0.5 backdrop-blur-sm border border-white/10 uppercase">
                  01 / ABOUT
                </div>
              </div>
              <div className="pt-2 text-center">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#9EA49F] group-hover:text-[#65E6D2] uppercase transition-colors">
                  PROFILE →
                </span>
              </div>
            </motion.div>

            {/* Card 02: INTERNSHIP (Middle-Left, rotate 1.5deg) */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 1.5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.16 }}
              onClick={() => onOpenSection('internship')}
              className="hidden lg:flex absolute bottom-4 left-2 xl:left-10 z-10 w-[210px] xl:w-[230px] aspect-[3/4] flex-col cursor-pointer group transition-all duration-500"
              style={{
                transform: 'rotate(1.5deg) translateZ(5px)',
              }}
            >
              <div className="relative w-full h-[88%] bg-[#0D1211] border border-[rgba(241,239,232,0.15)] group-hover:border-[#65E6D2]/80 rounded-[2px] overflow-hidden shadow-2xl transition-all duration-300 group-hover:brightness-105 group-hover:scale-[1.02]">
                <img
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"
                  alt="Internship"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-2.5 left-2.5 font-mono text-[8px] tracking-widest text-[#F1EFE8] bg-[#050706]/85 px-2 py-0.5 backdrop-blur-sm border border-white/10 uppercase">
                  02 / WORK
                </div>
              </div>
              <div className="pt-2 text-center">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#9EA49F] group-hover:text-[#65E6D2] uppercase transition-colors">
                  EXPERIENCE →
                </span>
              </div>
            </motion.div>

            {/* Card 03: SKILLS (Bottom-Center Offset, rotate -1deg) */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.24 }}
              onClick={() => onOpenSection('skills')}
              className="hidden lg:flex absolute -bottom-10 left-[48%] -translate-x-1/2 z-30 w-[210px] xl:w-[230px] aspect-[3/4] flex-col cursor-pointer group transition-all duration-500"
              style={{
                transform: 'rotate(-1deg) translateZ(15px)',
              }}
            >
              <div className="relative w-full h-[88%] bg-[#0D1211] border border-[rgba(241,239,232,0.15)] group-hover:border-[#65E6D2]/80 rounded-[2px] overflow-hidden shadow-2xl transition-all duration-300 group-hover:brightness-105 group-hover:scale-[1.02]">
                <img
                  src="./img/project1.png"
                  alt="Skills"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-2.5 left-2.5 font-mono text-[8px] tracking-widest text-[#F1EFE8] bg-[#050706]/85 px-2 py-0.5 backdrop-blur-sm border border-white/10 uppercase">
                  03 / SKILLS
                </div>
              </div>
              <div className="pt-2 text-center">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#9EA49F] group-hover:text-[#65E6D2] uppercase transition-colors">
                  SYSTEM MAP →
                </span>
              </div>
            </motion.div>

            {/* Card 04: JOURNEY (Top-Right Offset, rotate 2deg) */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.32 }}
              onClick={() => onOpenSection('journey')}
              className="hidden lg:flex absolute -top-4 right-8 xl:right-20 z-10 w-[210px] xl:w-[230px] aspect-[3/4] flex-col cursor-pointer group transition-all duration-500"
              style={{
                transform: 'rotate(2deg) translateZ(10px)',
              }}
            >
              <div className="relative w-full h-[88%] bg-[#0D1211] border border-[rgba(241,239,232,0.15)] group-hover:border-[#65E6D2]/80 rounded-[2px] overflow-hidden shadow-2xl transition-all duration-300 group-hover:brightness-105 group-hover:scale-[1.02]">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                  alt="Journey"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-2.5 left-2.5 font-mono text-[8px] tracking-widest text-[#F1EFE8] bg-[#050706]/85 px-2 py-0.5 backdrop-blur-sm border border-white/10 uppercase">
                  04 / JOURNEY
                </div>
              </div>
              <div className="pt-2 text-center">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#9EA49F] group-hover:text-[#65E6D2] uppercase transition-colors">
                  EVOLUTION →
                </span>
              </div>
            </motion.div>

            {/* Card 05: GITHUB (Bottom-Right Offset, rotate -1.5deg) */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              onClick={() => onOpenSection('github')}
              className="hidden lg:flex absolute bottom-4 right-2 xl:right-10 z-10 w-[210px] xl:w-[230px] aspect-[3/4] flex-col cursor-pointer group transition-all duration-500"
              style={{
                transform: 'rotate(-1.5deg) translateZ(5px)',
              }}
            >
              <div className="relative w-full h-[88%] bg-[#0D1211] border border-[rgba(241,239,232,0.15)] group-hover:border-[#65E6D2]/80 rounded-[2px] overflow-hidden shadow-2xl transition-all duration-300 group-hover:brightness-105 group-hover:scale-[1.02]">
                <img
                  src="./img/project2.png"
                  alt="GitHub"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-2.5 left-2.5 font-mono text-[8px] tracking-widest text-[#F1EFE8] bg-[#050706]/85 px-2 py-0.5 backdrop-blur-sm border border-white/10 uppercase">
                  05 / GITHUB
                </div>
              </div>
              <div className="pt-2 text-center">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#9EA49F] group-hover:text-[#65E6D2] uppercase transition-colors">
                  OPEN SOURCE →
                </span>
              </div>
            </motion.div>
          </div>

          {/* Mobile Swiper Bar (< 1024px) */}
          <div className="lg:hidden flex items-stretch gap-3 overflow-x-auto pb-2 no-scrollbar scroll-smooth snap-x">
            {FLOATING_CARDS.map((c) => (
              <div
                key={c.id}
                onClick={() => onOpenSection(c.sectionId)}
                className="snap-start flex-shrink-0 w-[160px] aspect-[3/4] bg-[#0D1211] border border-[rgba(241,239,232,0.15)] rounded-[2px] p-2 flex flex-col justify-between"
              >
                <div className="w-full h-[78%] overflow-hidden rounded-[2px]">
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover grayscale" />
                </div>
                <div className="font-mono text-[8px] text-center text-[#65E6D2] uppercase">
                  {c.title} →
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#626A65] uppercase border-t border-[#2A302C] pt-3">
            <button
              onClick={() => scrollToPane(0)}
              className="text-[#9EA49F] hover:text-[#F1EFE8] transition-colors cursor-pointer"
            >
              ← HERO INTRO
            </button>
            <button
              onClick={() => scrollToPane(2)}
              className="flex items-center gap-2 text-[#65E6D2] hover:text-white transition-colors cursor-pointer font-bold"
            >
              <span>FLOATING GALLERY EXHIBITION</span>
              <span className="text-base">→</span>
            </button>
          </div>
        </section>

        {/* ==================== ZONE 03: FLOATING CARD GALLERY (IMAGE-FIRST PERSPECTIVE EXHIBITION) ==================== */}
        <section className="relative w-screen h-full flex-shrink-0 snap-start flex flex-col justify-between py-6 md:py-8 px-6 md:px-16 max-w-full">
          {/* Top Section Metadata */}
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#626A65] uppercase border-b border-[#2A302C] pb-3">
            <div className="flex items-center gap-3">
              <span className="text-[#65E6D2] font-bold">03 / EXHIBITION</span>
              <span className="text-white/10">•</span>
              <span className="text-[#9EA49F]">IMAGE-FIRST FLOATING OBJECTS & PERSPECTIVE SPACE</span>
            </div>
            <div className="hidden sm:block text-[#9EA49F]">DIGITAL GALLERY [03 / 04]</div>
          </div>

          {/* Generously Spaced 3D Gallery Stream Inspired by Reference */}
          <div
            className="my-auto flex items-center justify-center gap-12 xl:gap-20 overflow-x-auto no-scrollbar py-6"
            style={{ perspective: '1200px' }}
          >
            {FLOATING_CARDS.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: idx * 0.12 }}
                onClick={() => onOpenSection(card.sectionId)}
                className="group relative flex-shrink-0 w-[220px] sm:w-[240px] md:w-[260px] aspect-[3/4] flex flex-col items-center justify-between cursor-pointer transition-all duration-500 hover:scale-[1.04]"
                style={{
                  transform: `translateY(${card.offsetY}px) rotate(${card.rotation}deg) rotateY(${card.perspectiveY}deg)`,
                }}
              >
                {/* 92% Image Area Framed in Technical Border */}
                <div className="relative w-full h-[90%] bg-[#0D1211] border border-[rgba(241,239,232,0.16)] group-hover:border-[#65E6D2] rounded-[2px] overflow-hidden shadow-2xl transition-all duration-500 group-hover:brightness-105">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover grayscale contrast-120 brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />

                  {/* Micro Section Label Top Edge */}
                  <div className="absolute top-3 left-3 font-mono text-[8px] tracking-[0.2em] text-[#F1EFE8] bg-[#050706]/85 px-2 py-0.5 backdrop-blur-sm border border-white/10 uppercase">
                    {card.label}
                  </div>

                  {/* Faint Subtle Reflection Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
                </div>

                {/* Micro Label directly underneath the card */}
                <div className="pt-2 text-center">
                  <span className="font-mono text-[10px] tracking-[0.22em] text-[#9EA49F] group-hover:text-[#65E6D2] uppercase transition-colors">
                    {card.title} →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#626A65] uppercase border-t border-[#2A302C] pt-3">
            <button
              onClick={() => scrollToPane(1)}
              className="text-[#9EA49F] hover:text-[#F1EFE8] transition-colors cursor-pointer"
            >
              ← PROFILE CORE
            </button>
            <button
              onClick={() => scrollToPane(3)}
              className="flex items-center gap-2 text-[#65E6D2] hover:text-white transition-colors cursor-pointer font-bold"
            >
              <span>PROJECTS & CONTACT CTA</span>
              <span className="text-base">→</span>
            </button>
          </div>
        </section>

        {/* ==================== ZONE 04: SELECTED PROJECTS PREVIEW & CONTACT CTA ==================== */}
        <section className="relative w-screen h-full flex-shrink-0 snap-start flex flex-col justify-between py-8 px-6 md:px-16 max-w-full">
          {/* Top Section Metadata */}
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#626A65] uppercase border-b border-[#2A302C] pb-3">
            <div className="flex items-center gap-3">
              <span className="text-[#65E6D2] font-bold">04 / PREVIEWS</span>
              <span className="text-white/10">•</span>
              <span className="text-[#9EA49F]">SELECTED CASE STUDIES & CORRESPONDENCE</span>
            </div>
            <div className="hidden sm:block text-[#9EA49F]">FINAL CANVAS POSITION [04 / 04]</div>
          </div>

          {/* Split Content: Left Projects Preview, Right Contact CTA */}
          <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left: Selected Projects Cards */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[#65E6D2] uppercase block mb-1">
                    PORTFOLIO PREVIEW
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-display font-black text-[#F1EFE8] uppercase tracking-tight">
                    SELECTED PROJECTS
                  </h3>
                </div>
                <button
                  onClick={onNavigateToProjects}
                  className="font-mono text-xs uppercase tracking-widest text-[#65E6D2] hover:text-white border-b border-[#65E6D2]/50 pb-0.5 transition-colors cursor-pointer"
                >
                  VIEW ALL PROJECTS →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {[
                  { title: 'ARCADE', tag: 'WEB PLATFORM', img: './img/project1.png' },
                  { title: 'PDF DECODER', tag: 'BINARY PIPELINE', img: './img/project2.png' },
                  {
                    title: 'AGENTIC SWARM',
                    tag: 'MCP / LANGGRAPH',
                    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    onClick={onNavigateToProjects}
                    className="group bg-[#111513] border border-[#2A302C] hover:border-[#65E6D2]/60 p-3 rounded-[2px] cursor-pointer transition-all hover:-translate-y-1"
                  >
                    <div className="aspect-[16/10] bg-[#050706] border border-[#2A302C] overflow-hidden rounded-[2px] mb-2.5">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      />
                    </div>
                    <h5 className="font-display font-bold text-sm text-[#F1EFE8] group-hover:text-[#65E6D2] uppercase transition-colors">
                      {item.title}
                    </h5>
                    <span className="font-mono text-[8px] text-[#9EA49F] uppercase">{item.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Contact Call-To-Action Card */}
            <div className="lg:col-span-5">
              <div className="p-8 bg-[#111513] border border-[#2A302C] rounded-[2px] shadow-2xl space-y-6">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[#65E6D2] uppercase block mb-2">
                    INITIATE COLLABORATION
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-display font-black text-[#F1EFE8] uppercase tracking-tight leading-tight">
                    LET'S BUILD
                    <br />
                    <span className="text-[#65E6D2]">SOMETHING.</span>
                  </h3>
                  <p className="font-sans text-xs text-[#9EA49F] mt-3 leading-relaxed">
                    Available for architectural consulting, full-stack systems engineering, and autonomous agent deployments.
                  </p>
                </div>

                <button
                  onClick={onNavigateToContact}
                  className="w-full py-3.5 bg-[#65E6D2] hover:bg-[#7788FF] text-[#050706] hover:text-white font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>TRANSMIT INQUIRY</span>
                  <span>↗</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Navigation for Pane 04 */}
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#626A65] uppercase border-t border-[#2A302C] pt-3">
            <button
              onClick={() => scrollToPane(2)}
              className="text-[#9EA49F] hover:text-[#F1EFE8] transition-colors cursor-pointer"
            >
              ← FLOATING GALLERY
            </button>
            <span className="text-[#65E6D2]">DEV MISTRY © 2026</span>
          </div>
        </section>
      </div>

      {/* ==================== BOTTOM HORIZONTAL EXHIBITION PROGRESS INDICATOR ==================== */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 font-mono text-[9px] tracking-widest text-[#626A65] bg-[#050706]/85 px-4 py-1.5 rounded-full border border-[#2A302C]/60 backdrop-blur-sm pointer-events-auto">
        <button
          onClick={() => scrollToPane(0)}
          className={`transition-colors cursor-pointer ${
            activePane === 0 ? 'text-[#65E6D2] font-bold' : 'hover:text-[#F1EFE8]'
          }`}
        >
          01 HERO
        </button>
        <span className={`w-4 h-px transition-colors ${activePane >= 1 ? 'bg-[#65E6D2]' : 'bg-[#2A302C]'}`} />
        <button
          onClick={() => scrollToPane(1)}
          className={`transition-colors cursor-pointer ${
            activePane === 1 ? 'text-[#65E6D2] font-bold' : 'hover:text-[#F1EFE8]'
          }`}
        >
          02 PROFILE
        </button>
        <span className={`w-4 h-px transition-colors ${activePane >= 2 ? 'bg-[#65E6D2]' : 'bg-[#2A302C]'}`} />
        <button
          onClick={() => scrollToPane(2)}
          className={`transition-colors cursor-pointer ${
            activePane === 2 ? 'text-[#65E6D2] font-bold' : 'hover:text-[#F1EFE8]'
          }`}
        >
          03 GALLERY
        </button>
        <span className={`w-4 h-px transition-colors ${activePane >= 3 ? 'bg-[#65E6D2]' : 'bg-[#2A302C]'}`} />
        <button
          onClick={() => scrollToPane(3)}
          className={`transition-colors cursor-pointer ${
            activePane === 3 ? 'text-[#65E6D2] font-bold' : 'hover:text-[#F1EFE8]'
          }`}
        >
          04 PREVIEWS
        </button>
      </div>
    </div>
  );
}
