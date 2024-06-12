import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useUpdateNode = create()(
  immer((set) => ({
    isUpdate: false,
    oldNode: null,
    node: null,
    setSelect: (node) => set(() => ({ isUpdate: true, node, oldNode: node })),
    updateNode: (label) =>
      set((state) => {
        state.node.data.label = label;
      }),
    reset: () => set(() => ({ isUpdate: false, node: null, oldNode: null })),
  }))
);

export default useUpdateNode;
