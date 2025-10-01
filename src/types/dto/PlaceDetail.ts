export interface PlaceDetailResponse {
  placeName: string;
  chart: { timeRange: "5-11" | "11-18" | "18-22"; db: number; count: number }[];
  comments: string[];
}