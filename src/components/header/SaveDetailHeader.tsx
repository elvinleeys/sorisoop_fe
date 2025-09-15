"use client";

import { flexRowBetween, flexRowCenter } from "@/mixin/style";
import { useDeleteModalStore } from "@/store/modal/useDeleteModalStore";
import { useRouter } from "next/navigation";
import { BackButton } from "soridam-design-system";

export default function SaveDetailHeader() {
    const router = useRouter();
    const { open } = useDeleteModalStore();

    return (
        <header 
            className={`
                ${flexRowBetween}
                w-full 
                h-[4.1875rem] 
                pt-[0.5rem]
                pb-[0.6875rem]
                pr-[1rem]
            `}
        >
            <div className={`${flexRowCenter} w-[3rem] h-[3rem]`}>
                <BackButton onClick={()=> router.back()} size="md"/>
            </div>
            <button 
                type="button"
                onClick={open} 
                className="bg-white border-none"
            >
                <p className="text-base leading-4 text-[#D32F2F]">
                    삭제
                </p>
            </button>
        </header>
    );
}