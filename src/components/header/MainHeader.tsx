"use client";

import { flexRowBetween, flexRowCenter } from "@/mixin/style";
import { useInfoModalStore } from "@/store/modal/modalStore";
import { InfoButton, Logo } from "soridam-design-system";

export default function MainHeader() {
    const { open } = useInfoModalStore();

    return (
        <header className={`${flexRowBetween} w-full h-[5.5rem] pt-[1.125rem] pr-[0.75rem] pb-[1.375rem] pl-[1.125rem]`}>
            <Logo size="md" />
            <div className={`${flexRowCenter} w-[3rem] h-[3rem]`}>
                <InfoButton onClick={open} size="md"/>
            </div>
        </header>
    );
}