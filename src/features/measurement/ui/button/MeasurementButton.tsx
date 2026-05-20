"use client";

import FadeInUp from "@/components/animate/fadeInUp/FadeInUp";

import { SaveButtonGroup } from "./SaveButtonGroup";
import { useMeasurementActions } from "../../model/hooks/useMeasurementActions";
import { Button } from "soridam-design-system";

export default function MeasurementButton() {
    const { status, handleStart, handleCancel, handleSave } =
        useMeasurementActions();
    const isCancleState = status === "preparing" || status === "measuring";
    const cancelLabel = status === "preparing" ? "준비 취소" : "측정 취소";

    return (
        <FadeInUp keyProp={status} className="flex justify-center w-full">
            {status === "idle" && (
                <Button buttonType="primary" size="large" onClick={handleStart}>
                    측정 시작
                </Button>
            )}
            {isCancleState && (
                <Button
                    buttonType="secondary"
                    size="large"
                    onClick={handleCancel}
                >
                    {cancelLabel}
                </Button>
            )}
            {status === "readyToSave" && (
                <SaveButtonGroup onSave={handleSave} onCancel={handleCancel} />
            )}
        </FadeInUp>
    );
}
