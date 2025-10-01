import { KakaoPlace } from "@/types/kakaoPlace";

export async function fetchKakaoPlaces(
  keyword: string,
  lat: number,
  lng: number,
  signal?: AbortSignal
): Promise<KakaoPlace[]> {
  const res = await fetch(
    `/api/kakao/search?keyword=${encodeURIComponent(keyword)}&lat=${lat}&lng=${lng}`,
    { signal }
  );
  if (!res.ok) throw new Error("검색 실패");
  const data = await res.json();
  return data.documents ?? [];
}
