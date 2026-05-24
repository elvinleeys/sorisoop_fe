"use client";

import { useEffect, useMemo, useState } from "react";
import MapSkeleton from "./MapSkeleton";
import WaveformIcon from "./WaveformIcon";

interface Props {
    isDone?: boolean;
    messages?: string[];
}

const DEFAULT_MESSAGES = [
    "소음 지도를 불러오는 중...",
    "위치 데이터 확인 중...",
    "소음 정보를 렌더링 중...",
    "거의 다 됐어요!",
];
export default function Loading({
    isDone = false,
    messages = DEFAULT_MESSAGES,
}: Props) {
    const [progress, setProgress] = useState(0);

    const currentMessage = useMemo(() => {
        if (progress < 25) return messages[0];
        if (progress < 55) return messages[1];
        if (progress < 80) return messages[2];
        return messages[3];
    }, [progress, messages]);

    useEffect(() => {
        if (isDone) {
            setProgress(100);
            return;
        }

        const interval = setInterval(() => {
            setProgress((prev) => Math.min(prev + Math.random() * 8 + 2, 90));
        }, 120);

        return () => clearInterval(interval);
    }, [isDone]);

    return (
        <div className="relative flex h-screen w-full flex-col bg-[#eaf0f6]">
            <MapSkeleton />
            {/* Shimmer overlay */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute inset-y-0 -left-full w-1/2 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            {/* Center loading card */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-black/[0.08] bg-white/92 px-7 py-5 shadow-sm backdrop-blur-sm">
                    {/* Logo mark */}
                    <div className="flex items-center gap-2">
                        <WaveformIcon />
                        <span className="text-[15px] font-medium tracking-tight text-blue-700">
                            소리담
                        </span>
                    </div>

                    {/* Status text */}
                    <p className="text-[13px] text-slate-500 transition-all duration-300">
                        {currentMessage}
                    </p>

                    {/* Progress bar */}
                    <div className="h-1 w-40 overflow-hidden rounded-full bg-slate-200">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-[width] duration-100 ease-linear"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Pulsing dots */}
                <div className="flex items-center gap-2">
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className="block h-2 w-2 animate-pulse rounded-full bg-blue-500"
                            style={{
                                animationDelay: `${i * 200}ms`,
                                opacity: 1 - i * 0.3,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
