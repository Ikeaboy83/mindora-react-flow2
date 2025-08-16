import React from 'react';
import { Handle, Position } from '@xyflow/react';
import praesentationIcon from '../../../assets/Präsenation.jpg';

// 1Level6erGridBoxNode.jsx - Grid-Node für 1. Level mit 6 Lerneinheiten
export default function OneLevelSixerGridboxNode({ data, selected }) {
  const nodeStyle = {
    position: 'relative',
    width: '60000px',
    height: '26280px', // Korrekte Höhe für 2 Reihen mit Abständen und Padding
    background: 'white',
    border: 'none',
    borderRadius: '600px',
    boxShadow: selected 
      ? '0 800px 3200px rgba(48, 184, 155, 0.4)' 
      : '0 400px 1600px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // 3 Spalten
    gridTemplateRows: 'repeat(2, 1fr)', // 2 Reihen
    gap: '1680px', // Nochmal 20% kleiner von 2100px auf 1680px
    padding: '1500px',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  };

  return (
    <>
      {/* Handles für Verbindungen */}
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        style={{
          background: '#30b89b',
          width: 12,
          height: 12,
          left: -6,
          border: '2px solid white',
        }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        style={{
          background: '#30b89b',
          width: 12,
          height: 12,
          right: -6,
          border: '2px solid white',
        }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        style={{
          background: '#30b89b',
          width: 12,
          height: 12,
          left: -6,
          border: '2px solid white',
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        style={{
          background: '#30b89b',
          width: 12,
          height: 12,
          right: -6,
          border: '2px solid white',
        }}
      />


      <div style={nodeStyle}>
        {/* Lerneinheit 1 */}
        <div style={{ 
          background: '#e6fefc',
          border: '4px solid #30b89b',
          borderRadius: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          height: '100%'
        }}>
          {/* Medien-Icon */}
          <div
            style={{
              width: '100%',
              height: '60%',
              background: '#d5f4ee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <img 
              src={praesentationIcon} 
              alt="Präsentation" 
              style={{
                width: '125%',
                height: '125%',
                objectFit: 'contain',
                transform: 'scale(1.25)',
                transformOrigin: 'center',
              }}
            />
          </div>

          {/* Titelbereich */}
                                             <div
               style={{
                 height: '40%',
                 width: '100%',
                 background: '#f7f7f7',
                 color: '#333',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 padding: '0 4px',
                 textAlign: 'center',
                 lineHeight: '1.0',
                 fontSize: '1400px'
               }}
             >
               Moderne Lerneinheit 1
             </div>
        </div>

        {/* Lerneinheit 2 */}
        <div style={{ 
          background: '#e6fefc',
          border: '4px solid #30b89b',
          borderRadius: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          height: '100%'
        }}>
          {/* Medien-Icon */}
          <div
            style={{
              width: '100%',
              height: '60%',
              background: '#d5f4ee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <img 
              src={praesentationIcon} 
              alt="Präsentation" 
              style={{
                width: '125%',
                height: '125%',
                objectFit: 'contain',
                transform: 'scale(1.25)',
                transformOrigin: 'center',
              }}
            />
          </div>

          {/* Titelbereich */}
                                             <div
               style={{
                 height: '40%',
                 width: '100%',
                 background: '#f7f7f7',
                 color: '#333',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 padding: '0 4px',
                 textAlign: 'center',
                 lineHeight: '1.0',
                 fontSize: '1400px'
               }}
             >
               Moderne Lerneinheit 2
             </div>
        </div>

        {/* Lerneinheit 3 */}
        <div style={{ 
          background: '#e6fefc',
          border: '4px solid #30b89b',
          borderRadius: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          height: '100%'
        }}>
          {/* Medien-Icon */}
          <div
            style={{
              width: '100%',
              height: '60%',
              background: '#d5f4ee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <img 
              src={praesentationIcon} 
              alt="Präsentation" 
              style={{
                width: '125%',
                height: '125%',
                objectFit: 'contain',
                transform: 'scale(1.25)',
                transformOrigin: 'center',
              }}
            />
          </div>

          {/* Titelbereich */}
                                             <div
               style={{
                 height: '40%',
                 width: '100%',
                 background: '#f7f7f7',
                 color: '#333',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 padding: '0 4px',
                 textAlign: 'center',
                 lineHeight: '1.0',
                 fontSize: '1400px'
               }}
             >
               Moderne Lerneinheit 3
             </div>
        </div>

        {/* Lerneinheit 4 - Zweite Reihe */}
        <div style={{ 
          background: '#e6fefc',
          border: '4px solid #30b89b',
          borderRadius: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          height: '100%'
        }}>
          {/* Medien-Icon */}
          <div
            style={{
              width: '100%',
              height: '60%',
              background: '#d5f4ee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <img 
              src={praesentationIcon} 
              alt="Präsentation" 
              style={{
                width: '125%',
                height: '125%',
                objectFit: 'contain',
                transform: 'scale(1.25)',
                transformOrigin: 'center',
              }}
            />
          </div>

          {/* Titelbereich */}
          <div
            style={{
              height: '40%',
              width: '100%',
              background: '#f7f7f7',
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 4px',
              textAlign: 'center',
              lineHeight: '1.0',
              fontSize: '1400px'
            }}
          >
            Moderne Lerneinheit 4
          </div>
        </div>

        {/* Lerneinheit 5 - Zweite Reihe */}
        <div style={{ 
          background: '#e6fefc',
          border: '4px solid #30b89b',
          borderRadius: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          height: '100%'
        }}>
          {/* Medien-Icon */}
          <div
            style={{
              width: '100%',
              height: '60%',
              background: '#d5f4ee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <img 
              src={praesentationIcon} 
              alt="Präsentation" 
              style={{
                width: '125%',
                height: '125%',
                objectFit: 'contain',
                transform: 'scale(1.25)',
                transformOrigin: 'center',
              }}
            />
          </div>

          {/* Titelbereich */}
          <div
            style={{
              height: '40%',
              width: '100%',
              background: '#f7f7f7',
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 4px',
              textAlign: 'center',
              lineHeight: '1.0',
              fontSize: '1400px'
            }}
          >
            Moderne Lerneinheit 5
          </div>
        </div>


      </div>
    </>
  );
}
