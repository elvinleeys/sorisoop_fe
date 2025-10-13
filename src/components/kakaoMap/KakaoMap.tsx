/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useBottomSheetStore } from "@/store/bottomSheet/useBottomSheetStore";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

interface Marker {
  lat: number;
  lng: number;
  image?: string;
  id?: string;
}

interface KakaoMapProps {
  lat: number;
  lng: number;
  markers?: Marker[];
  height?: string;
  level?: number;

  // 옵션
  draggable?: boolean;
  showMyLocation?: boolean;
  heading?: number;
  showLocateButton?: boolean;

  // 콜백
  onMapClick?: (lat: number, lng: number) => void;
  onMoveToMyLocation?: () => { lat: number; lng: number } | null;
}

export default function KakaoMap({
  lat,
  lng,
  markers = [],
  height = "10rem",
  level = 3,
  draggable = false,
  showMyLocation = false,
  showLocateButton = false,
  onMapClick,
  onMoveToMyLocation,
}: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Window['kakao']['maps']['Map'] | null>(null);
  const myMarker = useRef<Window['kakao']['maps']['Marker'] | null>(null);
  const pathname = usePathname();
  const openSheet = useBottomSheetStore((s) => s.openSheet);
  const [isMapReady, setIsMapReady] = useState(false);

  /** level별 marker size 결정 */
  const getMarkerSize = (level: number) => {
    switch (level) {
      case 1: return 32;
      case 2: return 28;
      case 3: return 24;
      case 4: return 20;
      case 5: return 16;
      default: return 24;
    }
  };

  /** 지도 초기화 */
  const initMap = useCallback(() => {
    if (!mapRef.current || !window.kakao?.maps) return;

    if (mapInstance.current) {
      setIsMapReady(true);
      return;
    }

    window.kakao.maps.load(() => {
      const map = new window.kakao.maps.Map(mapRef.current!, {
        center: new window.kakao.maps.LatLng(lat, lng),
        level,
        draggable,
      });

      mapInstance.current = map;

      // 지도 클릭 이벤트
      if (onMapClick) {
        window.kakao.maps.event.addListener(map, "click", (e: any) => {
          const latlng = e.latLng;
          onMapClick(latlng.getLat(), latlng.getLng());
        });
      }

      setIsMapReady(true);
    });
  }, [lat, lng, level, draggable, onMapClick]);

  /** 지도 업데이트 */
  const updateMap = useCallback(() => {
    const map = mapInstance.current;
    if (!map || !window.kakao || !isMapReady) return;

    // 중심 이동 & 레벨
    map.setCenter(new window.kakao.maps.LatLng(lat, lng));
    map.setLevel(level);

    const markerSize = getMarkerSize(level);

    // 기존 마커 제거
    (map.markers || []).forEach((m: any) => m.setMap(null));

    // 새로운 마커 추가
    const newMarkers = markers.map((m) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(m.lat, m.lng),
        image: m.image
          ? new window.kakao.maps.MarkerImage(
              m.image,
              new window.kakao.maps.Size(markerSize, markerSize)
            )
          : undefined,
      });
      marker.setMap(map);

      // 클릭 이벤트
      if (pathname === "/map" && m.id) {
        window.kakao.maps.event.addListener(marker, "click", () => {
          openSheet({ id: m.id!, lat: m.lat, lng: m.lng, avgDecibel: null });
        });
      }

      return { marker, src: m.image };
    });

    map.markers = newMarkers.map((m: any) => m.marker);

    /** zoom 변경 시 마커 크기 동적 조정 */
    window.kakao.maps.event.addListener(map, "zoom_changed", () => {
      const newLevel = map.getLevel();
      const newSize = getMarkerSize(newLevel);

      newMarkers.forEach((m: any) => {
        if (m.src) {
          const newImg = new window.kakao.maps.MarkerImage(
            m.src,
            new window.kakao.maps.Size(newSize, newSize)
          );
          m.marker.setImage(newImg);
        }
      });
    });

    // 내 위치 마커
    if (showMyLocation) {
      const icon = new window.kakao.maps.MarkerImage(
        "/icons/my-location-arrow.svg",
        new window.kakao.maps.Size(18, 18),
        { anchor: new window.kakao.maps.Point(12, 12) }
      );

      if (!myMarker.current) {
        myMarker.current = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(lat, lng),
          image: icon,
          zIndex: 9999,
        });
        myMarker.current.setMap(map);
      } else {
        myMarker.current.setPosition(new window.kakao.maps.LatLng(lat, lng));
        myMarker.current.setImage(icon);
      }
    }
  }, [lat, lng, level, markers, pathname, openSheet, showMyLocation, isMapReady]);

  /** props 변경 시 지도 갱신 */
  useEffect(() => {
    if (!window.kakao?.maps) return;
    if (!mapInstance.current) {
      initMap();  // 첫 로드시만 initMap을 호출
    } else {
      updateMap(); // 이후에는 updateMap만 호출
    }
  }, [lat, lng, markers, level, isMapReady, initMap, updateMap]);

  return (
    <div ref={mapRef} style={{ position: "relative", width: "100%", height, overflow: "hidden" }}>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services&autoload=false`}
        onLoad={initMap}
        fetchPriority="high"
      />
      {showLocateButton && onMoveToMyLocation && (
        <button
          className="absolute bottom-2 right-2 bg-white shadow-md rounded-full p-2 z-[10]"
          onClick={onMoveToMyLocation}
        >
          <Image src="/icons/locate-ico.svg" alt="내 위치로 이동" width={24} height={24} priority/>
        </button>
      )}
    </div>
  );
}
