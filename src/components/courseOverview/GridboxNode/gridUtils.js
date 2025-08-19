// Grid-Utilities für 9er-Container
export const createGridLines = (containerWidth, containerHeight, columns = 3, rows = 3) => {
  const lines = [];
  
  // Vertikale Linien (Spalten)
  for (let i = 1; i < columns; i++) {
    const x = (containerWidth / columns) * i;
    lines.push({
      id: `v-line-${i}`,
      type: 'vertical',
      x1: x,
      y1: 0,
      x2: x,
      y2: containerHeight,
      stroke: 'black',
      strokeWidth: 2,
    });
  }
  
  // Horizontale Linien (Zeilen)
  for (let i = 1; i < rows; i++) {
    const y = (containerHeight / rows) * i;
    lines.push({
      id: `h-line-${i}`,
      type: 'horizontal',
      x1: 0,
      y1: y,
      x2: containerWidth,
      y2: y,
      stroke: 'black',
      strokeWidth: 2,
    });
  }
  
  return lines;
};

// Grid-Zellen-Koordinaten berechnen
export const calculateGridCells = (containerWidth, containerHeight, columns = 3, rows = 3) => {
  const cells = [];
  const cellWidth = containerWidth / columns;
  const cellHeight = containerHeight / rows;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      cells.push({
        id: `cell-${row}-${col}`,
        row,
        col,
        x: col * cellWidth,
        y: row * cellHeight,
        width: cellWidth,
        height: cellHeight,
        centerX: col * cellWidth + cellWidth / 2,
        centerY: row * cellHeight + cellHeight / 2,
      });
    }
  }
  
  return cells;
};

// 9er-Grid spezifische Konfiguration
export const nineGridConfig = {
  columns: 3,
  rows: 3,
  totalCells: 9,
  gridLineColor: 'black',
  gridLineWidth: 2,
  cellPadding: 20,
  // Verfügbare Zellen-Größe nach Abzug des Paddings
  getAvailableCellSize: (containerWidth, containerHeight) => ({
    width: (containerWidth / 3) - 40, // 20px Padding auf beiden Seiten
    height: (containerHeight / 3) - 40, // 20px Padding auf beiden Seiten
  }),
};

// 6er-Grid spezifische Konfiguration
export const sixGridConfig = {
  columns: 3,
  rows: 2,
  totalCells: 6,
  gridLineColor: 'black',
  gridLineWidth: 2,
  cellPadding: 20,
  // Verfügbare Zellen-Größe nach Abzug des Paddings
  getAvailableCellSize: (containerWidth, containerHeight) => ({
    width: (containerWidth / 3) - 40, // 20px Padding auf beiden Seiten
    height: (containerHeight / 2) - 40, // 20px Padding auf beiden Seiten
  }),
};

// Positionen für alle 9 Zellen des 9er-Grids berechnen (RELATIV zum Container)
export const calculateNineGridCellPositions = (containerWidth, containerHeight, lerneinheitWidth, lerneinheitHeight) => {
  const cellWidth = containerWidth / 3;
  const cellHeight = containerHeight / 3;
  
  // Neue Berechnung: Lerneinheiten bei 5% der Zellen-Breite und 10% der Zellen-Höhe
  const cellPositions = [
    // Zeile 1
    {
      id: 'cell-1',
      position: { 
        x: 0, // 0% der Container-Breite (links)
        y: 0  // 0% der Container-Höhe (oben)
      },
      relativePosition: {
        x: 0, // 0% der Container-Breite
        y: 0  // 0% der Container-Höhe
      },
      // Lerneinheit-Position: 5% der Zellen-Breite, 10% der Zellen-Höhe
      lerneinheitPosition: {
        x: 0.05, // 5% der Zellen-Breite
        y: 0.10  // 10% der Zellen-Höhe
      },
      row: 0,
      col: 0,
      centerX: cellWidth / 2,
      centerY: cellHeight / 2,
    },
    {
      id: 'cell-2',
      position: { 
        x: cellWidth, // 33.33% der Container-Breite (mittig)
        y: 0          // 0% der Container-Höhe (oben)
      },
      relativePosition: {
        x: 1/3, // 33.33% der Container-Breite
        y: 0    // 0% der Container-Höhe
      },
      row: 0,
      col: 1,
      centerX: cellWidth + cellWidth / 2,
      centerY: cellHeight / 2,
    },
    {
      id: 'cell-3',
      position: { 
        x: 2 * cellWidth, // 66.67% der Container-Breite (rechts)
        y: 0               // 0% der Container-Höhe (oben)
      },
      relativePosition: {
        x: 2/3, // 66.67% der Container-Breite
        y: 0    // 0% der Container-Höhe
      },
      row: 0,
      col: 2,
      centerX: 2 * cellWidth + cellWidth / 2,
      centerY: cellHeight / 2,
    },
    // Zeile 2
    {
      id: 'cell-4',
      position: { 
        x: 0,           // 0% der Container-Breite (links)
        y: cellHeight   // 33.33% der Container-Höhe (mittig)
      },
      relativePosition: {
        x: 0,    // 0% der Container-Breite
        y: 1/3  // 33.33% der Container-Höhe
      },
      row: 1,
      col: 0,
      centerX: cellWidth / 2,
      centerY: cellHeight + cellHeight / 2,
    },
    {
      id: 'cell-5',
      position: { 
        x: cellWidth,   // 33.33% der Container-Breite (mittig)
        y: cellHeight   // 33.33% der Container-Höhe (mittig)
      },
      relativePosition: {
        x: 1/3, // 33.33% der Container-Breite
        y: 1/3 // 33.33% der Container-Höhe
      },
      row: 1,
      col: 1,
      centerX: cellWidth + cellWidth / 2,
      centerY: cellHeight + cellHeight / 2,
    },
    {
      id: 'cell-6',
      position: { 
        x: 2 * cellWidth, // 66.67% der Container-Breite (rechts)
        y: cellHeight      // 33.33% der Container-Höhe (mittig)
      },
      relativePosition: {
        x: 2/3, // 66.67% der Container-Breite
        y: 1/3 // 33.33% der Container-Höhe
      },
      row: 1,
      col: 2,
      centerX: 2 * cellWidth + cellWidth / 2,
      centerY: cellHeight + cellHeight / 2,
    },
    // Zeile 3
    {
      id: 'cell-7',
      position: { 
        x: 0,             // 0% der Container-Breite (links)
        y: 2 * cellHeight // 66.67% der Container-Höhe (unten)
      },
      relativePosition: {
        x: 0,    // 0% der Container-Breite
        y: 2/3  // 66.67% der Container-Höhe
      },
      row: 2,
      col: 0,
      centerX: cellWidth / 2,
      centerY: 2 * cellHeight + cellHeight / 2,
    },
    {
      id: 'cell-8',
      position: { 
        x: cellWidth,     // 33.33% der Container-Breite (mittig)
        y: 2 * cellHeight // 66.67% der Container-Höhe (unten)
      },
      relativePosition: {
        x: 1/3, // 33.33% der Container-Breite
        y: 2/3 // 66.67% der Container-Höhe
      },
      row: 2,
      col: 1,
      centerX: cellWidth + cellWidth / 2,
      centerY: 2 * cellHeight + cellHeight / 2,
    },
    {
      id: 'cell-9',
      position: { 
        x: 2 * cellWidth,   // 66.67% der Container-Breite (rechts)
        y: 2 * cellHeight   // 66.67% der Container-Höhe (unten)
      },
      relativePosition: {
        x: 2/3, // 66.67% der Container-Breite
        y: 2/3 // 66.67% der Container-Höhe
      },
      row: 2,
      col: 2,
      centerX: 2 * cellWidth + cellWidth / 2,
      centerY: 2 * cellHeight + cellHeight / 2,
    },
  ];
  
  return cellPositions;
};

// Positionen für alle 6 Zellen des 6er-Grids berechnen (RELATIV zum Container)
export const calculateSixGridCellPositions = (containerWidth, containerHeight, lerneinheitWidth, lerneinheitHeight) => {
  const cellWidth = containerWidth / 3;
  const cellHeight = containerHeight / 2;
  
  // Neue Berechnung: Lerneinheiten bei 5% der Zellen-Breite und 10% der Zellen-Höhe
  const cellPositions = [
    // Zeile 1
    {
      id: 'cell-1',
      position: { 
        x: 0, // 0% der Container-Breite (links)
        y: 0  // 0% der Container-Höhe (oben)
      },
      relativePosition: {
        x: 0, // 0% der Container-Breite
        y: 0  // 0% der Container-Höhe
      },
      // Lerneinheit-Position: 5% der Zellen-Breite, 10% der Zellen-Höhe
      lerneinheitPosition: {
        x: 0.05, // 5% der Zellen-Breite
        y: 0.10  // 10% der Zellen-Höhe
      },
      row: 0,
      col: 0,
      centerX: cellWidth / 2,
      centerY: cellHeight / 2,
    },
    {
      id: 'cell-2',
      position: { 
        x: cellWidth, // 33.33% der Container-Breite (mittig)
        y: 0          // 0% der Container-Höhe (oben)
      },
      relativePosition: {
        x: 1/3, // 33.33% der Container-Breite
        y: 0    // 0% der Container-Höhe
      },
      row: 0,
      col: 1,
      centerX: cellWidth + cellWidth / 2,
      centerY: cellHeight / 2,
    },
    {
      id: 'cell-3',
      position: { 
        x: 2 * cellWidth, // 66.67% der Container-Breite (rechts)
        y: 0               // 0% der Container-Höhe (oben)
      },
      relativePosition: {
        x: 2/3, // 66.67% der Container-Breite
        y: 0    // 0% der Container-Höhe
      },
      row: 0,
      col: 2,
      centerX: 2 * cellWidth + cellWidth / 2,
      centerY: cellHeight / 2,
    },
    // Zeile 2
    {
      id: 'cell-4',
      position: { 
        x: 0,           // 0% der Container-Breite (links)
        y: cellHeight   // 50% der Container-Höhe (unten)
      },
      relativePosition: {
        x: 0,    // 0% der Container-Breite
        y: 0.5  // 50% der Container-Höhe
      },
      row: 1,
      col: 0,
      centerX: cellWidth / 2,
      centerY: cellHeight + cellHeight / 2,
    },
    {
      id: 'cell-5',
      position: { 
        x: cellWidth,   // 33.33% der Container-Breite (mittig)
        y: cellHeight   // 50% der Container-Höhe (unten)
      },
      relativePosition: {
        x: 1/3, // 33.33% der Container-Breite
        y: 0.5  // 50% der Container-Höhe
      },
      row: 1,
      col: 1,
      centerX: cellWidth + cellWidth / 2,
      centerY: cellHeight + cellHeight / 2,
    },
    {
      id: 'cell-6',
      position: { 
        x: 2 * cellWidth, // 66.67% der Container-Breite (rechts)
        y: cellHeight      // 50% der Container-Höhe (unten)
      },
      relativePosition: {
        x: 2/3, // 66.67% der Container-Breite
        y: 0.5  // 50% der Container-Höhe
      },
      row: 1,
      col: 2,
      centerX: 2 * cellWidth + cellWidth / 2,
      centerY: cellHeight + cellHeight / 2,
    },
  ];
  
  return cellPositions;
};

// Debug-Funktion: Zeigt alle berechneten Positionen an
export const debugCellPositions = (containerWidth = 60000, containerHeight = 45000, lerneinheitWidth = 18000, lerneinheitHeight = 12000) => {
  const positions = calculateNineGridCellPositions(containerWidth, containerHeight, lerneinheitWidth, lerneinheitHeight);
  
  console.log('=== DEBUG: 9er-Grid Zellen-Positionen ===');
  console.log(`Container: ${containerWidth} × ${containerHeight}`);
  console.log(`Lerneinheit: ${lerneinheitWidth} × ${lerneinheitHeight}`);
  console.log(`Zellen-Größe: ${containerWidth / 3} × ${containerHeight / 3}`);
  
  positions.forEach(pos => {
    console.log(`${pos.id}: x=${pos.position.x}, y=${pos.position.y}`);
  });
  
  return positions;
};

// Hilfsfunktion: Position für eine spezifische Zelle abrufen
export const getCellPosition = (cellNumber, containerWidth, containerHeight, lerneinheitWidth, lerneinheitHeight) => {
  const positions = calculateNineGridCellPositions(containerWidth, containerHeight, lerneinheitWidth, lerneinheitHeight);
  return positions.find(pos => pos.id === `cell-${cellNumber}`);
};

// Hilfsfunktion: Position für eine spezifische 6er-Grid-Zelle abrufen
export const getSixGridCellPosition = (cellNumber, containerWidth, containerHeight, lerneinheitWidth, lerneinheitHeight) => {
  const positions = calculateSixGridCellPositions(containerWidth, containerHeight, lerneinheitWidth, lerneinheitHeight);
  return positions.find(pos => pos.id === `cell-${cellNumber}`);
};

// Standard-Größen für 9er-Grid Lerneinheiten (20% größer als vorher)
export const defaultLerneinheitSizes = {
  width: 18000,  // 15000 * 1.2 = 18000
  height: 12000, // 10000 * 1.2 = 12000
  fontSize: 960, // 800 * 1.2 = 960
};

// Hilfsfunktion: Alle 9 Lerneinheiten mit Standard-Größen erstellen
export const createAllNineGridLerneinheiten = (containerWidth = 60000, containerHeight = 45000, imageSources = {}) => {
  const lerneinheiten = [];
  
  for (let i = 1; i <= 9; i++) {
    const cellPosition = getCellPosition(i, containerWidth, containerHeight, defaultLerneinheitSizes.width, defaultLerneinheitSizes.height);
    
    if (cellPosition) {
      lerneinheiten.push({
        id: `nine-grid-lerneinheit-${i}`,
        type: 'lerneinheit',
        position: cellPosition.position,
        parentId: '9erContainer-1-level-1',
        data: {
          title: `9er Grid Lerneinheit ${i}`,
          width: defaultLerneinheitSizes.width,
          height: defaultLerneinheitSizes.height,
          backgroundColor: '#e6fefc',
          borderColor: '#30b89b',
          fontSize: defaultLerneinheitSizes.fontSize,
          imageSource: imageSources[i] || 'pic1', // Standardmäßig pic1, oder spezifisches Bild
        },
      });
    }
  }
  
  return lerneinheiten;
};

// Neue Funktion: Lerneinheiten mit relativen Positionen erstellen (5% X, 10% Y)
export const createLerneinheitenWithRelativePositions = (containerWidth = 60000, containerHeight = 45000, imageSources = {}) => {
  const lerneinheiten = [];
  
  // Skalierungsfaktor basierend auf der Container-Größe (Standard: 60000x45000)
  const scaleFactorX = containerWidth / 60000;
  const scaleFactorY = containerHeight / 45000;
  const scaleFactor = Math.min(scaleFactorX, scaleFactorY); // Verwende den kleineren Faktor für proportionale Skalierung
  
  for (let i = 1; i <= 9; i++) {
    const cellPosition = getCellPosition(i, containerWidth, containerHeight, defaultLerneinheitSizes.width, defaultLerneinheitSizes.height);
    
    if (cellPosition) {
      // Berechne die absolute Position basierend auf der Zelle und der 5%/10% Offset
      const cellWidth = containerWidth / 3;
      const cellHeight = containerHeight / 3;
      
      // Zelle-Position + 5% der Zellen-Breite für X, 10% der Zellen-Höhe für Y
      const absoluteX = cellPosition.position.x + (cellWidth * 0.05);
      const absoluteY = cellPosition.position.y + (cellHeight * 0.10);
      
      lerneinheiten.push({
        id: `nine-grid-lerneinheit-${i}`,
        type: 'lerneinheit',
        // ABSOLUTE Position mit 5%/10% Offset
        position: {
          x: absoluteX,
          y: absoluteY
        },
        // RELATIVE Position für die LerneinheitNode-Komponente (5% X, 10% Y)
        relativePosition: {
          x: 0.05, // 5% der Zellen-Breite
          y: 0.10  // 10% der Zellen-Höhe
        },
        parentId: '9erContainer-1-level-1',
        data: {
          title: `9er Grid Lerneinheit ${i}`,
          // SKALIERTE Größen proportional zur Container-Größe
          width: defaultLerneinheitSizes.width * scaleFactor,
          height: defaultLerneinheitSizes.height * scaleFactor,
          backgroundColor: '#e6fefc',
          borderColor: '#30b89b',
          // SKALIERTE Schriftgröße proportional zur Container-Größe
          fontSize: defaultLerneinheitSizes.fontSize * scaleFactor,
          imageSource: imageSources[i] || 'pic1',
          // RELATIVE Position für Icons und andere Elemente (5% X, 10% Y)
          relativeX: 0.05,
          relativeY: 0.10,
        },
      });
    }
  }
  
  return lerneinheiten;
};

// Neue Funktion: 6er-Grid Lerneinheiten mit relativen Positionen erstellen (5% X, 10% Y)
export const createSixGridLerneinheitenWithRelativePositions = (containerWidth = 57600, containerHeight = 28800, imageSources = {}) => {
  const lerneinheiten = [];
  
  // Skalierungsfaktor basierend auf der Container-Größe (Standard: 60000x30000)
  const scaleFactorX = containerWidth / 60000;
  const scaleFactorY = containerHeight / 45000; // Bezug auf 9er-Grid Höhe für proportionale Skalierung
  const scaleFactor = Math.min(scaleFactorX, scaleFactorY);
  
  for (let i = 1; i <= 6; i++) { // Nur 6 Learning Units statt 9
    const cellPosition = getSixGridCellPosition(i, containerWidth, containerHeight, defaultLerneinheitSizes.width, defaultLerneinheitSizes.height);
    
    if (cellPosition) {
      // Berechne die absolute Position basierend auf der Zelle und der 5%/10% Offset
      const cellWidth = containerWidth / 3;
      const cellHeight = containerHeight / 2; // Nur 2 Zeilen statt 3
      
      // Zelle-Position + 5% der Zellen-Breite für X, 10% der Zellen-Höhe für Y
      const absoluteX = cellPosition.position.x + (cellWidth * 0.05);
      const absoluteY = cellPosition.position.y + (cellHeight * 0.10);
      
      lerneinheiten.push({
        id: `six-grid-lerneinheit-${i}`,
        type: 'lerneinheit',
        // ABSOLUTE Position mit 5%/10% Offset
        position: {
          x: absoluteX,
          y: absoluteY
        },
        // RELATIVE Position für die LerneinheitNode-Komponente (5% X, 10% Y)
        relativePosition: {
          x: 0.05, // 5% der Zellen-Breite
          y: 0.10  // 10% der Zellen-Höhe
        },
        parentId: '6erContainer-1-level-1',
        data: {
          title: `6er Grid Lerneinheit ${i}`,
          // SKALIERTE Größen proportional zur Container-Größe
          width: defaultLerneinheitSizes.width * scaleFactor,
          height: defaultLerneinheitSizes.height * scaleFactor,
          backgroundColor: '#e6fefc',
          borderColor: '#30b89b',
          // SKALIERTE Schriftgröße proportional zur Container-Größe
          fontSize: defaultLerneinheitSizes.fontSize * scaleFactor,
          imageSource: imageSources[i] || 'pic1',
          // RELATIVE Position für Icons und andere Elemente (5% X, 10% Y)
          relativeX: 0.05,
          relativeY: 0.10,
        },
      });
    }
  }
  
  return lerneinheiten;
};

// Neue Funktion: Position für eine Lerneinheit in einer spezifischen Zelle berechnen
export const calculateLerneinheitPositionInCell = (cellNumber, containerWidth, containerHeight) => {
  const cellWidth = containerWidth / 3;
  const cellHeight = containerHeight / 3;
  
  // Zelle-Position berechnen
  const row = Math.floor((cellNumber - 1) / 3);
  const col = (cellNumber - 1) % 3;
  
  const cellX = col * cellWidth;
  const cellY = row * cellHeight;
  
  // Lerneinheit-Position: 5% der Zellen-Breite, 10% der Zellen-Höhe
  const lerneinheitX = cellX + (cellWidth * 0.05);
  const lerneinheitY = cellY + (cellHeight * 0.10);
  
  return {
    x: lerneinheitX,
    y: lerneinheitY,
    cellX: cellX,
    cellY: cellY,
    cellWidth: cellWidth,
    cellHeight: cellHeight
  };
};

// Neue Funktion: Position für eine Lerneinheit in einer spezifischen 6er-Grid-Zelle berechnen
export const calculateSixGridLerneinheitPositionInCell = (cellNumber, containerWidth, containerHeight) => {
  const cellWidth = containerWidth / 3;
  const cellHeight = containerHeight / 2; // Nur 2 Zeilen statt 3
  
  // Zelle-Position berechnen (Zellen 1-6)
  const row = Math.floor((cellNumber - 1) / 3);
  const col = (cellNumber - 1) % 3;
  
  const cellX = col * cellWidth;
  const cellY = row * cellHeight;
  
  // Lerneinheit-Position: 5% der Zellen-Breite, 10% der Zellen-Höhe
  const lerneinheitX = cellX + (cellWidth * 0.05);
  const lerneinheitY = cellY + (cellHeight * 0.10);
  
  return {
    x: lerneinheitX,
    y: lerneinheitY,
    cellX: cellX,
    cellY: cellY,
    cellWidth: cellWidth,
    cellHeight: cellHeight
  };
};

// Neue Funktion: Container-Größe für einen spezifischen Container-ID ermitteln
export const getContainerDimensions = (containerId) => {
  switch (containerId) {
    case '9erContainer-1-level-1':
      return { width: 60000, height: 45000 }; // Standard-Größe für bessere Sichtbarkeit
    case '6erContainer-1-level-1':
      return { width: 1152, height: 576 }; // 6er-Container: um das 5fache verkleinert (5760/5 = 1152, 2880/5 = 576)
    default:
      return { width: 60000, height: 45000 }; // Standard-Größe
  }
};

// Neue Funktion: Skalierungsfaktor für Lerneinheiten basierend auf Container-ID
export const getLerneinheitScaleFactor = (containerId) => {
  const { width, height } = getContainerDimensions(containerId);
  const scaleFactorX = width / 60000;
  const scaleFactorY = height / 45000;
  return Math.min(scaleFactorX, scaleFactorY);
};

// Standard-Node-Konfiguration für 6er-Container
export const createSixContainerNodeConfig = () => {
  return {
    id: '6erContainer-1-level-1',
    type: 'gridContainer',
    position: { x: 0, y: 0 }, // Position bei (0,0)
    data: {},
  };
};

// Import der createLerneinheitWithSingleIcon Funktion
import { createLerneinheitWithSingleIcon, createSixGridLerneinheitenWithCorrectDimensions } from './gridUtilsIcons.js';




