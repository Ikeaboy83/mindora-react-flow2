import { Handle, Position } from '@xyflow/react';

// 18erGridboxNode.jsx - styled den Kasten für 18 Lerneinheiten (6 Reihen, 3 Spalten)
export default function AchtzehnerGridboxNode({ data, selected }) {
  const cellWidth = 133;
  const cellHeight = 82;
  const gap = 8;
  const padding = 8;
  const cols = 3;
  const rows = 6;

  // Container-Breite: (3*133) + (2*8) + (2*8) = 431px
  // Container-Höhe: (6*82) + (5*8) + (2*8) = 492 + 40 + 16 = 548px
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
    gridTemplateRows: `repeat(6, ${cellHeight}px)`,
    display: 'grid',
    boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.06)',
    transition: 'box-shadow 0.3s ease',
    pointerEvents: 'none',
  };

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
        {/* Hier können die Lerneinheit-Nodes als Children oder per Mapping eingefügt werden */}
      </div>
    </>
  );
}
