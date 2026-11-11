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
export default function SpatialCanvasBackground({ sectionIndex = 0, isRevealed = true }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animFrameRef = useRef(null);
  const sectionShiftRef = useRef(0);
  const revealProgressRef = useRef(isRevealed ? 1 : 0);
  const isRevealedRef = useRef(isRevealed);

  useEffect(() => {
    isRevealedRef.current = isRevealed;
  }, [isRevealed]);

  // Generate fixed procedural particles with edge density gradient (clear center safe area)
  const particles = useMemo(() => {
    const list = [];
    const count = 28; // Optimized from 90 to 28 for zero-lag rendering
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
        size: Math.random() < 0.1 ? 1.8 : 0.9,
        opacity: Math.random() * 0.2 + 0.08,
        speed: Math.random() * 0.0002 + 0.00008,
        isAccent: i === 0 || i === 7, // Restrained terracotta markers
        layer: (i % 3) + 1,
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
    let isTabVisible = !document.hidden;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = (time) => {
      if (!isTabVisible) {
        animFrameRef.current = null;
        return;
      }

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

      // Smooth background reveal transition
      const targetReveal = isRevealedRef.current ? 1 : 0;
      revealProgressRef.current += (targetReveal - revealProgressRef.current) * 0.04;
      const revealProgress = revealProgressRef.current;

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

      if (revealProgress < 0.005) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      // 2. Light Architectural Grid Lines (Batched stroke)
      ctx.save();
      ctx.strokeStyle = `rgba(222, 217, 206, ${(0.45 * revealProgress).toFixed(3)})`;
      ctx.lineWidth = 0.75;
      const gridSpacing = 120;
      ctx.beginPath();
      for (let x = gridSpacing; x < width; x += gridSpacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = gridSpacing; y < height; y += gridSpacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
      ctx.restore();

      // 3. Bottom-Left Curved Terrain Mesh (Precomputed 6x8 vertices, single stroke)
      ctx.save();
      ctx.globalAlpha = revealProgress;
      const meshParallaxX = mx * 10 + secShift * 0.35;
      const meshParallaxY = my * 6;
      ctx.translate(meshParallaxX, meshParallaxY);

      const rows = 6;
      const cols = 8;
      const cellW = width * 0.055;
      const cellH = height * 0.06;
      const meshOriginX = -width * 0.04;
      const meshOriginY = height * 0.65;

      ctx.strokeStyle = 'rgba(120, 132, 119, 0.12)';
      ctx.lineWidth = 0.85;

      const pts = [];
      for (let r = 0; r <= rows; r++) {
        pts[r] = [];
        const sinR = Math.sin(r * 0.4 + elapsed * 0.2) * 8;
        for (let c = 0; c <= cols; c++) {
          const px = meshOriginX + c * cellW + sinR;
          const py =
            meshOriginY +
            r * cellH +
            Math.cos(c * 0.35 + elapsed * 0.25) * 10 +
            Math.sin(c * 0.2 + r * 0.3) * 6;
          pts[r][c] = { x: px, y: py };
        }
      }

      ctx.beginPath();
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const p = pts[r][c];
          if (c === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
      }
      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          const p = pts[r][c];
          if (r === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
      }
      ctx.stroke();
      ctx.restore();

      // 4. Top-Right Secondary Curved Wireframe Mesh (4 concentric ellipses)
      ctx.save();
      ctx.globalAlpha = revealProgress;
      const trMeshX = width * 0.84 + mx * 6;
      const trMeshY = -height * 0.02 + my * 5;
      ctx.strokeStyle = 'rgba(120, 132, 119, 0.09)';
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const radiusX = Math.max(1, width * 0.14 - i * 14);
        const radiusY = Math.max(1, height * 0.10 - i * 10);
        ctx.ellipse(
          trMeshX + i * 12,
          trMeshY + i * 14,
          radiusX,
          radiusY,
          Math.PI / 4 + Math.sin(elapsed * 0.1) * 0.04,
          0,
          Math.PI * 2
        );
      }
      ctx.stroke();
      ctx.restore();

      // 5. Subtle Architectural Crosshairs & Coordinates
      ctx.save();
      ctx.globalAlpha = revealProgress;
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

      // 6. Sparse Architectural Dust Particles (Batched)
      ctx.save();
      ctx.fillStyle = `rgba(120, 132, 119, ${(0.15 * revealProgress).toFixed(3)})`;
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.isAccent) continue;
        const parallaxFactor = p.layer === 1 ? 4 : p.layer === 2 ? 8 : 12;
        const drift = Math.sin(elapsed * 0.3 + i) * 4;
        const px = p.baseX * width + mx * parallaxFactor + drift;
        const py = p.baseY * height + my * (parallaxFactor * 0.6) + (elapsed * p.speed * height) % height;
        ctx.moveTo(px + p.size, py);
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
      }
      ctx.fill();

      // Accent particles (Terracotta)
      ctx.fillStyle = `rgba(185, 111, 82, ${(0.55 * revealProgress).toFixed(3)})`;
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p.isAccent) continue;
        const parallaxFactor = 8;
        const drift = Math.sin(elapsed * 0.3 + i) * 4;
        const px = p.baseX * width + mx * parallaxFactor + drift;
        const py = p.baseY * height + my * 4.8 + (elapsed * p.speed * height) % height;
        ctx.moveTo(px + 1.8, py);
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
      }
      ctx.fill();
      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
