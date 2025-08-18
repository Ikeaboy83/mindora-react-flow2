export const initialEdges = [
  {
    id: 'edge-1',
    source: 'three-level-central-node',
    sourceHandle: 'left-source',
    target: 'three-level-category-top-left',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 24 },
  },
  {
    id: 'edge-2',
    source: 'three-level-central-node',
    sourceHandle: 'left-source',
    target: 'three-level-category-middle-left',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 24 },
  },
  {
    id: 'edge-3',
    source: 'three-level-central-node',
    sourceHandle: 'left-source',
    target: 'three-level-category-bottom-left',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 24 },
  },
  {
    id: 'edge-4',
    source: 'three-level-central-node',
    sourceHandle: 'right-source',
    target: 'three-level-category-top-right',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 24 },
  },
  {
    id: 'edge-5',
    source: 'three-level-central-node',
    sourceHandle: 'right-source',
    target: 'three-level-category-middle-right',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 24 },
  },
  {
    id: 'edge-6',
    source: 'three-level-central-node',
    sourceHandle: 'right-source',
    target: 'three-level-category-bottom-right',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 24 },
  },
  // Edge zwischen 1LevelHierarchyStructureNodeCentral und 2LevelHierarchyStructureNodebottomright
  {
    id: 'edge-hierarchy-connection',
    source: 'one-level-central-node',
    sourceHandle: 'right-source',
    target: 'one-level-category-node-bottom-right',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 1800 },
  },
  // Edge zwischen 1LevelHierarchyStructureNodeCentral und 2LevelHierarchyStructureNodemiddleright
  {
    id: 'edge-hierarchy-connection-middleright',
    source: 'one-level-central-node',
    sourceHandle: 'right-source',
    target: 'one-level-category-node-middle-right',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 1800 },
  },
  // Edge zwischen 1LevelHierarchyStructureNodeCentral und FirstWrapper
  {
    id: 'edge-hierarchy-connection-first-wrapper',
    source: 'one-level-central-node',
    sourceHandle: 'right-source',
    target: 'first-wrapper',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 1800 },
  },
  // Edge zwischen 1LevelHierarchyStructureNodeCentral und Top Left
  {
    id: 'edge-hierarchy-connection-top-left',
    source: 'one-level-central-node',
    sourceHandle: 'left-source',
    target: 'one-level-category-node-top-left',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 1800 },
  },
  // Edge zwischen 1LevelHierarchyStructureNodeCentral und Middle Left
  {
    id: 'edge-hierarchy-connection-middle-left',
    source: 'one-level-central-node',
    sourceHandle: 'left-source',
    target: 'one-level-category-node-middle-left-l1',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 1800 },
  },
  // Edge zwischen 1LevelHierarchyStructureNodeCentral und Bottom Left
  {
    id: 'edge-hierarchy-connection-bottom-left',
    source: 'one-level-central-node',
    sourceHandle: 'left-source',
    target: 'one-level-category-node-bottom-left',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 1800 },
  },
  // Edge zwischen 2LLARGE und 2LRIGHTBOTTOM
  {
    id: 'edge-2l-large-to-2l-right-bottom',
    source: 'two-level-central-node',
    sourceHandle: 'right-source',
    target: 'two-level-category-node-bottom-right',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 360},
  },
  // Edge zwischen 2LLARGE und SecondWrapper
  {
    id: 'edge-2l-large-to-second-wrapper',
    source: 'two-level-central-node',
    sourceHandle: 'right-source',
    target: 'second-wrapper',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 360},
  },
  // Edge zwischen 2LLARGE und 2LLEFTTOP
  {
    id: 'edge-2l-large-to-2l-left-top',
    source: 'two-level-central-node',
    sourceHandle: 'left-source',
    target: 'two-level-category-node-left-top',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 360},
  },
  // Edge zwischen 2LLARGE und 2LLEFTBOTTOM
  {
    id: 'edge-2l-large-to-2l-left-bottom',
    source: 'two-level-central-node',
    sourceHandle: 'left-source',
    target: 'two-level-category-node-bottom-left',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C1C1C1', strokeWidth: 360},
  },
  // Edge zwischen 4. TOOLS & TECH und modernem Grid-Container
  {
    id: 'edge-tools-tech-to-modern-grid',
    source: 'three-level-category-top-right',
    sourceHandle: 'right-source',
    target: 'third-level-threer-gridbox1-container',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#D1D1D1', strokeWidth: 17 },
  },
  // Edge zwischen TOP LEFT L1 und 9er-Container
  {
    id: 'edge-top-left-l1-to-9er-container',
    source: 'one-level-category-node-top-left',
    sourceHandle: 'left-source', // Linker Handle von TOP LEFT L1
    target: '9erContainer-1-level-1',
    targetHandle: 'right-target', // Rechter Handle des 9er-Containers
    type: 'step',
    style: { stroke: '#01D2BC', strokeWidth: 1800 }, // Gleiche Farbe wie CircularNode
  },
];
