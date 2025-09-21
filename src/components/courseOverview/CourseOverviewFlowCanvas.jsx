//App.jsx
import React, { useCallback } from 'react';
import { ReactFlow, Controls, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './CourseOverviewFlowCanvas.css';

// Import der Wrapper-Node-Komponenten
import { FirstWrapperNode, SecondWrapperNode, wrapperNodes } from './WrapperNode/WrapperNode';

// Import der anderen Node-Komponenten
import GridContainerNode, { gridContainerConfigs, createGridContainer } from './GridboxNode/GridContainerNode';
import LerneinheitNode, { nineGridLerneinheiten, nineGridLevel2Lerneinheiten, sixGridLerneinheiten, sixGridLevel2Lerneinheiten } from './Content/LerneinheitNode';
import { createSixGridLerneinheitenWithCorrectDimensions, createSixGridLevel2LerneinheitenWithIcons } from './GridboxNode';
import { calculateSingleIconPosition } from './GridboxNode/positionUtils';
// import { debugCellPositions } from './GridboxNode/gridUtils';
import CircularNode, { circularNodes } from './CircularNode/CircularNode';
import { initialEdges } from './Edges/Edges.jsx';
import CalendarIconNode from './CalendarIconNode';


// Node Types Definition
const nodeTypes = {
  secondWrapper: SecondWrapperNode,
  firstWrapper: FirstWrapperNode,
  circular: CircularNode,
  gridContainer: GridContainerNode,
  lerneinheit: LerneinheitNode,
  calendarIcon: CalendarIconNode,
};



// Initial Nodes
const initialNodes = [
  // Kalender Icon - bei x: 48172, y: -4380 relativ zum FirstWrapper (500px nach links)
  { id: 'calendar-icon', type: 'calendarIcon', position: { x: 48172, y: -4380 }, parentId: 'first-wrapper', data: {} },
  
  // Wrapper Nodes aus WrapperNode.jsx importiert
  ...wrapperNodes,
  // Circular Nodes aus CircularNode.jsx importiert
  ...circularNodes,
  
  // NEUE FLEXIBLE METHODE: Multiple Grid Container mit individuellen Positionen
  // LEVEL 1 UND 2 CONTAINER ZUERST
  // 6er-Grid Level 1 Container (ohne Lerneinheiten) - bei x:0, y:0
  createGridContainer('6erContainer-level-1-main', '6er', 1, { x: 330000, y: 132020 }),
  // 3er-Grid Level 1 Container (ohne Lerneinheiten) - verschoben
  createGridContainer('3erContainer-level-1-main', '3er', 1, { x: 330000, y: 199215 }),
  // 3er-Grid Level 1 Container (ohne Lerneinheiten) - verschoben
  createGridContainer('3erContainer-level-1', '3er', 1, { x: -10000, y: 139216 }),
  // 9er-Grid Level 1 Container
  createGridContainer('9erContainer-level-1', '9er', 1, { x: -10000, y: 64818 }),
  // 6er-Grid Level 1 Container  
  createGridContainer('6erContainer-level-1', '6er', 1, { x: -10000, y: 192020 }),
  // 6er-Grid Level 2 Container (ohne Lerneinheiten)
  createGridContainer('6erContainer-level-2', '6er', 2, { x: 263000, y: 75067 }),
  // 9er-Grid Level 2 Container
  createGridContainer('9erContainer-level-2', '9er', 2, { x: 263000, y: 62900 }),
  // 3er-Grid Level 2 Container (ohne Lerneinheiten)
  createGridContainer('3erContainer-level-2', '3er', 2, { x: 302000, y: 75970 }),
  
  // BEISPIEL: Weitere 9er-Grid Container mit verschiedenen Positionen
  // createGridContainer('another-9er-grid', '9er', 1, { x: 100000, y: 64000 }),
  // createGridContainer('third-9er-grid', '9er', 1, { x: 200000, y: 64000 }),
  
  // Lerneinheiten für das 9er Grid
  ...nineGridLerneinheiten,
  // Lerneinheiten für das 9er Grid Level 2
  ...nineGridLevel2Lerneinheiten,
  // Lerneinheiten für das 6er Grid Level 2
  ...sixGridLevel2Lerneinheiten,
  // 5 Lerneinheiten für das 6er Grid OHNE Icons
  ...createSixGridLerneinheitenWithCorrectDimensions(),
  
  // Lerneinheit für das 3er Grid Level 2 - Zelle 1
  {
    id: 'three-grid-level2-lerneinheit-1',
    type: 'lerneinheit',
    position: (() => {
      // 3er-Grid Level 2 Container-Dimensionen: 57600 * 0.125 = 7200 (Breite), 14400 * 0.125 = 1800 (Höhe)
      const containerWidth = 57600 * 0.125; // 7200
      const containerHeight = 14400 * 0.125; // 1800
      const lerneinheitWidth = 18000 * 0.125; // 2250
      const lerneinheitHeight = 12000 * 0.125; // 1500
      
      // Zelle 1 ist die erste (und einzige) Zeile, erste Spalte
      // Zellen-Dimensionen: containerWidth / 3 = 2400 (pro Zelle)
      const cellWidth = containerWidth / 3; // 2400
      const cellHeight = containerHeight; // 1800 (nur eine Zeile)
      
      // Position in Zelle 1: zentriert
      const cellX = 0; // Erste Spalte
      const cellY = 0; // Erste (und einzige) Zeile
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      console.log('3er-Grid Level 2 Positionierung:', {
        containerSize: `${containerWidth}x${containerHeight}`,
        cellSize: `${cellWidth}x${cellHeight}`,
        lerneinheitSize: `${lerneinheitWidth}x${lerneinheitHeight}`,
        finalPosition: `${centeredX},${centeredY}`
      });
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '3erContainer-level-2',
    data: {
      title: '3er L2 Lerneinheit 1',
      // SKALIERTE Größen für Level 2 (12.5% der Basis-Größe)
      width: 18000 * 0.125, // 2250
      height: 12000 * 0.125, // 1500
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      // SKALIERTE Schriftgröße für Level 2
      fontSize: 960 * 0.125, // 120
      imageSource: 'pic1',
      statusIcons: [
        {
          type: 'startedIcon',
          x: 0.083, // 8.33% der Breite (relative Position)
          y: 0.05,  // 5% der Höhe (relative Position)
        },
        {
          type: 'favoritIcon',
          x: 0.583, // 58.33% der Breite (relative Position)
          y: 0.05,  // 5% der Höhe (relative Position)
        }
      ],
    },
  },
  
  // Lerneinheit für das 3er Grid Level 1 - Zelle 1 (ohne Icons)
  {
    id: 'three-grid-level1-lerneinheit-1',
    type: 'lerneinheit',
    position: (() => {
      // 3er-Grid Level 1 Container-Dimensionen: 57600 (Breite) x 14400 (Höhe)
      const containerWidth = 57600;
      const containerHeight = 14400;
      const lerneinheitWidth = 18000; // Standard Level 1 Größe
      const lerneinheitHeight = 12000; // Standard Level 1 Größe
      
      // Zelle 1 ist die erste Spalte
      // Zellen-Dimensionen: containerWidth / 3 = 19200 (pro Zelle)
      const cellWidth = containerWidth / 3; // 19200
      const cellHeight = containerHeight; // 14400 (nur eine Zeile)
      
      // Position in Zelle 1: zentriert
      const cellX = 0; // Erste Spalte
      const cellY = 0; // Erste (und einzige) Zeile
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      console.log('3er-Grid Level 1 Positionierung:', {
        containerSize: `${containerWidth}x${containerHeight}`,
        cellSize: `${cellWidth}x${cellHeight}`,
        lerneinheitSize: `${lerneinheitWidth}x${lerneinheitHeight}`,
        finalPosition: `${centeredX},${centeredY}`
      });
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '3erContainer-level-1',
    data: {
      title: '3er L1 Lerneinheit 1',
      // Standard Level 1 Größen
      width: 18000,
      height: 12000,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960,
      imageSource: 'pic1',
      // Keine statusIcons - komplett ohne Icons
    },
  },
  
  // Lerneinheit 1 für das 3er Grid Level 1 Main Container - Zelle 1 (ohne Icons)
  {
    id: 'three-grid-main-lerneinheit-1',
    type: 'lerneinheit',
    position: (() => {
      // 3er-Grid Level 1 Container-Dimensionen: 57600 (Breite) x 14400 (Höhe)
      const containerWidth = 57600;
      const containerHeight = 14400;
      const lerneinheitWidth = 18000; // Standard Level 1 Größe
      const lerneinheitHeight = 12000; // Standard Level 1 Größe
      
      // Zelle 1 ist die erste Spalte
      const cellWidth = containerWidth / 3; // 19200
      const cellHeight = containerHeight; // 14400
      
      // Position in Zelle 1: zentriert
      const cellX = 0; // Erste Spalte
      const cellY = 0;
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '3erContainer-level-1-main',
    data: {
      title: '3er Main Lerneinheit 1',
      width: 18000,
      height: 12000,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960,
      imageSource: 'pic1',
      statusIcons: [
        {
          type: 'lockedIcon',
          ...(() => {
            // Berechne die korrekte Single-Icon Position mit calculateSingleIconPosition
            const lerneinheitWidth = 18000;
            const lerneinheitHeight = 12000;
            const iconWidth = 6000;
            const iconHeight = 6000;
            
            const iconPosition = calculateSingleIconPosition(
              { x: 0.5, y: 0.3 }, // Mittig horizontal, 30% vertikal
              lerneinheitWidth,
              lerneinheitHeight,
              iconWidth,
              iconHeight
            );
            
            return {
              x: iconPosition.centerIcon.x,
              y: iconPosition.centerIcon.y
            };
          })()
        }
      ]
    },
  },
  
  // Lerneinheit 2 für das 3er Grid Level 1 Main Container - Zelle 2 (ohne Icons)
  {
    id: 'three-grid-main-lerneinheit-2',
    type: 'lerneinheit',
    position: (() => {
      // 3er-Grid Level 1 Container-Dimensionen: 57600 (Breite) x 14400 (Höhe)
      const containerWidth = 57600;
      const containerHeight = 14400;
      const lerneinheitWidth = 18000; // Standard Level 1 Größe
      const lerneinheitHeight = 12000; // Standard Level 1 Größe
      
      // Zelle 2 ist die zweite Spalte
      const cellWidth = containerWidth / 3; // 19200
      const cellHeight = containerHeight; // 14400
      
      // Position in Zelle 2: zentriert
      const cellX = cellWidth; // Zweite Spalte
      const cellY = 0;
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '3erContainer-level-1-main',
    data: {
      title: '3er Main Lerneinheit 2',
      width: 18000,
      height: 12000,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960,
      imageSource: 'pic2',
      statusIcons: [
        {
          type: 'lockedIcon',
          ...(() => {
            // Berechne die korrekte Single-Icon Position mit calculateSingleIconPosition
            const lerneinheitWidth = 18000;
            const lerneinheitHeight = 12000;
            const iconWidth = 6000;
            const iconHeight = 6000;
            
            const iconPosition = calculateSingleIconPosition(
              { x: 0.5, y: 0.3 }, // Mittig horizontal, 30% vertikal
              lerneinheitWidth,
              lerneinheitHeight,
              iconWidth,
              iconHeight
            );
            
            return {
              x: iconPosition.centerIcon.x,
              y: iconPosition.centerIcon.y
            };
          })()
        }
      ]
    },
  },
  
  // Lerneinheit 1 für das 6er Grid Level 1 Main Container - Zelle 1 (ohne Icons)
  {
    id: 'six-grid-main-lerneinheit-1',
    type: 'lerneinheit',
    position: (() => {
      // 6er-Grid Level 1 Container-Dimensionen: 57600 (Breite) x 28800 (Höhe)
      const containerWidth = 57600;
      const containerHeight = 28800;
      const lerneinheitWidth = 18000; // Standard Level 1 Größe
      const lerneinheitHeight = 12000; // Standard Level 1 Größe
      
      // Zelle 1: Erste Spalte, erste Zeile
      const cellWidth = containerWidth / 3; // 19200
      const cellHeight = containerHeight / 2; // 14400
      
      const cellX = 0; // Erste Spalte
      const cellY = 0; // Erste Zeile
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '6erContainer-level-1-main',
    data: {
      title: '6er Main Lerneinheit 1',
      width: 18000,
      height: 12000,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960,
      imageSource: 'pic1',
      // Keine statusIcons - komplett ohne Icons
    },
  },
  
  // Lerneinheit 2 für das 6er Grid Level 1 Main Container - Zelle 2 (ohne Icons)
  {
    id: 'six-grid-main-lerneinheit-2',
    type: 'lerneinheit',
    position: (() => {
      const containerWidth = 57600;
      const containerHeight = 28800;
      const lerneinheitWidth = 18000;
      const lerneinheitHeight = 12000;
      
      // Zelle 2: Zweite Spalte, erste Zeile
      const cellWidth = containerWidth / 3; // 19200
      const cellHeight = containerHeight / 2; // 14400
      
      const cellX = cellWidth; // Zweite Spalte
      const cellY = 0; // Erste Zeile
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '6erContainer-level-1-main',
    data: {
      title: '6er Main Lerneinheit 2',
      width: 18000,
      height: 12000,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960,
      imageSource: 'pic2',
      statusIcons: [
        {
          type: 'doneIcon',
          ...(() => {
            // Berechne die korrekte Single-Icon Position mit calculateSingleIconPosition
            const lerneinheitWidth = 18000;
            const lerneinheitHeight = 12000;
            const iconWidth = 6000;
            const iconHeight = 6000;
            
            const iconPosition = calculateSingleIconPosition(
              { x: 0.5, y: 0.3 }, // Gewünschte relative Position: 50% Breite, 30% Höhe
              lerneinheitWidth,   // Lerneinheit-Breite
              lerneinheitHeight,  // Lerneinheit-Höhe
              iconWidth,          // Icon-Breite
              iconHeight          // Icon-Höhe
            );
            
            return {
              x: iconPosition.centerIcon.x, // Bereits zentrierte relative Position
              y: iconPosition.centerIcon.y, // Bereits zentrierte relative Position
            };
          })()
        }
      ],
    },
  },
  
  // Lerneinheit 3 für das 6er Grid Level 1 Main Container - Zelle 3 (ohne Icons)
  {
    id: 'six-grid-main-lerneinheit-3',
    type: 'lerneinheit',
    position: (() => {
      const containerWidth = 57600;
      const containerHeight = 28800;
      const lerneinheitWidth = 18000;
      const lerneinheitHeight = 12000;
      
      // Zelle 3: Dritte Spalte, erste Zeile
      const cellWidth = containerWidth / 3; // 19200
      const cellHeight = containerHeight / 2; // 14400
      
      const cellX = 2 * cellWidth; // Dritte Spalte
      const cellY = 0; // Erste Zeile
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '6erContainer-level-1-main',
    data: {
      title: '6er Main Lerneinheit 3',
      width: 18000,
      height: 12000,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960,
      imageSource: 'pic3',
      // Keine statusIcons - komplett ohne Icons
    },
  },
  
  // Lerneinheit 4 für das 6er Grid Level 1 Main Container - Zelle 4 (ohne Icons)
  {
    id: 'six-grid-main-lerneinheit-4',
    type: 'lerneinheit',
    position: (() => {
      const containerWidth = 57600;
      const containerHeight = 28800;
      const lerneinheitWidth = 18000;
      const lerneinheitHeight = 12000;
      
      // Zelle 4: Erste Spalte, zweite Zeile
      const cellWidth = containerWidth / 3; // 19200
      const cellHeight = containerHeight / 2; // 14400
      
      const cellX = 0; // Erste Spalte
      const cellY = cellHeight; // Zweite Zeile
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '6erContainer-level-1-main',
    data: {
      title: '6er Main Lerneinheit 4',
      width: 18000,
      height: 12000,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960,
      imageSource: 'pic1',
      statusIcons: [
        {
          type: 'doneIcon',
          ...(() => {
            // Berechne die korrekte Single-Icon Position mit calculateSingleIconPosition
            const lerneinheitWidth = 18000;
            const lerneinheitHeight = 12000;
            const iconWidth = 6000;
            const iconHeight = 6000;
            
            const iconPosition = calculateSingleIconPosition(
              { x: 0.5, y: 0.3 }, // Gewünschte relative Position: 50% Breite, 30% Höhe
              lerneinheitWidth,   // Lerneinheit-Breite
              lerneinheitHeight,  // Lerneinheit-Höhe
              iconWidth,          // Icon-Breite
              iconHeight          // Icon-Höhe
            );
            
            return {
              x: iconPosition.centerIcon.x, // Bereits zentrierte relative Position
              y: iconPosition.centerIcon.y, // Bereits zentrierte relative Position
            };
          })()
        }
      ],
    },
  },
  
  // Lerneinheit für das 3er Grid Level 3 - Zelle 1
  {
    id: 'three-grid-level3-lerneinheit-1',
    type: 'lerneinheit',
    position: (() => {
      // 3er-Grid Level 3 Container-Dimensionen mit Level 3 Skalierung
      const containerWidth = 57600 * 0.01215; // 700
      const containerHeight = 14400 * 0.01215; // 175
      const lerneinheitWidth = 18000 * 0.01215; // 218.7
      const lerneinheitHeight = 12000 * 0.01215; // 145.8
      
      // Zelle 1: Erste Spalte (3×1 Grid)
      const cellWidth = containerWidth / 3; // 233.33
      const cellHeight = containerHeight; // 175 (volle Höhe)
      
      // Position in Zelle 1: zentriert
      const cellX = 0; // Erste Spalte
      const cellY = 0;
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      console.log('3er-Grid Level 3 Positionierung:', {
        containerSize: `${containerWidth}x${containerHeight}`,
        cellSize: `${cellWidth}x${cellHeight}`,
        lerneinheitSize: `${lerneinheitWidth}x${lerneinheitHeight}`,
        finalPosition: `${centeredX},${centeredY}`
      });
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '3erContainer-level-3',
    data: {
      title: '3er L3 Lerneinheit 1',
      // SKALIERTE Größen für Level 3 (1.215% der Basis-Größe)
      width: 18000 * 0.01215, // 218.7
      height: 12000 * 0.01215, // 145.8
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      // SKALIERTE Schriftgröße für Level 3
      fontSize: 960 * 0.01215, // 11.66
      imageSource: 'pic1',
      // Keine statusIcons
    },
  },
  
  // 8 Lerneinheiten für das 9er-Grid Level 3 (ohne Icons) - Zellen 1-8
  // Lerneinheit 1 - Zelle 1
  {
    id: 'nine-grid-level3-lerneinheit-1',
    type: 'lerneinheit',
    position: (() => {
      const containerWidth = 57600 * 0.01215; // 700
      const containerHeight = 43200 * 0.01215; // 525
      const lerneinheitWidth = 18000 * 0.01215; // 218.7
      const lerneinheitHeight = 12000 * 0.01215; // 145.8
      
      const cellWidth = containerWidth / 3; // 233.33
      const cellHeight = containerHeight / 3; // 175
      
      // Zelle 1: Erste Spalte, erste Zeile
      const cellX = 0;
      const cellY = 0;
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '9erContainer-level-3',
    data: {
      title: '9er L3 Lerneinheit 1',
      width: 18000 * 0.01215, // 218.7
      height: 12000 * 0.01215, // 145.8
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960 * 0.01215, // 11.66
      imageSource: 'pic1',
      statusIcons: [
        {
          type: 'doneIcon',
          ...(() => {
            const lerneinheitWidth = 18000 * 0.01215;
            const lerneinheitHeight = 12000 * 0.01215;
            const scaleRatio = Math.min(lerneinheitWidth / 18000, lerneinheitHeight / 12000);
            const actualIconSize = 20 * 300 * scaleRatio;
            
            const iconPosition = calculateSingleIconPosition(
              { x: 0.5, y: 0.3 },
              lerneinheitWidth,
              lerneinheitHeight,
              actualIconSize,
              actualIconSize
            );
            return {
              x: iconPosition.centerIcon.x,
              y: iconPosition.centerIcon.y,
              offsetX: iconPosition.calculations.offsetX,
              offsetY: iconPosition.calculations.offsetY
            };
          })()
        }
      ],
    },
  },
  
  // Lerneinheit 2 - Zelle 2
  {
    id: 'nine-grid-level3-lerneinheit-2',
    type: 'lerneinheit',
    position: (() => {
      const containerWidth = 57600 * 0.01215;
      const containerHeight = 43200 * 0.01215;
      const lerneinheitWidth = 18000 * 0.01215;
      const lerneinheitHeight = 12000 * 0.01215;
      
      const cellWidth = containerWidth / 3;
      const cellHeight = containerHeight / 3;
      
      // Zelle 2: Zweite Spalte, erste Zeile
      const cellX = cellWidth;
      const cellY = 0;
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '9erContainer-level-3',
    data: {
      title: '9er L3 Lerneinheit 2',
      width: 18000 * 0.01215,
      height: 12000 * 0.01215,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960 * 0.01215,
      imageSource: 'pic2',
    },
  },
  
  // Lerneinheit 3 - Zelle 3
  {
    id: 'nine-grid-level3-lerneinheit-3',
    type: 'lerneinheit',
    position: (() => {
      const containerWidth = 57600 * 0.01215;
      const containerHeight = 43200 * 0.01215;
      const lerneinheitWidth = 18000 * 0.01215;
      const lerneinheitHeight = 12000 * 0.01215;
      
      const cellWidth = containerWidth / 3;
      const cellHeight = containerHeight / 3;
      
      // Zelle 3: Dritte Spalte, erste Zeile
      const cellX = 2 * cellWidth;
      const cellY = 0;
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '9erContainer-level-3',
    data: {
      title: '9er L3 Lerneinheit 3',
      width: 18000 * 0.01215,
      height: 12000 * 0.01215,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960 * 0.01215,
      imageSource: 'pic3',
    },
  },
  
  // Lerneinheit 4 - Zelle 4
  {
    id: 'nine-grid-level3-lerneinheit-4',
    type: 'lerneinheit',
    position: (() => {
      const containerWidth = 57600 * 0.01215;
      const containerHeight = 43200 * 0.01215;
      const lerneinheitWidth = 18000 * 0.01215;
      const lerneinheitHeight = 12000 * 0.01215;
      
      const cellWidth = containerWidth / 3;
      const cellHeight = containerHeight / 3;
      
      // Zelle 4: Erste Spalte, zweite Zeile
      const cellX = 0;
      const cellY = cellHeight;
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '9erContainer-level-3',
    data: {
      title: '9er L3 Lerneinheit 4',
      width: 18000 * 0.01215,
      height: 12000 * 0.01215,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960 * 0.01215,
      imageSource: 'pic4',
    },
  },
  
  // Lerneinheit 5 - Zelle 5
  {
    id: 'nine-grid-level3-lerneinheit-5',
    type: 'lerneinheit',
    position: (() => {
      const containerWidth = 57600 * 0.01215;
      const containerHeight = 43200 * 0.01215;
      const lerneinheitWidth = 18000 * 0.01215;
      const lerneinheitHeight = 12000 * 0.01215;
      
      const cellWidth = containerWidth / 3;
      const cellHeight = containerHeight / 3;
      
      // Zelle 5: Zweite Spalte, zweite Zeile
      const cellX = cellWidth;
      const cellY = cellHeight;
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '9erContainer-level-3',
    data: {
      title: '9er L3 Lerneinheit 5',
      width: 18000 * 0.01215,
      height: 12000 * 0.01215,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960 * 0.01215,
      imageSource: 'pic5',
      statusIcons: [
        {
          type: 'doneIcon',
          ...(() => {
            const lerneinheitWidth = 18000 * 0.01215;
            const lerneinheitHeight = 12000 * 0.01215;
            const scaleRatio = Math.min(lerneinheitWidth / 18000, lerneinheitHeight / 12000);
            const actualIconSize = 20 * 300 * scaleRatio;
            
            const iconPosition = calculateSingleIconPosition(
              { x: 0.5, y: 0.3 },
              lerneinheitWidth,
              lerneinheitHeight,
              actualIconSize,
              actualIconSize
            );
            return {
              x: iconPosition.centerIcon.x,
              y: iconPosition.centerIcon.y,
              offsetX: iconPosition.calculations.offsetX,
              offsetY: iconPosition.calculations.offsetY
            };
          })()
        }
      ],
    },
  },
  
  // Lerneinheit 6 - Zelle 6
  {
    id: 'nine-grid-level3-lerneinheit-6',
    type: 'lerneinheit',
    position: (() => {
      const containerWidth = 57600 * 0.01215;
      const containerHeight = 43200 * 0.01215;
      const lerneinheitWidth = 18000 * 0.01215;
      const lerneinheitHeight = 12000 * 0.01215;
      
      const cellWidth = containerWidth / 3;
      const cellHeight = containerHeight / 3;
      
      // Zelle 6: Dritte Spalte, zweite Zeile
      const cellX = 2 * cellWidth;
      const cellY = cellHeight;
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '9erContainer-level-3',
    data: {
      title: '9er L3 Lerneinheit 6',
      width: 18000 * 0.01215,
      height: 12000 * 0.01215,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960 * 0.01215,
      imageSource: 'pic6',
    },
  },
  
  // Lerneinheit 7 - Zelle 7
  {
    id: 'nine-grid-level3-lerneinheit-7',
    type: 'lerneinheit',
    position: (() => {
      const containerWidth = 57600 * 0.01215;
      const containerHeight = 43200 * 0.01215;
      const lerneinheitWidth = 18000 * 0.01215;
      const lerneinheitHeight = 12000 * 0.01215;
      
      const cellWidth = containerWidth / 3;
      const cellHeight = containerHeight / 3;
      
      // Zelle 7: Erste Spalte, dritte Zeile
      const cellX = 0;
      const cellY = 2 * cellHeight;
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '9erContainer-level-3',
    data: {
      title: '9er L3 Lerneinheit 7',
      width: 18000 * 0.01215,
      height: 12000 * 0.01215,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960 * 0.01215,
      imageSource: 'pic7',
    },
  },
  
  // Lerneinheit 8 - Zelle 8
  {
    id: 'nine-grid-level3-lerneinheit-8',
    type: 'lerneinheit',
    position: (() => {
      const containerWidth = 57600 * 0.01215;
      const containerHeight = 43200 * 0.01215;
      const lerneinheitWidth = 18000 * 0.01215;
      const lerneinheitHeight = 12000 * 0.01215;
      
      const cellWidth = containerWidth / 3;
      const cellHeight = containerHeight / 3;
      
      // Zelle 8: Zweite Spalte, dritte Zeile
      const cellX = cellWidth;
      const cellY = 2 * cellHeight;
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '9erContainer-level-3',
    data: {
      title: '9er L3 Lerneinheit 8',
      width: 18000 * 0.01215,
      height: 12000 * 0.01215,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960 * 0.01215,
      imageSource: 'pic8',
      statusIcons: [
        {
          type: 'doneIcon',
          ...(() => {
            const lerneinheitWidth = 18000 * 0.01215;
            const lerneinheitHeight = 12000 * 0.01215;
            const scaleRatio = Math.min(lerneinheitWidth / 18000, lerneinheitHeight / 12000);
            const actualIconSize = 20 * 300 * scaleRatio;
            
            const iconPosition = calculateSingleIconPosition(
              { x: 0.5, y: 0.3 },
              lerneinheitWidth,
              lerneinheitHeight,
              actualIconSize,
              actualIconSize
            );
            return {
              x: iconPosition.centerIcon.x,
              y: iconPosition.centerIcon.y,
              offsetX: iconPosition.calculations.offsetX,
              offsetY: iconPosition.calculations.offsetY
            };
          })()
        }
      ],
    },
  },
  
  // Zelle 9 bleibt leer (keine Lerneinheit)
  
  // 4 Lerneinheiten für das 6er-Grid Level 3 (ohne Icons) - Zellen 1-4
  // Lerneinheit 1 - Zelle 1
  {
    id: 'six-grid-level3-lerneinheit-1',
    type: 'lerneinheit',
    position: (() => {
      const containerWidth = 57600 * 0.01215; // 700
      const containerHeight = 28800 * 0.01215; // 350
      const lerneinheitWidth = 18000 * 0.01215; // 218.7
      const lerneinheitHeight = 12000 * 0.01215; // 145.8
      
      const cellWidth = containerWidth / 3; // 233.33
      const cellHeight = containerHeight / 2; // 175
      
      // Zelle 1: Erste Spalte, erste Zeile
      const cellX = 0;
      const cellY = 0;
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '6erContainer-level-3',
    data: {
      title: '6er L3 Lerneinheit 1',
      width: 18000 * 0.01215, // 218.7
      height: 12000 * 0.01215, // 145.8
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960 * 0.01215, // 11.66
      imageSource: 'pic1',
    },
  },
  
  // Lerneinheit 2 - Zelle 2
  {
    id: 'six-grid-level3-lerneinheit-2',
    type: 'lerneinheit',
    position: (() => {
      const containerWidth = 57600 * 0.01215;
      const containerHeight = 28800 * 0.01215;
      const lerneinheitWidth = 18000 * 0.01215;
      const lerneinheitHeight = 12000 * 0.01215;
      
      const cellWidth = containerWidth / 3;
      const cellHeight = containerHeight / 2;
      
      // Zelle 2: Zweite Spalte, erste Zeile
      const cellX = cellWidth;
      const cellY = 0;
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '6erContainer-level-3',
    data: {
      title: '6er L3 Lerneinheit 2',
      width: 18000 * 0.01215,
      height: 12000 * 0.01215,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960 * 0.01215,
      imageSource: 'pic2',
    },
  },
  
  // Lerneinheit 3 - Zelle 3
  {
    id: 'six-grid-level3-lerneinheit-3',
    type: 'lerneinheit',
    position: (() => {
      const containerWidth = 57600 * 0.01215;
      const containerHeight = 28800 * 0.01215;
      const lerneinheitWidth = 18000 * 0.01215;
      const lerneinheitHeight = 12000 * 0.01215;
      
      const cellWidth = containerWidth / 3;
      const cellHeight = containerHeight / 2;
      
      // Zelle 3: Dritte Spalte, erste Zeile
      const cellX = 2 * cellWidth;
      const cellY = 0;
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '6erContainer-level-3',
    data: {
      title: '6er L3 Lerneinheit 3',
      width: 18000 * 0.01215,
      height: 12000 * 0.01215,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960 * 0.01215,
      imageSource: 'pic3',
    },
  },
  
  // Lerneinheit 4 - Zelle 4
  {
    id: 'six-grid-level3-lerneinheit-4',
    type: 'lerneinheit',
    position: (() => {
      const containerWidth = 57600 * 0.01215;
      const containerHeight = 28800 * 0.01215;
      const lerneinheitWidth = 18000 * 0.01215;
      const lerneinheitHeight = 12000 * 0.01215;
      
      const cellWidth = containerWidth / 3;
      const cellHeight = containerHeight / 2;
      
      // Zelle 4: Erste Spalte, zweite Zeile
      const cellX = 0;
      const cellY = cellHeight;
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '6erContainer-level-3',
    data: {
      title: '6er L3 Lerneinheit 4',
      width: 18000 * 0.01215,
      height: 12000 * 0.01215,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 960 * 0.01215,
      imageSource: 'pic4',
    },
  },
  
  // Zellen 5 und 6 bleiben leer
  
  // Lerneinheit für das zweite 3er Grid Level 3 - Zelle 1
  {
    id: 'three-grid-level3-second-lerneinheit-1',
    type: 'lerneinheit',
    position: (() => {
      // 3er-Grid Level 3 Container-Dimensionen mit Level 3 Skalierung
      const containerWidth = 57600 * 0.01215; // 700
      const containerHeight = 14400 * 0.01215; // 175
      const lerneinheitWidth = 18000 * 0.01215; // 218.7
      const lerneinheitHeight = 12000 * 0.01215; // 145.8
      
      // Zelle 1: Erste Spalte (3×1 Grid)
      const cellWidth = containerWidth / 3; // 233.33
      const cellHeight = containerHeight; // 175 (volle Höhe)
      
      // Position in Zelle 1: zentriert
      const cellX = 0; // Erste Spalte
      const cellY = 0;
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      console.log('Zweiter 3er-Grid Level 3 Positionierung:', {
        containerSize: `${containerWidth}x${containerHeight}`,
        cellSize: `${cellWidth}x${cellHeight}`,
        lerneinheitSize: `${lerneinheitWidth}x${lerneinheitHeight}`,
        finalPosition: `${centeredX},${centeredY}`
      });
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '3erContainer-level-3-second',
    data: {
      title: '3er L3 Second Lerneinheit 1',
      // SKALIERTE Größen für Level 3 (1.215% der Basis-Größe)
      width: 18000 * 0.01215, // 218.7
      height: 12000 * 0.01215, // 145.8
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      // SKALIERTE Schriftgröße für Level 3
      fontSize: 960 * 0.01215, // 11.66
      imageSource: 'pic9',
      // Keine statusIcons
    },
  },
  
  // Lerneinheit für das dritte 3er Grid Level 3 - Zelle 1
  {
    id: 'three-grid-level3-third-lerneinheit-1',
    type: 'lerneinheit',
    position: (() => {
      // 3er-Grid Level 3 Container-Dimensionen mit Level 3 Skalierung
      const containerWidth = 57600 * 0.01215; // 700
      const containerHeight = 14400 * 0.01215; // 175
      const lerneinheitWidth = 18000 * 0.01215; // 218.7
      const lerneinheitHeight = 12000 * 0.01215; // 145.8
      
      // Zelle 1: Erste Spalte (3×1 Grid)
      const cellWidth = containerWidth / 3; // 233.33
      const cellHeight = containerHeight; // 175 (volle Höhe)
      
      // Position in Zelle 1: zentriert
      const cellX = 0; // Erste Spalte
      const cellY = 0;
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '3erContainer-level-3-third',
    data: {
      title: '3er L3 Third Lerneinheit 1',
      // SKALIERTE Größen für Level 3 (1.215% der Basis-Größe)
      width: 18000 * 0.01215, // 218.7
      height: 12000 * 0.01215, // 145.8
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      // SKALIERTE Schriftgröße für Level 3
      fontSize: 960 * 0.01215, // 11.66
      imageSource: 'pic10',
      // Keine statusIcons
    },
  },
  
  // Lerneinheit für das dritte 3er Grid Level 3 - Zelle 2
  {
    id: 'three-grid-level3-third-lerneinheit-2',
    type: 'lerneinheit',
    position: (() => {
      // 3er-Grid Level 3 Container-Dimensionen mit Level 3 Skalierung
      const containerWidth = 57600 * 0.01215; // 700
      const containerHeight = 14400 * 0.01215; // 175
      const lerneinheitWidth = 18000 * 0.01215; // 218.7
      const lerneinheitHeight = 12000 * 0.01215; // 145.8
      
      // Zelle 2: Zweite Spalte (3×1 Grid)
      const cellWidth = containerWidth / 3; // 233.33
      const cellHeight = containerHeight; // 175 (volle Höhe)
      
      // Position in Zelle 2: zentriert
      const cellX = cellWidth; // Zweite Spalte
      const cellY = 0;
      const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
      const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
      
      return { x: centeredX, y: centeredY };
    })(),
    parentId: '3erContainer-level-3-third',
    data: {
      title: '3er L3 Third Lerneinheit 2',
      // SKALIERTE Größen für Level 3 (1.215% der Basis-Größe)
      width: 18000 * 0.01215, // 218.7
      height: 12000 * 0.01215, // 145.8
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      // SKALIERTE Schriftgröße für Level 3
      fontSize: 960 * 0.01215, // 11.66
      imageSource: 'pic11',
      // Keine statusIcons
    },
  },
];

// LEVEL 3 CONTAINER ALS CHILDREN DES SECONDWRAPPER
const level3Containers = [
  // 9er-Grid Level 3 Container (ohne Lerneinheiten) - als Child des SecondWrapper
  {
    ...createGridContainer('9erContainer-level-3', '9er', 3, { x: 1030, y: 1698 }),
    parentId: 'second-wrapper'
  },
  // 3er-Grid Level 3 Container (dritter) - als Child des SecondWrapper
  {
    ...createGridContainer('3erContainer-level-3-third', '3er', 3, { x: 1030, y: 2736 }),
    parentId: 'second-wrapper'
  },
  // 3er-Grid Level 3 Container (zweiter) - als Child des SecondWrapper
  {
    ...createGridContainer('3erContainer-level-3-second', '3er', 3, { x: 1030, y: 1037 }),
    parentId: 'second-wrapper'
  },
  // 3er-Grid Level 3 Container (erster) - als Child des SecondWrapper
  {
    ...createGridContainer('3erContainer-level-3', '3er', 3, { x: 4900, y: 1037 }),
    parentId: 'second-wrapper'
  },
  // 6er-Grid Level 3 Container (ohne Lerneinheiten) - als Child des SecondWrapper
  {
    ...createGridContainer('6erContainer-level-3', '6er', 3, { x: 4900, y: 1786 }),
    parentId: 'second-wrapper'
  },
];

// FINALES NODES ARRAY - LEVEL 3 CONTAINER GANZ AM ENDE
const finalNodes = [
  ...initialNodes,
  ...level3Containers
];

  // FlowApp Komponente
function FlowApp() {
  const { getViewport, setViewport } = useReactFlow();

  // smoothZoomToNode anpassen, damit nodeSize übergeben werden kann
  const smoothZoomToNode = useCallback((node, targetZoom = 1.2, duration = 1200, nodeSize = 880) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const nodeCenterX = node.position.x + nodeSize / 2;
    const nodeCenterY = node.position.y + nodeSize / 2;
    const targetX = -(nodeCenterX * targetZoom) + viewportWidth / 2;
    const targetY = -(nodeCenterY * targetZoom) + viewportHeight / 2;

    const start = getViewport();
    const startTime = performance.now();

    function animate(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const zoom = start.zoom + (targetZoom - start.zoom) * ease;
      const x = start.x + (targetX - start.x) * ease;
      const y = start.y + (targetY - start.y) * ease;
      setViewport({ x, y, zoom, duration: 0 });
      if (t < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  }, [getViewport, setViewport]);

  // fitContainerView anpassen, damit nodeSize übergeben werden kann
  const fitContainerView = useCallback((containerId) => {
    const node = finalNodes.find(node => node.id === containerId);
    if (node) {
      const nodeSize = 880; // Standard-Node-Größe für Container
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const nodeCenterX = node.position.x + nodeSize / 2;
      const nodeCenterY = node.position.y + nodeSize / 2;
      const targetX = -(nodeCenterX * 1.2) + viewportWidth / 2; // Zoom auf 1.2
      const targetY = -(nodeCenterY * 1.2) + viewportHeight / 2; // Zoom auf 1.2

      const start = getViewport();
      const startTime = performance.now();

      function animate(now) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / 1200, 1); // Dauer für Zoom
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const zoom = start.zoom + (1.2 - start.zoom) * ease;
        const x = start.x + (targetX - start.x) * ease;
        const y = start.y + (targetY - start.y) * ease;
        setViewport({ x, y, zoom, duration: 0 });
        if (t < 1) {
          requestAnimationFrame(animate);
        }
      }
      requestAnimationFrame(animate);
    }
  }, [getViewport, setViewport, finalNodes]);


  // onNodeClick erweitern
  const onNodeClick = useCallback((event, node) => {
    if (node.id === 'three-level-central-node') {
      smoothZoomToNode(node, 1.2, 1200, 880); // zentrale Node
    } else if (node.type === 'category' || node.type === 'threeLevelCategory') {
      smoothZoomToNode(node, 1.2, 1200, 640); // Kategorie-Nodes
    } else if (node.type === 'gridContainer') {
      // Container-Node angeklickt - fit view
      fitContainerView(node.id);
    }
  }, [smoothZoomToNode, fitContainerView]);

  return (
    <div style={{ height: '100vh', width: '100vw', background: 'radial-gradient(circle, #ffffff 45%, #c1c1c1 100%)' }}>
      <ReactFlow
        nodes={finalNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView={true}
        minZoom={0.0001} // Erweiterte Zoom-Grenzen für sehr große Container
        maxZoom={20} // Höherer Max-Zoom für detaillierte Ansicht
        defaultViewport={{ x: -10000, y: 64000, zoom: 0.3 }} // Startet mit kleinerem Zoom
        onNodeClick={onNodeClick}
        onNodeDoubleClick={(event, node) => {
          // Doppelklick-Handler für spezielle Aktionen
          if (node.type === 'gridContainer') {
            fitContainerView(node.id);
          }
        }}
        onViewportChange={(viewport) => {
          // Hier können später haptische Rückmeldungen hinzugefügt werden
          console.log('Viewport geändert:', viewport);
        }}
        nodesDraggable={true}
        nodesConnectable={true}
        elementsSelectable={true}
        zoomOnPinch={true}
        panOnDrag={[2]} // Canvas-Panning nur mit rechter Maustaste
        zoomOnScroll={true}
        panOnScroll={true} // Panning mit Shift+Scroll aktivieren
        zoomOnDoubleClick={false}
        preventScrolling={false}
        selectionOnDrag={false}
        multiSelectionKeyCode="Shift"
        deleteKeyCode="Delete"
      >
        <Controls
          style={{
            transform: 'scale(0.5)',
            transformOrigin: 'top left',
            margin: '8px',
          }}
        />
      </ReactFlow>
    </div>
  );
}

  // CourseOverviewFlowCanvas Komponente
export default function CourseOverviewFlowCanvas() {
  console.log('CourseOverviewFlowCanvas wird geladen');
  console.log('wrapperNodes:', wrapperNodes);
  console.log('initialNodes:', initialNodes);
  console.log('level3Containers:', level3Containers);
  console.log('finalNodes:', finalNodes);
  console.log('nodeTypes:', nodeTypes);
  console.log('nineGridLerneinheiten:', nineGridLerneinheiten);
  console.log('gridContainerConfigs:', gridContainerConfigs);
  
  // Debug: Grid-Positionen testen
  // useEffect(() => {
  //   console.log('=== DEBUG: Grid-Positionen ===');
  //   debugCellPositions();
  // }, []);
  
  return (
    <ReactFlowProvider>
      <FlowApp />
    </ReactFlowProvider>
  );
}
