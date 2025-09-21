import { Handle, Position } from '@xyflow/react';

// Konfiguration für die verschiedenen Kategorie-Typen
const categoryConfig = {
  1: {
    color: '#E7CC03',
    size: 214
  },
  2: {
    color: '#01D2BC', 
    size: 214
  },
  3: {
    color: '#F66303',
    size: 257
  },
  4: {
    color: '#4A238D',
    size: 278
  },
  5: {
    color: '#5CCAEB',
    size: 278
  }
};

export default function TopCategoryNode({ data }) {
  const categoryType = data?.categoryType || 1;
  const config = categoryConfig[categoryType];
  
  if (!config) {
    console.warn(`Unknown category type: ${categoryType}`);
    // Fallback zur Kategorie 1
    config = categoryConfig[1];
  }

  const { color, size } = config;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        border: `4px ${color}`,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '-10px 10px 40px rgba(0, 0, 0, 0.5265)',
        position: 'relative',
      }}
    >
      {data?.label ?? "Kein Label"}
      
      {/* Links: Source und Target */}
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        style={{
          top: '45%',
          transform: 'translateY(-50%)',
          background: color,
          border: 'transparent',
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        style={{
          background: 'transparent',
          width: 12,
          height: 12,
          left: -6,
          border: 'none',
          opacity: 0.3,
        }}
      />
      
      {/* Rechts: Source und Target */}
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        style={{
          top: '45%',
          transform: 'translateY(-50%)',
          background: color,
          border: 'transparent',
        }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        style={{
          background: 'transparent',
          width: 12,
          height: 12,
          right: -6,
          border: 'none',
          opacity: 0.3,
        }}
      />
    </div>
  );
}
