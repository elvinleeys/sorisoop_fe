"use client";

import { flexCol, flexRowCenter } from "@/mixin/style";
import { useSignUpStore } from "@/store/signUp/SignUpStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "soridam-design-system";
import EmailSection from "./emailSection/EmailSection";
import PasswordSection from "./passwordSection/PasswordSection";

export default function StepTwoForm() {
    const router = useRouter();
    const { setFormData } = useSignUpStore();

    const [validEmail, setValidEmail] = useState<string | null>(null);
    const [validPassword, setValidPassword] = useState<string | null>(null);

    // 다음 버튼 클릭
    const handleNext = () => {
        if (!validEmail || !validPassword) return; // 유효하지 않으면 이동 X
        setFormData({ email: validEmail, password: validPassword }); // store 저장
        router.push("/sign-up/step3");
    };

    // 버튼 타입 결정
    const buttonType = validEmail && validPassword ? "primary" : "secondary";

    
    return (
        <form className={`h-[36.3125rem] ${flexCol}`}>
            <EmailSection onValidEmail={setValidEmail} />
            <PasswordSection onValidPassword={setValidPassword} />
            <div className={`w-full ${flexRowCenter} mt-auto`}>
                <Button buttonType={buttonType} size="large" onClick={handleNext}>
                    다음
                </Button>
            </div>
        </form>
    );
}