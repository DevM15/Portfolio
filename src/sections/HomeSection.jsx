import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HomeSection({
  onOpenSection,
  onNavigateToProjects,
  onNavigateToContact,
}) {
  const containerRef = useRef(null);
  const [activePane, setActivePane] = useState(0);

  // Home Panes:
  // 0: HERO (Building Intelligent Systems)
  // 1: PROFILE ANCHOR (Photo exactly near center surrounded by About, Internship, Skills, Journey, GitHub cards)
  // 2: PROJECT PREVIEWS & CONTACT CTA
  const PANES_COUNT = 3;

  // Horizontal wheel handler mapping vertical delta to smooth horizontal scroll
  const handleWheel = (e) => {
    if (!containerRef.current) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    containerRef.current.scrollLeft += delta;
  };

  // Scroll listener to update active pane indicator
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
        {/* ==================== PANE 01: INTRO HERO ==================== */}
        <section className="relative w-screen h-full flex-shrink-0 snap-start flex flex-col justify-between py-8 px-6 md:px-16 max-w-full">
          {/* Top Section Metadata */}
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#626A65] uppercase border-b border-[#2A302C] pb-3">
            <div className="flex items-center gap-3">
              <span className="text-[#65E6D2] font-bold">01 / HERO</span>
              <span className="text-white/10">•</span>
              <span className="text-[#9EA49F]">DIGITAL ARCHITECTURE & SYSTEM SPECIFICATIONS</span>
            </div>
            <div className="hidden sm:block text-[#9EA49F]">HORIZONTAL EXHIBITION [01 / 03]</div>
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
            <span>SCROLL OR DRAG TO ENTER PROFILE</span>
            <button
              onClick={() => scrollToPane(1)}
              className="flex items-center gap-2 text-[#65E6D2] hover:text-white transition-colors cursor-pointer font-bold"
            >
              <span>PROFILE & SYSTEM CARDS</span>
              <span className="text-base">→</span>
            </button>
          </div>
        </section>

        {/* ==================== PANE 02: CENTER PHOTO ANCHOR WITH SURROUNDING CARDS ==================== */}
        <section className="relative w-screen h-full flex-shrink-0 snap-start flex flex-col justify-between py-6 md:py-8 px-4 md:px-12 max-w-full">
          {/* Top Section Metadata */}
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#626A65] uppercase border-b border-[#2A302C] pb-3">
            <div className="flex items-center gap-3">
              <span className="text-[#65E6D2] font-bold">02 / PROFILE</span>
              <span className="text-white/10">•</span>
              <span className="text-[#9EA49F]">CENTRAL ARCHIVE OBJECT & ARCHITECTURAL NODES</span>
            </div>
            <div className="hidden sm:block text-[#9EA49F]">EXHIBITION CORE [02 / 03]</div>
          </div>

          {/* Asymmetrical Spatial Composition: PHOTO EXACTLY NEAR CENTER SURROUNDED BY 5 CARDS */}
          <div className="relative my-auto w-full max-w-[1300px] mx-auto min-h-[460px] md:min-h-[520px] flex items-center justify-center">
            {/* ==================== 1. CENTER PHOTOGRAPH ANCHOR ==================== */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 w-[240px] sm:w-[280px] md:w-[320px] aspect-[3/4] bg-[#0D1211] border border-[rgba(241,239,232,0.18)] hover:border-[#65E6D2] rounded-[2px] overflow-hidden group shadow-2xl transition-all duration-500 hover:scale-[1.02]"
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

              {/* Subtle hover pulse accent */}
              <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#65E6D2] opacity-0 group-hover:opacity-100 transition-opacity animate-ping" />
            </motion.div>

            {/* ==================== 2. CARD 01: ABOUT (Top Left Offset) ==================== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              onClick={() => onOpenSection('about')}
              className="hidden lg:flex absolute top-2 left-6 xl:left-14 z-10 w-[240px] xl:w-[260px] p-4 bg-[#0F1412]/80 backdrop-blur-md border border-[rgba(241,239,232,0.15)] hover:border-[#65E6D2]/70 rounded-[2px] flex-col justify-between shadow-xl cursor-pointer group hover:-translate-y-1.5 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#2A302C] mb-2 font-mono text-[9px] tracking-widest text-[#626A65] uppercase">
                  <span className="text-[#65E6D2] font-bold">01 / ABOUT</span>
                  <span>IDENTITY</span>
                </div>
                <h4 className="font-display font-black text-lg text-[#F1EFE8] uppercase leading-none group-hover:text-[#65E6D2] transition-colors mb-1">
                  DEV MISTRY
                </h4>
                <div className="font-mono text-[8px] text-[#9EA49F] uppercase mb-2">
                  FULL STACK DEVELOPER • MUMBAI
                </div>
                <p className="font-sans text-[11px] text-[#9EA49F] leading-snug line-clamp-2">
                  Building scalable web platforms, cloud backbones, and intelligent AI workflows.
                </p>
              </div>
              <div className="pt-2 mt-2 border-t border-[#2A302C] flex items-center justify-between font-mono text-[9px] text-[#F1EFE8] group-hover:text-[#65E6D2] uppercase tracking-wider">
                <span>VIEW ABOUT</span>
                <span className="transition-transform group-hover:translate-x-1">→ →</span>
              </div>
            </motion.div>

            {/* ==================== 3. CARD 02: INTERNSHIP (Middle Left) ==================== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16 }}
              onClick={() => onOpenSection('internship')}
              className="hidden lg:flex absolute bottom-8 left-2 xl:left-8 z-10 w-[240px] xl:w-[260px] p-4 bg-[#0F1412]/80 backdrop-blur-md border border-[rgba(241,239,232,0.15)] hover:border-[#65E6D2]/70 rounded-[2px] flex-col justify-between shadow-xl cursor-pointer group hover:-translate-y-1.5 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#2A302C] mb-2 font-mono text-[9px] tracking-widest text-[#626A65] uppercase">
                  <span className="text-[#65E6D2] font-bold">02 / WORK</span>
                  <span>HISTORY</span>
                </div>
                <h4 className="font-display font-black text-lg text-[#F1EFE8] uppercase leading-none group-hover:text-[#65E6D2] transition-colors mb-1">
                  INTERNSHIP
                </h4>
                <div className="font-mono text-[8px] text-[#9EA49F] uppercase mb-2">
                  HORIZON VIEW • APPLIED AI LABS
                </div>
                <p className="font-sans text-[11px] text-[#9EA49F] leading-snug line-clamp-2">
                  2024–2025: Software & UI/UX / 2025–Present: Agentic AI & Cloud.
                </p>
              </div>
              <div className="pt-2 mt-2 border-t border-[#2A302C] flex items-center justify-between font-mono text-[9px] text-[#F1EFE8] group-hover:text-[#65E6D2] uppercase tracking-wider">
                <span>VIEW EXPERIENCE</span>
                <span className="transition-transform group-hover:translate-x-1">→ →</span>
              </div>
            </motion.div>

            {/* ==================== 4. CARD 03: SKILLS (Bottom Center Offset) ==================== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.24 }}
              onClick={() => onOpenSection('skills')}
              className="hidden lg:flex absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 w-[260px] p-4 bg-[#0F1412]/85 backdrop-blur-md border border-[rgba(241,239,232,0.15)] hover:border-[#65E6D2]/70 rounded-[2px] flex-col justify-between shadow-2xl cursor-pointer group hover:-translate-y-2 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#2A302C] mb-2 font-mono text-[9px] tracking-widest text-[#626A65] uppercase">
                  <span className="text-[#65E6D2] font-bold">03 / STACK</span>
                  <span>CAPABILITIES</span>
                </div>
                <h4 className="font-display font-black text-lg text-[#F1EFE8] uppercase leading-none group-hover:text-[#65E6D2] transition-colors mb-1">
                  SKILLS MAP
                </h4>
                <div className="font-mono text-[8px] text-[#9EA49F] uppercase mb-2">
                  REACT • PYTHON • AWS • LANGGRAPH
                </div>
                <p className="font-sans text-[11px] text-[#9EA49F] leading-snug line-clamp-2">
                  Next.js, FastAPI, Docker, ECS, Terraform, and RAG retrieval networks.
                </p>
              </div>
              <div className="pt-2 mt-2 border-t border-[#2A302C] flex items-center justify-between font-mono text-[9px] text-[#F1EFE8] group-hover:text-[#65E6D2] uppercase tracking-wider">
                <span>VIEW STACK</span>
                <span className="transition-transform group-hover:translate-x-1">→ →</span>
              </div>
            </motion.div>

            {/* ==================== 5. CARD 04: JOURNEY (Top Right Offset) ==================== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.32 }}
              onClick={() => onOpenSection('journey')}
              className="hidden lg:flex absolute top-4 right-6 xl:right-14 z-10 w-[240px] xl:w-[260px] p-4 bg-[#0F1412]/80 backdrop-blur-md border border-[rgba(241,239,232,0.15)] hover:border-[#65E6D2]/70 rounded-[2px] flex-col justify-between shadow-xl cursor-pointer group hover:-translate-y-1.5 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#2A302C] mb-2 font-mono text-[9px] tracking-widest text-[#626A65] uppercase">
                  <span className="text-[#65E6D2] font-bold">04 / JOURNEY</span>
                  <span>EVOLUTION</span>
                </div>
                <h4 className="font-display font-black text-lg text-[#F1EFE8] uppercase leading-none group-hover:text-[#65E6D2] transition-colors mb-1">
                  TIMELINE
                </h4>
                <div className="font-mono text-[8px] text-[#9EA49F] uppercase mb-2">
                  2022 ━━━━━ 2026
                </div>
                <p className="font-sans text-[11px] text-[#9EA49F] leading-snug line-clamp-2">
                  From core web fundamentals to multi-region cloud and autonomous reasoning.
                </p>
              </div>
              <div className="pt-2 mt-2 border-t border-[#2A302C] flex items-center justify-between font-mono text-[9px] text-[#F1EFE8] group-hover:text-[#65E6D2] uppercase tracking-wider">
                <span>VIEW JOURNEY</span>
                <span className="transition-transform group-hover:translate-x-1">→ →</span>
              </div>
            </motion.div>

            {/* ==================== 6. CARD 05: GITHUB (Bottom Right Offset) ==================== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={() => onOpenSection('github')}
              className="hidden lg:flex absolute bottom-8 right-2 xl:right-8 z-10 w-[240px] xl:w-[260px] p-4 bg-[#0F1412]/80 backdrop-blur-md border border-[rgba(241,239,232,0.15)] hover:border-[#65E6D2]/70 rounded-[2px] flex-col justify-between shadow-xl cursor-pointer group hover:-translate-y-1.5 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#2A302C] mb-2 font-mono text-[9px] tracking-widest text-[#626A65] uppercase">
                  <span className="text-[#65E6D2] font-bold">05 / GITHUB</span>
                  <span>OPEN SOURCE</span>
                </div>
                <h4 className="font-display font-black text-lg text-[#F1EFE8] uppercase leading-none group-hover:text-[#65E6D2] transition-colors mb-1">
                  CODE ARCHIVE
                </h4>
                <div className="font-mono text-[8px] text-[#9EA49F] uppercase mb-2">
                  @DEVM15 • PUBLIC REPOS
                </div>
                <p className="font-sans text-[11px] text-[#9EA49F] leading-snug line-clamp-2">
                  Arcade, PDFdecoder, Futuredesks, and decentralized multi-agent runtimes.
                </p>
              </div>
              <div className="pt-2 mt-2 border-t border-[#2A302C] flex items-center justify-between font-mono text-[9px] text-[#F1EFE8] group-hover:text-[#65E6D2] uppercase tracking-wider">
                <span>OPEN GITHUB</span>
                <span className="transition-transform group-hover:translate-x-1">→ →</span>
              </div>
            </motion.div>
          </div>

          {/* Mobile Card Row Fallback for Viewports < 1024px */}
          <div className="lg:hidden flex items-stretch gap-3 overflow-x-auto pb-2 no-scrollbar scroll-smooth snap-x">
            {[
              { id: 'about', title: '01 / ABOUT', sub: 'DEV MISTRY', cta: 'VIEW ABOUT' },
              { id: 'internship', title: '02 / INTERNSHIP', sub: 'WORK HISTORY', cta: 'VIEW EXP' },
              { id: 'skills', title: '03 / SKILLS', sub: 'TECH STACK', cta: 'VIEW STACK' },
              { id: 'journey', title: '04 / JOURNEY', sub: 'TIMELINE', cta: 'VIEW JOURNEY' },
              { id: 'github', title: '05 / GITHUB', sub: 'CODE ARCHIVE', cta: 'OPEN GITHUB' },
            ].map((c) => (
              <div
                key={c.id}
                onClick={() => onOpenSection(c.id)}
                className="snap-start flex-shrink-0 w-[180px] p-3 bg-[#0F1412]/80 border border-[#2A302C] rounded-[2px]"
              >
                <span className="font-mono text-[8px] text-[#65E6D2] block uppercase">{c.title}</span>
                <span className="font-display font-bold text-sm text-[#F1EFE8] block uppercase mt-0.5">{c.sub}</span>
                <span className="font-mono text-[8px] text-[#9EA49F] block mt-2">{c.cta} →</span>
              </div>
            ))}
          </div>

          {/* Horizontal Navigation Footer for Pane 02 */}
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
              <span>PROJECTS & CONTACT</span>
              <span className="text-base">→</span>
            </button>
          </div>
        </section>

        {/* ==================== PANE 03: SELECTED PROJECTS PREVIEW & CONTACT CTA ==================== */}
        <section className="relative w-screen h-full flex-shrink-0 snap-start flex flex-col justify-between py-8 px-6 md:px-16 max-w-full">
          {/* Top Section Metadata */}
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#626A65] uppercase border-b border-[#2A302C] pb-3">
            <div className="flex items-center gap-3">
              <span className="text-[#65E6D2] font-bold">03 / PREVIEWS</span>
              <span className="text-white/10">•</span>
              <span className="text-[#9EA49F]">SELECTED CASE STUDIES & CORRESPONDENCE</span>
            </div>
            <div className="hidden sm:block text-[#9EA49F]">FINAL CANVAS POSITION [03 / 03]</div>
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
                  { title: 'AGENTIC SWARM', tag: 'MCP / LANGGRAPH', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80' },
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

          {/* Bottom Navigation for Pane 03 */}
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#626A65] uppercase border-t border-[#2A302C] pt-3">
            <button
              onClick={() => scrollToPane(1)}
              className="text-[#9EA49F] hover:text-[#F1EFE8] transition-colors cursor-pointer"
            >
              ← PROFILE & CARDS
            </button>
            <span className="text-[#65E6D2]">DEV MISTRY © 2026</span>
          </div>
        </section>
      </div>

      {/* ==================== BOTTOM HORIZONTAL EXHIBITION PROGRESS INDICATOR ==================== */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 font-mono text-[9px] tracking-widest text-[#626A65] bg-[#050706]/80 px-4 py-1.5 rounded-full border border-[#2A302C]/60 backdrop-blur-sm pointer-events-auto">
        <button
          onClick={() => scrollToPane(0)}
          className={`transition-colors cursor-pointer ${
            activePane === 0 ? 'text-[#65E6D2] font-bold' : 'hover:text-[#F1EFE8]'
          }`}
        >
          01 HERO
        </button>
        <span className={`w-5 h-px transition-colors ${activePane >= 1 ? 'bg-[#65E6D2]' : 'bg-[#2A302C]'}`} />
        <button
          onClick={() => scrollToPane(1)}
          className={`transition-colors cursor-pointer ${
            activePane === 1 ? 'text-[#65E6D2] font-bold' : 'hover:text-[#F1EFE8]'
          }`}
        >
          02 PROFILE
        </button>
        <span className={`w-5 h-px transition-colors ${activePane >= 2 ? 'bg-[#65E6D2]' : 'bg-[#2A302C]'}`} />
        <button
          onClick={() => scrollToPane(2)}
          className={`transition-colors cursor-pointer ${
            activePane === 2 ? 'text-[#65E6D2] font-bold' : 'hover:text-[#F1EFE8]'
          }`}
        >
          03 PREVIEWS
        </button>
      </div>
    </div>
  );
}
