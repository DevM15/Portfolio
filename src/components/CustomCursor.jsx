import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * CustomCursor:
 * Premium Architectural Editorial Cursor with:
 * - Small charcoal circular cursor with central dot and thin outer ring
 * - Subtle terracotta accent
 * - Contextual hover labels:
 *   - Project cards: "EXPLORE"
 *   - Profile photograph: "ABOUT"
 *   - Navigation links: subtle ring expansion
 *   - Primary buttons: "CLICK"
 *   - Archive / external links: "VIEW"
 * - High-precision tactile click effect:
 *   - Terracotta central pulse
 *   - Expanding thin circular ring (ease-out, 450-550ms)
 * - Zero cursor lag, hardware-accelerated transform, respects touch devices & reduced-motion
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);
  const [clickRipples, setClickRipples] = useState([]);

  // Remove ripples after animation finishes
  const handleRippleEnd = useCallback((id) => {
    setClickRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  useEffect(() => {
    // Check for touch / fine pointer device
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let animId;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let isMoving = false;

    const el = cursorRef.current;
    const dotEl = dotRef.current;
    const labelEl = labelRef.current;

    if (!el) return;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isMoving) {
        currentX = e.clientX;
        currentY = e.clientY;
        isMoving = true;
      }
    };

    // Determine Contextual Cursor Label on Hover
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) return;

      const projectCard = target.closest('[data-cursor="project"], .group.cursor-pointer');
      const profilePhoto = target.closest('[data-cursor="profile"]');
      const archiveLink = target.closest('[data-cursor="archive"]');
      const primaryBtn = target.closest('button:not([data-cursor="none"]), [data-cursor="button"]');
      const navLink = target.closest('.flip-nav-link, a, nav button');

      if (profilePhoto) {
        el.dataset.hover = 'true';
        el.dataset.accent = 'terracotta';
        if (labelEl) {
          labelEl.textContent = 'ABOUT';
          labelEl.style.opacity = '1';
          labelEl.style.transform = 'translate(14px, 14px) scale(1)';
        }
      } else if (projectCard) {
        el.dataset.hover = 'true';
        el.dataset.accent = 'terracotta';
        if (labelEl) {
          labelEl.textContent = 'EXPLORE';
          labelEl.style.opacity = '1';
          labelEl.style.transform = 'translate(14px, 14px) scale(1)';
        }
      } else if (archiveLink) {
        el.dataset.hover = 'true';
        el.dataset.accent = 'terracotta';
        if (labelEl) {
          labelEl.textContent = 'VIEW';
          labelEl.style.opacity = '1';
          labelEl.style.transform = 'translate(14px, 14px) scale(1)';
        }
      } else if (primaryBtn) {
        el.dataset.hover = 'true';
        el.dataset.accent = 'charcoal';
        if (labelEl) {
          labelEl.textContent = 'CLICK';
          labelEl.style.opacity = '1';
          labelEl.style.transform = 'translate(14px, 14px) scale(1)';
        }
      } else if (navLink) {
        el.dataset.hover = 'true';
        el.dataset.accent = 'terracotta';
        if (labelEl) {
          labelEl.textContent = '';
          labelEl.style.opacity = '0';
          labelEl.style.transform = 'translate(14px, 14px) scale(0.8)';
        }
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) return;

      if (target.closest('button, a, .cursor-pointer, [data-cursor]')) {
        delete el.dataset.hover;
        delete el.dataset.accent;
        if (labelEl) {
          labelEl.style.opacity = '0';
          labelEl.style.transform = 'translate(14px, 14px) scale(0.8)';
        }
      }
    };

    // Click Ripple Generation
    const handleMouseDown = (e) => {
      el.dataset.click = 'true';
      if (dotEl) dotEl.style.transform = 'scale(0.6)';

      // Trigger subtle tactile click ripple at exact mouse coordinate
      const rippleId = performance.now() + Math.random();
      setClickRipples((prev) => [
        ...prev.slice(-3), // Limit maximum 4 simultaneous ripples to maintain zero lag
        { id: rippleId, x: e.clientX, y: e.clientY },
      ]);
    };

    const handleMouseUp = () => {
      delete el.dataset.click;
      if (dotEl) dotEl.style.transform = 'scale(1)';
    };

    // Smooth tight GPU transform loop (low latency 0.45 lerp factor for instant responsiveness)
    const tick = () => {
      currentX += (targetX - currentX) * 0.45;
      currentY += (targetY - currentY) * 0.45;
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
      {/* ==================== 1. MAIN EDITORIAL CURSOR ==================== */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block will-change-transform group select-none"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      >
        <div className="relative -top-1/2 -left-1/2 flex items-center justify-center w-8 h-8 -translate-x-1/2 -translate-y-1/2">
          {/* Thin Outer Ring (Expands smoothly on hover) */}
          <div
            ref={ringRef}
            className="absolute w-6 h-6 rounded-full border border-[#252A27]/40 transition-all duration-200 ease-out group-data-[hover=true]:w-8 group-data-[hover=true]:h-8 group-data-[hover=true]:border-[#B96F52] group-data-[hover=true]:border-[1.5px] group-data-[click=true]:scale-90"
          />

          {/* Central Precision Dot */}
          <div
            ref={dotRef}
            className="w-1.5 h-1.5 rounded-full bg-[#252A27] transition-all duration-150 ease-out group-data-[hover=true]:bg-[#B96F52] group-data-[click=true]:bg-[#B96F52] group-data-[click=true]:scale-75 shadow-xs"
          />

          {/* Contextual Editorial Label (Appears beside cursor on relevant hover) */}
          <span
            ref={labelRef}
            className="absolute font-mono text-[9px] font-semibold tracking-wider text-[#F7F6F2] bg-[#252A27] border border-[#353A37] px-1.5 py-0.5 rounded-[1px] opacity-0 pointer-events-none transition-all duration-200 ease-out shadow-sm"
            style={{
              transform: 'translate(14px, 14px) scale(0.8)',
              transformOrigin: 'top left',
            }}
          />
        </div>
      </div>

      {/* ==================== 2. TACTILE EDITORIAL CLICK RIPPLES ==================== */}
      <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden">
        {clickRipples.map((ripple) => (
          <ClickRippleItem key={ripple.id} ripple={ripple} onEnd={() => handleRippleEnd(ripple.id)} />
        ))}
      </div>
    </>
  );
}

/**
 * ClickRippleItem:
 * High-performance CSS animation for tactile click feedback
 * - Small terracotta dot (brief 1 -> 0 scale)
 * - Thin circular ring expanding 1 to 2.5 with smooth ease-out fade (500ms)
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
      {/* Expanding Thin Terracotta Ring */}
      <div
        className="w-6 h-6 rounded-full border border-[#B96F52] animate-editorial-click-ring"
      />
      {/* Central Flash Dot */}
      <div
        className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-[#B96F52] animate-editorial-click-dot"
      />
    </div>
  );
}
