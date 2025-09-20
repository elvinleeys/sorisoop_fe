import { create } from "zustand";

type DeleteAccountModalState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const useDeleteAccountModalStore = create<DeleteAccountModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));