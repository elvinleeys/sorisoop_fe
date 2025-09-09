"use client";

import { flexCol } from "@/mixin/style";
import { useLocationStore } from "@/store/measurement/locationStore";
import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { formatDateTime } from "@/util/formatDateTime";
import { useState } from "react";
import LocationInfo from "./locationInfo/LocationInfo";
import DecibelResult from "./decibelResult/DecibelResult";
import ReviewInput from "./reviewInput/ReviewInput";


const getDecibelLevel = (db: number) => {
    if (db <= 70) return "quiet";
    if (db > 70 && db < 100) return "moderate";
    if (db >= 100) return "loud";
    return "quiet";
};

export default function RegisterForm() {
    const [value, setValue] = useState("");
    const { avgDecibel, maxDecibel, startedAt } = useMeasurementStore();
    const { location } = useLocationStore();
    const { placeName, latitude:lat, longitude: lng } = location;

    const decibelLevel = getDecibelLevel(avgDecibel);
    const targetDate = startedAt ?? new Date();
    const { date, time } = formatDateTime(targetDate);

    const handleSubmit = () => {
        const data = {
            lat,
            lng,
            date: targetDate,
            avgDecibel,
            maxDecibel,
            review: value,
        };
        console.log("form submit data:", data);
        // API 요청
    };

    return (
        <section>
            <form className={`${flexCol} gap-[1.25rem]`}>
                <LocationInfo placeName={placeName!} decibelLevel={decibelLevel} date={date} time={time} />
                <DecibelResult avgDecibel={avgDecibel} maxDecibel={maxDecibel} />
                <ReviewInput value={value} onChange={setValue} onSubmit={handleSubmit} />
            </form>
        </section>
    );
}
