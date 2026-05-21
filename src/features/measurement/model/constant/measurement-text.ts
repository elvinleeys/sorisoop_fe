import { MeasurementStatus } from "../store/measurement-session";

export const MEASUREMENT_TEXT: Record<MeasurementStatus, [string, string]> = {
    idle: [
        "소음 측정을 시작할 준비가 됐어요!",
        "평균값을 얻으려면 15초 동안 측정해볼게요.",
    ],

    preparing: [
        "마이크를 준비하고 있어요",
        "잠시만 기다려주세요, 곧 측정을 시작할 수 있어요.",
    ],

    measuring: [
        "소음을 측정 중이에요!",
        "잠시만 기다려주세요, 평균값을 계산 중입니다.",
    ],

    readyToSave: [
        "측정이 완료되었어요!",
        "측정 결과를 저장하거나 다시 측정할 수 있어요.",
    ],
};
