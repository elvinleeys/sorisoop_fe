"use client";

import { useLocationStore } from "@/store/measurement/locationStore";
import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { formatDateTime } from "@/util/formatDateTime";
import LocationInfo from "./locationInfo/LocationInfo";
import DecibelResult from "./decibelResult/DecibelResult";
import ReviewInput from "./reviewInput/ReviewInput";
import { useReviewStore } from "@/store/register/reviewStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToastStore } from "@/store/toast/useToastStore";
import { getDecibelLevel } from "@/util/getDecibelLevel";
import { useMutation } from "@tanstack/react-query";
import { registerMeasurement, RegisterPayload } from "@/services/measurement/register";

export default function RegisterForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const router = useRouter();
    const addToast = useToastStore((state) => state.addToast);
    const { avgDecibel, maxDecibel, startedAt, cancelMeasurement } = useMeasurementStore();
    const { location, setLocation } = useLocationStore();
    const { placeName, kakaoPlaceId, location: geo, categoryCode, categoryName } = location;
    const { value: comment, isValid, setSubmitAttempted, reset } = useReviewStore();

    const mutation = useMutation({
        mutationFn: (payload: RegisterPayload) => registerMeasurement(payload),
        onSuccess: () => {
            addToast(
                "등록 완료! 측정 데이터와 한줄평이 저장되었습니다. 저장된 정보를 [저장 탭]에서 확인하세요.",
                2000
            );
            resetRegisterState();
            router.push("/");
        },
        onError: (err: unknown) => {
            if (err instanceof Error) console.error(err.message);
            else console.error("Unknown error", err);
            setIsSubmitting(false);
            addToast("측정 데이터 저장에 실패했습니다.", 2000);
        },
    });

    if (!avgDecibel || !maxDecibel || !startedAt || !geo?.coordinates) return null;
    const decibelLevel = getDecibelLevel(avgDecibel);
    const { date, time } = formatDateTime(startedAt);

    const getTimeSlot = (date: Date) => {
        const hour = date.getHours();
        if (hour >= 5 && hour < 11) return "5-11";
        if (hour >= 11 && hour < 18) return "11-18";
        if (hour >= 18 && hour < 22) return "18-22";
        return "5-11";
    };

    const resetRegisterState = () => {
        cancelMeasurement();
        setLocation({
            kakaoPlaceId: null,
            placeName: "위치 검색 중...",
            location: { type: "Point", coordinates: null },
            categoryCode: null,
            categoryName: null,
        });
        reset();
    };

    const handleSubmit = () => {
        setSubmitAttempted(true);
        if (!isValid) return;

        setIsSubmitting(true);

        const payload: RegisterPayload = {
            placeName: placeName!,
            kakaoPlaceId: kakaoPlaceId ?? null,
            location: geo,
            categoryCode: categoryCode || null,
            categoryName: categoryName || null,
            measuredAt: startedAt,
            measuredDate: date,
            timeSlot: getTimeSlot(startedAt),
            avgDecibel,
            maxDecibel,
            comment,
        };

        mutation.mutate(payload);
    };

    return (
        <section>
            <form className="flex flex-col gap-[1.25rem]">
                <LocationInfo placeName={placeName!} decibelLevel={decibelLevel} date={date} time={time} />
                <DecibelResult avgDecibel={avgDecibel} maxDecibel={maxDecibel} />
                <ReviewInput onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </form>
        </section>
    );
}
