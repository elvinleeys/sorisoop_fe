"use client";

import { Button, Modal } from "soridam-design-system";
import { flexColCenter, flexRowCenter } from "@/mixin/style";
import { useAuthStore } from "@/store/auth/authStore";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutModal({
    isOpen,
    onClose
}: LogoutModalProps) {

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        useAuthStore.getState().setAccessToken(null); // 상태 초기화
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
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
                        onClick={onClose}    
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
    );
}