import { create } from "zustand";

interface DecibelUIState {
    currentDecibel: number;
    avgDecibel: number;
    maxDecibel: number;

    updateUI: (db: number) => void;
    resetUI: () => void;
}

export const useDecibelUIStore = create<DecibelUIState>((set) => ({
    currentDecibel: 0,
    avgDecibel: 0,
    maxDecibel: 0,

    updateUI: (db) =>
        set((state) => ({
            currentDecibel: db,
            avgDecibel:
                state.avgDecibel === 0 ? db : state.avgDecibel * 0.8 + db * 0.2,
            maxDecibel: Math.max(state.maxDecibel, db),
        })),

    resetUI: () =>
        set({
            currentDecibel: 0,
            avgDecibel: 0,
            maxDecibel: 0,
        }),
}));
