"use client";

import { SearchHeader } from "@/components/header";
import SearchList from "@/components/searchList/SearchList";
import { useExploreLocationStore } from "@/features/map/explore/model/store/exploreLocationStore";
import { fetchKakaoPlaces } from "@/services/search/fetchKakaoPlace";
import { KakaoPlace } from "@/types/kakaoPlace";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Search() {
    const [keyword, setKeyword] = useState("");
    const { lat, lng } = useExploreLocationStore();

    const {
        data: places = [],
        refetch,
        isFetching,
    } = useQuery<KakaoPlace[]>({
        queryKey: ["places", keyword, lat, lng],
        queryFn: () => fetchKakaoPlaces(keyword, lat!, lng!),
        enabled: false, // Enter 하기 전엔 실행 안 함
    });

    return (
        <>
            <SearchHeader
                keyword={keyword}
                setKeyword={setKeyword}
                onSearch={refetch}
            />
            <SearchList
                keyword={keyword}
                places={places}
                isFetching={isFetching}
            />
        </>
    );
}
