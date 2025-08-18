import { Handle, Position } from '@xyflow/react';
import KrankikomgebaeudePng from '../../assets/Krankikomgebäude.png';

export default function KrankikomgebaeudeNode({ data }) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img 
        src={KrankikomgebaeudePng} 
        alt="Krankenhausgebäude" 
        style={{ 
          width: '240px', 
          height: 'auto',
          opacity: 0.8,
          pointerEvents: 'none' // Verhindert Interaktionen mit dem Bild
        }} 
      />
      
      {/* Optional: Handles für Verbindungen */}
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        style={{
          background: 'transparent',
          border: 'none',
          width: 12,
          height: 12,
          top: -6,
        }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        style={{
          background: 'transparent',
          border: 'none',
          width: 12,
          height: 12,
          bottom: -6,
        }}
      />
      {/* Rechter Handle für Container-Verbindungen */}
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        style={{
          background: 'transparent',
          border: 'none',
          width: 12,
          height: 12,
          right: -6,
        }}
      />
    </div>
  );
} 