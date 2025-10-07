"use client";

import { flexCol } from "@/mixin/style";
import { fetchCheckEmail } from "@/services/sign-up/check-email";
import { useSignUpStore } from "@/store/signUp/SignUpStore";
import { validateEmail } from "@/util/validation";
import { useMutation } from "@tanstack/react-query";
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

   // ✅ React Query Mutation
    const { mutate: checkEmail, isPending } = useMutation({
        mutationFn: (email: string) => fetchCheckEmail({ email }),
        onSuccess: (data) => {
            if (data.exists) {
                setError("이미 등록된 이메일입니다.");
                setSuccess("");
            } else {
                setError("");
                setSuccess("사용 가능한 이메일입니다.");
                onValidEmail(email);
            }
        },
        onError: (err) => {
            console.error(err);
            setError(err instanceof Error ? err.message : "서버와 통신 중 오류가 발생했습니다.");
            setSuccess("");
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError("");
        setSuccess("");
    };

    const handleBlur = () => {
        const validationError = validateEmail(email);
        setError(validationError ?? "");
        setSuccess("");
        if (validationError) return;

        checkEmail(email); // React Query Mutation 호출
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