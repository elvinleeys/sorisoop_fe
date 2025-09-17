import { create } from "zustand";

interface SignUpState {
  formData: {
    nickname?: string;
    email?: string;
    password?: string;
  };
  setFormData: (data: Partial<SignUpState["formData"]>) => void;
  reset: () => void;
}

export const useSignUpStore = create<SignUpState>((set) => ({
    formData: {},
    setFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data },
    })),
    reset: () => set({ formData: {} }),
}));