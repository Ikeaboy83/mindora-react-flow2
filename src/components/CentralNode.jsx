import { Handle, Position } from '@xyflow/react';
import { useEffect } from 'react';

export default function CentralNode({ data }) {
  function usePinchPassThrough() {
    useEffect(() => {
      function handleTouchStart(e) {
        if (e.touches && e.touches.length > 1) {
          // Pinch-Geste erkannt: Pointer-Events auf allen Nodes deaktivieren
          document.querySelectorAll('.react-flow__node').forEach(node => {
            node.style.pointerEvents = 'none';
          });
        }
      }
      function handleTouchEnd(e) {
        // Nach der Geste Pointer-Events wieder aktivieren
        document.querySelectorAll('.react-flow__node').forEach(node => {
          node.style.pointerEvents = '';
        });
      }
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });
      document.addEventListener('touchcancel', handleTouchEnd, { passive: true });
      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchend', handleTouchEnd);
        document.removeEventListener('touchcancel', handleTouchEnd);
      };
    }, []);
  }

  return (
    <div
    style={{
      width: 880,
      height: 880,
      borderRadius: '50%',
      background: '#01D2BC',
      border: '4px solid #01D2BC',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 72,
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
          background: 'transparent',
          border: 'transparent',
          width: 20,
          height: 20,
          borderRadius: '50%',
        }}
      />
  <Handle
  type="source"
  position={Position.Right}
  id="right-source"
  style={{
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'transparent',
    width: 20,
    height: 20,
    borderRadius: '50%',
  }}
/>
    </div>
  );
}
