"use client";

import { useMeasurementStore } from "@/store/measurement/measurementStore";

export default function AvgDecibel() {
    const { decibelHistory, status } = useMeasurementStore();

    const avgDbValue =
        status !== "idle" && decibelHistory.length > 0
        ? decibelHistory.reduce((sum, db) => sum + db, 0) / decibelHistory.length
        : 0;

    const averageDb = avgDbValue > 0 ? avgDbValue.toFixed(0) : "00";

    return (
        <div>
            <p 
                className="
                    text-base 
                    text-neutral-sub 
                    text-start
                "
            >
                평균
            </p>
            <p 
                className="
                    text-base 
                    text-neutral-sub 
                    text-start
                "
            >
                {averageDb}
            </p>
        </div>
    );
}