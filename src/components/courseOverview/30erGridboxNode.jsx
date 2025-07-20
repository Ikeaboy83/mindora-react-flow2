import { Handle, Position } from '@xyflow/react';

// 30erGridboxNode.jsx - styled den Kasten für 30 Lerneinheiten (10 Reihen, 3 Spalten)
export default function DreißigerGridboxNode({ data, selected }) {
  const cellWidth = 133;
  const cellHeight = 82;
  const gap = 8;
  const padding = 8;
  const cols = 3;
  const rows = 10;

  // Container-Breite: (3*133) + (2*8) + (2*8) = 431px
  // Container-Höhe: (10*82) + (9*8) + (2*8) = 820 + 72 + 16 = 908px
  const nodeStyle = {
    position: 'relative',
    width: `${cellWidth * cols + gap * (cols - 1) + padding * 2}px`,
    height: `${cellHeight * rows + gap * (rows - 1) + padding * 2}px`,
    background: 'transparent',
    padding: `${padding}px`,
    gap: `${gap}px`,
    border: '2px solid #ccc',
    borderRadius: '12px',
    gridTemplateColumns: `repeat(3, ${cellWidth}px)` ,
    gridTemplateRows: `repeat(10, ${cellHeight}px)`,
    display: 'grid',
    boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.06)',
    transition: 'box-shadow 0.3s ease',
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
        {/* Zellen-Grid mit Status-Icons */}
        {Array.from({ length: rows * cols }).map((_, idx) => {
          // Zeile und Spalte berechnen
          const row = Math.floor(idx / cols);
          const col = idx % cols;
          // Status-Icons für diese Zelle holen (max. 2)
          const icons = (data.statusIcons && data.statusIcons[idx]) || [];
          return (
            <div
              key={idx}
              style={{
                position: 'relative',
                width: cellWidth,
                height: cellHeight,
                border: '1px solid #eee',
                borderRadius: 8,
                background: '#fff',
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
