"use client";

import { flexCol, flexRowBetween } from "@/mixin/style";
import { DecibelLabel } from "soridam-design-system";

interface LocationInfoProps {
    placeName: string;
    decibelLevel: "quiet" | "moderate" | "loud";
    date: string;
    time: string;
}

export default function LocationInfo({ placeName, decibelLevel, date, time }: LocationInfoProps) {
    const textStyle = "text-base text-neutral-sub"

    return (
        <article className={`${flexCol} gap-[0.25rem] w-full`}>
            <div className={`w-full h-[1.5rem] ${flexRowBetween}`}>
                <h2 className="text-xl font-bold text-neutral-black">
                    {placeName}
                </h2>
                <DecibelLabel level={decibelLevel} />
            </div>
            <div className={`w-full h-[1.5rem] flex gap-[0.25rem]`}>
                <time className={textStyle}>{date}</time>
                <time className={textStyle}>{time}</time>
            </div>
        </article>
    );
}