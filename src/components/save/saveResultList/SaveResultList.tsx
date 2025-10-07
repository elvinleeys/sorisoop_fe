"use client";

import SaveResult from "../saveResult/SaveResult";
import { Measurement } from "@/types/dto/save/savelist";

interface SaveResultListProps {
  data: Measurement[];
}

export default function SaveResultList({ 
    data 
}: SaveResultListProps) {

    return (
        <>
            {data.map((m) => (
                <SaveResult
                    key={m.id}
                    id={m.id}
                    placeName={m.placeName}
                    avgDecibel={m.avgDecibel}
                    maxDecibel={m.maxDecibel}
                    measuredAt={m.measuredAt}
                />
            ))}
        </>
    );
}
