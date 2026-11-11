import { useRef, useEffect } from 'react';

/**
 * 12 Curated Exhibition Objects arranged in a continuous, infinite 3D cylinder:
 *
 * Geometry & Convex Curve:
 * - Camera is fixed at center (0, 0, 0)
 * - Curve bends TOWARD the camera:
 *   angle = diffAngle (in radians)
 *   x = radiusX * sin(angle)
 *   z = cos(angle) * depthAmp - depthOffset (center has +150px, edges recede to -500px)
 *   rotateY = -angle (in degrees)
 * - High-performance direct DOM matrix interpolation (no setState per frame)
 * - Velocity + friction + lerp momentum physics
 * - Smooth liquid hover displacement (target lerp)
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
  const containerRef = useRef(null);
  const cardElementsRef = useRef([]);
  const cardImgRefs = useRef([]);
  const reticleRef = useRef(null);

  // Physics animation variables in refs (eliminates 60fps React re-renders)
  const physicsRef = useRef({
    currentRotation: 0,
    targetRotation: 0,
    velocity: 0,
    friction: 0.915,
    smoothing: 0.085,
    wheelSensitivity: 0.012,
    isDragging: false,
    dragStartX: 0,
    dragStartRotation: 0,
    touchStartX: 0,
    lastTouchX: 0,
    hoveredIndex: -1,
    targetPointerX: 0,
    targetPointerY: 0,
    currentPointerX: 0,
    currentPointerY: 0,
    cameraReticleX: 0,
    cameraReticleY: 0,
    targetReticleX: 0,
    targetReticleY: 0,
    cardStates: EXHIBITION_ITEMS.map(() => ({
      x: 0,
      y: 0,
      z: -600,
      rotY: 0,
      rotX: 0,
      scale: 0.7,
      opacity: 0,
      brightness: 0.6,
      imgScale: 1,
    })),
  });

  const totalCards = EXHIBITION_ITEMS.length;
  const stepAngle = 360 / totalCards; // 30° per card

  // Main 60fps RequestAnimationFrame Render Loop
  useEffect(() => {
    let animId;
    const p = physicsRef.current;

    // Linear interpolation helper
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const tick = () => {
      // 1. Velocity + Momentum Physics
      if (!p.isDragging) {
        p.velocity *= p.friction;
        p.targetRotation += p.velocity;
      }

      // Smooth rotation interpolation
      p.currentRotation = lerp(p.currentRotation, p.targetRotation, p.smoothing);

      // Smooth pointer & camera reticle interpolation
      p.currentPointerX = lerp(p.currentPointerX, p.targetPointerX, 0.08);
      p.currentPointerY = lerp(p.currentPointerY, p.targetPointerY, 0.08);
      p.cameraReticleX = lerp(p.cameraReticleX, p.targetReticleX, 0.08);
      p.cameraReticleY = lerp(p.cameraReticleY, p.targetReticleY, 0.08);

      // Update camera reticle DOM transform
      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${p.cameraReticleX}px, ${p.cameraReticleY}px, 0)`;
      }

      // 2. Calculate Every Card's 3D Cylindrical Geometry
      for (let i = 0; i < totalCards; i++) {
        const el = cardElementsRef.current[i];
        if (!el) continue;

        const cardTheta = i * stepAngle;
        let diffAngle = (cardTheta + p.currentRotation) % 360;
        if (diffAngle > 180) diffAngle -= 360;
        if (diffAngle < -180) diffAngle += 360;

        const absDiff = Math.abs(diffAngle);
        const cardState = p.cardStates[i];

        // Graceful culling: only display 5–7 cards on visible forward half (±85°)
        if (absDiff > 85) {
          cardState.opacity = lerp(cardState.opacity, 0, 0.15);
          if (cardState.opacity < 0.01) {
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
            continue;
          }
        }

        // ==================== CONVEX CYLINDER DEPTH PROFILE ====================
        // The curve bends TOWARD the camera:
        // Center card (0°) has +150px Z, inner cards have -80px, edges recede down to -500px
        const rad = (diffAngle * Math.PI) / 180;
        const targetX = Math.sin(rad) * 660; // radiusX
        const targetZ = Math.cos(rad) * 450 - 300; // Convex Z depth (+150px at center, -500px at edges)
        const targetRotY = -diffAngle * 0.58; // Cards wrap around camera

        // Continuous Normalized Distance Falloffs
        const normDist = Math.min(absDiff / 85, 1);
        const targetScale = lerp(1.08, 0.68, normDist);
        const targetOpacity = lerp(1.0, 0.45, normDist);
        const targetBrightness = lerp(1.0, 0.65, normDist);

        // Hover offset
        const isHovered = p.hoveredIndex === i;
        const hoverTz = isHovered ? 24 : 0;
        const hoverTx = isHovered ? p.currentPointerX * 8 : 0;
        const hoverTy = isHovered ? p.currentPointerY * 8 : 0;
        const hoverRotX = isHovered ? p.currentPointerY * -2.5 : 0;
        const hoverRotY = isHovered ? p.currentPointerX * 2.5 : 0;
        const hoverScaleFactor = isHovered ? 1.04 : 1.0;

        // Smooth Spring-like interpolation per card
        cardState.x = lerp(cardState.x, targetX + hoverTx, 0.08);
        cardState.y = lerp(cardState.y, hoverTy, 0.08);
        cardState.z = lerp(cardState.z, targetZ + hoverTz, 0.08);
        cardState.rotY = lerp(cardState.rotY, targetRotY + hoverRotY, 0.08);
        cardState.rotX = lerp(cardState.rotX, hoverRotX, 0.08);
        cardState.scale = lerp(cardState.scale, targetScale * hoverScaleFactor, 0.08);
        cardState.opacity = lerp(cardState.opacity, targetOpacity, 0.08);
        cardState.brightness = lerp(cardState.brightness, targetBrightness, 0.08);
        cardState.imgScale = lerp(cardState.imgScale, isHovered ? 1.03 : 1.0, 0.08);

        // Update card DOM transforms directly (GPU-friendly translate3d)
        el.style.transform = `
          translate3d(calc(-50% + ${cardState.x.toFixed(2)}px), calc(-50% + ${cardState.y.toFixed(2)}px), ${cardState.z.toFixed(2)}px)
          rotateY(${cardState.rotY.toFixed(2)}deg)
          rotateX(${cardState.rotX.toFixed(2)}deg)
          scale(${cardState.scale.toFixed(3)})
        `;
        el.style.opacity = cardState.opacity.toFixed(3);
        el.style.zIndex = Math.round(100 - absDiff);
        el.style.pointerEvents = cardState.opacity > 0.2 ? 'auto' : 'none';

        // Update liquid image scale
        const img = cardImgRefs.current[i];
        if (img) {
          img.style.filter = `contrast(1.1) brightness(${cardState.brightness.toFixed(2)})`;
          img.style.transform = `scale(${cardState.imgScale.toFixed(3)})`;
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [totalCards, stepAngle]);

  // Wheel listener: feeding smooth velocity
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const p = physicsRef.current;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      // Add velocity smoothly without instant position jumps
      p.velocity -= delta * p.wheelSensitivity;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Viewport Mouse Move for Camera Reticle
  const handleMouseMove = (e) => {
    const p = physicsRef.current;
    const halfW = window.innerWidth / 2;
    const halfH = window.innerHeight / 2;
    p.targetReticleX = ((e.clientX - halfW) / halfW) * 14;
    p.targetReticleY = ((e.clientY - halfH) / halfH) * 12;

    if (p.isDragging) {
      const diff = e.clientX - p.dragStartX;
      p.targetRotation = p.dragStartRotation + diff * 0.16;
    }
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('button, a')) return;
    const p = physicsRef.current;
    p.isDragging = true;
    p.dragStartX = e.clientX;
    p.dragStartRotation = p.targetRotation;
    p.velocity = 0;
  };

  const handleMouseUp = () => {
    physicsRef.current.isDragging = false;
  };

  // Touch Swipe Integration
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    const p = physicsRef.current;
    p.isDragging = true;
    p.touchStartX = e.touches[0].clientX;
    p.lastTouchX = e.touches[0].clientX;
    p.dragStartRotation = p.targetRotation;
    p.velocity = 0;
  };

  const handleTouchMove = (e) => {
    if (e.touches.length !== 1) return;
    const p = physicsRef.current;
    const currentX = e.touches[0].clientX;
    const diff = currentX - p.touchStartX;
    p.targetRotation = p.dragStartRotation + diff * 0.22;
    p.velocity = (currentX - p.lastTouchX) * 0.12;
    p.lastTouchX = currentX;
  };

  const handleTouchEnd = () => {
    physicsRef.current.isDragging = false;
  };

  // Smooth Liquid Pointer Hover Handler
  const handleCardMouseMove = (e, index) => {
    const p = physicsRef.current;
    p.hoveredIndex = index;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    p.targetPointerX = nx;
    p.targetPointerY = ny;
  };

  const handleCardMouseLeave = () => {
    const p = physicsRef.current;
    p.hoveredIndex = -1;
    p.targetPointerX = 0;
    p.targetPointerY = 0;
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
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full flex flex-col justify-center items-center select-none overflow-hidden cursor-grab active:cursor-grabbing outline-none"
    >
      {/* 3D Exhibition Stage: Perspective 1800px with Fixed Stationary Camera Center */}
      <div
        ref={containerRef}
        className="relative w-full h-[580px] sm:h-[620px] md:h-[660px] flex items-center justify-center overflow-visible"
        style={{
          perspective: '1800px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* ==================== 1. FIXED CAMERA RETICLE (VIEWPOINT = 0,0,0) ==================== */}
        <div
          ref={reticleRef}
          className="absolute z-10 pointer-events-none flex items-center justify-center opacity-30"
          style={{ willChange: 'transform' }}
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border border-[#B96F52]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#B96F52]" />
            <div className="absolute top-0 w-px h-1.5 bg-[#B96F52]" />
            <div className="absolute bottom-0 w-px h-1.5 bg-[#B96F52]" />
            <div className="absolute left-0 h-px w-1.5 bg-[#B96F52]" />
            <div className="absolute right-0 h-px w-1.5 bg-[#B96F52]" />
          </div>
        </div>

        {/* ==================== 2. CONVEX CYLINDRICAL CARDS (BENDING TOWARD CAMERA) ==================== */}
        {EXHIBITION_ITEMS.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (cardElementsRef.current[index] = el)}
            onClick={() => onOpenSection(item.sectionId)}
            onMouseMove={(e) => handleCardMouseMove(e, index)}
            onMouseLeave={handleCardMouseLeave}
            className="absolute z-20 w-[190px] sm:w-[210px] md:w-[225px] aspect-[0.71] flex flex-col justify-between cursor-pointer pointer-events-auto"
            style={{
              transformStyle: 'preserve-3d',
              left: '50%',
              top: '50%',
              willChange: 'transform, opacity',
            }}
          >
            {/* Image-First Editorial Card (1-2 elements strictly) */}
            <div className="relative w-full h-full bg-[#0D1211] rounded-[2px] overflow-hidden border border-[rgba(247,246,242,0.12)] hover:border-[#B96F52] shadow-[0_20px_50px_rgba(0,0,0,0.92)] transition-colors duration-300">
              {/* Visual Area */}
              <div className={`relative w-full h-full overflow-hidden ${item.isProfile ? 'p-3 flex flex-col justify-between' : ''}`}>
                <img
                  ref={(img) => (cardImgRefs.current[index] = img)}
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover rounded-[1px] transition-transform duration-300"
                />

                {/* Micro Section Label */}
                <div className="absolute top-2.5 left-2.5 font-mono text-[8px] tracking-wider text-[#F7F6F2] bg-[#050706]/85 px-2 py-0.5 backdrop-blur-sm border border-white/10 uppercase pointer-events-none">
                  {item.label}
                </div>

                {/* Deterministic Button Placement Inside Card */}
                <div className={`absolute z-30 pointer-events-auto ${getButtonPositionClass(item.btnPosition)}`}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenSection(item.sectionId);
                    }}
                    className="font-mono text-[8px] tracking-wider uppercase px-2.5 py-1 rounded-[1px] border border-white/20 bg-[#050706]/85 text-[#F7F6F2] hover:border-[#B96F52] hover:bg-[#B96F52] hover:text-[#F7F6F2] hover:font-semibold transition-all shadow-md cursor-pointer flex items-center gap-1"
                  >
                    <span>{item.btnText}</span>
                  </button>
                </div>

                {/* Subtle surface reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
