import { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from '../utils/ThemeContext';

/**
 * CustomCursor:
 * Redesigned Architectural & Editorial Precision Cursor System
 *
 * 1. Visual Composition:
 *    - Outer cursor: Thin outlined circular precision ring (28px - 34px) with smooth spring-like easing.
 *      - Charcoal border (#252A27) in light mode.
 *      - Warm off-white border (#F2F0E9) in dark mode.
 *    - Inner indicator: Small solid terracotta dot (#B96F52 in light, #C98265 in dark) centered on pointer.
 *
 * 2. Contextual Interactive Hover States:
 *    - Buttons & primary CTA: Expands into rounded rectangular pill with "CLICK" label.
 *    - Project cards / works: Expands with "EXPLORE" label.
 *    - Navigation links: Slightly enlarged circular ring with prominent terracotta inner dot.
 *    - Draggable elements: Displays "DRAG" label.
 *    - Images / portraits: Subtle circular magnification indicator.
 *    - Vinyl records: "PLAY" / "ROTATE".
 *    - Normal areas: Returns to minimal circular cursor (30px diameter).
 *
 * 3. Tactile Click Animation:
 *    - Cursor circle compresses briefly.
 *    - Small terracotta dot expands outward.
 *    - Thin circular ripple spreads from click position and fades smoothly.
 *    - Fast recovery to idle state.
 *
 * 4. Micro-interactions:
 *    - Subtle magnetic attraction to nearest button/nav link when within 32px range.
 *    - Full CSS transform hardware acceleration.
 *    - Zero layout shifts, pointer-events: none everywhere.
 *    - Clean touch device detection & prefers-reduced-motion compatibility.
 */
export default function CustomCursor() {
  const { isDark } = useTheme();
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);
  const [clickRipples, setClickRipples] = useState([]);

  // Clean up ripples after animation duration (520ms)
  const handleRippleEnd = useCallback((id) => {
    setClickRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  useEffect(() => {
    // If running on touch / coarse pointer, or user prefers reduced motion, disable custom cursor
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    let animId;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let isMoving = false;

    // Magnetic target tracking
    let magnetTarget = null;
    let magnetStrength = 0.28;

    const el = cursorRef.current;
    const ringEl = ringRef.current;
    const dotEl = dotRef.current;
    const labelEl = labelRef.current;

    if (!el) return;

    const handleMouseMove = (e) => {
      let mouseX = e.clientX;
      let mouseY = e.clientY;

      // Magnetic attraction if hovering near an interactive button
      if (magnetTarget) {
        const rect = magnetTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(mouseX - centerX, mouseY - centerY);

        // Within attraction threshold
        if (dist < 48) {
          mouseX += (centerX - mouseX) * magnetStrength;
          mouseY += (centerY - mouseY) * magnetStrength;
        }
      }

      targetX = mouseX;
      targetY = mouseY;

      if (!isMoving) {
        currentX = mouseX;
        currentY = mouseY;
        isMoving = true;
      }
    };

    // Determine Contextual Cursor Shape and Label on Hover
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) return;

      const recordItem = target.closest('[data-cursor="record"]');
      const dragItem = target.closest('[data-cursor="drag"], [draggable="true"], .draggable');
      const imageItem = target.closest('img, [data-cursor="image"]');
      const projectCard = target.closest('[data-cursor="project"], .group.cursor-pointer');
      const primaryBtn = target.closest('button:not([data-cursor="none"]), [data-cursor="button"]');
      const navLink = target.closest('.flip-nav-link, a, nav button, [role="button"]');

      if (primaryBtn) {
        magnetTarget = primaryBtn;
      } else if (navLink) {
        magnetTarget = navLink;
      } else {
        magnetTarget = null;
      }

      if (recordItem) {
        el.dataset.state = 'record';
        if (labelEl) {
          labelEl.textContent = 'PLAY';
          labelEl.style.opacity = '1';
        }
      } else if (dragItem) {
        el.dataset.state = 'drag';
        if (labelEl) {
          labelEl.textContent = 'DRAG';
          labelEl.style.opacity = '1';
        }
      } else if (imageItem && !projectCard) {
        el.dataset.state = 'image';
        if (labelEl) {
          labelEl.textContent = 'ZOOM';
          labelEl.style.opacity = '1';
        }
      } else if (projectCard) {
        el.dataset.state = 'project';
        if (labelEl) {
          labelEl.textContent = 'EXPLORE';
          labelEl.style.opacity = '1';
        }
      } else if (primaryBtn) {
        el.dataset.state = 'button';
        if (labelEl) {
          labelEl.textContent = 'CLICK';
          labelEl.style.opacity = '1';
        }
      } else if (navLink) {
        el.dataset.state = 'nav';
        if (labelEl) {
          labelEl.textContent = '';
          labelEl.style.opacity = '0';
        }
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) return;

      if (target.closest('button, a, img, .cursor-pointer, [data-cursor], [draggable]')) {
        delete el.dataset.state;
        magnetTarget = null;
        if (labelEl) {
          labelEl.style.opacity = '0';
        }
      }
    };

    // Click Interaction Handling
    const handleMouseDown = (e) => {
      el.dataset.click = 'true';
      if (dotEl) dotEl.style.transform = 'scale(0.55)';
      if (ringEl) ringEl.style.transform = 'scale(0.82)';

      const rippleId = performance.now() + Math.random();
      setClickRipples((prev) => [
        ...prev.slice(-3), // Limit maximum 4 simultaneous ripples
        { id: rippleId, x: e.clientX, y: e.clientY },
      ]);
    };

    const handleMouseUp = () => {
      delete el.dataset.click;
      if (dotEl) dotEl.style.transform = '';
      if (ringEl) ringEl.style.transform = '';
    };

    // Smooth tight GPU transform loop (28-34px circle with delicate easing)
    const tick = () => {
      // Damped smooth interpolation
      currentX += (targetX - currentX) * 0.42;
      currentY += (targetY - currentY) * 0.42;
      el.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;
      animId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* ==================== 1. ARCHITECTURAL DUAL-ELEMENT CURSOR ==================== */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block will-change-transform select-none"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      >
        <div className="relative -top-1/2 -left-1/2 flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
          {/* Outer Cursor:
              - 30px standard diameter circle
              - Border: Charcoal (#252A27) in light, warm off-white (#F2F0E9) in dark
              - In button state: expands into rounded rectangle
              - In project state: expands into larger 48px circle
              - In nav state: expands to 38px circle with terracotta border
          */}
          <div
            ref={ringRef}
            className="absolute rounded-full border border-[var(--cursor-ring)] transition-all duration-200 ease-out flex items-center justify-center
              w-[30px] h-[30px]
              [div[data-state=button]_&]:w-[58px] [div[data-state=button]_&]:h-[26px] [div[data-state=button]_&]:rounded-[13px] [div[data-state=button]_&]:border-[var(--accent)]
              [div[data-state=project]_&]:w-[48px] [div[data-state=project]_&]:h-[48px] [div[data-state=project]_&]:border-[var(--accent)]
              [div[data-state=record]_&]:w-[44px] [div[data-state=record]_&]:h-[44px] [div[data-state=record]_&]:border-[var(--accent)]
              [div[data-state=drag]_&]:w-[46px] [div[data-state=drag]_&]:h-[26px] [div[data-state=drag]_&]:rounded-[13px] [div[data-state=drag]_&]:border-[var(--accent)]
              [div[data-state=image]_&]:w-[38px] [div[data-state=image]_&]:h-[38px] [div[data-state=image]_&]:border-[var(--accent)]
              [div[data-state=nav]_&]:w-[38px] [div[data-state=nav]_&]:h-[38px] [div[data-state=nav]_&]:border-[var(--accent)]"
            style={{
              backdropFilter: 'none',
            }}
          />

          {/* Inner Indicator:
              - Small solid terracotta dot (4.5px) centered on mouse pointer
              - Smooth and responsive movement
          */}
          <div
            ref={dotRef}
            className="w-[4.5px] h-[4.5px] rounded-full bg-[var(--cursor-dot)] transition-all duration-150 ease-out shadow-xs pointer-events-none
              [div[data-state=nav]_&]:scale-125 [div[data-state=nav]_&]:bg-[var(--accent)]"
          />

          {/* Contextual Editorial Label */}
          <span
            ref={labelRef}
            className="absolute font-mono text-[8px] font-bold tracking-widest text-[var(--accent)] uppercase opacity-0 pointer-events-none transition-opacity duration-150 ease-out select-none"
            style={{
              transform: 'translateY(0px)',
            }}
          />
        </div>
      </div>

      {/* ==================== 2. TACTILE EDITORIAL CLICK RIPPLE LAYER ==================== */}
      <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden">
        {clickRipples.map((ripple) => (
          <ClickRippleItem
            key={ripple.id}
            ripple={ripple}
            onEnd={() => handleRippleEnd(ripple.id)}
            isDark={isDark}
          />
        ))}
      </div>
    </>
  );
}

/**
 * ClickRippleItem:
 * Distinctive Architectural Click Feedback
 * 1. Small terracotta dot flashes & expands outward.
 * 2. Thin circular ripple spreads from the click coordinate.
 * 3. Ripple fades smoothly via CSS transforms and opacity.
 */
function ClickRippleItem({ ripple, onEnd }) {
  useEffect(() => {
    const timer = setTimeout(onEnd, 520);
    return () => clearTimeout(timer);
  }, [onEnd]);

  return (
    <div
      className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 select-none"
      style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
    >
      {/* Thin Circular Spreading Ripple */}
      <div
        className="w-8 h-8 rounded-full border border-[var(--cursor-ripple)] animate-editorial-click-ring pointer-events-none"
      />
      {/* Expanding Small Terracotta Dot */}
      <div
        className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-[var(--cursor-dot)] animate-editorial-click-dot pointer-events-none"
      />
    </div>
  );
}
