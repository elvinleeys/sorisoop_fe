import { flexRowCenter } from "@/mixin/style";
import { NoiseMeterChart } from "soridam-design-system";

export default function NoiseChart() {
    return (
        <div className={`${flexRowCenter} w-full h-[13.75rem] mb-[1.0625rem]`}>
            <NoiseMeterChart db={0} time={"00:15"}/>
        </div>
    );
}