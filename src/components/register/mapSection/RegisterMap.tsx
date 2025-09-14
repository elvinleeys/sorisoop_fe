"use client";

import KakaoMap from "@/components/kakaoMap/KakaoMap";
import { useLocationStore } from "@/store/measurement/locationStore";
import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const getDecibelImg = (db: number) => {
    if (db <= 70) return "icons/quiet.svg";
    if (db > 70 && db < 100) return "icons/moderate.svg";
    return "icons/loud.svg";
};

export default function RegisterMap() {
    const router = useRouter();
    const { avgDecibel } = useMeasurementStore();
    const { location } = useLocationStore();
    const { latitude: lat, longitude: lng } = location || {};

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
    const marker = [{ lat, lng, image: imgSrc }];

    return (
        <section className="mb-[0.875rem]">
            <KakaoMap lat={lat} lng={lng} markers={marker} />
        </section>
    );
}
