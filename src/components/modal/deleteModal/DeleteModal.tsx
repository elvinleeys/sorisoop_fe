"use client";

import React from "react";
import { Button, Modal } from "soridam-design-system";
import { flexColCenter, flexRowCenter } from "@/mixin/style";
import { useParams, useRouter } from "next/navigation";
import { useToastStore } from "@/store/toast/useToastStore";
import { DeleteMeasurementResponse } from "@/types/dto/save/deleteMeasurement";
import { deleteMeasurement } from "@/services/measurement/deleteMeasurement";
import { useMutation } from "@tanstack/react-query";

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

    // ✅ React Query mutation
    const { mutate: deleteMutate, isPending } = useMutation({
        mutationFn: () => deleteMeasurement(listId),
        onSuccess: (res: DeleteMeasurementResponse) => {
            addToast(res.message || "삭제가 완료되었습니다.", 2000);
            onClose();
            router.push("/");
        },
        onError: (err) => {
            console.error(err);
            if (err instanceof Error) addToast(err.message || "삭제 중 오류 발생", 2000);
            else addToast("삭제 중 알 수 없는 오류 발생", 2000);
        },
    });

    const handleDelete = () => {
        deleteMutate();
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
                        disabled={isPending}
                    >
                        {isPending ? "삭제 중..." : "삭제하기"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}