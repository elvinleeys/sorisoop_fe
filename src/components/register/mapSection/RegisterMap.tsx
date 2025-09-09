"use client";

import KakaoMap from "@/components/kakaoMap/KakaoMap";
import { useLocationStore } from "@/store/measurement/locationStore";
import { useMeasurementStore } from "@/store/measurement/measurementStore";

const getDecibelImg = (db: number) => {
    if (db <= 70) return "icons/quiet.svg";
    if (db > 70 && db < 100) return "icons/moderate.svg";
    if (db >= 100) return "icons/loud.svg";
    return "icons/default.svg";
};

export default function RegisterMap() {
    const { avgDecibel } = useMeasurementStore();
    const { location } = useLocationStore();
    const { latitude: lat, longitude: lng } = location;

    if (lat === null || lng === null) return <p>위치 정보를 불러오는 중...</p>;

    const imgSrc = getDecibelImg(avgDecibel);
    const marker = [{ lat, lng, image: imgSrc }];

    return (
        <section className="mb-[0.875rem]">
            <KakaoMap lat={lat} lng={lng} markers={marker} />
        </section>
    );
}
