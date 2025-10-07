"use client";

import GuestNoiseDataView from "@/components/save/guestNoiseDataView/GuestNoiseDataView";
import NoData from "@/components/save/noData/NoData";
import SaveResultList from "./saveResultList/SaveResultList";
import { useEffect } from "react";
import { useSidebarStore } from "@/store/sideBar/SideBarStore";
import { useAuthStore } from "@/store/auth/authStore";
import { useQuery } from "@tanstack/react-query";
import { fetchMeasurementData } from "@/services/measurement/fetchMeasurementData";

export default function SaveMainPage() {
  const { accessToken } = useAuthStore();
  const { close: sidebarClose } = useSidebarStore();

  useEffect(() => {        // accessToken 변경 시 데이터 재요청
    sidebarClose();     // 사이드바 닫기
  }, [accessToken]);

  // ✅ React Query 적용
  const {
    data,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["measurementData", accessToken],
    queryFn: fetchMeasurementData,
    retry: false, // 인증 실패 시 불필요한 재시도 방지
  });

  if (isPending) return <p>Loading...</p>;

  if (!accessToken || (isError && error?.message === "guest")) {
    return <GuestNoiseDataView />;
  }

  if (isError) {
    return <p>오류가 발생했습니다: {error.message}</p>;
  }

  if (!data || data.length === 0) {
    return <NoData />;
  }

  return <SaveResultList data={data} />;
}
