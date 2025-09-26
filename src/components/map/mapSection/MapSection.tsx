"use client";

import { useEffect, useState } from "react";
import { useCurrentLocation } from "@/hook/useCurrentLocation";
import KakaoMap from "@/components/kakaoMap/KakaoMap";
import { getMarkerImg } from "@/util/getMarkerImg";
import { useFilterDataStore } from "@/store/filter/useFilterDataStore";

interface NoiseData {
  id: string;
  lat: number;
  lng: number;
  avgDecibel: number;
  maxDecibel: number;
  placeName: string;
}

interface NoiseMarker {
  id: string;
  lat: number;
  lng: number;
  avgDecibel?: number | null;
  image?: string;
}

interface MapSectionProps {
  centerLat?: number;
  centerLng?: number;
}

// 반경에 따른 지도 level 결정
const getMapLevel = (radius: number) => {
  if (radius <= 200) return 2; // level 2: 초기 기본 반경
  if (radius <= 300) return 3;
  if (radius <= 500) return 4;
  if (radius <= 1000) return 5;
  return 2; // 그 외 기본값
};

export default function MapSection({ centerLat, centerLng }: MapSectionProps) {
  const { lat: myLat, lng: myLng, error } = useCurrentLocation();
  const [markers, setMarkers] = useState<NoiseMarker[]>([]);
  const [center, setCenter] = 
    useState<{ lat: number; lng: number } | null>(null);
  const [effectiveRadius, setEffectiveRadius] = useState<number>(2);
  const { 
    selectedCategories, 
    selectedNoiseLevels, 
    selectedRadius, 
    applied,
    resetTrigger,
  } = useFilterDataStore();

  // 중심 좌표 결정
  useEffect(() => {
    if (centerLat !== undefined && centerLng !== undefined) {
      setCenter({ lat: centerLat, lng: centerLng });
    } else if (myLat !== null && myLng !== null) {
      setCenter({ lat: myLat, lng: myLng });
    }
  }, [centerLat, centerLng, myLat, myLng]);

  useEffect(() => {
    if (!center) return;
    const controller = new AbortController();

    const store = useFilterDataStore.getState();
    console.log("Fetch store values", store);
    const fetchMarkers = async () => {
      try {
        let url = "";

        if (applied) {
          const params = new URLSearchParams({
            x: String(center.lng),
            y: String(center.lat),
            radius: String(selectedRadius),
          });

          // 카테고리 추가
          selectedCategories.forEach((c) => params.append("categories", c));

          // 소음 레벨 추가
          selectedNoiseLevels.forEach((n) => params.append("noiseLevels", n));

          url = `/api/map/with-measurement?${params.toString()}`;
        } else {
          url = `/api/map?x=${center.lng}&y=${center.lat}&radius=200`;
        }
        console.log("url: ", url);
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("데이터 불러오기 실패");
        const json = await res.json();
        if (!json.success) throw new Error("API 실패");
        console.log("API url:", url);
        console.log("HTTP status:", res.status);
        console.log("API response:", json);

        const formattedMarkers = json.data.map((d: any) => ({
          id: d.id,
          lat: d.lat,
          lng: d.lng,
          avgDecibel: d.avgDecibel ?? null,
          image: getMarkerImg(d.avgDecibel),
        }));
        console.log("Formatted markers:", formattedMarkers);
        setMarkers(formattedMarkers);

        // ✅ 여기서 항상 effectiveRadius를 업데이트
      setEffectiveRadius(applied ? getMapLevel(selectedRadius) : getMapLevel(200));
      } catch (e: any) {
        if (e.name === "AbortError") return;
        console.error("Marker fetch failed:", e);
      }
    };

    fetchMarkers();
    return () => controller.abort();
  }, [center, applied, resetTrigger]);

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
        showMyLocation={!centerLat} // 검색 좌표일 땐 내 위치 점 숨기기
        draggable={true}
        showLocateButton={true}
        onMoveToMyLocation={() => {
          if (myLat !== null && myLng !== null) {
            return { lat: myLat, lng: myLng };
          }
          return null;
        }}
      />
    )
  );
}
