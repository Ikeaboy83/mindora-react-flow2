import React from 'react';
import { Handle, Position } from '@xyflow/react';

export default function OneLevelCategoryNode({ data }) {
  return (
    <div
      className="course-overview-node"
      style={{
        width: 52672,
        height: 52112,
        borderRadius: '50%',
        background: '#01D2BC',
        border: '80px solid #01D2BC',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '6000px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 520px 1560px rgba(0, 0, 0, 0.15)',
        position: 'relative',
      }}
    >
      {data?.label ?? "1-Level Category"}
      
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
