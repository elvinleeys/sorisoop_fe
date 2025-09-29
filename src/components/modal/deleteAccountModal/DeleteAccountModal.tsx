"use client";

import React from "react";
import { Button, Modal } from "soridam-design-system";
import { flexColCenter, flexRowCenter } from "@/mixin/style";
import { useAuthStore } from "@/store/auth/authStore";
import { useRouter } from "next/navigation";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteAccountModal({
    isOpen, 
    onClose
}: DeleteAccountModalProps) {
    const router = useRouter();
    const { setAccessToken } = useAuthStore();

    const deleteAccount = async() => {
        try {
            const res = await fetch("/api/auth/delete", {
                method: "DELETE",
                credentials: "include", // 쿠키 포함
            });

            const data = await res.json();

            if (res.ok) {
                console.log(data.message); // "회원 탈퇴가 완료되었습니다."
                // zustand에서 accessToken 제거
                setAccessToken(null);
                onClose();
                // 페이지 이동 등 처리
                router.push("/");
            } else {
                console.error("회원 탈퇴 실패:", data.message);
            }
        } catch (err) {
            console.error("서버 오류:", err);
        }
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
                        정말로 탈퇴하시겠습니까?
                    </p>
                    <p className="text-base !font-medium text-black">
                        탈퇴 후 데이터 복구가 불가능합니다.
                    </p>
                </div>
                <div 
                    className={`
                        w-full
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
                        onClick={deleteAccount}
                    >
                        탈퇴하기
                    </Button>
                </div>
            </div>
        </Modal>
    );
}