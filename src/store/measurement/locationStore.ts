import { create } from "zustand";

type CategoryCode = "CT1" | "AT4" | "FD6" | "CE7" | "";
type CategoryName = "문화시설" | "관광명소" | "음식점" | "카페" | "";

interface GeoPoint {
  type: "Point";
  coordinates: [number, number] | null;
}

interface LocationState {
  kakaoPlaceId: string | null;
  placeName: string | null;
  location: GeoPoint;
  categoryCode: CategoryCode | null;
  categoryName: CategoryName | null;
}

interface LocationStoreState {
  location: LocationState;
  setLocation: (location: Partial<LocationState>) => void;
}

export const useLocationStore = create<LocationStoreState>((set) => ({
  location: {
    kakaoPlaceId: null,
    placeName: "위치 검색 중...",
    location: { type: "Point", coordinates: null },
    categoryCode: null,
    categoryName: null,
  },
  setLocation: (newLocation) =>
    set((state) => ({
      location: {
        ...state.location,
        ...newLocation,
        location: {
          type: "Point",
          coordinates: newLocation.location?.coordinates ?? state.location.location.coordinates,
        },
      },
    })),
}));