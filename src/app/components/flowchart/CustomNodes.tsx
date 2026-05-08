import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

// Standard Oval for Start/End
const StartEndNode = memo(({ data }: NodeProps) => {
  return (
    <div className="relative flex items-center justify-center w-[160px] h-[60px]">
      <div className="absolute inset-0 bg-white border-2 border-black rounded-[30px] shadow-sm"></div>
      <div className="relative z-10 font-bold text-sm text-center px-2 pointer-events-none">
        {data.label}
      </div>
      <Handle type="target" position={Position.Top} id="top" className="!bg-transparent !border-none" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-transparent !border-none" />
    </div>
  );
});

// Parallelogram for Input/Output
const IONode = memo(({ data }: NodeProps) => {
  return (
    <div className="relative flex items-center justify-center w-[180px] h-[60px]">
       <div className="absolute inset-0 bg-white border-2 border-black transform -skew-x-20 shadow-sm origin-center"></div>
       <div className="relative z-10 text-sm font-medium text-center px-4 pointer-events-none">
         {data.label}
       </div>
       <Handle type="target" position={Position.Top} id="top" className="!bg-transparent !border-none" />
       <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-transparent !border-none" />
       <Handle type="target" position={Position.Left} id="left" className="!bg-transparent !border-none" />
       <Handle type="source" position={Position.Right} id="right" className="!bg-transparent !border-none" />
    </div>
  );
});

// Rectangle for Process
const ProcessNode = memo(({ data }: NodeProps) => {
  return (
    <div className="relative flex items-center justify-center w-[180px] h-[60px] bg-white border-2 border-black shadow-sm">
      <div className="text-sm font-medium text-center px-2 pointer-events-none">
        {data.label}
      </div>
      <Handle type="target" position={Position.Top} id="top" className="!bg-transparent !border-none" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-transparent !border-none" />
      <Handle type="target" position={Position.Left} id="left" className="!bg-transparent !border-none" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-transparent !border-none" />
    </div>
  );
});

// Diamond for Decision
const DecisionNode = memo(({ data }: NodeProps) => {
  return (
    <div className="relative w-[160px] h-[160px] flex items-center justify-center">
      {/* Rotated square */}
      <div className="absolute w-[110px] h-[110px] bg-white border-2 border-black transform rotate-45 shadow-sm"></div>
      
      {/* Text (not rotated) */}
      <div className="relative z-10 text-xs font-bold text-center w-[100px] pointer-events-none leading-tight">
        {data.label}
      </div>

      <Handle type="target" position={Position.Top} id="top" className="!bg-transparent !border-none" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-transparent !border-none" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-transparent !border-none" />
      <Handle type="source" position={Position.Left} id="left" className="!bg-transparent !border-none" />
    </div>
  );
});

export const nodeTypes = {
  startEnd: StartEndNode,
  io: IONode,
  process: ProcessNode,
  decision: DecisionNode,
};
