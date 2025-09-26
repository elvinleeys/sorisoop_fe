"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import Image from "next/image";
import { useBottomSheetStore } from "@/store/bottomSheet/useBottomSheetStore";

interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  avgDecibel?: number | null;
  image?: string;
}

interface KakaoMapProps {
  lat: number;
  lng: number;
  markers?: MarkerData[];
  showMyLocation?: boolean;
  height?: string;
  level?: number;
  draggable?: boolean;
  showLocateButton?: boolean; // ✅ 추가
  onMoveToMyLocation?: () => { lat: number; lng: number } | null;
}

// level별 마커 크기 설정
const getMarkerSize = (level: number) => {
  if (level <= 2) return new window.kakao.maps.Size(32, 32); // 확대일수록 크게
  if (level === 3) return new window.kakao.maps.Size(24, 24);
  if (level === 4) return new window.kakao.maps.Size(20, 20);
  if (level >= 5) return new window.kakao.maps.Size(18, 18); // 축소일수록 작게
  return new window.kakao.maps.Size(32, 32);
};

export default function KakaoMap({
  lat,
  lng,
  markers = [],
  showMyLocation = false,
  height = "10rem",
  level = 5,
  draggable = false,
  showLocateButton = false,
  onMoveToMyLocation,
}: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapObj = useRef<any>(null);
  const overlayRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const addMarkers = (map: any, markers: MarkerData[]) => {
    // 기존 마커 제거
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];
    console.log("Markers passed to KakaoMap:", markers);

    markers.forEach((m) => {
      const pos = new window.kakao.maps.LatLng(m.lat, m.lng);
      const size = getMarkerSize(level);
      const options: any = { position: pos };
      if (m.image) {
        options.image = new window.kakao.maps.MarkerImage(
          m.image,
          new window.kakao.maps.Size(size, size)
        );
      }
      const marker = new window.kakao.maps.Marker(options);

      // ✅ 클릭 이벤트 연결
      window.kakao.maps.event.addListener(marker, "click", () => {
        useBottomSheetStore.getState().openSheet(m); 
      });

      marker.setMap(map);
      markersRef.current.push(marker);
    });
  };

  const initMap = () => {
    if (!mapRef.current || !window.kakao) return;
    if (!lat || !lng) return;

    const center = new window.kakao.maps.LatLng(lat, lng);
    const map = new window.kakao.maps.Map(mapRef.current, {
      center,
      level,
      scrollwheel: false,
      draggable: draggable, // 생성 시 바로 적용
    });

    mapObj.current = map;
    map.setDraggable(draggable);
    map.setZoomable(draggable);

    if (showMyLocation) {
      const overlay = new window.kakao.maps.CustomOverlay({
        position: center,
        content: `<div style="width:18px;height:18px;background-color:#4b9ce2;border:2px solid white;border-radius:50%;"></div>`,
        xAnchor: 0.5,
        yAnchor: 0.5,
      });
      overlay.setMap(map);
      overlayRef.current = overlay;
    }

    addMarkers(map, markers);
  };

  useEffect(() => {
    if (!window.kakao) return;
    window.kakao.maps.load(initMap);
  }, []);

  // markers 변경 시 갱신
  useEffect(() => {
    if (!mapObj.current) return;
    addMarkers(mapObj.current, markers);
  }, [markers]);

  // draggable 변경 시 적용
  useEffect(() => {
    if (!mapObj.current) return;
    mapObj.current.setDraggable(draggable);
    mapObj.current.setZoomable(draggable);
  }, [draggable]);

  // level 변경 시 적용
  useEffect(() => {
    if (!mapObj.current) return;
    mapObj.current.setLevel(level);
  }, [level]);

  // 내 위치 버튼 클릭
  const handleMoveToMyLocation = () => {
    if (!mapObj.current || !onMoveToMyLocation) return;
    const myLocation = onMoveToMyLocation();
    if (!myLocation) return;

    const moveLatLng = new window.kakao.maps.LatLng(myLocation.lat, myLocation.lng);
    mapObj.current.panTo(moveLatLng); // 부드럽게 이동
  };

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`}
        strategy="afterInteractive"
      />
      <div style={{ width: "100%", height, position: "relative" }}> {/* wrapper */}
        <div 
          ref={mapRef} 
          style={{ 
            width: "100%", 
            height: "100%", 
            touchAction: "pan-x pan-y",
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            userSelect: "none",
          }} 
        />
        {showLocateButton && (
          <button
            onClick={handleMoveToMyLocation}
            style={{
              position: "absolute",
              bottom: 8,
              right: 8,
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "white",
              border: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 9999,
            }}
          >
            <Image src="/icons/locate-ico.svg" alt="내 위치" width={24} height={24} />
          </button>
        )}
      </div>
    </>
  );
}
