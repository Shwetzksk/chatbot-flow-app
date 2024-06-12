import CustomNode from "@/components/custom-node";
import useUpdateNode from "@/store/update-node";
import { useCallback } from "react";
import toast from "react-hot-toast";
import ReactFlow, {
  Background,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";

import { useEffect, useRef, useState } from "react";
import "reactflow/dist/style.css";

let id = 0;
const getId = () => `dndnode_${id++}`;
const nodeTypes = { node: CustomNode };
export default function ReactFlowPlayground({ btnRef }) {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const setSelectedNode = useUpdateNode((state) => state.setSelect);
  const updateNode = useUpdateNode((state) => state.node); //updated node with label

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
        data: { label: `test message ${id}` },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

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

        if (!isAllNodeConnected || !nodes.length) {
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
        ></ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
