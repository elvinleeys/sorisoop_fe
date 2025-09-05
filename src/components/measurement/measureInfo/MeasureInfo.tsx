import { flexRowBetween } from "@/mixin/style";
import CurrentLocationDisplay from "./currentLocation/CurrentLocationDisplay";
import MeasureTime from "./measureTime/MeasureTime";

export default function MeasureInfo() {
    return (
        <div className={`${flexRowBetween} w-full h-[1.5rem]`}>
            <MeasureTime />
            <CurrentLocationDisplay />
        </div>
    );
}