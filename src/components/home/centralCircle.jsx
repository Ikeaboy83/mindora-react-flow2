// linke Seite Kategorien
import { Handle, Position } from '@xyflow/react';

export default function CategoryNode1({ data }) {
  return (
    <div
      style={{
        width: 660, // 4 × 640
        height: 660, // 4 × 640
        borderRadius: '50%',
        background: '#FFFFFF',
        border: '16px solid #FFFFFF', // dicker weißer Rand, passe ggf. an
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        boxShadow: '-10px 10px 40px rgba(0, 0, 0, 0.5265)',
        position: 'relative',
        touchAction: 'manipulation', // Touch-Events für Zoom erlauben
        userSelect: 'none', // Text-Auswahl verhindern
        pointerEvents: 'auto', // Pointer-Events erlauben
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
          background: 'transparent',
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
          background: 'transparent',
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
