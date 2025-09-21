"use client";

import { flexRow } from "@/mixin/style";
import Image from "next/image";
import { useEffect } from "react";
import { useLocationStore } from "@/store/measurement/locationStore";

export default function CurrentLocationDisplay() {
  // store에서 location 상태와 setLocation 함수 가져오기
  const location = useLocationStore((state) => state.location);
  const setLocation = useLocationStore((state) => state.setLocation);

  useEffect(() => {
    // 이미 장소 이름이 있으면 API 호출 생략
    if (location.placeName && location.placeName !== "위치 검색 중...") return;

    if (!navigator.geolocation) {
      setLocation({
        placeName: "위치 API 미지원",
        location: { type: "Point", coordinates: null },
        kakaoPlaceId: null,
        categoryCode: null,
        categoryName: null,
      });
      return;
    }

    const options = {
      enableHighAccuracy: false,
      timeout: 3000,
      maximumAge: 60000,
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(`/api/location?x=${longitude}&y=${latitude}`);
          if (!response.ok) throw new Error("서버에서 위치 정보 가져오기 실패");

          const data = await response.json();

          // store에 PlaceSchema 구조로 저장
          setLocation({
            kakaoPlaceId: data.kakaoPlaceId,
            placeName: data.placeName,
            location: data.location,
            categoryCode: data.categoryCode,
            categoryName: data.categoryName,
          });
        } catch (e) {
          console.error(e);
          setLocation({
            kakaoPlaceId: null,
            placeName: "위치 가져오기 실패",
            location: { type: "Point", coordinates: null },
            categoryCode: null,
            categoryName: null,
          });
        }
      },
      () => {
        setLocation({
          kakaoPlaceId: null,
          placeName: "위치 가져오기 실패",
          location: { type: "Point", coordinates: null },
          categoryCode: null,
          categoryName: null,
        });
      },
      options
    );
  }, [location.placeName, setLocation]);

  return (
    <div
      className={`
        ${flexRow}
        items-center
        justify-end
        max-w-[8.625rem]
        h-[1.5rem]
        gap-[0.1875rem]
      `}
    >
      <div className="relative w-[1.25rem] h-[1.25rem]">
        <Image src="/icons/locate-ico.svg" alt="현재 위치 아이콘" fill priority />
      </div>
      <p
        className="
          text-base
          text-neutral-sub
          whitespace-nowrap
          overflow-hidden
          text-ellipsis
        "
      >
        {location.placeName}
      </p>
    </div>
  );
}