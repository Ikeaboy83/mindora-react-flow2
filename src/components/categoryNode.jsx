// linke Seite Kategorien
import { Handle, Position } from '@xyflow/react';

export default function CategoryNode({ data }) {
  return (
    <div
  style={{
    width: 640,   // vorher: 160
    height: 640,  // vorher: 160
    borderRadius: '50%',
    background: '#30b89b',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 64, // vorher: 16
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
        type="source"
        position={Position.Left}
        id="left-source"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#30b89b', // gleiche Farbe wie der Kreis
          border: '2px solid transparent' // kein sichtbarer Rand
        }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#30b89b', // gleiche Farbe wie der Kreis
          border: '2px solid transparent' // kein sichtbarer Rand
        }}
      />
    </div>
  );
}
