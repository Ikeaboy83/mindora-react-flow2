import { Handle, Position } from '@xyflow/react';

export default function CentralNode({ data }) {
  return (
    <div
    style={{
      width: 880,   // vorher: 220
      height: 880,  // vorher: 220
      borderRadius: '50%',
      background: '#30b89b',
      color: 'white',
      fontWeight: 'bold',
      fontSize: 72, // vorher: 18
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 48px 144px rgba(0, 0, 0, 0.35)',
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
  type="source"
  position={Position.Right}
  id="right-source" // ✅ Das ist der gesuchte Source-Handle!
  style={{
    top: '50%',
    transform: 'translateY(-50%)',
    background: '#30b89b',
    border: '2px solid transparent'
  }}
/>
    </div>
  );
}
