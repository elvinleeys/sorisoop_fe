"use client";

import React from "react";
import ClientOnlyPortal from "@/components/clientOnlyPortal/ClientOnlyPortal";
import { Button, Modal } from "soridam-design-system";
import { useDeleteModalStore } from "@/store/modal/useDeleteModalStore";
import { flexColCenter, flexRowCenter } from "@/mixin/style";

export default function DeleteModal() {
    const { isOpen, close } = useDeleteModalStore();

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
                            이 게시글을 삭제하시겠습니까?
                        </p>
                        <p className="text-base font-medium text-black">
                            삭제 후 복구가 불가능합니다.
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
                            onClick={close}    
                        >
                            취소하기
                        </Button>
                        <Button 
                            buttonType="primary" 
                            size="xsmall"
                            onClick={close}
                        >
                            삭제하기
                        </Button>
                    </div>
                </div>
            </Modal>
        </ClientOnlyPortal>
    );
}