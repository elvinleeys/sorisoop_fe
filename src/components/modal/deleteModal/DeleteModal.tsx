"use client";

import React from "react";
import { Button, Modal } from "soridam-design-system";
import { flexColCenter, flexRowCenter } from "@/mixin/style";
import { useParams, useRouter } from "next/navigation";
import { useToastStore } from "@/store/toast/useToastStore";
import { fetchWrapper } from "@/lib/fetchWrapper";

interface DeleteResponse {
  success: boolean;
  message?: string;
}

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteModal({ 
    isOpen, 
    onClose 
} : DeleteModalProps) {
    const params = useParams();
    const listId = params?.id as string; // 페이지 URL에서 가져오기
    const addToast = useToastStore((state) => state.addToast);
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const res = await fetchWrapper<DeleteResponse>(`/api/delete-measurement/${listId}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (res.success) {
                addToast(res.message || "삭제가 완료되었습니다.", 2000);
                onClose();
                router.push("/");
            } else {
                throw new Error(res.message || "삭제 실패");
            }
        } catch (err) {
            console.error(err);
            addToast("삭제 중 오류 발생", 2000);
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
                        이 게시글을 삭제하시겠습니까?
                    </p>
                    <p className="text-base !font-medium text-black">
                        삭제 후 복구가 불가능합니다.
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
                        onClick={handleDelete}
                    >
                        삭제하기
                    </Button>
                </div>
            </div>
        </Modal>
    );
}