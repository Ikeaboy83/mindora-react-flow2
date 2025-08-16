import React from 'react';
import { Handle, Position } from '@xyflow/react';

export default function OneLevelCentralNode({ data }) {
  return (
    <div
      className="course-overview-node"
      style={{
        width: 91332, // Verdoppelt (45666 * 2)
        height: 91332, // Verdoppelt (45666 * 2)
        borderRadius: '50%',
        background: '#01D2BC',
        border: '2px solid #01D2BC', // Verdoppelt (1px * 2)
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '8750px', // 1,75fach größer (5000px * 1.75)
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 23120px 69360px rgba(0, 0, 0, 0.15)', // Verdoppelt (11560px * 2, 34680px * 2)
        position: 'relative',
      }}
    >
      {data?.label ?? "1-Level Hierarchy"}
      
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
          width: 34, // Verdoppelt (17 * 2)
          height: 34, // Verdoppelt (17 * 2)
          left: -18, // Verdoppelt (-9 * 2)
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
          width: 17, // Weitere 15% kleiner (20 * 0.85)
          height: 17, // Weitere 15% kleiner (20 * 0.85)
          right: -9, // Angepasst für neue Größe (-10 * 0.85)
          border: 'none',
          opacity: 0.3,
        }}
      />
    </div>
  );
}


