"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMeasurementSessionStore } from "@/features/measurement/model/store/measurement-session";

export function useEnsureMeasurement() {
    const router = useRouter();

    const startedAt = useMeasurementSessionStore((s) => s.startedAt);
    const history = useMeasurementSessionStore((s) => s.history);

    useEffect(() => {
        const hasMeasurement = history.length > 0;

        if (!startedAt || !hasMeasurement) {
            router.replace("/");
        }
    }, [startedAt, history.length, router]);
}
