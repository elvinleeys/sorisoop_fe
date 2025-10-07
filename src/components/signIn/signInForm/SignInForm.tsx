"use client";

import { flexCol, flexColCenter } from "@/mixin/style";
import { signIn } from "@/services/auth/auth";
import { SignInError } from "@/types/dto/auth/login";
import { useAuthStore } from "@/store/auth/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, EmailInput, PasswordInput } from "soridam-design-system";
import { useMutation } from "@tanstack/react-query";

export default function SignInForm () {
    const { setAccessToken } = useAuthStore();
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const {
        mutate: loginMutate,
        isPending,
        error,
    } = useMutation({
        mutationFn: () => signIn({ email, password }),
        onSuccess: (data) => {
            if (data.accessToken) {
                setAccessToken(data.accessToken);
            }
            router.push("/"); // 로그인 후 리다이렉트
        },
    });

    const handleLogin = () => {
        if (!email || !password) return; // 간단 검증
        loginMutate();
    };

    return (
        <section 
            className={`
                ${flexColCenter}
                gap-2
                mb-6
            `}
        >
            <div 
                className={`
                    w-[21.4375rem] 
                    ${flexCol}
                    gap-3
                `} 
            >
                <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <p className={`w-full min-h-5 text-error text-sm text-center mb-0.5 ${error ? 'visible' : 'invisible'}`}>
                {error instanceof SignInError ? error.message : error ? "서버 오류가 발생했습니다." : ""}
            </p>
            <Button
                buttonType={isPending ? "secondary" : "primary"} 
                size="large" 
                onClick={handleLogin}
                disabled={isPending}
            >
                {isPending ? "로그인 중..." : "로그인"}
            </Button>
        </section>
    );
}