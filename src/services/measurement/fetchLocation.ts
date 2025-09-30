import { LocationState } from "@/store/measurement/locationStore";

export async function fetchLocation(
  lat: number,
  lng: number
): Promise<Partial<LocationState>> {
  const response = await fetch(`/api/location?x=${lng}&y=${lat}`);
  if (!response.ok) {
    throw new Error("서버에서 위치 정보 가져오기 실패");
  }
  const data = await response.json();

  return {
    kakaoPlaceId: data.kakaoPlaceId ?? null,
    placeName: data.placeName,
    location: data.location,
    categoryCode: data.categoryCode as LocationState["categoryCode"], // 👈 캐스팅
    categoryName: data.categoryName as LocationState["categoryName"], // 👈 캐스팅
  };
}