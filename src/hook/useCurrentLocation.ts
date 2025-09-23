import { useEffect, useState } from "react";

interface LocationState {
    lat: number | null;
    lng: number | null;
    error: string | null;
}

export function useCurrentLocation() {
    const [location, setLocation] = useState<LocationState>({
        lat: null,
        lng: null,
        error: null,
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocation((prev) => ({ ...prev, error: "위치 정보 미지원 브라우저" }));
            return;
        }

        const options: PositionOptions = {
            enableHighAccuracy: true, // GPS를 활용하여 정확도 향상
            timeout: 10000,           // 10초 내에 위치를 못 가져오면 에러
            maximumAge: 0,            // 캐시된 위치 사용하지 않음
        };

        navigator.geolocation.getCurrentPosition(
            (pos) =>
                setLocation({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
                error: null,
                }),
            (err) => setLocation((prev) => ({ ...prev, error: err.message })),
            options
        );
    }, []);

    return location;
}