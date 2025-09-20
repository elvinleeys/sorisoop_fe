"use client";

import { AnimatePresence, motion } from "framer-motion";
import ClientOnlyPortal from "../clientOnlyPortal/ClientOnlyPortal";
import { useSidebarStore } from "@/store/sideBar/SideBarStore";
import { BackButton } from "soridam-design-system";
import { flexCol, flexRow } from "@/mixin/style";
import { useAuthStore } from "@/store/auth/authStore";
import Link from "next/link";
import { useLogoutModalStore } from "@/store/modal/useLogoutModalStore";
import { useDeleteAccountModalStore } from "@/store/modal/useDeleteAccountModalStore";

export default function SideBar() {
    const { isOpen, close: sidebarClose } = useSidebarStore();
    const { accessToken } = useAuthStore();
    const { open: logoutModalOpen } = useLogoutModalStore();
    const { open: deleteAccountModalOpen } = useDeleteAccountModalStore();

    const handleLogoutModal = () => {
        sidebarClose();
        logoutModalOpen();
    }

    const handleDeleteAccountModal = () => {
        sidebarClose();
        deleteAccountModalOpen();
    }

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
                            <BackButton size="md" onClick={sidebarClose}/>
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
                                {!accessToken ? (
                                    // 로그인 안 된 상태 → /sign-in으로 이동
                                    <Link
                                        href="/sign-in"
                                        className="
                                            text-sm 
                                            leading-1 
                                            text-[#0F6FFF]
                                        "
                                        onClick={sidebarClose}
                                    >
                                        로그인
                                    </Link>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleLogoutModal}
                                            className="
                                                text-start
                                                text-sm 
                                                leading-1 
                                                text-[#0F6FFF] 
                                                cursor-pointer
                                            "
                                        >
                                            로그아웃
                                        </button>
                                        <button
                                            onClick={handleDeleteAccountModal}
                                            className="
                                                text-start
                                                text-sm 
                                                leading-1 
                                                text-[#FF826E] 
                                                cursor-pointer
                                            "
                                        >
                                            회원탈퇴
                                        </button>
                                    </>
                                )}
                            </section>
                        </main>
                    </motion.div>
                )}
            </AnimatePresence>
        </ClientOnlyPortal>
    );
}