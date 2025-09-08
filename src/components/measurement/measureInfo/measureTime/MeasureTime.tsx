import { flexRow } from "@/mixin/style";
import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { useEffect, useState } from "react";

function formatDateTime(date: Date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");

    return {
        date: `${yyyy}.${mm}.${dd}`,
        time: `${hh}:${min}`,
    };
}

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
            <p className="text-base text-neutral-sub">
                {date}
            </p>
            <p className="text-base text-neutral-sub">
                {time}
            </p>
        </div>
    );
}