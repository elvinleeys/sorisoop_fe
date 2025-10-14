"use client";

import dynamic from "next/dynamic";

export const ToastContainer = dynamic(
  () => import("@/components/toast/ToastContainer"),
  { ssr: false }
);

export const UnifiedModalRenderer = dynamic(
  () => import("@/components/modal/UnifiedModalRenderer"),
  { ssr: false }
);

export const FilterBottomSheet = dynamic(
  () => import("@/components/filterBottomSheet/FilterBottomSheet"), 
  { ssr: false }
);

export const PlaceDetailSheet = dynamic(
  () => import("@/components/placeDetailSheet/PlaceDetailSheet"), 
  { ssr: false }
);

export const SideBar = dynamic(
  () => import("@/components/sideBar/SideBar"), 
  {
    ssr: false,
  }
);