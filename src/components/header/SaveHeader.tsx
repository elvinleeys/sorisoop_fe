"use client";

import { useInfoModalStore } from "@/store/modal/useInfoModalStore";
import { useSidebarStore } from "@/store/sideBar/SideBarStore";
import { InfoButton, SettingButton } from "soridam-design-system";

export default function SaveHeader() {
    const { open: infoOpen } = useInfoModalStore();
    const { open: sbOpen } = useSidebarStore();

    return (
        <header 
            className="
                w-full 
                h-[4.5rem]
                pt-[1.4375rem]
                pb-[1.5625rem]
                px-[1.3125rem]
                flex
                items-center
                justify-end
                gap-[0.875rem]
            "
        >
            <InfoButton size="md" onClick={infoOpen}/>
            <SettingButton size="md" onClick={sbOpen} />
        </header>
    );
}