import {Handle, NodeResizeControl, Position} from '@xyflow/react';

import {Armchair} from 'lucide-react';
import {memo} from 'react';

const CustomNode = ({data}: {data: any}) => {
  const handleStyle = {
    border: data.style.border,
    backgroundColor: data.style.color,
    borderRadius: data.style.borderRadius
  };

  return (
    <div
      className='relative w-full h-full flex items-center justify-center'
      style={handleStyle}
    >
      <NodeResizeControl
        style={handleStyle}
        minWidth={60}
        minHeight={30}
        maxHeight={60}
        maxWidth={120}
      ></NodeResizeControl>

      <Handle type='target' position={Position.Left} />
      <div
        className={`absolute inset-0 flex items-center justify-center gap-1 text-[6px] font-bold`}
      >
        <Armchair size={10} /> {data.label}
      </div>
      <Handle type='source' position={Position.Right} />
    </div>
  );
};

export default memo(CustomNode);
