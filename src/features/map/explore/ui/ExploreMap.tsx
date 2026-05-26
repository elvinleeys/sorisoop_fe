"use client";

import { useMemo, useState } from "react";

import KakaoMap from "@/widget/kakaoMap/KakaoMap";

import LocateButton from "./LocateButton";

import { useExploreLocation } from "../hooks/useExploreLocation";
import { useExploreMarkers } from "../hooks/useExploreMarkers";

import { getMapLevel } from "../model/mapLevel";

import { useMapLocationStore } from "@/store/map/useMapLocationStore";

import { useBottomSheetStore } from "@/store/bottomSheet/useBottomSheetStore";
import Loading from "@/features/loading/ui/Loading";
import { Bounds } from "@/shared/types/kakaoMap";
import { useFilterDataStore } from "@/store/filter/useFilterDataStore";
import { useExploreLocationStore } from "../model/store/exploreLocationStore";

export default function ExploreMap() {
    useExploreLocation();
    const { lat: currentLat, lng: currentLng } = useExploreLocationStore();
    const {
        lat: storeLat,
        lng: storeLng,
        clearLocation,
    } = useMapLocationStore();

    const openSheet = useBottomSheetStore((s) => s.openSheet);
    const appliedRadius = useFilterDataStore((s) => s.appliedRadius);
    const [map, setMap] = useState<kakao.maps.Map | null>(null);
    const [bounds, setBounds] = useState<Bounds | null>(null);

    /**
     * ✅ 1. initialCenter → useEffect 제거 (derived state)
     */
    const initialCenter = useMemo(() => {
        return (
            (storeLat && storeLng && { lat: storeLat, lng: storeLng }) ||
            (currentLat &&
                currentLng && { lat: currentLat, lng: currentLng }) || {
                lat: 37.5665,
                lng: 126.978,
            } // 서울 fallback
        );
    }, [storeLat, storeLng, currentLat, currentLng]);

    /**
     * marker query
     */
    const { markers, isFetching, isError } = useExploreMarkers({
        bounds,
    });

    const mapLevel = getMapLevel(appliedRadius);

    if (isError) {
        return <div>마커 불러오기 실패</div>;
    }

    const isSkeletonVisible = isFetching && markers.length === 0;

    return (
        <div className="relative">
            <KakaoMap
                lat={initialCenter.lat}
                lng={initialCenter.lng}
                level={mapLevel}
                markers={markers}
                mode="explore"
                onMapReady={setMap}
                onBoundsChange={setBounds}
                onMarkerClick={(m) => {
                    if (!m.id) return;

                    openSheet({
                        id: m.id,
                        lat: m.lat,
                        lng: m.lng,
                        avgDecibel: null,
                    });
                }}
            />
            {isSkeletonVisible && (
                <div className="absolute inset-0 z-10">
                    <Loading
                        messages={[
                            "주변 소음 데이터를 불러오는 중...",
                            "마커 정보를 계산하는 중...",
                            "거의 완료됐어요!",
                        ]}
                    />
                </div>
            )}
            <LocateButton
                onClick={() => {
                    if (!map || !currentLat || !currentLng) return;

                    clearLocation();

                    map.panTo(new kakao.maps.LatLng(currentLat, currentLng));
                }}
            />
        </div>
    );
}
