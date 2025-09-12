"use client";

import { SearchHeader } from "@/components/header";
import SearchList from "@/components/searchList/SearchList";
import { KakaoPlace } from "@/types/kakaoPlace";
import { useState } from "react";

export default function Search() {
    const [keyword, setKeyword] = useState("");
    const [places, setPlaces] = useState<KakaoPlace[]>([]);

    return (
        <>
            <SearchHeader keyword={keyword} setKeyword={setKeyword} />
            <SearchList keyword={keyword} places={places} setPlaces={setPlaces} />
        </>
    );
}