"use client";

import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { motion, AnimatePresence } from "framer-motion";
import { MeasureDecibelLabel } from "soridam-design-system";

// 데시벨 값에 따라 레벨을 결정하는 함수
const getDecibelLevel = (db: number, status: string) => {
  if (status === "idle") return "default";
  if (db <= 70) return "quiet";
  if (db > 70 && db < 100) return "moderate";
  if (db >= 100) return "loud";
  return "default";
};

const labelVariants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.3 } },
};

export default function MaxDecibel() {
    const { decibelHistory, status } = useMeasurementStore();

    const averageDb =
        decibelHistory.length > 0
        ? decibelHistory.reduce((sum, db) => sum + db, 0) / decibelHistory.length
        : 0;

    const level = getDecibelLevel(averageDb, status);

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