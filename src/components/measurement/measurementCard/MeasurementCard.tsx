"use client";

import { motion } from "framer-motion";
import { useMeasurementStore } from "@/store/measurement/measurementStore";
import NoiseChart from "../chart/NoiseChart";
import MeasureDecibel from "../measureDecibel/MeasureDecibel";
import { MeasureDS } from "../measureDescription/MeasureDS";
import MeasureInfo from "../measureInfo/MeasureInfo";
import MeasurementButton from "../measurementButton/MeasurementButton";

export default function MeasurementCard() {
    const { status } = useMeasurementStore();

    // 상태에 따른 배경색 및 테두리 색상
    const cardColors = {
        idle: {
            backgroundColor: "#F4F4F4",
            borderColor: "#D7D7D7"
        },
        measuring: {
            backgroundColor: "#F4F8FF",
            borderColor: "#CFE2FF"
        },
        finished: {
            backgroundColor: "#F4F8FF",
            borderColor: "#CFE2FF"
        }
    };

    // 현재 상태에 맞는 색상 선택
    const currentColors = status === "idle" ? cardColors.idle : cardColors.measuring;

    return (
        <>
            <motion.div 
                className="
                    w-full
                    h-[27.75rem]
                    pt-[0.875rem]
                    px-[1rem] 
                    pb-[1.0625rem]
                    mb-[1.125rem]
                    rounded-[1rem]
                    border-2
                "
                animate={{ 
                    backgroundColor: currentColors.backgroundColor,
                    borderColor: currentColors.borderColor 
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <MeasureInfo />
                <MeasureDecibel />
                <NoiseChart />
                <MeasureDS />
            </motion.div>
            <MeasurementButton />
        </>
    );
}