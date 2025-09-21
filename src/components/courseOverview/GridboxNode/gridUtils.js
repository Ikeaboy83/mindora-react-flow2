// Grid-Utilities für Container-Dimensionen und Positionierung
// Berechnet Container-Dimensionen und Lerneinheit-Positionen in Grid-Zellen

// Basis-Größen für Level 1 (feste Größen)
const GRID_BASE_SIZES = {
  '3er': { width: 57600, height: 14400 },  // 3 Spalten, 1 Zeile (1/3 der Höhe eines 9er-Grids)
  '6er': { width: 57600, height: 28800 },  // 3 Spalten, 2 Zeilen  
  '9er': { width: 57600, height: 43200 }   // 3 Spalten, 3 Zeilen
};

// Level-Skalierungsfaktoren
const LEVEL_SCALE_FACTORS = {
  1: 1.0,        // Basis-Größe
  2: 0.125,      // Angepasst für 9er-Grid: ~7200x5401px
  3: 0.01215,    // 1.215% der Basis - Container: ~700x525px
  4: 0.04375     // 4.375% der Basis (Level 4) - Lerneinheit height = 525px
};

// Hilfsfunktionen für ID-Parsing
const extractGridTypeFromId = (id) => {
  if (id.includes('3er')) return '3er';
  if (id.includes('6er')) return '6er';
  if (id.includes('9er')) return '9er';
  return '9er'; // Default
};

const extractLevelFromId = (id) => {
  const match = id.match(/level-(\d+)/);
  return match ? parseInt(match[1]) : 1;
};

/**
 * Container-Dimensionen basierend auf Container-ID (Legacy-Support)
 * @param {string} containerId - ID des Containers
 * @returns {Object} Container-Dimensionen { width, height }
 */
export const getContainerDimensions = (containerId) => {
  // Legacy-Support für alte Container-IDs
  const legacyDimensions = {
    '9erContainer-level-1': { width: 57600, height: 43200 }, // Höhe eineinhalb mal so groß wie 6er-Grid
    '6erContainer-level-1': { width: 57600, height: 28800 },
    // Alte IDs für Rückwärtskompatibilität
    '9erContainer-1-level-1': { width: 57600, height: 43200 }, // Höhe eineinhalb mal so groß wie 6er-Grid
    '6erContainer-1-level-1': { width: 57600, height: 28800 }
  };
  
  if (legacyDimensions[containerId]) {
    return legacyDimensions[containerId];
  }
  
  // Neue Grid-basierte Berechnung
  return getGridDimensions(containerId);
};

/**
 * Grid-Dimensionen basierend auf Grid-Typ und Level
 * @param {string} containerId - ID des Containers
 * @param {string} gridType - Grid-Typ ('3er', '6er', '9er')
 * @param {number} level - Level (1, 2, 3)
 * @returns {Object} Container-Dimensionen { width, height }
 */
export const getGridDimensions = (containerId, gridType = null, level = null) => {
  const finalGridType = gridType || extractGridTypeFromId(containerId);
  const finalLevel = level || extractLevelFromId(containerId);
  
  const baseSize = GRID_BASE_SIZES[finalGridType];
  const scaleFactor = LEVEL_SCALE_FACTORS[finalLevel];
  
  return {
    width: baseSize.width * scaleFactor,
    height: baseSize.height * scaleFactor
  };
};

/**
 * Level-Skalierungsfaktor abrufen
 * @param {number} level - Level (1, 2, 3)
 * @returns {number} Skalierungsfaktor
 */
export const getLevelScaleFactor = (level) => {
  return LEVEL_SCALE_FACTORS[level] || 1.0;
};

/**
 * Border-Radius für Grid-Container basierend auf Grid-Typ und Level berechnen
 * @param {string} gridType - Grid-Typ ('3er', '6er', '9er')
 * @param {number} level - Level (1, 2, 3)
 * @returns {number} Border-Radius in Pixeln
 */
export const getGridContainerBorderRadius = (gridType, level) => {
  // Basis-Border-Radius für Level 1 (in Pixeln)
  const BASE_BORDER_RADIUS = {
    '3er': 600,  // Standard-Rundung für 3er-Grid
    '6er': 600,  // Standard-Rundung für 6er-Grid
    '9er': 600   // Standard-Rundung für 9er-Grid
  };

  // Level-spezifische Modifikatoren für Border-Radius
  // Struktur: Level -> Grid-Typ -> Modifier (oder direkt Modifier für einheitliche Level)
  const LEVEL_BORDER_RADIUS_MODIFIERS = {
    1: 1.0,    // Level 1: Vollständige Basis-Rundung (einheitlich für alle Grid-Typen)
    
    2: {       // Level 2: Grid-spezifische reduzierte Rundungen
      '3er': 0.3,   // 30% der Basis-Rundung für 3er-Grid Level 2
      '6er': 0.3,   // 30% der Basis-Rundung für 6er-Grid Level 2
      '9er': 0.15   // 15% der Basis-Rundung für 9er-Grid Level 2 (stärker abgeschwächt)
    },
    
    3: {       // Level 3: Extrem minimale Rundungen (einheitlich für alle Grid-Typen)
      '3er': 0.02,  // 2% der Basis-Rundung für 3er-Grid Level 3
      '6er': 0.02,  // 2% der Basis-Rundung für 6er-Grid Level 3  
      '9er': 0.02   // 2% der Basis-Rundung für 9er-Grid Level 3
      // Alle Grid-Typen haben die gleiche minimale Rundung für einheitliches Aussehen
    },
    
    4: 0.1,    // Level 4: 10% der Basis-Rundung (einheitlich für alle Grid-Typen)
    
    // Zukünftige Level können hier einfach hinzugefügt werden:
    // 5: { '3er': 0.05, '6er': 0.05, '9er': 0.05 }  // Beispiel für Level 5
  };

  const baseRadius = BASE_BORDER_RADIUS[gridType] || BASE_BORDER_RADIUS['9er'];
  const levelModifier = LEVEL_BORDER_RADIUS_MODIFIERS[level];

  // Robuste Modifier-Verarbeitung für alle Level-Typen
  let finalModifier;
  
  if (typeof levelModifier === 'object') {
    // Grid-spezifische Modifikatoren (Level 2, 3, etc.)
    finalModifier = levelModifier[gridType] || levelModifier['9er'] || 1.0;
  } else if (typeof levelModifier === 'number') {
    // Einheitliche Modifikatoren (Level 1, 4, etc.)
    finalModifier = levelModifier;
  } else {
    // Fallback für unbekannte Level
    finalModifier = 1.0;
  }
  
  return Math.round(baseRadius * finalModifier);
};

/**
 * Berechnet die Position einer Lerneinheit innerhalb einer Grid-Zelle
 * ROBUSTE VERSION: Funktioniert unabhängig von Container-Größe und Level
 * @param {number} cellNumber - Zellennummer (1-3 für 3er-Grid, 1-6 für 6er-Grid, 1-9 für 9er-Grid)
 * @param {number} containerWidth - Container-Breite
 * @param {number} containerHeight - Container-Höhe
 * @param {string} gridType - Grid-Typ ('3er', '6er', '9er') - ERFORDERLICH für robuste Berechnung
 * @param {number} lerneinheitWidth - Breite der Lerneinheit (optional, Standard: 18000)
 * @param {number} lerneinheitHeight - Höhe der Lerneinheit (optional, Standard: 12000)
 * @returns {Object} Position { x, y }
 */
export const calculateLerneinheitPositionInCell = (cellNumber, containerWidth, containerHeight, gridType = null, lerneinheitWidth = 18000, lerneinheitHeight = 12000) => {
  // Grid-Typ automatisch bestimmen basierend auf Verhältnis (robuster als absolute Dimensionen)
  let detectedGridType = gridType;
  if (!detectedGridType) {
    const aspectRatio = containerWidth / containerHeight;
    // Aspect Ratios: 3er = 4:1, 6er = 2:1, 9er = 4:3
    if (aspectRatio > 3.5) detectedGridType = '3er';      // ~4:1 Verhältnis
    else if (aspectRatio > 1.8) detectedGridType = '6er'; // ~2:1 Verhältnis  
    else detectedGridType = '9er';                         // ~4:3 Verhältnis
  }
  
  // Grid-Konfiguration (unveränderlich)
  const gridConfigs = {
    '3er': { cols: 3, rows: 1 },
    '6er': { cols: 3, rows: 2 },
    '9er': { cols: 3, rows: 3 }
  };
  
  const config = gridConfigs[detectedGridType];
  if (!config) {
    console.error(`Unbekannter Grid-Typ: ${detectedGridType}`);
    return { x: 0, y: 0 };
  }
  
  // Zellen-Dimensionen berechnen
  const cellWidth = containerWidth / config.cols;
  const cellHeight = containerHeight / config.rows;
  
  // Zellen-Position berechnen (0-basiert)
  const col = (cellNumber - 1) % config.cols;
  const row = Math.floor((cellNumber - 1) / config.cols);
  
  // Zellen-Ursprungsposition
  const cellX = col * cellWidth;
  const cellY = row * cellHeight;
  
  // ZENTRALE POSITIONIERUNG: Lerneinheit in der Mitte der Zelle
  const centeredX = cellX + (cellWidth - lerneinheitWidth) / 2;
  const centeredY = cellY + (cellHeight - lerneinheitHeight) / 2;
  
  // Debug-Ausgabe für Entwicklung
  console.log(`Grid-Positionierung: ${detectedGridType}-Grid, Zelle ${cellNumber}`, {
    containerSize: `${containerWidth}x${containerHeight}`,
    cellSize: `${cellWidth.toFixed(0)}x${cellHeight.toFixed(0)}`,
    cellPosition: `${cellX.toFixed(0)},${cellY.toFixed(0)}`,
    lerneinheitSize: `${lerneinheitWidth}x${lerneinheitHeight}`,
    finalPosition: `${centeredX.toFixed(0)},${centeredY.toFixed(0)}`
  });
  
  return {
    x: centeredX,
    y: centeredY
  };
};

/**
 * Berechnet den Skalierungsfaktor für Lerneinheiten basierend auf Container-ID
 * @param {string} containerId - ID des Containers
 * @returns {number} Skalierungsfaktor
 */
export const getLerneinheitScaleFactor = (containerId) => {
  const scaleFactors = {
    '9erContainer-level-1': 1.0,    // 9er-Container: Standard-Größe
    '6erContainer-level-1': 0.96,   // 6er-Container: 20% kleiner
    // Alte IDs für Rückwärtskompatibilität
    '9erContainer-1-level-1': 1.0,    // 9er-Container: Standard-Größe
    '6erContainer-1-level-1': 0.96    // 6er-Container: 20% kleiner
  };
  
  return scaleFactors[containerId] || 1.0;
};

/**
 * Debug-Funktion: Zeigt alle Container-Dimensionen an
 */
export const debugContainerDimensions = () => {
  console.log('=== DEBUG: Container-Dimensionen ===');
  console.log('9er-Container:', getContainerDimensions('9erContainer-level-1'));
  console.log('6er-Container:', getContainerDimensions('6erContainer-level-1'));
};

/**
 * Debug-Funktion: Zeigt alle Zellen-Positionen an
 * @param {string} containerId - ID des Containers
 */
export const debugCellPositions = (containerId = '9erContainer-level-1') => {
  console.log(`=== DEBUG: Zellen-Positionen für ${containerId} ===`);
  const { width, height } = getContainerDimensions(containerId);
  const is6erGrid = containerId === '6erContainer-level-1';
  const maxCells = is6erGrid ? 6 : 9;
  
  for (let i = 1; i <= maxCells; i++) {
    const position = calculateLerneinheitPositionInCell(i, width, height);
    console.log(`Zelle ${i}: x=${position.x}, y=${position.y}`);
  }
};
