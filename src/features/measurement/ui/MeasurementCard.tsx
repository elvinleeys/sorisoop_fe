"use client";

import { useMeasurementSessionStore } from "../model/store/measurement-session";
import MeasureInfo from "./measureInfo/MeasureInfo";
import MeasurementStats from "./measurementStats/MeasurementStats";
import { MeasurementDescription } from "./MeasurementDescription";
import MeasurementButton from "./button/MeasurementButton";
import MeasurementVisualizer from "./measurementVisualizer/MeasurementVisualizer";

export default function MeasurementCard() {
    const status = useMeasurementSessionStore((s) => s.status);

    const cardColor =
        status === "idle"
            ? "bg-[#F4F4F4] border-[#D7D7D7]"
            : "bg-[#F4F8FF] border-[#CFE2FF]";

    return (
        <>
            <div
                className={`
                    w-full
                    h-[27.75rem]
                    pt-[0.875rem]
                    px-[1rem]
                    pb-[1.0625rem]
                    mb-[1.125rem]
                    rounded-[1rem]
                    border-2
                    transition-colors duration-500 ease-in-out
                    ${cardColor}
                `}
            >
                <MeasureInfo />
                <MeasurementStats />
                <MeasurementVisualizer status={status} />
                <MeasurementDescription />
            </div>

            <MeasurementButton />
        </>
    );
}
