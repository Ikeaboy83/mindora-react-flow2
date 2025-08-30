// gridUtils6er.js - 6er-Grid-Utilities für Course Overview
// Diese Datei enthält alle spezifischen Funktionen für 6er-Grid-Layouts

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

// Grid-Linien für 6er-Container erstellen
export const createSixGridLines = (containerWidth, containerHeight) => {
  const lines = [];
  
  // Vertikale Linien (Spalten) - 2 Linien für 3 Spalten
  for (let i = 1; i < 3; i++) {
    const x = (containerWidth / 3) * i;
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
  
  // Horizontale Linie (Zeile) - 1 Linie für 2 Zeilen
  const y = containerHeight / 2;
  lines.push({
    id: 'h-line-1',
    type: 'horizontal',
    x1: 0,
    y1: y,
    x2: containerWidth,
    y2: y,
    stroke: 'black',
    strokeWidth: 2,
  });
  
  return lines;
};

// Grid-Zellen-Koordinaten für 6er-Grid berechnen
export const calculateSixGridCells = (containerWidth, containerHeight) => {
  const cells = [];
  const cellWidth = containerWidth / 3;
  const cellHeight = containerHeight / 2;
  
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 3; col++) {
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

// Standard-Größen für 6er-Grid Lerneinheiten
export const defaultLerneinheitSizes = {
  width: 18000,  // 15000 * 1.2 = 18000
  height: 12000, // 10000 * 1.2 = 12000
  fontSize: 960, // 800 * 1.2 = 960
};

// Hilfsfunktion: Position für eine spezifische 6er-Grid-Zelle abrufen
export const getSixGridCellPosition = (cellNumber, containerWidth, containerHeight, lerneinheitWidth, lerneinheitHeight) => {
  const positions = calculateSixGridCellPositions(containerWidth, containerHeight, lerneinheitWidth, lerneinheitHeight);
  return positions.find(pos => pos.id === `cell-${cellNumber}`);
};

// 6er-Grid Lerneinheiten mit relativen Positionen erstellen (5% X, 10% Y)
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

// Position für eine Lerneinheit in einer spezifischen 6er-Grid-Zelle berechnen
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

// Container-Größe für 6er-Container ermitteln
export const getSixContainerDimensions = () => {
  return { width: 64000, height: 40000 }; // Vergrößerte 6er-Container für bessere Navigation
};

// Skalierungsfaktor für Lerneinheiten basierend auf 6er-Container
export const getSixGridLerneinheitScaleFactor = () => {
  const { width, height } = getSixContainerDimensions();
  const scaleFactorX = width / 64000; // Angepasst an neue Größe
  const scaleFactorY = height / 40000; // Angepasst an neue Größe
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

// Debug-Funktion: Zeigt alle berechneten 6er-Grid-Positionen an
export const debugSixGridCellPositions = (containerWidth = 57600, containerHeight = 28800, lerneinheitWidth = 18000, lerneinheitHeight = 12000) => {
  const positions = calculateSixGridCellPositions(containerWidth, containerHeight, lerneinheitWidth, lerneinheitHeight);
  
  console.log('=== DEBUG: 6er-Grid Zellen-Positionen ===');
  console.log(`Container: ${containerWidth} × ${containerHeight}`);
  console.log(`Lerneinheit: ${lerneinheitWidth} × ${lerneinheitHeight}`);
  console.log(`Zellen-Größe: ${containerWidth / 3} × ${containerHeight / 2}`);
  
  positions.forEach(pos => {
    console.log(`${pos.id}: x=${pos.position.x}, y=${pos.position.y}`);
  });
  
  return positions;
};
