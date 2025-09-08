"use client";

import { useMeasurementStore } from "@/store/measurement/measurementStore";

export default function MaxDecibel() {
    const { maxDecibel } = useMeasurementStore();

    // 소수점 없이 반올림 → 문자열로 변환 → 최소 2자리로 패딩
    const maxDb = Math.round(maxDecibel).toString().padStart(2, "0");
    
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