import UpdateNodePannel from "./update-node-pannel";
import AddNodePannel from "./add-node-pannel";
import useUpdateNode from "@/store/update-node";

export default function SidePannel() {
  const isNodeUpdate = useUpdateNode((state) => state.isUpdate);

  return <>{isNodeUpdate ? <UpdateNodePannel /> : <AddNodePannel />}</>;
}
