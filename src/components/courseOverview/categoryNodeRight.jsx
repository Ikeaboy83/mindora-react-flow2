// rechte Seite Kategorien

import { Handle, Position } from '@xyflow/react';

export default function CategoryNodeRight({ data }) {
  return (
    <div
    style={{
        width: 640,
        height: 640,
        borderRadius: '50%',
        background: '#01D2BC',
        border: '4px solid #01D2BC',
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
      {data.label}
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        style={{
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#01D2BC',
            border: 'transparent',
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        style={{
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#01D2BC',
            border: 'transparent',
        }}
      />
    </div>
  );
}
