import { flexRow } from "@/mixin/style";
import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { formatDateTime } from "@/util/formatDateTime";
import { useEffect, useState } from "react";

export default function MeasureTime() {
    const { status, startedAt } = useMeasurementStore();
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        if (status === "idle") {
            const timer = setInterval(() => {
                setNow(new Date());
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [status]);

    const targetDate = status === "measuring" && startedAt ? startedAt : now;
    const { date, time } = formatDateTime(targetDate);

    return (
        <div className={`${flexRow} items-center gap-[0.25rem]`}>
            <time className="text-base text-neutral-sub">
                {date}
            </time>
            <time className="text-base text-neutral-sub">
                {time}
            </time>
        </div>
    );
}