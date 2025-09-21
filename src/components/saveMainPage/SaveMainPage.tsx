"use client";

import GuestNoiseDataView from "@/components/save/guestNoiseDataView/GuestNoiseDataView";
import NoData from "@/components/save/noData/NoData";
import SaveResult from "@/components/save/saveResult/SaveResult";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { Measurement } from "@/types/save/savelist";
import { useEffect, useState } from "react";

export default function SaveMainPage() {
    const [data, setData] = useState<Measurement[]>([]);
    const [loading, setLoading] = useState(true);
    const [isGuest, setIsGuest] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetchWrapper<Measurement[]>("/api/get-list");
                // console.log("data 출력", res);
                
                setData(res);
            } catch (err: any) {
                if (err.message === "Unauthorized") {
                    setIsGuest(true);
                } else {
                    console.error("Fetch error:", err);
                }
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return <p>Loading...</p>;

    if (isGuest) return <GuestNoiseDataView />;

    if (!data || data.length === 0) return <NoData />;

    return (
        <>
            {data.map((measurement) => (
                <SaveResult
                    key={measurement.id}
                    id={measurement.id}
                    placeName={measurement.placeName}
                    avgDecibel={measurement.avgDecibel}
                    maxDecibel={measurement.maxDecibel}
                    measuredAt={measurement.measuredAt}
                />
            ))}
        </>
    );
}