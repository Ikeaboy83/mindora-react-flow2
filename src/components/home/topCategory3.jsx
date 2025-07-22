import { Handle, Position } from '@xyflow/react';

export default function CategoryNode1({ data }) {
  return (
    <div
      style={{
        width: 257,
        height: 257,
        borderRadius: '50%',
        background: '#F66303',
        border: '4px #F66303',
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
          background: '#F66303',
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
          background: '#F66303',
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
