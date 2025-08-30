import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { getContainerDimensions } from './gridUtils';
import LerneinheitNode from '../Content/LerneinheitNode';

// Node-Konfiguration direkt in der Komponente
export const gridContainerNodeConfig = {
  id: '9erContainer-1-level-1',
  type: 'gridContainer',
  position: { x: -10000, y: 64000 }, // Ursprüngliche Position wiederhergestellt
  data: {},
};

// Neue 6er-Container Node-Konfiguration
export const gridContainerNodeConfig6er = {
  id: '6erContainer-1-level-1',
  type: 'gridContainer',
  position: { x: 100000, y: 0 }, // Neue Position bei (10000,0)
  data: {},
};





export default function GridContainerNode({ data, selected, id }) {
  // Container-Dimensionen aus gridUtils abrufen
  const { width: containerWidth, height: containerHeight } = getContainerDimensions(id);
  
  // Grid-Linien und Zellen basierend auf Container-Typ berechnen
  let gridLines = [];
  let gridCells = [];
  
  if (id === '6erContainer-1-level-1') {
    // 6er-Container: 3 Spalten, 2 Zeilen
    const cellWidth = containerWidth / 3;
    const cellHeight = containerHeight / 2;
    
    // Vertikale Linien (2 Trennlinien)
    for (let i = 1; i < 3; i++) {
      gridLines.push({
        id: `v-line-${i}`,
        type: 'vertical',
        x1: cellWidth * i,
        y1: 0,
        x2: cellWidth * i,
        y2: containerHeight,
        stroke: 'black',
        strokeWidth: 2,
      });
    }
    
    // Horizontale Linien (1 Trennlinie)
    gridLines.push({
      id: 'h-line-1',
      type: 'horizontal',
      x1: 0,
      y1: cellHeight,
      x2: containerWidth,
      y2: cellHeight,
      stroke: 'black',
      strokeWidth: 2,
    });
    
         // 6 Zellen erstellen (ohne Learning Units)
     for (let row = 0; row < 2; row++) {
       for (let col = 0; col < 3; col++) {
         const cellNumber = row * 3 + col + 1; // Zellen 1-6
         gridCells.push({
           id: `cell-${row}-${col}`,
           row,
           col,
           cellNumber,
           x: col * cellWidth,
           y: row * cellHeight,
           width: cellWidth,
           height: cellHeight,
           centerX: col * cellWidth + cellWidth / 2,
           centerY: row * cellHeight + cellHeight / 2,
           // Keine Learning Units mehr im 6er-Container
           hasLerneinheit: false,
           lerneinheitData: null
         });
       }
     }
  } else {
    // 9er-Container: 3 Spalten, 3 Zeilen
    const cellWidth = containerWidth / 3;
    const cellHeight = containerHeight / 3;
    
    // Vertikale Linien (2 Trennlinien)
    for (let i = 1; i < 3; i++) {
      gridLines.push({
        id: `v-line-${i}`,
        type: 'vertical',
        x1: cellWidth * i,
        y1: 0,
        x2: cellWidth * i,
        y2: containerHeight,
        stroke: 'black',
        strokeWidth: 2,
      });
    }
    
    // Horizontale Linien (2 Trennlinien)
    for (let i = 1; i < 3; i++) {
      gridLines.push({
        id: `h-line-${i}`,
        type: 'horizontal',
        x1: 0,
        y1: cellHeight * i,
        x2: containerWidth,
        y2: cellHeight * i,
        stroke: 'black',
        strokeWidth: 2,
      });
    }
    
    // 9 Zellen erstellen
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cellNumber = row * 3 + col + 1; // Zellen 1-9
        gridCells.push({
          id: `cell-${row}-${col}`,
          row,
          col,
          cellNumber,
          x: col * cellWidth,
          y: row * cellHeight,
          width: cellWidth,
          height: cellHeight,
          centerX: col * cellWidth + cellWidth / 2,
          centerY: row * cellHeight + cellHeight / 2,
          hasLerneinheit: false,
          lerneinheitData: null
        });
      }
    }
  }
  
  const nodeStyle = {
    width: `${containerWidth}px`,
    height: `${containerHeight}px`,
    background: 'white',
    border: 'none',
    borderRadius: '600px',
    boxShadow: selected 
      ? '0 800px 3200px rgba(48, 184, 155, 0.4)'
      : '0 400px 1600px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    position: 'relative',
    // Touch-Events werden über CSS gesteuert
    userSelect: 'none', // Verhindert Text-Auswahl
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

      {/* Haupt-Container - Touch-Events werden über CSS gesteuert */}
      <div style={nodeStyle}>
        {/* Grid-Linien */}
        <svg
          width={containerWidth}
          height={containerHeight}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
          }}
        >
          {gridLines.map((line) => (
            <line
              key={line.id}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth}
            />
          ))}
        </svg>
        
        {/* Grid-Zellen mit Lerneinheiten */}
        {gridCells.map((cell) => (
          <div
            key={cell.id}
            style={{
              position: 'absolute',
              left: cell.x,
              top: cell.y,
              width: cell.width,
              height: cell.height,
              border: '1px dashed rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1000px',
              color: 'rgba(0,0,0,0.1)',
              pointerEvents: 'none', // Verhindert Interaktion mit Zellen
            }}
          >
            {/* Zellen-Nummer anzeigen */}
            {cell.cellNumber}
            
            {/* Lerneinheit in der Zelle rendern, falls vorhanden */}
            {cell.hasLerneinheit && cell.lerneinheitData && (
              <div
                style={{
                  position: 'absolute',
                  left: cell.width * 0.05, // 5% der Zellen-Breite
                  top: cell.height * 0.10,  // 10% der Zellen-Höhe
                  width: cell.width * 0.8,  // 80% der Zellen-Breite
                  height: cell.height * 0.8, // 80% der Zellen-Höhe
                  pointerEvents: 'auto', // Lerneinheiten sind interaktiv
                }}
              >
                <LerneinheitNode
                  data={{
                    ...cell.lerneinheitData,
                    // Größen proportional zur Zelle skalieren
                    width: cell.width * 0.8,
                    height: cell.height * 0.8,
                    // Schriftgröße proportional skalieren
                    fontSize: Math.min(cell.width, cell.height) * 0.1,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
