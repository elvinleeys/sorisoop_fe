"use client";

import { NoiseMeterChart } from "soridam-design-system";
import { useMeasurementSessionStore } from "../../model/store/measurement-session";
import { useMeasurementTimer } from "../../model/lib/formatMeasurementTimer";
import { formatCountdown } from "../../model/lib/formatCountdown";

export default function NoiseChart() {
    const currentDecibel = useMeasurementSessionStore((s) => s.currentDecibel);

    const status = useMeasurementSessionStore((s) => s.status);

    const readyToSave = useMeasurementSessionStore((s) => s.readyToSave);

    const time = useMeasurementTimer({
        status,
        duration: 15,
        onFinished: readyToSave,
    });

    return (
        <NoiseMeterChart
            db={Math.round(currentDecibel)}
            time={formatCountdown(time)}
        />
    );
}
