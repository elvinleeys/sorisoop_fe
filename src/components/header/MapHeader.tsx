"use client";

import { flexRowBetween } from '@/mixin/style';
import { useFilterStore } from '@/store/filter/FilterStore';
import { useRouter } from 'next/navigation';
import { FilterButton, SearchBar } from 'soridam-design-system';

export default function MapHeader() {
    const router = useRouter();
    const { open } = useFilterStore();

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