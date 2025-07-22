// linke Seite Kategorien
import { Handle, Position } from '@xyflow/react';

export default function CategoryNode1({ data }) {
  return (
    <div
      style={{
        width: 640,
        height: 640,
        borderRadius: '50%',
        background: '#01D2BC',
        border: '4px #01D2BC',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 64,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 40px 112px rgba(0, 0, 0, 0.15)',
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
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'transparent',
          border: 'none',
          opacity: 0.3,
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
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'transparent',
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
    </div>
  );
}
