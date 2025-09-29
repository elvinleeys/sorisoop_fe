"use client";

import { flexRowBetween, flexRowCenter } from "@/mixin/style";
import { useModalStore } from "@/store/modal/useModalStore";
import { InfoButton, Logo } from "soridam-design-system";

export default function MainHeader() {
    const openModal = useModalStore((s) => s.openModal);

    return (
        <header className={`${flexRowBetween} w-full h-[5.5rem] pt-[1.125rem] pr-[0.75rem] pb-[1.375rem] pl-[1.125rem]`}>
            <Logo size="md" />
            <div className={`${flexRowCenter} w-[3rem] h-[3rem]`}>
                <InfoButton onClick={() => openModal("info")} size="md"/>
            </div>
        </header>
    );
}