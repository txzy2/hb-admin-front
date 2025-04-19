import {
  Background,
  Controls,
  Edge,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState
} from '@xyflow/react';
import {Plus, Trash2} from 'lucide-react';
import React, {useCallback, useRef} from 'react';

import {CustomResizebleNode} from '@/shared/ui';

const styles = {
  background: '#f8f8f8',
  width: '100%',
  height: '100%'
};

const nodeTypes = {
  CustomResizebleNode
};

interface CustomNodeData extends Record<string, unknown> {
  label: string;
  seats?: number;
}

const TableMap: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<CustomNodeData>>(
    []
  );
  const [edges, _setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const idRef = useRef(0);

  const addNode = useCallback(() => {
    if (nodes.length >= 10) {
      alert('Достигнуто максимальное количество столиков (10)');
      return;
    }

    const newNodeId = `node-${idRef.current++}`;
    const newNode: Node<CustomNodeData> = {
      id: newNodeId,
      type: 'CustomResizebleNode',
      data: {
        label: `Столик ${idRef.current}`,
        style: {
          border: `1px dashed #${Math.floor(Math.random() * 16777215).toString(
            16
          )}`,
          borderRadius: '5px',
          color: '#fff'
        }
      },
      position: {
        x: 0,
        y: 0
      },
      width: 60,
      height: 30
    };

    setNodes(nds => [...nds, newNode]);
    console.log(nodes);
  }, [setNodes, nodes.length]);

  // Функция для удаления узла
  const removeNode = useCallback(
    (id: string) => {
      setNodes(nds => nds.filter(node => node.id !== id));
    },
    [setNodes]
  );

  return (
    <div className='text-black w-5/6 h-5/6 shadow-xl rounded-lg overflow-hidden relative'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        style={styles}
      >
        <Background color='#aaa' gap={16} />
        <Controls />

        <div
          style={{
            position: 'absolute',
            top: '50px',
            right: '50px',
            borderRadius: '10px',
            width: 'calc(100% - 100px)',
            height: 'calc(100% - 100px)',
            border: '2px dashed #000',
            pointerEvents: 'none'
          }}
        />
      </ReactFlow>

      <div className='absolute top-4 left-4 z-10 flex gap-1'>
        <button
          onClick={addNode}
          title='Добавить столик'
          className='bg-gray-100 px-3 py-2 rounded shadow-md hover:bg-white'
        >
          <Plus size={20} />
        </button>

        {nodes.map(node => (
          <button
            key={node.id}
            onClick={() => removeNode(node.id)}
            className='flex items-center gap-1 bg-red-500 text-white text-[12px] px-3 py-2 rounded hover:bg-red-400'
          >
            <Trash2 size={13} /> Столик{' '}
            {parseInt(node.id.replace('node-', '')) + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TableMap;
