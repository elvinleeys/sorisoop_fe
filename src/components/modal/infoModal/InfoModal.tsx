"use client";

import { flexCol, flexRowCenter } from "@/mixin/style";
import { useInfoModalStore } from "@/store/modal/useInfoModalStore";

import { Button, Decibel, Modal } from "soridam-design-system";
import { modalItems } from "./InfoModalData";
import React from "react";
import ClientOnlyPortal from "@/components/clientOnlyPortal/ClientOnlyPortal";

export default function InfoModal() {
    const { isOpen, close } = useInfoModalStore();

    return (
        <ClientOnlyPortal containerId="modal">
            <Modal isOpen={isOpen} onClose={close}>
                <div onClick={(e) => e.stopPropagation()}>
                    <div 
                        className={`
                            w-[15.3125rem] 
                            h-[14.0625rem] 
                            ${flexCol}
                            gap-[1.6875rem]
                            mb-[1rem]
                        `}
                    >
                        {modalItems.map(item => (
                            <div 
                                className={`
                                    ${flexCol}
                                    w-full
                                    h-[3.5625rem]
                                    gap-[0.5rem]
                                `}
                                key={item.level}
                            >
                                <div 
                                    className={`
                                        ${flexRowCenter}
                                        w-full
                                        h-[2.1875rem]
                                        p-[0.25rem]
                                        gap-[0.3125rem]
                                        rounded-[0.25rem]
                                        bg-[#E8F0FF]
                                    `}
                                >
                                    <Decibel level={item.level} size={item.size} iconClassName={item.iconClassName}/>
                                    <p className="h-[1.0625rem] text-sm font-bold leading-[1.6875rem]">
                                        {item.levelText}
                                    </p>
                                </div>
                                <p className="text-xs font-regular leading-[140%] text-[#0000008A]">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div 
                        className={`
                            ${flexRowCenter}
                            w-full
                            h-[3.5rem]
                            px-[0.03125rem]
                        `}
                    >
                        <Button 
                            buttonType="primary" 
                            size="medium" 
                            onClick={close}
                        >
                            확인했어요
                        </Button>
                    </div>
                </div>
            </Modal>
        </ClientOnlyPortal>
    );
}