import { Handle, Position } from '@xyflow/react';

// Funktion zum Aufhellen von Hex-Farben
const lightenHexColor = (hex, amount) => {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * amount * 100);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
};

//GridBoxNode.jsx - styled den rechtigen Kasten als Hintergrund der Lerneinheiten
export default function GridBoxNode({ data, selected }) {
    const glowColor = '#00aaff'; // Ursprüngliches kräftiges Blau
    
    const nodeStyle = {
      position: 'relative',
      width: '350px',
      height: '270px',
      background: 'transparent', // Transparent statt weiß
      padding: '8px',
      gap: '8px',
      border: '2px solid #ccc',
      borderRadius: '12px',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(3, 1fr)',
      display: 'grid',
      boxShadow: selected 
        ? `0 0 32px 16px ${glowColor}, 0 0 64px 32px rgba(0, 170, 255, 0.24)` 
        : '0px 1px 8px 0px rgba(0, 0, 0, 0.06)',
      transition: 'box-shadow 0.3s ease',
      animation: selected ? 'pulsate 2s ease-in-out infinite' : 'none',
      pointerEvents: 'none', // Erlaubt Klicks durch den Container
    };

    return (
      <>
        <Handle
          type="target"
          position={Position.Right}
          id="right-target"
          style={{ 
            background: 'transparent', 
            width: 12, 
            height: 12, 
            right: -6,
            border: 'none', // Entfernt den Rahmen
            opacity: 0.3 // Macht den Handle sehr transparent
          }}
        />
        <div style={nodeStyle}>
          <style>
            {`
              @keyframes pulsate {
                0% {
                  box-shadow: 0 0 32px 16px ${glowColor}, 0 0 64px 32px rgba(0, 170, 255, 0.24);
                }
                50% {
                  box-shadow: 0 0 48px 24px ${glowColor}, 0 0 80px 40px rgba(0, 170, 255, 0.4);
                }
                100% {
                  box-shadow: 0 0 32px 16px ${glowColor}, 0 0 64px 32px rgba(0, 170, 255, 0.24);
                }
              }
            `}
          </style>
        </div>
      </>
    );
  }
  