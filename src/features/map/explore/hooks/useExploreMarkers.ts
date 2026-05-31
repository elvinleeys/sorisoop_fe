"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFilterDataStore } from "@/store/filter/useFilterDataStore";
import { fetchNoiseMarkers } from "@/services/map/fetchNoiseMarker";
import { getMarkerImg } from "@/util/getDecibelLevel";
import { Bounds } from "@/shared/types/kakaoMap";

export interface NoiseMarker {
    id: string;
    lat: number;
    lng: number;
    avgDecibel?: number | null;
    image?: string;
}

interface Props {
    bounds: Bounds | null;
}

export function useExploreMarkers({ bounds }: Props) {
    const { appliedCategories, appliedNoiseLevels } = useFilterDataStore();
    const boundsKey = bounds
        ? `${bounds.swLat}-${bounds.swLng}-${bounds.neLat}-${bounds.neLng}`
        : null;
    const query = useQuery<NoiseMarker[]>({
        queryKey: [
            "noiseMarkers",
            boundsKey,
            appliedCategories,
            appliedNoiseLevels,
        ],
        queryFn: async ({ signal }) => {
            if (!bounds) return [];

            const data = await fetchNoiseMarkers({
                bounds,
                categories: appliedCategories,
                noiseLevels: appliedNoiseLevels,
                signal,
            });

            return data.map((d) => ({
                ...d,
                image: getMarkerImg(d.avgDecibel ?? null),
            }));
        },
        enabled: !!bounds,
    });

    const markers = useMemo(() => {
        return query.data ?? [];
    }, [query.data]);

    return {
        markers,
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        isError: query.isError,
    };
}
