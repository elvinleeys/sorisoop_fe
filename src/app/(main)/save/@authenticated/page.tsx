"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMeasurementData } from "@/services/measurement/fetchMeasurementData";
import NoData from "@/components/save/noData/NoData";
import SaveResultList from "@/components/save/saveResultList/SaveResultList";
import { useAuthStore } from "@/store/auth/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthenticatedSavePage() {
    const router = useRouter();
    const { accessToken, setAccessToken } = useAuthStore();

    const { data, error, isPending, isError } = useQuery({
        queryKey: ["measurementData", accessToken],
        queryFn: fetchMeasurementData,
        retry: false,
        enabled: !!accessToken, // accessToken 있을 때만 요청
    });

    // 🔹 403 (혹은 인증 실패) 시 guest로 이동
    useEffect(() => {
        if (isError) {
            if (
                (error as Error)?.message?.includes("403") ||
                (error as Error)?.message?.includes("Unauthorized") ||
                (error as Error)?.message?.includes("인증 실패")
            ) {
                setAccessToken(null); // 상태 초기화
                router.replace("/save?guest=true"); // guest로 리다이렉트
            }
        }
    }, [isError, error, router, setAccessToken]);

    if (isPending) return;
    if (isError) return <p>오류가 발생했습니다: {error?.message}</p>;
    if (!data || data.length === 0) return <NoData />;

    return <SaveResultList data={data} />;
}
