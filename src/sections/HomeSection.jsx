import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * 6 Core Curated Exhibition Items with unique image-first visual identities
 */
const EXHIBITION_ITEMS = [
  {
    id: 'about',
    sectionId: 'about',
    num: '01',
    label: '01 / ABOUT',
    title: 'PROFILE',
    meta: 'FULL STACK DEVELOPER',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'internship',
    sectionId: 'internship',
    num: '02',
    label: '02 / INTERNSHIP',
    title: 'EXPERIENCE',
    meta: '2024 → PRESENT',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'skills',
    sectionId: 'skills',
    num: '03',
    label: '03 / SKILLS',
    title: 'SYSTEM MAP',
    meta: 'WEB / CLOUD / AI',
    image: './img/project1.png',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'journey',
    sectionId: 'journey',
    num: '04',
    label: '04 / JOURNEY',
    title: 'EVOLUTION',
    meta: '2022 → 2026',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'github',
    sectionId: 'github',
    num: '05',
    label: '05 / GITHUB',
    title: 'OPEN SOURCE',
    meta: 'CODE / BUILDS / RUNTIMES',
    image: './img/project2.png',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'projects',
    sectionId: 'projects',
    num: '06',
    label: '06 / PROJECTS',
    title: 'SELECTED WORK',
    meta: 'WEB / CLOUD / AI',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-[3/4]',
  },
];

export default function HomeSection({ onOpenSection }) {
  // Rotational state around cylindrical 3D space
  const [rotationAngle, setRotationAngle] = useState(0);
  const rotationAngleRef = useRef(0);
  rotationAngleRef.current = rotationAngle;

  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [pointerOffset, setPointerOffset] = useState({ rx: 0, ry: 0, tx: 0, ty: 0 });

  // Physics animation state
  const velocityRef = useRef(0);
  const animFrameRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartAngleRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const magnetTimeoutRef = useRef(null);

  const totalCards = EXHIBITION_ITEMS.length;
  const stepAngle = 360 / totalCards; // 60 degrees per card

  // Magnetic snap to nearest card
  const snapToNearest = useCallback(() => {
    clearTimeout(magnetTimeoutRef.current);
    magnetTimeoutRef.current = setTimeout(() => {
      if (isDraggingRef.current || Math.abs(velocityRef.current) > 0.05) return;
      const current = rotationAngleRef.current;
      const snapped = Math.round(current / stepAngle) * stepAngle;
      const diff = snapped - current;

      if (Math.abs(diff) > 0.1) {
        // Smoothly accelerate toward snap target
        velocityRef.current += diff * 0.12;
      }
    }, 180);
  }, [stepAngle]);

  // Main physics tick: inertia, friction & momentum
  useEffect(() => {
    let active = true;

    const tick = (now) => {
      if (!active) return;
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      if (!isDraggingRef.current) {
        // Apply friction
        velocityRef.current *= 0.92;

        if (Math.abs(velocityRef.current) > 0.005) {
          setRotationAngle((prev) => prev + velocityRef.current);
        } else if (Math.abs(velocityRef.current) !== 0) {
          velocityRef.current = 0;
          snapToNearest();
        }
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      clearTimeout(magnetTimeoutRef.current);
    };
  }, [snapToNearest]);

  // Mouse wheel listener: map vertical wheel to cylindrical gallery rotation
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      // Add rotational impulse with momentum
      velocityRef.current -= delta * 0.024;
      snapToNearest();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [snapToNearest]);

  // Drag interaction
  const handleMouseDown = (e) => {
    if (e.target.closest('button, a')) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartAngleRef.current = rotationAngle;
    velocityRef.current = 0;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const diff = e.clientX - dragStartXRef.current;
    setRotationAngle(dragStartAngleRef.current + diff * 0.16);
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    snapToNearest();
  };

  // Touch swipe support
  const touchStartXRef = useRef(0);
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    touchStartXRef.current = e.touches[0].clientX;
    dragStartAngleRef.current = rotationAngle;
    velocityRef.current = 0;
  };

  const handleTouchMove = (e) => {
    if (e.touches.length !== 1) return;
    const diff = e.touches[0].clientX - touchStartXRef.current;
    setRotationAngle(dragStartAngleRef.current + diff * 0.22);
  };

  const handleTouchEnd = () => {
    snapToNearest();
  };

  // Subtle fluid pointer tilt & displacement on hovered cards
  const handleCardMouseMove = (e, cardId) => {
    setHoveredCardId(cardId);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const normX = x / (rect.width / 2);
    const normY = y / (rect.height / 2);

    setPointerOffset({
      rx: -normY * 4, // rotateX follows pointer
      ry: normX * 5,  // rotateY follows pointer
      tx: normX * 8,  // translateX follows pointer
      ty: normY * 8,  // translateY follows pointer
    });
  };

  const handleCardMouseLeave = () => {
    setHoveredCardId(null);
    setPointerOffset({ rx: 0, ry: 0, tx: 0, ty: 0 });
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      velocityRef.current -= 4;
      snapToNearest();
    } else if (e.key === 'ArrowLeft') {
      velocityRef.current += 4;
      snapToNearest();
    }
  };

  // Calculate normalized index of the front-facing card for footer tracker
  const rawIndex = Math.round(-rotationAngle / stepAngle) % totalCards;
  const activeIndex = (rawIndex + totalCards) % totalCards;
  const activeItem = EXHIBITION_ITEMS[activeIndex];

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full flex flex-col justify-between py-6 md:py-8 px-6 md:px-14 select-none overflow-hidden cursor-grab active:cursor-grabbing outline-none"
    >
      {/* Top Exhibition Metadata */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-[#626A65] uppercase border-b border-[#2A302C] pb-3 z-30">
        <div className="flex items-center gap-3">
          <span className="text-[#65E6D2] font-bold">01 / EXHIBITION</span>
          <span className="text-white/10">•</span>
          <span className="text-[#9EA49F]">INFINITE 3D CYLINDRICAL GALLERY</span>
        </div>
        <div className="hidden sm:block text-[#65E6D2] font-bold">
          [FOCUS: {activeItem.num} // {activeItem.title}]
        </div>
      </div>

      {/* Main 3D Spatial Cylindrical Gallery Stage */}
      <div
        className="relative my-auto w-full h-[520px] sm:h-[580px] md:h-[620px] flex items-center justify-center overflow-visible"
        style={{
          perspective: '1400px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* ==================== 1. FIXED CENTER PHOTOGRAPH ANCHOR ==================== */}
        {/* Stable focal point that stays centered while gallery orbits around it */}
        <div
          className="absolute z-20 w-[240px] sm:w-[280px] md:w-[320px] aspect-[3/4] bg-[#0D1211] border border-[rgba(241,239,232,0.22)] hover:border-[#65E6D2] rounded-[2px] overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-500 hover:scale-[1.02] pointer-events-auto"
        >
          <img
            src="/img/dev_portrait.jpg"
            alt="Dev Mistry Portrait"
            className="w-full h-full object-cover contrast-[1.08] brightness-[0.95] grayscale-[20%] group-hover:grayscale-0 group-hover:contrast-110 group-hover:brightness-100 transition-all duration-700 ease-out"
          />

          <div className="absolute top-3 left-3 font-mono text-[8px] tracking-widest text-[#F1EFE8] bg-[#050706]/90 px-2 py-0.5 backdrop-blur-sm border border-[rgba(241,239,232,0.15)] uppercase">
            ANCHOR // DEV MISTRY
          </div>

          <div className="absolute bottom-3 right-3 font-mono text-[8px] tracking-widest text-[#65E6D2] bg-[#050706]/90 px-2 py-0.5 backdrop-blur-sm border border-[rgba(241,239,232,0.15)] uppercase">
            MUMBAI, IN
          </div>

          {/* Micro active coordinate pulse */}
          <div className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-[#65E6D2] animate-pulse" />
        </div>

        {/* ==================== 2. INFINITE 3D CYLINDRICAL ORBITING CARDS ==================== */}
        {/* Generates cards dynamically along the curved cylinder */}
        {EXHIBITION_ITEMS.map((item, index) => {
          // Angular position on the 360° circle
          const itemTheta = index * stepAngle;
          let diffAngle = (itemTheta + rotationAngle) % 360;
          if (diffAngle > 180) diffAngle -= 360;
          if (diffAngle < -180) diffAngle += 360;

          const absDiff = Math.abs(diffAngle);
          // Only render visible arc (±125°), culling cards behind the camera
          if (absDiff > 125) return null;

          // Normalized progress around current view (-1 to 1)
          const normAngle = diffAngle / 90;

          // Cylindrical positioning: radiusX ~ 580px, radiusZ ~ 280px
          const translateX = Math.sin((diffAngle * Math.PI) / 180) * 580;
          const translateZ = Math.cos((diffAngle * Math.PI) / 180) * 280 - 180;
          const rotateY = -diffAngle * 0.65; // Cards gradually angle toward center

          // Scale & Opacity falloff with distance
          const scale = Math.max(0.68, 1.0 - (absDiff / 180) * 0.42);
          const opacity = Math.max(0.35, 1.0 - (absDiff / 140) * 0.65);
          const isFront = absDiff < 25;
          const isHovered = hoveredCardId === item.id;

          // Liquid hover pointer transforms
          const hoverTx = isHovered ? pointerOffset.tx : 0;
          const hoverTy = isHovered ? pointerOffset.ty : 0;
          const hoverRx = isHovered ? pointerOffset.rx : 0;
          const hoverRy = isHovered ? pointerOffset.ry : 0;
          const hoverTz = isHovered ? 25 : 0;
          const hoverScale = isHovered ? 1.04 : 1;

          return (
            <div
              key={item.id}
              onClick={() => onOpenSection(item.sectionId)}
              onMouseMove={(e) => handleCardMouseMove(e, item.id)}
              onMouseLeave={handleCardMouseLeave}
              className="absolute z-10 w-[220px] sm:w-[250px] md:w-[275px] aspect-[3/4] flex flex-col justify-between cursor-pointer pointer-events-auto transition-opacity"
              style={{
                transformStyle: 'preserve-3d',
                transform: `
                  translateX(calc(-50% + ${translateX + hoverTx}px))
                  translateY(calc(-50% + ${hoverTy}px))
                  translateZ(${translateZ + hoverTz}px)
                  rotateY(${rotateY + hoverRy}deg)
                  rotateX(${hoverRx}deg)
                  scale(${scale * hoverScale})
                `,
                opacity: opacity,
                zIndex: Math.round(100 - absDiff),
                left: '50%',
                top: '50%',
                willChange: 'transform, opacity',
              }}
            >
              {/* 90%+ Image Area in Editorial Border */}
              <div
                className={`relative w-full h-[90%] bg-[#0D1211] rounded-[2px] overflow-hidden transition-all duration-300 ${
                  isFront || isHovered
                    ? 'border border-[#65E6D2] shadow-[0_20px_45px_rgba(0,0,0,0.9)]'
                    : 'border border-[rgba(241,239,232,0.14)] shadow-lg'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                    isFront || isHovered
                      ? 'grayscale-0 contrast-105 brightness-100 scale-105'
                      : 'grayscale contrast-125 brightness-85 scale-100'
                  }`}
                />

                {/* Micro Label Top Edge */}
                <div className="absolute top-2.5 left-2.5 font-mono text-[8px] tracking-[0.2em] text-[#F1EFE8] bg-[#050706]/85 px-2 py-0.5 backdrop-blur-sm border border-white/10 uppercase">
                  {item.label}
                </div>

                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
              </div>

              {/* Minimal Text Label Underneath */}
              <div className="pt-2 text-center">
                <span
                  className={`font-mono text-[9px] tracking-[0.22em] uppercase transition-colors ${
                    isFront || isHovered ? 'text-[#65E6D2] font-bold' : 'text-[#9EA49F]'
                  }`}
                >
                  {item.title} →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ==================== BOTTOM INTERACTIVE CONTROLS & CONTINUOUS ROTATION TRACKER ==================== */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-[#626A65] uppercase border-t border-[#2A302C] pt-3 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              velocityRef.current += 3.5;
              snapToNearest();
            }}
            className="hover:text-[#65E6D2] transition-colors cursor-pointer"
          >
            ← ROTATE PREV
          </button>
          <span>•</span>
          <button
            onClick={() => {
              velocityRef.current -= 3.5;
              snapToNearest();
            }}
            className="hover:text-[#65E6D2] transition-colors cursor-pointer"
          >
            ROTATE NEXT →
          </button>
        </div>

        {/* Circular Exhibition Nodes */}
        <div className="hidden md:flex items-center gap-3">
          {EXHIBITION_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                const targetAngle = -idx * stepAngle;
                setRotationAngle(targetAngle);
              }}
              className={`transition-colors cursor-pointer ${
                activeIndex === idx ? 'text-[#65E6D2] font-bold' : 'text-[#626A65] hover:text-[#F1EFE8]'
              }`}
            >
              {item.num}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span>SCROLL / DRAG ROTATION</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#65E6D2] animate-ping" />
        </div>
      </div>
    </div>
  );
}
