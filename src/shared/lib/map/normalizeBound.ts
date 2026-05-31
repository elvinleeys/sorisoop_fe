import { Bounds } from "@/shared/types/kakaoMap";

export function normalizeBounds(bounds: Bounds, precision = 3): Bounds {
    const round = (value: number) => Number(value.toFixed(precision));

    return {
        swLat: round(bounds.swLat),
        swLng: round(bounds.swLng),
        neLat: round(bounds.neLat),
        neLng: round(bounds.neLng),
    };
}
