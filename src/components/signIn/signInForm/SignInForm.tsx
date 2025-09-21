"use client";

import { flexCol, flexColCenter } from "@/mixin/style";
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
            const res = await fetch("/api/auth/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "로그인 실패");
                setLoading(false);
                return;
            }

            // accessToken은 메모리상 저장
            if (data.accessToken) {
                setAccessToken(data.accessToken); 
            }

            // 로그인 성공 시 / 경로나 원하는 페이지로 이동
            router.push("/");

        } catch (err) {
            console.error(err);
            setError("서버 오류가 발생했습니다.");
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
            <p className="w-full min-h-5 text-error text-sm text-center mb-0.5">
                {error ?? ""}
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