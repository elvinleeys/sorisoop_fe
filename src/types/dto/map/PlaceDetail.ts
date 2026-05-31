export interface PlaceDetailResponse {
    placeId: string;
    placeName: string;

    avgDecibelCached: number;
    measurementCount: number;

    chart: {
        timeRange: string;
        db: number;
        count: number;
    }[];

    comments: string[];
}
