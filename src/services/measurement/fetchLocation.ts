import { LocationResponse } from "@/types/dto/main/Location";

export async function fetchLocation(lat: number, lng: number): Promise<LocationResponse> {
  const response = await fetch(`/api/location?x=${lng}&y=${lat}`);
  if (!response.ok) {
    throw new Error("서버에서 위치 정보 가져오기 실패");
  }
  const data = await response.json();

  return {
    kakaoPlaceId: data.kakaoPlaceId ?? null,
    placeName: data.placeName ?? "위치 정보 없음",
    location: {
      type: "Point",
      coordinates: data.location?.coordinates ?? [lng, lat],
    },
    categoryCode: data.categoryCode ?? null,
    categoryName: data.categoryName ?? null,
  };
}