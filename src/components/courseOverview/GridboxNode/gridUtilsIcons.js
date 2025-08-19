// Grid-Utilities für Icon-Positionierung auf Lerneinheiten
// Berechnet die relativen Positionen für ein oder zwei Icons basierend auf Lerneinheit-Dimensionen

// Import aller verfügbaren Status-Icons
import FavoritIconNode from '../../status/FavoritIconNode';
import DoneIconNode from '../../status/DoneIconNode';
import DeadlineIconNode from '../../status/DeadlineIconNode';
import StartedIconNode from '../../status/StartedIconNode';
import LockedIconNode from '../../status/LockedIconNode';

// Icon-Map für alle verfügbaren Status-Icons
export const iconMap = {
  favoritIcon: FavoritIconNode,
  doneIcon: DoneIconNode,
  deadlineIcon: DeadlineIconNode,
  startedIcon: StartedIconNode,
  lockedIcon: LockedIconNode,
};

/**
 * Berechnet die Positionen für zwei Icons auf einer Lerneinheit
 * @param {Object} lerneinheitPosition - Die Position der Lerneinheit { x, y }
 * @param {number} lerneinheitWidth - Breite der Lerneinheit
 * @param {number} lerneinheitHeight - Höhe der Lerneinheit
 * @param {number} iconWidth - Breite des Icons (Standard: 20px)
 * @param {number} iconHeight - Höhe des Icons (Standard: 20px)
 * @returns {Object} Positionen für linkes und rechtes Icon
 */
export const calculateDoubleIconPositions = (lerneinheitPosition, lerneinheitWidth, lerneinheitHeight, iconWidth = 6000, iconHeight = 6000) => {
  // X-Position berechnen: Gesamtbreite durch 2 und das Ergebnis wieder halbieren
  const x = lerneinheitWidth / 2 / 2; // = lerneinheitWidth / 4
  
  // Y-Position: 30% der Lerneinheit-Höhe (entspricht der Mitte des Bildbereichs)
  const y = lerneinheitHeight * 0.3;
  
  // Linkes Icon: 1 × x für X-Wert, 30% der Lerneinheit für Y-Wert, minus 50% der Icon-Dimensionen
  const leftIconPosition = {
    x: lerneinheitPosition.x + x - (iconWidth * 0.5),
    y: lerneinheitPosition.y + y - (iconHeight * 0.5)
  };
  
  // Rechtes Icon: 3 × x für X-Wert, 30% der Lerneinheit für Y-Wert, minus 50% der Icon-Dimensionen
  const rightIconPosition = {
    x: lerneinheitPosition.x + (3 * x) - (iconWidth * 0.5),
    y: lerneinheitPosition.y + y - (iconHeight * 0.5)
  };
  
  return {
    leftIcon: leftIconPosition,
    rightIcon: rightIconPosition,
    // Zusätzliche Informationen für Debugging
    calculations: {
      baseX: x,
      baseY: y,
      lerneinheitWidth,
      lerneinheitHeight,
      lerneinheitPosition,
      iconWidth,
      iconHeight,
      offsetX: iconWidth * 0.5,
      offsetY: iconHeight * 0.5
    }
  };
};

/**
 * Berechnet die Position für ein einzelnes Icon mittig in der oberen 60% der Lerneinheit
 * @param {Object} lerneinheitPosition - Die Position der Lerneinheit { x, y }
 * @param {number} lerneinheitWidth - Breite der Lerneinheit
 * @param {number} lerneinheitHeight - Höhe der Lerneinheit
 * @param {number} iconWidth - Breite des Icons (Standard: 20px)
 * @param {number} iconHeight - Höhe des Icons (Standard: 20px)
 * @returns {Object} Position für das mittige Icon
 */
export const calculateSingleIconPosition = (lerneinheitPosition, lerneinheitWidth, lerneinheitHeight, iconWidth = 6000, iconHeight = 6000) => {
  // Verwende die übergebene relative Position (z.B. { x: 0.5, y: 0.3 })
  const x = lerneinheitPosition.x;  // z.B. 0.5 (50% der Lerneinheit-Breite)
  const y = lerneinheitPosition.y;  // z.B. 0.3 (30% der Lerneinheit-Höhe)
  
  // Berechne die Offset-Werte für die Icon-Zentrierung
  // Als relative Werte (0-1) basierend auf der Lerneinheit-Größe
  const offsetX = (iconWidth * 0.5) / lerneinheitWidth;  // 750px / 18000 = 0.04167
  const offsetY = (iconHeight * 0.5) / lerneinheitHeight; // 750px / 12000 = 0.0625
  
  return {
    centerIcon: {
      x: x - offsetX,  // z.B. 0.5 - 0.04167 = 0.45833 (relative Position minus Icon-Zentrierung)
      y: y - offsetY   // z.B. 0.3 - 0.0625 = 0.2375 (relative Position minus Icon-Zentrierung)
    },
    // Zusätzliche Informationen für Debugging
    calculations: {
      lerneinheitWidth,
      lerneinheitHeight,
      lerneinheitPosition,
      iconWidth,
      iconHeight,
      offsetX,  // 0.04167 (als relativer Wert)
      offsetY,  // 0.0625 (als relativer Wert)
      baseX: x,
      baseY: y
    }
  };
};

/**
 * Berechnet Icon-Positionen für alle Lerneinheiten in einem Grid
 * @param {Array} lerneinheiten - Array von Lerneinheit-Objekten
 * @returns {Array} Array mit Icon-Positionen für jede Lerneinheit
 */
export const calculateAllIconPositions = (lerneinheiten) => {
  return lerneinheiten.map(lerneinheit => {
    const iconPositions = calculateDoubleIconPositions(
      lerneinheit.position,
      lerneinheit.data.width,
      lerneinheit.data.height,
      6000, // Standard Icon-Breite
      6000  // Standard Icon-Höhe
    );
    
    return {
      lerneinheitId: lerneinheit.id,
      iconPositions
    };
  });
};

/**
 * Debug-Funktion: Zeigt alle berechneten Icon-Positionen an
 * @param {Array} lerneinheiten - Array von Lerneinheit-Objekten
 */
export const debugIconPositions = (lerneinheiten) => {
  console.log('=== DEBUG: Icon-Positionen ===');
  
  lerneinheiten.forEach(lerneinheit => {
    const iconPositions = calculateDoubleIconPositions(
      lerneinheit.position,
      lerneinheit.data.width,
      lerneinheit.data.height,
      6000, // Standard Icon-Breite
      6000  // Standard Icon-Höhe
    );
    
    console.log(`${lerneinheit.id}:`);
    console.log(`  Lerneinheit: ${lerneinheit.data.width} × ${lerneinheit.data.height} bei ${lerneinheit.position.x}, ${lerneinheit.position.y}`);
    console.log(`  Linkes Icon: x=${iconPositions.leftIcon.x}, y=${iconPositions.leftIcon.y}`);
    console.log(`  Rechtes Icon: x=${iconPositions.rightIcon.x}, y=${iconPositions.rightIcon.y}`);
    console.log(`  Berechnungen: x=${iconPositions.calculations.baseX}, y=${iconPositions.calculations.baseY}`);
  });
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
 * Standard-Icon-Typen für verschiedene Lerneinheit-Kategorien
 */
export const iconTypePresets = {
  default: ['favoritIcon', 'doneIcon'],
  progress: ['startedIcon', 'doneIcon'],
  status: ['lockedIcon', 'deadlineIcon'],
  custom: ['favoritIcon', 'deadlineIcon']
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

/**
 * Zeigt alle verfügbaren Icon-Typen an
 * @returns {Array} Array mit allen verfügbaren Icon-Typen
 */
export const getAvailableIconTypes = () => {
  return Object.keys(iconMap);
};

/**
 * Überprüft, ob ein Icon-Typ verfügbar ist
 * @param {string} iconType - Der zu überprüfende Icon-Typ
 * @returns {boolean} true, wenn der Icon-Typ verfügbar ist
 */
export const isIconTypeAvailable = (iconType) => {
  return iconType in iconMap;
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
 * Erstellt eine Lerneinheit mit einem einzelnen zentral positionierten Icon
 * @param {Object} lerneinheit - Lerneinheit-Objekt
 * @param {string} iconType - Typ des Icons (z.B. 'favoritIcon', 'doneIcon')
 * @param {number} xPercent - X-Position in Prozent der Lerneinheit-Breite (0-1)
 * @param {number} yPercent - Y-Position in Prozent der Lerneinheit-Höhe (0-1)
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
  // Container-Dimensionen: 57600 x 28800 (ursprüngliche Größe)
  const containerWidth = 57600;
  const containerHeight = 28800;
  
  // Skalierungsfaktor für Lerneinheiten berechnen (ursprüngliche Größe)
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
      parentId: '6erContainer-1-level-1',
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
      parentId: '6erContainer-1-level-1',
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
      parentId: '6erContainer-1-level-1',
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
      parentId: '6erContainer-1-level-1',
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
      parentId: '6erContainer-1-level-1',
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
 * NEUE FUNKTION: Berechnet die Positionen für zwei Icons auf einer 6er-Grid Lerneinheit
 * Angepasst für 2 Zeilen statt 3 Zeilen wie im 9er-Grid
 * @param {Object} lerneinheitPosition - Die Position der Lerneinheit { x, y }
 * @param {number} lerneinheitWidth - Breite der Lerneinheit
 * @param {number} lerneinheitHeight - Höhe der Lerneinheit
 * @param {number} iconWidth - Breite des Icons (Standard: 20px)
 * @param {number} iconHeight - Höhe des Icons (Standard: 20px)
 * @returns {Object} Positionen für linkes und rechtes Icon
 */
export const calculateSixGridDoubleIconPositions = (lerneinheitPosition, lerneinheitWidth, lerneinheitHeight, iconWidth = 20, iconHeight = 20) => {
  // X-Position berechnen: Gesamtbreite durch 2 und das Ergebnis wieder halbieren
  // Gleiche Logik wie im 9er-Grid: lerneinheitWidth / 4
  const x = lerneinheitWidth / 2 / 2; // = lerneinheitWidth / 4
  
  // Y-Position: 30% der Lerneinheit-Höhe (entspricht der Mitte des Bildbereichs)
  // Gleiche Logik wie im 9er-Grid: lerneinheitHeight * 0.3
  const y = lerneinheitHeight * 0.3;
  
  // Linkes Icon: 1 × x für X-Wert, 30% der Lerneinheit für Y-Wert, minus 50% der Icon-Dimensionen
  // Gleiche Logik wie im 9er-Grid
  const leftIconPosition = {
    x: lerneinheitPosition.x + x - (iconWidth * 0.5),
    y: lerneinheitPosition.y + y - (iconHeight * 0.5)
  };
  
  // Rechtes Icon: 3 × x für X-Wert, 30% der Lerneinheit für Y-Wert, minus 50% der Icon-Dimensionen
  // Gleiche Logik wie im 9er-Grid
  const rightIconPosition = {
    x: lerneinheitPosition.x + (3 * x) - (iconWidth * 0.5),
    y: lerneinheitPosition.y + y - (iconHeight * 0.5)
  };
  
  return {
    leftIcon: leftIconPosition,
    rightIcon: rightIconPosition,
    // Zusätzliche Informationen für Debugging
    calculations: {
      baseX: x,
      baseY: y,
      lerneinheitWidth,
      lerneinheitHeight,
      lerneinheitPosition,
      iconWidth,
      iconHeight,
      offsetX: iconWidth * 0.5,
      offsetY: iconHeight * 0.5,
      gridType: '6er-Grid (2 Zeilen)',
      note: 'Verwendet die gleiche Icon-Positionierungslogik wie der 9er-Grid'
    }
  };
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
    // EXAKT die gleiche Logik wie im 9er-Grid verwenden:
    // 1. Berechne die tatsächliche gerenderte Icon-Größe basierend auf der Lerneinheit-Skalierung
    const lerneinheitWidth = lerneinheit.data.width;
    const lerneinheitHeight = lerneinheit.data.height;
    
    // Ursprüngliche Standard-Größe: 18000x12000
    const originalWidth = 18000;
    const originalHeight = 12000;
    
    // Berechne den Skalierungsfaktor (gleiche Logik wie im 9er-Grid)
    const scaleRatio = Math.min(lerneinheitWidth / originalWidth, lerneinheitHeight / originalHeight);
    
    // Berechne die tatsächliche Icon-Größe nach Skalierung (20px × 300 × scaleRatio)
    const actualIconSize = 20 * 300 * scaleRatio; // 6000px × scaleRatio
    
    // 2. Verwende calculateSingleIconPosition für korrekte Icon-Zentrierung (gleiche Logik wie im 9er-Grid)
    const leftIconPosition = calculateSingleIconPosition(
      { x: 0.25, y: 0.3 }, // Relative Position: 25% Breite, 30% Höhe der Lerneinheit
      lerneinheitWidth,      // Lerneinheit-Breite
      lerneinheitHeight,     // Lerneinheit-Höhe
      actualIconSize,        // Icon-Breite (echte gerenderte Größe)
      actualIconSize         // Icon-Höhe (echte gerenderte Größe)
    );
    
    const rightIconPosition = calculateSingleIconPosition(
      { x: 0.75, y: 0.3 }, // Relative Position: 75% Breite, 30% Höhe der Lerneinheit
      lerneinheitWidth,      // Lerneinheit-Breite
      lerneinheitHeight,     // Lerneinheit-Höhe
      actualIconSize,        // Icon-Breite (echte gerenderte Größe)
      actualIconSize         // Icon-Höhe (echte gerenderte Größe)
    );
    
    // 3. Icon-Objekte mit korrekter Positionierung erstellen (gleiche Struktur wie im 9er-Grid)
    const statusIcons = [
      {
        type: leftIconType,
        x: leftIconPosition.centerIcon.x,
        y: leftIconPosition.centerIcon.y,
        offsetX: leftIconPosition.calculations.offsetX,
        offsetY: leftIconPosition.calculations.offsetY
      },
      {
        type: rightIconType,
        x: rightIconPosition.centerIcon.x,
        y: rightIconPosition.centerIcon.y,
        offsetX: rightIconPosition.calculations.offsetX,
        offsetY: rightIconPosition.calculations.offsetY
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
 * Debug-Funktion: Zeigt alle 6er-Grid Icon-Positionen an
 * @param {Array} lerneinheiten - Array von 6er-Grid Lerneinheiten
 */
export const debugSixGridIconPositions = (lerneinheiten) => {
  console.log('=== DEBUG: 6er-Grid Icon-Positionen ===');
  
  lerneinheiten.forEach(lerneinheit => {
    if (lerneinheit.data.statusIcons && lerneinheit.data.statusIcons.length > 0) {
      const icon = lerneinheit.data.statusIcons[0];
      console.log(`${lerneinheit.id}:`);
      console.log(`  Lerneinheit: ${lerneinheit.data.width} × ${lerneinheit.data.height}`);
      console.log(`  Icon-Typ: ${icon.type}`);
      console.log(`  Icon-Position: x=${icon.x}, y=${icon.y}`);
      console.log(`  Icon-Offset: offsetX=${icon.offsetX}, offsetY=${icon.offsetY}`);
    }
  });
};
