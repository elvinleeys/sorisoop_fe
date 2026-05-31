import { useEffect } from "react";
import { useExploreLocationStore } from "../model/store/exploreLocationStore";

const GEO_OPTIONS: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 1000 * 10,
};

export function useExploreLocation() {
    const setCurrentLocation = useExploreLocationStore(
        (s) => s.setCurrentLocation,
    );

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                setCurrentLocation(pos.coords.latitude, pos.coords.longitude);
            },
            (err) => {
                console.error(err);
            },
            GEO_OPTIONS,
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, [setCurrentLocation]);
}
