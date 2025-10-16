"use client";

import React from "react";
import { Button, Modal } from "soridam-design-system";
import { flexColCenter, flexRowCenter } from "@/mixin/style";
import { useAuthStore } from "@/store/auth/authStore";
import { useRouter } from "next/navigation";
import { deleteAccountRequest } from "@/services/auth/auth";
import { useMutation } from "@tanstack/react-query";

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

    // ✅ React Query Mutation 적용
    const { mutate: deleteMutate, isPending, error } = useMutation({
        mutationFn: deleteAccountRequest,
        onSuccess: (data) => {
            // console.log(data.message); // 타입 안전하게 접근 가능
            setAccessToken(null);
            onClose();
            router.push("/");
        },
        onError: (err) => {
            console.error(err);
            // 필요 시 Toast/Alert로 에러 UI 표시 가능
        },
    });

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
                        onClick={() => deleteMutate()} 
                        disabled={isPending}
                    >
                        탈퇴하기
                    </Button>
                </div>
            </div>
        </Modal>
    );
}