import { create } from "zustand";

type MeasurementStatus = "idle" | "measuring";

interface MeasurementState {
  status: MeasurementStatus;
  startedAt: Date | null; // 측정 시작 시각 (서버 전송용)
  setStatus: (status: MeasurementStatus) => void;
  startMeasurement: () => void;
  cancelMeasurement: () => void;
}

export const useMeasurementStore = create<MeasurementState>((set) => ({
  status: "idle",
  startedAt: null,
  setStatus: (status) => set({ status }),
  startMeasurement: () =>
    set({
      status: "measuring",
      startedAt: new Date(), // 측정 시작 시각 저장
    }),
  cancelMeasurement: () =>
    set({
      status: "idle",
      startedAt: null,
    }),
}));
