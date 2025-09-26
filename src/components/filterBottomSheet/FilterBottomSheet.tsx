"use client";

import { useFilterUIStore } from "@/store/filter/useFilterUIStore";
import { BottomSheet, Button } from "soridam-design-system";
import CategorySection from "./categorySection/CategorySection";
import DecibelSection from "./decibelSection/DecibelSection";
import RadiusSection from "./radiusSection/RadiusSection";
import { flexCol, flexRowCenter } from "@/mixin/style";
import ClientOnlyPortal from "../clientOnlyPortal/ClientOnlyPortal";
import { useFilterActions } from "@/hook/useFilterAction";
import { useFilterDataStore } from "@/store/filter/useFilterDataStore";

export default function FilterBottomSheet() {
    const { isOpen, close } = useFilterUIStore();
    const { closeWithReset } = useFilterActions();

    return (
        <ClientOnlyPortal containerId="bottom-sheet">
            <BottomSheet isOpen={isOpen} onClose={closeWithReset}>
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
                    <CategorySection />
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
                        onClick={() => {
                            useFilterDataStore.getState().resetFilters();  // 선택값 초기화
                            useFilterDataStore.getState().clearApplied();
                            useFilterDataStore.getState().triggerReset();
                            close();
                        }}
                    >
                        초기화
                    </Button>
                    <Button 
                        buttonType="primary" 
                        size="small" 
                        onClick={() => {
                            useFilterDataStore.getState().applyFilters(); // 필터 적용
                            useFilterDataStore.getState().triggerReset();
                            close();
                        }}
                    >
                        적용
                    </Button>
                </footer>
            </BottomSheet>
        </ClientOnlyPortal>
    );
}