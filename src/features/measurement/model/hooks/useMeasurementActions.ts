"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth/authStore";
import { useToastStore } from "@/store/toast/useToastStore";

import { useMeasurementSessionStore } from "../store/measurement-session";
import { useMeasurementController } from "./useMeasurementController";

export function useMeasurementActions() {
    const router = useRouter();

    const addToast = useToastStore((s) => s.addToast);
    const accessToken = useAuthStore((s) => s.accessToken);

    const { status, resetMeasurement } = useMeasurementSessionStore();

    const controller = useMeasurementController();

    const handleStart = async () => {
        try {
            await controller.start();
        } catch {
            resetMeasurement();
        }
    };

    const handleCancel = () => {
        controller.stop();
        resetMeasurement();
        addToast("측정이 취소되었습니다.", 2000);
    };

    const handleSave = () => {
        controller.stop();

        if (!accessToken) {
            addToast("측정 데이터를 저장하려면 로그인이 필요합니다.", 2000);

            resetMeasurement();
            return;
        }

        router.push("/register");
    };

    return {
        status,
        handleStart,
        handleCancel,
        handleSave,
    };
}
