"use client";

import { useEffect, useRef, useState } from "react";
import { createMapController } from "@/shared/lib/kakao/createMapController";
import { createMarkerManager } from "@/shared/lib/kakao/MarkerManager";
import { getCachedMarkerImage } from "@/shared/lib/kakao/markerImageCache";
import { MAP_POLICY } from "@/shared/lib/kakao/mapPolicy";
import { loadKakaoMap } from "@/shared/lib/kakao/loadKakaoMap";
import { getMarkerSize } from "@/shared/lib/kakao/getMarkerSize";
import { Bounds, MapController } from "@/shared/types/kakaoMap";
import { debounce } from "@/shared/lib/map/debounce";
import { normalizeBounds } from "@/shared/lib/map/normalizeBound";

type MapMode = keyof typeof MAP_POLICY;

interface Marker {
    id?: string;
    lat: number;
    lng: number;
    image?: string;
}

interface KakaoMapProps {
    lat: number;
    lng: number;
    markers?: Marker[];
    level?: number;
    mode: MapMode;
    onMarkerClick?: (marker: Marker) => void;
    onBoundsChange?: (bounds: Bounds) => void;
    onMapClick?: (lat: number, lng: number) => void;
    onMapReady?: (map: kakao.maps.Map) => void;
}

export default function KakaoMap({
    lat,
    lng,
    markers = [],
    level,
    onMarkerClick,
    onMapClick,
    onBoundsChange,
    onMapReady,
    mode,
}: KakaoMapProps) {
    const [isMapReady, setIsMapReady] = useState(false);
    const mapRef = useRef<HTMLDivElement>(null);
    const controllerRef = useRef<MapController | null>(null);
    const prevCenterRef = useRef({ lat, lng });
    const markerManagerRef = useRef<ReturnType<
        typeof createMarkerManager
    > | null>(null);
    const debouncedEmitBoundsRef = useRef(
        debounce((map: kakao.maps.Map) => {
            const bounds = map.getBounds();

            const sw = bounds.getSouthWest();
            const ne = bounds.getNorthEast();

            const normalized = normalizeBounds({
                swLat: sw.getLat(),
                swLng: sw.getLng(),
                neLat: ne.getLat(),
                neLng: ne.getLng(),
            });

            onBoundsChange?.(normalized);
        }, 250),
    );

    const policy = MAP_POLICY[mode];

    /**
     * map initialize
     */
    useEffect(() => {
        let mounted = true;

        const initialize = async () => {
            await loadKakaoMap();

            if (!mounted) return;
            if (!mapRef.current || controllerRef.current) return;

            controllerRef.current = createMapController(mapRef.current, {
                lat,
                lng,
                level: level ?? policy.level,
                draggable: policy.draggable,
                zoomable: policy.zoomable,
            });

            const map = controllerRef.current.map;

            if (onMapClick) {
                kakao.maps.event.addListener(
                    map,
                    "click",
                    (mouseEvent: kakao.maps.event.MouseEvent) => {
                        const latlng = mouseEvent.latLng;

                        onMapClick(latlng.getLat(), latlng.getLng());
                    },
                );
            }

            onMapReady?.(map);

            markerManagerRef.current = createMarkerManager(map);

            setIsMapReady(true);
        };

        initialize();

        return () => {
            mounted = false;
        };
    }, []);

    /**
     * map update
     */
    useEffect(() => {
        if (!isMapReady) return;

        const controller = controllerRef.current;
        const markerManager = markerManagerRef.current;

        if (!controller || !markerManager) return;

        if (level) {
            controller.setLevel(level);
        }

        const markerSize = policy.markerResizable
            ? getMarkerSize(level ?? policy.level)
            : 24;

        markerManager.syncMarkers({
            markers,
            markerSize,
            imageCache: getCachedMarkerImage,
            onMarkerClick,
        });
    }, [isMapReady, lat, lng, markers, level, onMarkerClick, policy]);

    useEffect(() => {
        if (!isMapReady) return;

        const map = controllerRef.current?.map;

        if (!map || !onBoundsChange) return;

        const handler = () => {
            debouncedEmitBoundsRef.current(map);
        };

        handler();

        kakao.maps.event.addListener(map, "idle", handler);

        return () => {
            kakao.maps.event.removeListener(map, "idle", handler);
        };
    }, [isMapReady, onBoundsChange]);

    useEffect(() => {
        if (!isMapReady) return;

        const controller = controllerRef.current;

        if (
            prevCenterRef.current.lat !== lat ||
            prevCenterRef.current.lng !== lng
        ) {
            controller?.setCenter(lat, lng);

            prevCenterRef.current = { lat, lng };
        }
    }, [lat, lng, isMapReady]);

    return (
        <div
            ref={mapRef}
            style={{
                width: "100%",
                height: policy.height,
            }}
        />
    );
}
