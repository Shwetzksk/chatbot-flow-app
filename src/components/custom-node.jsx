import useUpdateNode from "@/store/update-node";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { PiWhatsappLogoFill } from "react-icons/pi";
import { Handle, Position } from "reactflow";

export default function CustomNode({ data, selected, ...others }) {
  return (
    <div
      className={`shadow-lg border-2 rounded-md bg-white min-w-56 ${
        selected ? "border-blue-600 " : "border-transparent"
      }`}
    >
      <div>
        <div className="flex items-center justify-between bg-teal-200 py-1 px-3 rounded-t-md">
          <div className="flex items-center gap-2">
            <BiMessageRoundedDetail className="text-sm text-gray-600" />
            <label htmlFor="text" className="font-bold">
              Send Message
            </label>
          </div>
          <PiWhatsappLogoFill className="text-green-500 bg-white rounded-full p-0.5 text-lg" />
        </div>
        <div className="p-3">
          <p>{data.label}</p>
        </div>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
