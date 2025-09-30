"use client";

import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { getDecibelLevel } from "@/util/getDecibelLevel";
import { motion, AnimatePresence } from "framer-motion";
import { MeasureDecibelLabel } from "soridam-design-system";

const labelVariants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.3 } },
};

export default function DecibelLevel() {
    const { avgDecibel, status } = useMeasurementStore();

    // store에서 이미 관리되는 avgDecibel 사용
    const level = getDecibelLevel(avgDecibel, status);

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={level} // level이 바뀔 때마다 애니메이션이 재실행되도록 key를 설정합니다.
                variants={labelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <MeasureDecibelLabel level={level} />
            </motion.div>
        </AnimatePresence>
    );
}