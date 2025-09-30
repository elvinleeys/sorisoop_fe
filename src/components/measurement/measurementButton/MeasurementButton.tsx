"use client";

import { flexCol } from "@/mixin/style";
import { Button } from "soridam-design-system";
import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { useDecibelMeasurement } from "@/hook/useDecibelMeasurement";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useToastStore } from "@/store/toast/useToastStore";
import { useAuthStore } from "@/store/auth/authStore";
import FadeInUp from "@/components/animate/fadeInUp/FadeInUp";

export default function MeasurementButton() {
  const {
    status,
    startMeasurement,
    cancelMeasurement,
    addDecibel,
    setCurrentDecibel,
  } = useMeasurementStore();

  const addToast = useToastStore((state) => state.addToast);
  const { startMeasurement: startDecibel, stopMeasurement: stopDecibel } =
    useDecibelMeasurement();
  const { accessToken } = useAuthStore();
  const router = useRouter();

  /** 시작 버튼 클릭 */
  const handleStart = useCallback(() => {
    startMeasurement();
    startDecibel(addDecibel, setCurrentDecibel);
  }, [startMeasurement, startDecibel, addDecibel, setCurrentDecibel]);

  /** 취소 버튼 클릭 */
  const handleCancel = useCallback(() => {
    stopDecibel();
    cancelMeasurement();
    addToast("측정이 취소되었습니다.", 2000);
  }, [stopDecibel, cancelMeasurement, addToast]);

  /** 저장 버튼 클릭 */
  const handleSave = useCallback(() => {
    stopDecibel();

    if (!accessToken) {
      addToast("측정 데이터를 저장하려면 로그인이 필요합니다.", 2000);
      cancelMeasurement();
      return;
    }

    addToast("저장 완료! 다음 단계로 이동합니다.", 2000);
    router.push("/register");
  }, [stopDecibel, cancelMeasurement, accessToken, addToast, router]);

  /** 상태별 버튼 매핑 */
  const buttonMap = {
    idle: (
      <Button buttonType="primary" size="large" onClick={handleStart}>
        측정 시작
      </Button>
    ),
    measuring: (
      <Button buttonType="secondary" size="large" onClick={handleCancel}>
        측정 취소
      </Button>
    ),
    finished: (
      <div className={`${flexCol} gap-1 w-full items-center`}>
        <Button buttonType="primary" size="large" onClick={handleSave}>
          측정 저장
        </Button>
        <Button buttonType="ghost" size="large" onClick={handleCancel}>
          측정 취소
        </Button>
      </div>
    ),
  };

  return (
    <FadeInUp 
        keyProp={status} 
        className="flex justify-center w-full"
    >
        {buttonMap[status]}
    </FadeInUp>
  );
}
