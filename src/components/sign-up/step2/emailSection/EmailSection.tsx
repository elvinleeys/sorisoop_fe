"use client";

import { flexCol } from "@/mixin/style";
import { useSignUpStore } from "@/store/signUp/SignUpStore";
import { useState } from "react";
import { Input } from "soridam-design-system";

interface EmailSectionProps {
    onValidEmail: (email: string) => void; // 상위로 전달할 콜백
}

export default function EmailSection({ onValidEmail }: EmailSectionProps) {
    const { formData } = useSignUpStore();
    const [email, setEmail] = useState(formData.email ?? "");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError(""); // 입력 중에는 에러 숨김
    };

    const handleBlur = async () => {
        const validationError = validateEmail(email);
        setError(validationError ?? "");
        setSuccess(""); // 새로 blur하면 성공 메시지 초기화
        
        if (validationError) return;

        try{
            const res = await fetch("/api/auth/check-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (data.exists) {
                setError("이미 등록된 이메일입니다.");
                setSuccess("");
            } else {
                setError("");
                setSuccess("사용 가능한 이메일입니다.");
                onValidEmail(email); // 상위로 전달
            }
        } catch (err) {
            console.error(err);
            setError("서버와 통신 중 오류가 발생했습니다.");
            setSuccess("");
        }
    };

    return(
        <section className={`flex-1 ${flexCol} overflow-x-hidden overflow-y-auto`}>
            <label 
                htmlFor="signup-email" 
                className="
                    block
                    mb-3
                    text-base 
                    !font-bold 
                    text-[#2A2A2A]
                "
            >
                이메일을 입력해주세요
            </label>
            <Input 
                id="signup-email"
                inputType="email" 
                placeholder="ex) sorisoop@gmail.com"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={() => setError("")}
                hasError={!!error}
            />
            {error && (
                <p className="text-error text-sm text-right mt-2">
                    {error}
                </p>
            )}
            {success && (
                <p className="text-primary text-sm text-right mt-2">
                    {success}
                </p>
            )}
        </section>
    );
}

// 이메일 검증 함수
function validateEmail(email: string): string | null {
    if (!email) return "이메일을 입력해주세요.";

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return "올바른 이메일 형식이 아닙니다.";

    const allowedDomains = [
            "naver.com",
            "gmail.com",
            "daum.net",
            "kakao.com",
            "hotmail.com",
            "outlook.com",
            "yahoo.com",
    ];
    const domain = email.split("@")[1];
    if (!domain || !allowedDomains.includes(domain)) {
        return "사용하실 수 없는 이메일입니다.";
    }

    return null;
}