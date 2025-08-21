import { create } from "zustand";

const useFormStore = create((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useFormStore;
