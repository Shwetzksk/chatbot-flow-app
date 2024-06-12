import { Textarea } from "@/components/ui/textarea";
import useUpdateNode from "@/store/update-node";
import { MdKeyboardBackspace } from "react-icons/md";

export default function UpdateMessagePannel() {
  const selecetdNode = useUpdateNode((state) => state.node);
  const updateNode = useUpdateNode((state) => state.updateNode);
  const resetUpdateNode = useUpdateNode((state) => state.reset);

  function handleChange(e) {
    updateNode(e.target.value);
  }
  return (
    <div className="border-b-2">
      <div className="flex items-center border-b-2 p-1.5">
        <span
          className="text-gray-500 cursor-pointer"
          onClick={resetUpdateNode}
        >
          <MdKeyboardBackspace />
        </span>
        <p className="text-center w-full font-medium text-gray-600 text-sm">
          Message
        </p>
      </div>
      <div className="mx-2 my-5">
        <Textarea
          label="Text"
          placeholder="Text"
          value={selecetdNode.data.label}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
