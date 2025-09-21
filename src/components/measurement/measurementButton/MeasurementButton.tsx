"use client";

import { AnimatePresence, motion } from "framer-motion";
import { flexCol, flexRowCenter } from "@/mixin/style";
import { Button } from "soridam-design-system";
import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { useDecibelMeasurement } from "@/hook/useDecibelMeasurement";
import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation"; // useRouter 훅 추가
import { useToastStore } from "@/store/toast/useToastStore";
import { useAuthStore } from "@/store/auth/authStore";

const buttonTransition = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
  transition: { duration: 0.3 }
};

export default function MeasurementButton() {
    const { 
            status, 
            startMeasurement, 
            cancelMeasurement, 
            addDecibel, 
            setCurrentDecibel 
    } = useMeasurementStore();
    const addToast = useToastStore((state) => state.addToast);

    const { startMeasurement: startDecibel, stopMeasurement: stopDecibel } = useDecibelMeasurement();
    const { accessToken } = useAuthStore();

    const router = useRouter(); // router 훅 추가

    // 버튼 ref 생성
    const startBtnRef = useRef<HTMLButtonElement | null>(null);
    const cancelBtnRef = useRef<HTMLButtonElement | null>(null);
    const saveBtnRef = useRef<HTMLButtonElement | null>(null);
    const postCancelBtnRef = useRef<HTMLButtonElement | null>(null);

    const handleStart = useCallback(() => {
        startMeasurement(); // Zustand 상태 변경
        startDecibel(addDecibel, setCurrentDecibel); // 실제 마이크 측정 시작
    }, [startMeasurement, startDecibel, addDecibel, setCurrentDecibel]);

    const handleCancel = useCallback(() => {
        stopDecibel(); // 마이크 종료
        cancelMeasurement(); // Zustand 상태 초기화
        addToast("측정이 취소되었습니다.", 2000);
    }, [stopDecibel, cancelMeasurement, addToast]);

    const handleSave = useCallback(async () => {
        stopDecibel();

        if (!accessToken) {
            addToast("측정 데이터를 저장하려면 로그인이 필요합니다.", 2000);
            cancelMeasurement(); // Zustand 상태 초기화
            return;
        }

        addToast("저장 완료! 다음 단계로 이동합니다.", 2000);
        router.push("/register");
    }, [stopDecibel, cancelMeasurement, accessToken, addToast, router]);

    return (
        <AnimatePresence mode="wait" initial={false}>
            {status === "idle" && (
                <motion.div 
                    {...buttonTransition} 
                    className={`
                        ${flexRowCenter} 
                        w-full
                    `} 
                    key="start"
                >
                    <Button 
                        ref={startBtnRef} 
                        buttonType="primary" 
                        size="large" 
                        onClick={handleStart}
                    >
                        측정 시작
                    </Button>
                </motion.div>
            )}

            {status === "measuring" && (
                <motion.div 
                    {...buttonTransition} 
                    className={`
                        ${flexRowCenter} 
                        w-full
                    `} 
                    key="cancel"
                >
                    <Button 
                        ref={cancelBtnRef} 
                        buttonType="secondary" 
                        size="large" 
                        onClick={handleCancel}
                    >
                        측정 취소
                    </Button>
                </motion.div>
            )}

            {status === "finished" && (
                <motion.div 
                    {...buttonTransition} 
                    className={`
                        ${flexCol} 
                        gap-1 
                        w-full 
                        items-center
                    `} 
                    key="post"
                >
                    <Button 
                        key="saveBtn"
                        ref={saveBtnRef}
                        buttonType="primary" 
                        size="large" 
                        onClick={handleSave}
                    >
                        측정 저장
                    </Button>
                    <Button 
                        key="cancelBtn"
                        ref={postCancelBtnRef}
                        buttonType="ghost" 
                        size="large" 
                        onClick={handleCancel}
                    >
                        측정 취소
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
    }