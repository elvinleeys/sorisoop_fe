"use client";

import { useEffect, useState } from "react";

import KakaoMap from "@/widget/kakaoMap/KakaoMap";

import LocateButton from "./LocateButton";

import { useExploreLocation } from "../hooks/useExploreLocation";
import { useExploreMarkers } from "../hooks/useExploreMarkers";

import { getMapLevel } from "../model/mapLevel";

import { useMapLocationStore } from "@/store/map/useMapLocationStore";

import { useBottomSheetStore } from "@/store/bottomSheet/useBottomSheetStore";
import Loading from "@/features/loading/ui/Loading";

export default function ExploreMap() {
    const { myLocation } = useExploreLocation();

    const {
        lat: storeLat,
        lng: storeLng,
        clearLocation,
    } = useMapLocationStore();

    const openSheet = useBottomSheetStore((s) => s.openSheet);

    const [map, setMap] = useState<kakao.maps.Map | null>(null);
    const [initialCenter, setInitialCenter] = useState<{
        lat: number;
        lng: number;
    } | null>(null);

    /**
     * center
     */
    useEffect(() => {
        if (initialCenter) return;

        if (storeLat && storeLng) {
            setInitialCenter({
                lat: storeLat,
                lng: storeLng,
            });
            return;
        }

        if (myLocation) {
            setInitialCenter({
                lat: myLocation.lat,
                lng: myLocation.lng,
            });
        }
    }, [storeLat, storeLng, myLocation, initialCenter]);

    /**
     * marker query
     */
    const { markers, appliedRadius, isLoading, isFetching, isError } =
        useExploreMarkers({
            center: initialCenter,
        });

    const mapLevel = getMapLevel(appliedRadius);

    /**
     * loading
     */
    if (!initialCenter) {
        return (
            <Loading
                messages={[
                    "현재 위치를 확인하는 중...",
                    "GPS 정보를 불러오는 중...",
                    "지도를 준비하는 중...",
                    "거의 완료됐어요!",
                ]}
            />
        );
    }

    if (isLoading) {
        return (
            <Loading
                isDone={!isFetching}
                messages={[
                    "주변 소음 데이터를 불러오는 중...",
                    "마커 정보를 계산하는 중...",
                    "지도를 렌더링하는 중...",
                    "거의 완료됐어요!",
                ]}
            />
        );
    }

    if (isError) {
        return <div>마커 불러오기 실패</div>;
    }

    return (
        <div className="relative">
            <KakaoMap
                lat={initialCenter.lat}
                lng={initialCenter.lng}
                level={mapLevel}
                markers={markers}
                mode="explore"
                onMapReady={setMap}
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

            <LocateButton
                onClick={() => {
                    if (!map || !myLocation) return;

                    clearLocation();

                    map.panTo(
                        new kakao.maps.LatLng(myLocation.lat, myLocation.lng),
                    );
                }}
            />
        </div>
    );
}
