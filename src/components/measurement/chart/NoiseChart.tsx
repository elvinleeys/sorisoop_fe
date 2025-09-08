import { useMeasurementTimer } from "@/hook/useTimer";
import { flexRowCenter } from "@/mixin/style";
import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { NoiseMeterChart } from "soridam-design-system";

export default function NoiseChart() {
    const { currentDecibel } = useMeasurementStore();
    const time = useMeasurementTimer();

    const formattedDecibel = Math.round(currentDecibel);

    return (
        <div className={`${flexRowCenter} w-full h-[13.75rem] mb-[1.0625rem]`}>
            <NoiseMeterChart db={formattedDecibel} time={time}/>
        </div>
    );
}