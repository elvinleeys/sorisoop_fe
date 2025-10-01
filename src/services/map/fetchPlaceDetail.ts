import { PlaceDetailResponse } from "@/types/dto/PlaceDetail";

export async function fetchPlaceDetail(id: string) {
  const res = await fetch(`/api/map/place-detail/${id}`);
  if (!res.ok) throw new Error("데이터 불러오기 실패");
  const json = await res.json();
  if (!json.success) throw new Error("API 실패");
  return json.data as PlaceDetailResponse;
}
