"use client";

import ClientOnlyPortal from "@/components/clientOnlyPortal/ClientOnlyPortal";
import { Button, Modal } from "soridam-design-system";
import { flexColCenter, flexRowCenter } from "@/mixin/style";
import { useLogoutModalStore } from "@/store/modal/useLogoutModalStore";
import { useAuthStore } from "@/store/auth/authStore";

export default function LogoutModal() {
    const { isOpen, close } = useLogoutModalStore();
    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        useAuthStore.getState().setAccessToken(null); // 상태 초기화
        close();
    }

    return (
        <ClientOnlyPortal containerId="modal">
            <Modal isOpen={isOpen} onClose={close}>
                <div onClick={(e) => e.stopPropagation()}>
                    <div 
                        className={`
                            ${flexColCenter} 
                            w-full
                            pt-2
                            px-9
                        `}
                    >
                        <p className="text-base !font-medium text-black">
                            로그아웃 하시겠습니까?
                        </p>
                    </div>
                    <div 
                        className={`
                            w-[16.6875rem]
                            h-[4rem]
                            ${flexRowCenter} 
                            gap-[0.436875rem]
                            px-[1.28125rem]
                            pt-4
                            pb-2
                        `}
                    >
                        <Button 
                            buttonType="secondary" 
                            size="xsmall"
                            onClick={close}    
                        >
                            취소하기
                        </Button>
                        <Button 
                            buttonType="primary" 
                            size="xsmall"
                            onClick={handleLogout}
                        >
                            로그아웃
                        </Button>
                    </div>
                </div>
            </Modal>
        </ClientOnlyPortal>
    );
}