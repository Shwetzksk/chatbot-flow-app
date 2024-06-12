import UpdateNodePannel from "./update-node-pannel";
import AddNodePannel from "./add-node-pannel";
import useUpdateNode from "@/store/update-node";

export default function SidePannel() {
  const isNodeUpdate = useUpdateNode((state) => state.isUpdate);

  console.log("is node update", isNodeUpdate);
  return <>{isNodeUpdate ? <UpdateNodePannel /> : <AddNodePannel />}</>;
}
