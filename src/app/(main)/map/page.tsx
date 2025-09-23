"use client";

import FilterBottomSheet from "@/components/filterBottomSheet/FilterBottomSheet";
import { MapHeader } from "@/components/header";
import MapSection from "@/components/map/mapSection/MapSection";
import { useMapLocationStore } from "@/store/map/useMapLocationStore";

export default function MapPage() {
    const { lat, lng } = useMapLocationStore();

    return (
        <>
            <MapHeader />
            <main>
                <MapSection centerLat={lat ?? undefined} centerLng={lng ?? undefined} />
            </main>
            <FilterBottomSheet />
        </>
    );
}