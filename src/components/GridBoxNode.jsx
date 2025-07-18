import { Handle, Position } from '@xyflow/react';
//GridBoxNode.jsx - styled den rechtigen Kasten als Hintergrund der Lerneinheiten
export default function GridBoxNode({ data }) {
    return (
      <>
        <Handle
          type="target"
          position={Position.Right}
          id="right-target"
          style={{ background: 'transparent', width: 12, height: 12, right: -6 }}
        />
        <div
          style={{
            position: 'relative',
            width: '360px',
            height: '280px',
            background: '#ffffff',
            padding: '8',
            gap: '8',
            border: '2px solid #ccc',
            borderRadius: 12,
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
            display: 'grid',
          }}
        >
          {data?.children}
        </div>
      </>
    );
  }
  