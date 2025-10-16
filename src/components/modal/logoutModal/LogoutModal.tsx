"use client";

import { Button, Modal } from "soridam-design-system";
import { flexColCenter, flexRowCenter } from "@/mixin/style";
import { useAuthStore } from "@/store/auth/authStore";
import { useRouter } from "next/navigation";
import { logoutRequest } from "@/services/auth/auth";
import { useMutation } from "@tanstack/react-query";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutModal({
    isOpen,
    onClose
}: LogoutModalProps) {
    const router = useRouter();
    const { setAccessToken } = useAuthStore();

    // ✅ React Query Mutation 적용
    const { mutate: logoutMutate, isPending } = useMutation({
        mutationFn: logoutRequest,
        onSuccess: (res) => {
            // console.log(res.message);
            setAccessToken(null);
            onClose();
            router.push("/");
        },
        onError: (err) => {
            console.error(err);
            // 필요 시 UI 에러 표시 가능
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
                        onClick={() => logoutMutate()}
                        disabled={isPending}
                    >
                        로그아웃
                    </Button>
                </div>
            </div>
        </Modal>
    );
}