import { MeasurementStatus } from "../../model/store/measurement-session";
import NoiseChart from "./NoiseChart";
import PreparingIndicator from "./PreparingIndicator";

export default function MeasurementVisualizer({
    status,
}: {
    status: MeasurementStatus;
}) {
    const isPreparing = status === "preparing";

    return (
        <div className="relative w-full h-[13.75rem] mb-[1.0625rem]">
            <div
                className={`
                    absolute inset-0
                    flex items-center justify-center 
                    transition-opacity duration-300
                    ${isPreparing ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
            >
                <PreparingIndicator />
            </div>

            <div
                className={`
                    absolute inset-0
                    flex items-center justify-center 
                    transition-opacity duration-300
                    ${isPreparing ? "opacity-0" : "opacity-100"}
                `}
            >
                <NoiseChart />
            </div>
        </div>
    );
}
