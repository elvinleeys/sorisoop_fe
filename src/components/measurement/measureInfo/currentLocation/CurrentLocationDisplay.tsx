"use client";

import { flexRow } from "@/mixin/style";
import Image from "next/image";
import { useEffect } from "react";
import { useLocationStore } from "@/store/measurement/locationStore";
import { useCurrentLocation } from "@/hook/useCurrentLocation";
import { fetchLocation } from "@/services/measurement/fetchLocation";

export default function CurrentLocationDisplay() {
  // store에서 location 상태와 setLocation 함수 가져오기
  const location = useLocationStore((state) => state.location);
  const setLocation = useLocationStore((state) => state.setLocation);

  // custom hook 사용
  const { lat, lng, error } = useCurrentLocation();

  useEffect(() => {
    if (!lat || !lng) return;

    if (error) {
      setLocation({
        kakaoPlaceId: null,
        placeName: error,
        location: { type: "Point", coordinates: null },
        categoryCode: null,
        categoryName: null,
      });
      return;
    }

    (async () => {
      try {
        const data = await fetchLocation(lat, lng);

        setLocation({
          kakaoPlaceId: data.kakaoPlaceId ?? null,
          placeName: data.placeName,
          location: data.location,
          categoryCode: data.categoryCode ?? null,
          categoryName: data.categoryName ?? null,
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
    })();
  }, [lat, lng, error, setLocation]);

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