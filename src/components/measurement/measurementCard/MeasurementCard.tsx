import NoiseChart from "../chart/NoiseChart";
import MeasureDecibel from "../measureDecibel/MeasureDecibel";
import { MeasureDS } from "../measureDescription/MeasureDS";
import MeasureInfo from "../measureInfo/MeasureInfo";
import CancelButton from "../measurementButton/cancelButton/CancelButton";
import PostMeasurementBtn from "../measurementButton/postMeasurementActions/PostMeasurementBtn";
import StartButton from "../measurementButton/startButton/StartButton";

export default function MeasurementCard() {
    return (
        <>
        <div 
            className="
                w-full
                h-[27.75rem]
                pt-[0.875rem]
                px-[1rem] 
                pb-[1.0625rem]
                mb-[1.125rem]
                rounded-[1rem]
                bg-[#F4F4F4]
                border-2 
                border-[#D7D7D7]
            "
        >
            <MeasureInfo />
            <MeasureDecibel />
            <NoiseChart />
            <MeasureDS />
        </div>
        <PostMeasurementBtn />
        </>
    );
}