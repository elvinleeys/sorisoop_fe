import { create } from "zustand";

export type NoiseLevel = "quiet" | "moderate" | "loud";
export type Radius = 200 | 300 | 500 | 1000;
export type Category = "cafe" | "cutlery" | "culture" | "tour";

export type CategoryCode = "CE7" | "FD6" | "CT1" | "AT4";

export const categoryMap: Record<Category, CategoryCode> = {
    cafe: "CE7",      // 카페
    cutlery: "FD6",   // 음식점
    culture: "CT1",   // 문화시설
    tour: "AT4",      // 관광명소
};

interface FilterDataState {
    selectedCategories: CategoryCode[];
    selectedNoiseLevels: NoiseLevel[];
    selectedRadius: Radius;
    applied: boolean; // 필터 적용 여부
    toggleCategory: (category: Category) => void;
    toggleNoiseLevel: (level: NoiseLevel) => void;
    selectRadius: (radius: Radius) => void;
    resetFilters: () => void;
    applyFilters: () => void; // 적용 버튼 누르면 true로
    clearApplied: () => void; // 초기화 시 false로
}

export const useFilterDataStore = create<FilterDataState>((set) => ({
    selectedCategories: [],
    selectedNoiseLevels: ["quiet"],
    selectedRadius: 200,
    applied: false,

    toggleCategory: (category) =>
        set((state) => {
            const code = categoryMap[category]; // 자동 변환
            const exists = state.selectedCategories.includes(code);
            return {
                selectedCategories: exists
                ? state.selectedCategories.filter((c) => c !== code)
                : [...state.selectedCategories, code],
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
            selectedNoiseLevels: ["quiet"],
            selectedRadius: 200,
        }),
    applyFilters: () => set({ applied: true }),
    clearApplied: () => set({ applied: false }),
}));