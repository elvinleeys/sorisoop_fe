export interface LocationResponse {
  kakaoPlaceId: string | null;
  placeName: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  categoryCode: "CT1" | "AT4" | "FD6" | "CE7" | null | string;
  categoryName: "문화시설" | "관광명소" | "음식점" | "카페" | null | string;
  error?: string;
}