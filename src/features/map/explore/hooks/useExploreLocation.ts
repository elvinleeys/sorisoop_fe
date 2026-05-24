import { useEffect, useState } from "react";

const GEO_OPTIONS: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 1000 * 10,
};

export function useExploreLocation() {
    const [myLocation, setMyLocation] = useState<{
        lat: number;
        lng: number;
    } | null>(null);

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                setMyLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
            },
            (err) => {
                console.error(err);
            },
            GEO_OPTIONS,
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    return {
        myLocation,
    };
}
