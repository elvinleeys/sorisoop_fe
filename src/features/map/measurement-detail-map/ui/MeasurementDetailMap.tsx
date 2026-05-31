"use client";

import KakaoMap from "@/widget/kakaoMap/KakaoMap";
import { getMarkerImg } from "@/util/getDecibelLevel";

interface SaveDetailMapProps {
    avgDecibel: number;
    lat: number;
    lng: number;
}

export default function SaveDetailMap({
    avgDecibel,
    lat,
    lng,
}: SaveDetailMapProps) {
    const imgSrc = getMarkerImg(avgDecibel);

    const markers = [
        {
            id: "save-detail-marker",
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
                markers={markers}
                level={1}
                mode="readonly"
            />
        </section>
    );
}
