"use client";

import { useParams } from "next/navigation";
import { useMeasurementDataDetail } from "@/hook/useMeasurementDataDetail";
import SaveDetailMap from "@/components/saveDetail/mapSection/SaveDetailMap";
import ResultDetail from "@/components/saveDetail/resultDetail/ResultDetail";

export default function SaveDetail() {
  const params = useParams();
  const listId = params?.id as string;
  const { data, loading } = useMeasurementDataDetail(listId);

  if (loading) return <p>로딩 중...</p>;
  if (!data) return <p>데이터가 없습니다</p>;

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
