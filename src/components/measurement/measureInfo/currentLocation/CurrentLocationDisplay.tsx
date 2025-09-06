"use client";

import { flexRow } from "@/mixin/style";
import Image from "next/image";
import { useEffect } from "react";
import { useMeasurementStore } from "@/store/measurement/measurementStore";

export default function CurrentLocationDisplay() {
  // location 상태와 setLocation 함수만 구조 분해
  const placeName = useMeasurementStore(state => state.location.placeName);
  const setLocation = useMeasurementStore(state => state.setLocation);

  useEffect(() => {
    // 스토어에 위치 정보가 이미 있으면, API 호출을 생략
    if (placeName && placeName !== "위치 검색 중...") {
       return;
    }

    if (!navigator.geolocation) {
      setLocation({ placeName: "위치 API 미지원", latitude: null, longitude: null });
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
          if (!response.ok) {
            throw new Error('서버에서 위치 정보 가져오기 실패');
          }
          const data = await response.json();
          setLocation({ placeName: data.placeName, latitude: latitude, longitude: longitude });
        } catch (e) {
          console.error(e);
          setLocation({ placeName: "위치 가져오기 실패", latitude: null, longitude: null });
        }
      },
      () => {
        setLocation({ placeName: "위치 가져오기 실패", latitude: null, longitude: null });
      },
      options
    );
  }, [placeName, setLocation]); // 👈 의존성 배열이 location과 setLocation으로 간결해졌습니다.

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
        {placeName}
      </p>
    </div>
  );
}