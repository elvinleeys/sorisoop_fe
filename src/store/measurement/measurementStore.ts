import { create } from "zustand";

// 측정 상태를 세분화하여 버튼 UI 변화를 명확하게 관리합니다.
export type MeasurementStatus = "idle" | "measuring" | "finished";

interface LocationState {
    placeName: string | null;
    latitude: number | null;
    longitude: number | null;
}

// 하나의 인터페이스로 측정, 데시벨 데이터, 위치 상태를 모두 관리합니다.
interface MeasurementStoreState {
    // 측정 관련 상태
    status: MeasurementStatus;
    startedAt: Date | null;
    decibelHistory: number[]; // 측정된 모든 데시벨 데이터를 저장하는 배열
    currentDecibel: number; // 현재 데시벨 상태 추가

    // 위치 관련 상태
    location: LocationState;

    // 액션(상태 변경 함수)들
    setStatus: (status: MeasurementStatus) => void;
    startMeasurement: () => void;
    addDecibel: (decibel: number) => void;
    setCurrentDecibel: (decibel: number) => void; // 현재 데시벨 업데이트 함수 추가
    cancelMeasurement: () => void;
    setLocation: (location: LocationState) => void;
}

export const useMeasurementStore = create<MeasurementStoreState>((set) => ({
    // 초기 상태
    status: "idle",
    startedAt: null,
    decibelHistory: [], // 초기 상태는 빈 배열입니다.
    currentDecibel: 0,
    location: {
        placeName: "위치 검색 중...",
        latitude: null,
        longitude: null,
    },

    // 액션(상태 변경 함수)
    setStatus: (status) => set({ status }),

    startMeasurement: () =>
        set({
            status: "measuring",
            startedAt: new Date(),
            decibelHistory: [], // 새로운 측정을 시작할 때 데시벨 기록을 초기화합니다.
        }),
    
    // 측정된 데시벨 값을 배열에 추가합니다.
    addDecibel: (decibel) =>
        set((state) => ({
            decibelHistory: [...state.decibelHistory, decibel],
        })),
    setCurrentDecibel: (decibel) => set({ currentDecibel: decibel }), // 함수 구현    
    cancelMeasurement: () =>
        set({
            status: "idle",
            startedAt: null,
            decibelHistory: [], // 측정을 취소할 때 기록을 삭제합니다.
            currentDecibel: 0,
        }),

    setLocation: (location) => set({ location }),
}));
