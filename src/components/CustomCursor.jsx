import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, [data-interactive], input, textarea, .cursor-pointer')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('button, a, [data-interactive], input, textarea, .cursor-pointer')) {
        setIsHovering(false);
      }
    };

    // Click handler to trigger celebratory / rain burst particles
    const handleMouseDown = (e) => {
      setIsClicking(true);

      const colors = ['#E8E1D2', '#C8C1B2', '#686B5C', '#176D6C', '#E8D9DD', '#D4A373', '#FAEDCD'];
      const shapes = ['droplet', 'confetti', 'star'];
      const count = 18;
      const newParticles = [];

      for (let i = 0; i < count; i++) {
        particleIdRef.current += 1;
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = 40 + Math.random() * 90;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed - 20; // slight initial upward velocity
        const size = 3 + Math.random() * 5;
        const length = 8 + Math.random() * 12; // raindrop streak length
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const rotation = Math.random() * 360;

        newParticles.push({
          id: particleIdRef.current,
          x: e.clientX,
          y: e.clientY,
          vx,
          vy,
          size,
          length,
          color,
          shape,
          rotation,
          createdAt: Date.now(),
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Rain gravity animation loop
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      const now = Date.now();
      setParticles((prev) =>
        prev
          .filter((p) => now - p.createdAt < 950)
          .map((p) => ({
            ...p,
            x: p.x + p.vx * 0.08,
            y: p.y + p.vy * 0.08 + 4.5, // Rain downward gravity pull
            vy: p.vy + 2.5, // accelerating downward
            rotation: p.rotation + 4,
          }))
      );
    }, 16);

    return () => clearInterval(interval);
  }, [particles]);

  return (
    <>
      {/* Precision Custom SVG Cursor */}
      <div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: 'translate(-50%, -50%)',
          willChange: 'left, top',
        }}
      >
        <svg
          width={isHovering ? 46 : isClicking ? 32 : 36}
          height={isHovering ? 46 : isClicking ? 32 : 36}
          viewBox="0 0 40 40"
          className="transition-all duration-200 ease-out"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Rotating Crosshair Ring */}
          <circle
            cx="20"
            cy="20"
            r={isHovering ? 17 : 14}
            stroke={isClicking ? '#FAEDCD' : isHovering ? '#E8E1D2' : 'rgba(232, 225, 210, 0.45)'}
            strokeWidth={isHovering ? '1.5' : '1'}
            strokeDasharray={isHovering ? '4 2' : 'none'}
            className={isHovering ? 'animate-spin' : ''}
            style={{ animationDuration: '8s' }}
          />

          {/* Precision 4-Axis Reticle Ticks */}
          <line x1="20" y1="2" x2="20" y2="7" stroke="#E8E1D2" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="20" y1="33" x2="20" y2="38" stroke="#E8E1D2" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="2" y1="20" x2="7" y2="20" stroke="#E8E1D2" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="33" y1="20" x2="38" y2="20" stroke="#E8E1D2" strokeWidth="1.2" strokeLinecap="round" />

          {/* Central Target Reticle */}
          <circle
            cx="20"
            cy="20"
            r={isClicking ? 3.5 : isHovering ? 4 : 2.5}
            fill={isClicking ? '#FAEDCD' : '#E8E1D2'}
            className="transition-all duration-150"
          />

          {/* Satellite Orbit Dot */}
          <circle
            cx="32"
            cy="8"
            r="1.75"
            fill="#176D6C"
            stroke="rgba(232, 225, 210, 0.8)"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      {/* Pop Rain / Confetti Particles on Click */}
      {particles.map((p) => {
        const age = Date.now() - p.createdAt;
        const opacity = Math.max(0, 1 - age / 950);

        return (
          <div
            key={p.id}
            className="pointer-events-none fixed z-[9998]"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              opacity,
              transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
              transition: 'opacity 0.1s linear',
            }}
          >
            {p.shape === 'droplet' ? (
              // Rain Droplet Streak
              <div
                style={{
                  width: `${p.size * 0.7}px`,
                  height: `${p.length}px`,
                  backgroundColor: p.color,
                  borderRadius: '999px',
                  boxShadow: `0 0 6px ${p.color}`,
                }}
              />
            ) : p.shape === 'star' ? (
              // Sparkle Star
              <div
                style={{
                  width: `${p.size * 1.5}px`,
                  height: `${p.size * 1.5}px`,
                  backgroundColor: p.color,
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                }}
              />
            ) : (
              // Paper Confetti Scrap
              <div
                style={{
                  width: `${p.size * 1.4}px`,
                  height: `${p.size * 1.8}px`,
                  backgroundColor: p.color,
                  borderRadius: '1px',
                }}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
