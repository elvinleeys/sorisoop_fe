"use client";

import { AnimatePresence, motion } from "framer-motion";
import ClientOnlyPortal from "../clientOnlyPortal/ClientOnlyPortal";
import { useSidebarStore } from "@/store/sideBar/SideBarStore";
import { BackButton } from "soridam-design-system";
import { flexCol, flexRow } from "@/mixin/style";

export default function SideBar() {
    const { isOpen, close } = useSidebarStore();

    return(
        <ClientOnlyPortal containerId="modal">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed top-0 left-0 w-full h-full bg-white"
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
                            <BackButton size="md" onClick={close}/>
                            <h2 className="text-lg leading-0.5 text-neutral-black">
                                설정
                            </h2>
                        </header>
                        <main className="divide-y">
                            <section 
                                className={`
                                    ${flexCol}
                                    gap-[1.125rem]
                                    w-full 
                                    py-[1.125rem] 
                                    px-[1.5rem]
                                    border-b-[#F4F8FF]
                                `}
                            >
                                <h3 className="text-base !font-bold text-[#2A2A2A]">
                                    정보
                                </h3>
                                <p className="text-sm text-neutral-sub">
                                    공지사항
                                </p>
                            </section>
                            <section 
                                className={`
                                    ${flexCol}
                                    gap-[1.125rem]
                                    w-full 
                                    py-[1.125rem] 
                                    px-[1.5rem]
                                    border-b-[#F4F8FF]
                                `}
                            >
                                <h3 className="text-base !font-bold text-[#2A2A2A]">
                                    고객센터
                                </h3>
                                <p className="text-sm text-neutral-sub">
                                    1:1 문의
                                </p>
                            </section>
                            <section 
                                className={`
                                    ${flexCol}
                                    gap-[1.125rem]
                                    w-full 
                                    py-[1.125rem] 
                                    px-[1.5rem]
                                    border-b-[#F4F8FF]
                                `}
                            >
                                <h3 className="text-base !font-bold text-[#2A2A2A]">
                                    약관
                                </h3>
                                <p className="text-sm text-neutral-sub">
                                    개인정보 처리방침
                                </p>
                                <p className="text-sm text-neutral-sub">
                                    서비스 이용약관
                                </p>
                                <p className="text-sm text-neutral-sub">
                                    오픈소스 라이선스
                                </p>
                                <p className="text-sm leading-1 text-[#0F6FFF]">
                                    로그아웃
                                </p>
                                <p className="text-sm leading-1 text-[#FF826E]">
                                    회원탈퇴
                                </p>
                            </section>
                        </main>
                    </motion.div>
                )}
            </AnimatePresence>
        </ClientOnlyPortal>
    );
}