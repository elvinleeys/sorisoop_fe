import { create } from "zustand";

interface MeasurementResultState {
    history: number[];

    saveHistory: (history: number[]) => void;

    clearHistory: () => void;
}

export const useMeasurementResultStore = create<MeasurementResultState>(
    (set) => ({
        history: [],

        saveHistory: (history) =>
            set({
                history,
            }),

        clearHistory: () =>
            set({
                history: [],
            }),
    }),
);
