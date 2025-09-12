"use client"

import { flexRowCenter } from "@/mixin/style";
import { useLocationStore } from "@/store/measurement/locationStore";
import { KakaoPlace } from "@/types/kakaoPlace";
import { useEffect } from "react";

type searchListProps = {
    keyword: string;
    places: KakaoPlace[];
    setPlaces: React.Dispatch<React.SetStateAction<KakaoPlace[]>>;
}

export default function SearchList({ 
    keyword, 
    places, 
    setPlaces 
}: searchListProps) {
    const { location } = useLocationStore();
    const { latitude, longitude } = location;

    useEffect(() => {
        if (!keyword 
            || keyword.trim() === "" 
            || latitude === null 
            || longitude === null
        ) {
            setPlaces([]);
            return;
        }

        const controller = new AbortController(); // 이전 요청 취소용
        const fetchPlaces = async () => {
            try {
                const res = await fetch(`/api/kakao/search?keyword=${encodeURIComponent(keyword)}&lat=${latitude}&lng=${longitude}`, {
                    signal: controller.signal,
                });

                if (!res.ok) throw new Error("검색 실패");
                
                const data = await res.json();
                
                if (data.documents) {
                    setPlaces(data.documents);
                } else {
                    setPlaces([]);
                }
            } catch (err: unknown) {
                if (err instanceof DOMException && err.name === "AbortError") return; // 이전 요청 취소
                console.error(err);
                setPlaces([]);
            }
        };

        fetchPlaces();

        return () => {
            controller.abort(); // 컴포넌트 언마운트 시 요청 취소
        };
    }, [keyword, latitude, longitude, setPlaces]);

    // place_name에서 keyword와 일치하는 부분을 <span>으로 감싸서 강조
    const highlightKeyword = (text: string, keyword: string) => {
        if (!keyword) return text;
        const parts = text.split(new RegExp(`(${keyword})`, "gi")); // 대소문자 구분 없이 분리
        return parts.map((part, idx) =>
            part.toLowerCase() === keyword.toLowerCase() ? (
                <span key={idx} className="text-primary-blue-strong">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    return (
        <ul className="w-full h-full divide-y">
            {places.length === 0 && keyword && (
                <li 
                    className={`
                        w-full
                        h-full
                        ${flexRowCenter}
                        px-[1.25rem]
                        py-[1.125rem]
                        text-base 
                        !font-medium 
                        leading-[135%] 
                        text-[#495057]
                    `}
                >
                    검색 결과가 없습니다.
                </li>
            )}
            {places.map((place) => (
                <li
                    key={place.id}
                    className="
                        w-full
                        h-[3.5rem]
                        px-[1.25rem]
                        py-[1.125rem]
                        border-b-[#F3F3F3]
                    "
                    onClick={() => {
                        console.log("선택한 좌표:", { lat: place.y, lng: place.x });
                        // 여기에 클릭 시 map 페이지에 좌표 전달 로직 추가 가능
                    }}
                >
                    <p 
                        className="
                            text-base 
                            !font-medium 
                            leading-[135%] 
                            text-[#495057]
                        "
                    >
                        {highlightKeyword(place.place_name, keyword)}
                    </p>
                </li>
            ))}
        </ul>
    );
}