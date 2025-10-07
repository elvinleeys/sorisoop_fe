import { fetchWrapper } from "@/lib/fetchWrapper";
import { MeasurementDetail } from "@/types/dto/save/SaveListDetail";

export async function fetchMeasurementDataDetail(
  listId: string
): Promise<MeasurementDetail> {
  try {
    const res = await fetchWrapper<MeasurementDetail>(
      `/api/get-measurement/${listId}`,
      { credentials: "include" }
    );
    return res;
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      // 로그인하지 않은 사용자
      throw new Error("guest");
    }
    throw err;
  }
}