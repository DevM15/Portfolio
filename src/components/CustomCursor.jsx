import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [label, setLabel] = useState('');
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const onOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (!target) return;
      const label = target.getAttribute('data-cursor');
      if (label) {
        setLabel(label);
        setActive(true);
      }
    };

    const onOut = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setLabel('');
        setActive(false);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout', onOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
    };
  }, [visible]);

  if (typeof window === 'undefined') return null;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) return null;

  return (
    <>
      <div
        className="cursor-circle"
        style={{ left: pos.x, top: pos.y, width: active ? 40 : 8, height: active ? 40 : 8 }}
      />
      <div
        className="cursor-label"
        style={{ left: pos.x, top: pos.y - 24 }}
      >
        {label}
      </div>
    </>
  );
}