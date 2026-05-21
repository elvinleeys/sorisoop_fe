import { create } from "zustand";

export type MeasurementStatus =
    | "idle"
    | "preparing"
    | "measuring"
    | "readyToSave";

interface MeasurementSessionState {
    // 상태
    status: MeasurementStatus;
    startedAt: Date | null;

    // 측정 데이터
    currentDecibel: number;
    avgDecibel: number;
    maxDecibel: number;
    history: number[];

    // 액션
    startMeasurement: () => void;
    startPreparing: () => void;
    updateMeasurement: (db: number) => void;
    readyToSave: () => void;
    resetMeasurement: () => void;
}

export const useMeasurementSessionStore = create<MeasurementSessionState>(
    (set) => ({
        status: "idle",
        startedAt: null,

        currentDecibel: 0,
        avgDecibel: 0,
        maxDecibel: 0,
        history: [],

        startMeasurement: () =>
            set({
                status: "measuring",
                startedAt: new Date(),

                currentDecibel: 0,
                avgDecibel: 0,
                maxDecibel: 0,
                history: [],
            }),

        startPreparing: () =>
            set({
                status: "preparing",
            }),

        updateMeasurement: (db) =>
            set((state) => ({
                currentDecibel: db,

                avgDecibel:
                    state.avgDecibel === 0
                        ? db
                        : state.avgDecibel * 0.8 + db * 0.2,

                maxDecibel: Math.max(state.maxDecibel, db),

                history: [...state.history, db],
            })),

        readyToSave: () =>
            set({
                status: "readyToSave",
            }),

        resetMeasurement: () =>
            set({
                status: "idle",
                startedAt: null,

                currentDecibel: 0,
                avgDecibel: 0,
                maxDecibel: 0,
                history: [],
            }),
    }),
);
