// zustand/index.ts (또는 zustand 스토어 파일)
import { create } from "zustand";

type MeasurementStatus = "idle" | "measuring";

interface LocationState {
  placeName: string | null;
  latitude: number | null;
  longitude: number | null;
}

// 하나의 인터페이스로 측정 및 위치 상태를 모두 관리
interface MeasurementStoreState {
  // 측정 관련 상태
  status: MeasurementStatus;
  startedAt: Date | null;
  setStatus: (status: MeasurementStatus) => void;
  startMeasurement: () => void;
  cancelMeasurement: () => void;

  // 위치 관련 상태
  location: LocationState;
  setLocation: (location: LocationState) => void;
}

export const useMeasurementStore = create<MeasurementStoreState>((set) => ({
  // 측정 관련 초기 상태
  status: "idle",
  startedAt: null,
  
  // 위치 관련 초기 상태
  location: {
    placeName: "위치 검색 중...",
    latitude: null,
    longitude: null,
  },

  // 측정 관련 함수
  setStatus: (status) => set({ status }),
  startMeasurement: () =>
    set({
      status: "measuring",
      startedAt: new Date(),
    }),
  cancelMeasurement: () =>
    set({
      status: "idle",
      startedAt: null,
    }),

  // 위치 관련 함수
  setLocation: (location) => set({ location }),
}));