"use client";

import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { AnimatePresence, motion } from "framer-motion";
import StartButton from "./startButton/StartButton";
import CancelButton from "./cancelButton/CancelButton";
import PostMeasurementBtn from "./postMeasurementActions/PostMeasurementBtn";
import { flexCol, flexRowCenter } from "@/mixin/style";

const buttonTransition = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.3 }
};

export default function MeasurementButton() {
    const { status } = useMeasurementStore();

    return (
        <AnimatePresence mode="wait" initial={false}>
            {status === "idle" && (
                <motion.div 
                    key="start" 
                    {...buttonTransition} 
                    className={`${flexRowCenter} w-full`}
                >
                    <StartButton />
                </motion.div>
            )}

            {status === "measuring" && (
                <motion.div 
                    key="cancel" 
                    {...buttonTransition} 
                    className={`${flexRowCenter} w-full`}
                >
                    <CancelButton />
                </motion.div>
            )}

            {status === "finished" && (
                <motion.div 
                    key="post" 
                    {...buttonTransition} 
                    className={`
                        ${flexCol} 
                        gap-[0.375rem] 
                        w-full
                        items-center
                    `}
                >
                    <PostMeasurementBtn />
                </motion.div>
            )}
        </AnimatePresence>
    );
}