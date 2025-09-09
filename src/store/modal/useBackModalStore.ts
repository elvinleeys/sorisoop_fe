import { create } from "zustand";

type BackModalState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const useBackModalStore = create<BackModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));