"use client";

import { useCurrentLocation } from "@/hook/useCurrentLocation";
import KakaoMap from "@/components/kakaoMap/KakaoMap";
import { useFilterDataStore } from "@/store/filter/useFilterDataStore";
import { useMapLocationStore } from "@/store/map/useMapLocationStore";
import { getMarkerImg } from "@/util/getDecibelLevel";
import { fetchNoiseMarkers } from "@/services/map/fetchNoiseMarker";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading/Loading";

interface NoiseMarker {
  id: string;
  lat: number;
  lng: number;
  avgDecibel?: number | null;
  image?: string;
}

// 반경에 따른 지도 level 결정
const getMapLevel = (radius?: number | null) => {
  if (!radius) return 2; 
  if (radius <= 200) return 2; // level 2: 초기 기본 반경
  if (radius <= 300) return 3;
  if (radius <= 500) return 4;
  if (radius <= 1000) return 5;
  return 2; // 그 외 기본값
};

export default function MapSection() {
  const { lat: myLat, lng: myLng, error } = useCurrentLocation();
  const { lat: storeLat, lng: storeLng, clearLocation } = useMapLocationStore();
  
  const {
    appliedCategories,
    appliedNoiseLevels,
    appliedRadius,
    resetTrigger,
  } = useFilterDataStore();

  // 중심 좌표 결정
  // ✅ center를 로컬 상태로 두지 않고, 조건에 따라 바로 계산
  const center = storeLat && storeLng
    ? { lat: storeLat, lng: storeLng }
    : myLat && myLng
    ? { lat: myLat, lng: myLng }
    : null;

  // 마커 데이터 fetch
  const { data, isLoading, isError } = useQuery<NoiseMarker[]>({
    queryKey: [
      "noiseMarkers",
      center,
      appliedCategories,
      appliedNoiseLevels,
      appliedRadius ?? 200,
      resetTrigger,
    ],
    queryFn: async ({ signal }) => {
      if (!center) return [];
      const data = await fetchNoiseMarkers({
        center,
        radius: appliedRadius,
        categories: appliedCategories,
        noiseLevels: appliedNoiseLevels,
        signal,
      });
      return data.map((d) => ({
        ...d,
        image: getMarkerImg(d.avgDecibel ?? null),
      }));
    },
    enabled: !!center,
  });

  const markers: NoiseMarker[] = data ?? [];

  // effectiveRadius 갱신
  // (이건 state로 두되 useEffect 대신 직접 계산해도 OK)
  const mapLevel = getMapLevel(appliedRadius);

  if (error) return <div>위치 오류: {error}</div>;
  if (!center) return <Loading text="내 위치 불러오는 중..." />;
  if (isLoading) return <Loading text="마커 불러오는 중..." />;
  if (isError) return <div>마커 불러오기 실패</div>;

  console.log("Passing markers to KakaoMap:", markers);

  return (
    center && (
      <KakaoMap
        lat={center.lat}
        lng={center.lng}
        markers={markers}
        height="40.45rem"
        level={mapLevel}
        showMyLocation={!(storeLat && storeLng)} // 검색 좌표일 땐 내 위치 점 숨기기
        draggable={true}
        showLocateButton={true}
        onMoveToMyLocation={() => {
          if (myLat && myLng) {
            clearLocation(); // ✅ 다시 내 위치 모드로
            return { lat: myLat, lng: myLng };
          }
          return null;
        }}
      />
    )
  );
}
