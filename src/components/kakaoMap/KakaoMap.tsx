"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

interface KakaoMapProps {
  lat: number;
  lng: number;
  markers?: { lat: number; lng: number; image?: string }[];
  height?: string; // CSS height 문자열 (ex: "300px", "10rem")
  level?: number; // 지도 줌 레벨
}

export default function KakaoMap({
  lat,
  lng,
  markers = [],
  height = "10rem",
  level = 3,
}: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const initMap = () => {
    if (!window.kakao) return;
    window.kakao.maps.load(() => {
      if (!mapRef.current) return;

      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level,
      };
      const map = new window.kakao.maps.Map(mapRef.current, options);

      markers.forEach((marker) => {
        const position = new window.kakao.maps.LatLng(marker.lat, marker.lng);
        const markerOptions: any = { position };

        if (marker.image) {
          markerOptions.image = new window.kakao.maps.MarkerImage(
            marker.image,
            new window.kakao.maps.Size(32, 32) // 이미지 크기 조절
          );
        }

        new window.kakao.maps.Marker(markerOptions).setMap(map);
      });
    });
  };

  // 좌표 또는 마커가 바뀔 때마다 지도 업데이트
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initMap();
    }
  }, [lat, lng, markers, level]);

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`}
        strategy="afterInteractive"
        onLoad={initMap} // SDK 로딩 후 초기화
      />
      <div ref={mapRef} style={{ width: "100%", height }} />
    </>
  );
}
