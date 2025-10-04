"use client";

import { flexCol } from "@/mixin/style";
import { fetchCheckEmail } from "@/services/sign-up/check-email";
import { useSignUpStore } from "@/store/signUp/SignUpStore";
import { validateEmail } from "@/util/validation";
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
        // 1️⃣ 로컬 유효성 검사
        const validationError = validateEmail(email);
        setError(validationError ?? "");
        setSuccess("");
        if (validationError) return;

        // 2️⃣ 서버 중복 확인
        try {
        const { exists } = await fetchCheckEmail({ email });
        if (exists) {
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