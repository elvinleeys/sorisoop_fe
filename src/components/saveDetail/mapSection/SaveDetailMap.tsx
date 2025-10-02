"use client";

import KakaoMap from "@/components/kakaoMap/KakaoMap";
import { getMarkerImg } from "@/util/getDecibelLevel";

interface SaveDetailMapProps {
  avgDecibel: number;
  lat: number;
  lng: number;
}

export default function SaveDetailMap({ avgDecibel, lat, lng }: SaveDetailMapProps) {

    const imgSrc = getMarkerImg(avgDecibel);
    const marker = [{ lat, lng, image: imgSrc }];

    return (
        <section className="mb-[0.875rem]">
            <KakaoMap level={1} lat={lat} lng={lng} markers={marker} draggable={false}/>
        </section>
    );
}