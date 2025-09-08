"use client";

import { useDecibelMeasurement } from "@/hook/useDecibelMeasurement";
import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { Button } from "soridam-design-system";

export default function StartButton() {
    // useDecibelMeasurement 훅에서 측정 시작/정지 로직을 가져옵니다.
    const { startMeasurement: hookStart } = useDecibelMeasurement();
    // useMeasurementStore에서 상태 변경 함수를 가져옵니다.
    const { startMeasurement, addDecibel, setCurrentDecibel } = useMeasurementStore();

    const handleStart = () => {
        // Zustand 상태를 'measuring'으로 변경하고, 시작 시간을 기록합니다.
        startMeasurement();
        // 데시벨 측정 훅을 호출하여 실제 측정을 시작합니다.
        hookStart(addDecibel, setCurrentDecibel);
    };

    return (
        <Button buttonType="primary" size="large" onClick={handleStart}>
            측정 시작
        </Button>
    );
}