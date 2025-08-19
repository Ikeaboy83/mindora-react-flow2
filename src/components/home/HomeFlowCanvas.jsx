// src/components/home/HomeFlowCanvas.jsx
import { ReactFlow, ReactFlowProvider, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './HomeFlowCanvas.css';
import CentralCircle from './centralCircle';
import TopCategory1 from './topCategory1';
import TopCategory2 from './topCategory2';
import TopCategory3 from './topCategory3';
import TopCategory4 from './topCategory4';
import TopCategory5 from './topCategory5';
import KrankikomgebaeudeNode from './KrankikomgebaeudeNode';
import NotificationBadge1 from './notificationBadge1';
import NotificationBadge2 from './notificationBadge2';
import NotificationBadge3 from './notificationBadge3';
import NotificationBadge4 from './notificationBadge4';
import NotificationBadge5 from './notificationBadge5';
import DeadlineIconNode from './DeadlineIconNode';


export default function HomeFlowCanvas({ onSwitchToCourse }) {
  const nodeTypes = {
    centralCircle: CentralCircle,
    topCategory1: TopCategory1,
    topCategory2: TopCategory2,
    topCategory3: TopCategory3,
    topCategory4: TopCategory4,
    topCategory5: TopCategory5,
    krankikomgebaeude: KrankikomgebaeudeNode,
    notificationBadge1: NotificationBadge1,
    notificationBadge2: NotificationBadge2,
    notificationBadge3: NotificationBadge3,
    notificationBadge4: NotificationBadge4,
    notificationBadge5: NotificationBadge5,
    deadlineIcon: DeadlineIconNode,

  };
  const nodes = [
    { id: '1', type: 'centralCircle', position: { x: 700, y: 130 }, data: { label: 'Home Start' } },
    { id: '2', type: 'topCategory1', position: { x: 620, y: 100 }, data: { label: 'CLAIM MANAGEMENT' } },
    { id: '3', type: 'topCategory2', position: { x: 620, y: 350 }, data: { label: 'LEADERSHIP & TEAMS' } },
    { id: '4', type: 'topCategory3', position: { x: 600, y: 600 }, data: { label: 'BUSINESS ADMINISTRATION' } },
    { id: '5', type: 'topCategory4', position: { x: 1250, y: 165 }, data: { label: 'HUMAN RESOURCES' } },
    { id: '6', type: 'topCategory5', position: { x: 1250, y: 490 }, data: { label: 'LEADERSHIP & COMMUNICATION' } },
    { id: '7', type: 'krankikomgebaeude', position: { x: 930, y: 350 }, data: { label: 'Krankenhausgebäude' } },
    { id: '9', type: 'deadlineIcon', position: { x: 756, y: 345 }, data: {} },
    { id: '10', type: 'notificationBadge1', position: { x: 790, y: 120 }, data: { label: '11/71' } },
    { id: '8', type: 'notificationBadge2', position: { x: 790, y: 370 }, data: { label: '25/81' } },
    { id: '11', type: 'notificationBadge3', position: { x: 800, y: 620 }, data: { label: '8/15' } },
    { id: '12', type: 'notificationBadge4', position: { x: 1460, y: 185 }, data: { label: '89/212' } },
    { id: '13', type: 'notificationBadge5', position: { x: 1460, y: 510 }, data: { label: '146/247' } },
    

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
          <Controls />
          <button onClick={onSwitchToCourse}>
            Zur Kursübersicht
          </button>
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
