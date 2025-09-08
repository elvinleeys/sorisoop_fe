"use client";

import { useMeasurementStore } from "@/store/measurement/measurementStore";

export default function MaxDecibel() {
    const { decibelHistory, status } = useMeasurementStore();

    // 최대값 계산
    const maxDbValue =
        status !== "idle" && decibelHistory.length > 0
        ? Math.max(...decibelHistory)
        : 0;

    const maxDb = maxDbValue > 0 ? maxDbValue.toFixed(0) : "00";

    return (
        <div>
            <p 
                className="
                    text-base 
                    text-neutral-sub 
                    text-end
                "
            >
                최대
            </p>
            <p 
                className="
                    text-base 
                    text-neutral-sub 
                    text-end
                "
            >
                {maxDb}
            </p>
        </div>
    );
}