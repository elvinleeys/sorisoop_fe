"use client";

import { flexCol } from "@/mixin/style";
import { useLocationStore } from "@/store/measurement/locationStore";
import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { formatDateTime } from "@/util/formatDateTime";
import LocationInfo from "./locationInfo/LocationInfo";
import DecibelResult from "./decibelResult/DecibelResult";
import ReviewInput from "./reviewInput/ReviewInput";
import { useReviewStore } from "@/store/register/reviewStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToastStore } from "@/store/toast/useToastStore";
import { fetchWrapper } from "@/lib/fetchWrapper";


const getDecibelLevel = (db: number) => {
  if (db <= 70) return "quiet";
  if (db < 100) return "moderate"; // 이미 db > 70 인 상황
  return "loud"; // 나머지는 전부 100 이상
};

export default function RegisterForm() {
    const router = useRouter();
    const addToast = useToastStore((state) => state.addToast);
    const { avgDecibel, maxDecibel, startedAt } = useMeasurementStore();
    const { location } = useLocationStore();
    const { placeName, kakaoPlaceId, location: geo, categoryCode, categoryName } = location;
    const { value: comment, isValid, setSubmitAttempted } = useReviewStore();

    const [isSubmitting, setIsSubmitting] = useState(false);

    // 필수 데이터 없으면 redirect
    useEffect(() => {
        if (!avgDecibel || !maxDecibel || !startedAt || !geo?.coordinates) {
            router.replace("/");
        }
    }, [avgDecibel, maxDecibel, startedAt, geo, router]);

    if (!avgDecibel || !maxDecibel || !startedAt || !geo?.coordinates) return null;

    const decibelLevel = getDecibelLevel(avgDecibel);
    const { date, time } = formatDateTime(startedAt);

    const handleSubmit = async () => {
        setSubmitAttempted(true);
        if (!isValid) return;

        setIsSubmitting(true);

        const hour = startedAt.getHours();
        let timeSlot: "5-11" | "11-18" | "18-22" = "5-11";
        if (hour >= 11 && hour < 18) timeSlot = "11-18";
        else if (hour >= 18 && hour < 22) timeSlot = "18-22";

        const payload = {
            placeName,
            kakaoPlaceId: kakaoPlaceId ?? null,
            location: geo,
            categoryCode: categoryCode || null,
            categoryName: categoryName || null,
            measuredAt: startedAt,
            measuredDate: date,
            timeSlot,
            avgDecibel,
            maxDecibel,
            comment,
        };

        try {
            const data = await fetchWrapper("/api/register", {
                method: "POST",
                body: JSON.stringify(payload),
            });

            console.log("측정 데이터 저장 성공:", data);
            addToast(
                "등록 완료! 측정 데이터와 한줄평이 저장되었습니다. 저장된 정보를 [저장 탭]에서 확인하세요.",
                2000
            );

            // ✅ Zustand 초기화
            useMeasurementStore.getState().cancelMeasurement(); // 측정 데이터 초기화
            useLocationStore.getState().setLocation({
                kakaoPlaceId: null,
                placeName: "위치 검색 중...",
                location: { type: "Point", coordinates: null },
                categoryCode: null,
                categoryName: null,
            });
            useReviewStore.getState().reset();
            router.push("/"); // 저장 후 이동
        } catch (err: unknown) {
            if (err instanceof Error) console.error(err.message);
            else console.error("Unknown error", err);
            setIsSubmitting(false);
            addToast("측정 데이터 저장에 실패했습니다.", 2000);
        }
    };

    return (
        <section>
            <form className={`${flexCol} gap-[1.25rem]`}>
                <LocationInfo placeName={placeName!} decibelLevel={decibelLevel} date={date} time={time} />
                <DecibelResult avgDecibel={avgDecibel} maxDecibel={maxDecibel} />
                <ReviewInput onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </form>
        </section>
    );
}
