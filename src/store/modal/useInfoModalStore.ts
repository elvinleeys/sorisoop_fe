import { create } from "zustand";

type InfoModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useInfoModalStore = create<InfoModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));