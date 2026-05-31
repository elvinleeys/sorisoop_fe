import { MapHeader } from "@/components/header";
import ExploreMap from "@/features/map/explore/ui/ExploreMap";
import { FilterBottomSheet, PlaceDetailSheet } from "@/app/DynamicImport";

export default function MapPage() {
    return (
        <>
            <MapHeader />
            <main>
                <ExploreMap />
            </main>
            <FilterBottomSheet />
            <PlaceDetailSheet />
        </>
    );
}
