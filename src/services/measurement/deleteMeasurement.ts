import { DeleteMeasurementResponse } from "@/types/dto/deleteMeasurement";
import { fetchWrapper } from "@/lib/fetchWrapper";

export async function deleteMeasurement(
    listId: string
): Promise<DeleteMeasurementResponse> {
  const res = await fetchWrapper<DeleteMeasurementResponse>(`/api/delete-measurement/${listId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.success) {
    throw new Error(res.message || "삭제 실패");
  }

  return res;
}