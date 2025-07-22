import React from 'react';

function NotificationBadge1({ data }) {
  const width = 40;
  const height = 40;
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
          {data?.label || '25/81'}
        </text>
      </svg>
    </div>
  );
}

export default NotificationBadge1;
