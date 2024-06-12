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
import toast, { Toaster } from "react-hot-toast";

import "reactflow/dist/style.css";
import { useMemo } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

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
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const setSelectedNode = useUpdateNode((state) => state.setSelect);
  const updateNode = useUpdateNode((state) => state.node);

  console.log(updateNode);
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => {
        //adding arrow at end of edge
        return addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, eds);
      }),
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
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  console.log("Edges", edges);
  console.log("Nodes", nodes);
  useEffect(() => {
    function saveChanges() {
      if (updateNode) {
        setNodes((nds) => {
          const updateNodeIndex = nds.findIndex(
            (item) => item?.id === updateNode?.id
          );
          const newNodes = [...nds];
          if (updateNodeIndex >= 0) {
            newNodes[updateNodeIndex] = updateNode;
          }
          return newNodes;
        });
        toast.success("Updated node successfully");
      } else {
        const isAllNodeConnected = edges.length >= nodes.length - 1;

        if (!isAllNodeConnected) {
          toast.error("Cannot save flow");
        } else {
          toast.success("Saved flow");
        }
      }
    }
    btnRef.current.addEventListener("click", saveChanges);

    return () => {
      btnRef.current.removeEventListener("click", saveChanges);
    };
  }, [updateNode, edges, nodes]);
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
