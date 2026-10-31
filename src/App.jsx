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
    image: '/img/dev_portrait.jpg',
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
    // Rotate card toward mouse cursor (positive rx tilts down, ry tilts right)
    const ry = ((x - centerX) / centerX) * 12;
    const rx = -((y - centerY) / centerY) * 10;
    setContactTilt({ rx, ry });
  };

  const handleContactMouseLeave = () => {
    setContactTilt({ rx: 0, ry: 0 });
  };

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
      {/* Pixabay Background Loop Video with Opacity & Soft Blur */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20 filter blur-[1px]"
        >
          <source src="https://pixabay.com/videos/download/x-25696_medium.mp4" type="video/mp4" />
          <source src="https://cdn.pixabay.com/video/2019/08/21/25696-355153243_large.mp4" type="video/mp4" />
        </video>
        {/* Subtle dark gradient overlay to ensure perfect contrast with typography */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#10130F]/80 via-[#10130F]/60 to-[#10130F]/90" />
      </div>

      <CustomCursor />

      {/* ==================== GLOBAL FIXED HEADER (Exact Font Sizes & Hierarchy from Kerimov Designs) ==================== */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between uppercase font-sans text-[#E8E1D2] pointer-events-none">
        {/* Top-Left Metadata items: tiny font-bold uppercase with light tracking */}
        <div className="flex items-center gap-6 md:gap-14 pointer-events-auto text-[11px] font-bold tracking-tight">
          <div>
            <span className="text-[#E8E1D2]">NAME / </span>
            <span className="text-[#E8E1D2]">DEV MISTRY</span>
          </div>
          <div className="hidden lg:block">
            <span className="text-[#E8E1D2]">OCCUPATION / </span>
            <span>GRAPHIC & SYSTEM DESIGNER</span>
          </div>
          <div className="hidden xl:block">
            <span className="text-[#E8E1D2]">LOCATION / </span>
            <span>AHMEDABAD / OSLO, NORWAY</span>
          </div>
        </div>

        {/* Top-Right Navigation: Prominent bold items */}
        <nav className="flex items-center gap-6 md:gap-8 pointer-events-auto text-base sm:text-lg font-bold font-sans tracking-tight">
          <button
            onClick={() => {
              setActivePage('HOME');
              setContactOpen(false);
            }}
            className={`transition-colors duration-200 ${
              activePage === 'HOME' && !contactOpen
                ? 'text-[#E8E1D2]'
                : 'text-[#E8E1D2]/70 hover:text-[#E8E1D2]'
            }`}
          >
            HOME
          </button>
          <button
            onClick={() => {
              setActivePage('MY WORK');
              setContactOpen(false);
            }}
            className={`transition-colors duration-200 ${
              activePage === 'MY WORK' && !contactOpen
                ? 'text-[#E8E1D2]'
                : 'text-[#E8E1D2]/70 hover:text-[#E8E1D2]'
            }`}
          >
            MY WORK
          </button>
          <button
            onClick={() => setContactOpen(true)}
            className={`transition-colors duration-200 ${
              contactOpen ? 'text-[#E8E1D2]' : 'text-[#E8E1D2]/70 hover:text-[#E8E1D2]'
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
            className="relative flex items-center justify-center w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
          >
            {/* Viewport Stage: Fixed camera, eye level, 60mm controlled focal perspective */}
            <div
              className="relative flex items-center justify-center w-full h-full pointer-events-none"
              style={{
                perspective: '1800px', // Long focal length equivalent (50-70mm) to eliminate wide-angle distortion
                perspectiveOrigin: '50% 50%', // Camera centered at eye level
              }}
            >
              {/* Rotating Gallery Center Axis */}
              <div
                className="relative flex items-center justify-center w-0 h-0"
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

                  // Enhanced Curve towards camera:
                  // Active center card is at Z=0. Side cards curve forward closer towards camera with distinct inward rotation.
                  const rotateY = diffAngle > 0
                    ? Math.max(-diffAngle * 0.48, -26)
                    : Math.min(-diffAngle * 0.48, 26);

                  // Increased horizontal spacing between cards (620px step) for generous breathing room
                  const translateX = (diffAngle / stepAngle) * 620;
                  
                  // Pronounced forward curve towards camera:
                  const translateZ = Math.pow(absDiff / 26, 1.65) * 85;

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
                        // Elevated slightly above exact vertical center for optimal optical balance
                        top: 'calc(-1 * clamp(460px, 58vh, 600px) / 2 - 32px)',
                        transition: isSnapping
                          ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease'
                          : 'none',
                      }}
                    >
                      {/* 3D Exhibition Artwork Card (Compact photo with blurred backdrop for Profile) */}
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
                        {item.type === 'profile' || item.id === '01' ? (
                          /* Profile Card: Scaled photo with blurred depth backdrop and integrated text */
                          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
                            {/* Blurred Ambient Photo Layer */}
                            <img
                              src={item.image}
                              alt={item.title}
                              className="absolute inset-0 w-full h-full object-cover scale-125 filter blur-lg opacity-40 brightness-75"
                            />
                            
                            {/* Top Details */}
                            <div className="relative z-10 p-5 flex items-start justify-between">
                              <span className="font-mono text-[9px] tracking-[0.2em] text-[#E8E1D2]/90 bg-[#10130F]/80 px-2.5 py-1 backdrop-blur-sm border border-white/10 uppercase">
                                01 / PROFILE
                              </span>
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mt-1" />
                            </div>

                            {/* Centered Compact Portrait Frame with Subtle Washi Tape */}
                            <div className="relative z-10 mx-auto my-auto w-36 h-44 sm:w-40 sm:h-48 bg-stone-900 border-2 border-white/20 shadow-2xl overflow-hidden rounded-sm group-hover:scale-105 transition-transform duration-500">
                              <img
                                src={item.image}
                                alt="Dev Mistry"
                                className="w-full h-full object-cover contrast-105 brightness-95"
                              />
                            </div>

                            {/* Bottom Contextual Editorial Typography */}
                            <div className="relative z-10 p-5 bg-gradient-to-t from-[#090A08] via-[#090A08]/90 to-transparent border-t border-white/[0.08]">
                              <h3 className="font-display font-black text-xl text-[#E8E1D2] tracking-tight uppercase leading-tight">
                                DEV MISTRY
                              </h3>
                              <p className="font-mono text-[10px] text-[#C8C1B2] tracking-wider uppercase mt-1">
                                SOFTWARE ARCHITECT & DESIGNER
                              </p>
                              <p className="font-sans text-[11px] text-[#8E8E93] leading-relaxed mt-1 font-light line-clamp-2">
                                Building autonomous AI systems, resilient cloud meshes, and minimal digital platforms.
                              </p>
                            </div>
                          </div>
                        ) : (
                          /* Artwork Cards */
                          <>
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
                          </>
                        )}

                        {/* Gloss Sheen on hover */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Small Editorial Label directly beneath card (warm ivory text, minimal button) */}
                      <div className="z-10 mt-4 transition-transform duration-300">
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
            className="flex flex-col w-full h-full gap-12 px-6 pb-16 overflow-y-auto pt-28 md:px-12 lg:flex-row no-scrollbar"
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

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {filteredProjects.map((p) => (
                  <div key={p.id} className="flex flex-col cursor-pointer group">
                    <div className="relative aspect-[16/10] bg-[#090A08] border border-white/10 overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:border-white/30 group-hover:shadow-2xl">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="object-cover w-full h-full transition-all duration-700 ease-out grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0"
                      />

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                        <span className="font-display font-bold text-xs tracking-widest uppercase bg-[#176D6C] text-[#E8E1D2] px-4 py-2 border border-white/20 shadow-lg">
                          {p.badge}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-3 mt-4">
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

      {/* ==================== GLOBAL FIXED FOOTER (Exact Font Sizes from Kerimov Designs) ==================== */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between font-sans uppercase text-[#E8E1D2] pointer-events-none">
        <div className="pointer-events-auto">
          <span className="font-bold text-base sm:text-lg tracking-tight">PORTFOLIO / 2026</span>
        </div>

        <div className="hidden sm:block text-[#686B5C] text-[10px] tracking-[0.2em] font-mono">
          {activePage === 'HOME'
            ? 'DRAG OR SCROLL TO ROTATE 360° CYLINDRICAL EXHIBITION'
            : 'CURATED PORTFOLIO ARCHIVE'}
        </div>

        <div className="pointer-events-auto">
          <button
            onClick={() => setOpenInfo(true)}
            className="hover:text-white text-[#E8E1D2] font-bold text-[11px] tracking-tight cursor-pointer"
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

            {/* Glassmorphic Modal Card with Dynamic 3D Cursor Tracking & Website Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                perspective: '1200px',
              }}
              className="relative w-full max-w-xl z-10"
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
                className="w-full bg-[#171B14]/85 backdrop-blur-2xl text-[#E8E1D2] p-8 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.85)] border border-[#686B5C]/30"
              >
                <div className="flex items-center justify-between pb-6 border-b border-[#686B5C]/20">
                  <h2 className="text-2xl font-black tracking-tight text-[#E8E1D2] uppercase md:text-3xl font-display">
                    SEND A MESSAGE
                  </h2>
                  <button
                    onClick={() => setContactOpen(false)}
                    className="font-mono text-xs tracking-widest text-[#C8C1B2] uppercase transition-colors hover:text-white"
                  >
                    CLOSE
                  </button>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-[#686B5C] block uppercase mb-1 font-bold">
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        placeholder="Name"
                        className="w-full bg-[#10130F]/60 border-b border-[#686B5C]/40 px-3 py-2 text-sm text-[#E8E1D2] placeholder-[#686B5C] focus:outline-none focus:border-[#E8E1D2] focus:bg-[#10130F]/90 transition-all font-sans rounded-none"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-[#686B5C] block uppercase mb-1 font-bold">
                        YOUR EMAIL
                      </label>
                      <input
                        type="email"
                        placeholder="Email address"
                        className="w-full bg-[#10130F]/60 border-b border-[#686B5C]/40 px-3 py-2 text-sm text-[#E8E1D2] placeholder-[#686B5C] focus:outline-none focus:border-[#E8E1D2] focus:bg-[#10130F]/90 transition-all font-sans rounded-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-[#686B5C] block uppercase mb-1 font-bold">
                        COMPANY / OPTIONAL
                      </label>
                      <input
                        type="text"
                        placeholder="Company name"
                        className="w-full bg-[#10130F]/60 border-b border-[#686B5C]/40 px-3 py-2 text-sm text-[#E8E1D2] placeholder-[#686B5C] focus:outline-none focus:border-[#E8E1D2] focus:bg-[#10130F]/90 transition-all font-sans rounded-none"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-[#686B5C] block uppercase mb-1 font-bold">
                        PROJECT TYPE
                      </label>
                      <input
                        type="text"
                        placeholder="Identity, web, cloud.."
                        className="w-full bg-[#10130F]/60 border-b border-[#686B5C]/40 px-3 py-2 text-sm text-[#E8E1D2] placeholder-[#686B5C] focus:outline-none focus:border-[#E8E1D2] focus:bg-[#10130F]/90 transition-all font-sans rounded-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-[#686B5C] block uppercase mb-1 font-bold">
                      TELL ME ABOUT THE PROJECT
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Project details, timing and budget.."
                      className="w-full bg-[#10130F]/60 border-b border-[#686B5C]/40 px-3 py-2 text-sm text-[#E8E1D2] placeholder-[#686B5C] focus:outline-none focus:border-[#E8E1D2] focus:bg-[#10130F]/90 transition-all font-sans resize-none rounded-none"
                    />
                  </div>

                  <div className="flex flex-col items-center justify-between gap-4 pt-4 sm:flex-row">
                    <div className="flex items-center gap-4 font-mono text-[10px] tracking-wider text-[#C8C1B2] uppercase">
                      <a href="https://www.linkedin.com/in/dev-mistry-828586298/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                        LINKEDIN
                      </a>
                      <span>•</span>
                      <a href="https://github.com/DevM15" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                        GITHUB
                      </a>
                      <span>•</span>
                      <a href="mailto:devmistry1510@gmail.com" className="transition-colors hover:text-white">
                        DEVMISTRY1510@GMAIL.COM
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto font-mono text-xs uppercase tracking-widest bg-[#10130F] hover:bg-black text-[#E8E1D2] px-6 py-3 border border-[#686B5C]/40 transition-all shadow-md hover:scale-[1.02]"
                    >
                      SUBMIT INQUIRY
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================== OPEN INFO OVERLAY (SCRAPBOOK PROFILE DOSSIER) ==================== */}
      <AnimatePresence>
        {openInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto md:p-8 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-[#121610] border border-white/20 p-6 md:p-10 shadow-2xl text-[#E8E1D2] overflow-hidden my-auto"
            >
              {/* Background Textured collage elements */}
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#176D6C]/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#686B5C]/25 blur-3xl pointer-events-none" />

              {/* Close Button Header */}
              <div className="relative z-10 flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#686B5C]">
                    PROFILE DOSSIER // DEV MISTRY
                  </span>
                </div>
                <button
                  onClick={() => setOpenInfo(false)}
                  className="font-mono text-xs uppercase tracking-widest px-3 py-1.5 border border-white/20 hover:bg-white hover:text-black transition-colors"
                >
                  CLOSE [✕]
                </button>
              </div>

              {/* Main Collage Content Layout (Inspired by Stash Lopes Collage Board) */}
              <div className="relative z-10 grid items-start grid-cols-1 gap-6 md:grid-cols-12">
                
                {/* Left Column: Lined Paper Title & Intro Sticky Cards */}
                <div className="space-y-5 md:col-span-7">
                  {/* Torn Lined Paper Title Card */}
                  <div className="relative bg-lined-paper text-[#11140F] p-5 shadow-xl border-l-4 border-red-500 transform -rotate-1 rounded-sm">
                    {/* Washi Tape Strip on Top */}
                    <div className="absolute -top-3 left-10 w-24 h-5 bg-[#E8D9DD]/80 border border-black/10 transform rotate-1 shadow-sm opacity-90" />
                    
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#090A08] uppercase leading-none font-display">
                      DEV MISTRY
                    </h2>
                    <div className="mt-2 inline-block bg-[#11140F] text-[#FAFAF7] font-mono text-[11px] font-bold tracking-widest px-2.5 py-0.5 uppercase">
                      FULL-STACK ARCHITECT + AGENTIC AI
                    </div>
                  </div>

                  {/* Summary Note Card */}
                  <div className="bg-[#EAE4D9] text-[#1E1E1E] p-4 shadow-lg border border-[#D5CEBF] transform rotate-1 rounded-sm relative">
                    <p className="font-sans text-xs font-medium leading-relaxed sm:text-sm">
                      Engineer & system designer crafting scalable distributed backbones, autonomous agentic workflows in Python & LangGraph, and minimal graphic-led digital platforms.
                    </p>
                  </div>

                  {/* Badges / Experience Highlights Strip */}
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    {/* Yellow Post-it Sticky Note */}
                    <div className="bg-[#FEF08A] text-[#713F12] p-3 shadow-md transform -rotate-2 relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-600 mx-auto -mt-4 mb-1 shadow-sm" />
                      <span className="text-[9px] uppercase tracking-wider block text-[#854D0E] font-bold">CURRENT STATUS</span>
                      <p className="font-bold text-[11px] leading-tight mt-0.5">
                        Building Autonomous AI Swarms & Cloud Meshes
                      </p>
                    </div>

                    {/* Ticket / Stamp Badge */}
                    <div className="bg-[#FBCFE8] text-[#831843] p-3 shadow-md transform rotate-2 relative border border-dashed border-[#F472B6]">
                      <span className="text-[9px] uppercase tracking-wider block font-bold">RECOGNITION</span>
                      <p className="font-bold text-[11px] leading-tight mt-0.5">
                        1ST PLACE HACKATHON WINNER '25
                      </p>
                    </div>
                  </div>

                  {/* Technical Capabilities Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['REACT / NEXT.JS', 'FASTAPI & PYTHON', 'AWS MULTI-REGION', 'TERRAFORM', 'LANGGRAPH & MCP', 'KUBERNETES'].map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 bg-white/[0.06] border border-white/10 text-[#C8C1B2]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Polaroid Portrait Photo Card & Action Links */}
                <div className="flex flex-col items-center md:col-span-5">
                  {/* Polaroid Frame with Washi Tape */}
                  <div className="relative bg-white text-[#11140F] p-3.5 pb-5 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300 w-full max-w-[280px]">
                    {/* Translucent washi tape at top */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#C8C1B2]/60 backdrop-blur-sm border border-black/10 transform -rotate-1 shadow-sm" />
                    
                    {/* Portrait Photo with Blurred Background Treatment */}
                    <div className="relative mb-3 overflow-hidden border aspect-square bg-stone-900 border-stone-200">
                      {/* Blurred Ambient Backdrop Layer */}
                      <img
                        src="/img/dev_portrait.jpg"
                        alt="Dev Mistry Backdrop Blur"
                        className="absolute inset-0 object-cover w-full h-full scale-125 filter blur-md opacity-70"
                      />
                      {/* Crisp Foreground Portrait */}
                      <img
                        src="/img/dev_portrait.jpg"
                        alt="Dev Mistry Portrait"
                        className="relative z-10 object-contain w-full h-full contrast-105"
                      />
                    </div>

                    {/* Polaroid Hand-written Caption */}
                    <div className="font-mono text-xs font-semibold tracking-wider text-center text-stone-700">
                      dev, deploying systems ✌
                    </div>

                    {/* Stamp Sticker */}
                    <div className="absolute -top-2 -right-3 bg-red-600 text-white font-mono text-[8px] font-bold px-2 py-0.5 transform rotate-12 shadow uppercase border border-red-400">
                      EST. 2026
                    </div>
                  </div>

                  {/* Quick Action Navigation Buttons */}
                  <div className="w-full mt-6 space-y-2">
                    <button
                      onClick={() => {
                        setOpenInfo(false);
                        setActivePage('MY WORK');
                      }}
                      className="w-full py-2.5 bg-[#DC2626] hover:bg-red-700 text-white font-mono text-xs tracking-widest uppercase font-bold shadow-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <span>SEE THE PROJECTS</span>
                      <span>→</span>
                    </button>
                    <button
                      onClick={() => {
                        setOpenInfo(false);
                        setContactOpen(true);
                      }}
                      className="w-full py-2 bg-white/10 hover:bg-white/20 text-[#E8E1D2] font-mono text-xs tracking-widest uppercase transition-colors border border-white/20"
                    >
                      GET IN TOUCH ✉
                    </button>
                  </div>
                </div>

              </div>

              {/* Bottom Footer Note */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#686B5C] gap-2 relative z-10">
                <span>LOCATION: AHMEDABAD, INDIA • REMOTE WORLDWIDE</span>
                <div className="flex gap-4 text-[#C8C1B2]">
                  <a href="https://github.com/DevM15" target="_blank" rel="noopener noreferrer" className="hover:text-white">GITHUB</a>
                  <span>•</span>
                  <a href="https://www.linkedin.com/in/dev-mistry-828586298/" target="_blank" rel="noopener noreferrer" className="hover:text-white">LINKEDIN</a>
                  <span>•</span>
                  <a href="mailto:devmistry1510@gmail.com" className="hover:text-white">EMAIL</a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
