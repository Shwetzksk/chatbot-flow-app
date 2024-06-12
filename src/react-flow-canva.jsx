import React, { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  ReactFlowProvider,
} from "reactflow";
import CustomNode from "@/components/node";
import useUpdateNode from "@/store/update-node";

import "reactflow/dist/style.css";
import { useMemo } from "react";
import { useRef } from "react";
import { useState } from "react";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" }, type: "node" },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" }, type: "node" },
  { id: "3", position: { x: 0, y: 300 }, data: { label: "3" }, type: "node" },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
let id = 0;
const getId = () => `dndnode_${id++}`;
const nodeTypes = { node: CustomNode };
export default function ReactFlowPlayground({ btnRef }) {
  console.log("btm ref", btnRef);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const setSelectedNode = useUpdateNode((state) => state.setSelect);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `message ${id}` },
      };
      setNodes((nds) => {
        console.log("NODES", nds);
        return nds.concat(newNode);
      });
    },
    [reactFlowInstance]
  );

  return (
    <ReactFlowProvider>
      <div ref={reactFlowWrapper} className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={(_, node) => {
            setSelectedNode(node);
          }}
        >
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
