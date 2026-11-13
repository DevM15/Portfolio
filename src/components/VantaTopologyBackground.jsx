import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../utils/ThemeContext';

/**
 * Script loader helper with CDN + local vendor fallback
 */
function loadScriptWithFallback(cdnUrl, localUrl, scriptId) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return resolve();

    const existing = document.getElementById(scriptId);
    if (existing) {
      if (existing.getAttribute('data-loaded') === 'true') {
        return resolve();
      }
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => tryLocalFallback(), { once: true });
      return;
    }

    const tryLocalFallback = () => {
      const fallbackScript = document.createElement('script');
      fallbackScript.id = `${scriptId}-fallback`;
      fallbackScript.src = localUrl;
      fallbackScript.async = true;
      fallbackScript.onload = () => {
        fallbackScript.setAttribute('data-loaded', 'true');
        resolve();
      };
      fallbackScript.onerror = (err) => {
        reject(new Error(`Failed to load script from CDN and local fallback: ${cdnUrl}`));
      };
      document.head.appendChild(fallbackScript);
    };

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = cdnUrl;
    script.async = true;
    script.onload = () => {
      script.setAttribute('data-loaded', 'true');
      resolve();
    };
    script.onerror = () => {
      // Remove failed CDN script and attempt local fallback
      script.remove();
      tryLocalFallback();
    };
    document.head.appendChild(script);
  });
}

/**
 * VantaTopologyBackground:
 * Renders full-screen Vanta.js TOPOLOGY animated background using p5.js.
 * Dynamically switches palette between Warm Ivory (Light) and Deep Charcoal (Dark).
 * Non-intrusive layering with pointer-events: none and graceful fallback.
 */
export default function VantaTopologyBackground({ isRevealed = true }) {
  const { isDark } = useTheme();
  const vantaContainerRef = useRef(null);
  const vantaEffectRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isDarkRef = useRef(isDark);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  // Color palette definitions matching portfolio identity
  // Light: Warm Ivory (#F7F6F2) base with delicate Muted Sage lines (#788477)
  // Dark: Deep Charcoal (#151916) base with soft Muted Sage/Ivory lines (#8FA48E)
  const getThemePalette = (dark) => ({
    color: dark ? 0x8fa48e : 0x788477,
    backgroundColor: dark ? 0x151916 : 0xf7f6f2,
  });

  // Dynamic Theme Palette Update on isDark change
  useEffect(() => {
    if (!vantaEffectRef.current) return;
    const { color, backgroundColor } = getThemePalette(isDark);

    try {
      vantaEffectRef.current.setOptions({
        color,
        backgroundColor,
      });

      if (vantaEffectRef.current.p5canvas) {
        vantaEffectRef.current.p5canvas.style.background = isDark ? '#151916' : '#F7F6F2';
      }
    } catch (e) {
      // Fallback silently if setOptions encountered an issue
    }
  }, [isDark]);

  // Tab visibility management (pauses rendering when tab is hidden to save GPU/battery)
  useEffect(() => {
    const handleVisibilityChange = () => {
      const effect = vantaEffectRef.current;
      if (!effect || !effect.p5) return;

      try {
        if (document.hidden) {
          if (typeof effect.p5.noLoop === 'function') effect.p5.noLoop();
        } else {
          if (typeof effect.p5.loop === 'function') effect.p5.loop();
        }
      } catch (e) {
        // Ignore
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Main Vanta Initialization Lifecycle
  useEffect(() => {
    let isCancelled = false;

    // Respect user's prefers-reduced-motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Keep static clean background without initializing animated particle field
      return;
    }

    const initVanta = async () => {
      try {
        // 1. Load p5.js dependency
        if (typeof window !== 'undefined' && !window.p5) {
          await loadScriptWithFallback(
            'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js',
            '/vendor/p5.min.js',
            'vanta-p5-script'
          );
        }

        if (isCancelled) return;

        // 2. Load Vanta TOPOLOGY dependency
        if (typeof window !== 'undefined' && (!window.VANTA || !window.VANTA.TOPOLOGY)) {
          await loadScriptWithFallback(
            'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.topology.min.js',
            '/vendor/vanta.topology.min.js',
            'vanta-topology-script'
          );
        }

        if (isCancelled) return;

        const backgroundElement = vantaContainerRef.current;
        if (!backgroundElement || !window.VANTA || !window.VANTA.TOPOLOGY) return;

        // Clean up any existing instance before initializing a new one
        if (vantaEffectRef.current) {
          try {
            vantaEffectRef.current.destroy();
          } catch (e) {
            // Ignore
          }
          vantaEffectRef.current = null;
        }

        const initialPalette = getThemePalette(isDarkRef.current);

        // Responsive scale: 1.0 on desktop, 1.35 on smaller screens for peak 60fps performance
        const isMobile = window.innerWidth < 768;

        const effect = window.VANTA.TOPOLOGY({
          el: backgroundElement,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: isMobile ? 1.35 : 1.0,
          scaleMobile: 1.35,
          color: initialPalette.color,
          backgroundColor: initialPalette.backgroundColor,
        });

        if (isCancelled) {
          if (effect && typeof effect.destroy === 'function') effect.destroy();
          return;
        }

        vantaEffectRef.current = effect;
        setIsLoaded(true);
      } catch (err) {
        // Fail gracefully into the static theme background
        console.warn('Vanta TOPOLOGY background initialized in fallback mode:', err);
      }
    };

    initVanta();

    return () => {
      isCancelled = true;
      if (vantaEffectRef.current) {
        try {
          vantaEffectRef.current.destroy();
        } catch (e) {
          // Ignore
        }
        vantaEffectRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={vantaContainerRef}
      className="fixed inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
      style={{
        zIndex: 0,
        backgroundColor: isDark ? '#151916' : '#F7F6F2',
        opacity: isRevealed ? (isLoaded ? 1 : 0.8) : 0,
        transition: 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease',
      }}
      aria-hidden="true"
    />
  );
}
