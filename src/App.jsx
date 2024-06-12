import SidePannel from "@/components/side-pannel";
import { Button } from "@/components/ui/button";
import ReactFlowPlayground from "./react-flow-canva";
import { useRef } from "react";
import { Toaster } from "react-hot-toast";

export default function App() {
  const saveChangeBtnRef = useRef(null);
  return (
    <section className="w-screen h-screen">
      <nav className="bg-gray-200 flex justify-end py-1">
        <Button variant="outline" size="sm" ref={saveChangeBtnRef}>
          Save Changes
        </Button>
      </nav>
      <main className="grid grid-rows-12 md:grid-rows-none  md:grid-cols-12 h-[calc(100%-40px)] ">
        <section className="row-span-9 md:row-span-full md:col-span-9 xl:col-span-10 ">
          <ReactFlowPlayground btnRef={saveChangeBtnRef} />
        </section>
        <aside className="row-span-3 md:row-span-full  md:col-span-3 xl:col-span-2  border-t-2 md:border-l-2 ">
          <SidePannel />
        </aside>
      </main>
      <Toaster position="top-center" />
    </section>
  );
}
