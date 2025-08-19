//App.jsx
import React, { useCallback } from 'react';
import { ReactFlow, Controls, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './CourseOverviewFlowCanvas.css';

// Import der Wrapper-Node-Komponenten
import { FirstWrapperNode, SecondWrapperNode, wrapperNodes } from './WrapperNode/WrapperNode';

// Import der anderen Node-Komponenten
import GridContainerNode, { gridContainerNodeConfig, gridContainerNodeConfig6er } from './GridboxNode/GridContainerNode';
import LerneinheitNode, { nineGridLerneinheiten, sixGridLerneinheiten } from './Content/LerneinheitNode';
import { createSixGridLerneinheitenWithDoubleIconsProbe } from './GridboxNode/gridUtilsIcons';
// import { debugCellPositions } from './GridboxNode/gridUtils';
import CircularNode, { circularNodes } from './CircularNode/CircularNode';
import { initialEdges } from './Edges/Edges.jsx';


// Node Types Definition
const nodeTypes = {
  secondWrapper: SecondWrapperNode,
  firstWrapper: FirstWrapperNode,
  circular: CircularNode,
  gridContainer: GridContainerNode,
  lerneinheit: LerneinheitNode,
};



// Initial Nodes
const initialNodes = [
  // Wrapper Nodes aus WrapperNode.jsx importiert
  ...wrapperNodes,
  // Circular Nodes aus CircularNode.jsx importiert
  ...circularNodes,
  // Grid Container Node aus GridContainerNode.jsx importiert
  gridContainerNodeConfig,
  // 6er-Container Node
  gridContainerNodeConfig6er,
  // Lerneinheiten für das 9er Grid
  ...nineGridLerneinheiten,
  // 5 Lerneinheiten für das 6er Grid MIT Icons (Probe)
  ...createSixGridLerneinheitenWithDoubleIconsProbe(),
];

  // FlowApp Komponente
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
    if (node.id === 'three-level-central-node') {
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
        defaultViewport={{ x: -10000, y: 64000, zoom: 0.5 }}
        onNodeClick={onNodeClick}
        zoomOnPinch={true}
        panOnDrag={true}
        zoomOnScroll={true}
        panOnScroll={false}
        zoomOnDoubleClick={true}
        preventScrolling={false}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
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

  // CourseOverviewFlowCanvas Komponente
export default function CourseOverviewFlowCanvas() {
  console.log('CourseOverviewFlowCanvas wird geladen');
  console.log('wrapperNodes:', wrapperNodes);
  console.log('initialNodes:', initialNodes);
  console.log('nodeTypes:', nodeTypes);
  console.log('nineGridLerneinheiten:', nineGridLerneinheiten);
  console.log('gridContainerNodeConfig:', gridContainerNodeConfig);
  
  // Debug: Grid-Positionen testen
  // useEffect(() => {
  //   console.log('=== DEBUG: Grid-Positionen ===');
  //   debugCellPositions();
  // }, []);
  
  return (
    <ReactFlowProvider>
      <FlowApp />
    </ReactFlowProvider>
  );
}
