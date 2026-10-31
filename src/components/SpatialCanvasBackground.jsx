import { useEffect, useRef, useMemo } from 'react';

/**
 * SpatialCanvasBackground
 * Procedural deep-space background inspired by the reference image:
 * - Deep graphite/black space (#050706)
 * - Scattered spatial star/dust particles with edge-density gradient (empty center)
 * - Flowing wireframe terrain mesh in bottom-left corner
 * - Secondary curved wireframe mesh in top-right
 * - Asymmetrical floating geometric objects (icosahedron, cube, sphere, cone, crystal)
 * - Subtle orbital rings, technical crosshairs, and coordinate markings
 * - 3D depth layers with gentle mouse parallax (1x to 5x, max 18px)
 * - Slow floating/oscillation (8-18s) and section-responsive shifts
 */
export default function SpatialCanvasBackground({ sectionIndex = 0 }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animFrameRef = useRef(null);
  const sectionShiftRef = useRef(0);

  // Generate fixed procedural particles with edge density gradient (clear center safe area)
  const particles = useMemo(() => {
    const list = [];
    const count = 130;
    for (let i = 0; i < count; i++) {
      // Create radial bias toward perimeter, avoiding center (0.35 - 0.65)
      let x = Math.random();
      let y = Math.random();
      
      // If particle falls directly in hero center area (30%-70% x, 30%-70% y), push it outward
      if (x > 0.30 && x < 0.70 && y > 0.28 && y < 0.72) {
        if (Math.random() > 0.18) {
          x = Math.random() < 0.5 ? Math.random() * 0.28 : 0.72 + Math.random() * 0.28;
          y = Math.random() < 0.5 ? Math.random() * 0.26 : 0.74 + Math.random() * 0.26;
        }
      }

      list.push({
        baseX: x,
        baseY: y,
        size: Math.random() < 0.12 ? Math.random() * 1.8 + 1.2 : Math.random() * 0.9 + 0.5,
        opacity: Math.random() * 0.26 + 0.08,
        speed: Math.random() * 0.0003 + 0.0001,
        driftAngle: Math.random() * Math.PI * 2,
        isAccent: Math.random() < 0.04, // Single occasional cyan particle
        layer: Math.random() < 0.35 ? 1 : (Math.random() < 0.75 ? 2 : 3),
      });
    }
    return list;
  }, []);

  // Track mouse with smooth dampening for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseRef.current.targetX = (e.clientX - halfW) / halfW; // -1 to 1
      mouseRef.current.targetY = (e.clientY - halfH) / halfH; // -1 to 1
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

      // Smooth section shift lerp
      const targetShift = (sectionIndex % 8) * -22;
      sectionShiftRef.current += (targetShift - sectionShiftRef.current) * 0.05;
      const secShift = sectionShiftRef.current;

      ctx.clearRect(0, 0, width, height);

      // 1. Deep Graphite Space Base
      ctx.fillStyle = '#050706';
      ctx.fillRect(0, 0, width, height);

      // Subtle atmospheric radial depth (very low opacity, calm center)
      const grad = ctx.createRadialGradient(
        width * 0.35 + mx * 10,
        height * 0.45 + my * 8,
        width * 0.08,
        width * 0.5,
        height * 0.5,
        width * 0.8
      );
      grad.addColorStop(0, 'rgba(11, 16, 15, 0.45)');
      grad.addColorStop(0.5, 'rgba(8, 11, 10, 0.25)');
      grad.addColorStop(1, 'rgba(4, 6, 5, 0.95)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Bottom-Left Large Organic Wireframe Terrain Mesh (25-30% visible, extending outside)
      ctx.save();
      const meshParallaxX = mx * 12 + secShift * 0.4;
      const meshParallaxY = my * 8;
      ctx.translate(meshParallaxX, meshParallaxY);

      const rows = 12;
      const cols = 15;
      const cellW = width * 0.038;
      const cellH = height * 0.042;
      const meshOriginX = -width * 0.06;
      const meshOriginY = height * 0.58;

      ctx.strokeStyle = 'rgba(150, 170, 165, 0.075)';
      ctx.lineWidth = 1;

      // Draw perspective/curved terrain grid lines
      for (let r = 0; r <= rows; r++) {
        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const px = meshOriginX + c * cellW + Math.sin(r * 0.4 + elapsed * 0.2) * 10;
          const py =
            meshOriginY +
            r * cellH +
            Math.cos(c * 0.35 + elapsed * 0.25) * 14 +
            Math.sin(c * 0.2 + r * 0.3) * 8;
          if (c === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      for (let c = 0; c <= cols; c++) {
        ctx.beginPath();
        for (let r = 0; r <= rows; r++) {
          const px = meshOriginX + c * cellW + Math.sin(r * 0.4 + elapsed * 0.2) * 10;
          const py =
            meshOriginY +
            r * cellH +
            Math.cos(c * 0.35 + elapsed * 0.25) * 14 +
            Math.sin(c * 0.2 + r * 0.3) * 8;
          if (r === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      ctx.restore();

      // 3. Top-Right Secondary Curved Wireframe Mesh / Surface
      ctx.save();
      const trMeshX = width * 0.82 + mx * 8;
      const trMeshY = -height * 0.04 + my * 6;
      ctx.strokeStyle = 'rgba(150, 170, 165, 0.05)';
      ctx.lineWidth = 0.8;
      for (let i = 0; i < 9; i++) {
        const radiusX = Math.max(1, width * 0.16 - i * 8);
        const radiusY = Math.max(1, height * 0.12 - i * 5);
        ctx.beginPath();
        ctx.ellipse(
          trMeshX + i * 14,
          trMeshY + i * 16,
          radiusX,
          radiusY,
          Math.PI / 4 + Math.sin(elapsed * 0.1) * 0.05,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }
      ctx.restore();

      // 4. Subtle Orbital Lines (almost invisible, non-neon)
      ctx.save();
      ctx.strokeStyle = 'rgba(101, 230, 210, 0.07)';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([3, 8]);
      ctx.beginPath();
      // Orbit 1: Upper-left around cone
      ctx.ellipse(width * 0.12 + mx * 10, height * 0.14 + my * 8, 48, 22, -0.4, 0, Math.PI * 2);
      ctx.stroke();

      // Orbit 2: Upper-right near wireframe sphere
      ctx.strokeStyle = 'rgba(180, 190, 185, 0.06)';
      ctx.beginPath();
      ctx.ellipse(width * 0.74 + mx * 14, height * 0.13 + my * 10, 80, 42, 0.35, 0, Math.PI * 2);
      ctx.stroke();

      // Orbit 3: Far-right near cube
      ctx.beginPath();
      ctx.ellipse(width * 0.92 + mx * 15, height * 0.28 + my * 12, 34, 18, 0.8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // 5. Asymmetrical Floating Geometric Wireframe Objects
      // --- Object A: Wireframe Cone / Triangular Prism (Top-Left) ---
      ctx.save();
      {
        const floatY = Math.sin(elapsed * 0.5) * 8;
        const cx = width * 0.12 + mx * 16;
        const cy = height * 0.14 + my * 12 + floatY;
        const rot = -0.38 + Math.sin(elapsed * 0.3) * 0.04;
        ctx.translate(cx, cy);
        ctx.rotate(rot);

        // Subtle gradient body fill
        ctx.fillStyle = 'rgba(241, 239, 232, 0.04)';
        ctx.beginPath();
        ctx.moveTo(0, -42);
        ctx.lineTo(-24, 28);
        ctx.lineTo(24, 28);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = 'rgba(241, 239, 232, 0.28)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -42);
        ctx.lineTo(-24, 28);
        ctx.lineTo(24, 28);
        ctx.closePath();
        ctx.stroke();

        // Shaded side segment
        ctx.beginPath();
        ctx.moveTo(0, -42);
        ctx.lineTo(4, 28);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(180, 190, 185, 0.15)';
        ctx.beginPath();
        ctx.ellipse(0, 28, 24, 8, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // --- Object B: Geodesic Wireframe Sphere (Top-Right) ---
      ctx.save();
      {
        const floatY = Math.cos(elapsed * 0.45) * 10;
        const cx = width * 0.74 + mx * 18;
        const cy = height * 0.13 + my * 14 + floatY;
        const radius = 42;
        const rot = elapsed * 0.08;
        ctx.translate(cx, cy);
        ctx.rotate(rot);

        ctx.strokeStyle = 'rgba(241, 239, 232, 0.32)';
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Longitudinal & latitudinal geodesic wire chords
        ctx.strokeStyle = 'rgba(180, 190, 185, 0.16)';
        for (let a = 0; a < 6; a++) {
          const ang = (a * Math.PI) / 3;
          const rx = Math.max(0.5, Math.abs(radius * Math.cos(ang)));
          ctx.beginPath();
          ctx.ellipse(0, 0, rx, radius, ang, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Cross triangular facets
        const pts = [
          [-22, -18],
          [0, -38],
          [24, -16],
          [34, 12],
          [12, 34],
          [-16, 32],
          [-32, 8],
        ];
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let p = 1; p < pts.length; p++) {
          ctx.lineTo(pts[p][0], pts[p][1]);
        }
        ctx.closePath();
        ctx.stroke();
      }
      ctx.restore();

      // --- Object C: 3D Wireframe Cube (Upper-Right Edge) ---
      ctx.save();
      {
        const floatY = Math.sin(elapsed * 0.4 + 1.2) * 9;
        const cx = width * 0.92 + mx * 20;
        const cy = height * 0.28 + my * 15 + floatY;
        const rot = 0.45 + Math.sin(elapsed * 0.25) * 0.05;
        ctx.translate(cx, cy);
        ctx.rotate(rot);

        ctx.strokeStyle = 'rgba(241, 239, 232, 0.26)';
        ctx.lineWidth = 1;

        // Front Face
        ctx.strokeRect(-22, -22, 44, 44);

        // Perspective Back Face
        ctx.strokeStyle = 'rgba(180, 190, 185, 0.14)';
        ctx.strokeRect(-8, -36, 44, 44);

        // Connectors
        ctx.beginPath();
        ctx.moveTo(-22, -22);
        ctx.lineTo(-8, -36);
        ctx.moveTo(22, -22);
        ctx.lineTo(36, -36);
        ctx.moveTo(22, 22);
        ctx.lineTo(36, 8);
        ctx.moveTo(-22, 22);
        ctx.lineTo(-8, 8);
        ctx.stroke();
      }
      ctx.restore();

      // --- Object D: Wireframe Icosahedron / Polyhedron (Left Center Edge) ---
      ctx.save();
      {
        const floatY = Math.cos(elapsed * 0.38) * 8;
        const cx = width * 0.06 + mx * 18;
        const cy = height * 0.48 + my * 13 + floatY;
        const r = 36;
        ctx.translate(cx, cy);
        ctx.rotate(elapsed * 0.07);

        ctx.strokeStyle = 'rgba(241, 239, 232, 0.28)';
        ctx.lineWidth = 0.95;

        // Outer Hexagonal Frame
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i * Math.PI) / 3;
          const px = r * Math.cos(a);
          const py = r * Math.sin(a);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();

        // Inner triangular faceted mesh
        ctx.strokeStyle = 'rgba(180, 190, 185, 0.15)';
        ctx.beginPath();
        ctx.moveTo(0, -r * 0.55);
        ctx.lineTo(r * 0.65, 0);
        ctx.lineTo(-r * 0.65, 0);
        ctx.closePath();
        ctx.moveTo(0, r * 0.55);
        ctx.lineTo(r * 0.65, 0);
        ctx.lineTo(-r * 0.65, 0);
        ctx.closePath();
        ctx.stroke();

        // Tiny cyan coordinate vertex
        ctx.fillStyle = '#65E6D2';
        ctx.beginPath();
        ctx.arc(0, -r * 0.55, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // --- Object E: Small Floating Pentagon / Crystal (Mid-Right Edge) ---
      ctx.save();
      {
        const floatY = Math.sin(elapsed * 0.55 + 2.0) * 6;
        const cx = width * 0.95 + mx * 14;
        const cy = height * 0.58 + my * 10 + floatY;
        ctx.translate(cx, cy);
        ctx.rotate(elapsed * 0.12);

        ctx.fillStyle = 'rgba(241, 239, 232, 0.18)';
        ctx.strokeStyle = 'rgba(241, 239, 232, 0.35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        const pr = 14;
        for (let i = 0; i < 5; i++) {
          const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
          const px = pr * Math.cos(a);
          const py = pr * Math.sin(a);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();

      // --- Object F: Dotted Radial Ring Node (Bottom Left Center) ---
      ctx.save();
      {
        const cx = width * 0.33 + mx * 10;
        const cy = height * 0.88 + my * 8;
        ctx.translate(cx, cy);
        ctx.strokeStyle = 'rgba(241, 239, 232, 0.22)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 5]);
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.restore();

      // --- Object G: Micro Wireframe Tetrahedron / Diamond (Bottom Right) ---
      ctx.save();
      {
        const floatY = Math.cos(elapsed * 0.6) * 7;
        const cx = width * 0.88 + mx * 16;
        const cy = height * 0.86 + my * 11 + floatY;
        ctx.translate(cx, cy);
        ctx.rotate(0.3 + Math.sin(elapsed * 0.3) * 0.1);

        ctx.strokeStyle = 'rgba(180, 190, 185, 0.22)';
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(0, -18);
        ctx.lineTo(14, 12);
        ctx.lineTo(-14, 12);
        ctx.closePath();
        ctx.moveTo(0, -18);
        ctx.lineTo(0, 6);
        ctx.lineTo(14, 12);
        ctx.moveTo(0, 6);
        ctx.lineTo(-14, 12);
        ctx.stroke();
      }
      ctx.restore();

      // 6. Technical Coordinate Markings & Micro Measurements
      ctx.save();
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(158, 164, 159, 0.18)';

      // Crosshair + coordinates on upper-left
      const chX = width * 0.08 + mx * 8;
      const chY = height * 0.28 + my * 6;
      ctx.strokeStyle = 'rgba(158, 164, 159, 0.15)';
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(chX - 6, chY);
      ctx.lineTo(chX + 6, chY);
      ctx.moveTo(chX, chY - 6);
      ctx.lineTo(chX, chY + 6);
      ctx.stroke();
      ctx.fillText('SYS / 01', chX + 10, chY + 3);

      // Coordinates on lower-right edge
      const crX = width * 0.85 + mx * 10;
      const crY = height * 0.72 + my * 8;
      ctx.fillText('NODE / 07 [32.4°]', crX, crY);

      // Tiny cyan tracking indicator dot
      ctx.fillStyle = '#65E6D2';
      ctx.beginPath();
      ctx.arc(crX - 8, crY - 3, 1.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 7. Spatial Particles with Edge-Gradient & Parallax Drift
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const parallaxFactor = p.layer === 1 ? 6 : p.layer === 2 ? 12 : 18;
        const drift = Math.sin(elapsed * 0.4 + i) * 6;

        const px = p.baseX * width + mx * parallaxFactor + drift;
        const py = p.baseY * height + my * (parallaxFactor * 0.7) + (elapsed * p.speed * height) % height;

        ctx.fillStyle = p.isAccent
          ? '#65E6D2'
          : `rgba(241, 239, 232, ${p.opacity})`;
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

