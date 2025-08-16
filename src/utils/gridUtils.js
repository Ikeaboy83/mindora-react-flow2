export function getGridPosition(row, col, cellWidth, cellHeight, gap = 10) {
  return {
    x: col * (cellWidth + gap),
    y: row * (cellHeight + gap),
  };
}

export function createGridNodes({
  idPrefix = 'lerneinheit',
  rows = 3,
  cols = 3,
  cellWidth = 90,
  cellHeight = 60,
  gap = 10,
  offsetX = 10,
  offsetY = 10,
  parentId = 'grid-box-1',
  parentX = 0,
  parentY = 0,
}) {
  const nodes = [];

  // Berechne die Gesamtgröße des Grids
  const gridWidth = cols * cellWidth + (cols - 1) * gap;
  const gridHeight = rows * cellHeight + (rows - 1) * gap;
  
  // Berechne die Container-Größe (mit Padding) 
  //Hier wird die Positionierung des Containers bestimmt der die Lerneinheiten enthält
  const containerWidth = 365; // GridBoxNode Breite
  const containerHeight = 285; // GridBoxNode Höhe
  
  // Berechne die Zentrierung
  const centerOffsetX = (containerWidth - gridWidth) / 2;
  const centerOffsetY = (containerHeight - gridHeight) / 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const id = `${idPrefix}-${row * cols + col + 1}`;
      const { x, y } = getGridPosition(row, col, cellWidth, cellHeight, gap);

      nodes.push({
        id,
        type: 'lerneinheit',
        position: {
          x: parentX + centerOffsetX + x, // Zentriert
          y: parentY + centerOffsetY + y, // Zentriert
        },
        parentId: parentId,
        extent: 'parent',
        data: {
          title: `LE ${row * cols + col + 1}`,
          width: cellWidth,
          height: cellHeight,
        },
      });
    }
  }

  return nodes;
}

/**
 * Berechnet die Position für ein Grid-Item basierend auf seiner Position im Grid
 * @param {Object} container - Der Grid-Container Node
 * @param {number} gridX - X-Position im Grid (0-basiert)
 * @param {number} gridY - Y-Position im Grid (0-basiert)
 * @returns {Object} Position {x, y} für das Item
 */
export function calculateGridItemPosition(container, gridX, gridY) {
  const { data, position: containerPos } = container;
  const { cellWidth, cellHeight, gap, padding } = data;
  
  const x = containerPos.x + padding + gridX * (cellWidth + gap);
  const y = containerPos.y + padding + gridY * (cellHeight + gap);
  
  return { x, y };
}

/**
 * Erstellt ein Grid-Layout mit automatisch positionierten Items
 * @param {Object} container - Der Grid-Container Node
 * @param {Array} items - Array von Grid-Items mit gridX, gridY Eigenschaften
 * @returns {Array} Array von Nodes mit korrekten Positionen
 */
export function createGridLayout(container, items) {
  return items.map((item, index) => {
    const position = calculateGridItemPosition(container, item.gridX, item.gridY);
    
    return {
      ...item,
      position,
      parentId: container.id,
    };
  });
}

/**
 * Validiert ob ein Grid-Item in den Container passt
 * @param {Object} container - Der Grid-Container Node
 * @param {Object} item - Das Grid-Item
 * @param {number} gridX - X-Position im Grid
 * @param {number} gridY - Y-Position im Grid
 * @returns {boolean} true wenn das Item passt
 */
export function validateGridItemPlacement(container, item, gridX, gridY) {
  const { data } = container;
  const { columns, rows, cellWidth, cellHeight } = data;
  
  // Prüfe ob Position im Grid liegt
  if (gridX < 0 || gridX >= columns || gridY < 0 || gridY >= rows) {
    return false;
  }
  
  // Prüfe ob Item-Dimensionen in die Zelle passen
  if (item.data.width > cellWidth || item.data.height > cellHeight) {
    return false;
  }
  
  return true;
}

/**
 * Erstellt einen Grid-Container mit Standard-Einstellungen
 * @param {string} id - Eindeutige ID
 * @param {Object} position - Position {x, y}
 * @param {Object} options - Optionale Einstellungen
 * @returns {Object} Grid-Container Node
 */
export function createGridContainer(id, position, options = {}) {
  const defaults = {
    columns: 3,
    rows: 1,
    cellWidth: 200,
    cellHeight: 150,
    gap: 20,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#30b89b',
    showGridLines: true,
    showCellPlaceholders: false,
  };
  
  return {
    id,
    type: 'gridContainer',
    position,
    data: { ...defaults, ...options },
  };
}

/**
 * Erstellt ein Grid-Item mit Standard-Einstellungen
 * @param {string} id - Eindeutige ID
 * @param {string} title - Titel des Items
 * @param {number} gridX - X-Position im Grid
 * @param {number} gridY - Y-Position im Grid
 * @param {Object} options - Optionale Einstellungen
 * @returns {Object} Grid-Item Node
 */
export function createGridItem(id, title, gridX, gridY, options = {}) {
  const defaults = {
    title,
    width: 200,
    height: 150,
    status: 'default',
    progress: 0,
    showIcon: false,
  };
  
  return {
    id,
    type: 'gridItem',
    gridX,
    gridY,
    data: { ...defaults, ...options },
  };
}
