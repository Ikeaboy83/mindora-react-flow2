// Lerneinheit Factory - Erstellt Lerneinheiten mit Icons und Presets
import { iconMap, isIconTypeAvailable, getAvailableIconTypes } from './iconMap.js';
import { 
  calculateDoubleIconPositions, 
  calculateSingleIconPosition, 
  calculateSixGridDoubleIconPositions 
} from './positionUtils.js';

/**
 * Standard-Icon-Typen für verschiedene Lerneinheit-Kategorien
 */
export const iconTypePresets = {
  default: ['favoritIcon', 'doneIcon'],
  progress: ['startedIcon', 'doneIcon'],
  status: ['lockedIcon', 'deadlineIcon'],
  custom: ['favoritIcon', 'deadlineIcon']
};

/**
 * Standard-Positionen für einzelne Icons auf Lerneinheiten
 */
export const singleIconPositionPresets = {
  centerTop: { x: 0.5, y: 0.3 },      // Mittig oben (30% von oben)
  centerMiddle: { x: 0.5, y: 0.5 },   // Mittig in der Mitte
  centerBottom: { x: 0.5, y: 0.7 },   // Mittig unten (70% von oben)
  leftTop: { x: 0.25, y: 0.3 },       // Links oben
  rightTop: { x: 0.75, y: 0.3 },      // Rechts oben
  leftMiddle: { x: 0.25, y: 0.5 },    // Links mittig
  rightMiddle: { x: 0.75, y: 0.5 },   // Rechts mittig
  leftBottom: { x: 0.25, y: 0.7 },    // Links unten
  rightBottom: { x: 0.75, y: 0.7 },   // Rechts unten
};

/**
 * Erstellt Icon-Objekte für eine Lerneinheit mit berechneten Positionen
 * @param {Object} lerneinheit - Lerneinheit-Objekt
 * @param {string} leftIconType - Typ des linken Icons (z.B. 'favoritIcon', 'doneIcon')
 * @param {string} rightIconType - Typ des rechten Icons
 * @returns {Object} Lerneinheit mit Icon-Positionen
 */
export const createLerneinheitWithIcons = (lerneinheit, leftIconType = 'favoritIcon', rightIconType = 'doneIcon') => {
  const iconPositions = calculateDoubleIconPositions(
    lerneinheit.position,
    lerneinheit.data.width,
    lerneinheit.data.height,
    6000, // Standard Icon-Breite
    6000  // Standard Icon-Höhe
  );
  
  // Icon-Objekte mit relativen Positionen erstellen
  const statusIcons = [
    {
      type: leftIconType,
      x: iconPositions.leftIcon.x - lerneinheit.position.x, // Relative Position innerhalb der Lerneinheit
      y: iconPositions.leftIcon.y - lerneinheit.position.y
    },
    {
      type: rightIconType,
      x: iconPositions.rightIcon.x - lerneinheit.position.x, // Relative Position innerhalb der Lerneinheit
      y: iconPositions.rightIcon.y - lerneinheit.position.y
    }
  ];
  
  return {
    ...lerneinheit,
    data: {
      ...lerneinheit.data,
      statusIcons
    }
  };
};

/**
 * Erstellt eine Lerneinheit mit Icons und gibt die Icon-Komponenten zurück
 * @param {Object} lerneinheit - Lerneinheit-Objekt
 * @param {string} leftIconType - Typ des linken Icons
 * @param {string} rightIconType - Typ des rechten Icons
 * @returns {Object} Lerneinheit mit Icon-Komponenten und Positionen
 */
export const createLerneinheitWithIconComponents = (lerneinheit, leftIconType = 'favoritIcon', rightIconType = 'doneIcon') => {
  const iconPositions = calculateDoubleIconPositions(
    lerneinheit.position,
    lerneinheit.data.width,
    lerneinheit.data.height,
    6000, // Standard Icon-Breite
    6000  // Standard Icon-Höhe
    );
  
  // Icon-Komponenten mit relativen Positionen erstellen
  const statusIcons = [
    {
      type: leftIconType,
      component: iconMap[leftIconType],
      x: iconPositions.leftIcon.x - lerneinheit.position.x,
      y: iconPositions.leftIcon.y - lerneinheit.position.y
    },
    {
      type: rightIconType,
      component: iconMap[rightIconType],
      x: iconPositions.rightIcon.x - lerneinheit.position.x,
      y: iconPositions.rightIcon.y - lerneinheit.position.y
    }
  ];
  
  return {
    ...lerneinheit,
    data: {
      ...lerneinheit.data,
      statusIcons
    }
  };
};

/**
 * Erstellt eine Lerneinheit mit einem einzelnen zentral positionierten Icon
 * Das Icon wird um 50% seiner eigenen Breite und Höhe verschoben, um es zu zentrieren
 * @param {Object} lerneinheit - Lerneinheit-Objekt
 * @param {string} iconType - Typ des Icons (z.B. 'favoritIcon', 'doneIcon')
 * @param {number} xPercent - X-Position in Prozent der Lerneinheit-Breite (0-1)
 * @param {number} yPercent - Y-Position in Prozent der Lerneinheit-Höhe (0-1)
 * @param {number} iconWidth - Breite des Icons in Pixeln
 * @param {number} iconHeight - Höhe des Icons in Pixeln
 * @returns {Object} Lerneinheit mit Icon-Position
 */
export const createLerneinheitWithSingleIcon = (lerneinheit, iconType = 'favoritIcon', xPercent = 0.5, yPercent = 0.3, iconWidth = 6000, iconHeight = 6000) => {
  // Überprüfen, ob der Icon-Typ verfügbar ist
  if (!isIconTypeAvailable(iconType)) {
    console.warn(`Icon-Typ '${iconType}' ist nicht verfügbar. Verfügbare Typen:`, getAvailableIconTypes());
    return lerneinheit;
  }
  
  // Icon-Objekt mit relativer Position erstellen
  // Offset für korrekte Zentrierung: 50% der Icon-Größe (dynamisch berechnet)
  const statusIcons = [
    {
      type: iconType,
      x: xPercent, // Direkte Prozent-Position (0-1)
      y: yPercent, // Direkte Prozent-Position (0-1)
      offsetX: iconWidth * 0.5, // 50% der Icon-Breite für Zentrierung (dynamisch)
      offsetY: iconHeight * 0.5, // 50% der Icon-Höhe für Zentrierung (dynamisch)
    }
  ];
  
  return {
    ...lerneinheit,
    data: {
      ...lerneinheit.data,
      statusIcons
    }
  };
};

/**
 * Erstellt eine Lerneinheit mit einem einzelnen Icon und Icon-Komponente
 * @param {Object} lerneinheit - Lerneinheit-Objekt
 * @param {string} iconType - Typ des Icons
 * @param {number} xPercent - X-Position in Prozent der Lerneinheit-Breite (0-1)
 * @param {number} yPercent - Y-Position in Prozent der Lerneinheit-Höhe (0-1)
 * @returns {Object} Lerneinheit mit Icon-Komponente und Position
 */
export const createLerneinheitWithSingleIconComponent = (lerneinheit, iconType = 'favoritIcon', xPercent = 0.5, yPercent = 0.3, iconWidth = 6000, iconHeight = 6000) => {
  // Überprüfen, ob der Icon-Typ verfügbar ist
  if (!isIconTypeAvailable(iconType)) {
    console.warn(`Icon-Typ '${iconType}' ist nicht verfügbar. Verfügbare Typen:`, getAvailableIconTypes());
    return lerneinheit;
  }
  
  // Icon-Komponente mit relativer Position erstellen
  // Offset für korrekte Zentrierung: 50% der Icon-Größe (dynamisch berechnet)
  const statusIcons = [
    {
      type: iconType,
      component: iconMap[iconType],
      x: xPercent, // Direkte Prozent-Position (0-1)
      y: yPercent, // Direkte Prozent-Position (0-1)
      offsetX: iconWidth * 0.5, // 50% der Icon-Breite für Zentrierung (dynamisch)
      offsetY: iconHeight * 0.5, // 50% der Icon-Höhe für Zentrierung (dynamisch)
    }
  ];
  
  return {
    ...lerneinheit,
    data: {
      ...lerneinheit.data,
      statusIcons
    }
  };
};

/**
 * Erstellt eine Lerneinheit mit einem zentral positionierten Icon
 * Das Icon wird um 50% seiner eigenen Breite und Höhe verschoben, um es zu zentrieren
 * @param {Object} lerneinheit - Lerneinheit-Objekt
 * @param {string} iconType - Typ des Icons (z.B. 'favoritIcon', 'doneIcon')
 * @param {number} xPercent - X-Position in Prozent der Lerneinheit-Breite (0-1)
 * @param {number} yPercent - Y-Position in Prozent der Lerneinheit-Höhe (0-1)
 * @param {number} iconWidth - Breite des Icons in Pixeln
 * @param {number} iconHeight - Höhe des Icons in Pixeln
 * @returns {Object} Lerneinheit mit Icon-Position
 */
export const createLerneinheitWithCenteredIcon = (lerneinheit, iconType = 'favoritIcon', xPercent = 0.5, yPercent = 0.3, iconWidth = 6000, iconHeight = 6000) => {
  // Überprüfen, ob der Icon-Typ verfügbar ist
  if (!isIconTypeAvailable(iconType)) {
    console.warn(`Icon-Typ '${iconType}' ist nicht verfügbar. Verfügbare Typen:`, getAvailableIconTypes());
    return lerneinheit;
  }
  
  // Position in Pixeln berechnen
  const xPosition = lerneinheit.data.width * xPercent;
  const yPosition = lerneinheit.data.height * yPercent;
  
  // Icon-Objekt mit zentrierter Position erstellen
  // -50% der Icon-Breite und -Höhe für die Zentrierung auf dem Punkt
  const statusIcons = [
    {
      type: iconType,
      x: xPosition - (iconWidth * 0.5), // -50% der Icon-Breite für Zentrierung
      y: yPosition - (iconHeight * 0.5), // -50% der Icon-Höhe für Zentrierung
    }
  ];
  
  return {
    ...lerneinheit,
    data: {
      ...lerneinheit.data,
      statusIcons
    }
  };
};

/**
 * Erstellt eine Lerneinheit mit einem zentral positionierten Icon und Icon-Komponente
 * @param {Object} lerneinheit - Lerneinheit-Objekt
 * @param {string} iconType - Typ des Icons
 * @param {number} xPercent - X-Position in Prozent der Lerneinheit-Breite (0-1)
 * @param {number} yPercent - Y-Position in Prozent der Lerneinheit-Höhe (0-1)
 * @param {number} iconWidth - Breite des Icons in Pixeln
 * @param {number} iconHeight - Höhe des Icons in Pixeln
 * @returns {Object} Lerneinheit mit Icon-Komponente und zentrierter Position
 */
export const createLerneinheitWithCenteredIconComponent = (lerneinheit, iconType = 'favoritIcon', xPercent = 0.5, yPercent = 0.3, iconWidth = 6000, iconHeight = 6000) => {
  // Überprüfen, ob der Icon-Typ verfügbar ist
  if (!isIconTypeAvailable(iconType)) {
    console.warn(`Icon-Typ '${iconType}' ist nicht verfügbar. Verfügbare Typen:`, getAvailableIconTypes());
    return lerneinheit;
  }
  
  // Position in Pixeln berechnen
  const xPosition = lerneinheit.data.width * xPercent;
  const yPosition = lerneinheit.data.height * yPercent;
  
  // Icon-Komponente mit zentrierter Position erstellen
  // -50% der Icon-Breite und -Höhe für die Zentrierung auf dem Punkt
  const statusIcons = [
    {
      type: iconType,
      component: iconMap[iconType],
      x: xPosition - (iconWidth * 0.5), // -50% der Icon-Breite für Zentrierung
      y: yPosition - (iconHeight * 0.5), // -50% der Icon-Höhe für Zentrierung
    }
  ];
  
  return {
    ...lerneinheit,
    data: {
      ...lerneinheit.data,
      statusIcons
    }
  };
};

/**
 * Erstellt eine Lerneinheit mit benutzerdefinierten Icons
 * @param {Object} lerneinheit - Lerneinheit-Objekt
 * @param {Array} iconTypes - Array mit Icon-Typen ['leftIconType', 'rightIconType']
 * @returns {Object} Lerneinheit mit Icons
 */
export const createLerneinheitWithCustomIcons = (lerneinheit, iconTypes = ['favoritIcon', 'doneIcon']) => {
  if (iconTypes.length < 2) {
    console.warn('createLerneinheitWithCustomIcons: Mindestens 2 Icon-Typen erforderlich');
    return lerneinheit;
  }
  
  const [leftType, rightType] = iconTypes;
  
  // Überprüfen, ob die Icon-Typen verfügbar sind
  if (!isIconTypeAvailable(leftType)) {
    console.warn(`Icon-Typ '${leftType}' ist nicht verfügbar. Verfügbare Typen:`, getAvailableIconTypes());
    return lerneinheit;
  }
  
  if (!isIconTypeAvailable(rightType)) {
    console.warn(`Icon-Typ '${rightType}' ist nicht verfügbar. Verfügbare Typen:`, getAvailableIconTypes());
    return lerneinheit;
  }
  
  return createLerneinheitWithIcons(lerneinheit, leftType, rightType);
};

/**
 * Erstellt eine Lerneinheit mit einem Icon an einer Standard-Position
 * @param {Object} lerneinheit - Lerneinheit-Objekt
 * @param {string} iconType - Typ des Icons
 * @param {string} positionPreset - Standard-Position (z.B. 'centerTop', 'leftMiddle')
 * @returns {Object} Lerneinheit mit Icon
 */
export const createLerneinheitWithPresetIcon = (lerneinheit, iconType = 'favoritIcon', positionPreset = 'centerTop') => {
  const position = singleIconPositionPresets[positionPreset];
  
  if (!position) {
    console.warn(`Position-Preset '${positionPreset}' ist nicht verfügbar. Verfügbare Presets:`, Object.keys(singleIconPositionPresets));
    return lerneinheit;
  }
  
  return createLerneinheitWithSingleIcon(lerneinheit, iconType, position.x, position.y);
};

/**
 * Erstellt alle Lerneinheiten mit Standard-Icons
 * @param {Array} lerneinheiten - Array von Lerneinheit-Objekten
 * @param {string} preset - Icon-Preset (default, progress, status, custom)
 * @returns {Array} Array von Lerneinheiten mit Icons
 */
export const createAllLerneinheitenWithIcons = (lerneinheiten, preset = 'default') => {
  const [leftType, rightType] = iconTypePresets[preset] || iconTypePresets.default;
  
  return lerneinheiten.map(lerneinheit => 
    createLerneinheitWithIcons(lerneinheit, leftType, rightType)
  );
};

// Beispiel-Funktionen für spezifische Icon-Typen
/**
 * Beispiel: Erstellt eine Lerneinheit mit einer DoneIconNode bei 50% X und 30% Y
 * @param {Object} lerneinheit - Lerneinheit-Objekt
 * @returns {Object} Lerneinheit mit DoneIconNode
 */
export const createLerneinheitWithDoneIcon = (lerneinheit) => {
  return createLerneinheitWithSingleIcon(
    lerneinheit,
    'doneIcon',  // DoneIconNode verwenden
    0.5,         // 50% X-Position (mittig)
    0.3          // 30% Y-Position (oben)
  );
};

/**
 * Beispiel: Erstellt eine Lerneinheit mit einer DoneIconNode und Icon-Komponente
 * @param {Object} lerneinheit - Lerneinheit-Objekt
 * @returns {Object} Lerneinheit mit DoneIconNode-Komponente
 */
export const createLerneinheitWithDoneIconComponent = (lerneinheit) => {
  return createLerneinheitWithSingleIconComponent(
    lerneinheit,
    'doneIcon',  // DoneIconNode verwenden
    0.5,         // 50% X-Position (mittig)
    0.3          // 30% Y-Position (oben)
  );
};

/**
 * Beispiel: Erstellt eine Lerneinheit mit einer zentrierten DoneIconNode bei 50% X und 30% Y
 * @param {Object} lerneinheit - Lerneinheit-Objekt
 * @returns {Object} Lerneinheit mit zentrierter DoneIconNode
 */
export const createLerneinheitWithCenteredDoneIcon = (lerneinheit) => {
  return createLerneinheitWithCenteredIcon(
    lerneinheit,
    'doneIcon',  // DoneIconNode verwenden
    0.5,         // 50% X-Position (mittig)
    0.3,         // 30% Y-Position (oben)
    6000,        // Icon-Breite in Pixeln
    6000         // Icon-Höhe in Pixeln
  );
};

// 6er-Grid spezifische Funktionen
/**
 * Erstellt alle 6er-Grid Lerneinheiten mit Icons als echte Children
 * Verwendet die gleiche Icon-Positionierungs-Logik wie der 9er-Grid
 * @param {Array} lerneinheiten - Array von 6er-Grid Lerneinheiten
 * @param {string} iconType - Typ des Icons (Standard: 'doneIcon')
 * @returns {Array} Array von Lerneinheiten mit Icon-Positionen
 */
export const createSixGridLerneinheitenWithIcons = (lerneinheiten, iconType = 'doneIcon') => {
  return lerneinheiten.map(lerneinheit => {
    // Berechne die tatsächliche gerenderte Icon-Größe basierend auf der Lerneinheit-Skalierung
    const lerneinheitWidth = lerneinheit.data.width;
    const lerneinheitHeight = lerneinheit.data.height;
    
    // Ursprüngliche Standard-Größe: 18000x12000
    const originalWidth = 18000;
    const originalHeight = 12000;
    
    // Berechne den Skalierungsfaktor
    const scaleRatio = Math.min(lerneinheitWidth / originalWidth, lerneinheitHeight / originalHeight);
    
    // Berechne die tatsächliche Icon-Größe nach Skalierung
    const actualIconSize = 6000 * scaleRatio; // 6000px × scaleRatio
    
    // Verwende die gleiche Logik wie beim 9er-Grid
    const iconPosition = calculateSingleIconPosition(
      { x: 0.5, y: 0.3 }, // Relative Position: 50% Breite, 30% Höhe der Lerneinheit
      lerneinheitWidth,     // Lerneinheit-Breite
      lerneinheitHeight,    // Lerneinheit-Höhe
      actualIconSize,       // Icon-Breite (echte gerenderte Größe)
      actualIconSize        // Icon-Höhe (echte gerenderte Größe)
    );
    
    // Icon-Objekt mit korrekter Positionierung erstellen
    const statusIcons = [
      {
        type: iconType,
        x: iconPosition.centerIcon.x,
        y: iconPosition.centerIcon.y,
        offsetX: iconPosition.calculations.offsetX,
        offsetY: iconPosition.calculations.offsetY
      }
    ];
    
    return {
      ...lerneinheit,
      data: {
        ...lerneinheit.data,
        statusIcons
      }
    };
  });
};

/**
 * NEUE FUNKTION: Erstellt 6er-Grid Lerneinheiten direkt mit den korrekten Container-Dimensionen
 * Funktion implementiert die relative Positionierungslogik direkt (5% X, 10% Y) - OHNE Icons
 * @param {string} iconType - Typ des Icons (wird nicht mehr verwendet, aber für Kompatibilität beibehalten)
 * @param {Object} imageSources - Bild-Quellen für die Lerneinheiten
 * @returns {Array} Array mit 5 Learning Units OHNE Icons
 */
export const createSixGridLerneinheitenWithCorrectDimensions = (iconType = 'doneIcon', imageSources = {}) => {
  // Container-Dimensionen: 57600 x 28800 (20% kleiner als vorher)
  const containerWidth = 57600;
  const containerHeight = 28800;
  
  // Skalierungsfaktor für Lerneinheiten berechnen (20% kleiner)
  const scaleFactor = 0.96; // 20% kleiner als vorher (72000 * 0.8 = 57600)
  
  // Zellen-Dimensionen berechnen (3 Spalten, 2 Zeilen)
  const cellWidth = containerWidth / 3;
  const cellHeight = containerHeight / 2;
  
  // 5 Learning Units für das 6er-Grid erstellen - OHNE Icons
  return [
    {
      id: 'six-grid-lerneinheit-1',
      type: 'lerneinheit',
      // Position: 5% X, 10% Y der ersten Zelle (oben links)
      position: { 
        x: 0 + (cellWidth * 0.05), 
        y: 0 + (cellHeight * 0.10) 
      },
      parentId: '6erContainer-level-1',
      data: {
        title: '6er Grid Lerneinheit 1',
        width: 18000 * scaleFactor, // 18000 * 1.2 = 21600
        height: 12000 * scaleFactor, // 12000 * 1.2 = 14400
        backgroundColor: '#e6fefc',
        borderColor: '#30b89b',
        fontSize: 960 * scaleFactor, // 960 * 1.2 = 1152
        imageSource: imageSources.pic1 || 'pic1',
      },
    },
    {
      id: 'six-grid-lerneinheit-2',
      type: 'lerneinheit',
      // Position: 5% X, 10% Y der zweiten Zelle (oben mittig)
      position: { 
        x: cellWidth + (cellWidth * 0.05), 
        y: 0 + (cellHeight * 0.10) 
      },
      parentId: '6erContainer-level-1',
      data: {
        title: '6er Grid Lerneinheit 2',
        width: 18000 * scaleFactor, // 18000 * 1.2 = 21600
        height: 12000 * scaleFactor, // 12000 * 1.2 = 14400
        backgroundColor: '#e6fefc',
        borderColor: '#30b89b',
        fontSize: 960 * scaleFactor, // 960 * 1.2 = 1152
        imageSource: imageSources.pic2 || 'pic2',
      },
    },
    {
      id: 'six-grid-lerneinheit-3',
      type: 'lerneinheit',
      // Position: 5% X, 10% Y der dritten Zelle (oben rechts)
      position: { 
        x: (2 * cellWidth) + (cellWidth * 0.05), 
        y: 0 + (cellHeight * 0.10) 
      },
      parentId: '6erContainer-level-1',
      data: {
        title: '6er Grid Lerneinheit 3',
        width: 18000 * scaleFactor, // 18000 * 1.2 = 21600
        height: 12000 * scaleFactor, // 12000 * 1.2 = 14400
        backgroundColor: '#e6fefc',
        borderColor: '#30b89b',
        fontSize: 960 * scaleFactor, // 960 * 1.2 = 1152
        imageSource: imageSources.pic3 || 'pic3',
      },
    },
    {
      id: 'six-grid-lerneinheit-4',
      type: 'lerneinheit',
      // Position: 5% X, 10% Y der vierten Zelle (unten links)
      position: { 
        x: 0 + (cellWidth * 0.05), 
        y: cellHeight + (cellHeight * 0.10) 
      },
      parentId: '6erContainer-level-1',
      data: {
        title: '6er Grid Lerneinheit 4',
        width: 18000 * scaleFactor, // 18000 * 1.2 = 21600
        height: 12000 * scaleFactor, // 12000 * 1.2 = 14400
        backgroundColor: '#e6fefc',
        borderColor: '#30b89b',
        fontSize: 960 * scaleFactor, // 960 * 1.2 = 1152
        imageSource: imageSources.pic4 || 'pic4',
      },
    },
    {
      id: 'six-grid-lerneinheit-5',
      type: 'lerneinheit',
      // Position: 5% X, 10% Y der fünften Zelle (unten mittig)
      position: { 
        x: cellWidth + (cellWidth * 0.05), 
        y: cellHeight + (cellHeight * 0.10) 
      },
      parentId: '6erContainer-level-1',
      data: {
        title: '6er Grid Lerneinheit 5',
        width: 18000 * scaleFactor, // 18000 * 1.2 = 21600
        height: 12000 * scaleFactor, // 12000 * 1.2 = 14400
        backgroundColor: '#e6fefc',
        borderColor: '#30b89b',
        fontSize: 960 * scaleFactor, // 960 * 1.2 = 1152
        imageSource: imageSources.pic5 || 'pic5',
      },
    }
  ];
};

/**
 * Erstellt 6er-Grid Lerneinheiten mit zwei Icons (linkes und rechtes Icon)
 * Verwendet die angepasste Icon-Positionierungs-Logik für den 6er-Grid
 * @param {Array} lerneinheiten - Array von 6er-Grid Lerneinheiten
 * @param {string} leftIconType - Typ des linken Icons (Standard: 'favoritIcon')
 * @param {string} rightIconType - Typ des rechten Icons (Standard: 'doneIcon')
 * @returns {Array} Array von Lerneinheiten mit zwei Icons
 */
export const createSixGridLerneinheitenWithDoubleIcons = (lerneinheiten, leftIconType = 'favoritIcon', rightIconType = 'doneIcon') => {
  return lerneinheiten.map(lerneinheit => {
    // Icon-Größe für Zentrierung berechnen (Standard: 20px)
    const iconWidth = 6000;
    const iconHeight = 6000;
    
    // Icon-Objekte mit relativen Positionen UND Icon-Zentrierung erstellen
    // EXAKT die gleiche Logik wie im 9er-Grid: relative Position minus 50% der Icon-Größe
    const statusIcons = [
      {
        type: leftIconType,
        x: 0.25 - (iconWidth * 0.5) / lerneinheit.data.width, // 25% minus 50% der Icon-Breite (zentriert)
        y: 0.3 - (iconHeight * 0.5) / lerneinheit.data.height,  // 30% minus 50% der Icon-Höhe (zentriert)
        offsetX: 0, // Kein zusätzlicher Offset
        offsetY: 0
      },
      {
        type: rightIconType,
        x: 0.75 - (iconWidth * 0.5) / lerneinheit.data.width, // 75% minus 50% der Icon-Breite (zentriert)
        y: 0.3 - (iconHeight * 0.5) / lerneinheit.data.height,  // 30% minus 50% der Icon-Höhe (zentriert)
        offsetX: 0, // Kein zusätzlicher Offset
        offsetY: 0
      }
    ];
    
    return {
      ...lerneinheit,
      data: {
        ...lerneinheit.data,
        statusIcons
      }
    };
  });
};

/**
 * PROBE-FUNKTION: Erstellt 6er-Grid Lerneinheiten MIT zwei Icons (Favorit-Icon + Done-Icon)
 * Verwendet die neue Icon-Positionierungs-Logik für den 6er-Grid
 * @param {Object} imageSources - Bild-Quellen für die Lerneinheiten
 * @returns {Array} Array mit 5 Learning Units MIT zwei Icons (favoritIcon + doneIcon)
 */
export const createSixGridLerneinheitenWithDoubleIconsProbe = (imageSources = {}) => {
  // Erst die Basis-Lerneinheiten ohne Icons erstellen
  const basisLerneinheiten = createSixGridLerneinheitenWithCorrectDimensions('doneIcon', imageSources);
  
  // Dann die Icons hinzufügen: Favorit-Icon (links) + Done-Icon (rechts)
  return createSixGridLerneinheitenWithDoubleIcons(
    basisLerneinheiten,
    'favoritIcon',  // Linkes Icon: Favorit-Icon
    'doneIcon'      // Rechtes Icon: Done-Icon
  );
};

/**
 * Erstellt eine einzelne 6er-Grid Lerneinheit mit Icon
 * @param {Object} lerneinheit - Lerneinheit-Objekt
 * @param {string} iconType - Typ des Icons (Standard: 'doneIcon')
 * @returns {Object} Lerneinheit mit Icon
 */
export const createSingleSixGridLerneinheitWithIcon = (lerneinheit, iconType = 'doneIcon') => {
  const lerneinheiten = [lerneinheit];
  const result = createSixGridLerneinheitenWithIcons(lerneinheiten, iconType);
  return result[0];
};

/**
 * Erstellt 6er-Grid Level-2 Lerneinheiten (alle 6 Zellen gefüllt)
 * Level-2 Container: 50% der Basis-Größe (28800 x 14400)
 * @param {Object} imageSources - Bild-Quellen für die Lerneinheiten
 * @returns {Array} Array mit 6 Learning Units für Level-2 Container
 */
export const createSixGridLevel2Lerneinheiten = (imageSources = {}) => {
  // Level-2 Container-Dimensionen: 50% der Basis-Größe
  const containerWidth = 28800;  // 57600 * 0.5
  const containerHeight = 14400; // 28800 * 0.5
  
  // Skalierungsfaktor für Lerneinheiten (etwas kleiner für bessere Passform in Level-2)
  const scaleFactor = 0.4;
  
  // Zellen-Dimensionen berechnen (3 Spalten, 2 Zeilen)
  const cellWidth = containerWidth / 3;  // 9600
  const cellHeight = containerHeight / 2; // 7200
  
  // 6 Learning Units für das 6er-Grid Level-2 erstellen
  return [
    {
      id: 'six-grid-level2-lerneinheit-1',
      type: 'lerneinheit',
      // Position: 5% X, 10% Y der ersten Zelle (oben links)
      position: { 
        x: 0 + (cellWidth * 0.05), 
        y: 0 + (cellHeight * 0.10) 
      },
      parentId: '6erContainer-level-2',
      data: {
        title: '6er L2 Lerneinheit 1',
        width: 18000 * scaleFactor, // 9000
        height: 12000 * scaleFactor, // 6000
        backgroundColor: '#e6fefc',
        borderColor: '#30b89b',
        fontSize: 960 * scaleFactor, // 480
        imageSource: imageSources.pic1 || 'pic1',
      },
    },
    {
      id: 'six-grid-level2-lerneinheit-2',
      type: 'lerneinheit',
      // Position: 5% X, 10% Y der zweiten Zelle (oben mittig)
      position: { 
        x: cellWidth + (cellWidth * 0.05), 
        y: 0 + (cellHeight * 0.10) 
      },
      parentId: '6erContainer-level-2',
      data: {
        title: '6er L2 Lerneinheit 2',
        width: 18000 * scaleFactor, // 9000
        height: 12000 * scaleFactor, // 6000
        backgroundColor: '#e6fefc',
        borderColor: '#30b89b',
        fontSize: 960 * scaleFactor, // 480
        imageSource: imageSources.pic2 || 'pic2',
      },
    },
    {
      id: 'six-grid-level2-lerneinheit-3',
      type: 'lerneinheit',
      // Position: 5% X, 10% Y der dritten Zelle (oben rechts)
      position: { 
        x: (2 * cellWidth) + (cellWidth * 0.05), 
        y: 0 + (cellHeight * 0.10) 
      },
      parentId: '6erContainer-level-2',
      data: {
        title: '6er L2 Lerneinheit 3',
        width: 18000 * scaleFactor, // 9000
        height: 12000 * scaleFactor, // 6000
        backgroundColor: '#e6fefc',
        borderColor: '#30b89b',
        fontSize: 960 * scaleFactor, // 480
        imageSource: imageSources.pic3 || 'pic3',
      },
    },
    {
      id: 'six-grid-level2-lerneinheit-4',
      type: 'lerneinheit',
      // Position: 5% X, 10% Y der vierten Zelle (unten links)
      position: { 
        x: 0 + (cellWidth * 0.05), 
        y: cellHeight + (cellHeight * 0.10) 
      },
      parentId: '6erContainer-level-2',
      data: {
        title: '6er L2 Lerneinheit 4',
        width: 18000 * scaleFactor, // 9000
        height: 12000 * scaleFactor, // 6000
        backgroundColor: '#e6fefc',
        borderColor: '#30b89b',
        fontSize: 960 * scaleFactor, // 480
        imageSource: imageSources.pic4 || 'pic4',
      },
    },
    {
      id: 'six-grid-level2-lerneinheit-5',
      type: 'lerneinheit',
      // Position: 5% X, 10% Y der fünften Zelle (unten mittig)
      position: { 
        x: cellWidth + (cellWidth * 0.05), 
        y: cellHeight + (cellHeight * 0.10) 
      },
      parentId: '6erContainer-level-2',
      data: {
        title: '6er L2 Lerneinheit 5',
        width: 18000 * scaleFactor, // 9000
        height: 12000 * scaleFactor, // 6000
        backgroundColor: '#e6fefc',
        borderColor: '#30b89b',
        fontSize: 960 * scaleFactor, // 480
        imageSource: imageSources.pic5 || 'pic5',
      },
    },
    {
      id: 'six-grid-level2-lerneinheit-6',
      type: 'lerneinheit',
      // Position: 5% X, 10% Y der sechsten Zelle (unten rechts)
      position: { 
        x: (2 * cellWidth) + (cellWidth * 0.05), 
        y: cellHeight + (cellHeight * 0.10) 
      },
      parentId: '6erContainer-level-2',
      data: {
        title: '6er L2 Lerneinheit 6',
        width: 18000 * scaleFactor, // 9000
        height: 12000 * scaleFactor, // 6000
        backgroundColor: '#e6fefc',
        borderColor: '#30b89b',
        fontSize: 960 * scaleFactor, // 480
        imageSource: imageSources.pic6 || 'pic6',
      },
    }
  ];
};

/**
 * Erstellt 6er-Grid Level-2 Lerneinheiten mit Icons
 * Level-2 Container: 50% der Basis-Größe (28800 x 14400)
 * @param {Object} imageSources - Bild-Quellen für die Lerneinheiten
 * @param {Array} singleIconTypes - Array mit Icon-Typen für die ersten drei Zellen ['icon1', 'icon2', 'icon3']
 * @param {Array} doubleIconTypes - Array mit Icon-Paaren für die letzten drei Zellen [['left1', 'right1'], ['left2', 'right2'], ['left3', 'right3']]
 * @returns {Array} Array mit 6 Learning Units für Level-2 Container (erste 3 mit einzelnen Icons, letzte 3 mit doppelten Icons)
 */
export const createSixGridLevel2LerneinheitenWithIcons = (
  imageSources = {}, 
  singleIconTypes = ['favoritIcon', 'doneIcon', 'startedIcon'],
  doubleIconTypes = [
    ['favoritIcon', 'doneIcon'],
    ['startedIcon', 'deadlineIcon'],
    ['lockedIcon', 'favoritIcon']
  ]
) => {
  // Erst die Basis-Lerneinheiten ohne Icons erstellen
  const basisLerneinheiten = createSixGridLevel2Lerneinheiten(imageSources);
  
  // Icons zu allen Lerneinheiten hinzufügen
  const lerneinheitenMitIcons = basisLerneinheiten.map((lerneinheit, index) => {
    // Die ersten drei Zellen (obere Reihe) bekommen einzelne Icons
    if (index < 3) {
      const iconType = singleIconTypes[index] || 'favoritIcon';
      
      // Icon-Größe für Level-2 berechnen (etwas größer für bessere Sichtbarkeit)
      const iconWidth = 6000 * 0.6;  // 3600 (etwas größer als 50%)
      const iconHeight = 6000 * 0.6; // 3600 (etwas größer als 50%)
      
      // Einzelnes Icon mit bekannter Logik hinzufügen (zentriert bei 50% X, 30% Y)
      return createLerneinheitWithSingleIcon(
        lerneinheit,
        iconType,
        0.5, // 50% X-Position (mittig)
        0.3, // 30% Y-Position (oben)
        iconWidth,
        iconHeight
      );
    }
    
    // Die letzten drei Zellen (untere Reihe) bekommen doppelte Icons
    else {
      const iconPair = doubleIconTypes[index - 3] || ['favoritIcon', 'doneIcon'];
      const [leftIconType, rightIconType] = iconPair;
      
      // Icon-Größe für Level-2 berechnen (etwas größer für bessere Sichtbarkeit)
      const iconWidth = 6000 * 0.6;  // 3600 (etwas größer als 50%)
      const iconHeight = 6000 * 0.6; // 3600 (etwas größer als 50%)
      
      // Doppelte Icons mit angepasster Größe für Level-2 hinzufügen
      const iconPositions = calculateDoubleIconPositions(
        lerneinheit.position,
        lerneinheit.data.width,
        lerneinheit.data.height,
        iconWidth,  // Level-2 Icon-Breite
        iconHeight  // Level-2 Icon-Höhe
      );
      
      // Icon-Objekte mit relativen Positionen erstellen
      const statusIcons = [
        {
          type: leftIconType,
          x: iconPositions.leftIcon.x - lerneinheit.position.x, // Relative Position innerhalb der Lerneinheit
          y: iconPositions.leftIcon.y - lerneinheit.position.y
        },
        {
          type: rightIconType,
          x: iconPositions.rightIcon.x - lerneinheit.position.x, // Relative Position innerhalb der Lerneinheit
          y: iconPositions.rightIcon.y - lerneinheit.position.y
        }
      ];
      
      return {
        ...lerneinheit,
        data: {
          ...lerneinheit.data,
          statusIcons
        }
      };
    }
  });
  
  return lerneinheitenMitIcons;
};