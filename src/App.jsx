import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import './styles/index.css';

// Exhibition items for the centered 360° cylindrical carousel on HOME
const CAROUSEL_ITEMS = [
  {
    id: '01',
    title: 'DEV MISTRY',
    badge: 'ABOUT DEV',
    category: 'PROFILE',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
    aspect: 'aspect-[3/4]',
  },
  {
    id: '02',
    title: 'CAIMAN EXHIBITION',
    badge: 'VISUAL IDENTITIES',
    category: 'SYSTEM DESIGN',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    aspect: 'aspect-[3/4]',
  },
  {
    id: '03',
    title: 'BLIND SPOT',
    badge: 'POSTERS DESIGN',
    category: 'NEURAL SIGNAL',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    aspect: 'aspect-[3/4]',
  },
  {
    id: '04',
    title: 'LU-FARM ANIMATIONS',
    badge: 'ANIMATIONS',
    category: 'MOTION SYSTEMS',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80',
    aspect: 'aspect-[16/10]',
  },
  {
    id: '05',
    title: 'FORM SHAPES',
    badge: 'TYPOGRAPHY',
    category: 'EDITORIAL GRAPHICS',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80',
    aspect: 'aspect-[3/4]',
  },
  {
    id: '06',
    title: 'DONT BE DUMB',
    badge: 'TYPOGRAPHY',
    category: 'BRANDING',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
    aspect: 'aspect-[3/4]',
  },
  {
    id: '07',
    title: 'ALL PROJECTS',
    badge: 'ALL PROJECTS',
    category: 'CATALOG ARCHIVE',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-[4/3]',
  },
];

// All Projects Catalog (For MY WORK page)
const WORK_PROJECTS = [
  {
    id: '01',
    num: '01',
    title: 'KISTEFOS MUSEUM',
    badge: 'VIEW CASE',
    type: 'PERSONAL PROJECT / POSTERS / +3',
    year: '2026',
    category: 'ALL WORK',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '02',
    num: '02',
    title: 'AURELIS CAPITAL',
    badge: 'VIEW CASE',
    type: 'PERSONAL PROJECT / VISUAL IDENTITY / +1',
    year: '2026',
    category: 'CLIENT WORK',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '03',
    num: '03',
    title: 'POSTERS BUNDLE #1',
    badge: 'VIEW CASE',
    type: 'PERSONAL PROJECT / POSTERS / +1',
    year: '2026',
    category: 'TYPOGRAPHY',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '04',
    num: '04',
    title: 'CAIMAN EXHIBITION',
    badge: 'VIEW CASE',
    type: 'COMMISSION / EXHIBITION POSTER',
    year: '2026',
    category: 'ALL WORK',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '05',
    num: '05',
    title: 'VINYL RECORDS PACKAGING',
    badge: 'VIEW CASE',
    type: 'ALBUM ARTWORK / PACKAGING',
    year: '2026',
    category: 'CLIENT WORK',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '06',
    num: '06',
    title: 'AURA STARR STREET POSTERS',
    badge: 'VIEW CASE',
    type: 'OUTDOOR MEDIA / BRAND IDENTITY',
    year: '2026',
    category: 'TYPOGRAPHY',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
  },
];

const FILTERS = [
  'ALL WORK',
  'ANIMATIONS',
  'CLIENT WORK',
  'EXAM PROJECT',
  'LOGO DESIGN',
  'MAGAZINE DESIGN',
];

export default function App() {
  const [activePage, setActivePage] = useState('HOME');
  const [contactOpen, setContactOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL WORK');
  const [openInfo, setOpenInfo] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  // Rotation & Snap state for centered carousel
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isSnapping, setIsSnapping] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startAngle = useRef(0);
  const snapTimeoutRef = useRef(null);

  const totalItems = CAROUSEL_ITEMS.length;
  const stepAngle = 360 / totalItems;

  // Snap to nearest item when user stops scrolling/dragging
  const snapToNearest = useCallback(() => {
    setIsSnapping(true);
    setRotationAngle((currentAngle) => {
      // Find nearest multiple of stepAngle
      const snapped = Math.round(currentAngle / stepAngle) * stepAngle;
      return snapped;
    });
    setTimeout(() => {
      setIsSnapping(false);
    }, 400);
  }, [stepAngle]);

  // Wheel listener: smooth continuous rotation with auto-snap on idle
  useEffect(() => {
    if (activePage !== 'HOME') return;

    const onWheel = (e) => {
      if (contactOpen || openInfo) return;
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      
      setRotationAngle((prev) => prev - delta * 0.08);

      clearTimeout(snapTimeoutRef.current);
      snapTimeoutRef.current = setTimeout(() => {
        snapToNearest();
      }, 180);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      clearTimeout(snapTimeoutRef.current);
    };
  }, [activePage, contactOpen, openInfo, snapToNearest]);

  // Arrow key navigation
  useEffect(() => {
    if (activePage !== 'HOME' || contactOpen || openInfo) return;

    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setRotationAngle((prev) => Math.round((prev - stepAngle) / stepAngle) * stepAngle);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setRotationAngle((prev) => Math.round((prev + stepAngle) / stepAngle) * stepAngle);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activePage, contactOpen, openInfo, stepAngle]);

  // Drag listeners
  const handleMouseDown = (e) => {
    if (activePage !== 'HOME') return;
    if (e.target.closest('button, input, a, textarea')) return;
    clearTimeout(snapTimeoutRef.current);
    isDragging.current = true;
    startX.current = e.clientX;
    startAngle.current = rotationAngle;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || activePage !== 'HOME') return;
    const diff = e.clientX - startX.current;
    setRotationAngle(startAngle.current + diff * 0.14);
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    snapToNearest();
  };

  const filteredProjects = activeFilter === 'ALL WORK'
    ? WORK_PROJECTS
    : WORK_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="relative w-screen h-screen bg-[#10130F] text-[#E8E1D2] overflow-hidden select-none font-sans"
    >
      <CustomCursor />

      {/* ==================== GLOBAL FIXED HEADER ==================== */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between text-xs tracking-wider uppercase font-mono text-[#E8E1D2] pointer-events-none">
        <div className="flex items-center gap-6 md:gap-12 pointer-events-auto">
          <div>
            <span className="text-[#686B5C]">NAME / </span>
            <span className="font-bold text-[#E8E1D2]">DEV MISTRY</span>
          </div>
          <div className="hidden lg:block">
            <span className="text-[#686B5C]">OCCUPATION / </span>
            <span>GRAPHIC & SYSTEM DESIGNER</span>
          </div>
          <div className="hidden xl:block">
            <span className="text-[#686B5C]">LOCATION / </span>
            <span>AHMEDABAD / OSLO</span>
          </div>
        </div>

        {/* Navigation Tabs: HOME | MY WORK | CONTACT */}
        <nav className="flex items-center gap-6 md:gap-8 pointer-events-auto text-sm font-display font-bold">
          <button
            onClick={() => {
              setActivePage('HOME');
              setContactOpen(false);
            }}
            className={`transition-colors duration-200 tracking-wider ${
              activePage === 'HOME' && !contactOpen
                ? 'text-[#E8E1D2] underline underline-offset-8'
                : 'text-[#686B5C] hover:text-[#E8E1D2]'
            }`}
          >
            HOME
          </button>
          <button
            onClick={() => {
              setActivePage('MY WORK');
              setContactOpen(false);
            }}
            className={`transition-colors duration-200 tracking-wider ${
              activePage === 'MY WORK' && !contactOpen
                ? 'text-[#E8E1D2] underline underline-offset-8'
                : 'text-[#686B5C] hover:text-[#E8E1D2]'
            }`}
          >
            MY WORK
          </button>
          <button
            onClick={() => setContactOpen(true)}
            className={`transition-colors duration-200 tracking-wider ${
              contactOpen ? 'text-[#E8E1D2] underline underline-offset-8' : 'text-[#686B5C] hover:text-[#E8E1D2]'
            }`}
          >
            CONTACT
          </button>
        </nav>
      </header>

      {/* ==================== PAGE TRANSITION WRAPPER ==================== */}
      <AnimatePresence mode="wait">
        {activePage === 'HOME' ? (
          /* ==================== PAGE 1: HOME (Centered Camera, Controlled Perspective, Large Cards) ==================== */
          <motion.div
            key="home-scene"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            {/* Viewport Stage: Fixed camera, eye level, 60mm controlled focal perspective */}
            <div
              className="relative w-full h-full flex items-center justify-center pointer-events-none"
              style={{
                perspective: '1800px', // Long focal length equivalent (50-70mm) to eliminate wide-angle distortion
                perspectiveOrigin: '50% 50%', // Camera centered at eye level
              }}
            >
              {/* Rotating Gallery Center Axis */}
              <div
                className="relative w-0 h-0 flex items-center justify-center"
                style={{
                  transformStyle: 'preserve-3d',
                  transition: isSnapping ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                }}
              >
                {CAROUSEL_ITEMS.map((item, index) => {
                  // Angular position of this card relative to center front (0°)
                  const itemTheta = index * stepAngle;
                  let diffAngle = (itemTheta + rotationAngle) % 360;
                  if (diffAngle > 180) diffAngle -= 360;
                  if (diffAngle < -180) diffAngle += 360;

                  // Distance from center front in degrees (-180 to +180)
                  const absDiff = Math.abs(diffAngle);

                  // Only render cards facing forward / side (+/- 120°) to avoid back clutter
                  if (absDiff > 130) return null;

                  // Curve towards the camera (the user is in front, the arc curves forward towards them):
                  // Active center card is at Z=0.
                  // Side cards curve forward closer towards the camera: positive translateZ, rotating inwards to face the viewer.
                  const rotateY = diffAngle > 0
                    ? Math.max(-diffAngle * 0.38, -20)
                    : Math.min(-diffAngle * 0.38, 20);

                  // Increased horizontal spacing between cards (520px step) for clear breathing room
                  const translateX = (diffAngle / stepAngle) * 520;
                  
                  // Gentle forward curve towards camera:
                  const translateZ = Math.pow(absDiff / 30, 1.6) * 50;

                  // Visual Hierarchy based on distance from center:
                  // Center Card: scale = 1.0, opacity = 1.0
                  // Side Cards: scale = 0.82-0.88, opacity = 0.85
                  // Distant: scale = 0.65-0.75, opacity = 0.55
                  const scale = Math.max(0.68, 1.0 - (absDiff / 180) * 0.48);
                  const opacity = Math.max(0.45, 1.0 - (absDiff / 140) * 0.65);
                  const isCenter = absDiff < 18;
                  const isHovered = hoveredCardId === item.id;

                  const isLandscape = item.aspect.includes('16/10') || item.aspect.includes('4/3');

                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setHoveredCardId(item.id)}
                      onMouseLeave={() => setHoveredCardId(null)}
                      onClick={() => {
                        if (isCenter) {
                          if (item.badge === 'ALL PROJECTS') {
                            setActivePage('MY WORK');
                          } else {
                            setOpenInfo(true);
                          }
                        } else {
                          // Clicking side card smoothly rotates it into center
                          setRotationAngle((prev) => prev - diffAngle);
                        }
                      }}
                      className="absolute flex flex-col items-center justify-center cursor-pointer pointer-events-auto"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                        opacity: opacity,
                        zIndex: Math.round(100 - absDiff),
                        // Desktop dimensions: Active card occupies 32-38% viewport width & 58-65% height
                        width: isLandscape ? 'clamp(380px, 36vw, 540px)' : 'clamp(320px, 28vw, 420px)',
                        left: isLandscape ? 'calc(-1 * clamp(380px, 36vw, 540px) / 2)' : 'calc(-1 * clamp(320px, 28vw, 420px) / 2)',
                        // Centered at 50% viewport height (card center aligns directly with eye level)
                        top: 'calc(-1 * clamp(460px, 58vh, 600px) / 2)',
                        transition: isSnapping
                          ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease'
                          : 'none',
                      }}
                    >
                      {/* 3D Exhibition Artwork Card */}
                      <div
                        className={`relative w-full ${item.aspect} bg-[#090A08] border overflow-hidden transition-all duration-400 ease-out`}
                        style={{
                          transform: isHovered ? 'translateY(-12px)' : 'translateY(0px)',
                          boxShadow: isCenter
                            ? (isHovered
                                ? '0 35px 70px -15px rgba(0, 0, 0, 0.95), 0 0 35px rgba(232, 225, 210, 0.15)'
                                : '0 25px 50px -10px rgba(0, 0, 0, 0.85)')
                            : '0 15px 30px -5px rgba(0, 0, 0, 0.7)',
                          borderColor: isCenter
                            ? (isHovered ? 'rgba(232, 225, 210, 0.5)' : 'rgba(232, 225, 210, 0.25)')
                            : 'rgba(255, 255, 255, 0.08)',
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                            isCenter
                              ? (isHovered ? 'grayscale-0 contrast-105 brightness-105' : 'grayscale contrast-125 brightness-95')
                              : 'grayscale contrast-110 brightness-85'
                          }`}
                        />

                        {/* Top Technical Metadata Tag */}
                        <div className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.2em] text-[#E8E1D2]/90 bg-[#10130F]/80 px-2.5 py-1 backdrop-blur-sm border border-white/10 uppercase">
                          {item.id} / {item.category}
                        </div>

                        {/* Gloss Sheen on hover */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Small Editorial Label directly beneath card (warm ivory text, minimal button) */}
                      <div className="mt-4 z-10 transition-transform duration-300">
                        <span
                          className={`font-display font-medium text-xs tracking-widest uppercase px-3.5 py-1.5 transition-all duration-300 border ${
                            isCenter
                              ? 'text-[#E8E1D2] bg-[#3B3F34] border-white/20 shadow-md'
                              : 'text-[#C8C1B2]/70 bg-[#10130F]/90 border-white/5'
                          }`}
                        >
                          {item.badge}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          /* ==================== PAGE 2: MY WORK ==================== */
          <motion.main
            key="work-scene"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full pt-28 pb-16 px-6 md:px-12 flex flex-col lg:flex-row gap-12 overflow-y-auto no-scrollbar"
          >
            {/* Left Column: Headline Statement & Filter Sidebar */}
            <aside className="lg:w-[320px] flex-shrink-0 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-[#E8E1D2] uppercase tracking-tight leading-snug mb-12">
                  SELECTED PROJECTS ACROSS IDENTITY, PRINT, DIGITAL AND EXPERIMENTAL WORK.
                </h1>

                {/* Filters List */}
                <div className="space-y-4 font-mono text-xs tracking-[0.2em] uppercase">
                  <span className="text-[#686B5C] text-[10px] block mb-2">FILTER</span>
                  {FILTERS.map((filt) => (
                    <button
                      key={filt}
                      onClick={() => setActiveFilter(filt)}
                      className={`block text-left transition-colors ${
                        activeFilter === filt
                          ? 'text-[#E8E1D2] font-bold border-b border-white pb-0.5'
                          : 'text-[#686B5C] hover:text-[#E8E1D2]'
                      }`}
                    >
                      {filt}
                    </button>
                  ))}
                  <button
                    onClick={() => setActiveFilter('ALL WORK')}
                    className="text-[11px] text-[#686B5C] hover:text-[#E8E1D2] pt-4 block"
                  >
                    VIEW ALL FILTERS +
                  </button>
                </div>
              </div>
            </aside>

            {/* Right Area: Project Grid Showcase */}
            <div className="flex-1">
              <div className="flex items-center justify-between pb-6 font-mono text-[11px] tracking-widest text-[#686B5C] border-b border-white/10 mb-8 uppercase">
                <span>
                  0{filteredProjects.length} / 0{WORK_PROJECTS.length} PROJECTS
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProjects.map((p) => (
                  <div key={p.id} className="group cursor-pointer flex flex-col">
                    <div className="relative aspect-[16/10] bg-[#090A08] border border-white/10 overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:border-white/30 group-hover:shadow-2xl">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                      />

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                        <span className="font-display font-bold text-xs tracking-widest uppercase bg-[#176D6C] text-[#E8E1D2] px-4 py-2 border border-white/20 shadow-lg">
                          {p.badge}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-baseline gap-3">
                      <span className="font-mono text-xs text-[#686B5C]">{p.num}</span>
                      <h3 className="font-display font-bold text-base md:text-lg text-[#E8E1D2] tracking-tight group-hover:text-white uppercase">
                        {p.title}
                      </h3>
                    </div>
                    <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-[#686B5C] uppercase">
                      <span>{p.type}</span>
                      <span>{p.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* ==================== GLOBAL FIXED FOOTER ==================== */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between font-mono text-xs tracking-wider uppercase text-[#E8E1D2] pointer-events-none">
        <div className="pointer-events-auto">
          <span className="font-bold">PORTFOLIO / 2026</span>
        </div>

        <div className="hidden sm:block text-[#686B5C] text-[10px] tracking-[0.2em]">
          {activePage === 'HOME'
            ? 'DRAG OR SCROLL TO ROTATE 360° CYLINDRICAL EXHIBITION'
            : 'CURATED PORTFOLIO ARCHIVE'}
        </div>

        <div className="pointer-events-auto">
          <button
            onClick={() => setOpenInfo(true)}
            className="hover:text-white text-[#E8E1D2] font-semibold underline underline-offset-4 tracking-widest cursor-pointer"
          >
            OPEN INFO
          </button>
        </div>
      </footer>

      {/* ==================== CONTACT MODAL DIALOG (Glassmorphism + Moving Gradient) ==================== */}
      <AnimatePresence>
        {contactOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 overflow-hidden">
            {/* Backdrop with Animated Moving Gradient Blobs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            >
              <motion.div
                animate={{
                  x: [0, 80, -60, 0],
                  y: [0, -60, 40, 0],
                  scale: [1, 1.25, 0.9, 1],
                }}
                transition={{
                  duration: 16,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#176D6C]/25 blur-3xl pointer-events-none"
              />

              <motion.div
                animate={{
                  x: [0, -90, 70, 0],
                  y: [0, 70, -50, 0],
                  scale: [1, 1.3, 0.85, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-[#686B5C]/35 blur-3xl pointer-events-none"
              />

              <motion.div
                animate={{
                  x: [0, 50, -40, 0],
                  y: [0, 40, -30, 0],
                }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full bg-[#582C2B]/20 blur-3xl pointer-events-none"
              />
            </motion.div>

            {/* Glassmorphic Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-[#3B3F34]/75 backdrop-blur-xl text-[#E8E1D2] p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] border border-white/20 z-10"
            >
              <div className="flex items-center justify-between pb-6 border-b border-white/15">
                <h2 className="text-2xl md:text-3xl font-display font-black tracking-tight uppercase text-white drop-shadow-sm">
                  SEND A MESSAGE
                </h2>
                <button
                  onClick={() => setContactOpen(false)}
                  className="font-mono text-xs tracking-widest uppercase hover:text-white transition-colors"
                >
                  CLOSE
                </button>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-[#E8E1D2]/80 block uppercase mb-1">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full bg-black/20 border-b border-white/30 px-3 py-2 text-sm text-[#E8E1D2] placeholder-[#A8A29E] focus:outline-none focus:border-white focus:bg-black/30 transition-all font-sans rounded-none"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-[#E8E1D2]/80 block uppercase mb-1">
                      YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      placeholder="Email address"
                      className="w-full bg-black/20 border-b border-white/30 px-3 py-2 text-sm text-[#E8E1D2] placeholder-[#A8A29E] focus:outline-none focus:border-white focus:bg-black/30 transition-all font-sans rounded-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-[#E8E1D2]/80 block uppercase mb-1">
                      COMPANY / OPTIONAL
                    </label>
                    <input
                      type="text"
                      placeholder="Company name"
                      className="w-full bg-black/20 border-b border-white/30 px-3 py-2 text-sm text-[#E8E1D2] placeholder-[#A8A29E] focus:outline-none focus:border-white focus:bg-black/30 transition-all font-sans rounded-none"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-[#E8E1D2]/80 block uppercase mb-1">
                      PROJECT TYPE
                    </label>
                    <input
                      type="text"
                      placeholder="Identity, web, cloud.."
                      className="w-full bg-black/20 border-b border-white/30 px-3 py-2 text-sm text-[#E8E1D2] placeholder-[#A8A29E] focus:outline-none focus:border-white focus:bg-black/30 transition-all font-sans rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] tracking-widest text-[#E8E1D2]/80 block uppercase mb-1">
                    TELL ME ABOUT THE PROJECT
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Project details, timing and budget.."
                    className="w-full bg-black/20 border-b border-white/30 px-3 py-2 text-sm text-[#E8E1D2] placeholder-[#A8A29E] focus:outline-none focus:border-white focus:bg-black/30 transition-all font-sans resize-none rounded-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                  <div className="flex items-center gap-4 font-mono text-[10px] tracking-wider text-[#C8C1B2] uppercase">
                    <a href="https://www.linkedin.com/in/dev-mistry-828586298/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      LINKEDIN
                    </a>
                    <span>•</span>
                    <a href="https://github.com/DevM15" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      GITHUB
                    </a>
                    <span>•</span>
                    <a href="mailto:devmistry1510@gmail.com" className="hover:text-white transition-colors">
                      DEVMISTRY1510@GMAIL.COM
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto font-mono text-xs uppercase tracking-widest bg-[#090A08]/90 hover:bg-[#090A08] text-[#E8E1D2] px-6 py-3 border border-white/20 transition-all shadow-md hover:scale-[1.02]"
                  >
                    SUBMIT INQUIRY
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================== OPEN INFO OVERLAY ==================== */}
      <AnimatePresence>
        {openInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-[#11140F]/90 backdrop-blur-xl border border-white/20 p-8 md:p-10 text-[#E8E1D2] shadow-2xl"
            >
              <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-[#686B5C] uppercase block mb-1">
                    STUDIO INFO
                  </span>
                  <h3 className="text-3xl font-display font-bold uppercase tracking-tight">
                    DEV MISTRY
                  </h3>
                  <p className="font-mono text-xs text-[#686B5C] mt-1">
                    GRAPHIC & SYSTEM ARCHITECT
                  </p>
                </div>
                <button
                  onClick={() => setOpenInfo(false)}
                  className="font-mono text-xs uppercase tracking-widest px-3 py-1.5 border border-white/20 hover:bg-white hover:text-black transition-colors"
                >
                  CLOSE [✕]
                </button>
              </div>

              <div className="space-y-4 text-[#C8C1B2] font-light leading-relaxed mb-6 text-sm">
                <p>
                  Dev Mistry is a designer and software architect creating minimal, graphic-led digital identities, resilient cloud backbones, and experimental interfaces.
                </p>
                <p>
                  Inspired by the spatial aesthetics of Rustam Kerimov, this portfolio is presented as an infinite 360° cylindrical gallery and curated architectural archive.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between font-mono text-xs text-[#686B5C]">
                <span>LOCATION: AHMEDABAD, INDIA</span>
                <span>STATUS: AVAILABLE 2026</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
