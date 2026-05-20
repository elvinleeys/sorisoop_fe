"use client";

import { formatDecibel } from "@/shared/lib/audio/formatDecibel";
import { useMeasurementSessionStore } from "../../model/store/measurement-session";
import DecibelValue from "./DecibelValue";
import { getDecibelLevel } from "@/util/getDecibelLevel";
import DecibelLevelBadge from "./DecibelLevelBadge";

export default function MeasurementStats() {
    const avgDecibel = useMeasurementSessionStore((s) => s.avgDecibel);
    const maxDecibel = useMeasurementSessionStore((s) => s.maxDecibel);
    const status = useMeasurementSessionStore((s) => s.status);

    const avg = formatDecibel(avgDecibel);
    const max = formatDecibel(maxDecibel);
    const level = getDecibelLevel(avgDecibel, status);

    return (
        <div className="flex items-center justify-between w-full h-[3.875rem] mb-[1.375rem]">
            <DecibelValue label="평균" value={avg} />
            <DecibelLevelBadge level={level} />
            <DecibelValue label="최대" value={max} align="end" />
        </div>
    );
}
