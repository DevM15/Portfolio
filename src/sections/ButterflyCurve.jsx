import React, { useEffect, useRef } from 'react';

const ButterflyCurve = () => {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const width = 500;
    const height = 500;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 40;

    let d = "";
    const step = 0.02;
    const maxTheta = 24 * Math.PI;

    for (let theta = 0; theta <= maxTheta; theta += step) {
      const r =
        Math.exp(Math.sin(theta)) -
        2 * Math.cos(4 * theta) +
        Math.pow(Math.sin((2 * theta - Math.PI) / 24), 5);
      const x = centerX + scale * r * Math.cos(theta);
      const y = centerY - scale * r * Math.sin(theta); // flip y for SVG

      d += theta === 0 ? `M${x},${y}` : ` L${x},${y}`;
    }

    path.setAttribute("d", d);

    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.style.animation = "draw 20s ease-in-out forwards";
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <svg width="500" height="500" viewBox="0 0 500 500">
        <path
          ref={pathRef}
          fill="none"
          stroke="#FF69B4"
          strokeWidth="2"
        />
      </svg>

      <style>
        {`
          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ButterflyCurve;
