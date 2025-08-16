//App.jsx
import React, { useEffect, useCallback, useState } from 'react';
import { ReactFlow, Controls, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './CourseOverviewFlowCanvas.css';

import SecondWrapperNode from './2LevelSecondWrapperNode';
import FirstWrapperNode from './1LevelFirstWrapperNode';

import OneLevelCentralNode from './1LevelCentralNode';
import OneLevelCategoryNode from './1LevelCategoryNode';

import TwoLevelCategoryNode from './2LevelCategoryNode';
import TwoLevelCentralNode from './2LevelCentralNode';

import ThreeLevelCentralNode from './3LevelCentralNode';
import ThreeLevelCategoryNode from './3LevelCategoryNode';
import GridContainerNode from './3Level3erGridContainerNode';
import OneLevelSixerGridboxNode from './1Level/1Level6erGridBoxNode.jsx';

import LerneinheitNode from './LerneinheitNode';

import DeadlineIconNode from '../status/DeadlineIconNode';
import FavoritIconNode from '../status/FavoritIconNode';
import LockedIconNode from '../status/LockedIconNode';
import DoneIconNode from '../status/DoneIconNode';
import StartedIconNode from '../status/StartedIconNode';
import { useReactFlow } from '@xyflow/react';





const nodeTypes = {
  secondWrapper: SecondWrapperNode,
  firstWrapper: FirstWrapperNode,

  oneLevelCentral: OneLevelCentralNode,
  oneLevelCategory: OneLevelCategoryNode,
  twoLevelCentral: TwoLevelCentralNode,
  twoLevelCategory: TwoLevelCategoryNode,
  threeLevelCentral: ThreeLevelCentralNode,
  threeLevelCategory: ThreeLevelCategoryNode,

  OneLevelSixerGridboxContainerNode: GridContainerNode,

  lerneinheit: LerneinheitNode,
  
  deadlineIcon: DeadlineIconNode,
  favoritIcon: FavoritIconNode,
  lockedIcon: LockedIconNode,
  doneIcon: DoneIconNode,
  startedIcon: StartedIconNode,
};


const initialNodes = [
 
  // Neuer 6er Grid-Container (2 Reihen × 3 Spalten)
    {
      id: 'one-level-sixer-gridbox-container',
      type: 'OneLevelSixerGridboxContainerNode',
      position: { x: 0, y: 0 },
      data: {
        columns: 3,
        rows: 2,
        cellWidth: 20000,
        cellHeight: 10000,
        gap: 2000,
        padding: 2000,
        backgroundColor: 'white',
        showGridLines: true,
      },
    },
    
    
    // Lerneinheiten für den neuen 6er Grid
    {
    id: 'lerneinheit-6er-1',
          type: 'lerneinheit',
          position: { x: 2000, y: 2000 },  // Erste Zeile, erste Spalte
      parentId: 'one-level-sixer-gridbox-container',
      data: {
        title: 'lerneinheit-6er-1',
        width: 20850,
        height: 12750,
        backgroundColor: '#e6fefc',
        borderColor: '#30b89b',
        fontSize: 1400,
      },
    },
    {
      id: 'lerneinheit-6er-2',
      type: 'lerneinheit',
      position: { x: 23550, y: 2000 },  // Erste Zeile, zweite Spalte
      parentId: 'one-level-sixer-gridbox-container',
      data: {
        title: 'lerneinheit-6er-2',
        width: 20850,
        height: 12750,
        backgroundColor: '#e6fefc',
        borderColor: '#30b89b',
        fontSize: 1400,
      },
    },
    {
      id: 'lerneinheit-6er-3',
      type: 'lerneinheit',
      position: { x: 47100, y: 2000 },  // Erste Zeile, dritte Spalte
      parentId: 'one-level-sixer-gridbox-container',
      data: {
        title: 'lerneinheit-6er-3',
        width: 20850,
        height: 12750,
        backgroundColor: '#e6fefc',
        borderColor: '#30b89b',
        fontSize: 1400,
      },
    },
    {
      id: 'lerneinheit-6er-4',
      type: 'lerneinheit',
      position: { x: 2000, y: 10750 },  // Zweite Zeile, erste Spalte
      parentId: 'one-level-sixer-gridbox-container',
      data: {
        title: 'lerneinheit-6er-4',
        width: 20850,
        height: 12750,
        backgroundColor: '#e6fefc',
        borderColor: '#30b89b',
        fontSize: 1400,
      },
    },
    {
      id: 'lerneinheit-6er-5',
      type: 'lerneinheit',
      position: { x: 23550, y: 10750 },  // Zweite Zeile, zweite Spalte
      parentId: 'one-level-sixer-gridbox-container',
      data: {
        title: 'lerneinheit-6er-5',
        width: 20850,
        height: 12750,
        backgroundColor: '#e6fefc',
        borderColor: '#30b89b',
        fontSize: 1400,
      },
    },
    {
      id: 'lerneinheit-6er-6',
      type: 'lerneinheit',
      position: { x: 47100, y: 10750 },  // Zweite Zeile, dritte Spalte
      parentId: 'one-level-sixer-gridbox-container',
      data: {
        title: 'lerneinheit-6er-6',
        width: 20850,
        height: 12750,
        backgroundColor: '#e6fefc',
        borderColor: '#30b89b',
        fontSize: 1400,
      },
    },
    
    // Neuer Grid-Container mit 3x1 Layout für moderne Grid-Funktionalität
    {
      id: 'modern-grid-container',
    type: 'OneLevelSixerGridboxContainerNode',
    position: { x: 4750, y: 986 },
    parentId: 'second-wrapper', // Als Child des Second Wrapper
    data: {
      columns: 3,
      rows: 1,
      cellWidth: 319, // Angepasst an die Größe von Lerneinheit 5
      cellHeight: 197, // Bleibt unverändert
      gap: 20, // Bleibt unverändert
      padding: 17, // Bleibt unverändert
      backgroundColor: 'white',
      borderColor: 'transparent',
      showGridLines: true,
      showCellPlaceholders: false,
    },
  },
  
  // Grid-Items die in den modernen Container passen (mit Design von Lerneinheit 5)
  {
    id: 'modern-grid-item-1',
    type: 'lerneinheit',
    position: { x: 25, y: 25 }, // Position relativ zum Container (innerhalb des Grids)
    parentId: 'modern-grid-container',
    data: {
      title: 'L3 Lerneinheit 1',
      width: 319,
      height: 197,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 35, // 5-fach vergrößerte Schrift (von 7px auf 35px)
    },
  },
  {
    id: 'modern-grid-item-2',
    type: 'lerneinheit',
    position: { x: 355, y: 25 }, // Position relativ zum Container (zweite Spalte)
    parentId: 'modern-grid-container',
    data: {
      title: 'L3 Lerneinheit 2',
      width: 319,
      height: 197,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 35, // 5-fach vergrößerte Schrift (von 7px auf 35px)
    },
  },
  {
    id: 'modern-grid-item-3',
    type: 'lerneinheit',
    position: { x: 685, y: 25 }, // Position relativ zum Container (dritte Spalte)
    parentId: 'modern-grid-container',
    data: {
      title: 'L3 Lerneinheit 3',
      width: 319,
      height: 197,
      backgroundColor: '#e6fefc',
      borderColor: '#30b89b',
      fontSize: 35, // 5-fach vergrößerte Schrift (von 7px auf 35px)
    },
  },
  
  // Lerneinheiten werden später hinzugefügt
  
  // Erster Wrapper (wird danach gerendert, liegt im mittleren Vordergrund)
  {
    id: 'first-wrapper',
    type: 'firstWrapper',
    position: { x: 258360, y: 56000 }, 
    data: {
      label: 'First Wrapper',
    },
  },
    // Zweiter Wrapper für die gesamte Course Overview (wird danach gerendert, liegt im Vordergrund)
    {
      id: 'second-wrapper',
      type: 'secondWrapper',
      position: { x: 35088, y: 6000 },
      parentId: 'first-wrapper', // Als Kind des FirstWrapperNode
      data: {
        label: 'Second Wrapper',
      },
    },

    {
      id: 'one-level-category-node-middle-right',
      type: 'oneLevelCategory',
      position: { x: 258360, y: 120000 }, // Position für MIDDLE RIGHT L1
      data: {
        label: 'MIDDLE RIGHT L1',
      },
    },
  // 1-Level Category Node (Bottom Right)
  {
    id: 'one-level-category-node-bottom-right',
    type: 'oneLevelCategory',
    position: { x: 258360, y: 180000 },  // Position für BOTTOM RIGHT L1
    data: {
      label: 'BOTTOM RIGHT L1',
    },
  },

  {
    id: 'one-level-category-node-middle-left-l1',
    type: 'oneLevelCategory',
    position: { x: 65000, y: 120000 }, // Position für MIDDLE LEFT L1
    data: {
              label: 'MIDDLE LEFT L1',
    },
  },
  
  // 1-Level Category Node (Top Left)
  {
    id: 'one-level-category-node-top-left',
    type: 'oneLevelCategory',
    position: { x: 65000, y: 60000 }, // Neue Position für TOP LEFT
    data: {
              label: 'TOP LEFT L1',
    },
  },
  // 1-Level Category Node (Bottom Left)
  {
    id: 'one-level-category-node-bottom-left',
    type: 'oneLevelCategory',
    position: { x: 65000, y: 180000 }, // Gleiche X-Position wie Middle Left und Top Left, Y-Position wie Bottom Right
    data: {
              label: 'BOTTOM LEFT L1',
    },
  },
    // 1-Level Hierarchy Structure Node Central
  {
    id: 'one-level-hierarchy-node-central',
    type: 'oneLevelCentral',
    position: { x: 140000, y: 100500 }, // Bei y-Wert 1000000
    data: {
      label: 'CENTRAL L1',
    },
  },
  // 2-Level Category Node
  {
    id: 'two-level-category-node',
    type: 'twoLevelCategory',
    position: { x: 35000, y: 17500 }, // Ursprüngliche Position
    parentId: 'first-wrapper', // Als Kind des FirstWrapperNode
    data: {
      label: '2LRIGHTBOTTOM',
    },
  },
  // 2-Level Category Node (Left)
  {
    id: 'two-level-category-node-left',
    type: 'twoLevelCategory',
    position: { x: 13500, y: 17500  }, // Ursprüngliche Position
    parentId: 'first-wrapper', // Als Kind des FirstWrapperNode
    data: {
      label: '2LLEFTBOTTOM',
    },
  },
    // 2-Level Category Node (Right Top)
  {
    id: 'two-level-category-node-right-top',
    type: 'twoLevelCategory',
    position: { x: 13500, y: 6200  }, // Ursprüngliche Position
    parentId: 'first-wrapper', // Als Kind des FirstWrapperNode
    data: {
      label: '2LLEFTTOP',
    },
  },
  // 2-Level Central Node (Large)
  {
    id: 'two-level-central-node-large',
    type: 'twoLevelCentral',
    position: { x: 22500, y: 10000 }, // Ursprüngliche Position
    parentId: 'first-wrapper', // Als Kind des FirstWrapperNode
    data: {
      label: '2LLARGE',
    },
  },


  {
    id: 'central-node',
          type: 'threeLevelCentral',
    position: { x: 2852, y: 1517 }, // Position so dass der Mittelpunkt der Node im Zentrum der weißen Fläche liegt
    parentId: 'second-wrapper', // Als Kind des SecondWrapperNode
    data: { label: 'LEADERSHIP & TEAMS' },
  },
  {
    id: 'category-left-top',
    type: 'threeLevelCategory',
    position: { x: 1950, y: 800}, // Links vom zentralen Node
    parentId: 'second-wrapper', // Als Kind des SecondWrapperNode
    data: { label: '1.\nEINFÜHRUNG' },
  },
  {
    id: 'category-left-middle',
    type: 'threeLevelCategory',
    position: { x: 1950, y: 1640 }, // Links vom zentralen Node, 1000px Abstand, Mittelpunkt auf Y: 1957
    parentId: 'second-wrapper', // Als Kind des SecondWrapperNode
    data: { label: '2. METHODE & FRAMEWORKS' },
  },
  {
    id: 'category-left-bottom',
    type: 'threeLevelCategory',
    position: { x: 1950, y: 2500 }, // Links vom zentralen Node
    parentId: 'second-wrapper', // Als Kind des SecondWrapperNode
    data: { label: '3. PROZESS' },
  },
  {
    id: 'category-right-top',
    type: 'threeLevelCategory',
    position: { x: 4000, y: 800 }, // Rechts vom zentralen Node
    parentId: 'second-wrapper', // Als Kind des SecondWrapperNode
    data: { label: '4. TOOLS & TECH' },
  },
  {
    id: 'category-right-middle',
    type: 'threeLevelCategory',
    position: { x: 4000, y: 1640 }, // Rechts vom zentralen Node, exakt gleicher Abstand (1022px) wie 2. METHODE & FRAMEWORKS
    parentId: 'second-wrapper', // Als Kind des SecondWrapperNode
    data: { label: '5.\nROLLEN' },
  },
];

const initialEdges = [
  {
    id: 'edge-1',
    source: 'central-node',
    sourceHandle: 'left-source',
    target: 'category-left-top',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 24 },
  },
  {
    id: 'edge-2',
    source: 'central-node',
    sourceHandle: 'left-source',
    target: 'category-left-middle',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 24 },
  },
  {
    id: 'edge-3',
    source: 'central-node',
    sourceHandle: 'left-source',
    target: 'category-left-bottom',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 24 },
  },
  {
    id: 'edge-4',
    source: 'central-node',
    sourceHandle: 'right-source',
    target: 'category-right-top',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 24 },
  },
  {
    id: 'edge-5',
    source: 'central-node',
    sourceHandle: 'right-source',
    target: 'category-right-middle',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 24 },
  },
  // Edge zwischen 1LevelHierarchyStructureNodeCentral und 2LevelHierarchyStructureNodebottomright
  {
    id: 'edge-hierarchy-connection',
    source: 'one-level-hierarchy-node-central',
    sourceHandle: 'right-source',
    target: 'one-level-category-node-bottom-right',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 1800 },
  },
  // Edge zwischen 1LevelHierarchyStructureNodeCentral und 2LevelHierarchyStructureNodemiddleright
  {
    id: 'edge-hierarchy-connection-middleright',
    source: 'one-level-hierarchy-node-central',
    sourceHandle: 'right-source',
    target: 'one-level-category-node-middle-right',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 1800 },
  },
  // Edge zwischen 1LevelHierarchyStructureNodeCentral und FirstWrapper
  {
    id: 'edge-hierarchy-connection-first-wrapper',
    source: 'one-level-hierarchy-node-central',
    sourceHandle: 'right-source',
    target: 'first-wrapper',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 1800 },
  },
  // Edge zwischen 1LevelHierarchyStructureNodeCentral und Top Left
  {
    id: 'edge-hierarchy-connection-top-left',
    source: 'one-level-hierarchy-node-central',
    sourceHandle: 'left-source',
    target: 'one-level-category-node-top-left',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 1800 },
  },
  // Edge zwischen 1LevelHierarchyStructureNodeCentral und Middle Left
  {
    id: 'edge-hierarchy-connection-middle-left',
    source: 'one-level-hierarchy-node-central',
    sourceHandle: 'left-source',
    target: 'one-level-category-node-middle-left-l1',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 1800 },
  },
  // Edge zwischen 1LevelHierarchyStructureNodeCentral und Bottom Left
  {
    id: 'edge-hierarchy-connection-bottom-left',
    source: 'one-level-hierarchy-node-central',
    sourceHandle: 'left-source',
    target: 'one-level-category-node-bottom-left',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 1800 },
  },
  // Edge zwischen 2LLARGE und 2LRIGHTBOTTOM
  {
    id: 'edge-2l-large-to-2l-right-bottom',
    source: 'two-level-central-node-large',
    sourceHandle: 'right-source',
    target: 'two-level-category-node',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 360}, // Hinter allen Wrappern
  },
  // Edge zwischen 2LLARGE und SecondWrapper
  {
    id: 'edge-2l-large-to-second-wrapper',
    source: 'two-level-central-node-large',
    sourceHandle: 'right-source',
    target: 'second-wrapper',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 360}, // Gleicher Style wie 2LLARGE zu 2LRIGHTBOTTOM
  },
  // Edge zwischen 2LLARGE und 2LLEFTTOP
  {
    id: 'edge-2l-large-to-2l-left-top',
    source: 'two-level-central-node-large',
    sourceHandle: 'left-source',
    target: 'two-level-category-node-right-top',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 360}, // Gleicher Style wie andere Edges
  },
  // Edge zwischen 2LLARGE und 2LLEFTBOTTOM
  {
    id: 'edge-2l-large-to-2l-left-bottom',
    source: 'two-level-central-node-large',
    sourceHandle: 'left-source',
    target: 'two-level-category-node-left',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 360}, // Gleicher Style wie andere Edges
  },

  
  // Edge zwischen 4. TOOLS & TECH und modernem Grid-Container
  {
    id: 'edge-tools-tech-to-modern-grid',
    source: 'category-right-top',
    sourceHandle: 'right-source',
    target: 'modern-grid-container',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#D1D1D1', strokeWidth: 17 }, // Angepasster Style: hellere Farbe und 30% kleinere Dicke
  },
  

  

  

  


  

  

  

  


  // Grid-Edges entfernt
  // Grid-Edges entfernt
  // Grid-Edges entfernt
  // Grid-Edges entfernt
  // Grid-Edges entfernt
];

function FlowApp() {
  const { getViewport, setViewport } = useReactFlow();

  // smoothZoomToNode anpassen, damit nodeSize übergeben werden kann
  const smoothZoomToNode = useCallback((node, targetZoom = 1.2, duration = 1200, nodeSize = 880) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const nodeCenterX = node.position.x + nodeSize / 2;
    const nodeCenterY = node.position.y + nodeSize / 2;
    const targetX = -(nodeCenterX * targetZoom) + viewportWidth / 2;
    const targetY = -(nodeCenterY * targetZoom) + viewportHeight / 2;

    const start = getViewport();
    const startTime = performance.now();

    function animate(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const zoom = start.zoom + (targetZoom - start.zoom) * ease;
      const x = start.x + (targetX - start.x) * ease;
      const y = start.y + (targetY - start.y) * ease;
      setViewport({ x, y, zoom, duration: 0 });
      if (t < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  }, [getViewport, setViewport]);

  // onNodeClick erweitern
  const onNodeClick = useCallback((event, node) => {
    if (node.id === 'central-node') {
      smoothZoomToNode(node, 1.2, 1200, 880); // zentrale Node
    } else if (node.type === 'category' || node.type === 'threeLevelCategory') {
      smoothZoomToNode(node, 1.2, 1200, 640); // Kategorie-Nodes
    }
  }, [smoothZoomToNode]);

  return (
    <div style={{ height: '100vh', width: '100vw', background: 'radial-gradient(circle, #ffffff 45%, #c1c1c1 100%)' }}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView={true}
        minZoom={0.0005}
        maxZoom={8}
        defaultViewport={{ x: 0, y: 10000, zoom: 0.001 }}
        onNodeClick={onNodeClick}
        zoomOnPinch={true}
        panOnDrag={true}
        zoomOnScroll={true}
        panOnScroll={false}
      >
        <Controls
          style={{
            transform: 'scale(0.5)',
            transformOrigin: 'top left',
            margin: '8px',
          }}
        />

      </ReactFlow>
    </div>
  );
}

// Das ist wichtig:
export default function CourseOverviewFlowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowApp />
    </ReactFlowProvider>
  );
}
