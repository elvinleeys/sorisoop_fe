"use client";

import { useBottomSheetStore } from "@/store/bottomSheet/useBottomSheetStore";
import { ExpandBottomSheet, TimeDBChart } from "soridam-design-system";
import LocationInfo from "../register/registerForm/locationInfo/LocationInfo";
import { formatDateTime } from "@/util/formatDateTime";
import ClientOnlyPortal from "../clientOnlyPortal/ClientOnlyPortal";
import { flexCol, flexRowCenter } from "@/mixin/style";
import { useEffect, useState } from "react";
import { fetchPlaceDetail } from "@/services/map/fetchPlaceDetail";
import { getDecibelLevel } from "@/util/getDecibelLevel";

interface PlaceDetailResponse {
  placeName: string;
  chart: { timeRange: string; db: number; count: number }[];
  comments: string[];
}

function getCurrentRange(): "5-11" | "11-18" | "18-22" {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return "5-11";
  if (hour >= 11 && hour < 18) return "11-18";
  return "18-22";
}

export default function PlaceDetailSheet() {
    const { isOpen, closeSheet, selectedMarker } = useBottomSheetStore();
    const [data, setData] = useState<PlaceDetailResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const Newtime = new Date();
    const { date, time } = formatDateTime(Newtime);

    const currentRange = getCurrentRange();

    useEffect(() => {
        if (!isOpen || !selectedMarker) return;

        setLoading(true);
        setError(null);

        fetchPlaceDetail(selectedMarker.id)
        .then(setData)
        .catch((e) => {
            console.error(e);
            setError(e.message);
            setData(null);
        })
        .finally(() => setLoading(false));
    }, [isOpen, selectedMarker]);

    const chartData = data?.chart ?? [];
    const reviews = data?.comments.map((c, idx) => ({ id: idx, text: c })) ?? [];

    const currentSlot = chartData.find((c) => c.timeRange === currentRange);
    const avgDecibel = currentSlot?.db ?? 0;

    // ✅ util 함수 사용
    const decibelLevel = getDecibelLevel(avgDecibel);

    return (
        <ClientOnlyPortal containerId="place-detail">
            <ExpandBottomSheet 
                isOpen={isOpen} 
                onClose={closeSheet} 
                title="장소 상세보기"
            >
                <section className={`${flexCol} max-h-full min-h-0`}>
                    {loading && (
                        <p className="p-4 text-center">
                            불러오는 중...
                        </p>
                    )}
                    {error && (
                        <p className="p-4 text-center text-red-500">
                            {error}
                        </p>
                    )}
                    {!loading && data && (
                        <>
                            <LocationInfo
                                placeName={data.placeName}
                                date={date}
                                time={time}
                                decibelLevel={decibelLevel}
                            />
                            <article className={`${flexRowCenter} w-full my-5`}>
                                <TimeDBChart data={chartData} currentRange={currentRange} />
                            </article>
                            <article className="flex-1 min-h-0 flex flex-col">
                                <h4 className="mb-3 text-base !font-bold text-neutral-black">한줄평</h4>
                                <div className="flex-1 overflow-y-auto pr-2 transition-all duration-300">
                                {reviews.length > 0 ? (
                                    <ul className="space-y-3 pb-16">
                                    {reviews.map((r) => (
                                        <li
                                        key={r.id}
                                        className="w-full p-2.5 rounded-[0.42rem] bg-neutral-gray-bg border border-neutral-gray-soft text-base text-neutral-black"
                                        >
                                        {r.text}
                                        </li>
                                    ))}
                                    </ul>
                                ) : (
                                    <p className="text-neutral-gray-dark text-sm">
                                    아직 등록된 한줄평이 없습니다.
                                    </p>
                                )}
                                </div>
                            </article>
                        </>
                    )}
                </section>
            </ExpandBottomSheet>
        </ClientOnlyPortal>
    );
}