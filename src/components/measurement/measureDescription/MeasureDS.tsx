"use client";

import { flexColCenter } from "@/mixin/style";
import { useMeasurementStore } from "@/store/measurement/measurementStore";

export function MeasureDS() {
    const { status } = useMeasurementStore();

    // 상태에 따른 문구
    const text = {
        idle: ["소음 측정을 시작할 준비가 됐어요!", "평균값을 얻으려면 15초 동안 측정해볼게요."],
        measuring: ["소음을 측정 중이에요!", "잠시만 기다려주세요, 평균값을 계산 중입니다."],
        finished: ["측정이 완료되었어요!", "측정 결과를 저장하거나 다시 측정할 수 있어요."]
    };

    const currentText = text[status] || text.idle;

    return (
        <div 
            className={`
                ${flexColCenter} 
                w-full 
                min-h-[2.5rem]
            `}
        >
            <p className="text-sm text-neutral-sub text-center">
                {currentText[0]}
            </p>
            <p className="text-sm text-neutral-sub text-center">
                {currentText[1]}
            </p>
        </div>
    );
}