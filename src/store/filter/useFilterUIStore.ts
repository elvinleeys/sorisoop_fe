import { create } from "zustand";

interface FilterUIState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useFilterUIStore = create<FilterUIState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));