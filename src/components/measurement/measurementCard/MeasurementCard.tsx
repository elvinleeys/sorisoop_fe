"use client";

import { useMeasurementStore } from "@/store/measurement/measurementStore";
import NoiseChart from "../chart/NoiseChart";
import MeasureDecibel from "../measureDecibel/MeasureDecibel";
import { MeasureDS } from "../measureDescription/MeasureDS";
import MeasureInfo from "../measureInfo/MeasureInfo";
import MeasurementButton from "../measurementButton/MeasurementButton";

export default function MeasurementCard() {
    const { status } = useMeasurementStore();

    // 상태에 따른 배경색 및 테두리 색상
    // 상태에 따른 색상 Tailwind 클래스 매핑
    const cardColors = {
        idle: "bg-[#F4F4F4] border-[#D7D7D7]",
        measuring: "bg-[#F4F8FF] border-[#CFE2FF]",
    };

    const currentColors = status === "idle" ? cardColors.idle : cardColors.measuring;

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
                    ${currentColors}
                `}
            >
                <MeasureInfo />
                <MeasureDecibel />
                <NoiseChart />
                <MeasureDS />
            </div>
            <MeasurementButton />
        </>
    );
}