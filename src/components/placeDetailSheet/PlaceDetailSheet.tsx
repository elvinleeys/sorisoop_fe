"use client";

import { useBottomSheetStore } from "@/store/bottomSheet/useBottomSheetStore";
import { ExpandBottomSheet, TimeDBChart } from "soridam-design-system";
import LocationInfo from "../register/registerForm/locationInfo/LocationInfo";
import { formatDateTime } from "@/util/formatDateTime";
import ClientOnlyPortal from "../clientOnlyPortal/ClientOnlyPortal";
import { flexCol, flexRowCenter } from "@/mixin/style";
import { useEffect, useState } from "react";

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

function mapDecibelToLevel(avgDecibel: number): "quiet" | "moderate" | "loud" {
  if (avgDecibel < 70) return "quiet";
  if (avgDecibel < 100) return "moderate";
  return "loud";
}

export default function PlaceDetailSheet() {
    const { isOpen, closeSheet, selectedMarker } = useBottomSheetStore();
    const [data, setData] = useState<PlaceDetailResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const Newtime = new Date();
    const { date, time } = formatDateTime(Newtime);

    // ✅ 현재 시간대
    const currentRange = getCurrentRange();

    // ✅ 마커 클릭 시 데이터 가져오기
    useEffect(() => {
        if (!isOpen || !selectedMarker) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // ❌ 기존: ?date=... → 제거 (누적 데이터 기반 API 사용)
                const res = await fetch(`/api/map/place-detail/${selectedMarker.id}`);

                if (!res.ok) throw new Error("데이터 불러오기 실패");
                const json = await res.json();
                if (!json.success) throw new Error("API 실패");

                setData(json.data);
            } catch (e: any) {
                console.error("PlaceDetail API error:", e);
                setError(e.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isOpen, selectedMarker]);

    // ✅ chart & reviews 안전 처리
    const chartData = data?.chart ?? [];
    const reviews =
        data?.comments.map((c, idx) => ({ id: idx, text: c })) ?? [];
    
    // ✅ 현재 시간대의 평균 dB 가져오기
    const currentSlot = chartData.find((c) => c.timeRange === currentRange);
    const avgDecibel = currentSlot?.db ?? 0;

    // ✅ 수준 계산
    const decibelLevel = mapDecibelToLevel(avgDecibel);

    return (
        <ClientOnlyPortal containerId="place-detail">
            <ExpandBottomSheet 
                isOpen={isOpen} 
                onClose={closeSheet} 
                title="장소 상세보기"
            >
                <section className={`${flexCol} max-h-full min-h-0`}>
                    {loading ? (
                        <p className="p-4 text-center">불러오는 중...</p>
                    ) : data ? (
                        <>
                            <LocationInfo
                                placeName={data.placeName}
                                date={date}
                                time={time}
                                decibelLevel={decibelLevel}
                            />
                            <article className={`${flexRowCenter} w-full my-5`}>
                                <TimeDBChart
                                    data={chartData}
                                    currentRange={currentRange}
                                />
                            </article>
                            <article className="flex-1 min-h-0 flex flex-col">
                                <h4
                                    className="
                                        mb-3
                                        text-base 
                                        !font-bold 
                                        text-neutral-black
                                    "
                                >
                                    한줄평
                                </h4>
                                <div
                                    className={`
                                        flex-1
                                        overflow-y-auto 
                                        pr-2
                                        transition-all duration-300
                                    `}
                                >
                                {reviews.length > 0 ? (
                                    <ul className="space-y-3 pb-16">
                                        {reviews.map((r) => (
                                            <li
                                                key={r.id}
                                                className="
                                                    w-full
                                                    p-2.5
                                                    rounded-[0.42rem]
                                                    bg-neutral-gray-bg
                                                    border border-neutral-gray-soft
                                                    text-base
                                                    text-neutral-black
                                                "
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
                    ) : (
                        <p className="p-4 text-center">데이터가 없습니다.</p>
                    )}
                </section>
            </ExpandBottomSheet>
        </ClientOnlyPortal>
    );
}