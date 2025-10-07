"use client"

import { flexRowCenter } from "@/mixin/style";
import { useMapLocationStore } from "@/store/map/useMapLocationStore";
import { KakaoPlace } from "@/types/kakaoPlace";
import { useRouter } from "next/navigation";

type SearchListProps = {
  keyword: string;
  places: KakaoPlace[];
  isFetching: boolean;
};

export default function SearchList({ 
    keyword, 
    places, 
    isFetching
}: SearchListProps) {
    const router = useRouter();

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
        <>
            <ul className="w-full h-full divide-y">
                {places.length === 0 && keyword && !isFetching && (
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
                        className="w-full h-[3.5rem] px-[1.25rem] py-[1.125rem] border-b-[#F3F3F3]"
                        onClick={() => {
                            useMapLocationStore
                                .getState()
                                .setLocation(Number(place.y), Number(place.x));
                            router.push("/map");
                        }}
                    >
                        <p className="text-base !font-medium leading-[135%] text-[#495057]">
                            {highlightKeyword(place.place_name, keyword)}
                        </p>
                    </li>
                ))}
            </ul>

            {/* 로딩 상태 */}
            {isFetching && (
                <p className="text-center text-gray-500 py-4">검색 중...</p>
            )}
        </>
    );
}