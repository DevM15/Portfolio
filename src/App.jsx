import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import AboutSection from './sections/AboutSection';
import InternshipSection from './sections/InternshipSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import JourneySection from './sections/JourneySection';
import GithubSection from './sections/GithubSection';
import ContactSection from './sections/ContactSection';
import './styles/index.css';

// 8 Major Cohesive Exhibition Sections
const SECTIONS = [
  { id: 'home', label: 'HOME', num: '01' },
  { id: 'about', label: 'ABOUT', num: '02' },
  { id: 'internship', label: 'INTERNSHIP', num: '03' },
  { id: 'projects', label: 'PROJECTS', num: '04' },
  { id: 'skills', label: 'SKILLS', num: '05' },
  { id: 'journey', label: 'JOURNEY', num: '06' },
  { id: 'github', label: 'GITHUB', num: '07' },
  { id: 'contact', label: 'CONTACT', num: '08' },
];

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

// All Projects Catalog (For PROJECTS section)
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
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
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
    const ry = ((x - centerX) / centerX) * 12;
    const rx = -((y - centerY) / centerY) * 10;
    setContactTilt({ rx, ry });
  };

  const handleContactMouseLeave = () => {
    setContactTilt({ rx: 0, ry: 0 });
  };

  // Rotation & Snap state for centered carousel on HOME
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isSnapping, setIsSnapping] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startAngle = useRef(0);
  const snapTimeoutRef = useRef(null);

  const totalItems = CAROUSEL_ITEMS.length;
  const stepAngle = 360 / totalItems;

  const snapToNearest = useCallback(() => {
    setIsSnapping(true);
    setRotationAngle((currentAngle) => {
      const snapped = Math.round(currentAngle / stepAngle) * stepAngle;
      return snapped;
    });
    setTimeout(() => {
      setIsSnapping(false);
    }, 400);
  }, [stepAngle]);

  // Wheel listener: On HOME rotate carousel; across sections navigate smoothly
  useEffect(() => {
    const onWheel = (e) => {
      if (contactOpen || openInfo) return;
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      if (currentSectionIndex === 0) {
        // HOME: Cylindrical rotation
        setRotationAngle((prev) => prev - delta * 0.08);
        clearTimeout(snapTimeoutRef.current);
        snapTimeoutRef.current = setTimeout(() => {
          snapToNearest();
        }, 180);
      } else {
        // Other sections: debounced horizontal navigation
        if (Math.abs(delta) < 25) return;
        clearTimeout(snapTimeoutRef.current);
        snapTimeoutRef.current = setTimeout(() => {
          if (delta > 0) {
            setCurrentSectionIndex((prev) => Math.min(prev + 1, SECTIONS.length - 1));
          } else {
            setCurrentSectionIndex((prev) => Math.max(prev - 1, 0));
          }
        }, 60);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      clearTimeout(snapTimeoutRef.current);
    };
  }, [currentSectionIndex, contactOpen, openInfo, snapToNearest]);

  // Keyboard navigation (← and →)
  useEffect(() => {
    if (contactOpen || openInfo) return;

    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (currentSectionIndex === 0) {
          setRotationAngle((prev) => Math.round((prev - stepAngle) / stepAngle) * stepAngle);
        } else {
          setCurrentSectionIndex((prev) => Math.min(prev + 1, SECTIONS.length - 1));
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (currentSectionIndex === 0) {
          setRotationAngle((prev) => Math.round((prev + stepAngle) / stepAngle) * stepAngle);
        } else {
          setCurrentSectionIndex((prev) => Math.max(prev - 1, 0));
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentSectionIndex, contactOpen, openInfo, stepAngle]);

  // Drag listeners on HOME
  const handleMouseDown = (e) => {
    if (currentSectionIndex !== 0) return;
    if (e.target.closest('button, input, a, textarea')) return;
    clearTimeout(snapTimeoutRef.current);
    isDragging.current = true;
    startX.current = e.clientX;
    startAngle.current = rotationAngle;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || currentSectionIndex !== 0) return;
    const diff = e.clientX - startX.current;
    setRotationAngle(startAngle.current + diff * 0.14);
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    snapToNearest();
  };

  // Section Animation Variants (Smooth L-to-R transition with subtle drop)
  const sectionVariants = {
    initial: { opacity: 0, x: 40, y: -10 },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      x: -40,
      y: 10,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const currentSection = SECTIONS[currentSectionIndex];

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
        <div className="absolute inset-0 bg-gradient-to-b from-[#10130F]/80 via-[#10130F]/60 to-[#10130F]/90" />
      </div>

      <CustomCursor />

      {/* ==================== GLOBAL FIXED HEADER ==================== */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between uppercase font-sans text-[#E8E1D2] pointer-events-none">
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

        {/* Top-Right Navigation: 8-Section Cohesive Exhibition Navigation */}
        <nav className="flex items-center gap-4 sm:gap-6 pointer-events-auto text-xs sm:text-sm font-bold font-sans tracking-tight">
          {SECTIONS.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => {
                setCurrentSectionIndex(idx);
                setContactOpen(false);
              }}
              className={`transition-colors duration-200 ${
                currentSectionIndex === idx && !contactOpen
                  ? 'text-[#E8E1D2] font-black underline underline-offset-8'
                  : 'text-[#E8E1D2]/60 hover:text-[#E8E1D2]'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ==================== HORIZONTAL EXHIBITION STAGE ==================== */}
      <main className="relative w-full h-full pt-20 pb-16 z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentSectionIndex === 0 && (
            /* 01 HOME (Infinite 360° Amphitheater Cylinder with Compact Profile Card) */
            <motion.div
              key="scene-home"
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full relative overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
              <div
                className="relative w-full h-full flex items-center justify-center pointer-events-none"
                style={{
                  perspective: '1800px',
                  perspectiveOrigin: '50% 50%',
                }}
              >
                <div
                  className="relative w-0 h-0 flex items-center justify-center"
                  style={{
                    transformStyle: 'preserve-3d',
                    transition: isSnapping ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                  }}
                >
                  {CAROUSEL_ITEMS.map((item, index) => {
                    const itemTheta = index * stepAngle;
                    let diffAngle = (itemTheta + rotationAngle) % 360;
                    if (diffAngle > 180) diffAngle -= 360;
                    if (diffAngle < -180) diffAngle += 360;

                    const absDiff = Math.abs(diffAngle);
                    if (absDiff > 130) return null;

                    const rotateY = diffAngle > 0
                      ? Math.max(-diffAngle * 0.48, -26)
                      : Math.min(-diffAngle * 0.48, 26);

                    const translateX = (diffAngle / stepAngle) * 620;
                    const translateZ = Math.pow(absDiff / 26, 1.65) * 85;

                    const scale = Math.max(0.68, 1.0 - (absDiff / 180) * 0.48);
                    const opacity = Math.max(0.45, 1.0 - (absDiff / 140) * 0.65);
                    const isCenter = absDiff < 18;
                    const isHovered = hoveredCardId === item.id;
                    const isLandscape = item.aspect.includes('16/10') || item.aspect.includes('4/3');
                    const isProfile = item.type === 'profile' || item.id === '01';

                    let cardWidth = 'clamp(320px, 28vw, 420px)';
                    let cardHeightOffset = 'clamp(460px, 58vh, 600px)';
                    if (isProfile) {
                      cardWidth = 'clamp(260px, 22vw, 300px)';
                      cardHeightOffset = '400px';
                    } else if (isLandscape) {
                      cardWidth = 'clamp(380px, 36vw, 540px)';
                    }

                    let cardRotateY = rotateY;
                    if (isProfile) {
                      cardRotateY = isCenter ? 0 : (diffAngle > 0 ? -3 : 3);
                    }

                    return (
                      <div
                        key={item.id}
                        onMouseEnter={() => setHoveredCardId(item.id)}
                        onMouseLeave={() => setHoveredCardId(null)}
                        onClick={() => {
                          if (isCenter) {
                            if (item.badge === 'ALL PROJECTS') {
                              setCurrentSectionIndex(3); // Jump to PROJECTS
                            } else {
                              setOpenInfo(true);
                            }
                          } else {
                            setRotationAngle((prev) => prev - diffAngle);
                          }
                        }}
                        className="absolute flex flex-col items-center justify-center cursor-pointer pointer-events-auto"
                        style={{
                          transformStyle: 'preserve-3d',
                          transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${cardRotateY}deg) scale(${scale})`,
                          opacity: opacity,
                          zIndex: Math.round(100 - absDiff),
                          width: cardWidth,
                          left: `calc(-1 * ${cardWidth} / 2)`,
                          top: `calc(-1 * ${cardHeightOffset} / 2 - 28px)`,
                          transition: isSnapping
                            ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease'
                            : 'none',
                        }}
                      >
                        <div
                          className={`relative w-full ${isProfile ? 'aspect-[28/40]' : item.aspect} transition-all duration-400 ease-out rounded-[3px] overflow-hidden`}
                          style={{
                            backgroundColor: isProfile ? '#292B25' : '#090A08',
                            borderColor: isProfile ? '#4A4C45' : (isCenter ? (isHovered ? 'rgba(232, 225, 210, 0.5)' : 'rgba(232, 225, 210, 0.25)') : 'rgba(255, 255, 255, 0.08)'),
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            transform: isHovered ? 'translateY(-10px)' : 'translateY(0px)',
                            boxShadow: isCenter
                              ? (isHovered
                                  ? '0 20px 40px -10px rgba(0, 0, 0, 0.75)'
                                  : '0 12px 30px -8px rgba(0, 0, 0, 0.65)')
                              : '0 8px 20px -5px rgba(0, 0, 0, 0.55)',
                          }}
                        >
                          {isProfile ? (
                            <div className="relative flex flex-col justify-between w-full h-full p-4 select-none">
                              <div className="flex items-center justify-between pb-2">
                                <span className="font-mono text-[9px] tracking-[0.22em] text-[#85867C] uppercase">
                                  01 / PROFILE
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#4AC7A5]" />
                              </div>

                              <div className="mx-auto my-1 w-[74%] aspect-[3/4] bg-[#22241F] border border-[#4A4C45] overflow-hidden rounded-[2px] shadow-sm">
                                <img
                                  src={item.image}
                                  alt="Dev Mistry"
                                  className="object-cover w-full h-full contrast-[1.05] brightness-95 grayscale-[35%] filter"
                                />
                              </div>

                              <div className="w-full h-px bg-[#4A4C45]/80 my-2" />

                              <div className="text-left">
                                <h3 className="font-display font-bold text-[19px] sm:text-[21px] text-[#E8E2D5] tracking-tight uppercase leading-none">
                                  DEV MISTRY
                                </h3>
                                <p className="font-mono text-[9px] text-[#85867C] tracking-[0.18em] uppercase mt-1">
                                  WEB / CLOUD / AGENTIC AI
                                </p>
                              </div>

                              <div className="pt-2 text-left">
                                <span className="group/link inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-[#E8E2D5] hover:text-white uppercase transition-colors">
                                  <span>ABOUT DEV</span>
                                  <span className="transition-transform group-hover/link:translate-x-1">→</span>
                                </span>
                              </div>
                            </div>
                          ) : (
                            <>
                              <img
                                src={item.image}
                                alt={item.title}
                                className={`w-full h-full object-cover transition-all duration-700 ease-out ${isCenter
                                    ? (isHovered ? 'grayscale-0 contrast-105 brightness-105' : 'grayscale contrast-125 brightness-95')
                                    : 'grayscale contrast-110 brightness-85'
                                  }`}
                              />

                              <div className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.2em] text-[#E8E1D2]/90 bg-[#10130F]/80 px-2.5 py-1 backdrop-blur-sm border border-white/10 uppercase">
                                {item.id} / {item.category}
                              </div>
                            </>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {!isProfile && (
                          <div className="z-10 mt-4 transition-transform duration-300">
                            <span
                              className={`font-display font-medium text-xs tracking-widest uppercase px-3.5 py-1.5 transition-all duration-300 border ${isCenter
                                  ? 'text-[#E8E1D2] bg-[#3B3F34] border-white/20 shadow-md'
                                  : 'text-[#C8C1B2]/70 bg-[#10130F]/90 border-white/5'
                                }`}
                            >
                              {item.badge}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {currentSectionIndex === 1 && (
            /* 02 ABOUT */
            <motion.div
              key="scene-about"
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full flex items-center justify-center"
            >
              <AboutSection />
            </motion.div>
          )}

          {currentSectionIndex === 2 && (
            /* 03 INTERNSHIP */
            <motion.div
              key="scene-internship"
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full flex items-center justify-center"
            >
              <InternshipSection />
            </motion.div>
          )}

          {currentSectionIndex === 3 && (
            /* 04 PROJECTS */
            <motion.div
              key="scene-projects"
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full flex items-center justify-center"
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

          {currentSectionIndex === 4 && (
            /* 05 SKILLS */
            <motion.div
              key="scene-skills"
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full flex items-center justify-center"
            >
              <SkillsSection />
            </motion.div>
          )}

          {currentSectionIndex === 5 && (
            /* 06 JOURNEY */
            <motion.div
              key="scene-journey"
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full flex items-center justify-center"
            >
              <JourneySection />
            </motion.div>
          )}

          {currentSectionIndex === 6 && (
            /* 07 GITHUB */
            <motion.div
              key="scene-github"
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full flex items-center justify-center"
            >
              <GithubSection />
            </motion.div>
          )}

          {currentSectionIndex === 7 && (
            /* 08 CONTACT */
            <motion.div
              key="scene-contact"
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full flex items-center justify-center"
            >
              <ContactSection onOpenMessage={() => setContactOpen(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ==================== GLOBAL FIXED FOOTER (Scroll Indicator & Section Tracker) ==================== */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between font-sans uppercase text-[#E8E1D2] pointer-events-none border-t border-white/[0.06] bg-[#10130F]/90 backdrop-blur-md">
        <div className="pointer-events-auto flex items-center gap-4">
          <span className="font-bold text-sm sm:text-base tracking-tight">PORTFOLIO / 2026</span>
          <span className="font-mono text-xs text-[#4AC7A5]">[{currentSection.num} / 08]</span>
        </div>

        {/* Small Editorial Horizontal Progress Bar: 01 ━━━ 02 ━━━ 03 ... ━━━ 08 */}
        <div className="hidden lg:flex items-center gap-3 font-mono text-[10px] tracking-widest text-[#85867C] pointer-events-auto">
          {SECTIONS.map((sec, idx) => (
            <div key={sec.id} className="flex items-center gap-3">
              <button
                onClick={() => setCurrentSectionIndex(idx)}
                className={`transition-colors ${
                  currentSectionIndex === idx ? 'text-[#E8E1D2] font-bold' : 'hover:text-[#E8E1D2]'
                }`}
              >
                {sec.num}
              </button>
              {idx < SECTIONS.length - 1 && (
                <span
                  className={`w-4 sm:w-7 h-px transition-colors ${
                    currentSectionIndex >= idx ? 'bg-[#4AC7A5]/80' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="pointer-events-auto flex items-center gap-4">
          <button
            onClick={() => setOpenInfo(true)}
            className="hover:text-white text-[#E8E1D2] font-bold text-[11px] tracking-tight cursor-pointer"
          >
            OPEN INFO
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: '1200px' }}
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
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#176D6C]/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#686B5C]/25 blur-3xl pointer-events-none" />

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

              <div className="relative z-10 grid items-start grid-cols-1 gap-6 md:grid-cols-12">
                <div className="space-y-5 md:col-span-7">
                  <div className="relative p-5 text-[#11140F] border-l-4 border-red-500 rounded-sm shadow-xl bg-lined-paper transform -rotate-1">
                    <div className="absolute w-24 h-5 opacity-90 border shadow-sm -top-3 left-10 bg-[#E8D9DD]/80 border-black/10 transform rotate-1" />
                    <h2 className="text-3xl font-black leading-none tracking-tight text-[#090A08] uppercase sm:text-4xl font-display">
                      DEV MISTRY
                    </h2>
                    <div className="mt-2 inline-block bg-[#11140F] text-[#FAFAF7] font-mono text-[11px] font-bold tracking-widest px-2.5 py-0.5 uppercase">
                      FULL-STACK ARCHITECT + AGENTIC AI
                    </div>
                  </div>

                  <div className="bg-[#EAE4D9] text-[#1E1E1E] p-4 shadow-lg border border-[#D5CEBF] transform rotate-1 rounded-sm relative">
                    <p className="font-sans text-xs font-medium leading-relaxed sm:text-sm">
                      Engineer & system designer crafting scalable distributed backbones, autonomous agentic workflows in Python & LangGraph, and minimal graphic-led digital platforms.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    <div className="bg-[#FEF08A] text-[#713F12] p-3 shadow-md transform -rotate-2 relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-600 mx-auto -mt-4 mb-1 shadow-sm" />
                      <span className="text-[9px] uppercase tracking-wider block text-[#854D0E] font-bold">CURRENT STATUS</span>
                      <p className="font-bold text-[11px] leading-tight mt-0.5">
                        Building Autonomous AI Swarms & Cloud Meshes
                      </p>
                    </div>

                    <div className="bg-[#FBCFE8] text-[#831843] p-3 shadow-md transform rotate-2 relative border border-dashed border-[#F472B6]">
                      <span className="text-[9px] uppercase tracking-wider block font-bold">RECOGNITION</span>
                      <p className="font-bold text-[11px] leading-tight mt-0.5">
                        1ST PLACE HACKATHON WINNER '25
                      </p>
                    </div>
                  </div>

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

                <div className="flex flex-col items-center md:col-span-5">
                  <div className="relative bg-white text-[#11140F] p-3.5 pb-5 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300 w-full max-w-[280px]">
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#C8C1B2]/60 backdrop-blur-sm border border-black/10 transform -rotate-1 shadow-sm" />
                    
                    <div className="relative mb-3 overflow-hidden border aspect-square bg-stone-900 border-stone-200">
                      <img
                        src="/img/dev_portrait.jpg"
                        alt="Dev Mistry Backdrop Blur"
                        className="absolute inset-0 object-cover w-full h-full scale-125 filter blur-md opacity-70"
                      />
                      <img
                        src="/img/dev_portrait.jpg"
                        alt="Dev Mistry Portrait"
                        className="relative z-10 object-contain w-full h-full contrast-105"
                      />
                    </div>

                    <div className="font-mono text-xs font-semibold tracking-wider text-center text-stone-700">
                      dev, deploying systems ✌
                    </div>

                    <div className="absolute -top-2 -right-3 bg-red-600 text-white font-mono text-[8px] font-bold px-2 py-0.5 transform rotate-12 shadow uppercase border border-red-400">
                      EST. 2026
                    </div>
                  </div>

                  <div className="w-full mt-6 space-y-2">
                    <button
                      onClick={() => {
                        setOpenInfo(false);
                        setCurrentSectionIndex(3); // Jump to Projects
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

              <div className="relative z-10 flex flex-col items-center justify-between gap-2 pt-4 mt-6 text-[11px] font-mono border-t border-white/10 sm:flex-row text-[#686B5C]">
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
