export const initialEdges = [
  {
    id: 'edge-1',
    source: 'three-level-central-node',
    sourceHandle: 'left-source',
    target: 'three-level-category-top-left',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 24 },
  },
  {
    id: 'edge-2',
    source: 'three-level-central-node',
    sourceHandle: 'left-source',
    target: 'three-level-category-middle-left',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 24 },
  },
  {
    id: 'edge-3',
    source: 'three-level-central-node',
    sourceHandle: 'left-source',
    target: 'three-level-category-bottom-left',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 24 },
  },
  {
    id: 'edge-4',
    source: 'three-level-central-node',
    sourceHandle: 'right-source',
    target: 'three-level-category-top-right',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 24 },
  },
  {
    id: 'edge-5',
    source: 'three-level-central-node',
    sourceHandle: 'right-source',
    target: 'three-level-category-middle-right',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 24 },
  },
  {
    id: 'edge-6',
    source: 'three-level-central-node',
    sourceHandle: 'right-source',
    target: 'three-level-category-bottom-right',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 24 },
  },
  // Edge zwischen 1LevelHierarchyStructureNodeCentral und 2LevelHierarchyStructureNodebottomright
  {
    id: 'edge-hierarchy-connection',
    source: 'one-level-central-node',
    sourceHandle: 'right-source',
    target: 'one-level-category-node-bottom-right',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 1800 },
  },
  // Edge zwischen 1LevelHierarchyStructureNodeCentral und 2LevelHierarchyStructureNodemiddleright
  {
    id: 'edge-hierarchy-connection-middleright',
    source: 'one-level-central-node',
    sourceHandle: 'right-source',
    target: 'one-level-category-node-middle-right',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 1800 },
  },
  // Edge zwischen 1LevelHierarchyStructureNodeCentral und FirstWrapper
  {
    id: 'edge-hierarchy-connection-first-wrapper',
    source: 'one-level-central-node',
    sourceHandle: 'right-source',
    target: 'first-wrapper',
    targetHandle: 'left-target',
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 1800 },
  },
  // Edge zwischen 1LevelHierarchyStructureNodeCentral und Top Left
  {
    id: 'edge-hierarchy-connection-top-left',
    source: 'one-level-central-node',
    sourceHandle: 'left-source',
    target: 'one-level-category-node-top-left',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 1800 },
  },
  // Edge zwischen 1LevelHierarchyStructureNodeCentral und Middle Left
  {
    id: 'edge-hierarchy-connection-middle-left',
    source: 'one-level-central-node',
    sourceHandle: 'left-source',
    target: 'one-level-category-node-middle-left-l1',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 1800 },
  },
  // Edge zwischen 1LevelHierarchyStructureNodeCentral und Bottom Left
  {
    id: 'edge-hierarchy-connection-bottom-left',
    source: 'one-level-central-node',
    sourceHandle: 'left-source',
    target: 'one-level-category-node-bottom-left',
    targetHandle: 'right-target',
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 1800 },
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
  // Edge zwischen BOTTOM LEFT L1 und 6er-Container
  {
    id: 'edge-bottom-left-l1-to-6er-container',
    source: 'one-level-category-node-bottom-left',
    sourceHandle: 'left-source', // Linker Handle von BOTTOM LEFT L1
    target: '6erContainer-level-1',
    targetHandle: 'right-target', // Rechter Handle des 6er-Containers
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 1277 }, // Gleicher Style wie TOP LEFT L1 zu 9er-Grid
  },
  // Edge zwischen 2. Methode & Frameworks und 9er-Grid Level 3
  {
    id: 'edge-methode-frameworks-to-9er-level3',
    source: 'three-level-category-middle-left',
    sourceHandle: 'left-source', // Linker Handle von 2. Methode & Frameworks
    target: '9erContainer-level-3',
    targetHandle: 'right-target', // Rechter Handle des 9er-Grid Level 3
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 17 }, // Neue Farbe für diese Edge
  },
  // Edge zwischen 1. Einführung und 3er-Grid Level 3 Second
  {
    id: 'edge-einfuehrung-to-3er-level3-second',
    source: 'three-level-category-top-left',
    sourceHandle: 'left-source', // Linker Handle von 1. Einführung
    target: '3erContainer-level-3-second',
    targetHandle: 'right-target', // Rechter Handle des 3er-Grid Level 3 Second
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 17 }, // Neue Farbe für diese Edge
  },
  // Edge zwischen 3. PROZESS und 3er-Grid Level 3 Third
  {
    id: 'edge-prozess-to-3er-level3-third',
    source: 'three-level-category-bottom-left',
    sourceHandle: 'left-source', // Linker Handle von 3. PROZESS
    target: '3erContainer-level-3-third',
    targetHandle: 'right-target', // Rechter Handle des 3er-Grid Level 3 Third
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 17 }, // Gleiche Farbe wie andere Level 3 Edges
  },
  // Edge zwischen 4. TOOLS & TECH und 3er-Grid Level 3 (erstes)
  {
    id: 'edge-tools-tech-to-3er-level3-first',
    source: 'three-level-category-top-right',
    sourceHandle: 'right-source', // Rechter Handle von 4. TOOLS & TECH
    target: '3erContainer-level-3',
    targetHandle: 'left-target', // Linker Handle des 3er-Grid Level 3 (erstes)
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 17 }, // Gleiche Farbe wie andere Level 3 Edges
  },
  // Edge zwischen 2llefttop und 9er-Grid Level 2
  {
    id: 'edge-2llefttop-to-9er-level2',
    source: 'two-level-category-node-left-top',
    sourceHandle: 'left-source', // Linker Handle von 2llefttop
    target: '9erContainer-level-2',
    targetHandle: 'right-target', // Rechter Handle des 9er-Grid Level 2
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 255 }, // Angepasste Breite auf 255 px
  },
  // Edge zwischen 2lleftbottom und 6er-Grid Level 2
  {
    id: 'edge-2lleftbottom-to-6er-level2',
    source: 'two-level-category-node-bottom-left',
    sourceHandle: 'left-source', // Linker Handle von 2lleftbottom
    target: '6erContainer-level-2',
    targetHandle: 'right-target', // Rechter Handle des 6er-Grid Level 2
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 255 }, // Gleicher Style wie zwischen 2llefttop und 9er-Grid Level 2
  },
  // Edge zwischen 2lrightbottom und 3er-Grid Level 2
  {
    id: 'edge-2lrightbottom-to-3er-level2',
    source: 'two-level-category-node-bottom-right',
    sourceHandle: 'right-source', // Rechter Handle von 2lrightbottom
    target: '3erContainer-level-2',
    targetHandle: 'left-target', // Linker Handle des 3er-Grid Level 2
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 255 }, // Gleicher Style wie zwischen 2llefttop und 9er-Grid Level 2
  },
  // Edge zwischen TOP LEFT L1 (circular node) und 9er-Grid Level 1
  {
    id: 'edge-topleft-l1-circular-to-9er-level1',
    source: 'one-level-category-node-top-left',
    sourceHandle: 'left-source', // Linker Handle von TOP LEFT L1
    target: '9erContainer-level-1',
    targetHandle: 'right-target', // Rechter Handle des 9er-Grid Level 1
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 1277 }, // Breiter gemacht auf 1277px
  },
  // Edge zwischen MIDDLE RIGHT L1 (circular node) und 6er-Container Level 1 Main
  {
    id: 'edge-middleright-l1-circular-to-6er-level1-main',
    source: 'one-level-category-node-middle-right',
    sourceHandle: 'right-source', // Rechter Handle von MIDDLE RIGHT L1
    target: '6erContainer-level-1-main',
    targetHandle: 'left-target', // Linker Handle des 6er-Container Level 1 Main
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 1277 }, // Gleicher Style wie TOP LEFT L1 zu 9er-Grid
  },
  // Edge zwischen BOTTOM RIGHT L1 (circular node) und 3er-Container Level 1 Main
  {
    id: 'edge-bottomright-l1-circular-to-3er-level1-main',
    source: 'one-level-category-node-bottom-right',
    sourceHandle: 'right-source', // Rechter Handle von BOTTOM RIGHT L1
    target: '3erContainer-level-1-main',
    targetHandle: 'left-target', // Linker Handle des 3er-Container Level 1 Main
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 1277 }, // Gleicher Style wie TOP LEFT L1 zu 9er-Grid
  },
  // Edge zwischen MIDDLE LEFT L1 (circular node) und 3er-Container Level 1
  {
    id: 'edge-middleleft-l1-circular-to-3er-level1',
    source: 'one-level-category-node-middle-left-l1',
    sourceHandle: 'left-source', // Linker Handle von MIDDLE LEFT L1
    target: '3erContainer-level-1',
    targetHandle: 'right-target', // Rechter Handle des 3er-Container Level 1
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 1277 }, // Gleicher Style wie TOP LEFT L1 zu 9er-Grid
  },
  // Edge zwischen 5. Rollen und 6er-Container Level 3
  {
    id: 'edge-rollen-to-6er-level3',
    source: 'three-level-category-middle-right',
    sourceHandle: 'right-source', // Rechter Handle von 5. Rollen
    target: '6erContainer-level-3',
    targetHandle: 'left-target', // Linker Handle des 6er-Container Level 3
    type: 'step',
    style: { stroke: '#C4C4C4', strokeWidth: 17 }, // Gleicher Style wie 2. Methode & Frameworks zu 9er-Grid Level 3
  },
];
