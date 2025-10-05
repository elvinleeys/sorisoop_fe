"use client";

import React from "react";
import { Button, Modal } from "soridam-design-system";
import { flexColCenter, flexRowCenter } from "@/mixin/style";
import { useAuthStore } from "@/store/auth/authStore";
import { useRouter } from "next/navigation";
import { deleteAccountRequest } from "@/services/auth/auth";

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

    const deleteAccount = async () => {
        try {
            const data = await deleteAccountRequest();
            console.log(data.message);
            setAccessToken(null);
            onClose();
            router.push("/");
        } catch (err) {
            console.error(err);
        }
    };

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