import { Handle, Position } from '@xyflow/react';

// 12erGridBoxNode.jsx - styled den Kasten für 12 Lerneinheiten (3 Reihen, 4 Spalten)
export default function ZwoelferGridBoxNode({ data, selected }) {
  const cellWidth = 110;
  const cellHeight = 82;
  const gap = 16;
  const padding = 8;
  const cols = 4;
  const rows = 3;

  // Container-Breite: (4*110) + (3*16) + (2*8) = 440 + 48 + 16 = 504px
  // Container-Höhe: (3*82) + (2*16) + (2*8) = 246 + 32 + 16 = 294px
  const nodeStyle = {
    position: 'relative',
    width: `${cellWidth * cols + gap * (cols - 1) + padding * 2}px`,
    height: `${cellHeight * rows + gap * (rows - 1) + padding * 2}px`,
    background: 'transparent',
    padding: `${padding}px`,
    gap: `${gap}px`,
    border: '2px solid #ccc',
    borderRadius: '12px',
    gridTemplateColumns: `repeat(4, ${cellWidth}px)`,
    gridTemplateRows: `repeat(3, ${cellHeight}px)`,
    display: 'grid',
    boxShadow: selected 
      ? `0 0 32px 16px #00aaff, 0 0 64px 32px rgba(0, 170, 255, 0.24)` 
      : '0px 1px 8px 0px rgba(0, 0, 0, 0.06)',
    transition: 'box-shadow 0.3s ease',
    animation: selected ? 'pulsate 2s ease-in-out infinite' : 'none',
    pointerEvents: 'none',
  };

  function CornerMark({ position, color = "black", size = 36, thickness = 8, radius = 10 }) {
    const baseStyle = {
      width: size,
      height: size,
      position: 'absolute',
      borderRadius: radius,
      border: 'none',
      boxSizing: 'border-box',
      zIndex: 20,
    };

    const positions = {
      topLeft: {
        top: -thickness/2,
        left: -thickness/2,
        borderTop: `${thickness}px solid ${color}`,
        borderLeft: `${thickness}px solid ${color}`,
        borderTopLeftRadius: radius,
      },
      topRight: {
        top: -thickness/2,
        right: -thickness/2,
        borderTop: `${thickness}px solid ${color}`,
        borderRight: `${thickness}px solid ${color}`,
        borderTopRightRadius: radius,
      },
      bottomLeft: {
        bottom: -thickness/2,
        left: -thickness/2,
        borderBottom: `${thickness}px solid ${color}`,
        borderLeft: `${thickness}px solid ${color}`,
        borderBottomLeftRadius: radius,
      },
      bottomRight: {
        bottom: -thickness/2,
        right: -thickness/2,
        borderBottom: `${thickness}px solid ${color}`,
        borderRight: `${thickness}px solid ${color}`,
        borderBottomRightRadius: radius,
      },
    };

    return <div style={{ ...baseStyle, ...positions[position] }} />;
  }

  return (
    <>
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
      <div style={nodeStyle}>
        <style>
          {`
            @keyframes pulsate {
              0% {
                box-shadow: 0 0 32px 16px #00aaff, 0 0 64px 32px rgba(0, 170, 255, 0.24);
              }
              50% {
                box-shadow: 0 0 48px 24px #00aaff, 0 0 80px 40px rgba(0, 170, 255, 0.4);
              }
              100% {
                box-shadow: 0 0 32px 16px #00aaff, 0 0 64px 32px rgba(0, 170, 255, 0.24);
              }
            }
          `}
        </style>
        
        {/* Zellen-Grid mit Status-Icons */}
        {Array.from({ length: rows * cols }).map((_, idx) => {
          // Zeile und Spalte berechnen
          const row = Math.floor(idx / cols);
          const col = idx % cols;
          // Status-Icons für diese Zelle holen (max. 2 - links und rechts)
          const icons = (data.statusIcons && data.statusIcons[idx]) || [];
          return (
            <div
              key={idx}
              style={{
                position: 'relative',
                width: cellWidth,
                height: cellHeight,
                border: 'none',
                borderRadius: 8,
                background: 'transparent',
                margin: 0,
                boxSizing: 'border-box',
                overflow: 'visible',
              }}
            >
              {/* Status-Icons */}
              {icons.slice(0, 2).map((icon, i) => {
                const IconComp = icon.component;
                return IconComp ? (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: icon.x,
                      top: icon.y,
                      zIndex: 2,
                    }}
                  >
                    <IconComp />
                  </div>
                ) : null;
              })}
              {/* Hier könnten weitere Inhalte der Zelle stehen */}
            </div>
          );
        })}
        <CornerMark position="topLeft" />
        <CornerMark position="topRight" />
        <CornerMark position="bottomLeft" />
        <CornerMark position="bottomRight" />
      </div>
    </>
  );
}
  