"use client";

import { flexCol, flexRow, flexRowBetween, flexRowCenter } from "@/mixin/style";
import { formatDateTime } from "@/util/formatDateTime";
import Image from "next/image";
import Link from "next/link";
import { Decibel } from "soridam-design-system";

interface SaveResultProps {
  id: string;
}

export default function SaveResult({ id }: SaveResultProps) {
    const date1 = new Date();
    const { date, time } = formatDateTime(date1);

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
                    <Decibel level="quiet" size="lg" />
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
                                합정 앤트러사이트
                            </h3>
                            <div className={`${flexRow} gap-1`}>
                                <time className="text-sm text-neutral-sub">
                                    {date}
                                </time>
                                <time className="text-sm text-neutral-sub">
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
                            className={`
                                w-[4.0625rem] 
                                h-[1.875rem] 
                                ${flexRowCenter} 
                                rounded-md 
                                bg-[#F5F5F5] 
                                text-sm 
                                !font-medium 
                                text-neutral-sub
                            `}
                        >
                            평균 65
                        </span>
                        <span 
                            className={`
                                w-[4.0625rem] 
                                h-[1.875rem] 
                                ${flexRowCenter} 
                                rounded-md 
                                bg-[#F5F5F5] 
                                text-sm 
                                !font-medium 
                                text-neutral-sub
                            `}
                        >
                            최대 65
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}