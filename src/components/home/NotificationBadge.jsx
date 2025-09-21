import React from 'react';

function NotificationBadge({ data }) {
  const size = data?.size || 40;
  const width = size;
  const height = size;
  const radius = width / 2;
  
  // Schriftgröße: entweder aus data Props oder proportional zur Badge-Größe berechnen
  const fontSize = data?.fontSize || Math.max(10, Math.round(size * 0.25));

  return (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height} style={{ display: 'block' }}>
        {/* Kreis in #666A73 */}
        <circle 
          cx={radius} 
          cy={radius} 
          r={radius - 1} 
          fill="#666A73"
          stroke="#666A73"
          strokeWidth="1"
        />
        
        {/* Text zentriert */}
        <text 
          x={radius} 
          y={radius + 4} 
          textAnchor="middle" 
          fill="white" 
          fontSize={fontSize} 
          fontWeight="bold"
          style={{ pointerEvents: 'none' }}
        >
          {data?.label || '0/0'}
        </text>
      </svg>
    </div>
  );
}

export default NotificationBadge;
