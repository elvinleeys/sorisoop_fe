"use client";

import { flexColCenter } from "@/mixin/style";
import { Logo } from "soridam-design-system";

export default function SignInLogo() {
    return (
        <section
            className={`
                w-full
                ${flexColCenter}
                gap-3 
                pt-[3.9375rem] 
                px-24.5 
                pb-20
            `}
        >
            <Logo size="lg" />
            <div className={`w-full ${flexColCenter}`}>
                <p className="text-base text-primary">
                    나만의 소음 데이터,
                </p>
                <p className="text-base text-primary">
                    로그인하고 저장하세요!
                </p>
            </div>
        </section>
    );
}