"use client";

import { useFilterStore } from "@/store/filter/FilterStore";
import { BottomSheet } from "soridam-design-system";
import CategorySection from "./categorySection/CategorySection";

export default function FilterBottomSheet() {
    const { isOpen, close } = useFilterStore();

    return (
        <BottomSheet isOpen={isOpen} onClose={close}>
            <div className="w-full min-h-[34.0625rem] pt-[0.75rem] px-[1rem]">
                <CategorySection />
            </div>
        </BottomSheet>
    );
}