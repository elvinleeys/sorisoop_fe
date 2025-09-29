"use client";

import SaveDetailMap from "@/components/saveDetail/mapSection/SaveDetailMap";
import ResultDetail from "@/components/saveDetail/resultDetail/ResultDetail";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PlaceDTO {
  id: string;               // _id를 string으로 변환
  placeName: string;
  location: { type: "Point"; coordinates: [number, number] };
  categoryCode: "CT1" | "AT4" | "FD6" | "CE7" | "";
  categoryName: "문화시설" | "관광명소" | "음식점" | "카페" | "";
}

interface MeasurementDetail {
  id: string;
  avgDecibel: number;
  maxDecibel: number;
  measuredAt: string;
  place: PlaceDTO;
  comment: string;
  lat: number; // Place에 좌표가 저장돼 있다면 포함
  lng: number;
}

export default function SaveDetail() {
    const params = useParams();
    const listId = params?.id as string;

    const [data, setData] = useState<MeasurementDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!listId) return;

        const fetchDetail = async () => {
            try {
                const result = await fetchWrapper<MeasurementDetail>(`/api/get-measurement/${listId}`, {
                    credentials: "include",
                });
                // console.log("result 출력", result)
                setData(result);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [listId]);

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