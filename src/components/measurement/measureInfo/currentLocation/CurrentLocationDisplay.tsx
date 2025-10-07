"use client";

import { flexRow } from "@/mixin/style";
import Image from "next/image";
import { useLocationStore } from "@/store/measurement/locationStore";
import { useCurrentLocation } from "@/hook/useCurrentLocation";
import { fetchLocation } from "@/services/measurement/fetchLocation";
import { useQuery } from "@tanstack/react-query";
import { LocationResponse } from "@/types/dto/main/Location";

export default function CurrentLocationDisplay() {
  // store에서 location 상태와 setLocation 함수 가져오기
  const location = useLocationStore((state) => state.location);
  const setLocation = useLocationStore((state) => state.setLocation);

  // custom hook 사용
  const { lat, lng, error: geoError } = useCurrentLocation();

  // React Query로 위치 정보 fetch
  const { data, isSuccess, isError, isLoading } = useQuery<LocationResponse, Error>({
    queryKey: ["current-location", lat, lng],
    queryFn: () => fetchLocation(lat!, lng!),
    enabled: !!lat && !!lng,
    staleTime: 5 * 60 * 1000,
  });

  if (isSuccess && data) {
    setLocation({
      kakaoPlaceId: data.kakaoPlaceId,
      placeName: data.placeName,
      location: data.location,
      categoryCode: data.categoryCode,
      categoryName: data.categoryName,
    });
  }

  if (isError) {
    setLocation({
      kakaoPlaceId: null,
      placeName: geoError ?? "위치 가져오기 실패",
      location: { type: "Point", coordinates: null },
      categoryCode: null,
      categoryName: null,
    });
  }

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
        {isLoading ? "위치 검색중" : location.placeName}
      </p>
    </div>
  );
}