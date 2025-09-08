"use client";

import { flexRowCenter } from "@/mixin/style";
import { BackButton } from "soridam-design-system";

export default function RegisterHeader() {

    return (
        <header 
            className="
                w-full 
                h-[4.1875rem] 
                pt-[0.5rem]
                pb-[0.6875rem]
            "
        >
            <div className={`${flexRowCenter} w-[3rem] h-[3rem]`}>
                <BackButton onClick={() => {}} size="md"/>
            </div>
        </header>
    );
}