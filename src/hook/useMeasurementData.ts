import { useEffect, useState } from "react";
import { Measurement } from "@/types/dto/savelist";
import { fetchWrapper } from "@/lib/fetchWrapper";

type SaveStatus = "loading" | "guest" | "empty" | "data";

export function useMeasurementData() {
  const [data, setData] = useState<Measurement[]>([]);
  const [status, setStatus] = useState<SaveStatus>("loading");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchWrapper<Measurement[]>("/api/get-list");
        if (!res || res.length === 0) {
          setStatus("empty");
        } else {
          setData(res);
          setStatus("data");
        }
      } catch (err) {
        if (err instanceof Error) {
          if (err.message === "Unauthorized") {
            setStatus("guest");
          } else {
            console.error(err.message);
          }
        } else {
          console.error("Unexpected error:", err);
        }
      }
    };
    
    load();
  }, []);

  return { data, status };
}
