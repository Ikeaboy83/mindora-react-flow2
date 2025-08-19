import React from 'react';
import { Handle, Position } from '@xyflow/react';

// Einheitlicher CircularNode für alle runden Nodes
export default function CircularNode({ data }) {
  const { size = 'medium', type = 'category', label, customStyle } = data;
  
  const sizeConfigs = {
    tiny: { 
      width: 640, 
      height: 640, 
      fontSize: 64, 
      border: '4px solid #01D2BC',
      boxShadow: '0 40px 112px rgba(0, 0, 0, 0.15)',
      handleSize: 12
    },
    tinyCentral: { 
      width: 880, 
      height: 880, 
      fontSize: 72, 
      border: '4px solid #01D2BC',
      boxShadow: '0 48px 144px rgba(0, 0, 0, 0.35)',
      handleSize: 20
    },
    small: { 
      width: 6584, 
      height: 6584, 
      fontSize: 600, 
      border: '80px solid #01D2BC',
      boxShadow: '0 520px 1560px rgba(0, 0, 0, 0.15)',
      handleSize: 12
    },
    smallCentral: { 
      width: 9876, 
      height: 9876, 
      fontSize: 900, 
      border: '80px solid #01D2BC',
      boxShadow: '0 520px 1560px rgba(0, 0, 0, 0.15)',
      handleSize: 12
    },
    medium: { 
      width: 52672, 
      height: 52112, 
      fontSize: 6000, 
      border: '80px solid #01D2BC',
      boxShadow: '0 520px 1560px rgba(0, 0, 0, 0.15)',
      handleSize: 12
    },
    large: { 
      width: 91332, 
      height: 91332, 
      fontSize: 8750, 
      border: '2px solid #01D2BC',
      boxShadow: '0 23120px 69360px rgba(0, 0, 0, 0.15)',
      handleSize: 34
    }
  };
  
  const config = sizeConfigs[size];
  const displayLabel = label || type.toUpperCase();
  
  return (
    <div
      className="course-overview-node"
      style={{
        width: config.width,
        height: config.height,
        borderRadius: '50%',
        background: '#01D2BC',
        border: config.border,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: config.fontSize,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: config.boxShadow,
        position: 'relative',
        touchAction: 'manipulation', // Touch-Events für Zoom erlauben
        userSelect: 'none', // Text-Auswahl verhindern
        pointerEvents: 'auto', // Pointer-Events erlauben
        ...customStyle
      }}
    >
      {displayLabel}
      
      {/* Links: Source und Target */}
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'transparent',
          border: 'none',
          opacity: 0.3,
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        style={{
          background: 'transparent',
          width: config.handleSize,
          height: config.handleSize,
          left: -(config.handleSize / 2),
          border: 'none',
          opacity: 0.3,
        }}
      />
      
      {/* Rechts: Source und Target */}
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'transparent',
          border: 'none',
          opacity: 0.3,
        }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        style={{
          background: 'transparent',
          width: config.handleSize,
          height: config.handleSize,
          right: -(config.handleSize / 2),
          border: 'none',
          opacity: 0.3,
        }}
      />
    </div>
  );
}

// Node-Definitionen für den Import
export const circularNodes = [
  // 1-Level Central Node (Large)
  {
    id: 'one-level-central-node',
    type: 'circular',
    position: { x: 140000, y: 100500 },
    data: {
      size: 'large',
      type: 'central',
      label: 'CENTRAL L1'
    },
  },
  
  // 1-Level Category Nodes (Medium)
  {
    id: 'one-level-category-node-top-left',
    type: 'circular',
    position: { x: 65000, y: 60000 },
    data: {
      size: 'medium',
      type: 'category',
      label: 'TOP LEFT L1'
    },
  },
  {
    id: 'one-level-category-node-middle-left-l1',
    type: 'circular',
    position: { x: 65000, y: 120000 },
    data: {
      size: 'medium',
      type: 'category',
      label: 'MIDDLE LEFT L1'
    },
  },
  {
    id: 'one-level-category-node-bottom-left',
    type: 'circular',
    position: { x: 65000, y: 180000 },
    data: {
      size: 'medium',
      type: 'category',
      label: 'BOTTOM LEFT L1'
    },
  },
  {
    id: 'one-level-category-node-middle-right',
    type: 'circular',
    position: { x: 258360, y: 120000 },
    data: {
      size: 'medium',
      type: 'category',
      label: 'MIDDLE RIGHT L1'
    },
  },
  {
    id: 'one-level-category-node-bottom-right',
    type: 'circular',
    position: { x: 258360, y: 180000 },
    data: {
      size: 'medium',
      type: 'category',
      label: 'BOTTOM RIGHT L1'
    },
  },
  
  // 2-Level Central Node (Small Central)
  {
    id: 'two-level-central-node',
    type: 'circular',
    position: { x: 22500, y: 10000 },
    parentId: 'first-wrapper',
    data: {
      size: 'smallCentral',
      type: 'central',
      label: '2LLARGE'
    },
  },
  
  // 2-Level Category Nodes (Small)
  {
    id: 'two-level-category-node-left-top',
    type: 'circular',
    position: { x: 13500, y: 6200 },
    parentId: 'first-wrapper',
    data: {
      size: 'small',
      type: 'category',
      label: '2LLEFTTOP'
    },
  },
  {
    id: 'two-level-category-node-bottom-left',
    type: 'circular',
    position: { x: 13500, y: 17500 },
    parentId: 'first-wrapper',
    data: {
      size: 'small',
      type: 'category',
      label: '2LLEFTBOTTOM'
    },
  },
  {
    id: 'two-level-category-node-bottom-right',
    type: 'circular',
    position: { x: 35000, y: 17500 },
    parentId: 'first-wrapper',
    data: {
      size: 'small',
      type: 'category',
      label: '2LRIGHTBOTTOM'
    },
  },
  
  // 3-Level Central Node (Tiny Central)
  {
    id: 'three-level-central-node',
    type: 'circular',
    position: { x: 2852, y: 1517 },
    parentId: 'second-wrapper',
    data: {
      size: 'tinyCentral',
      type: 'central',
      label: 'LEADERSHIP & TEAMS'
    },
  },
  
  // 3-Level Category Nodes (Tiny)
  {
    id: 'three-level-category-top-left',
    type: 'circular',
    position: { x: 1950, y: 800 },
    parentId: 'second-wrapper',
    data: {
      size: 'tiny',
      type: 'category',
      label: '1.\nEINFÜHRUNG'
    },
  },
  {
    id: 'three-level-category-middle-left',
    type: 'circular',
    position: { x: 1950, y: 1640 },
    parentId: 'second-wrapper',
    data: {
      size: 'tiny',
      type: 'category',
      label: '2. METHODE & FRAMEWORKS'
    },
  },
  {
    id: 'three-level-category-bottom-left',
    type: 'circular',
    position: { x: 1950, y: 2500 },
    parentId: 'second-wrapper',
    data: {
      size: 'tiny',
      type: 'category',
      label: '3. PROZESS'
    },
  },
  {
    id: 'three-level-category-top-right',
    type: 'circular',
    position: { x: 4000, y: 800 },
    parentId: 'second-wrapper',
    data: {
      size: 'tiny',
      type: 'category',
      label: '4. TOOLS & TECH'
    },
  },
  {
    id: 'three-level-category-middle-right',
    type: 'circular',
    position: { x: 4000, y: 1640 },
    parentId: 'second-wrapper',
    data: {
      size: 'tiny',
      type: 'category',
      label: '5.\nROLLEN'
    },
  }
];