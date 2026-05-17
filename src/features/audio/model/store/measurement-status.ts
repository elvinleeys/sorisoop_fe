import { create } from "zustand";

export type MeasurementStatus = "idle" | "measuring" | "readyToSave";

interface MeasurementStatusState {
    status: MeasurementStatus;
    startedAt: Date | null;

    startMeasurement: () => void;
    readyToSave: () => void;
    cancelMeasurement: () => void;
}

export const useMeasurementStatusStore = create<MeasurementStatusState>(
    (set) => ({
        status: "idle",
        startedAt: null,

        startMeasurement: () =>
            set({
                status: "measuring",
                startedAt: new Date(),
            }),

        readyToSave: () =>
            set({
                status: "readyToSave",
            }),

        cancelMeasurement: () =>
            set({
                status: "idle",
                startedAt: null,
            }),
    }),
);
