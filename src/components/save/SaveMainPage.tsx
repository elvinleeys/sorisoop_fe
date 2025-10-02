"use client";

import GuestNoiseDataView from "@/components/save/guestNoiseDataView/GuestNoiseDataView";
import NoData from "@/components/save/noData/NoData";
import SaveResultList from "./saveResultList/SaveResultList";
import { useMeasurementData } from "@/hook/useMeasurementData";
import { useEffect } from "react";
import { useSidebarStore } from "@/store/sideBar/SideBarStore";
import { useAuthStore } from "@/store/auth/authStore";

export default function SaveMainPage() {
  const { accessToken } = useAuthStore();
  const { data, status } = useMeasurementData();
  const { close: sidebarClose } = useSidebarStore();

  useEffect(() => {        // accessToken 변경 시 데이터 재요청
    sidebarClose();     // 사이드바 닫기
  }, [accessToken]);

  switch (status) {
    case "loading":
      return <p>Loading...</p>;
    case "guest":
      return <GuestNoiseDataView />;
    case "empty":
      return <NoData />;
    case "data":
      return <SaveResultList data={data} />;
    default:
      return null;
  }
}
