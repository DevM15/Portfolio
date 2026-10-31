import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * 12 Curated Exhibition Objects around the Shallow Camera Cylinder:
 * 
 * Each card strictly adheres to:
 * - 1 or 2 primary elements only (image + minimal label/button)
 * - Portrait aspect ratio (0.68 - 0.75) with reduced size: 190–225px × 270–320px
 * - Bends toward camera: center card has highest Z (+180px), edges wrap backward (-450px)
 * - Profile photo inside Card 01 (ABOUT DEV) occupying 70% of the card
 * - Pseudo-random deterministic button/label positions inside the card
 */
const EXHIBITION_ITEMS = [
  {
    id: 'about',
    sectionId: 'about',
    num: '01',
    label: '01 / PROFILE',
    btnText: 'ABOUT DEV →',
    btnPosition: 'bottom-right',
    image: '/img/dev_portrait.jpg',
    isProfile: true,
  },
  {
    id: 'internship',
    sectionId: 'internship',
    num: '02',
    label: '02 / EXPERIENCE',
    btnText: 'WORK →',
    btnPosition: 'top-left',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'skills',
    sectionId: 'skills',
    num: '03',
    label: '03 / ARCHITECTURE',
    btnText: 'STACK →',
    btnPosition: 'middle-right',
    image: './img/project1.png',
  },
  {
    id: 'journey',
    sectionId: 'journey',
    num: '04',
    label: '04 / TIMELINE',
    btnText: '2022 → 2026',
    btnPosition: 'bottom-left',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'github',
    sectionId: 'github',
    num: '05',
    label: '05 / CODE',
    btnText: 'GITHUB ↗',
    btnPosition: 'top-right',
    image: './img/project2.png',
  },
  {
    id: 'projects',
    sectionId: 'projects',
    num: '06',
    label: '06 / WORK',
    btnText: 'PROJECTS →',
    btnPosition: 'middle-left',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'web',
    sectionId: 'projects',
    num: '07',
    label: '07 / WEB',
    btnText: 'RUNTIME →',
    btnPosition: 'bottom-right',
    image: './img/project3.png',
  },
  {
    id: 'cloud',
    sectionId: 'skills',
    num: '08',
    label: '08 / CLOUD',
    btnText: 'AWS / ECS →',
    btnPosition: 'top-left',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ai',
    sectionId: 'skills',
    num: '09',
    label: '09 / AGENTIC',
    btnText: 'LANGGRAPH ↗',
    btnPosition: 'middle-right',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'lab',
    sectionId: 'github',
    num: '10',
    label: '10 / EXPERIMENTS',
    btnText: 'LAB →',
    btnPosition: 'bottom-left',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'systems',
    sectionId: 'skills',
    num: '11',
    label: '11 / SYSTEMS',
    btnText: 'DIAGRAM →',
    btnPosition: 'top-right',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'archive',
    sectionId: 'journey',
    num: '12',
    label: '12 / ARCHIVE',
    btnText: 'SPEC →',
    btnPosition: 'middle-left',
    image: './img/navjeevan.png',
  },
];

export default function HomeSection({ onOpenSection }) {
  // Rotational state around cylindrical 3D space
  const [rotationAngle, setRotationAngle] = useState(0);
  const rotationAngleRef = useRef(0);
  rotationAngleRef.current = rotationAngle;

  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [pointerOffset, setPointerOffset] = useState({ rx: 0, ry: 0, tx: 0, ty: 0 });

  // Camera center reticle tracking (smooth delayed follower, max 14px)
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
  const stepAngle = 360 / totalCards; // 30 degrees per card

  // Magnetic snap to nearest card
  const snapToNearest = useCallback(() => {
    clearTimeout(magnetTimeoutRef.current);
    magnetTimeoutRef.current = setTimeout(() => {
      if (isDraggingRef.current || Math.abs(velocityRef.current) > 0.05) return;
      const current = rotationAngleRef.current;
      const snapped = Math.round(current / stepAngle) * stepAngle;
      const diff = snapped - current;

      if (Math.abs(diff) > 0.08) {
        velocityRef.current += diff * 0.14;
      }
    }, 160);
  }, [stepAngle]);

  // Main physics loop: inertia, friction & momentum
  useEffect(() => {
    let active = true;

    const tick = (now) => {
      if (!active) return;
      lastTimeRef.current = now;

      if (!isDraggingRef.current) {
        // Natural exponential friction decay
        velocityRef.current *= 0.93;

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
      velocityRef.current -= delta * 0.018;
      snapToNearest();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [snapToNearest]);

  // Viewport mouse tracking for camera reticle
  const handleContainerMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setCameraReticle({
      x: nx * 14,
      y: ny * 12,
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
    setRotationAngle(dragStartAngleRef.current + diff * 0.14);
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
    setRotationAngle(dragStartAngleRef.current + diff * 0.2);
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
      rx: -normY * 4,
      ry: normX * 4.5,
      tx: normX * 7,
      ty: normY * 7,
    });
  };

  const handleCardMouseLeave = () => {
    setHoveredCardId(null);
    setPointerOffset({ rx: 0, ry: 0, tx: 0, ty: 0 });
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      velocityRef.current -= 3.5;
      snapToNearest();
    } else if (e.key === 'ArrowLeft') {
      velocityRef.current += 3.5;
      snapToNearest();
    }
  };

  // Helper for deterministic button positioning classes
  const getButtonPositionClass = (pos) => {
    switch (pos) {
      case 'top-left':
        return 'top-3 left-3';
      case 'top-right':
        return 'top-3 right-3';
      case 'middle-left':
        return 'top-1/2 -translate-y-1/2 left-2.5';
      case 'middle-right':
        return 'top-1/2 -translate-y-1/2 right-2.5';
      case 'bottom-left':
        return 'bottom-3 left-3';
      case 'bottom-right':
      default:
        return 'bottom-3 right-3';
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
      className="relative w-full h-full flex flex-col justify-center items-center select-none overflow-hidden cursor-grab active:cursor-grabbing outline-none"
    >
      {/* Main 3D Shallow Cylindrical Exhibition Stage (Viewport Camera Center = 50% 50%) */}
      <div
        className="relative w-full h-[580px] sm:h-[620px] md:h-[660px] flex items-center justify-center overflow-visible"
        style={{
          perspective: '1500px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* ==================== 1. FIXED STATIONARY CAMERA RETICLE ==================== */}
        {/* Subtle camera reticle anchored in the open center space */}
        <div
          className="absolute z-10 pointer-events-none transition-transform duration-300 ease-out flex items-center justify-center opacity-30"
          style={{
            transform: `translate(${cameraReticle.x}px, ${cameraReticle.y}px)`,
          }}
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border border-[#65E6D2]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#65E6D2]" />
            <div className="absolute top-0 w-px h-1.5 bg-[#65E6D2]" />
            <div className="absolute bottom-0 w-px h-1.5 bg-[#65E6D2]" />
            <div className="absolute left-0 h-px w-1.5 bg-[#65E6D2]" />
            <div className="absolute right-0 h-px w-1.5 bg-[#65E6D2]" />
          </div>
        </div>

        {/* ==================== 2. INFINITE SHALLOW CYLINDRICAL CURVED GALLERY ==================== */}
        {/* The cylinder bends TOWARD the camera: center cards have +Z, edge cards have -Z */}
        {EXHIBITION_ITEMS.map((item, index) => {
          const itemTheta = index * stepAngle;
          let diffAngle = (itemTheta + rotationAngle) % 360;
          if (diffAngle > 180) diffAngle -= 360;
          if (diffAngle < -180) diffAngle += 360;

          const absDiff = Math.abs(diffAngle);
          // Render only 5–7 cards in view (±85° arc), gracefully culling outer cards
          if (absDiff > 85) return null;

          // Shallow cylinder projection calculations:
          // X spreads horizontally across a gentle arc: ~680px radius
          const rad = (diffAngle * Math.PI) / 180;
          const translateX = Math.sin(rad) * 680;

          // Z bends TOWARD camera: center card has highest Z (+180px), edges recede down to -450px
          const translateZ = Math.cos(rad) * 480 - 300;

          // RotateY: center is 0°, inner cards ±12–20°, outer cards ±40–50°
          const rotateY = -diffAngle * 0.55;

          // Scale falloff: center card 1.08, neighbors 0.88, outer 0.70
          const scale = Math.max(0.68, 1.08 - (absDiff / 100) * 0.38);

          // Opacity falloff: center card 1.0, outer cards 0.45
          const opacity = Math.max(0.42, 1.0 - (absDiff / 85) * 0.58);

          const isCenter = absDiff < 16;
          const isHovered = hoveredCardId === item.id;

          // Liquid pointer hover transform offsets
          const hoverTx = isHovered ? pointerOffset.tx : 0;
          const hoverTy = isHovered ? pointerOffset.ty : 0;
          const hoverRx = isHovered ? pointerOffset.rx : 0;
          const hoverRy = isHovered ? pointerOffset.ry : 0;
          const hoverTz = isHovered ? 20 : 0;
          const hoverScale = isHovered ? 1.04 : 1;

          return (
            <div
              key={item.id}
              onClick={() => onOpenSection(item.sectionId)}
              onMouseMove={(e) => handleCardMouseMove(e, item.id)}
              onMouseLeave={handleCardMouseLeave}
              className="absolute z-20 w-[190px] sm:w-[210px] md:w-[225px] aspect-[0.71] flex flex-col justify-between cursor-pointer pointer-events-auto transition-opacity"
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
              {/* Image-First Physical Object: strictly 1–2 elements only */}
              <div
                className={`relative w-full h-full bg-[#0D1211] rounded-[2px] overflow-hidden transition-all duration-300 ${
                  isCenter || isHovered
                    ? 'border border-[#65E6D2] shadow-[0_20px_50px_rgba(0,0,0,0.95)]'
                    : 'border border-[rgba(241,239,232,0.14)] shadow-xl'
                }`}
              >
                {/* Visual Area (Occupies 70-85% for profile, 90%+ for others) */}
                <div className={`relative w-full h-full overflow-hidden ${item.isProfile ? 'p-3 flex flex-col justify-between' : ''}`}>
                  <img
                    src={item.image}
                    alt={item.label}
                    className={`w-full h-full object-cover transition-all duration-700 ease-out rounded-[1px] ${
                      isCenter || isHovered
                        ? 'grayscale-0 contrast-108 brightness-100 scale-105'
                        : 'grayscale contrast-125 brightness-80 scale-100'
                    }`}
                  />

                  {/* Micro Section Label */}
                  <div className="absolute top-2.5 left-2.5 font-mono text-[8px] tracking-[0.2em] text-[#F1EFE8] bg-[#050706]/85 px-2 py-0.5 backdrop-blur-sm border border-white/10 uppercase">
                    {item.label}
                  </div>

                  {/* Pseudo-Random Deterministic Action Button INSIDE Card */}
                  <div className={`absolute z-30 transition-all duration-300 pointer-events-auto ${getButtonPositionClass(item.btnPosition)}`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenSection(item.sectionId);
                      }}
                      className={`font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 rounded-[1px] border transition-all duration-300 flex items-center gap-1 shadow-md cursor-pointer ${
                        isCenter || isHovered
                          ? 'bg-[#65E6D2] text-[#050706] border-[#65E6D2] font-bold shadow-[0_0_12px_rgba(101,230,210,0.35)]'
                          : 'bg-[#050706]/80 text-[#F1EFE8] border-white/20 hover:border-[#65E6D2] hover:text-[#65E6D2]'
                      }`}
                    >
                      <span>{item.btnText}</span>
                    </button>
                  </div>

                  {/* Subtle surface reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
