"use client";

import { flexCol, flexRow, flexRowBetween, flexRowCenter } from "@/mixin/style";
import { Measurement } from "@/types/dto/savelist";
import { formatDateTime } from "@/util/formatDateTime";
import { getDecibelLevel } from "@/util/getDecibelLevel";
import Image from "next/image";
import Link from "next/link";
import { Decibel } from "soridam-design-system";

export default function SaveResult({
  id,
  placeName,
  avgDecibel,
  maxDecibel,
  measuredAt,
}: Measurement) {
    const dateTime = new Date(measuredAt)
    const { date, time } = formatDateTime(dateTime);
    const decibelLevel = getDecibelLevel(avgDecibel);

    const dateTimeTextStyle = "text-sm text-neutral-sub";
    const decibelBoxStyle = `w-[4.0625rem] h-[1.875rem] ${flexRowCenter} rounded-md bg-[#F5F5F5] text-sm !font-medium text-neutral-sub`;

    return (
        <Link href={`/save/${id}`} className="block">
            <article 
                className={`
                    w-full
                    py-[1.25rem] 
                    pl-[0.625rem]
                    ${flexRow}
                    gap-[1rem]
                    rounded-[0.75rem]
                    bg-white 
                `}
            >
                <div 
                    className={`
                        w-12 
                        h-12 
                        ${flexRowCenter}
                        rounded-full 
                        bg-[#F5F5F5] 
                        p-2.5
                    `}
                >
                    <Decibel level={decibelLevel} size="lg" />
                </div>
                <div 
                    className={`
                        w-full 
                        h-[5.375rem]
                        ${flexCol}
                        justify-center
                        gap-2
                    `}
                >
                    <div className={`${flexRowBetween}`}>
                        <div className={`${flexCol} gap-1`}>
                            <h3 className="text-base !font-bold text-neutral-black">
                                {placeName}
                            </h3>
                            <div className={`${flexRow} gap-1`}>
                                <time className={dateTimeTextStyle}>
                                    {date}
                                </time>
                                <time className={dateTimeTextStyle}>
                                    {time}
                                </time>
                            </div>
                        </div>
                        <div className="w-12 h-12 relative">
                            <Image src="/icons/next-ico.svg" alt="이동 버튼" fill priority />
                        </div>
                    </div>
                    <div className={`${flexRow} gap-2`}>
                        <span 
                            className={decibelBoxStyle}
                        >
                            평균 {avgDecibel.toFixed(0)}
                        </span>
                        <span 
                            className={decibelBoxStyle}
                        >
                            최대 {maxDecibel.toFixed(0)}
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}