import { create } from "zustand";

interface BottomSheetState {
  isOpen: boolean;
  selectedMarker: { id: string; lat: number; lng: number; avgDecibel?: number | null } | null;
  openSheet: (marker: BottomSheetState["selectedMarker"]) => void;
  closeSheet: () => void;
}

export const useBottomSheetStore = create<BottomSheetState>((set) => ({
  isOpen: false,
  selectedMarker: null,
  openSheet: (marker) => set({ isOpen: true, selectedMarker: marker }),
  closeSheet: () => set({ isOpen: false, selectedMarker: null }),
}));