import { flexRowBetween } from "@/mixin/style";
import MeasureTime from "./measureTime/MeasureTime";
import CurrentLocationView from "./currentLocation/CurrentLocationView";

export default function MeasureInfo() {
    return (
        <div className={`${flexRowBetween} w-full h-[1.5rem] mb-[1.0625rem]`}>
            <MeasureTime />
            <CurrentLocationView />
        </div>
    );
}
