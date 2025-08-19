import React from 'react';
import { Handle, Position } from '@xyflow/react';

export function FirstWrapperNode({ data }) {
  return (
    <div
      style={{
        width: 52672,
        height: 52112,
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '1200px',
        border: '80px solid #01D2BC',
        boxShadow: '0 520px 1560px rgba(1, 210, 188, 0.2)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        touchAction: 'manipulation', // Touch-Events für Zoom erlauben
        userSelect: 'none', // Text-Auswahl verhindern
        pointerEvents: 'auto', // Pointer-Events erlauben
      }}
    >
      {/* Oberer Bereich: Container für den Inhalt */}
      <div
        style={{
          flex: 1,
          background: 'transparent',
          position: 'relative',
          padding: '400px',
        }}
      >
        {/* Hier wird der Inhalt eingebettet */}
        {data.children}
      </div>
      
      {/* Unterer Bereich: Grüner Bereich mit Titel */}
      <div
        style={{
          height: '20808px',
          background: 'linear-gradient(135deg, #01D2BC 0%, #00B8A9 100%)',
          borderBottomLeftRadius: '1120px',
          borderBottomRightRadius: '1120px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Titel auf dem grünen Bereich */}
        <div
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '6000px',
            textAlign: 'center',
            fontFamily: 'Blogger Sans, sans-serif',
          }}
        >
          {data?.title || 'COURSE OVERVIEW'}
        </div>
      </div>
      
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

export function SecondWrapperNode({ data }) {
  return (
    <div
      style={{
        width: 6584,
        height: 6514,
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '150px',
        border: '10px solid #01D2BC',
        boxShadow: '0 65px 195px rgba(1, 210, 188, 0.2)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1, // Niedriger als Edges
        touchAction: 'manipulation', // Touch-Events für Zoom erlauben
        userSelect: 'none', // Text-Auswahl verhindern
        pointerEvents: 'auto', // Pointer-Events erlauben
      }}
    >
      {/* Oberer Bereich: Container für die Course Overview */}
      <div
        style={{
          flex: 1,
          background: 'transparent',
          position: 'relative',
          padding: '20px',
        }}
      >
        {/* Hier wird die bestehende Course Overview eingebettet */}
        {data.children}
      </div>
      
      {/* Unterer Bereich: Grüner Bereich mit Titel */}
      <div
        style={{
          height: '2601px',
          background: 'linear-gradient(135deg, #01D2BC 0%, #00B8A9 100%)',
          borderBottomLeftRadius: '140px',
          borderBottomRightRadius: '140px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: '600px',
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
            fontFamily: 'Blogger Sans, sans-serif',
          }}
        >
          WEITERER VERSUCH
        </div>
      </div>
      
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
    </div>
  );
}

// Wrapper-Node-Definitionen für den Import
export const wrapperNodes = [
  // First Wrapper Node
  {
    id: 'first-wrapper',
    type: 'firstWrapper',
    position: { x: 258360, y: 56000 }, 
    data: {
      label: 'First Wrapper',
    },
  },
  
  // Second Wrapper Node für die gesamte Course Overview
  {
    id: 'second-wrapper',
    type: 'secondWrapper',
    position: { x: 35088, y: 6000 },
    parentId: 'first-wrapper', // Als Kind des FirstWrapperNode
    data: {
      label: 'Second Wrapper',
    },
  },
];
