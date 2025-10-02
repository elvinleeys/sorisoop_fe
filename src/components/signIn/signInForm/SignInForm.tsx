"use client";

import { flexCol, flexColCenter } from "@/mixin/style";
import { signIn, SignInError } from "@/services/sign-in/signIn";
import { useAuthStore } from "@/store/auth/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, EmailInput, PasswordInput } from "soridam-design-system";

export default function SignInForm () {
    const { setAccessToken } = useAuthStore();
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            setError("이메일과 비밀번호를 입력해주세요.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const data = await signIn({ email, password });

            if (data.accessToken) {
                setAccessToken(data.accessToken);
            }

            router.push("/");
        } catch (err) {
            if (err instanceof SignInError) {
                setError(err.message);
            } else {
                setError("서버 오류가 발생했습니다.");
                console.error(err);
            }
        } finally {
            setLoading(false);
        }
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
                {error}
            </p>
            <Button
                buttonType={loading ? "secondary" : "primary"} 
                size="large" 
                onClick={handleLogin}
                disabled={loading}
            >
                {loading ? "로그인 중..." : "로그인"}
            </Button>
        </section>
    );
}