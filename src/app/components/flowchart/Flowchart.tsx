import React, { useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Node, 
  Edge,
  MarkerType,
  Position,
  Handle
} from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from './CustomNodes';

// Invisible node for routing
const WaypointNode = ({ data }: any) => {
  return (
    <div className="w-[1px] h-[1px] opacity-0 pointer-events-none">
       <Handle type="target" position={Position.Top} id="t" />
       <Handle type="target" position={Position.Right} id="r" />
       <Handle type="target" position={Position.Bottom} id="b" />
       <Handle type="target" position={Position.Left} id="l" />
       
       <Handle type="source" position={Position.Top} id="s-t" />
       <Handle type="source" position={Position.Right} id="s-r" />
       <Handle type="source" position={Position.Bottom} id="s-b" />
       <Handle type="source" position={Position.Left} id="s-l" />
    </div>
  );
};

const customNodeTypes = { ...nodeTypes, waypoint: WaypointNode };

const initialNodes: Node[] = [
  // 1. Start
  { id: 'start', type: 'startEnd', position: { x: 320, y: 50 }, data: { label: 'Start' } },
  
  // 2. Header
  { id: 'disp-title', type: 'io', position: { x: 310, y: 150 }, data: { label: 'Display "EMPLOYEE PAYROLL SYSTEM"' } },
  
  // 3. Input Count
  { id: 'inp-count', type: 'io', position: { x: 310, y: 250 }, data: { label: 'Input employeeCount' } },
  
  // 4. Init Vars
  { id: 'init-vars', type: 'process', position: { x: 310, y: 350 }, data: { label: 'totalPayroll = 0\nhighestNetPay = 0\ni = 1' } },
  
  // 5. Loop Decision (Center of loop)
  { id: 'dec-loop', type: 'decision', position: { x: 320, y: 460 }, data: { label: 'i ≤ employeeCount?' } },

  // NO Branch (Right side -> End)
  // Aligned Y center to dec-loop (540). IO height 60, so Y=510.
  { id: 'disp-total', type: 'io', position: { x: 600, y: 510 }, data: { label: 'Display totalPayroll' } },
  { id: 'disp-high', type: 'io', position: { x: 600, y: 610 }, data: { label: 'Display highestNetPay' } },
  { id: 'end', type: 'startEnd', position: { x: 610, y: 710 }, data: { label: 'End' } },

  // YES Branch (Down)
  { id: 'inp-name', type: 'io', position: { x: 310, y: 700 }, data: { label: 'Input Name' } },
  { id: 'inp-hours', type: 'io', position: { x: 310, y: 800 }, data: { label: 'Input Hours' } },
  { id: 'inp-rate', type: 'io', position: { x: 310, y: 900 }, data: { label: 'Input Rate' } },
  { id: 'calc-gross', type: 'process', position: { x: 310, y: 1000 }, data: { label: 'grossPay = hours × rate' } },

  // 6. Gross Decision
  { id: 'dec-gross', type: 'decision', position: { x: 320, y: 1150 }, data: { label: 'grossPay > 20000?' } },

  // Gross YES (Left)
  { id: 'tax-10', type: 'process', position: { x: 100, y: 1200 }, data: { label: 'tax = grossPay × 0.10' } },
  
  // Gross NO (Right)
  { id: 'tax-5', type: 'process', position: { x: 540, y: 1200 }, data: { label: 'tax = grossPay × 0.05' } },

  // 7. Calc Net (Merge)
  { id: 'calc-net', type: 'process', position: { x: 310, y: 1350 }, data: { label: 'netPay = grossPay - tax' } },

  // 8. Output Net
  { id: 'disp-net', type: 'io', position: { x: 310, y: 1450 }, data: { label: 'Display netPay' } },
  
  // 9. Accumulate
  { id: 'accum', type: 'process', position: { x: 310, y: 1550 }, data: { label: 'totalPayroll += netPay' } },

  // 10. Net Decision
  { id: 'dec-net', type: 'decision', position: { x: 320, y: 1700 }, data: { label: 'netPay > highestNetPay?' } },

  // Net YES (Right)
  { id: 'update-high', type: 'process', position: { x: 580, y: 1750 }, data: { label: 'highestNetPay = netPay' } },

  // 11. Increment i (Merge)
  { id: 'incr-i', type: 'process', position: { x: 310, y: 1900 }, data: { label: 'i = i + 1' } },

  // Waypoints for Loop Back
  // Go from incr-i (310, 1900) down to (310, 1960) left to (-50, 1960) up to (-50, 540) right to (320, 540)
  { id: 'wp-1', type: 'waypoint', position: { x: 50, y: 1930 }, data: { label: '' } }, // Left of incr-i
  { id: 'wp-2', type: 'waypoint', position: { x: 50, y: 540 }, data: { label: '' } }, // Left of dec-loop (approx)
];

const initialEdges: Edge[] = [
  // Header Flow
  { id: 'e1', source: 'start', target: 'disp-title', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e2', source: 'disp-title', target: 'inp-count', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e3', source: 'inp-count', target: 'init-vars', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e4', source: 'init-vars', target: 'dec-loop', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },

  // Loop Decision Logic
  { id: 'e-loop-no', source: 'dec-loop', target: 'disp-total', sourceHandle: 'right', targetHandle: 'left', label: 'NO', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-loop-yes', source: 'dec-loop', target: 'inp-name', sourceHandle: 'bottom', targetHandle: 'top', label: 'YES', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },

  // No Branch (End Sequence)
  { id: 'e-disp-total', source: 'disp-total', target: 'disp-high', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-disp-high', source: 'disp-high', target: 'end', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },

  // Yes Branch flow
  { id: 'e-inp-name', source: 'inp-name', target: 'inp-hours', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-inp-hours', source: 'inp-hours', target: 'inp-rate', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-inp-rate', source: 'inp-rate', target: 'calc-gross', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-calc-gross', source: 'calc-gross', target: 'dec-gross', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },

  // Gross Decision
  { id: 'e-gross-yes', source: 'dec-gross', target: 'tax-10', sourceHandle: 'left', targetHandle: 'right', label: 'YES', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-gross-no', source: 'dec-gross', target: 'tax-5', sourceHandle: 'right', targetHandle: 'left', label: 'NO', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },

  // Merge to Net
  { id: 'e-tax-10', source: 'tax-10', target: 'calc-net', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-tax-5', source: 'tax-5', target: 'calc-net', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },

  // Net Flow
  { id: 'e-calc-net', source: 'calc-net', target: 'disp-net', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-disp-net', source: 'disp-net', target: 'accum', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-accum', source: 'accum', target: 'dec-net', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },

  // Net Decision
  { id: 'e-net-yes', source: 'dec-net', target: 'update-high', sourceHandle: 'right', targetHandle: 'left', label: 'YES', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-net-no', source: 'dec-net', target: 'incr-i', sourceHandle: 'bottom', targetHandle: 'top', label: 'NO', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  
  // Update High Merge
  { id: 'e-update-high', source: 'update-high', target: 'incr-i', sourceHandle: 'bottom', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },

  // Loop Back: Incr-i -> wp-1 -> wp-2 -> dec-loop
  { id: 'e-lb-1', source: 'incr-i', target: 'wp-1', sourceHandle: 'bottom', targetHandle: 'r', type: 'smoothstep' },
  { id: 'e-lb-2', source: 'wp-1', target: 'wp-2', sourceHandle: 's-t', targetHandle: 'b', type: 'smoothstep' },
  { id: 'e-lb-3', source: 'wp-2', target: 'dec-loop', sourceHandle: 's-r', targetHandle: 'top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
];

export const Flowchart = () => {
  const nodes = useMemo(() => initialNodes, []);
  const edges = useMemo(() => initialEdges, []);

  return (
    <div className="w-full h-full bg-white border border-gray-200 rounded-lg overflow-hidden font-sans">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={customNodeTypes}
        fitView
        attributionPosition="bottom-right"
      >
        <Background color="#f0f0f0" gap={20} />
        <Controls />
      </ReactFlow>
    </div>
  );
};
