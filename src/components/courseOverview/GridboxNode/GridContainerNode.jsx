import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { getLevelScaleFactor, getGridContainerBorderRadius } from './index.js';
import LerneinheitNode from '../Content/LerneinheitNode';

// Grid-Typ Definitionen
const GRID_TYPES = {
  '3er': { cols: 3, rows: 1, name: '3er Grid' },
  '6er': { cols: 3, rows: 2, name: '6er Grid' },
  '9er': { cols: 3, rows: 3, name: '9er Grid' }
};

// Basis-Größen für Level 1 (feste Größen)
const GRID_BASE_SIZES = {
  '3er': { width: 57600, height: 14400 },  // 3 Spalten, 1 Zeile (1/3 der Höhe eines 9er-Grids)
  '6er': { width: 57600, height: 28800 },  // 3 Spalten, 2 Zeilen  
  '9er': { width: 57600, height: 43200 }   // 3 Spalten, 3 Zeilen
};

// Hilfsfunktionen für ID-Parsing
const extractGridTypeFromId = (id) => {
  if (id.includes('3er')) return '3er';
  if (id.includes('6er')) return '6er';
  if (id.includes('9er')) return '9er';
};

const extractLevelFromId = (id) => {
  const match = id.match(/level-(\d+)/);
  return match ? parseInt(match[1]) : 1;
};

export default function GridContainerNode({ data, selected, id }) {
  // Grid-Typ und Level aus data oder id extrahieren
  const gridType = data?.gridType || extractGridTypeFromId(id);
  const level = data?.level || extractLevelFromId(id);
  
  // Container-Dimensionen berechnen (Basis-Größe × Level-Skalierung)
  const baseSize = GRID_BASE_SIZES[gridType];
  const scaleFactor = getLevelScaleFactor(level);
  const containerWidth = baseSize.width * scaleFactor;
  const containerHeight = baseSize.height * scaleFactor;
  
  // Dynamische Border-Radius basierend auf Grid-Typ und Level
  const borderRadius = getGridContainerBorderRadius(gridType, level);
  
  // Hintergrundfarbe basierend auf Container-ID bestimmen
  const getBackgroundColor = (containerId, gridType, level) => {
    // Spezifische Container-Farben
    if (containerId === '9erContainer-level-3') {
      return 'white'; // Weißer Hintergrund für 9er-Grid Level 3
    }
    if (containerId === '6erContainer-level-3') {
      return 'white'; // Weißer Hintergrund für 6er-Grid Level 3
    }
    if (containerId === '3erContainer-level-3') {
      return 'white'; // Weißer Hintergrund für 3er-Grid Level 3
    }
    if (containerId === '3erContainer-level-3-second') {
      return 'white'; // Weißer Hintergrund für zweiten 3er-Grid Level 3
    }
    if (containerId === '3erContainer-level-3-third') {
      return 'white'; // Weißer Hintergrund für dritten 3er-Grid Level 3
    }
    
    // Standard-Hintergrund für alle anderen Container
    return 'white';
  };
  
  const backgroundColor = getBackgroundColor(id, gridType, level);
  
  // Box Shadow basierend auf Level bestimmen
  const getBoxShadow = (level, selected) => {
    if (selected) {
      // Ausgewählter Zustand - einheitlich für alle Level
      return '0 800px 3200px rgba(48, 184, 155, 0.4)';
    }
    
    // Normale Box Shadow basierend auf Level
    switch (level) {
      case 1:
        return '-2000px 2000px 5000px rgba(0, 0, 0, 0.25), -3000px 3000px 5000px rgba(0, 0, 0, 0.08)'; // Level 1 - Lichtquelle rechts oben, etwas dunkler und noch breiter (5000px)
      case 2:
        return '0 80px 320px rgba(0, 0, 0, 0.4), 0 320px 640px rgba(0, 0, 0, 0.1)'; // Level 2 - wie Level 3 aber 4x größer skaliert
      case 3:
        return '0 20px 80px rgba(0, 0, 0, 0.4), 0 80px 160px rgba(0, 0, 0, 0.1)'; // Level 3 - dunkler nah am Container mit schnellem Fade
      default:
        return '0 400px 1600px rgba(0, 0, 0, 0.2)'; // Fallback
    }
  };
  
  // Linienfarbe für alle Level einheitlich (wie Level 1)
  const gridLineColor = 'black';
  const gridLineWidth = 2;
  
  // Grid-Konfiguration
  const gridConfig = GRID_TYPES[gridType];
  const cellWidth = containerWidth / gridConfig.cols;
  const cellHeight = containerHeight / gridConfig.rows;
  
  // Grid-Linien berechnen
  const gridLines = [];
  
  // Vertikale Linien (cols - 1 Trennlinien)
  for (let i = 1; i < gridConfig.cols; i++) {
    gridLines.push({
      id: `v-line-${i}`,
      type: 'vertical',
      x1: cellWidth * i,
      y1: 0,
      x2: cellWidth * i,
      y2: containerHeight,
      stroke: gridLineColor,
      strokeWidth: gridLineWidth,
    });
  }
  
  // Horizontale Linien (rows - 1 Trennlinien)
  for (let i = 1; i < gridConfig.rows; i++) {
    gridLines.push({
      id: `h-line-${i}`,
      type: 'horizontal',
      x1: 0,
      y1: cellHeight * i,
      x2: containerWidth,
      y2: cellHeight * i,
      stroke: gridLineColor,
      strokeWidth: gridLineWidth,
    });
  }
  
  // Grid-Zellen erstellen
  const gridCells = [];
  for (let row = 0; row < gridConfig.rows; row++) {
    for (let col = 0; col < gridConfig.cols; col++) {
      const cellNumber = row * gridConfig.cols + col + 1;
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
  
  const nodeStyle = {
    width: `${containerWidth}px`,
    height: `${containerHeight}px`,
    background: backgroundColor, // Dynamische Hintergrundfarbe
    border: 'none',
    borderRadius: `${borderRadius}px`, // Dynamische Border-Radius
    boxShadow: getBoxShadow(level, selected), // Level-spezifische Box Shadow
    transition: 'all 0.3s ease',
    position: 'relative',
    userSelect: 'none',
  };

  // Handle-Styling basierend auf Level anpassen
  const getHandleStyle = () => {
    if (level === 1) {
      // Level 1: Normale sichtbare Handles (wie bisher)
      return {
        background: '#30b89b',
        width: 12,
        height: 12,
        border: '2px solid white',
      };
    } else {
      // Level 2 und höher: Transparente Handles (funktional aber unsichtbar)
      return {
        background: 'transparent',
        width: 12,
        height: 12,
        border: 'none',
        opacity: 0,
      };
    }
  };

  const handleStyle = getHandleStyle();

  return (
    <>
      {/* Handles für Verbindungen - Level-abhängiges Styling */}
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        style={{
          ...handleStyle,
          left: -6,
        }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        style={{
          ...handleStyle,
          right: -6, 
        }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        style={{
          ...handleStyle,
          left: -6,
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        style={{
          ...handleStyle,
          right: -6,
        }}
      />

      {/* Haupt-Container */}
      <div style={nodeStyle}>
        {/* Grid-Linien */}
        <svg
          width={containerWidth}
          height={containerHeight}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: `${borderRadius}px`, // Gleiche Rundung wie Container
            overflow: 'hidden', // Verhindert, dass Linien über die Rundung hinausgehen
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
            className="grid-cell-content"
            style={{
              position: 'absolute',
              left: cell.x,
              top: cell.y,
              width: cell.width,
              height: cell.height,
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: `${Math.min(cell.width, cell.height) * 0.4}px`, // Responsive font size: 40% der kleineren Zell-Dimension
              color: 'rgba(0,0,0,0.1)',
            }}
          >
            {/* Zellen-Nummer anzeigen */}
            {/* {cell.cellNumber} */}
            
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

// Container-Template ohne Position erstellen (für Legacy-Configs)
export const createGridContainerTemplate = (id, gridType, level) => ({
  id,
  type: 'gridContainer',
  data: { 
    gridType, 
    level,
    name: `${gridType} Grid Level ${level}`
  }
});

// Flexible Funktion: Grid-Container mit individueller Position erstellen
export const createGridContainer = (id, gridType, level, position = { x: 0, y: 0 }) => ({
  id,
  type: 'gridContainer',
  position,
  draggable: true,
  selectable: true,
  data: { 
    gridType, 
    level,
    name: `${gridType} Grid Level ${level}`
  }
});

// LEGACY: Alte Funktion für Rückwärtskompatibilität (DEPRECATED)
export const createGridContainerConfig = (id, gridType, level, position) => 
  createGridContainer(id, gridType, level, position);

// LEGACY: Vordefinierte Container-Templates (DEPRECATED - Verwende createGridContainer() stattdessen)
// Diese Templates enthalten KEINE Positionen - Positionen werden bei createGridContainer() individuell gesetzt
export const gridContainerConfigs = {
  // Level 1 (Basis-Größe) - LEGACY TEMPLATES (ohne Position)
  '3er-level-1': createGridContainerTemplate('3erContainer-level-1', '3er', 1),
  '6er-level-1': createGridContainerTemplate('6erContainer-level-1', '6er', 1),
  '9er-level-1': createGridContainerTemplate('9erContainer-level-1', '9er', 1),
  
  // Level 2 (50% der Basis-Größe) - LEGACY TEMPLATES (ohne Position)
  '3er-level-2': createGridContainerTemplate('3erContainer-level-2', '3er', 2),
  '6er-level-2': createGridContainerTemplate('6erContainer-level-2', '6er', 2),
  '9er-level-2': createGridContainerTemplate('9erContainer-level-2', '9er', 2),
  
  // Level 3 (25% der Basis-Größe) - LEGACY TEMPLATES (ohne Position)
  '3er-level-3': createGridContainerTemplate('3erContainer-level-3', '3er', 3),
  '6er-level-3': createGridContainerTemplate('6erContainer-level-3', '6er', 3),
  '9er-level-3': createGridContainerTemplate('9erContainer-level-3', '9er', 3),
};

// Kompatibilität: Alte Konfigurationen
export const gridContainerNodeConfig = gridContainerConfigs['9er-level-1'];
export const gridContainerNodeConfig6er = gridContainerConfigs['6er-level-1'];