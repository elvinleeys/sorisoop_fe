import { create } from "zustand";

type ModalType = 
  | "back"
  | "info"
  | "deleteAccount"
  | "delete"
  | "logout";

type ModalState = {
    currentModal: ModalType | null;
    openModal: (modal: ModalType) => void;
    closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
    currentModal: null,
    openModal: (modal: ModalType) => set({ currentModal: modal }),
    closeModal: () => set({ currentModal: null }),
}));