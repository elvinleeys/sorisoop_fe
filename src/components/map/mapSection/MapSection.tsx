"use client";

import { useEffect, useState } from "react";
import { useCurrentLocation } from "@/hook/useCurrentLocation";
import KakaoMap from "@/components/kakaoMap/KakaoMap";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { getMarkerImg } from "@/util/getMarkerImg";

interface NoiseData {
  id: string;
  lat: number;
  lng: number;
  avgDecibel: number;
  maxDecibel: number;
  placeName: string;
}

interface NoiseMarker {
  lat: number;
  lng: number;
  image: string;
}

interface MapSectionProps {
  centerLat?: number;
  centerLng?: number;
}

export default function MapSection({ centerLat, centerLng }: MapSectionProps) {
  const { lat: myLat, lng: myLng, error } = useCurrentLocation();
  const [markers, setMarkers] = useState<NoiseMarker[]>([]);
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null
  );

  // 중심 좌표 결정
  useEffect(() => {
    if (centerLat !== undefined && centerLng !== undefined) {
      setCenter({ lat: centerLat, lng: centerLng });
    } else if (myLat !== null && myLng !== null) {
      setCenter({ lat: myLat, lng: myLng });
    }
  }, [centerLat, centerLng, myLat, myLng]);

  // 중심 좌표가 바뀔 때마다 소음 데이터 fetch
  useEffect(() => {
    if (!center) return;

    const controller = new AbortController();

    const fetchNoiseData = async () => {
      try {
        const data: NoiseData[] = await fetchWrapper(
          `/api/map?x=${center.lng}&y=${center.lat}&radius=50`,
          { signal: controller.signal }
        );

        const formattedMarkers: NoiseMarker[] = data.map((m) => ({
          lat: m.lat,
          lng: m.lng,
          image: getMarkerImg(m.avgDecibel),
        }));

        setMarkers(formattedMarkers);
      } catch (e: any) {
        if (e.name === "AbortError") return; // 요청 취소
        console.error("Noise data fetch failed:", e);
      }
    };

    fetchNoiseData();

    return () => controller.abort();
  }, [center]);

  if (error) return <div>위치 오류: {error}</div>;
  if (!center) return <div>위치 불러오는 중...</div>;

  return (
    <KakaoMap
      lat={center.lat}
      lng={center.lng}
      markers={markers}
      height="40.45rem"
      level={3}
      showMyLocation={!centerLat} // 검색 좌표일 땐 내 위치 점 숨기기
    />
  );
}
