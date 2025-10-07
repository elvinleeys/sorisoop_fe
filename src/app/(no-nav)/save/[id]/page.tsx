"use client";

import { useParams } from "next/navigation";
import SaveDetailMap from "@/components/saveDetail/mapSection/SaveDetailMap";
import ResultDetail from "@/components/saveDetail/resultDetail/ResultDetail";
import GuestNoiseDataView from "@/components/save/guestNoiseDataView/GuestNoiseDataView";
import { fetchMeasurementDataDetail } from "@/services/measurement/fetchMeasurementDataDetail";
import { useQuery } from "@tanstack/react-query";

export default function SaveDetail() {
  const params = useParams();
  const listId = params?.id as string;
  // ✅ React Query로 상세 데이터 요청
  const {
    data,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["measurementDetail", listId],
    queryFn: () => fetchMeasurementDataDetail(listId!),
    enabled: !!listId, // id가 있을 때만 요청
    retry: false,
  });

  // ✅ 로딩 상태
  if (isPending) return <p>로딩 중...</p>;

  // ✅ 인증되지 않은 사용자
  if (isError && error.message === "guest") {
    return <GuestNoiseDataView />;
  }

  // ✅ 기타 오류
  if (isError) {
    return <p>데이터 로드 중 오류가 발생했습니다: {error.message}</p>;
  }

  // ✅ 데이터 없음
  if (!data) {
    return <p>데이터가 없습니다</p>;
  }
  
  return (
    <>
      <SaveDetailMap
        avgDecibel={data.avgDecibel}
        lat={data.place.location.coordinates[1]}
        lng={data.place.location.coordinates[0]}
      />
      <ResultDetail
        placeName={data.place.placeName}
        avgDecibel={data.avgDecibel}
        maxDecibel={data.maxDecibel}
        measuredAt={data.measuredAt}
        comment={data.comment}
      />
    </>
  );
}
