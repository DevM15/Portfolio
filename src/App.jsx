import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpatialCanvasBackground from './components/SpatialCanvasBackground';
import VantaTopologyBackground from './components/VantaTopologyBackground';
import ThemeToggle from './components/ThemeToggle';
import { useTransitionTimeline, TRANSITION_PHASES } from './utils/useTransitionTimeline';
import HorizontalScrollExhibition from './components/HorizontalScrollExhibition';
import AboutSection from './sections/AboutSection';
import InternshipSection from './sections/InternshipSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import JourneySection from './sections/JourneySection';
import GithubSection from './sections/GithubSection';
import ContactSection from './sections/ContactSection';
import TextLoop from './components/TextLoop/TextLoop';
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

// All Projects Catalog (Curated Technical Developer Works formatted as Vinyl Discography)
// Fetched directly from GitHub @devm15 public repositories
const WORK_PROJECTS = [
  {
    id: '01',
    num: '01',
    title: 'KART EDITOR',
    badge: 'AI WEB IDE',
    type: 'IN-BROWSER WEBCONTAINERS / MONACO / LOCAL LLM',
    description: 'Blazing-fast AI-integrated web IDE built in the browser using Next.js App Router, WebContainers, Monaco Editor, and local LLMs via Ollama. Real-time in-browser code execution and AI coding assistant.',
    year: '2026',
    category: 'AGENTIC AI',
    image: 'https://raw.githubusercontent.com/devm15/Kart/main/public/image.png',
    liveUrl: 'https://karteditor.vercel.app',
    githubUrl: 'https://github.com/DevM15/Kart',
    tags: ['NEXT.JS', 'WEBCONTAINERS', 'MONACO', 'OLLAMA', 'PRISMA'],
    color: '#8B5CF6',
    accent: '#B96F52',
  },
  {
    id: '02',
    num: '02',
    title: 'COINPULSE',
    badge: 'LIVE PLATFORM',
    type: 'CRYPTO ANALYTICS / LIGHTWEIGHT CHARTS / NEXT.JS',
    description: 'Real-time cryptocurrency analytics dashboard with interactive financial candlestick charts, live exchange market trends, currency conversion, and portfolio tracking.',
    year: '2026',
    category: 'WEB ARCHITECTURE',
    image: 'https://raw.githubusercontent.com/devm15/coinpulse/main/public/readme/readme-hero.webp',
    liveUrl: 'https://coinpulse-sigma-six.vercel.app',
    githubUrl: 'https://github.com/DevM15/coinpulse',
    tags: ['NEXT.JS', 'TYPESCRIPT', 'LIGHTWEIGHT-CHARTS', 'RADIX-UI'],
    color: '#F59E0B',
    accent: '#EAB308',
  },
  {
    id: '03',
    num: '03',
    title: 'TRAVEL PLANNER',
    badge: 'LIVE PLATFORM',
    type: '3D GLOBE / ITINERARY / GOOGLE MAPS API',
    description: 'Dynamic intelligent travel itinerary planner featuring an interactive 3D WebGL globe, drag-and-drop itinerary timelines, Google Maps routing, and Cloudinary uploads.',
    year: '2026',
    category: 'WEB ARCHITECTURE',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80',
    liveUrl: 'https://travel-planner-chi-six.vercel.app',
    githubUrl: 'https://github.com/DevM15/Travel-Planner',
    tags: ['NEXT.JS', 'REACT-GLOBE.GL', 'PRISMA', 'GOOGLE-MAPS', 'DND-KIT'],
    color: '#06B6D4',
    accent: '#38BDF8',
  },
  {
    id: '04',
    num: '04',
    title: 'NEWSMAN AI',
    badge: 'FULL-STACK AI',
    type: 'AI NEWS AGGREGATOR / GEMINI / NODE & MONGO',
    description: 'Autonomous AI-powered news extraction engine and aggregator. Uses Google Gemini AI and OpenAI to summarize and classify real-time news with automated cron workers and Cheerio web scraping.',
    year: '2025',
    category: 'AGENTIC AI',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1000&q=80',
    liveUrl: null,
    githubUrl: 'https://github.com/DevM15/NewsMan',
    tags: ['EXPRESS', 'GOOGLE GEMINI', 'OPENAI', 'CHEERIO', 'MONGODB'],
    color: '#10B981',
    accent: '#8FA48E',
  },
  {
    id: '05',
    num: '05',
    title: 'SEW PDF SHARING',
    badge: 'FULL-STACK CLOUD',
    type: 'SECURE DOCUMENT CLOUD / MERN / MULTER',
    description: 'Full-stack cloud document sharing platform built with React, Vite, Express, and MongoDB. Supports instant multipart streaming, secure access tokens, and cloud storage.',
    year: '2025',
    category: 'SYSTEM TOOLS',
    image: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?auto=format&fit=crop&w=1000&q=80',
    liveUrl: null,
    githubUrl: 'https://github.com/DevM15/Sew',
    tags: ['REACT', 'VITE', 'EXPRESS', 'MONGODB', 'MULTER'],
    color: '#EC4899',
    accent: '#C98265',
  },
  {
    id: '06',
    num: '06',
    title: 'DAILY DIGEST AUTOMATION',
    badge: 'WORKFLOW ENGINE',
    type: 'DISTRIBUTED N8N / RENDER / WEBHOOK PIPELINE',
    description: 'Automated personal briefing workflow and microservice architecture deployed on Render with n8n orchestrating daily asynchronous scheduled digests, RSS feeds, and notification webhooks.',
    year: '2026',
    category: 'CLOUD / AWS',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    liveUrl: null,
    githubUrl: 'https://github.com/DevM15/daily-digest-n8n',
    tags: ['N8N', 'RENDER', 'DOCKER', 'YAML', 'WEBHOOKS'],
    color: '#6366F1',
    accent: '#788477',
  },
  {
    id: '07',
    num: '07',
    title: 'TETA X1 PRO',
    badge: 'LIVE SHOWCASE',
    type: 'HARDWARE SHOWCASE / INTERACTIVE 3D & CSS',
    description: 'Futuristic flagship smartphone landing page featuring interactive device showcases, dark editorial aesthetics, smooth scroll animations, and mobile-first responsive design.',
    year: '2025',
    category: 'WEB ARCHITECTURE',
    image: 'https://raw.githubusercontent.com/devm15/Teta/main/assets/images/preview.png',
    liveUrl: 'https://tetanext.netlify.app',
    githubUrl: 'https://github.com/DevM15/Teta',
    tags: ['HTML5', 'CSS3', 'JAVASCRIPT', 'NETLIFY', 'ANIMATIONS'],
    color: '#14B8A6',
    accent: '#2DD4BF',
  },
  {
    id: '08',
    num: '08',
    title: 'PDF DECODER RUNTIME',
    badge: 'LIVE TOOL',
    type: 'CLIENT-SIDE BINARY EXTRACTION & PARSING',
    description: 'In-browser binary manipulation tool built with JavaScript and Web APIs allowing instantaneous merging, splitting, buffer extraction, and image-to-PDF conversion with zero server latency.',
    year: '2025',
    category: 'SYSTEM TOOLS',
    image: './img/project2.png',
    liveUrl: 'https://devm15.github.io/PDFdecoder/',
    githubUrl: 'https://github.com/DevM15/PDFdecoder',
    tags: ['JAVASCRIPT', 'JSPDF', 'CLIENT BUFFERS', 'BOOTSTRAP'],
    color: '#3B82F6',
    accent: '#65E6D2',
  },
  {
    id: '09',
    num: '09',
    title: 'ARCADE SYSTEM',
    badge: 'LIVE PLATFORM',
    type: 'WEB PLATFORM / JAVASCRIPT / CANVAS',
    description: 'Interactive web platform built with HTML5, CSS3, and JavaScript featuring custom canvas graphics, responsive UI architecture, design showcases, and client-side mini-games.',
    year: '2024',
    category: 'WEB ARCHITECTURE',
    image: 'https://raw.githubusercontent.com/devm15/Arcade/main/images/1.jpg',
    liveUrl: 'https://devm15.github.io/Arcade/',
    githubUrl: 'https://github.com/DevM15/Arcade',
    tags: ['HTML5', 'CSS3', 'JAVASCRIPT', 'CANVAS API'],
    color: '#8A5CF5',
    accent: '#B96F52',
  },
  {
    id: '10',
    num: '10',
    title: 'FUTUREDESKS WORKSPACE',
    badge: 'LIVE WORKSPACE',
    type: 'ENTERPRISE DASHBOARD / RESPONSIVE UI',
    description: 'Clean responsive enterprise workspace interface built with modern CSS and JavaScript, showcasing modular layout components, productivity widgets, and ergonomic design.',
    year: '2025',
    category: 'WEB ARCHITECTURE',
    image: 'https://raw.githubusercontent.com/devm15/Futuredesks/main/images/hero-bg.png',
    liveUrl: 'https://devm15.github.io/Futuredesks/',
    githubUrl: 'https://github.com/DevM15/Futuredesks',
    tags: ['BOOTSTRAP', 'JAVASCRIPT', 'RESPONSIVE UI', 'MODULAR'],
    color: '#F97316',
    accent: '#B96F52',
  },
  {
    id: '11',
    num: '11',
    title: 'CREATIVE AGENCY STUDIO',
    badge: 'AGENCY SHOWCASE',
    type: 'EDITORIAL PORTFOLIO / CREATIVE DESIGN',
    description: 'Modern creative studio portfolio platform featuring multi-column gallery showcases, typographic precision, interactive testimonials, and fluid responsive styling.',
    year: '2024',
    category: 'WEB ARCHITECTURE',
    image: 'https://raw.githubusercontent.com/devm15/Creative/main/images/port1.png',
    liveUrl: 'https://devm15.github.io/Creative/',
    githubUrl: 'https://github.com/DevM15/Creative',
    tags: ['HTML5', 'CSS3', 'JAVASCRIPT', 'EDITORIAL DESIGN'],
    color: '#E11D48',
    accent: '#FB7185',
  },
  {
    id: '12',
    num: '12',
    title: 'PORTFOLIO ARCHITECTURAL',
    badge: 'CURRENT BUILD',
    type: 'EDITORIAL DIGITAL EXHIBITION / REACT / THREE / VANTA',
    description: 'Current cinematic architectural portfolio exhibition featuring custom Vanta topology background, physical vinyl turntable player, Framer Motion horizontal scroll, and dark mode.',
    year: '2026',
    category: 'WEB ARCHITECTURE',
    image: './img/dev_portrait.jpg',
    liveUrl: 'https://portfolio-eosin-eight-82.vercel.app',
    githubUrl: 'https://github.com/DevM15/Portfolio',
    tags: ['REACT', 'FRAMER-MOTION', 'TAILWIND', 'VANTA.JS', 'P5.JS'],
    color: '#B96F52',
    accent: '#788477',
  },
];

const FILTERS = [
  'ALL WORK',
  'WEB ARCHITECTURE',
  'SYSTEM TOOLS',
  'CLOUD / AWS',
  'AGENTIC AI',
];

export default function App() {
  const [currentViewId, setCurrentViewId] = useState('home');
  const [prevViewId, setPrevViewId] = useState('home');
  const [contactOpen, setContactOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL WORK');
  const [openInfo, setOpenInfo] = useState(false);

  // Centralized Cinematic Transition Orchestrator
  const {
    phase: transitionPhase,
    phaseIndex,
    isAtLeast,
    isCompleted,
    timelineStart,
  } = useTransitionTimeline();

  const navigateToView = useCallback((viewId) => {
    if (viewId === currentViewId) return;
    window.scrollTo(0, 0);
    setPrevViewId(currentViewId);
    setCurrentViewId(viewId);
    setContactOpen(false);
  }, [currentViewId]);

  // Lock scroll restoration and start at 0, 0
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Ensure scroll is at 0, 0 when transition completes
  useEffect(() => {
    if (isCompleted) {
      window.scrollTo(0, 0);
    }
  }, [isCompleted]);

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
    if (contactOpen || openInfo || !isCompleted) return;

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
  }, [currentViewId, contactOpen, openInfo, isCompleted, navigateToView]);

  const viewOrder = ALL_VIEWS.map((v) => v.id);
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

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans transition-colors duration-400 select-none">
      {/* ==================== 1. VANTA.JS TOPOLOGY ANIMATED BACKGROUND ==================== */}
      <VantaTopologyBackground
        isRevealed={isAtLeast(TRANSITION_PHASES.BACKGROUND_TRANSFORM)}
      />

      {/* ==================== 2 & 3. AMBIENT PROFILE ILLUMINATION & ARCHITECTURAL GUIDES ==================== */}
      <SpatialCanvasBackground
        sectionIndex={currentIndex}
        isRevealed={isAtLeast(TRANSITION_PHASES.BACKGROUND_TRANSFORM)}
        hasVantaBg={true}
      />

      {/* Subtle Warm Vignette Layer */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 65%, var(--border-subtle) 100%)',
          opacity: 0.5,
        }}
      />

      {/* Extremely Faint Paper Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[2] bg-subtle-grain opacity-[var(--grain-opacity)]" />


      {/* ==================== GLOBAL ARCHITECTURAL NAVBAR ==================== */}
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{
          opacity: isAtLeast(TRANSITION_PHASES.NAVIGATION_REVEAL) ? 1 : 0,
          y: isAtLeast(TRANSITION_PHASES.NAVIGATION_REVEAL) ? 0 : -24,
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 h-[72px] px-6 sm:px-10 md:px-14 flex items-center justify-between uppercase font-sans text-[var(--text-primary)] pointer-events-none bg-[var(--bg-primary)]/85 backdrop-blur-md border-b border-[var(--border-primary)] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] transition-colors duration-400"
      >
        <div className="w-full max-w-[1720px] mx-auto flex items-center justify-between">
          {/* Left: Portfolio edition */}
          <div className="flex items-center gap-3 font-mono uppercase pointer-events-auto sm:gap-4">
            <span className="text-[var(--text-primary)] font-bold text-base sm:text-lg tracking-wider font-mono">
              PORTFOLIO <span className="text-[var(--accent)]">/</span> 2026
            </span>
          </div>

          {/* Navigation Controls: Segmented Pill Nav + Theme Toggle */}
          <div className="flex items-center gap-3 pointer-events-auto sm:gap-4">
            <nav className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-[var(--bg-surface)]/90 border border-[var(--border-primary)] shadow-xs">
              {NAV_SECTIONS.map((sec, idx) => {
                const isActive =
                  (sec.id === 'home' && !['projects', 'contact'].includes(currentViewId)) ||
                  sec.id === currentViewId;

                return (
                  <motion.button
                    key={sec.id}
                    onClick={() => navigateToView(sec.id)}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{
                      opacity: isAtLeast(TRANSITION_PHASES.NAVIGATION_REVEAL) ? 1 : 0,
                      y: isAtLeast(TRANSITION_PHASES.NAVIGATION_REVEAL) ? 0 : -12,
                    }}
                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className={`px-3.5 sm:px-4.5 py-1 sm:py-1.5 rounded-full text-xs sm:text-[13px] font-mono font-semibold tracking-wider transition-all duration-300 cursor-pointer ${isActive && !contactOpen
                      ? 'bg-[var(--accent)] text-[#F7F6F2] shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
                      }`}
                  >
                    {sec.label}
                  </motion.button>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isAtLeast(TRANSITION_PHASES.NAVIGATION_REVEAL) ? 1 : 0,
                scale: isAtLeast(TRANSITION_PHASES.NAVIGATION_REVEAL) ? 1 : 0.8,
              }}
              transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <ThemeToggle />
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* ==================== HORIZONTAL EXHIBITION STAGE ==================== */}
      <main className="relative w-full h-[calc(100vh-72px)] mt-[72px] mb-0 overflow-hidden flex items-center justify-center z-10">
        <AnimatePresence mode="wait" custom={direction}>
          {currentViewId === 'home' && (
            /* 01 HOME (Hero + Horizontal Scroll Exhibition Rooms) */
            <motion.div
              key="scene-home"
              custom={direction}
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <HorizontalScrollExhibition
                onOpenSection={(secId) => navigateToView(secId)}
                onNavigateToProjects={() => navigateToView('projects')}
                onNavigateToContact={() => navigateToView('contact')}
                transitionPhase={transitionPhase}
                phaseIndex={phaseIndex}
                timelineStart={timelineStart}
                isCompleted={isCompleted}
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

      {/* ==================== BOTTOM-RIGHT FIXED INFO BUTTON ==================== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: isAtLeast(TRANSITION_PHASES.DECORATION_SETTLEMENT) ? 1 : 0,
          scale: isAtLeast(TRANSITION_PHASES.DECORATION_SETTLEMENT) ? 1 : 0.85,
        }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed z-40 pointer-events-auto bottom-6 right-6 md:right-10"
      >
        <button
          onClick={() => setOpenInfo(true)}
          data-cursor="button"
          className="px-5 py-2.5 rounded-full border border-[var(--border-primary)] bg-[var(--bg-surface)]/95 backdrop-blur-md hover:border-[var(--accent)] hover:text-[var(--accent)] text-sm sm:text-base font-mono tracking-wider font-bold text-[var(--text-primary)] transition-all cursor-pointer shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <span>INFO</span>
          <span className="text-[var(--accent)] font-bold text-base">↗</span>
        </button>
      </motion.div>



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
                    <span className="font-mono text-[9px] tracking-[0.25em] text-[#788477] uppercase block mb-1">
                      DIRECT INQUIRY
                    </span>
                    <h2 className="text-2xl font-black tracking-tight text-[#F7F6F2] uppercase md:text-3xl font-display">
                      SEND A MESSAGE
                    </h2>
                  </div>
                  <button
                    onClick={() => setContactOpen(false)}
                    className="font-mono text-xs tracking-widest text-[#788477] uppercase transition-colors hover:text-[#F7F6F2] cursor-pointer"
                  >
                    CLOSE [✕]
                  </button>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-[#788477] block uppercase mb-1 font-bold">
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        placeholder="Name"
                        className="w-full bg-[#0B0D0C] border-b border-[#2A302C] px-3 py-2 text-sm text-[#F7F6F2] placeholder-[#788477]/60 focus:outline-none focus:border-[#788477] transition-all font-sans rounded-none"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-[#788477] block uppercase mb-1 font-bold">
                        YOUR EMAIL
                      </label>
                      <input
                        type="email"
                        placeholder="Email address"
                        className="w-full bg-[#0B0D0C] border-b border-[#2A302C] px-3 py-2 text-sm text-[#F7F6F2] placeholder-[#788477]/60 focus:outline-none focus:border-[#788477] transition-all font-sans rounded-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-[#788477] block uppercase mb-1 font-bold">
                        COMPANY / ORGANIZATION
                      </label>
                      <input
                        type="text"
                        placeholder="Company name"
                        className="w-full bg-[#0B0D0C] border-b border-[#2A302C] px-3 py-2 text-sm text-[#F7F6F2] placeholder-[#788477]/60 focus:outline-none focus:border-[#788477] transition-all font-sans rounded-none"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-[#788477] block uppercase mb-1 font-bold">
                        PROJECT SCOPE
                      </label>
                      <input
                        type="text"
                        placeholder="Full-Stack, Cloud, AI Swarm..."
                        className="w-full bg-[#0B0D0C] border-b border-[#2A302C] px-3 py-2 text-sm text-[#F7F6F2] placeholder-[#788477]/60 focus:outline-none focus:border-[#788477] transition-all font-sans rounded-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-[#788477] block uppercase mb-1 font-bold">
                      PROJECT SPECIFICATIONS
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Project details, timeline, and architectural targets..."
                      className="w-full bg-[#0B0D0C] border-b border-[#2A302C] px-3 py-2 text-sm text-[#F7F6F2] placeholder-[#788477]/60 focus:outline-none focus:border-[#788477] transition-all font-sans resize-none rounded-none"
                    />
                  </div>

                  <div className="flex flex-col items-center justify-between gap-4 pt-4 sm:flex-row">
                    <div className="flex items-center gap-4 font-mono text-[10px] tracking-wider text-[#788477] uppercase">
                      <a href="https://www.linkedin.com/in/dev-mistry-828586298/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#F7F6F2]">
                        LINKEDIN
                      </a>
                      <span>•</span>
                      <a href="https://github.com/DevM15" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#F7F6F2]">
                        GITHUB
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto font-sans text-xs uppercase tracking-wider bg-[#B96F52] hover:bg-[#C98369] text-[#F7F6F2] px-6 py-3 font-semibold transition-all shadow-md cursor-pointer"
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
      {/* ==================== ENGINEERING SPECIFICATION INFO MODAL ==================== */}
      <AnimatePresence>
        {openInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/60 dark:bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl h-[min(94vh,860px)] bg-[var(--bg-surface)] border border-[var(--border-primary)] p-6 md:p-10 shadow-2xl text-[var(--text-primary)] flex flex-col justify-between overflow-hidden rounded-[6px]"
            >
              {/* Top Header Row with DEV MISTRY & Spinning 360 Close Button */}
              <div className="relative z-10 flex items-start justify-between shrink-0">
                <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-[var(--text-primary)] uppercase font-display leading-[0.88]">
                  DEV MISTRY
                </h2>

                <button
                  onClick={() => setOpenInfo(false)}
                  aria-label="Close specification"
                  className="group relative p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors cursor-pointer bg-transparent border-0 outline-none"
                >
                  <span className="block text-2xl font-mono leading-none transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[360deg]">
                    ✕
                  </span>
                </button>
              </div>

              {/* Specimen Main Content: flex-1 space evenly across card height */}
              <div className="relative z-10 flex flex-col justify-between flex-1 gap-3 py-2 overflow-hidden sm:py-4 sm:gap-4">
                {/* Top Section: Role & Manifesto */}
                <div className="space-y-2 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-widest uppercase px-3 py-1 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-[3px] text-[var(--accent)]">
                      FULL-STACK ARCHITECT & SOFTWARE ENGINEER
                    </span>
                  </div>

                  <p className="font-sans text-sm sm:text-base md:text-lg text-[var(--text-primary)] font-medium leading-relaxed max-w-3xl">
                    Engineering high-throughput full-stack systems from intuitive client interfaces to fault-tolerant distributed backends and cloud-native databases.
                  </p>
                </div>

                {/* Status & Location Bar */}
                <div className="grid grid-cols-1 gap-3 font-mono text-xs sm:grid-cols-2 shrink-0">
                  <div className="bg-[var(--bg-primary)] p-3 border border-[var(--border-subtle)] rounded-[4px] flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse shrink-0" />
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] block font-semibold">STATUS</span>
                      <span className="font-bold text-[var(--text-primary)] text-xs sm:text-sm">
                        Full-Stack Design Intern @ Horizon View
                      </span>
                    </div>
                  </div>

                  <div className="bg-[var(--bg-primary)] p-3 border border-[var(--border-subtle)] rounded-[4px] flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] block font-semibold">BASE LOCATION</span>
                      <span className="font-bold text-[var(--accent)] text-xs sm:text-sm">
                        MUMBAI, INDIA
                      </span>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-[var(--text-muted)] border border-[var(--border-subtle)] px-2 py-0.5 rounded">
                      REMOTE WORLDWIDE
                    </span>
                  </div>
                </div>

                {/* Prominent Wavy TextLoop: Hero Feature occupying central space */}
                <div className="relative w-full flex-1 min-h-[140px] max-h-[220px] overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-primary)]/80 rounded-[4px] py-2 flex items-center shadow-inner">
                  <TextLoop
                    text="REACT ✦ NEXT.JS ✦ TYPESCRIPT ✦ NODE.JS ✦ EXPRESS ✦ POSTGRESQL ✦ MONGODB ✦ PRISMA ✦ DOCKER ✦ AWS ✦ TAILWIND CSS ✦ REDUX ✦ MYSQL ✦ GIT ✦"
                    shape="wave"
                    speed={85}
                    direction="forward"
                    separator="✦"
                    curviness={85}
                    fontSize={26}
                    fontWeight={800}
                    letterSpacing={2}
                    uppercase
                    ribbon={false}
                    color="var(--accent)"
                    pauseOnHover
                  />
                </div>

                {/* Action Buttons: See Projects, Internships, Contact */}
                <div className="flex flex-wrap items-center gap-3 pt-1 shrink-0">
                  <button
                    onClick={() => {
                      setOpenInfo(false);
                      navigateToView('projects');
                    }}
                    className="px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#F7F6F2] font-mono text-xs uppercase tracking-wider font-semibold rounded-[3px] cursor-pointer shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span>SEE THE PROJECTS</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => {
                      setOpenInfo(false);
                      navigateToView('internship');
                    }}
                    className="px-5 py-2.5 bg-[var(--bg-primary)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:text-[var(--accent)] font-mono text-xs uppercase tracking-wider border border-[var(--border-primary)] hover:border-[var(--accent)] rounded-[3px] cursor-pointer font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <span>INTERNSHIPS</span>
                  </button>
                  <a
                    href="mailto:devmistry1510@gmail.com"
                    className="px-5 py-2.5 bg-[var(--bg-primary)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:text-[var(--accent)] font-mono text-xs uppercase tracking-wider border border-[var(--border-primary)] hover:border-[var(--accent)] rounded-[3px] cursor-pointer font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <span>GET IN TOUCH ✉</span>
                  </a>
                </div>
              </div>

              {/* Footer Metadata & Social Links */}
              <div className="relative z-10 flex flex-col items-center justify-between gap-4 pt-3 sm:pt-4 border-t border-[var(--border-primary)] sm:flex-row text-[11px] sm:text-xs font-mono text-[var(--text-secondary)] shrink-0">
                <span>MUMBAI, INDIA • WORLDWIDE REMOTE</span>
                <div className="flex gap-5 text-[var(--text-secondary)] font-medium">
                  <a href="https://github.com/DevM15" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">GITHUB</a>
                  <span>•</span>
                  <a href="https://www.linkedin.com/in/dev-mistry-828586298/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">LINKEDIN</a>
                  <span>•</span>
                  <a href="mailto:devmistry1510@gmail.com" className="hover:text-[var(--accent)] transition-colors">EMAIL</a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
