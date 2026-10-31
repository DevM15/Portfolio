import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * 6 Curated Exhibition Cards with Asymmetrical Editorial Compositions
 * and Deterministic (Pseudo-Random) Button Placement:
 *
 * Card 01: ABOUT (Dev Portrait inside card, button top-left)
 * Card 02: INTERNSHIP (Workspace/Hardware image, button bottom-right)
 * Card 03: SKILLS (System Map Architecture, button middle-right)
 * Card 04: JOURNEY (Orbital Evolution Graphic, button bottom-left)
 * Card 05: GITHUB (Code/Repo Engine, button top-right)
 * Card 06: PROJECTS (Selected Work Screenshot, button middle-left)
 */
const EXHIBITION_ITEMS = [
  {
    id: 'about',
    sectionId: 'about',
    num: '01',
    label: '01 / PROFILE',
    title: 'ABOUT DEV',
    sub: 'DEV MISTRY',
    image: '/img/dev_portrait.jpg',
    btnText: 'ABOUT →',
    btnPosition: 'top-left',
    composition: 'image-center',
    cardOffsetY: -18,
  },
  {
    id: 'internship',
    sectionId: 'internship',
    num: '02',
    label: '02 / EXPERIENCE',
    title: 'INTERNSHIP',
    sub: 'HORIZON • AI LABS',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    btnText: '→ VIEW',
    btnPosition: 'bottom-right',
    composition: 'image-top',
    cardOffsetY: 24,
  },
  {
    id: 'skills',
    sectionId: 'skills',
    num: '03',
    label: '03 / ARCHITECTURE',
    title: 'STACK',
    sub: 'SYSTEM MAP',
    image: './img/project1.png',
    btnText: 'EXPLORE →',
    btnPosition: 'middle-right',
    composition: 'image-lower',
    cardOffsetY: -28,
  },
  {
    id: 'journey',
    sectionId: 'journey',
    num: '04',
    label: '04 / TIMELINE',
    title: '2022 → 2026',
    sub: 'EVOLUTION',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    btnText: 'JOURNEY →',
    btnPosition: 'bottom-left',
    composition: 'image-center',
    cardOffsetY: 20,
  },
  {
    id: 'github',
    sectionId: 'github',
    num: '05',
    label: '05 / CODE',
    title: 'GITHUB',
    sub: 'OPEN SOURCE',
    image: './img/project2.png',
    btnText: 'GITHUB ↗',
    btnPosition: 'top-right',
    composition: 'image-top',
    cardOffsetY: -12,
  },
  {
    id: 'projects',
    sectionId: 'projects',
    num: '06',
    label: '06 / EXHIBITION',
    title: 'SELECTED WORK',
    sub: 'PORTFOLIO',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    btnText: '→ VIEW ALL',
    btnPosition: 'middle-left',
    composition: 'image-lower',
    cardOffsetY: 15,
  },
];

export default function HomeSection({ onOpenSection }) {
  // Rotational state around cylindrical 3D space
  const [rotationAngle, setRotationAngle] = useState(0);
  const rotationAngleRef = useRef(0);
  rotationAngleRef.current = rotationAngle;

  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [pointerOffset, setPointerOffset] = useState({ rx: 0, ry: 0, tx: 0, ty: 0 });

  // Camera center reticle tracking (smooth delayed follower, max 16px)
  const [cameraReticle, setCameraReticle] = useState({ x: 0, y: 0 });

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
        velocityRef.current += diff * 0.12;
      }
    }, 180);
  }, [stepAngle]);

  // Main physics loop: inertia, friction & momentum
  useEffect(() => {
    let active = true;

    const tick = (now) => {
      if (!active) return;
      lastTimeRef.current = now;

      if (!isDraggingRef.current) {
        // Natural exponential friction decay
        velocityRef.current *= 0.925;

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
      velocityRef.current -= delta * 0.022;
      snapToNearest();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [snapToNearest]);

  // Viewport mouse tracking for camera reticle (max 18px movement)
  const handleContainerMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setCameraReticle({
      x: nx * 16,
      y: ny * 14,
    });
  };

  // Drag interaction
  const handleMouseDown = (e) => {
    if (e.target.closest('button, a')) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartAngleRef.current = rotationAngle;
    velocityRef.current = 0;
  };

  const handleMouseMove = (e) => {
    handleContainerMouseMove(e);
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

  // Fluid pointer tilt & liquid displacement on hovered cards
  const handleCardMouseMove = (e, cardId) => {
    setHoveredCardId(cardId);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const normX = x / (rect.width / 2);
    const normY = y / (rect.height / 2);

    setPointerOffset({
      rx: -normY * 4.5, // rotateX follows pointer
      ry: normX * 5.5,  // rotateY follows pointer
      tx: normX * 8,    // translateX follows pointer (max 8-10px)
      ty: normY * 8,    // translateY follows pointer (max 8-10px)
    });
  };

  const handleCardMouseLeave = () => {
    setHoveredCardId(null);
    setPointerOffset({ rx: 0, ry: 0, tx: 0, ty: 0 });
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      velocityRef.current -= 4.2;
      snapToNearest();
    } else if (e.key === 'ArrowLeft') {
      velocityRef.current += 4.2;
      snapToNearest();
    }
  };

  // Calculate normalized index of card currently closest to camera
  const rawIndex = Math.round(-rotationAngle / stepAngle) % totalCards;
  const activeIndex = (rawIndex + totalCards) % totalCards;
  const activeItem = EXHIBITION_ITEMS[activeIndex];

  // Helper for deterministic button positioning classes
  const getButtonPositionClass = (pos) => {
    switch (pos) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'middle-left':
        return 'top-1/2 -translate-y-1/2 left-3';
      case 'middle-right':
        return 'top-1/2 -translate-y-1/2 right-3';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
      default:
        return 'bottom-4 right-4';
    }
  };

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
          <span className="text-[#9EA49F]">CAMERA-CENTERED 3D CYLINDRICAL SPACE</span>
        </div>
        <div className="hidden sm:block text-[#65E6D2] font-bold">
          [CAMERA FOCUS: {activeItem.num} // {activeItem.title}]
        </div>
      </div>

      {/* Main 3D Cylindrical Exhibition Stage (Viewport Camera Center = 50% 50%) */}
      <div
        className="relative my-auto w-full h-[540px] sm:h-[600px] md:h-[640px] flex items-center justify-center overflow-visible"
        style={{
          perspective: '1600px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* ==================== INVISIBLE CAMERA CENTER / RETICLE ==================== */}
        {/* The center is intentional open space around which the cards orbit */}
        <div
          className="absolute z-10 pointer-events-none transition-transform duration-300 ease-out flex items-center justify-center"
          style={{
            transform: `translate(${cameraReticle.x}px, ${cameraReticle.y}px)`,
          }}
        >
          {/* Subtle Technical Camera Reticle: ⊙ with micro crosshairs */}
          <div className="relative w-10 h-10 flex items-center justify-center opacity-30">
            <div className="w-5 h-5 rounded-full border border-[#65E6D2]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#65E6D2]" />
            <div className="absolute top-0 w-px h-2 bg-[#65E6D2]" />
            <div className="absolute bottom-0 w-px h-2 bg-[#65E6D2]" />
            <div className="absolute left-0 h-px w-2 bg-[#65E6D2]" />
            <div className="absolute right-0 h-px w-2 bg-[#65E6D2]" />
          </div>
          <span className="absolute -bottom-4 font-mono text-[8px] tracking-[0.25em] text-[#626A65] uppercase">
            CAM // 01
          </span>
        </div>

        {/* ==================== INFINITE 3D CYLINDRICAL CARDS ORBITING THE CAMERA ==================== */}
        {EXHIBITION_ITEMS.map((item, index) => {
          // Angular position on the 360° cylindrical circle
          const itemTheta = index * stepAngle;
          let diffAngle = (itemTheta + rotationAngle) % 360;
          if (diffAngle > 180) diffAngle -= 360;
          if (diffAngle < -180) diffAngle += 360;

          const absDiff = Math.abs(diffAngle);
          // Only render visible arc (±125°), culling objects behind the viewpoint
          if (absDiff > 125) return null;

          // Cylindrical positioning: radiusX ~ 600px, radiusZ ~ 300px
          const translateX = Math.sin((diffAngle * Math.PI) / 180) * 600;
          const translateZ = Math.cos((diffAngle * Math.PI) / 180) * 300 - 150;
          const rotateY = -diffAngle * 0.62; // Cards angle toward camera

          // Scale & Opacity falloff with distance
          const scale = Math.max(0.7, 1.12 - (absDiff / 180) * 0.46);
          const opacity = Math.max(0.4, 1.0 - (absDiff / 140) * 0.65);
          const isCenter = absDiff < 22;
          const isHovered = hoveredCardId === item.id;

          // Liquid pointer hover transform offsets
          const hoverTx = isHovered ? pointerOffset.tx : 0;
          const hoverTy = isHovered ? pointerOffset.ty : 0;
          const hoverRx = isHovered ? pointerOffset.rx : 0;
          const hoverRy = isHovered ? pointerOffset.ry : 0;
          const hoverTz = isHovered ? 24 : 0;
          const hoverScale = isHovered ? 1.04 : 1;

          return (
            <div
              key={item.id}
              onClick={() => onOpenSection(item.sectionId)}
              onMouseMove={(e) => handleCardMouseMove(e, item.id)}
              onMouseLeave={handleCardMouseLeave}
              className="absolute z-20 w-[230px] sm:w-[260px] md:w-[280px] aspect-[3/4] flex flex-col justify-between cursor-pointer pointer-events-auto transition-opacity"
              style={{
                transformStyle: 'preserve-3d',
                transform: `
                  translateX(calc(-50% + ${translateX + hoverTx}px))
                  translateY(calc(-50% + ${item.cardOffsetY + hoverTy}px))
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
              {/* Image-First Physical Editorial Object Container */}
              <div
                className={`relative w-full h-full bg-[#0D1211] rounded-[2px] overflow-hidden transition-all duration-400 ${
                  isCenter || isHovered
                    ? 'border border-[#65E6D2] shadow-[0_25px_60px_rgba(0,0,0,0.92)]'
                    : 'border border-[rgba(241,239,232,0.15)] shadow-xl'
                }`}
              >
                {/* 1. Large Image Element (Occupies 92%+ of card) */}
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                      isCenter || isHovered
                        ? 'grayscale-0 contrast-108 brightness-100 scale-105'
                        : 'grayscale contrast-125 brightness-80 scale-100'
                    }`}
                  />

                  {/* Micro Section Label Top Edge */}
                  <div className="absolute top-3 left-3 font-mono text-[8px] tracking-[0.22em] text-[#F1EFE8] bg-[#050706]/85 px-2 py-0.5 backdrop-blur-sm border border-white/10 uppercase">
                    {item.label}
                  </div>

                  {/* Editorial Card Title & Micro Metadata Overlay */}
                  <div className="absolute bottom-3 left-3 pointer-events-none">
                    <h3
                      className={`font-display font-black text-lg tracking-tight uppercase leading-none transition-colors ${
                        isCenter || isHovered ? 'text-[#F1EFE8]' : 'text-[#9EA49F]'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <span className="font-mono text-[8px] text-[#626A65] uppercase block mt-1 tracking-wider">
                      {item.sub}
                    </span>
                  </div>

                  {/* 2. Pseudo-Random Deterministic Button Placement */}
                  <div
                    className={`absolute z-30 transition-all duration-300 pointer-events-auto ${getButtonPositionClass(
                      item.btnPosition
                    )}`}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenSection(item.sectionId);
                      }}
                      className={`font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-[2px] border transition-all duration-300 flex items-center gap-1.5 shadow-md cursor-pointer ${
                        isCenter || isHovered
                          ? 'bg-[#65E6D2] text-[#050706] border-[#65E6D2] font-bold shadow-[0_0_15px_rgba(101,230,210,0.3)]'
                          : 'bg-[#050706]/85 text-[#F1EFE8] border-white/20 hover:border-[#65E6D2] hover:text-[#65E6D2]'
                      }`}
                    >
                      <span>{item.btnText}</span>
                    </button>
                  </div>

                  {/* Subtle Sheen Highlight */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ==================== BOTTOM HORIZONTAL EXHIBITION CONTROLS ==================== */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-[#626A65] uppercase border-t border-[#2A302C] pt-3 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              velocityRef.current += 3.8;
              snapToNearest();
            }}
            className="hover:text-[#65E6D2] transition-colors cursor-pointer"
          >
            ← ORBIT PREV
          </button>
          <span>•</span>
          <button
            onClick={() => {
              velocityRef.current -= 3.8;
              snapToNearest();
            }}
            className="hover:text-[#65E6D2] transition-colors cursor-pointer"
          >
            ORBIT NEXT →
          </button>
        </div>

        {/* Orbit Node Selector Buttons */}
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
          <span>SCROLL WHEEL OR DRAG TO ORBIT</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#65E6D2] animate-ping" />
        </div>
      </div>
    </div>
  );
}
