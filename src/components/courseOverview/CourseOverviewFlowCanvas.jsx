//App.jsx
import { ReactFlow, Controls, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import CentralNode from './CentralNode';
import CategoryNode from './categoryNode';
import CategoryNodeRight from './categoryNodeRight';
import LerneinheitNode from './LerneinheitNode';
import GridBoxNode from './GridBoxNode';
import LerneinheitNodeDeadline from './LerneinheitNodeDeadline';
import LerneinheitNodeDeadline2 from './LerneinheitNodeDeadline2';
import CategoryNode1 from './categoryNode1';
import DreiGridboxNode from './3erGridboxNode';
import AchtzehnerGridboxNode from './18erGridboxNode';
import DreißigerGridboxNode from './30erGridboxNode';
import { createGridNodes } from '../../utils/gridUtils';
import { getGridPosition } from '../../utils/gridUtils';
import { useEffect, useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';
import DeadlineIconNode from '../status/DeadlineIconNode';
import FavoritIconNode from '../status/FavoritIconNode';
import DoneIconNode from '../status/DoneIconNode';
import LockedIconNode from '../status/LockedIconNode';
import StartedIconNode from '../status/StartedIconNode';

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
  lerneinheitDeadline2: LerneinheitNodeDeadline2,
  deadlineIcon: DeadlineIconNode, // NEU: für das Icon im Status-Ordner
  favoritIcon: FavoritIconNode,
  lockedIcon: LockedIconNode, // LockedIconNode registrieren
  doneIcon: DoneIconNode, // DoneIconNode registrieren
  startedIcon: StartedIconNode, // StartedIconNode registrieren
  category1: CategoryNode1, // NEU: categoryNode1
  dreiGridbox: DreiGridboxNode,
  achtzehnerGridbox: AchtzehnerGridboxNode,
  dreißigerGridbox: DreißigerGridboxNode,
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

const achtzehnerGridNodes = createGridNodes({
  idPrefix: 'lerneinheit18',
  rows: 6,
  cols: 3,
  cellWidth: 133,
  cellHeight: 82,
  gap: 8,
  offsetX: 8,
  offsetY: 8,
  parentId: 'achtzehner-grid-box-1',
  parentX: 3090, // gleiche X-Position wie der Container
  parentY: 930,  // gleiche Y-Position wie der Container
});

//30 Lernheiten
const dreißigerGridNodes = createGridNodes({
  idPrefix: 'lerneinheit30',
  rows: 10,
  cols: 3,
  cellWidth: 133,
  cellHeight: 82,
  gap: 8,
  offsetX: 8,
  offsetY: 8,
  parentId: 'dreißiger-grid-box-1',
  parentX: -460,
  parentY: 1680,
});

// Status-Icons für die erste Lerneinheit setzen
dreißigerGridNodes[0].data.statusIcons = [
  { type: 'favorit', x: 15, y: 15 },
  { type: 'done', x: 15, y: 50 }
];
// Zeilen 8, 9, 10: Index 21-23, 24-26, 27-29
for (let idx of [21,22,23,24,25,26,27,28,29]) {
  dreißigerGridNodes[idx].data.statusIcons = [
    { type: 'done', x: 15, y: 15 }
  ];
}

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
    data: {
      statusIcons: [
        [
          { type: 'favorit' , x: 15, y: 15 },
          { type: 'done', x: 15, y: 50 }
        ],
        ...Array(29).fill([])
      ]
    },
    selected: true, // Temporär auf true gesetzt, damit du den Glow siehst
  },
  ...lerneinheitNodes,
  {
    id: 'drei-grid-box-1',
    type: 'dreiGridbox',
    position: { x: 3050, y: 265 }, // Beispiel-Position, anpassen nach Bedarf
    data: {},
    selected: false,
  },
  {
    id: 'achtzehner-grid-box-1',
    type: 'achtzehnerGridbox',
    position: { x: 3050, y: 790 }, // Beispiel-Position, anpassen nach Bedarf
    data: {},
    selected: false,
  },
  ...achtzehnerGridNodes,
  {
    id: 'dreißiger-grid-box-1',
    type: 'dreißigerGridbox',
    position: { x: -500, y: 1360 },
    data: {
      statusIcons: [
        [
          { type: 'favorit' , x: 15, y: 15 },
          { type: 'done', x: 15, y: 50 }
        ],
        ...Array(29).fill([])
      ]
    },
    selected: false,
  },
  ...dreißigerGridNodes,

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
    position: { x: 3070, y: 280 }, // deine gewünschte Position
    data: { property1: 'Einzel' },
  },
  {
    id: 'deadline2',
    type: 'lerneinheitDeadline2',
    position: { x: 3200, y: 400 }, // Position neben dem ersten
    data: { 
      property1: 'Einzel ohne Glow',
      width: 109,
      height: 82
    },
  },
  {
    id: 'deadline-icon-1',
    type: 'deadlineIcon',
    position: { x: 3080, y: 300
     }, // Beispiel-Position
    data: {},
  },
  {
    id: 'favorit-icon-1',
    type: 'favoritIcon',
    position: { x: 3215, y: 840 }, // Beispiel-Position
    data: {},
  },
  {
    id: 'locked-icon-1',
    type: 'lockedIcon',
    position: { x: 3355, y: 815 }, // Beispiel-Position unter den anderen Icons
    data: {},
  },
  {
    id: 'done-icon-1',
    type: 'doneIcon',
    position: { x: 3080, y: 815 }, // Beispiel-Position unter den anderen Icons
    data: {},
  },
  {
    id: 'started-icon-1',
    type: 'startedIcon',
    position: { x: 3215, y: 815 }, // Beispiel-Position unter den anderen Icons
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
  {
    id: 'edge-category-right-to-drei-grid',
    source: 'category-right-1',
    sourceHandle: 'right-source',
    target: 'drei-grid-box-1',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#CFCFCF', strokeWidth: 16 },
  },
  {
    id: 'edge-category-right-bottom-to-achtzehner-grid',
    source: 'category-right-bottom',
    sourceHandle: 'right-source',
    target: 'achtzehner-grid-box-1',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#CFCFCF', strokeWidth: 16 },
  },
  {
    id: 'edge-category-bottom-to-dreißiger-grid',
    source: 'category-bottom',
    sourceHandle: 'left-source',
    target: 'dreißiger-grid-box-1',
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

// Das ist wichtig:
export default function CourseOverviewFlowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowApp />
    </ReactFlowProvider>
  );
}
