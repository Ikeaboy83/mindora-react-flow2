import React from 'react';

function NotificationBadge4({ data }) {
  const width = 50;
  const height = 50;
  const radius = width / 2;

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
          fontSize="10" 
          fontWeight="bold"
          style={{ pointerEvents: 'none' }}
        >
          {data?.label || '89/212'}
        </text>
      </svg>
    </div>
  );
}

export default NotificationBadge4;
