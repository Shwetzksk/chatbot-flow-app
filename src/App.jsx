import SidePannel from "@/components/side-pannel";
import { Button } from "@/components/ui/button";
import ReactFlowPlayground from "./react-flow-canva";
import { useRef } from "react";

export default function App() {
  const saveChangeBtnRef = useRef(null);
  return (
    <section className="w-screen h-screen">
      <nav className="bg-gray-200 flex justify-end py-1">
        <Button variant="outline" size="sm" ref={saveChangeBtnRef}>
          Save Changes
        </Button>
      </nav>
      <main className="grid grid-cols-12 h-[calc(100%-40px)] ">
        <section className="col-span-10 ">
          <ReactFlowPlayground btnRef={saveChangeBtnRef} />
        </section>
        <aside className="col-span-2 border-l-2">
          <SidePannel />
        </aside>
      </main>
    </section>
  );
}
