import { NoiseDataDto } from "@/types/dto/map/Map";
import { getMarkerImg } from "@/util/getDecibelLevel";

export interface FetchMarkersParams {
  center: { lat: number; lng: number };
  radius: number;
  categories: string[];
  noiseLevels: string[];
  signal?: AbortSignal;
}

export interface NoiseMarker {
  id: string;
  lat: number;
  lng: number;
  avgDecibel?: number | null;
  image?: string;
}

export async function fetchNoiseMarkers({
  center,
  radius,
  categories,
  noiseLevels,
  signal,
}: FetchMarkersParams): Promise<NoiseMarker[]> {
  const params = new URLSearchParams({
    x: String(center.lng),
    y: String(center.lat),
    radius: String(radius),
  });

  categories.forEach((c) => params.append("categories", c));
  noiseLevels.forEach((n) => params.append("noiseLevels", n));

  const url = `/api/map?${params.toString()}`;
  const res = await fetch(url, { 
    signal,
    priority: 'high', 
  });

  if (!res.ok) throw new Error("데이터 불러오기 실패");

  const json: { success: boolean; data: NoiseDataDto[] } = await res.json();
  if (!json.success) throw new Error("API 실패");

  return json.data.map((d) => ({
    id: d.id,
    lat: d.lat,
    lng: d.lng,
    avgDecibel: d.avgDecibel,
    image: getMarkerImg(d.avgDecibel),
  }));
}
