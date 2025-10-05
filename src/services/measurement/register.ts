import { fetchWrapper } from "@/lib/fetchWrapper";

export interface RegisterPayload {
    placeName: string;
    kakaoPlaceId: string | null;
    location: { type: "Point"; coordinates: [number, number] | null };
    categoryCode: string | null;
    categoryName: string | null;
    measuredAt: Date;
    measuredDate: string;
    timeSlot: string;
    avgDecibel: number;
    maxDecibel: number;
    comment: string;
}

export const registerMeasurement = async (payload: RegisterPayload) => {
  return fetchWrapper("/api/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};