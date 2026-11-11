import { useEffect, useRef } from 'react';

/**
 * CustomCursor - High-Performance Direct DOM Cursor
 * - Zero React re-renders on mousemove (uses GPU translate3d via direct DOM ref)
 * - Zero setInterval loops
 * - Preserves the exact precision digital reticle aesthetic with Terracotta accents
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    let animId;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let isMoving = false;

    const el = cursorRef.current;
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

    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, [data-interactive], input, textarea, .cursor-pointer')) {
        el.dataset.hover = 'true';
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('button, a, [data-interactive], input, textarea, .cursor-pointer')) {
        delete el.dataset.hover;
      }
    };

    const handleMouseDown = () => {
      el.dataset.click = 'true';
    };

    const handleMouseUp = () => {
      delete el.dataset.click;
    };

    // Smooth 60/120fps GPU transform loop
    const tick = () => {
      currentX += (targetX - currentX) * 0.35;
      currentY += (targetY - currentY) * 0.35;
      el.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0) translate(-50%, -50%)`;
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
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block will-change-transform group"
      style={{
        transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
      }}
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 40 40"
        className="transition-all duration-200 ease-out group-data-[hover=true]:scale-125 group-data-[click=true]:scale-90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Rotating Crosshair Ring */}
        <circle
          cx="20"
          cy="20"
          r="14"
          stroke="rgba(120, 132, 119, 0.45)"
          strokeWidth="1"
          className="transition-colors group-data-[hover=true]:stroke-[#252A27] group-data-[hover=true]:stroke-[1.5] group-data-[click=true]:stroke-[#B96F52]"
        />

        {/* Precision 4-Axis Reticle Ticks */}
        <line x1="20" y1="2" x2="20" y2="7" stroke="#B96F52" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="20" y1="33" x2="20" y2="38" stroke="#B96F52" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="2" y1="20" x2="7" y2="20" stroke="#B96F52" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="33" y1="20" x2="38" y2="20" stroke="#B96F52" strokeWidth="1.2" strokeLinecap="round" />

        {/* Central Target Reticle */}
        <circle
          cx="20"
          cy="20"
          r="2.5"
          fill="#252A27"
          className="transition-all duration-150 group-data-[hover=true]:r-[3.5] group-data-[click=true]:fill-[#B96F52]"
        />

        {/* Satellite Orbit Dot */}
        <circle
          cx="32"
          cy="8"
          r="1.5"
          fill="#B96F52"
          stroke="rgba(37, 42, 39, 0.7)"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
}
