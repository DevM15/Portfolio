import { useEffect, useRef } from 'react';
import { useTheme } from '../utils/ThemeContext';

/**
 * SpatialCanvasBackground - Premium Architectural Editorial Background
 * Adapts dynamically between Light mode (#F7F6F2) and Dark mode (#151916).
 */
export default function SpatialCanvasBackground({ sectionIndex = 0, isRevealed = true }) {
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);
  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animFrameRef = useRef(null);
  const revealProgressRef = useRef(isRevealed ? 1 : 0);
  const isRevealedRef = useRef(isRevealed);

  useEffect(() => {
    isRevealedRef.current = isRevealed;
  }, [isRevealed]);

  // Subtle mouse parallax dampening (passive listener)
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

  // Main Canvas Render Loop
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

      const elapsed = (time - startTime) * 0.001; // in seconds
      const dark = isDarkRef.current;

      // Theme-specific colors
      const bgBase = dark ? '#151916' : '#F7F6F2';
      const illumCenter = dark ? 'rgba(29, 35, 31, 0.95)' : 'rgba(252, 251, 248, 0.95)';
      const illumMid = dark ? 'rgba(21, 25, 22, 0.7)' : 'rgba(247, 246, 242, 0.7)';
      const illumOuter = dark ? 'rgba(15, 18, 16, 0.35)' : 'rgba(233, 229, 220, 0.35)';
      const guideColor = dark ? 'rgba(57, 66, 57, 0.65)' : 'rgba(222, 217, 206, 0.55)';
      const sageColor = dark ? 'rgba(162, 173, 160, 0.35)' : 'rgba(120, 132, 119, 0.32)';
      const waveColor = dark ? 'rgba(162, 173, 160, 0.08)' : 'rgba(120, 132, 119, 0.08)';
      const metaColor = dark ? 'rgba(162, 173, 160, 0.55)' : 'rgba(120, 132, 119, 0.55)';
      const accentColor = dark ? '#C98265' : '#B96F52';

      // Very gentle mouse lerp for smooth parallax (max 8px)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.03;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.03;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Reveal transition
      const targetReveal = isRevealedRef.current ? 1 : 0;
      revealProgressRef.current += (targetReveal - revealProgressRef.current) * 0.04;
      const revealProgress = revealProgressRef.current;

      ctx.clearRect(0, 0, width, height);

      // ==================== 1. BASE BACKGROUND ====================
      ctx.fillStyle = bgBase;
      ctx.fillRect(0, 0, width, height);

      // ==================== 2. AMBIENT ILLUMINATION (CENTRAL PROFILE GLOW) ====================
      const centerIllum = ctx.createRadialGradient(
        width * 0.5 + mx * 8,
        height * 0.48 + my * 6,
        width * 0.05,
        width * 0.5,
        height * 0.48,
        width * 0.55
      );
      centerIllum.addColorStop(0, illumCenter);
      centerIllum.addColorStop(0.5, illumMid);
      centerIllum.addColorStop(1, illumOuter);
      ctx.fillStyle = centerIllum;
      ctx.fillRect(0, 0, width, height);

      if (revealProgress < 0.005) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.globalAlpha = revealProgress;

      // ==================== 3. FINE ARCHITECTURAL CONSTRUCTION GUIDELINES ====================
      ctx.strokeStyle = guideColor;
      ctx.lineWidth = 0.75;
      ctx.beginPath();

      // Top and Bottom Structural Margins
      const topMargin = 88;
      const bottomMargin = height - 76;
      ctx.moveTo(32, topMargin);
      ctx.lineTo(width - 32, topMargin);
      ctx.moveTo(32, bottomMargin);
      ctx.lineTo(width - 32, bottomMargin);

      // Golden ratio architectural vertical accents
      const leftColX = Math.round(width * 0.08 + mx * 4);
      const rightColX = Math.round(width * 0.92 + mx * 4);
      ctx.moveTo(leftColX, topMargin);
      ctx.lineTo(leftColX, bottomMargin);
      ctx.moveTo(rightColX, topMargin);
      ctx.lineTo(rightColX, bottomMargin);

      ctx.stroke();

      // ==================== 4. DELICATE GEOMETRIC EDITORIAL OUTLINES ====================
      ctx.strokeStyle = sageColor;
      ctx.lineWidth = 0.85;
      ctx.beginPath();

      // Top-Left Architectural Corner Bracket
      const bktSize = 14;
      ctx.moveTo(leftColX - 8, topMargin + bktSize);
      ctx.lineTo(leftColX - 8, topMargin - 8);
      ctx.lineTo(leftColX + bktSize, topMargin - 8);

      // Bottom-Right Corner Bracket
      ctx.moveTo(rightColX + 8, bottomMargin - bktSize);
      ctx.lineTo(rightColX + 8, bottomMargin + 8);
      ctx.lineTo(rightColX - bktSize, bottomMargin + 8);
      ctx.stroke();

      // ==================== 5. SUBTLE SLOW-DRIFTING WIREFRAME ACCENT ====================
      const waveShift = Math.sin(elapsed * 0.15) * 8;
      ctx.strokeStyle = waveColor;
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      const waveY = height * 0.75 + my * 4;
      ctx.moveTo(0, waveY + waveShift);
      ctx.bezierCurveTo(
        width * 0.25, waveY - 25 + waveShift,
        width * 0.45, waveY + 35 - waveShift,
        width * 0.70, waveY - 10 + waveShift
      );
      ctx.stroke();

      // ==================== 6. EDITORIAL TYPOGRAPHIC COORDINATES & METADATA ====================
      ctx.font = '8px "IBM Plex Mono", monospace';
      ctx.fillStyle = metaColor;

      // Left architectural stamp
      const metaLeftY = topMargin + 24;
      ctx.fillText('ARCH / REF 01', leftColX + 8, metaLeftY);

      // Right geographic coordinates
      const crY = bottomMargin - 16;
      ctx.fillText('19.0760° N, 72.8777° E', rightColX - 120, crY);

      // ==================== 7. SPARSE RESTING TERRACOTTA ACCENTS ====================
      ctx.fillStyle = accentColor;

      // Dot 1: Beside Left architectural stamp
      ctx.beginPath();
      ctx.arc(leftColX + 4, metaLeftY - 3, 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Dot 2: Beside Right coordinates
      ctx.beginPath();
      ctx.arc(rightColX - 126, crY - 3, 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Dot 3: Subtle center bottom datum marker with slow breathing opacity
      const dot3Opacity = (0.35 + Math.sin(elapsed * 0.8) * 0.15) * revealProgress;
      ctx.fillStyle = dark
        ? `rgba(201, 130, 101, ${dot3Opacity.toFixed(3)})`
        : `rgba(185, 111, 82, ${dot3Opacity.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(width * 0.5, bottomMargin - 8, 1.8, 0, Math.PI * 2);
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
  }, [sectionIndex]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
      style={{ willChange: 'transform' }}
    />
  );
}
