import { create } from "zustand";

export type Category = "cafe" | "cutlery" | "culture" | "tour";
export type NoiseLevel = "quiet" | "moderate" | "loud";
export type Radius = 500 | 1000 | 2000;

interface FilterState {
  isOpen: boolean;
  selectedCategories: Category[];
  selectedNoiseLevels: NoiseLevel[];
  selectedRadius: Radius | null;
  open: () => void;
  close: () => void;
  toggleCategory: (category: Category) => void;
  toggleNoiseLevel: (level: NoiseLevel) => void;
  selectRadius: (radius: Radius) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  isOpen: false,
  selectedCategories: [],
  selectedNoiseLevels: [],
  selectedRadius: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggleCategory: (category) =>
    set((state) => {
      const exists = state.selectedCategories.includes(category);
      return {
        selectedCategories: exists
          ? state.selectedCategories.filter((c) => c !== category)
          : [...state.selectedCategories, category],
      };
    }),
  toggleNoiseLevel: (level) =>
    set((state) => {
      const exists = state.selectedNoiseLevels.includes(level);
      return {
        selectedNoiseLevels: exists
          ? state.selectedNoiseLevels.filter((n) => n !== level)
          : [...state.selectedNoiseLevels, level],
      };
    }),
  selectRadius: (radius) => set({ selectedRadius: radius }),
  resetFilters: () =>
    set({
      selectedCategories: [],
      selectedNoiseLevels: [],
      selectedRadius: null,
    }),
}));
