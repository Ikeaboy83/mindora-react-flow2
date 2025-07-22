import React from 'react';
import { generateCapsulePath } from '../../utils/pathUtils';

function NotificationBadge1({ data }) {
  const width = 120;
  const height = 40;
  const capsulePath = generateCapsulePath(width, height);

  return (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height} style={{ display: 'block' }}>
        {/* Einheitliche Kapsel in #666A73 */}
        <path 
          d={capsulePath} 
          fill="#666A73"
          stroke="#666A73"
          strokeWidth="1"
        />
        
        {/* Optional: Text in der Mitte */}
        {data?.label && (
          <text 
            x={width / 2} 
            y={height / 2 + 4} 
            textAnchor="middle" 
            fill="white" 
            fontSize="12" 
            fontWeight="bold"
            style={{ pointerEvents: 'none' }}
          >
            {data.label}
          </text>
        )}
      </svg>
    </div>
  );
}

export default NotificationBadge1;
