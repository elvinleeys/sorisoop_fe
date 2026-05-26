import { create } from "zustand";

interface ExploreLocationState {
    lat: number | null;
    lng: number | null;

    setCurrentLocation: (lat: number, lng: number) => void;
}

export const useExploreLocationStore = create<ExploreLocationState>((set) => ({
    lat: null,
    lng: null,

    setCurrentLocation: (lat, lng) => set({ lat, lng }),
}));
