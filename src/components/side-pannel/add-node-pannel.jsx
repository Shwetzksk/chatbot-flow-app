import { BiMessageRoundedDetail } from "react-icons/bi";

export default function AddNodePannel() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div
      className="flex flex-col items-center w-fit border-2 border-blue-500 text-blue-500 py-1 px-7 rounded m-2 cursor-pointer"
      draggable
      onDragStart={(e) => onDragStart(e, "node")}
    >
      <BiMessageRoundedDetail className="text-2xl" />
      <p>Message</p>
    </div>
  );
}
