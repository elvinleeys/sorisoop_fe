"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

interface MarkerData {
  lat: number;
  lng: number;
  image?: string;
}

interface KakaoMapProps {
  lat: number;
  lng: number;
  markers?: MarkerData[];
  showMyLocation?: boolean;
  height?: string;
  level?: number;
}

export default function KakaoMap({
  lat,
  lng,
  markers = [],
  showMyLocation = false,
  height = "10rem",
  level = 5,
}: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapObj = useRef<any>(null); // 지도 객체
  const overlayRef = useRef<any>(null); // 내 위치 오버레이

  const initMap = () => {
    if (!window.kakao) return;
    window.kakao.maps.load(() => {
      if (!mapRef.current) return;

      const center = new window.kakao.maps.LatLng(lat, lng);
      const map = new window.kakao.maps.Map(mapRef.current, {
        center,
        level,
      });
      mapObj.current = map;

      // 내 위치 표시
      if (showMyLocation) {
        const overlay = new window.kakao.maps.CustomOverlay({
          position: center,
          content: `
            <div style="
              width: 18px;
              height: 18px;
              background-color: #4b9ce2;
              border: 2px solid white;
              border-radius: 50%;
            "></div>
          `,
          xAnchor: 0.5,
          yAnchor: 0.5,
        });
        overlay.setMap(map);
        overlayRef.current = overlay;
      }

      // 마커 추가
      markers.forEach((m) => {
        const pos = new window.kakao.maps.LatLng(m.lat, m.lng);
        const options: any = { position: pos };
        if (m.image) {
          options.image = new window.kakao.maps.MarkerImage(
            m.image,
            new window.kakao.maps.Size(32, 32)
          );
        }
        new window.kakao.maps.Marker(options).setMap(map);
      });
    });
  };

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initMap();
    }
  }, [lat, lng, markers, level, showMyLocation]);

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`}
        strategy="afterInteractive"
        onLoad={initMap}
      />
      <div ref={mapRef} style={{ width: "100%", height }} />
    </>
  );
}
