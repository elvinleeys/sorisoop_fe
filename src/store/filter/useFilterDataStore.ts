import { create } from "zustand";

export type NoiseLevel = "quiet" | "moderate" | "loud";
export type Radius = 200 | 300 | 500 | 1000;
export type Category = "cafe" | "cutlery" | "culture" | "tour";
export type CategoryCode = "CE7" | "FD6" | "CT1" | "AT4";

export const categoryMap: Record<Category, CategoryCode> = {
  cafe: "CE7",
  cutlery: "FD6",
  culture: "CT1",
  tour: "AT4",
};

interface FilterDataState {
  // 현재 선택된 필터 (임시)
  tempCategories: CategoryCode[];
  tempNoiseLevels: NoiseLevel[];
  tempRadius: Radius;

  // 적용 완료 상태
  appliedCategories: CategoryCode[];
  appliedNoiseLevels: NoiseLevel[];
  appliedRadius: Radius;

  // 필터 UI 동작용
  resetTrigger: boolean;

  // 액션
  toggleCategory: (category: Category) => void;
  toggleNoiseLevel: (level: NoiseLevel) => void;
  selectRadius: (radius: Radius) => void;

  applyFilters: () => void;      // 적용 버튼 클릭
  resetFilters: () => void;      // 초기화 버튼 클릭
  discardFilters: () => void;    // 닫기 시 선택 무시
  triggerReset: () => void;
}

export const useFilterDataStore = create<FilterDataState>((set, get) => ({
  tempCategories: [],
  tempNoiseLevels: ["quiet"],
  tempRadius: 200,

  appliedCategories: [],
  appliedNoiseLevels: ["quiet"],
  appliedRadius: 200,

  resetTrigger: false,

  toggleCategory: (category) => {
    const code = categoryMap[category];
    const temp = get().tempCategories;
    set({
      tempCategories: temp.includes(code)
        ? temp.filter((c) => c !== code)
        : [...temp, code],
    });
  },
  toggleNoiseLevel: (level) => {
    const temp = get().tempNoiseLevels;
    set({
      tempNoiseLevels: temp.includes(level)
        ? temp.filter((n) => n !== level)
        : [...temp, level],
    });
  },
  selectRadius: (radius) => set({ tempRadius: radius }),

  applyFilters: () => {
    const { tempCategories, tempNoiseLevels, tempRadius } = get();
    set({
      appliedCategories: tempCategories,
      appliedNoiseLevels: tempNoiseLevels,
      appliedRadius: tempRadius,
      resetTrigger: !get().resetTrigger,
    });
  },

  resetFilters: () => {
    set({
      tempCategories: [],
      tempNoiseLevels: ["quiet"],
      tempRadius: 200,
      appliedCategories: [],
      appliedNoiseLevels: ["quiet"],
      appliedRadius: 200,
      resetTrigger: !get().resetTrigger,
    });
  },

  discardFilters: () => {
    // 닫기 시 임시값 초기화
    const { appliedCategories, appliedNoiseLevels, appliedRadius } = get();
    set({
      tempCategories: appliedCategories,
      tempNoiseLevels: appliedNoiseLevels,
      tempRadius: appliedRadius,
    });
  },

  triggerReset: () => set((state) => ({ resetTrigger: !state.resetTrigger })),
}));
