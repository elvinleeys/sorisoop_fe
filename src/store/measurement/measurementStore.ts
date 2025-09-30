import { create } from "zustand";

// 상태 타입
export type MeasurementStatus = "idle" | "measuring" | "finished";

interface MeasurementStoreState {
  status: MeasurementStatus;
  startedAt: Date | null;

  decibelHistory: number[];
  currentDecibel: number;
  maxDecibel: number;
  avgDecibel: number;

  startMeasurement: () => void;
  addDecibel: (decibel: number) => void;
  setCurrentDecibel: (decibel: number) => void;
  cancelMeasurement: () => void;
  setStatus: (status: MeasurementStatus) => void;
}

export const useMeasurementStore = create<MeasurementStoreState>((set) => ({
  status: "idle",
  startedAt: null,
  decibelHistory: [],
  currentDecibel: 0,
  maxDecibel: 0,
  avgDecibel: 0,

  startMeasurement: () =>
    set({
      status: "measuring",
      startedAt: new Date(),
      decibelHistory: [],
      currentDecibel: 0,
      maxDecibel: 0,
      avgDecibel: 0,
    }),

  addDecibel: (decibel) =>
    set((state) => {
      const history = [...state.decibelHistory, decibel];
      const maxDecibel = Math.max(...history);
      // 이동 평균 적용
      const alpha = 0.2;
      const avgDecibel =
        state.avgDecibel === 0
          ? decibel
          : alpha * decibel + (1 - alpha) * state.avgDecibel;

      return { decibelHistory: history, maxDecibel, avgDecibel };
    }),

  setCurrentDecibel: (decibel) => set({ currentDecibel: decibel }),

  cancelMeasurement: () =>
    set({
      status: "idle",
      startedAt: null,
      decibelHistory: [],
      currentDecibel: 0,
      maxDecibel: 0,
      avgDecibel: 0,
    }),

    setStatus: (status) => set({ status }),
}));
