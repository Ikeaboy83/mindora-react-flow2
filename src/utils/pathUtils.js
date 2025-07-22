export function generatePath(points) {
  if (points.length === 0) return '';
  
  const [firstPoint, ...remainingPoints] = points;
  let path = `M ${firstPoint[0]} ${firstPoint[1]}`;
  
  remainingPoints.forEach(point => {
    path += ` L ${point[0]} ${point[1]}`;
  });
  
  path += ' Z'; // Schließt den Pfad
  return path;
}

export function generateCapsulePath(width, height) {
  const radius = height / 2;
  const centerX1 = radius;
  const centerX2 = width - radius;
  const centerY = height / 2;
  
  return `
    M ${centerX1} 0
    L ${centerX2} 0
    A ${radius} ${radius} 0 0 1 ${centerX2} ${height}
    L ${centerX1} ${height}
    A ${radius} ${radius} 0 0 1 ${centerX1} 0
    Z
  `;
} 