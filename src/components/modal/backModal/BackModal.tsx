"use client";

import React from "react";
import ClientOnlyPortal from "@/components/clientOnlyPortal/ClientOnlyPortal";
import { Button, Modal } from "soridam-design-system";
import { useBackModalStore } from "@/store/modal/useBackModalStore";
import { flexColCenter, flexRowCenter } from "@/mixin/style";
import { useMeasurementStore } from "@/store/measurement/measurementStore";
import { useRouter } from "next/navigation";

export default function BackModal() {
    const { isOpen, close } = useBackModalStore();
    const cancelMeasurement = useMeasurementStore((state) => state.cancelMeasurement);
    const router = useRouter();

    const handleGoBack = () => {
        cancelMeasurement(); // 데이터 초기화
        close();             // 모달 닫기
        router.push("/");    // 메인 페이지로 이동
    };

    return (
        <ClientOnlyPortal containerId="modal">
            <Modal isOpen={isOpen} onClose={close}>
                <div onClick={(e) => e.stopPropagation()}>
                    <div 
                        className={`
                            ${flexColCenter} 
                            w-full 
                            h-[3rem]
                            pt-[0.5rem]
                            px-[0.71875rem]
                        `}
                    >
                        <p className="text-base font-medium text-black">
                            저장을 위해 한줄평을 작성하시겠어요?
                        </p>
                        <p className="text-base font-medium text-black">
                            아니면 나가시겠어요?
                        </p>
                    </div>
                    <div 
                        className={`
                            w-[16.6875rem]
                            h-[4rem]
                            ${flexRowCenter} 
                            gap-[0.436875rem]
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
                            onClick={close}
                        >
                            작성하기
                        </Button>
                    </div>
                </div>
            </Modal>
        </ClientOnlyPortal>
    );
}