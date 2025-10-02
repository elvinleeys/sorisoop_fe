"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSidebarStore } from "@/store/sideBar/SideBarStore";
import { BackButton } from "soridam-design-system";
import { flexCol, flexRow } from "@/mixin/style";
import { useAuthStore } from "@/store/auth/authStore";
import { useModalStore } from "@/store/modal/useModalStore";
import ClientOnlyPortal from "../clientOnlyPortal/ClientOnlyPortal";
import { SideBarMenu } from "./SideBarMenu";
import SideBarItem from "./SideBarItem";

export default function SideBar() {
    const { isOpen, close: sidebarClose } = useSidebarStore();
    const { accessToken } = useAuthStore();
    const openModal = useModalStore((s) => s.openModal);

    const handleLogoutModal = () => {
        sidebarClose();
        openModal("logout");
    }

    const handleDeleteAccountModal = () => {
        sidebarClose();
        openModal("deleteAccount");
    }

    const sections = SideBarMenu(
        accessToken,
        handleLogoutModal,
        handleDeleteAccountModal
    );

    return(
        <ClientOnlyPortal containerId="sidebar">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed top-0 left-0 w-full h-full bg-white z-[500]"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                    >
                        <header 
                            className={`
                                w-full
                                h-[3.8125rem]
                                ${flexRow}
                                items-center
                                gap-[8.25rem]
                                pt-[0.625rem]
                                px-[1rem]
                                pb-[0.375rem]
                            `}
                        >
                            <BackButton size="md" onClick={sidebarClose}/>
                            <h2 className="text-lg leading-0.5 text-neutral-black">
                                설정
                            </h2>
                        </header>
                        <main className="divide-y">
                            {sections.map((section, idx) => (
                                <section
                                    key={idx}
                                    className={`${flexCol} gap-[1.125rem] w-full py-[1.125rem] px-[1.5rem] border-b-[#F4F8FF]`}
                                >
                                    <h3 className="text-base !font-bold text-[#2A2A2A]">
                                        {section.title}
                                    </h3>
                                    {section.items.map((item, i) => (
                                        <SideBarItem
                                            label={item.label}
                                            path={item.path}
                                            onClick={item.onClick}
                                            className={item.className}
                                            key={i} // key는 React 전용 prop, item 스프레드에 포함되지 않음
                                        />
                                    ))}
                                </section>
                            ))}
                        </main>
                    </motion.div>
                )}
            </AnimatePresence>
        </ClientOnlyPortal>
    );
}