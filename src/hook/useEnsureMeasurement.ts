"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { useLocationStore } from "@/store/measurement/locationStore";

export function useEnsureMeasurement() {
  const router = useRouter();
  const { avgDecibel, maxDecibel, startedAt } = useMeasurementStore();
  const { location } = useLocationStore();

  useEffect(() => {
    if (!avgDecibel || !maxDecibel || !startedAt || !location?.location?.coordinates) {
      router.replace("/");
    }
  }, [avgDecibel, maxDecibel, startedAt, location, router]);
}
