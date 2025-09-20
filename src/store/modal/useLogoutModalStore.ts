import { create } from "zustand";

type LogoutModalState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const useLogoutModalStore = create<LogoutModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));