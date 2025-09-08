"use client";

import { useDecibelMeasurement } from "@/hook/useDecibelMeasurement";
import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { useRouter } from "next/navigation";
import { Button } from "soridam-design-system";

export default function PostMeasurementBtn() {
    const router = useRouter();
    // useDecibelMeasurement 훅에서 측정 정지 로직을 가져옵니다.
    const { stopMeasurement: hookStop } = useDecibelMeasurement();
    // useMeasurementStore에서 상태 변경 함수를 가져옵니다.
    const { cancelMeasurement } = useMeasurementStore();

    const handleSave = () => {
        // 추후 측정 결과를 서버에 전송하는 로직을 추가할 수 있습니다.
        // 현재는 'idle' 상태로 되돌리고 페이지 이동을 시뮬레이션합니다.
        // 측정 종료 및 상태 초기화
        hookStop();
        cancelMeasurement();
        router.push("/result");
    };

    const handleCancel = () => {
        // 측정 취소 함수 호출 및 상태 초기화
        hookStop();
        cancelMeasurement();
    };

    return (
        <>
            <div>
              <Button buttonType="primary" size="large" onClick={handleSave}>
                측정 저장
              </Button>
            </div>
            <div>
              <Button buttonType="ghost" size="large" onClick={handleCancel}>
                측정 취소
              </Button>
            </div>
        </>
    );
}