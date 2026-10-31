import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import SpatialCanvasBackground from './components/SpatialCanvasBackground';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import InternshipSection from './sections/InternshipSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import JourneySection from './sections/JourneySection';
import GithubSection from './sections/GithubSection';
import ContactSection from './sections/ContactSection';
import './styles/index.css';

// Top-Level Minimal Navigation Sections
const NAV_SECTIONS = [
  { id: 'home', label: 'HOME', num: '01' },
  { id: 'projects', label: 'PROJECTS', num: '02' },
  { id: 'contact', label: 'CONTACT', num: '03' },
];

// All Exhibition Views (including interactive card views from Home)
const ALL_VIEWS = [
  { id: 'home', label: 'HOME', num: '01' },
  { id: 'about', label: 'ABOUT', num: '02' },
  { id: 'internship', label: 'INTERNSHIP', num: '03' },
  { id: 'skills', label: 'SKILLS', num: '04' },
  { id: 'journey', label: 'JOURNEY', num: '05' },
  { id: 'github', label: 'GITHUB', num: '06' },
  { id: 'projects', label: 'PROJECTS', num: '07' },
  { id: 'contact', label: 'CONTACT', num: '08' },
];

// All Projects Catalog (Curated Technical Developer Works)
const WORK_PROJECTS = [
  {
    id: '01',
    num: '01',
    title: 'ARCADE SYSTEM',
    badge: 'SYSTEM SPEC',
    type: 'WEB PLATFORM / JAVASCRIPT / CANVAS',
    year: '2026',
    category: 'WEB ARCHITECTURE',
    image: './img/project1.png',
  },
  {
    id: '02',
    num: '02',
    title: 'PDF DECODER RUNTIME',
    badge: 'VIEW ARCHIVE',
    type: 'BINARY ENGINE / CLIENT-SIDE EXTRACTION',
    year: '2026',
    category: 'SYSTEM TOOLS',
    image: './img/project2.png',
  },
  {
    id: '03',
    num: '03',
    title: 'FUTUREDESKS WORKSPACE',
    badge: 'VIEW CASE',
    type: 'CLOUD DASHBOARD / DISTRIBUTED ARCHITECTURE',
    year: '2025',
    category: 'CLOUD / AWS',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '04',
    num: '04',
    title: 'AGENTIC CONSENSUS FABRIC',
    badge: 'VIEW CORE',
    type: 'AUTONOMOUS REASONING / LANGGRAPH / MCP',
    year: '2026',
    category: 'AGENTIC AI',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '05',
    num: '05',
    title: 'NEURAL STREAM TELEMETRY',
    badge: 'VIEW PIPELINE',
    type: 'DISTRIBUTED OBSERVABILITY / FASTAPI / REDIS',
    year: '2025',
    category: 'SYSTEM TOOLS',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '06',
    num: '06',
    title: 'MULTI-REGION MESH CLUSTER',
    badge: 'VIEW CLOUD',
    type: 'TERRAFORM IAC / AWS ECS / ZERO-TRUST',
    year: '2026',
    category: 'CLOUD / AWS',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80',
  },
];

const FILTERS = [
  'ALL WORK',
  'WEB ARCHITECTURE',
  'SYSTEM TOOLS',
  'CLOUD / AWS',
  'AGENTIC AI',
];

// Dynamic background atmosphere variations per section
const SECTION_ATMOSPHERES = {
  0: { // 01 HOME: Subtle cool teal tone
    primaryGlow: 'radial-gradient(circle at 28% 44%, rgba(101, 230, 210, 0.038) 0%, rgba(11, 16, 15, 0.4) 45%, transparent 72%)',
    secondaryGlow: 'radial-gradient(circle at 74% 52%, rgba(13, 18, 17, 0.6) 0%, transparent 65%)',
  },
  1: { // 02 ABOUT: Slightly warmer graphite tone
    primaryGlow: 'radial-gradient(circle at 35% 48%, rgba(140, 150, 145, 0.025) 0%, rgba(13, 18, 17, 0.5) 45%, transparent 70%)',
    secondaryGlow: 'radial-gradient(circle at 70% 40%, rgba(101, 230, 210, 0.02) 0%, transparent 60%)',
  },
  2: { // 03 INTERNSHIP: Technical muted deep tone
    primaryGlow: 'radial-gradient(circle at 30% 50%, rgba(101, 230, 210, 0.025) 0%, rgba(11, 16, 15, 0.5) 45%, transparent 70%)',
    secondaryGlow: 'radial-gradient(circle at 75% 45%, rgba(119, 136, 255, 0.018) 0%, transparent 65%)',
  },
  3: { // 04 PROJECTS: Deep obsidian graphite
    primaryGlow: 'radial-gradient(circle at 50% 40%, rgba(11, 16, 15, 0.7) 0%, transparent 75%)',
    secondaryGlow: 'radial-gradient(circle at 20% 60%, rgba(101, 230, 210, 0.02) 0%, transparent 60%)',
  },
  4: { // 05 SKILLS: Controlled technical graphite
    primaryGlow: 'radial-gradient(circle at 45% 45%, rgba(101, 230, 210, 0.03) 0%, rgba(13, 18, 17, 0.5) 50%, transparent 70%)',
    secondaryGlow: 'radial-gradient(circle at 80% 50%, rgba(13, 18, 17, 0.6) 0%, transparent 60%)',
  },
  5: { // 06 JOURNEY: Subtle horizontal drift tone
    primaryGlow: 'radial-gradient(circle at 50% 50%, rgba(101, 230, 210, 0.028) 0%, rgba(11, 16, 15, 0.6) 50%, transparent 75%)',
    secondaryGlow: 'radial-gradient(circle at 85% 40%, rgba(119, 136, 255, 0.02) 0%, transparent 65%)',
  },
  6: { // 07 GITHUB: Pure deep graphite with subtle source tone
    primaryGlow: 'radial-gradient(circle at 35% 45%, rgba(101, 230, 210, 0.032) 0%, rgba(11, 16, 15, 0.5) 45%, transparent 70%)',
    secondaryGlow: 'radial-gradient(circle at 70% 55%, rgba(13, 18, 17, 0.7) 0%, transparent 65%)',
  },
  7: { // 08 CONTACT: Atmospheric cyan horizon tone
    primaryGlow: 'radial-gradient(circle at 30% 45%, rgba(101, 230, 210, 0.045) 0%, rgba(11, 16, 15, 0.5) 50%, transparent 75%)',
    secondaryGlow: 'radial-gradient(circle at 75% 55%, rgba(119, 136, 255, 0.025) 0%, transparent 65%)',
  },
};

export default function App() {
  const [currentViewId, setCurrentViewId] = useState('home');
  const [prevViewId, setPrevViewId] = useState('home');
  const [contactOpen, setContactOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL WORK');
  const [openInfo, setOpenInfo] = useState(false);

  // DM Opening Intro Animation (runs only once on page load)
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0); // 0: plain, 1: DM appears, 2: diagonal separate, 3: reveal portfolio

  // Check prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShowIntro(false);
      return;
    }

    // Step 0 -> Step 1 at 800ms: Centered DM appears with graceful fade-in
    const timer1 = setTimeout(() => {
      setIntroStep(1);
    }, 800);

    // Step 1 -> Step 2 at 1800ms: Slicing - Letters separate diagonally with expanding line
    const timer2 = setTimeout(() => {
      setIntroStep(2);
    }, 1800);

    // Step 2 -> Step 3 at 2700ms: Columns lift upward in patterned staggered waves
    const timer3 = setTimeout(() => {
      setIntroStep(3);
    }, 2700);

    // Complete intro at 3900ms after columns exit
    const timer4 = setTimeout(() => {
      setShowIntro(false);
    }, 3900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const navigateToView = (viewId) => {
    if (viewId === currentViewId) return;
    setPrevViewId(currentViewId);
    setCurrentViewId(viewId);
    setContactOpen(false);
  };

  // 3D Tilt for Contact Modal Card
  const [contactTilt, setContactTilt] = useState({ rx: 0, ry: 0 });
  const contactCardRef = useRef(null);

  const handleContactMouseMove = (e) => {
    if (!contactCardRef.current) return;
    const rect = contactCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const ry = ((x - centerX) / centerX) * 10;
    const rx = -((y - centerY) / centerY) * 8;
    setContactTilt({ rx, ry });
  };

  const handleContactMouseLeave = () => {
    setContactTilt({ rx: 0, ry: 0 });
  };

  // Keyboard navigation (← and →) between top-level sections
  useEffect(() => {
    if (contactOpen || openInfo || showIntro) return;

    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        if (currentViewId === 'home') navigateToView('projects');
        else if (currentViewId === 'projects') navigateToView('contact');
      } else if (e.key === 'ArrowLeft') {
        if (currentViewId === 'contact') navigateToView('projects');
        else if (currentViewId === 'projects') navigateToView('home');
        else if (currentViewId !== 'home') navigateToView('home');
      } else if (e.key === 'Escape') {
        if (currentViewId !== 'home') navigateToView('home');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentViewId, contactOpen, openInfo, showIntro]);

  const viewOrder = ['home', 'about', 'internship', 'skills', 'journey', 'github', 'projects', 'contact'];
  const currentIndex = viewOrder.indexOf(currentViewId);
  const prevIndex = viewOrder.indexOf(prevViewId);
  const direction = currentIndex >= prevIndex ? 1 : -1;

  // Directional section animation variants
  const sectionVariants = {
    initial: (dir) => ({
      opacity: 0,
      x: dir * 45,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir) => ({
      opacity: 0,
      x: -dir * 45,
      transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  const currentSection = ALL_VIEWS.find((v) => v.id === currentViewId) || ALL_VIEWS[0];

  return (
    <div className="relative w-screen h-screen bg-[#050706] text-[#F1EFE8] overflow-hidden select-none font-sans">
      {/* ==================== PROCEDURAL SPATIAL CANVAS BACKGROUND ==================== */}
      <SpatialCanvasBackground sectionIndex={currentIndex} />

      {/* Subtle Depth Vignette Layer (Darkening Viewport Borders) */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(5, 7, 6, 0.75) 100%)',
        }}
      />

      {/* Extremely Faint Film Grain Overlay (~1.8%) */}
      <div className="absolute inset-0 pointer-events-none z-[2] bg-subtle-grain mix-blend-overlay opacity-75" />

      {/* Minimal Architectural Horizon Guidelines (0.05 opacity) */}
      <div className="absolute top-20 left-6 right-6 md:left-12 md:right-12 h-px bg-[rgba(241,239,232,0.05)] pointer-events-none z-[3]" />
      <div className="absolute bottom-[72px] left-6 right-6 md:left-12 md:right-12 h-px bg-[rgba(241,239,232,0.05)] pointer-events-none z-[3]" />

      <CustomCursor />

      {/* ==================== ONE-TIME DM OPENING INTRO ANIMATION ==================== */}
      <AnimatePresence>
        {showIntro && (
          <div className="fixed inset-0 z-[100] pointer-events-none flex">
            {/* 6 Vertical Shutter Columns that lift upward with staggered delay pattern */}
            {[0, 1, 2, 3, 4, 5].map((colIndex) => {
              // Create an outward symmetrical pattern: inner columns lift first, outer follow (or progressive wave)
              const delays = [0.18, 0.08, 0, 0.04, 0.12, 0.22];
              return (
                <motion.div
                  key={colIndex}
                  initial={{ y: 0 }}
                  animate={{
                    y: introStep >= 3 ? '-100%' : 0,
                  }}
                  transition={{
                    duration: 0.85,
                    delay: delays[colIndex],
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  className="relative h-full flex-1 bg-[#080B0A] border-r border-[#2A302C]/10 last:border-r-0"
                >
                  <div className="absolute inset-0 pointer-events-none bg-subtle-grain opacity-60" />
                </motion.div>
              );
            })}

            {/* Floating Centered Monogram & Slit on top of the columns */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{
                opacity: introStep >= 3 ? 0 : 1,
                y: introStep >= 3 ? -90 : 0,
              }}
              transition={{
                duration: 0.65,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-auto"
            >
              <div className="relative flex items-center justify-center select-none">
                {/* Expanding diagonal slit line */}
                {introStep >= 2 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 560, opacity: 1 }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute w-[3px] bg-gradient-to-b from-transparent via-[#65E6D2] to-transparent rotate-[32deg] z-10 pointer-events-none"
                  />
                )}

                {/* Centered DM Monogram - Grand Scale */}
                <div className="flex items-center text-8xl sm:text-[14rem] md:text-[18rem] lg:text-[22rem] font-display font-black tracking-tighter text-[#F1EFE8] leading-none select-none">
                  {/* D Letter - separates up-left */}
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: introStep >= 1 ? 1 : 0,
                      y: introStep >= 2 ? -48 : 0,
                      x: introStep >= 2 ? -15 : 0,
                    }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    D
                  </motion.span>

                  {/* M Letter - separates down-right */}
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: introStep >= 1 ? 1 : 0,
                      y: introStep >= 2 ? 48 : 0,
                      x: introStep >= 2 ? 82 : 0,
                      color: introStep >= 2 ? '#65E6D2' : '#F1EFE8',
                    }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    M
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================== GLOBAL FIXED HEADER (HUD FLOATING TRANSPARENT) ==================== */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-6 flex items-center justify-between uppercase font-sans text-[#F1EFE8] pointer-events-none bg-transparent">
        <div className="flex items-center gap-6 pointer-events-auto md:gap-12">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-xs sm:text-sm tracking-widest text-[#626A65]">NAME /</span>
            <span className="text-lg sm:text-[21px] md:text-[23px] font-black tracking-tight text-[#F1EFE8] font-display">
              DEV MISTRY
            </span>
          </div>
          <div className="items-baseline hidden gap-2 lg:flex">
            <span className="font-mono text-xs sm:text-sm tracking-widest text-[#626A65]">OCCUPATION /</span>
            <span className="text-base sm:text-lg md:text-[19px] font-bold tracking-tight text-[#F1EFE8]">
              FULL STACK DEVELOPER
            </span>
          </div>
          <div className="items-baseline hidden gap-2 xl:flex">
            <span className="font-mono text-xs sm:text-sm tracking-widest text-[#626A65]">LOCATION /</span>
            <span className="text-base sm:text-lg md:text-[19px] font-bold tracking-tight text-[#9EA49F]">
              MUMBAI
            </span>
          </div>
        </div>

        {/* Top-Right Navigation: ONLY HOME, PROJECTS, CONTACT WITH TEXT FLIP */}
        <nav className="flex items-center gap-6 pointer-events-auto sm:gap-10">
          {NAV_SECTIONS.map((sec) => {
            const isActive =
              (sec.id === 'home' && !['projects', 'contact'].includes(currentViewId)) ||
              sec.id === currentViewId;

            return (
              <button
                key={sec.id}
                onClick={() => navigateToView(sec.id)}
                className={`flip-nav-link text-sm sm:text-base md:text-lg font-bold tracking-tight transition-all duration-200 cursor-pointer ${
                  isActive && !contactOpen
                    ? 'active text-[#65E6D2] font-black'
                    : 'text-[#9EA49F] hover:text-[#F1EFE8]'
                }`}
              >
                <span className="flip-nav-inner">
                  <span className="flip-nav-front">{sec.label}</span>
                  <span className="flip-nav-back">{sec.label}</span>
                </span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* ==================== HORIZONTAL EXHIBITION STAGE ==================== */}
      <main className="relative w-full h-[calc(100vh-160px)] mt-20 mb-[80px] z-10 overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          {currentViewId === 'home' && (
            /* 01 HOME (Hero + Horizontal Section Cards + Previews) */
            <motion.div
              key="scene-home"
              custom={direction}
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex items-center justify-center w-full h-full"
            >
              <HomeSection
                onOpenSection={(secId) => navigateToView(secId)}
                onNavigateToProjects={() => navigateToView('projects')}
                onNavigateToContact={() => navigateToView('contact')}
              />
            </motion.div>
          )}

          {currentViewId === 'about' && (
            /* 02 ABOUT (Full Spec View) */
            <motion.div
              key="scene-about"
              custom={direction}
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex items-center justify-center w-full h-full"
            >
              <AboutSection onBack={() => navigateToView('home')} />
            </motion.div>
          )}

          {currentViewId === 'internship' && (
            /* 03 INTERNSHIP (Full Spec View) */
            <motion.div
              key="scene-internship"
              custom={direction}
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex items-center justify-center w-full h-full"
            >
              <InternshipSection onBack={() => navigateToView('home')} />
            </motion.div>
          )}

          {currentViewId === 'skills' && (
            /* 04 SKILLS (Full Spec View) */
            <motion.div
              key="scene-skills"
              custom={direction}
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex items-center justify-center w-full h-full"
            >
              <SkillsSection onBack={() => navigateToView('home')} />
            </motion.div>
          )}

          {currentViewId === 'journey' && (
            /* 05 JOURNEY (Full Spec View) */
            <motion.div
              key="scene-journey"
              custom={direction}
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex items-center justify-center w-full h-full"
            >
              <JourneySection onBack={() => navigateToView('home')} />
            </motion.div>
          )}

          {currentViewId === 'github' && (
            /* 06 GITHUB (Full Spec View) */
            <motion.div
              key="scene-github"
              custom={direction}
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex items-center justify-center w-full h-full"
            >
              <GithubSection onBack={() => navigateToView('home')} />
            </motion.div>
          )}

          {currentViewId === 'projects' && (
            /* 07 PROJECTS (Top-Level Navigation View) */
            <motion.div
              key="scene-projects"
              custom={direction}
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex items-center justify-center w-full h-full"
            >
              <ProjectsSection
                projects={WORK_PROJECTS}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                filters={FILTERS}
                onOpenProject={() => setContactOpen(true)}
              />
            </motion.div>
          )}

          {currentViewId === 'contact' && (
            /* 08 CONTACT (Top-Level Navigation View) */
            <motion.div
              key="scene-contact"
              custom={direction}
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex items-center justify-center w-full h-full"
            >
              <ContactSection onOpenMessage={() => setContactOpen(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ==================== GLOBAL FIXED FOOTER (FLOATING MINIMAL HUD) ==================== */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 h-[70px] px-6 md:px-12 flex items-center justify-between font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-[#626A65] pointer-events-none bg-transparent">
        <div className="flex items-center gap-3 pointer-events-auto">
          <span className="text-[#F1EFE8] font-black text-xs sm:text-sm md:text-base tracking-widest font-mono">
            PORTFOLIO / 2026
          </span>
        </div>

        <div className="flex items-center gap-6 pointer-events-auto">
          <button
            onClick={() => setOpenInfo(true)}
            className="flip-nav-link text-xs sm:text-sm md:text-base font-bold tracking-widest text-[#F1EFE8] hover:text-[#65E6D2] transition-colors cursor-pointer"
          >
            <span className="flip-nav-inner">
              <span className="flip-nav-front">INFO</span>
              <span className="flip-nav-back">INFO</span>
            </span>
          </button>
        </div>
      </footer>

      {/* ==================== CONTACT MODAL DIALOG ==================== */}
      <AnimatePresence>
        {contactOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setContactOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: '1200px' }}
              className="relative z-10 w-full max-w-xl"
            >
              <div
                ref={contactCardRef}
                onMouseMove={handleContactMouseMove}
                onMouseLeave={handleContactMouseLeave}
                style={{
                  transform: `rotateX(${contactTilt.rx}deg) rotateY(${contactTilt.ry}deg)`,
                  transition: 'transform 0.12s ease-out',
                  transformStyle: 'preserve-3d',
                }}
                className="w-full bg-[#111513] text-[#F1EFE8] p-8 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.85)] border border-[#2A302C] rounded-[2px]"
              >
                <div className="flex items-center justify-between pb-6 border-b border-[#2A302C]">
                  <div>
                    <span className="font-mono text-[9px] tracking-[0.25em] text-[#65E6D2] uppercase block mb-1">
                      DIRECT INQUIRY
                    </span>
                    <h2 className="text-2xl font-black tracking-tight text-[#F1EFE8] uppercase md:text-3xl font-display">
                      SEND A MESSAGE
                    </h2>
                  </div>
                  <button
                    onClick={() => setContactOpen(false)}
                    className="font-mono text-xs tracking-widest text-[#9EA49F] uppercase transition-colors hover:text-[#65E6D2] cursor-pointer"
                  >
                    CLOSE [✕]
                  </button>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-[#626A65] block uppercase mb-1 font-bold">
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        placeholder="Name"
                        className="w-full bg-[#0B0D0C] border-b border-[#2A302C] px-3 py-2 text-sm text-[#F1EFE8] placeholder-[#626A65] focus:outline-none focus:border-[#65E6D2] transition-all font-sans rounded-none"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-[#626A65] block uppercase mb-1 font-bold">
                        YOUR EMAIL
                      </label>
                      <input
                        type="email"
                        placeholder="Email address"
                        className="w-full bg-[#0B0D0C] border-b border-[#2A302C] px-3 py-2 text-sm text-[#F1EFE8] placeholder-[#626A65] focus:outline-none focus:border-[#65E6D2] transition-all font-sans rounded-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-[#626A65] block uppercase mb-1 font-bold">
                        COMPANY / ORGANIZATION
                      </label>
                      <input
                        type="text"
                        placeholder="Company name"
                        className="w-full bg-[#0B0D0C] border-b border-[#2A302C] px-3 py-2 text-sm text-[#F1EFE8] placeholder-[#626A65] focus:outline-none focus:border-[#65E6D2] transition-all font-sans rounded-none"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-[#626A65] block uppercase mb-1 font-bold">
                        PROJECT SCOPE
                      </label>
                      <input
                        type="text"
                        placeholder="Full-Stack, Cloud, AI Swarm..."
                        className="w-full bg-[#0B0D0C] border-b border-[#2A302C] px-3 py-2 text-sm text-[#F1EFE8] placeholder-[#626A65] focus:outline-none focus:border-[#65E6D2] transition-all font-sans rounded-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-[#626A65] block uppercase mb-1 font-bold">
                      PROJECT SPECIFICATIONS
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Project details, timeline, and architectural targets..."
                      className="w-full bg-[#0B0D0C] border-b border-[#2A302C] px-3 py-2 text-sm text-[#F1EFE8] placeholder-[#626A65] focus:outline-none focus:border-[#65E6D2] transition-all font-sans resize-none rounded-none"
                    />
                  </div>

                  <div className="flex flex-col items-center justify-between gap-4 pt-4 sm:flex-row">
                    <div className="flex items-center gap-4 font-mono text-[10px] tracking-wider text-[#9EA49F] uppercase">
                      <a href="https://www.linkedin.com/in/dev-mistry-828586298/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#65E6D2]">
                        LINKEDIN
                      </a>
                      <span>•</span>
                      <a href="https://github.com/DevM15" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#65E6D2]">
                        GITHUB
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto font-mono text-xs uppercase tracking-widest bg-[#65E6D2] text-[#0B0D0C] px-6 py-3 font-bold transition-all shadow-md hover:bg-[#7788FF] hover:text-white cursor-pointer"
                    >
                      TRANSMIT MESSAGE
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================== OPEN INFO OVERLAY (DIGITAL SYSTEM SPECIFICATION) ==================== */}
      <AnimatePresence>
        {openInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto md:p-8 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-[#111513] border border-[#2A302C] p-6 md:p-10 shadow-2xl text-[#F1EFE8] overflow-hidden my-auto rounded-[2px]"
            >
              <div className="relative z-10 flex items-center justify-between pb-4 mb-6 border-b border-[#2A302C]">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#65E6D2] animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#9EA49F]">
                    ENGINEERING SPECIFICATION // DEV MISTRY
                  </span>
                </div>
                <button
                  onClick={() => setOpenInfo(false)}
                  className="font-mono text-xs uppercase tracking-widest px-3 py-1.5 border border-[#2A302C] hover:bg-[#65E6D2] hover:text-[#0B0D0C] transition-colors cursor-pointer"
                >
                  CLOSE [✕]
                </button>
              </div>

              <div className="relative z-10 grid items-start grid-cols-1 gap-8 md:grid-cols-12">
                <div className="space-y-6 md:col-span-7">
                  <div className="border-l-2 border-[#65E6D2] pl-4">
                    <h2 className="text-3xl font-black leading-none tracking-tight text-[#F1EFE8] uppercase sm:text-4xl font-display">
                      DEV MISTRY
                    </h2>
                    <div className="mt-2 font-mono text-[11px] font-bold tracking-widest text-[#65E6D2] uppercase">
                      FULL STACK DEVELOPER • AGENTIC SYSTEMS
                    </div>
                  </div>

                  <div className="bg-[#171B19] p-5 border border-[#2A302C] rounded-[2px]">
                    <p className="font-sans text-xs sm:text-sm text-[#9EA49F] leading-relaxed">
                      Specialized in full-stack architecture, high-concurrency cloud environments on AWS, and autonomous agentic workflows orchestrating reasoning networks with deterministic boundaries.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                    <div className="bg-[#171B19] p-4 border border-[#2A302C] rounded-[2px]">
                      <span className="text-[9px] uppercase tracking-wider block text-[#626A65]">CURRENT STATUS</span>
                      <p className="font-bold text-[#F1EFE8] text-[11px] leading-tight mt-1">
                        Building Autonomous AI Swarms & Cloud Meshes
                      </p>
                    </div>

                    <div className="bg-[#171B19] p-4 border border-[#2A302C] rounded-[2px]">
                      <span className="text-[9px] uppercase tracking-wider block text-[#626A65]">LOCATION</span>
                      <p className="font-bold text-[#65E6D2] text-[11px] leading-tight mt-1">
                        MUMBAI, INDIA • REMOTE
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {['REACT / NEXT.JS', 'FASTAPI & PYTHON', 'AWS MULTI-REGION', 'TERRAFORM', 'LANGGRAPH & MCP', 'KUBERNETES'].map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 bg-[#171B19] border border-[#2A302C] text-[#9EA49F]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center md:col-span-5">
                  <div className="relative bg-[#171B19] border border-[#2A302C] p-3 rounded-[2px] shadow-2xl w-full max-w-[280px]">
                    <div className="relative mb-3 overflow-hidden border border-[#2A302C] aspect-[3/4] bg-[#0B0D0C]">
                      <img
                        src="/img/dev_portrait.jpg"
                        alt="Dev Mistry Portrait"
                        className="w-full h-full object-cover contrast-[1.05]"
                      />
                    </div>

                    <div className="font-mono text-xs font-semibold tracking-wider text-center text-[#9EA49F]">
                      DEV MISTRY // MUMBAI
                    </div>
                  </div>

                  <div className="w-full mt-6 space-y-2">
                    <button
                      onClick={() => {
                        setOpenInfo(false);
                        navigateToView('projects'); // Jump to Projects
                      }}
                      className="w-full py-2.5 bg-[#65E6D2] text-[#0B0D0C] font-mono text-xs tracking-widest uppercase font-bold shadow-lg transition-all hover:bg-[#7788FF] hover:text-white flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>SEE ARCHITECTURAL PROJECTS</span>
                      <span>→</span>
                    </button>
                    <button
                      onClick={() => {
                        setOpenInfo(false);
                        navigateToView('contact');
                      }}
                      className="w-full py-2 bg-[#171B19] hover:bg-[#2A302C] text-[#F1EFE8] font-mono text-xs tracking-widest uppercase transition-colors border border-[#2A302C] cursor-pointer"
                    >
                      TRANSMIT INQUIRY ✉
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center justify-between gap-2 pt-4 mt-6 text-[11px] font-mono border-t border-[#2A302C] sm:flex-row text-[#626A65]">
                <span>LOCATION: MUMBAI, INDIA • REMOTE WORLDWIDE</span>
                <div className="flex gap-4 text-[#9EA49F]">
                  <a href="https://github.com/DevM15" target="_blank" rel="noopener noreferrer" className="hover:text-[#65E6D2]">GITHUB</a>
                  <span>•</span>
                  <a href="https://www.linkedin.com/in/dev-mistry-828586298/" target="_blank" rel="noopener noreferrer" className="hover:text-[#65E6D2]">LINKEDIN</a>
                  <span>•</span>
                  <a href="mailto:devmistry1510@gmail.com" className="hover:text-[#65E6D2]">EMAIL</a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
