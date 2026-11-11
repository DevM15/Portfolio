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

    const handleMouseDown = (e) => {
      setIsClicking(true);
      const colors = ['#B96F52', '#788477', '#8E9C8D', '#F7F6F2', '#252A27'];
      const count = 14;
      const newParticles = [];

      for (let i = 0; i < count; i++) {
        particleIdRef.current += 1;
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const speed = 35 + Math.random() * 75;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed - 15;
        const size = 3 + Math.random() * 4;
        const color = colors[Math.floor(Math.random() * colors.length)];

        newParticles.push({
          id: particleIdRef.current,
          x: e.clientX,
          y: e.clientY,
          vx,
          vy,
          size,
          color,
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

  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      const now = Date.now();
      setParticles((prev) =>
        prev
          .filter((p) => now - p.createdAt < 750)
          .map((p) => ({
            ...p,
            x: p.x + p.vx * 0.08,
            y: p.y + p.vy * 0.08 + 3.5,
            vy: p.vy + 2.0,
          }))
      );
    }, 16);
    return () => clearInterval(interval);
  }, [particles]);

  return (
    <>
      {/* Precision Digital Reticle Cursor */}
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
          width={isHovering ? 44 : isClicking ? 28 : 34}
          height={isHovering ? 44 : isClicking ? 28 : 34}
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
            stroke={isClicking ? '#B96F52' : isHovering ? '#252A27' : 'rgba(120, 132, 119, 0.45)'}
            strokeWidth={isHovering ? '1.5' : '1'}
            strokeDasharray={isHovering ? '4 2' : 'none'}
            className={isHovering ? 'animate-spin' : ''}
            style={{ animationDuration: '8s' }}
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
            r={isClicking ? 3.5 : isHovering ? 4 : 2.5}
            fill={isClicking ? '#B96F52' : '#252A27'}
            className="transition-all duration-150"
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

      {/* Physics Confetti Particles on Click */}
      {particles.map((p) => {
        const age = Date.now() - p.createdAt;
        const opacity = Math.max(0, 1 - age / 750);
        return (
          <div
            key={p.id}
            className="pointer-events-none fixed z-[9998]"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              opacity,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              style={{
                width: `${p.size}px`,
                height: `${p.size * 1.5}px`,
                backgroundColor: p.color,
                borderRadius: '1px',
                boxShadow: `0 0 6px ${p.color}`,
              }}
            />
          </div>
        );
      })}
    </>
  );
}
