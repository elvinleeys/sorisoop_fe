import { fetchWrapper } from "@/lib/fetchWrapper";
import { Measurement } from "@/types/dto/save/savelist";

export async function fetchMeasurementData(): Promise<Measurement[]> {
  try {
    const res = await fetchWrapper<Measurement[]>("/api/get-list");
    return res;
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      throw new Error("guest");
    }
    throw err;
  }
}