"use client";

import { flexRowCenter } from "@/mixin/style";
import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { useEffect, useRef, useState } from "react";
import { NoiseMeterChart } from "soridam-design-system";

export default function NoiseChart() {
    const { currentDecibel, status, setStatus } = useMeasurementStore();
    const [time, setTime] = useState<number>(15); // 15에서 시작
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (status === "idle") {
            clearInterval(intervalRef.current!);
            setTime(15);
            return;
        }else {
            intervalRef.current = setInterval(() => {
                setTime((prev) => prev - 1); // 단순히 -1씩 감소
            }, 1000);
        }

        return () => clearInterval(intervalRef.current!);
    }, [status]);

    // finished 처리 (0에 딱 도달했을 때 한 번만)
    useEffect(() => {
        if (time === 0) {
            setStatus("finished");
        }
    }, [time, setStatus]);

    // UI 표시
    let displayTime = "";
    if (time > 0) {
        // 카운트다운
        displayTime = `00:${time.toString().padStart(2, "0")}`;
    } else {
        // 카운트업 (time은 음수)
        const elapsed = Math.abs(time); // 1, 2, 3 …
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        displayTime = `+${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    }

    return (
        <div className={`${flexRowCenter} w-full h-[13.75rem] mb-[1.0625rem]`}>
            <NoiseMeterChart db={Math.round(currentDecibel)} time={displayTime}/>
        </div>
    );
}