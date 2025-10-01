"use client";

import { useEffect, useState } from "react";
import { useCurrentLocation } from "@/hook/useCurrentLocation";
import KakaoMap from "@/components/kakaoMap/KakaoMap";
import { useFilterDataStore } from "@/store/filter/useFilterDataStore";
import { useMapLocationStore } from "@/store/map/useMapLocationStore";
import { getMarkerImg } from "@/util/getDecibelLevel";
import { fetchNoiseMarkers } from "@/services/map/fetchNoiseMarker";

interface NoiseMarker {
  id: string;
  lat: number;
  lng: number;
  avgDecibel?: number | null;
  image?: string;
}

// 반경에 따른 지도 level 결정
const getMapLevel = (radius: number) => {
  if (radius <= 200) return 2; // level 2: 초기 기본 반경
  if (radius <= 300) return 3;
  if (radius <= 500) return 4;
  if (radius <= 1000) return 5;
  return 2; // 그 외 기본값
};

export default function MapSection() {
  const { lat: myLat, lng: myLng, error } = useCurrentLocation();
  const { lat: storeLat, lng: storeLng, clearLocation } = useMapLocationStore();
  const [markers, setMarkers] = useState<NoiseMarker[]>([]);
  const [center, setCenter] = 
    useState<{ lat: number; lng: number } | null>(null);
  const [effectiveRadius, setEffectiveRadius] = useState<number>(2);
  const {
    appliedCategories,
    appliedNoiseLevels,
    appliedRadius,
    resetTrigger,
  } = useFilterDataStore();

  // 중심 좌표 결정
  // center 결정: store > props > 현재위치
  useEffect(() => {
    if (storeLat != null && storeLng != null) setCenter({ lat: storeLat, lng: storeLng });
    else if (myLat != null && myLng != null) setCenter({ lat: myLat, lng: myLng });
  }, [storeLat, storeLng, myLat, myLng]);

  // 마커 데이터 fetch
  useEffect(() => {
    if (!center) return;
    const controller = new AbortController();

    const fetchMarkers = async () => {
      try {
        const data = await fetchNoiseMarkers({
          center,
          radius: appliedRadius,
          categories: appliedCategories,
          noiseLevels: appliedNoiseLevels,
          signal: controller.signal,
        });

        // avgDecibel → marker image 매핑
        const mapped = data.map((d) => ({
          ...d,
          image: getMarkerImg(d.avgDecibel ?? null),
        }));

        setMarkers(mapped);
        setEffectiveRadius(getMapLevel(appliedRadius));
      } catch (e: unknown) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        if (e instanceof Error) {
          console.error("Marker fetch failed:", e.message);
        } else {
          console.error("Marker fetch failed:", e);
        }
      }
    };

    fetchMarkers();
    return () => controller.abort();
  }, [center, appliedCategories, appliedNoiseLevels, appliedRadius, resetTrigger]);

  if (error) return <div>위치 오류: {error}</div>;
  if (!center) return <div>위치 불러오는 중...</div>;

  console.log("Passing markers to KakaoMap:", markers);

  return (
    center && (
      <KakaoMap
        lat={center.lat}
        lng={center.lng}
        markers={markers}
        height="40.45rem"
        level={effectiveRadius}
        showMyLocation={!(storeLat && storeLng)} // 검색 좌표일 땐 내 위치 점 숨기기
        draggable={true}
        showLocateButton={true}
        onMoveToMyLocation={() => {
          if (myLat !== null && myLng !== null) {
            setCenter({ lat: myLat, lng: myLng });
            clearLocation();
            return { lat: myLat, lng: myLng };
          }
          return null;
        }}
      />
    )
  );
}
