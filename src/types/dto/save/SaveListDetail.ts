export interface MeasurementDetail {
  id: string;
  avgDecibel: number;
  maxDecibel: number;
  measuredAt: string;
  comment: string;
  place: {
    id: string;
    placeName: string;
    location: { type: "Point"; coordinates: [number, number] };
    categoryCode: "CT1" | "AT4" | "FD6" | "CE7" | "";
    categoryName: "문화시설" | "관광명소" | "음식점" | "카페" | "";
  };
}
