"use client";

import { useCountdown } from "@/hook/useCountDown";
import { flexRowCenter } from "@/mixin/style";
import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { NoiseMeterChart } from "soridam-design-system";

export default function NoiseChart() {
    const { currentDecibel, status, setStatus } = useMeasurementStore();
    
    const time = useCountdown(status, 15, () => {
        setStatus("finished");  // finished로 전역 상태 업데이트
    });

    // displayTime 계산
    const formatTime = (t: number) => {
        if (t >= 0) return `00:${t.toString().padStart(2,"0")}`; // 카운트다운
        const elapsed = Math.abs(t); // 00:00 이후 +00:01 부터
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        return `+${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
    };

    return (
        <div className={`${flexRowCenter} w-full h-[13.75rem] mb-[1.0625rem]`}>
            <NoiseMeterChart db={Math.round(currentDecibel)} time={formatTime(time)}/>
        </div>
    );
}