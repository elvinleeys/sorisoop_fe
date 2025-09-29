import FilterBottomSheet from "@/components/filterBottomSheet/FilterBottomSheet";
import { MapHeader } from "@/components/header";
import MapSection from "@/components/map/mapSection/MapSection";
import PlaceDetailSheet from "@/components/placeDetailSheet/PlaceDetailSheet";

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