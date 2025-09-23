import { create } from "zustand";

interface MapLocationState {
  lat: number | null;
  lng: number | null;
  setLocation: (lat: number, lng: number) => void;
  clearLocation: () => void;
}

export const useMapLocationStore = create<MapLocationState>((set) => ({
  lat: null,
  lng: null,
  setLocation: (lat, lng) => set({ lat, lng }),
  clearLocation: () => set({ lat: null, lng: null }),
}));