import { flexRowBetween } from "@/mixin/style";
import AvgDecibel from "./avgDecibel/AvgDecibel";
import DecibelLevel from "./decibelLevel/DecibelLevel";
import MaxDecibel from "./maxDecibel/MaxDecibel";

export default function MeasureDecibel() {
    return (
        <div 
            className={`
                ${flexRowBetween}
                w-full
                h-[3.875rem]
                mb-[1.375rem]
            `}
        >
            <AvgDecibel />
            <DecibelLevel />
            <MaxDecibel />
        </div>
    );
}