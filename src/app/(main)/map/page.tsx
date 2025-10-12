import { MapHeader } from "@/components/header";
import MapSection from "@/components/map/mapSection/MapSection";
import { FilterBottomSheet, PlaceDetailSheet } from "@/app/DynamicImport";

export default function MapPage() {

    return (
        <>
            <MapHeader />
            <main>
                <MapSection />
            </main>
            <FilterBottomSheet />
            <PlaceDetailSheet />
        </>
    );
}