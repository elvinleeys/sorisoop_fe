"use client";

import { useFilterUIStore } from "@/store/filter/useFilterUIStore";
import { BottomSheet, Button } from "soridam-design-system";
import CategorySection from "./categorySection/CategorySection";
import DecibelSection from "./decibelSection/DecibelSection";
import RadiusSection from "./radiusSection/RadiusSection";
import { flexCol, flexRowCenter } from "@/mixin/style";
import ClientOnlyPortal from "../clientOnlyPortal/ClientOnlyPortal";
import { useFilterDataStore } from "@/store/filter/useFilterDataStore";

export default function FilterBottomSheet() {
    const { isOpen, close } = useFilterUIStore();
    const { 
        applyFilters, 
        resetFilters, 
        discardFilters, 
        triggerReset 
    } = useFilterDataStore();

    const handleClose = () => {
        discardFilters(); // 임시 선택값 무시하고 applied 값으로 복원
        close();
    };

    const handleApply = () => {
        applyFilters();
        triggerReset();
        close();
    };

    const handleReset = () => {
        resetFilters();
        close();
    };

    return (
        <ClientOnlyPortal containerId="bottom-sheet">
            <BottomSheet isOpen={isOpen} onClose={handleClose}>
                <main 
                    className={`
                        ${flexCol}
                        gap-[1.3125rem]
                        w-full 
                        min-h-[34.0625rem] 
                        pt-[0.75rem] 
                        px-[1rem]
                    `}
                >
                    <CategorySection onClose={handleClose}/>
                    <DecibelSection />
                    <RadiusSection />
                </main>
                <footer 
                    className={`
                        ${flexRowCenter}
                        gap-[0.625rem]
                        w-full 
                        h-[6.25rem]
                        pt-[0.875rem]
                        pr-[1.5625rem]
                        pl-[2.875rem]
                        pb-[1.5rem]
                        [box-shadow:-2px_-1px_4px_0_rgba(0,0,0,0.15)]
                    `}
                >
                    <Button 
                        buttonType="tertiary" 
                        size="small" 
                        onClick={handleReset}
                    >
                        초기화
                    </Button>
                    <Button 
                        buttonType="primary" 
                        size="small" 
                        onClick={handleApply}
                    >
                        적용
                    </Button>
                </footer>
            </BottomSheet>
        </ClientOnlyPortal>
    );
}