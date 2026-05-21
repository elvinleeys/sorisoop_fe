"use client";

import { useEffect, useState } from "react";

interface Props {
    status: "idle" | "preparing" | "measuring" | "readyToSave";
    duration?: number;
    onFinished?: () => void;
}

export function useMeasurementTimer({
    status,
    duration = 15,
    onFinished,
}: Props) {
    const [time, setTime] = useState(duration);

    useEffect(() => {
        if (status === "idle" || status === "preparing") {
            setTime(duration);
            return;
        }

        const timer = setInterval(() => {
            setTime((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [status, duration]);

    useEffect(() => {
        if (status === "measuring" && time === 0) {
            onFinished?.();
        }
    }, [status, time, onFinished]);

    return time;
}
