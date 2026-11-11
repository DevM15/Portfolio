import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DMIdentityCard from '../components/entrance/DMIdentityCard';

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

export default function HomeSection({
  onOpenSection,
  transitionPhase = 'COMPLETED',
  phaseIndex = 10,
  unfoldProgress = 1,
}) {
  const containerRef = useRef(null);
  const cardElementsRef = useRef([]);
  const cardImgRefs = useRef([]);
  const reticleRef = useRef(null);

  const transitionPropsRef = useRef({ transitionPhase, phaseIndex, unfoldProgress });
  useEffect(() => {
    transitionPropsRef.current = { transitionPhase, phaseIndex, unfoldProgress };
  }, [transitionPhase, phaseIndex, unfoldProgress]);

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
    reticleOpacity: phaseIndex >= 7 ? 0.3 : 0,
    reticleScale: phaseIndex >= 7 ? 1 : 0.4,
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

      const { phaseIndex: currPhase, unfoldProgress: currUnfold } = transitionPropsRef.current;

      // Update camera reticle DOM transform (animates scale & opacity at HERO_REVEAL)
      if (reticleRef.current) {
        const isReticleRevealed = currPhase >= 7;
        const targetReticleOpacity = isReticleRevealed ? 0.3 : 0;
        const targetReticleScale = isReticleRevealed ? 1 : 0.4;
        p.reticleOpacity = lerp(p.reticleOpacity || 0, targetReticleOpacity, 0.08);
        p.reticleScale = lerp(p.reticleScale || 0.4, targetReticleScale, 0.08);

        reticleRef.current.style.transform = `translate3d(${p.cameraReticleX}px, ${p.cameraReticleY}px, 0) scale(${p.reticleScale.toFixed(3)})`;
        reticleRef.current.style.opacity = p.reticleOpacity.toFixed(3);
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

        // ==================== CONVEX CYLINDER DEPTH PROFILE ====================
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

        // Specific Transition Choreography per Card Type
        if (i === 0) {
          // Card 0: Profile Card (Central DM Flip Card shared transition)
          if (currPhase < 6) {
            // Stay centered in 2D plane during INTRO, GREETING_EXIT, CARD_FORMATION, CARD_FLIP
            const isLifted = currPhase >= 3 && currPhase < 6;
            cardState.x = 0;
            cardState.y = 0;
            cardState.z = isLifted ? 30 : 0;
            cardState.rotY = 0;
            cardState.rotX = 0;
            cardState.scale = isLifted ? 1.03 : 1.0;
            cardState.opacity = 1.0;
          } else if (currPhase === 6) {
            // PROFILE_TRANSITION: Card smoothly moves into 3D cylinder depth (+150px Z, 1.08 scale)
            cardState.x = lerp(cardState.x, targetX, 0.08);
            cardState.y = lerp(cardState.y, hoverTy, 0.08);
            cardState.z = lerp(cardState.z, targetZ, 0.08);
            cardState.rotY = lerp(cardState.rotY, targetRotY, 0.08);
            cardState.scale = lerp(cardState.scale, targetScale, 0.08);
            cardState.opacity = 1.0;
          } else {
            // currPhase >= 7: fully in interactive cylinder physics
            cardState.x = lerp(cardState.x, targetX + hoverTx, 0.08);
            cardState.y = lerp(cardState.y, hoverTy, 0.08);
            cardState.z = lerp(cardState.z, targetZ + hoverTz, 0.08);
            cardState.rotY = lerp(cardState.rotY, targetRotY + hoverRotY, 0.08);
            cardState.rotX = lerp(cardState.rotX, hoverRotX, 0.08);
            cardState.scale = lerp(cardState.scale, targetScale * hoverScaleFactor, 0.08);
            cardState.opacity = lerp(cardState.opacity, targetOpacity, 0.08);
          }
        } else {
          // Cards 1..11: Project Gallery Cards
          if (currPhase < 8) {
            // Completely hidden before PROJECT_REVEAL
            cardState.x = 0;
            cardState.y = 0;
            cardState.z = -300;
            cardState.rotY = 0;
            cardState.rotX = 0;
            cardState.scale = 0.5;
            cardState.opacity = 0;
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
            continue;
          } else if (currPhase < 10) {
            // PROJECT_REVEAL: Symmetrical fan-out along cylindrical arc
            const k = Math.min(i, 12 - i); // Distance from center (1..6)
            const t_card = Math.max(0, Math.min(1, (currUnfold - (k - 1) * 0.10) / 0.40));
            const easeOut = 1 - Math.pow(1 - t_card, 3);

            cardState.x = lerp(0, targetX, easeOut);
            cardState.y = lerp(0, hoverTy, easeOut);
            cardState.z = lerp(-250, targetZ, easeOut);
            cardState.rotY = lerp(0, targetRotY, easeOut);
            cardState.rotX = lerp(0, hoverRotX, easeOut);
            cardState.scale = lerp(0.55, targetScale, easeOut);
            cardState.opacity = lerp(0, targetOpacity, easeOut);

            const img = cardImgRefs.current[i];
            if (img) {
              img.style.clipPath = easeOut < 0.98 ? `inset(0% ${((1 - easeOut) * 50).toFixed(1)}% 0% ${((1 - easeOut) * 50).toFixed(1)}%)` : 'none';
            }
          } else {
            // COMPLETED: normal interactive physics
            if (absDiff > 85) {
              cardState.opacity = lerp(cardState.opacity, 0, 0.15);
              if (cardState.opacity < 0.01) {
                el.style.opacity = '0';
                el.style.pointerEvents = 'none';
                continue;
              }
            }

            cardState.x = lerp(cardState.x, targetX + hoverTx, 0.08);
            cardState.y = lerp(cardState.y, hoverTy, 0.08);
            cardState.z = lerp(cardState.z, targetZ + hoverTz, 0.08);
            cardState.rotY = lerp(cardState.rotY, targetRotY + hoverRotY, 0.08);
            cardState.rotX = lerp(cardState.rotX, hoverRotX, 0.08);
            cardState.scale = lerp(cardState.scale, targetScale * hoverScaleFactor, 0.08);
            cardState.opacity = lerp(cardState.opacity, targetOpacity, 0.08);

            const img = cardImgRefs.current[i];
            if (img && img.style.clipPath !== 'none') {
              img.style.clipPath = 'none';
            }
          }
        }

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
        el.style.pointerEvents = (currPhase >= 10 && cardState.opacity > 0.2) ? 'auto' : (i === 0 && currPhase >= 10 ? 'auto' : 'none');

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
      if (transitionPropsRef.current.phaseIndex < 10) return;
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

    if (p.isDragging && transitionPropsRef.current.phaseIndex >= 10) {
      const diff = e.clientX - p.dragStartX;
      p.targetRotation = p.dragStartRotation + diff * 0.16;
    }
  };

  const handleMouseDown = (e) => {
    if (transitionPropsRef.current.phaseIndex < 10) return;
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
    if (transitionPropsRef.current.phaseIndex < 10) return;
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
      className={`relative w-full h-full flex flex-col justify-center items-center select-none overflow-hidden outline-none ${
        phaseIndex >= 10 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
      }`}
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
          className="absolute z-10 pointer-events-none flex items-center justify-center"
          style={{ willChange: 'transform, opacity', opacity: 0 }}
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
        {EXHIBITION_ITEMS.map((item, index) => {
          const isProfile = item.isProfile;

          return (
            <div
              key={item.id}
              ref={(el) => (cardElementsRef.current[index] = el)}
              onClick={() => {
                if (phaseIndex >= 10) onOpenSection(item.sectionId);
              }}
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
              {isProfile ? (
                /* Card 0: Profile Card (Central DM Flip Card shared transition) */
                <DMIdentityCard
                  flipDeg={phaseIndex >= 3 ? 180 : 0}
                  isFramed={phaseIndex >= 2}
                  isLifted={phaseIndex >= 3 && phaseIndex < 6}
                  onOpenSection={phaseIndex >= 10 ? onOpenSection : null}
                />
              ) : (
                /* Cards 1..11: Image-First Editorial Card (Light Editorial Theme) */
                <div className="relative w-full h-full bg-[#FFFFFF] rounded-[2px] overflow-hidden border border-[#DED9CE] hover:border-[#B96F52] shadow-[0_12px_32px_rgba(37,42,39,0.08)] hover:shadow-[0_20px_45px_rgba(185,111,82,0.16)] transition-all duration-300">
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      ref={(img) => (cardImgRefs.current[index] = img)}
                      src={item.image}
                      alt={item.label}
                      className="w-full h-full object-cover transition-transform duration-300"
                    />

                    {/* Micro Section Label */}
                    <div className="absolute top-2.5 left-2.5 font-mono text-[8px] tracking-wider text-[#252A27] bg-[#F7F6F2]/90 px-2 py-0.5 backdrop-blur-sm border border-[#DED9CE] uppercase pointer-events-none rounded-[1px]">
                      {item.label}
                    </div>

                    {/* Deterministic Button Placement Inside Card */}
                    <div className={`absolute z-30 pointer-events-auto ${getButtonPositionClass(item.btnPosition)}`}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (phaseIndex >= 10) onOpenSection(item.sectionId);
                        }}
                        className="font-mono text-[8px] tracking-wider uppercase px-2.5 py-1 rounded-[1px] border border-[#DED9CE] bg-[#F7F6F2]/90 text-[#252A27] hover:border-[#B96F52] hover:bg-[#B96F52] hover:text-[#F7F6F2] hover:font-semibold transition-all shadow-sm cursor-pointer flex items-center gap-1"
                      >
                        <span>{item.btnText}</span>
                      </button>
                    </div>

                    {/* Subtle surface reflection overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent pointer-events-none" />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Initial Entrance Greeting: Hello, I'm Dev */}
        <AnimatePresence>
          {phaseIndex < 2 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{
                opacity: phaseIndex === 0 ? 1 : 0,
                y: phaseIndex === 0 ? 0 : -16,
              }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[calc(50%+165px)] sm:top-[calc(50%+180px)] md:top-[calc(50%+195px)] left-0 right-0 flex flex-col items-center justify-center pointer-events-none text-center px-4 z-30"
            >
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{
                  opacity: phaseIndex === 0 ? 1 : 0,
                  y: phaseIndex === 0 ? 0 : -18,
                }}
                transition={{
                  duration: 1.2,
                  delay: phaseIndex === 0 ? 2.6 : 0,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-[#252A27] tracking-tight whitespace-normal sm:whitespace-nowrap leading-[1.05] select-none"
              >
                HELLO, I'M DEV<span className="text-[#B96F52]">.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{
                  opacity: phaseIndex === 0 ? 1 : 0,
                  y: phaseIndex === 0 ? 0 : -14,
                }}
                transition={{
                  duration: 0.95,
                  delay: phaseIndex === 0 ? 2.95 : 0,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-2.5 sm:mt-3 text-xs sm:text-sm font-sans font-medium text-[#788477] tracking-normal select-none"
              >
                DESIGNING & BUILDING DIGITAL EXPERIENCES.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
