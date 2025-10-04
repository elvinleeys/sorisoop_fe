"use client";

import StepOneForm from "@/components/sign-up/step1/StepOneForm";
import { useSignUpStore } from "@/store/signUp/SignUpStore";
import { useEffect } from "react";

export default function SignUpPage() {
    const resetSignUp = useSignUpStore((state) => state.reset);

    useEffect(() => {
        resetSignUp(); // ✅ 첫 진입 시 상태 초기화
    }, [resetSignUp]);

    return <StepOneForm />;
}