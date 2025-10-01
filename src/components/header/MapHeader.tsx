"use client";

import { flexRowBetween } from '@/mixin/style';
import { useFilterUIStore } from '@/store/filter/useFilterUIStore';
import { useRouter } from 'next/navigation';
import { memo, useEffect } from 'react';
import { FilterButton, SearchBar } from 'soridam-design-system';

function MapHeaderComponent() {
    const router = useRouter();
    const { open } = useFilterUIStore();

    // 사전 Prefetch
    useEffect(() => {
        router.prefetch("/map/search");
    }, [router]);

    return(
        <header 
            className={`
                ${flexRowBetween} 
                w-full 
                h-[3.8125rem]
                pt-[0.6875rem] 
                px-[1rem]
                pb-[0.625rem]
            `}
        >
            <SearchBar onClick={()=>{router.push("/map/search")}}/>
            <FilterButton label="필터" onClick={open}/>
        </header>
    );
}

export default memo(MapHeaderComponent);