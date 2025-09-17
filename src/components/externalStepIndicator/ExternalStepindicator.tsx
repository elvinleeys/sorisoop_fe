"use client";

import { flexRow } from "@/mixin/style";
import { usePathname } from "next/navigation";
import { StepIndicator } from "soridam-design-system";

const pageStepMap: Record<string, number> = {
  "/sign-up": 1,
  "/sign-up/step2": 2,
  "/sign-up/step3": 3,
};

export default function ExternalStepIndicator() {
    const path = usePathname();
    const currentStep = pageStepMap[path]; // 기본값 1
    const totalSteps = 3; // 전체 단계 수

    return (
        <nav 
            className={`
                ${flexRow} 
                justify-start 
                w-full
                px-4
                pt-[0.6875rem]
                mb-[2.4375rem] 
            `}
        >
            <StepIndicator 
                currentStep={currentStep} 
                totalSteps={totalSteps}
            />
        </nav>
    );
}