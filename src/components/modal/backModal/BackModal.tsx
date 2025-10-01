"use client";

import React from "react";
import { Button, Modal } from "soridam-design-system";
import { flexColCenter, flexRowCenter } from "@/mixin/style";
import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { useRouter } from "next/navigation";
import { useReviewStore } from "@/store/register/reviewStore";

interface BackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BackModal({
    isOpen, 
    onClose
} : BackModalProps) {
    const cancelMeasurement = useMeasurementStore((state) => state.cancelMeasurement);
    const { reset } = useReviewStore();
    const router = useRouter();

    const handleGoBack = () => {
        cancelMeasurement(); // 데이터 초기화
        reset();             // 한줄평 초기화
        onClose();             // 모달 닫기
        router.push("/");    // 메인 페이지로 이동
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div onClick={(e) => e.stopPropagation()}>
                <div 
                    className={`
                        ${flexColCenter} 
                        w-full
                        pt-[0.5rem]
                        px-[0.71875rem]
                    `}
                >
                    <p className="text-base !font-medium text-black">
                        저장을 위해 한줄평을 작성하시겠어요?
                    </p>
                    <p className="text-base !font-medium text-black">
                        아니면 나가시겠어요?
                    </p>
                </div>
                <div 
                    className={`
                        w-[16.6875rem]
                        h-[4rem]
                        ${flexRowCenter} 
                        gap-[0.436875rem]
                        px-[1.28125rem]
                        pt-[1rem]
                        pb-[0.5rem]
                    `}
                >
                    <Button 
                        buttonType="secondary" 
                        size="xsmall"
                        onClick={handleGoBack}    
                    >
                        뒤로 가기
                    </Button>
                    <Button 
                        buttonType="primary" 
                        size="xsmall"
                        onClick={onClose}
                    >
                        작성하기
                    </Button>
                </div>
            </div>
        </Modal>
    );
}