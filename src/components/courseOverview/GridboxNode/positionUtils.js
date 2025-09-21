// Positionierungs-Utilities für Icon-Positionierung auf Lerneinheiten
// Berechnet die relativen Positionen für ein oder zwei Icons basierend auf Lerneinheit-Dimensionen

/**
 * Berechnet die Positionen für zwei Icons auf einer Lerneinheit
 * @param {Object} lerneinheitPosition - Die Position der Lerneinheit { x, y }
 * @param {number} lerneinheitWidth - Breite der Lerneinheit
 * @param {number} lerneinheitHeight - Höhe der Lerneinheit
 * @param {number} iconWidth - Breite des Icons (Standard: 6000px)
 * @param {number} iconHeight - Höhe des Icons (Standard: 6000px)
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
 * @param {number} iconWidth - Breite des Icons (Standard: 6000px)
 * @param {number} iconHeight - Höhe des Icons (Standard: 6000px)
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
 * Berechnet die Positionen für zwei Icons auf einer 6er-Grid Lerneinheit
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
