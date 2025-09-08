import { create } from "zustand";

interface LocationState {
  placeName: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface LocationStoreState {
  location: LocationState;
  setLocation: (location: Partial<LocationState>) => void;
}

export const useLocationStore = create<LocationStoreState>((set) => ({
  location: {
    placeName: "위치 검색 중...",
    latitude: null,
    longitude: null,
  },
  setLocation: (location) =>
    set((state) => ({ location: { ...state.location, ...location } })),
}));
