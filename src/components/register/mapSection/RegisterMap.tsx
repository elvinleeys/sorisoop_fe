"use client";

import KakaoMap from "@/components/kakaoMap/KakaoMap";
import { useLocationStore } from "@/store/measurement/locationStore";
import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { getMarkerImg } from "@/util/getDecibelLevel";

export default function RegisterMap() {
    const { avgDecibel } = useMeasurementStore();
    const { location } = useLocationStore();
    // GeoJSON coordinates: [longitude, latitude]
    const coordinates = location.location?.coordinates;
    const lat = coordinates?.[1];
    const lng = coordinates?.[0];

    const imgSrc = getMarkerImg(avgDecibel);
    const marker = lat && lng
    ? [{ lat, lng, image: imgSrc }]
    : [];

    return (
        <section className="mb-[0.875rem]">
            <KakaoMap
                lat={lat!}
                lng={lng!}
                markers={marker}
                level={1}
                draggable={true}
                onMapClick={async (clickedLat, clickedLng) => {
                    try {
                    const res = await fetch(`/api/location?x=${clickedLng}&y=${clickedLat}`);
                    const data = await res.json();

                    if (!res.ok) throw new Error(data.error || "장소 정보 가져오기 실패");

                        // store 업데이트
                        useLocationStore.getState().setLocation(data);
                    } catch (err) {
                        console.error("장소 업데이트 실패:", err);
                    }
                }}
            />
        </section>
    );
}
