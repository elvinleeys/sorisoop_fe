import { useMeasurementSessionStore } from "@/features/measurement/model/store/measurement-session";
import { flexRow } from "@/mixin/style";
import { formatDateTime } from "@/util/formatDateTime";
import { useEffect, useState } from "react";

export default function MeasureTime() {
    const startedAt = useMeasurementSessionStore((s) => s.startedAt);
    const status = useMeasurementSessionStore((s) => s.status);

    const [now, setNow] = useState<number | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        setNow(Date.now());

        const timer = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const baseDate =
        status === "measuring" && startedAt
            ? startedAt
            : now !== null
              ? new Date(now)
              : null;

    const formatted = baseDate ? formatDateTime(baseDate) : null;

    return (
        <div className={`${flexRow} items-center gap-[0.25rem]`}>
            <time className="text-base text-neutral-sub">
                {isMounted && formatted ? formatted.date : "--"}
            </time>
            <time className="text-base text-neutral-sub">
                {isMounted && formatted ? formatted.time : "--:--"}
            </time>
        </div>
    );
}
