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
  parentX = 0, // NEU
  parentY = 0, // NEU
}) {
  const nodes = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const id = `${idPrefix}-${row * cols + col + 1}`;
      const { x, y } = getGridPosition(row, col, cellWidth, cellHeight, gap);

      nodes.push({
        id,
        type: 'lerneinheit',
        position: {
          x: parentX + offsetX + x, // NEU: parentX berücksichtigen
          y: parentY + offsetY + y, // NEU: parentY berücksichtigen
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
