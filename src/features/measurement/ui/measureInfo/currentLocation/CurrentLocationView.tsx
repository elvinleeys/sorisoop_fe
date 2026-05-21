"use client";

import { flexRow } from "@/mixin/style";
import Image from "next/image";
import { useLocationStore } from "@/entities/location/model/store/locationStore";
import { useCurrentLocationQuery } from "@/entities/location/model/hooks/useCurrentLocationQuery";

export default function CurrentLocationView() {
    const location = useLocationStore((s) => s.location);
    const { isLoading } = useCurrentLocationQuery();

    return (
        <div
            className={`
                ${flexRow}
                items-center
                justify-end
                max-w-[8.625rem]
                h-[1.5rem]
                gap-[0.1875rem]
            `}
        >
            <div className="relative w-[1.25rem] h-[1.25rem]">
                <Image
                    src="/icons/locate-ico.webp"
                    alt="현재 위치 아이콘"
                    fill
                    priority
                />
            </div>
            <p
                className="
                    text-base
                    text-neutral-sub
                    whitespace-nowrap
                    overflow-hidden
                    text-ellipsis
                "
            >
                {isLoading ? "위치 검색중" : location.placeName}
            </p>
        </div>
    );
}
