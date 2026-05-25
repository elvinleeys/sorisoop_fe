import { NoiseDataDto } from "@/types/dto/map/Map";
import { getMarkerImg } from "@/util/getDecibelLevel";

export interface FetchMarkersParams {
    bounds: {
        swLat: number;
        swLng: number;
        neLat: number;
        neLng: number;
    };
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
    bounds,
    categories,
    noiseLevels,
    signal,
}: FetchMarkersParams): Promise<NoiseMarker[]> {
    const params = new URLSearchParams({
        swLat: String(bounds.swLat),
        swLng: String(bounds.swLng),
        neLat: String(bounds.neLat),
        neLng: String(bounds.neLng),
    });

    categories.forEach((c) => params.append("categories", c));
    noiseLevels.forEach((n) => params.append("noiseLevels", n));

    const url = `/api/map?${params.toString()}`;
    const res = await fetch(url, {
        signal,
        priority: "high",
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
