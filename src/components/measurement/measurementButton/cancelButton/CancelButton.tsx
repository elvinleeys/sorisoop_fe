"use client";

import { useDecibelMeasurement } from "@/hook/useDecibelMeasurement";
import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { Button } from "soridam-design-system";

export default function CancelButton() {
    // useDecibelMeasurement 훅에서 측정 정지 로직을 가져옵니다.
    const { stopMeasurement: hookStop } = useDecibelMeasurement();
    // useMeasurementStore에서 상태 변경 함수를 가져옵니다.
    const { cancelMeasurement } = useMeasurementStore();

    const handleCancel = () => {
        // 데시벨 측정 훅을 호출하여 실제 측정을 정지합니다.
        hookStop();
        // Zustand 상태를 'idle'로 초기화합니다.
        cancelMeasurement();
    };

    return (
        <Button buttonType="secondary" size="large" onClick={handleCancel}>
            측정 취소
        </Button>
    );
}