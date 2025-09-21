// src/components/home/HomeFlowCanvas.jsx
import { ReactFlow, ReactFlowProvider, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CentralCircle from './centralCircle';
import TopCategoryNode from './TopCategoryNode';
import KrankikomgebaeudeNode from './KrankikomgebaeudeNode';
import NotificationBadge from './NotificationBadge';
import DeadlineIconNode from './DeadlineIconNode';


export default function HomeFlowCanvas({ onSwitchToCourse }) {
  const nodeTypes = {
    centralCircle: CentralCircle,
    topCategory: TopCategoryNode,
    krankikomgebaeude: KrankikomgebaeudeNode,
    notificationBadge: NotificationBadge,
    deadlineIcon: DeadlineIconNode,
  };
  const nodes = [
    { id: '1', type: 'centralCircle', position: { x: 700, y: 130 }, data: { label: 'Home Start' } },
    { id: '2', type: 'topCategory', position: { x: 620, y: 100 }, data: { label: 'CLAIM MANAGEMENT', categoryType: 1 } },
    { id: '3', type: 'topCategory', position: { x: 620, y: 350 }, data: { label: 'LEADERSHIP & TEAMS', categoryType: 2 } },
    { id: '4', type: 'topCategory', position: { x: 600, y: 600 }, data: { label: 'BUSINESS ADMINISTRATION', categoryType: 3 } },
    { id: '5', type: 'topCategory', position: { x: 1250, y: 165 }, data: { label: 'HUMAN RESOURCES', categoryType: 4 } },
    { id: '6', type: 'topCategory', position: { x: 1250, y: 490 }, data: { label: 'LEADERSHIP & COMMUNICATION', categoryType: 5 } },
    { id: '7', type: 'krankikomgebaeude', position: { x: 930, y: 350 }, data: { label: 'Krankenhausgebäude' } },
    { id: '9', type: 'deadlineIcon', position: { x: 746, y: 335 }, data: {} },
    { id: '10', type: 'notificationBadge', position: { x: 790, y: 120 }, data: { label: '11/71', size: 50 } },
    { id: '8', type: 'notificationBadge', position: { x: 790, y: 370 }, data: { label: '25/81', size: 50 } },
    { id: '11', type: 'notificationBadge', position: { x: 800, y: 620 }, data: { label: '8/15', size: 50 } },
    { id: '12', type: 'notificationBadge', position: { x: 1460, y: 185 }, data: { label: '89/212', size: 63, fontSize: 13 } },
    { id: '13', type: 'notificationBadge', position: { x: 1460, y: 510 }, data: { label: '146/247', size: 63, fontSize: 13 } },
    

  ];
  const edges = [];

  return (
    <div style={{ height: '100vh', width: '100vw', background: 'radial-gradient(circle, #ffffff 45%, #c1c1c1 100%)' }}>
      <ReactFlowProvider>
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          nodeTypes={nodeTypes}
          minZoom={0.01}
          maxZoom={8}
        >
          <Controls />
          <button onClick={onSwitchToCourse}>
            Zur Kursübersicht
          </button>
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
