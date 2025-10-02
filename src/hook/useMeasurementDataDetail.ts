import { useEffect, useState } from "react";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { MeasurementDetail } from "@/types/dto/SaveListDetail";

export function useMeasurementDataDetail(
    listId: string | undefined
) {
  const [data, setData] = useState<MeasurementDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!listId) return;

    const fetchDetail = async () => {
      try {
        const result = await fetchWrapper<MeasurementDetail>(
          `/api/get-measurement/${listId}`,
          { credentials: "include" }
        );
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [listId]);

  return { data, loading };
}