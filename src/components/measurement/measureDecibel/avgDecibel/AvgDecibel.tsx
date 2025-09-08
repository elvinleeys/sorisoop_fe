"use client";

import { useMeasurementStore } from "@/store/measurement/measurementStore";

export default function AvgDecibel() {
    const { avgDecibel } = useMeasurementStore();

    // 소수점 없이 반올림 → 문자열로 변환 → 최소 2자리로 패딩
    const averageDb = Math.round(avgDecibel).toString().padStart(2, "0");
    
    return (
        <div>
            <p className="text-base text-neutral-sub text-start">
                평균
            </p>
            <p className="text-base text-neutral-sub text-start">
                {averageDb}
            </p>
        </div>
    );
}