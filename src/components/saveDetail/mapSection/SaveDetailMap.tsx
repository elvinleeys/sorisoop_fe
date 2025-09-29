"use client";

import KakaoMap from "@/components/kakaoMap/KakaoMap";

interface SaveDetailMapProps {
  avgDecibel: number;
  lat: number;
  lng: number;
}

const getDecibelImg = (db: number) => {
    if (db <= 70) return "/icons/quiet.svg";
    if (db > 70 && db < 100) return "/icons/moderate.svg";
    return "/icons/loud.svg";
};

export default function SaveDetailMap({ avgDecibel, lat, lng }: SaveDetailMapProps) {

    const imgSrc = getDecibelImg(avgDecibel);
    const marker = [{ lat, lng, image: imgSrc }];

    return (
        <section className="mb-[0.875rem]">
            <KakaoMap level={1} lat={lat} lng={lng} markers={marker} draggable={false}/>
        </section>
    );
}