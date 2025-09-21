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
      height: 52672,
      fontSize: 6000, 
      border: '80px solid #01D2BC',
      boxShadow: '-2000px 2000px 5000px rgba(0, 0, 0, 0.25), -3000px 3000px 5000px rgba(0, 0, 0, 0.08)',
      handleSize: 12
    },
    large: { 
      width: 91332, 
      height: 91332, 
      fontSize: 8750, 
      border: '2px solid #01D2BC',
      boxShadow: '-3000px 3000px 7500px rgba(0, 0, 0, 0.25), -4500px 4500px 7500px rgba(0, 0, 0, 0.08)',
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
        fontFamily: "'Blogger Sans', sans-serif",
        fontWeight: 'bold',
        fontSize: config.fontSize,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: config.boxShadow,
        position: 'relative',
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
// Helper function to make nodes draggable
const makeNodeDraggable = (node) => ({
  ...node,
  draggable: true,
  selectable: true
});

export const circularNodes = [
  // 1-Level Central Node (Large)
  {
    id: 'one-level-central-node',
    type: 'circular',
    position: { x: 140000, y: 100500 },
    data: {
      size: 'large',
      type: 'central',
      label: 'LEADERSHIPROLLEN',
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
      label: 'FÜHRUNGS-\nKOMPETENZEN'
    },
  },
  {
    id: 'one-level-category-node-middle-left-l1',
    type: 'circular',
    position: { x: 65000, y: 120000 },
    data: {
      size: 'medium',
      type: 'category',
      label: 'DIVERSITY & INCLUSION'
    },
  },
  {
    id: 'one-level-category-node-bottom-left',
    type: 'circular',
    position: { x: 65000, y: 180000 },
    data: {
      size: 'medium',
      type: 'category',
      label: 'KONFLIKT-\nMANAGEMENT'
    },
  },
  {
    id: 'one-level-category-node-middle-right',
    type: 'circular',
    position: { x: 258360, y: 120000 },
    data: {
      size: 'medium',
      type: 'category',
      label: 'AGILES ARBEITEN'
    },
  },
  {
    id: 'one-level-category-node-bottom-right',
    type: 'circular',
    position: { x: 258360, y: 180000 },
    data: {
      size: 'medium',
      type: 'category',
      label: 'TEAMDYNAMIK'
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
      label: 'CHANGE MANAGEMENT'
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
      label: 'GRUNDLAGEN DES CHANGE MANAGEMENTS'
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
      label: 'KOMMUNIKATION IM VERÄNDERUNGSPROZESS'
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
      label: 'WIDERSTÄNDE VERSTEHEN & ÜBERWINDEN'
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
      label: 'CHANGE-LEADERSHIP-ROLLEN'
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
      label: 'VISIONÄR'
    },
  },
  {
    id: 'three-level-category-middle-left',
    type: 'circular',
    position: { x: 1950, y: 1637 },
    parentId: 'second-wrapper',
    data: {
      size: 'tiny',
      type: 'category',
      label: 'KOMMUNIKATOR'
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
      label: 'COACH & MENTOR'
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
      label: 'UMSETZER & PROJEKTMANAGER'
    },
  },
  {
    id: 'three-level-category-middle-right',
    type: 'circular',
    position: { x: 4000, y: 1637 },
    parentId: 'second-wrapper',
    data: {
      size: 'tiny',
      type: 'category',
      label: 'NETZWERKER'
    },
  }
].map(makeNodeDraggable);