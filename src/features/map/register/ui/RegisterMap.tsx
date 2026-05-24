"use client";

import KakaoMap from "@/widget/kakaoMap/KakaoMap";

import { useLocationStore } from "@/entities/location/model/store/locationStore";

import { useMeasurementSessionStore } from "@/features/measurement/model/store/measurement-session";

import { getMarkerImg } from "@/util/getDecibelLevel";
import { useRegisterLocationUpdate } from "../model/useRegisterLocationUpdate";

export default function RegisterMap() {
    const { avgDecibel } = useMeasurementSessionStore();
    const coordinates = useLocationStore(
        (s) => s.location.location?.coordinates,
    );
    const updateLocation = useRegisterLocationUpdate();

    const lat = coordinates?.[1];
    const lng = coordinates?.[0];

    if (!lat || !lng) return null;

    const imgSrc = getMarkerImg(avgDecibel);

    const marker = [
        {
            id: "register-marker",
            lat,
            lng,
            image: imgSrc,
        },
    ];

    return (
        <section className="mb-[0.875rem]">
            <KakaoMap
                lat={lat}
                lng={lng}
                markers={marker}
                level={1}
                mode="register"
                onMapClick={updateLocation}
            />
        </section>
    );
}
