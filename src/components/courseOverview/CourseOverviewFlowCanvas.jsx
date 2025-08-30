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

  // fitContainerView anpassen, damit nodeSize übergeben werden kann
  const fitContainerView = useCallback((containerId) => {
    const node = initialNodes.find(node => node.id === containerId);
    if (node) {
      const nodeSize = 880; // Standard-Node-Größe für Container
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const nodeCenterX = node.position.x + nodeSize / 2;
      const nodeCenterY = node.position.y + nodeSize / 2;
      const targetX = -(nodeCenterX * 1.2) + viewportWidth / 2; // Zoom auf 1.2
      const targetY = -(nodeCenterY * 1.2) + viewportHeight / 2; // Zoom auf 1.2

      const start = getViewport();
      const startTime = performance.now();

      function animate(now) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / 1200, 1); // Dauer für Zoom
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const zoom = start.zoom + (1.2 - start.zoom) * ease;
        const x = start.x + (targetX - start.x) * ease;
        const y = start.y + (targetY - start.y) * ease;
        setViewport({ x, y, zoom, duration: 0 });
        if (t < 1) {
          requestAnimationFrame(animate);
        }
      }
      requestAnimationFrame(animate);
    }
  }, [getViewport, setViewport, initialNodes]);


  // onNodeClick erweitern
  const onNodeClick = useCallback((event, node) => {
    if (node.id === 'three-level-central-node') {
      smoothZoomToNode(node, 1.2, 1200, 880); // zentrale Node
    } else if (node.type === 'category' || node.type === 'threeLevelCategory') {
      smoothZoomToNode(node, 1.2, 1200, 640); // Kategorie-Nodes
    } else if (node.type === 'gridContainer') {
      // Container-Node angeklickt - fit view
      fitContainerView(node.id);
    }
  }, [smoothZoomToNode, fitContainerView]);

  return (
    <div style={{ height: '100vh', width: '100vw', background: 'radial-gradient(circle, #ffffff 45%, #c1c1c1 100%)' }}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView={true}
        minZoom={0.0001} // Erweiterte Zoom-Grenzen für sehr große Container
        maxZoom={20} // Höherer Max-Zoom für detaillierte Ansicht
        defaultViewport={{ x: -10000, y: 64000, zoom: 0.3 }} // Startet mit kleinerem Zoom
        onNodeClick={onNodeClick}
        onNodeDoubleClick={(event, node) => {
          // Doppelklick-Handler für spezielle Aktionen
          if (node.type === 'gridContainer') {
            fitContainerView(node.id);
          }
        }}
        onViewportChange={(viewport) => {
          // Hier können später haptische Rückmeldungen hinzugefügt werden
          console.log('Viewport geändert:', viewport);
        }}
        zoomOnPinch={true}
        panOnDrag={true}
        zoomOnScroll={true}
        panOnScroll={false}
        zoomOnDoubleClick={false} // Eigener Doppelklick-Handler
        preventScrolling={false}
        selectionOnDrag={false}
        multiSelectionKeyCode="Shift"
        deleteKeyCode="Delete"
      >
        <Controls
          style={{
            transform: 'scale(0.5)',
            transformOrigin: 'top left',
            margin: '8px',
          }}
        />
        {/* Zusätzliche Navigations-Buttons */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 1000
        }}>
          <button 
            onClick={() => fitContainerView('9erContainer-1-level-1')}
            style={{
              padding: '8px 12px',
              background: '#30b89b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            9er Container
          </button>
          <button 
            onClick={() => fitContainerView('6erContainer-1-level-1')}
            style={{
              padding: '8px 12px',
              background: '#30b89b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            6er Container
          </button>
          <button 
            onClick={() => setViewport({ x: -10000, y: 64000, zoom: 0.3, duration: 800 })}
            style={{
              padding: '8px 12px',
              background: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Übersicht
          </button>
        </div>
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
