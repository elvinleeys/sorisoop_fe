import { create } from "zustand";

const isReviewValid = (value: string, maxLength = 150) => {
  if (value.trim().length === 0) return false;
  if (value.length > maxLength) return false;
  return true;
};

interface ReviewState {
  value: string;
  isValid: boolean;
  submitAttempted: boolean;
  setValue: (val: string) => void;
  setSubmitAttempted: (val: boolean) => void;
}

export const useReviewStore = create<ReviewState>((set) => ({
  value: "",
  isValid: false,
  submitAttempted: false,
  setValue: (val) =>
    set({
      value: val,
      isValid: isReviewValid(val),
    }),
  setSubmitAttempted: (val) => set({ submitAttempted: val }),
}));
