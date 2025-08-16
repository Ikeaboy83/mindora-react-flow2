import React from 'react';
import { Handle, Position } from '@xyflow/react';

// 3Level3erGridContainerNode.jsx - Ein Node der wie ein Grid funktioniert aber als echter ReactFlow-Node
export default function GridContainerNode({ data, selected, children }) {
  const {
    columns = 3,
    rows = 1,
    cellWidth = 300,
    cellHeight = 150,
    gap = 20,
    padding = 20,
    backgroundColor = 'transparent',
    borderColor = '#30b89b',
    borderWidth = 2,
    borderRadius = 12,
    showGridLines = true,
    gridLineColor = '#e0e0e0',
    boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)'
  } = data;

  // Container-Dimensionen berechnen
  const containerWidth = columns * cellWidth + (columns - 1) * gap + padding * 2;
  const containerHeight = rows * cellHeight + (rows - 1) * gap + padding * 2;

  const nodeStyle = {
    position: 'relative',
    width: `${containerWidth}px`,
    height: `${containerHeight}px`,
    background: backgroundColor,
    padding: `${padding}px`,
    border: `${borderWidth}px solid ${borderColor}`,
    borderRadius: `${borderRadius}px`,
    boxShadow: selected 
      ? '0 8px 32px rgba(48, 184, 155, 0.3)' 
      : boxShadow,
    transition: 'all 0.3s ease',
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, ${cellWidth}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellHeight}px)`,
    gap: `${gap}px`,
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Grid-Linien zeichnen (optional)
  const gridLinesStyle = {
    position: 'absolute',
    top: padding,
    left: padding,
    width: `calc(100% - ${padding * 2}px)`,
    height: `calc(100% - ${padding * 2}px)`,
    pointerEvents: 'none',
  };

  // Vertikale Linien
  const renderVerticalLines = () => {
    if (!showGridLines) return null;
    const lines = [];
    for (let i = 1; i < columns; i++) {
      const x = i * (cellWidth + gap);
      lines.push(
        <div
          key={`v-${i}`}
          style={{
            position: 'absolute',
            left: x,
            top: 0,
            width: 1,
            height: '100%',
            background: gridLineColor,
            opacity: 0.3,
          }}
        />
      );
    }
    return lines;
  };

  // Horizontale Linien
  const renderHorizontalLines = () => {
    if (!showGridLines) return null;
    const lines = [];
    for (let i = 1; i < rows; i++) {
      const y = i * (cellHeight + gap);
      lines.push(
        <div
          key={`h-${i}`}
          style={{
            position: 'absolute',
            top: y,
            left: 0,
            height: 1,
            width: '100%',
            background: gridLineColor,
            opacity: 0.3,
          }}
        />
      );
    }
    return lines;
  };

  return (
    <>
      {/* Handles für Verbindungen */}
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        style={{
          background: borderColor,
          width: 12,
          height: 12,
          left: -6,
          border: '2px solid white',
        }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        style={{
          background: borderColor,
          width: 12,
          height: 12,
          right: -6,
          border: '2px solid white',
        }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        style={{
          background: borderColor,
          width: 12,
          height: 12,
          left: -6,
          border: '2px solid white',
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        style={{
          background: borderColor,
          width: 12,
          height: 12,
          right: -6,
          border: '2px solid white',
        }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        style={{
          background: borderColor,
          width: 12,
          height: 12,
          top: -6,
          border: '2px solid white',
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        style={{
          background: borderColor,
          width: 12,
          height: 12,
          bottom: -6,
          border: '2px solid white',
        }}
      />

      {/* Haupt-Container */}
      <div style={nodeStyle}>
        {/* Grid-Linien */}
        <div style={gridLinesStyle}>
          {renderVerticalLines()}
          {renderHorizontalLines()}
        </div>
        
        {/* Grid-Zellen-Platzhalter (optional) */}
        {data.showCellPlaceholders && Array.from({ length: columns * rows }, (_, index) => (
          <div
            key={index}
            style={{
              width: cellWidth,
              height: cellHeight,
              border: '1px dashed #ccc',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: '#999',
              background: 'rgba(0,0,0,0.02)',
            }}
          >
            Zelle {index + 1}
          </div>
        ))}
      </div>
    </>
  );
}
