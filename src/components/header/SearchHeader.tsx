"use client";

import { flexRow, flexRowCenter } from "@/mixin/style";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef } from "react";
import { BackButton } from "soridam-design-system";

type SearchHeaderProps = {
  keyword: string;
  setKeyword: (value: string) => void;
  onSearch?: () => void; // 부모에서 refetch 전달받음
};

export default function SearchHeader({
    keyword, 
    setKeyword, 
    onSearch
}: SearchHeaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            inputRef.current?.blur(); // 모바일 키보드 닫기
            if (onSearch) onSearch(); // refetch 호출
        }
    };

    return (
        <header 
            className={`
                ${flexRow}
                w-full 
                h-[3.9375rem]
                pt-[0.375rem]
                pb-[0.5625rem]
                border-b-2
                border-[#DDE2E5]
            `}
        >
            <div className={`${flexRowCenter} w-[3rem] h-[3rem]`}>
                <BackButton onClick={() => {router.back()}} size="md"/>
            </div>
            <div className="flex-1 px-[0.5rem] py-[0.75rem]">
                <input 
                    type="search" 
                    ref={inputRef}
                    value={keyword}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="
                        w-full 
                        h-full 
                        text-base 
                        text-neutral-black 
                        outline-none 
                        placeholder-[#808080]
                    "
                    placeholder = "지번, 도로명 주소 검색"    
                />
            </div>
        </header>
    );
}