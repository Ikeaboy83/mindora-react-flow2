//App.jsx
import { ReactFlow, Controls, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import CentralNode from './components/CentralNode';
import CategoryNode from './components/CategoryNode';
import CategoryNodeRight from './components/categoryNodeRight';
import LerneinheitNode from './components/LerneinheitNode';
import GridBoxNode from './components/GridBoxNode';
import DeadlineIconNode from './components/status/DeadlineIconNode';
import LerneinheitNodeDeadline from './components/LerneinheitNodeDeadline';
import FavoritIconNode from './components/status/FavoritIconNode';
import CategoryNode1 from './components/courseOverview/categoryNode1';
import { createGridNodes } from './utils/gridUtils';
import { getGridPosition } from './utils/gridUtils';
import { useEffect, useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';

function AutoZoomOut() {
  const { setViewport } = useReactFlow();

  useEffect(() => {
    setViewport({ x: 0, y: 0, zoom: 0.1 });
  }, []);

  return null;
}

const nodeTypes = {
  custom: CentralNode,
  category: CategoryNode,
  'category-right': CategoryNodeRight,
  'lerneinheit': LerneinheitNode,
  'gridbox': GridBoxNode,
  'deadline-icon': DeadlineIconNode, // bisheriger Node-Typ
  lerneinheitDeadline: LerneinheitNodeDeadline,
  deadlineIcon: DeadlineIconNode, // NEU: für das Icon im Status-Ordner
  favoritIcon: FavoritIconNode,
  category1: CategoryNode1, // NEU: categoryNode1
};

// Lern-Elemente automatisch generieren
// Hier wird konkret das Grid für die Lerneinheiten konfiguriert
const containerWidth = 360;
const containerHeight = 280;
const padding = 8;
const gap = 8;
const cols = 3;
const rows = 3;

const cellWidth = (containerWidth - 2 * padding - (cols - 1) * gap) / cols;
const cellHeight = (containerHeight - 2 * padding - (rows - 1) * gap) / rows;
const offsetX = padding;
const offsetY = padding;

const gridBoxPosition = { x: -480, y: 175 }; // Beispiel: beliebige Position

const lerneinheitNodes = createGridNodes({
  rows,
  cols,
  cellWidth,
  cellHeight,
  gap,
  offsetX,
  offsetY,
  parentId: 'grid-box-1',
  parentX: gridBoxPosition.x, // NEU
  parentY: gridBoxPosition.y, // NEU
});

const initialNodes = [
  //Zeigt transparente Node im Hintergrund des GridBoxNode
  {
    id: 'grid-box-1',
    type: 'gridbox',
    position: gridBoxPosition,
    style: {
      width: 360,
      height: 280,
      background: 'transparent',
      border: 'none',
    },
    data: {},
    selected: true, // Temporär auf true gesetzt, damit du den Glow siehst
  },
  ...lerneinheitNodes,


  {
    id: 'category-top',
    type: 'category',
    position: { x: 150, y: -5 },
    data: { label: '1.\nEINFÜHRUNG' },
  },
  {
    id: 'central-node',
    type: 'custom',
    position: { x: 1100, y: 630 },
    data: { label: 'AGILES\nPROJEKT-\nMANAGEMENT' },
  },
  {
    id: 'category-middle',
    type: 'category',
    position: { x: 150, y: 750 },
    data: { label: '2. METHODE & FRAMEWORKS' },
  },
  {
    id: 'category-bottom',
    type: 'category',
    position: { x: 150, y: 1500 },
    data: { label: '3. PROZESS' },
  },
  {
    id: 'category-right-1',
    type: 'category-right',
    position: { x: 2300, y: 0 },
    data: { label: '4. TOOLS & TECH' },
  },
  {
    id: 'category-right-bottom',
    type: 'category-right',
    position: { x: 2300, y: 750 },
    data: { label: '5.\nROLLEN' },
  },
  {
    id: 'deadline1',
    type: 'lerneinheitDeadline',
    position: { x: 711, y: 706 }, // deine gewünschte Position
    data: { property1: 'Einzel' },
  },
  {
    id: 'deadline-icon-1',
    type: 'deadlineIcon',
    position: { x: 715, y: 710
     }, // Beispiel-Position
    data: {},
  },
  {
    id: 'favorit-icon-1',
    type: 'favoritIcon',
    position: { x: 715, y: 733 }, // Beispiel-Position
    data: {},
  },
  {
    id: 'category1-test',
    type: 'category1',
    position: { x: 800, y: 0 },
    data: { label: 'Neue Kategorie' },
  },
];

const initialEdges = [
  {
    id: 'edge-1',
    source: 'central-node',
    sourceHandle: 'left-source',
    target: 'category-top',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 24 },
  },
  {
    id: 'edge-2',
    source: 'central-node',
    sourceHandle: 'left-source',
    target: 'category-middle',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 24 },
  },
  {
    id: 'edge-3',
    source: 'central-node',
    sourceHandle: 'left-source',
    target: 'category-bottom',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 24 },
  },
  {
    id: 'edge-4',
    source: 'central-node',
    sourceHandle: 'right-source',
    target: 'category-right-1',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 24 },
  },
  {
    id: 'edge-5',
    source: 'central-node',
    sourceHandle: 'right-source',
    target: 'category-right-bottom',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 24 },
  },
  {
    id: 'edge-category-top-to-grid',
    source: 'category-top',
    sourceHandle: 'left-source',
    target: 'grid-box-1',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#CFCFCF', strokeWidth: 16 },
  },
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
    } else if (node.type === 'category' || node.type === 'category-right') {
      smoothZoomToNode(node, 1.2, 1200, 640); // Kategorie-Nodes
    }
  }, [smoothZoomToNode]);

  return (
    <div style={{ height: '100vh', width: '100vw', background: 'radial-gradient(circle, #ffffff 45%, #c1c1c1 100%)' }}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.01}
        maxZoom={8}
        onNodeClick={onNodeClick}
        zoomOnPinch={true}      // <--- explizit aktivieren
        panOnDrag={true}        // <--- explizit aktivieren
        zoomOnScroll={true}     // <--- für Desktop
        panOnScroll={false}     // <--- für Touch nicht nötig
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

export default function App() {
  return (
    <ReactFlowProvider>
      <FlowApp />
    </ReactFlowProvider>
  );
}
