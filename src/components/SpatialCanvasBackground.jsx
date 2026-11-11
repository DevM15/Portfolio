import { useEffect, useRef, useMemo } from 'react';

/**
 * SpatialCanvasBackground - Light Editorial Architectural Theme
 * Art-directed for Warm Ivory (#F7F6F2):
 * - Primary Background: #F7F6F2 (Warm Ivory)
 * - Very subtle warm-grey grid lines (#DED9CE / #ECE8DE)
 * - Low-opacity architectural wireframe meshes in Muted Sage (#788477)
 * - Sparse delicate terracotta (#B96F52) coordinates & micro-accents
 * - Gentle mouse parallax (max 12px)
 * - No glowing neon or heavy black gradients
 */
export default function SpatialCanvasBackground({ sectionIndex = 0 }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animFrameRef = useRef(null);
  const sectionShiftRef = useRef(0);

  // Generate fixed procedural particles with edge density gradient (clear center safe area)
  const particles = useMemo(() => {
    const list = [];
    const count = 90;
    for (let i = 0; i < count; i++) {
      let x = Math.random();
      let y = Math.random();

      // Keep center hero area relatively clear
      if (x > 0.30 && x < 0.70 && y > 0.28 && y < 0.72) {
        if (Math.random() > 0.15) {
          x = Math.random() < 0.5 ? Math.random() * 0.28 : 0.72 + Math.random() * 0.28;
          y = Math.random() < 0.5 ? Math.random() * 0.26 : 0.74 + Math.random() * 0.26;
        }
      }

      list.push({
        baseX: x,
        baseY: y,
        size: Math.random() < 0.1 ? Math.random() * 1.6 + 1.0 : Math.random() * 0.8 + 0.4,
        opacity: Math.random() * 0.22 + 0.08,
        speed: Math.random() * 0.00025 + 0.00008,
        driftAngle: Math.random() * Math.PI * 2,
        isAccent: Math.random() < 0.05, // Occasional subtle terracotta marker
        layer: Math.random() < 0.4 ? 1 : (Math.random() < 0.75 ? 2 : 3),
      });
    }
    return list;
  }, []);

  // Track mouse with smooth dampening for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseRef.current.targetX = (e.clientX - halfW) / halfW;
      mouseRef.current.targetY = (e.clientY - halfH) / halfH;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let startTime = performance.now();

    const render = (time) => {
      const elapsed = (time - startTime) * 0.001; // seconds

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Section horizontal drift
      const targetShift = (sectionIndex % 8) * -20;
      sectionShiftRef.current += (targetShift - sectionShiftRef.current) * 0.05;
      const secShift = sectionShiftRef.current;

      ctx.clearRect(0, 0, width, height);

      // 1. Warm Ivory Base Background
      ctx.fillStyle = '#F7F6F2';
      ctx.fillRect(0, 0, width, height);

      // Subtle off-white atmospheric depth
      const grad = ctx.createRadialGradient(
        width * 0.5 + mx * 10,
        height * 0.5 + my * 8,
        width * 0.1,
        width * 0.5,
        height * 0.5,
        width * 0.75
      );
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
      grad.addColorStop(0.6, 'rgba(247, 246, 242, 0.4)');
      grad.addColorStop(1, 'rgba(239, 236, 230, 0.85)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Light Architectural Grid Lines
      ctx.save();
      ctx.strokeStyle = 'rgba(222, 217, 206, 0.45)';
      ctx.lineWidth = 0.75;
      const gridSpacing = 120;
      for (let x = gridSpacing; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = gridSpacing; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // 3. Bottom-Left Curved Terrain Mesh in Muted Warm Grey / Sage
      ctx.save();
      const meshParallaxX = mx * 10 + secShift * 0.35;
      const meshParallaxY = my * 6;
      ctx.translate(meshParallaxX, meshParallaxY);

      const rows = 10;
      const cols = 14;
      const cellW = width * 0.038;
      const cellH = height * 0.042;
      const meshOriginX = -width * 0.05;
      const meshOriginY = height * 0.62;

      ctx.strokeStyle = 'rgba(120, 132, 119, 0.12)';
      ctx.lineWidth = 0.85;

      for (let r = 0; r <= rows; r++) {
        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const px = meshOriginX + c * cellW + Math.sin(r * 0.4 + elapsed * 0.2) * 8;
          const py =
            meshOriginY +
            r * cellH +
            Math.cos(c * 0.35 + elapsed * 0.25) * 10 +
            Math.sin(c * 0.2 + r * 0.3) * 6;
          if (c === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      for (let c = 0; c <= cols; c++) {
        ctx.beginPath();
        for (let r = 0; r <= rows; r++) {
          const px = meshOriginX + c * cellW + Math.sin(r * 0.4 + elapsed * 0.2) * 8;
          const py =
            meshOriginY +
            r * cellH +
            Math.cos(c * 0.35 + elapsed * 0.25) * 10 +
            Math.sin(c * 0.2 + r * 0.3) * 6;
          if (r === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      ctx.restore();

      // 4. Top-Right Secondary Curved Wireframe Mesh
      ctx.save();
      const trMeshX = width * 0.84 + mx * 6;
      const trMeshY = -height * 0.02 + my * 5;
      ctx.strokeStyle = 'rgba(120, 132, 119, 0.09)';
      ctx.lineWidth = 0.75;
      for (let i = 0; i < 7; i++) {
        const radiusX = Math.max(1, width * 0.14 - i * 9);
        const radiusY = Math.max(1, height * 0.10 - i * 6);
        ctx.beginPath();
        ctx.ellipse(
          trMeshX + i * 12,
          trMeshY + i * 14,
          radiusX,
          radiusY,
          Math.PI / 4 + Math.sin(elapsed * 0.1) * 0.04,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }
      ctx.restore();

      // 5. Subtle Architectural Crosshairs & Coordinates
      ctx.save();
      ctx.font = '9px "IBM Plex Mono", monospace';
      ctx.fillStyle = 'rgba(120, 132, 119, 0.45)';

      const chX = width * 0.06 + mx * 6;
      const chY = height * 0.24 + my * 5;
      ctx.strokeStyle = 'rgba(120, 132, 119, 0.3)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(chX - 5, chY);
      ctx.lineTo(chX + 5, chY);
      ctx.moveTo(chX, chY - 5);
      ctx.lineTo(chX, chY + 5);
      ctx.stroke();
      ctx.fillText('ARCH / 01', chX + 9, chY + 3);

      const crX = width * 0.88 + mx * 8;
      const crY = height * 0.76 + my * 6;
      ctx.fillText('LAT 19.076° N', crX, crY);

      // Restrained Terracotta marker dot
      ctx.fillStyle = '#B96F52';
      ctx.beginPath();
      ctx.arc(crX - 7, crY - 3, 1.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 6. Sparse Architectural Dust Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const parallaxFactor = p.layer === 1 ? 4 : p.layer === 2 ? 8 : 12;
        const drift = Math.sin(elapsed * 0.3 + i) * 4;

        const px = p.baseX * width + mx * parallaxFactor + drift;
        const py = p.baseY * height + my * (parallaxFactor * 0.6) + (elapsed * p.speed * height) % height;

        ctx.fillStyle = p.isAccent
          ? 'rgba(185, 111, 82, 0.6)'
          : `rgba(120, 132, 119, ${p.opacity * 0.9})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [particles, sectionIndex]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
      style={{ willChange: 'transform' }}
    />
  );
}
