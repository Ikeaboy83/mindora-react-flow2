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
        parentNode: parentId,
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
