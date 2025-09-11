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
import { useEffect } from "react";


const getDecibelLevel = (db: number) => {
  if (db <= 70) return "quiet";
  if (db < 100) return "moderate"; // 이미 db > 70 인 상황
  return "loud"; // 나머지는 전부 100 이상
};

export default function RegisterForm() {
    const router = useRouter();
    const { avgDecibel, maxDecibel, startedAt } = useMeasurementStore();
    const { location } = useLocationStore();
    const { placeName, latitude:lat, longitude: lng } = location || {};

    const { value, isValid, setSubmitAttempted } = useReviewStore();

    // ✅ 필수 데이터가 없으면 원래 페이지로 redirect
    useEffect(() => {
        if (
            avgDecibel === undefined ||
            maxDecibel === undefined ||
            !startedAt
        ) {
            router.replace("/"); 
        }
    }, [avgDecibel, maxDecibel, startedAt, router]);

    if (
        avgDecibel === undefined ||
        maxDecibel === undefined ||
        !startedAt
    ) {
        return null; // redirect 중이므로 UI 렌더링 방지
    }

    const decibelLevel = getDecibelLevel(avgDecibel);
    const { date, time } = formatDateTime(startedAt);

    

    const handleSubmit = () => {
        setSubmitAttempted(true);

        if (!isValid) {
            console.log("Review is not valid");
            return;
        }

        const data = {
            lat,
            lng,
            date: startedAt,
            avgDecibel,
            maxDecibel,
            review: value,
        };
        console.log("form submit data:", data);
        // API 요청
        router.push("/");
    };


    return (
        <section>
            <form className={`${flexCol} gap-[1.25rem]`}>
                <LocationInfo placeName={placeName!} decibelLevel={decibelLevel} date={date} time={time} />
                <DecibelResult avgDecibel={avgDecibel} maxDecibel={maxDecibel} />
                <ReviewInput onSubmit={handleSubmit} />
            </form>
        </section>
    );
}
