import { Textarea } from "@/components/ui/textarea";
import useUpdateNode from "@/store/update-node";
import { useEffect } from "react";
import { useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";

export default function UpdateMessagePannel() {
  const selecetdNode = useUpdateNode((state) => state.node);
  const updateNode = useUpdateNode((state) => state.updateNode);
  const resetUpdateNode = useUpdateNode((state) => state.reset);
  const [showHelperText, setShowHelperText] = useState(false);

  function handleChange(e) {
    updateNode(e.target.value);
  }

  function onBlur() {
    setShowHelperText(true);
  }

  useEffect(() => {
    let timer =
      showHelperText &&
      setTimeout(() => {
        setShowHelperText(false);
      }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [showHelperText]);
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
          onBlur={onBlur}
        />
        {showHelperText ? (
          <p className="mt-1 text-xs">
            Save changes in order to update the node
          </p>
        ) : null}
      </div>
    </div>
  );
}
