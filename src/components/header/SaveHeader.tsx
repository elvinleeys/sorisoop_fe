"use client";

import { useModalStore } from "@/store/modal/useModalStore";
import { useSidebarStore } from "@/store/sideBar/SideBarStore";
import { InfoButton, SettingButton } from "soridam-design-system";

export default function SaveHeader() {
    const openModal = useModalStore((s) => s.openModal);
    const { open } = useSidebarStore();

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
            <InfoButton size="md" onClick={() => openModal("info")}/>
            <SettingButton size="md" onClick={open} />
        </header>
    );
}