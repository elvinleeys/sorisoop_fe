"use client";

import KakaoMap from "@/components/kakaoMap/KakaoMap";
import { useLocationStore } from "@/store/measurement/locationStore";
import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const getDecibelImg = (db: number) => {
    if (db <= 70) return "/icons/quiet.svg";
    if (db > 70 && db < 100) return "/icons/moderate.svg";
    return "/icons/loud.svg";
};

export default function RegisterMap() {
    const router = useRouter();
    const { avgDecibel } = useMeasurementStore();
    const { location } = useLocationStore();
    // GeoJSON coordinates: [longitude, latitude]
    const coordinates = location.location?.coordinates;
    const lat = coordinates?.[1];
    const lng = coordinates?.[0];

    // ✅ 위치 정보 없으면 redirect
    useEffect(() => {
        if (!lat || !lng) {
            router.replace("/"); // 원래 측정 페이지
        }
    }, [lat, lng, router]);

    if (!lat || !lng) {
        return null; // redirect 중이므로 UI 렌더링 방지
    }

    const imgSrc = getDecibelImg(avgDecibel);
    const marker = lat && lng
    ? [{ lat, lng, image: imgSrc }]
    : [];

    return (
        <section className="mb-[0.875rem]">
            <KakaoMap
                lat={lat}
                lng={lng}
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
