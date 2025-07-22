// src/components/home/HomeFlowCanvas.jsx
import { ReactFlow, ReactFlowProvider, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CentralCircle from './centralCircle';
import TopCategory1 from './topCategory1';
import TopCategory2 from './topCategory2';
import TopCategory3 from './topCategory3';
import TopCategory4 from './topCategory4';
import TopCategory5 from './topCategory5';
import KrankikomgebaeudeNode from './KrankikomgebaeudeNode';
import NotificationBadge1 from './notificationBadge1';

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
  };
  const nodes = [
    { id: '1', type: 'centralCircle', position: { x: 700, y: 130 }, data: { label: 'Home Start' } },
    { id: '2', type: 'topCategory1', position: { x: 620, y: 100 }, data: { label: 'CLAIM MANAGEMENT' } },
    { id: '3', type: 'topCategory2', position: { x: 620, y: 350 }, data: { label: 'AGILES\nPROJEKT-\nMANAGEMENT' } },
    { id: '4', type: 'topCategory3', position: { x: 600, y: 600 }, data: { label: 'BUSINESS ADMINISTRATION' } },
    { id: '5', type: 'topCategory4', position: { x: 1250, y: 165 }, data: { label: 'HUMAN RESOURCES' } },
    { id: '6', type: 'topCategory5', position: { x: 1250, y: 490 }, data: { label: 'LEADERSHIP & COMMUNICATION' } },
    { id: '7', type: 'krankikomgebaeude', position: { x: 930, y: 350 }, data: { label: 'Krankenhausgebäude' } },
    { id: '8', type: 'notificationBadge1', position: { x: 800, y: 200 }, data: { label: '1' } }
  ];
  const edges = [];

  return (
    <div style={{ height: '100vh', width: '100vw', background: 'radial-gradient(circle, #ffffff 45%, #c1c1c1 100%)' }}>
      <ReactFlowProvider>
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
          <Controls />
          <button onClick={onSwitchToCourse}>
            Zur Kursübersicht
          </button>
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
