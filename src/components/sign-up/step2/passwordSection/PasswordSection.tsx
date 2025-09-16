"use client";

import { flexCol } from "@/mixin/style";
import { useSignUpStore } from "@/store/signUp/SignUpStore";
import { useState } from "react";
import { Input } from "soridam-design-system";

interface PasswordSectionProps {
    onValidPassword: (password: string | null) => void;
}

export default function PasswordSection({ onValidPassword }: PasswordSectionProps) {
    const { formData } = useSignUpStore();
    const [password, setPassword] = useState(formData.password ?? "");
    const [confirm, setConfirm] = useState(formData.password ?? "");
    const [error, setError] = useState("");

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setError("");
    };

    const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirm(e.target.value);
        setError("");
    };

    const handlePasswordBlur = () => {
        const validationError = validatePasswordValue(password);
        setError(validationError ?? "");
    };

    const handleConfirmBlur = () => {
        const passwordError = validatePasswordValue(password);
        const confirmError = validatePasswordConfirm(password, confirm);
        setError(confirmError ? confirmError : passwordError ?? "");
        onValidPassword(!confirmError ? password : null);
    };

    return (
        <section 
            className={`
                flex-1 
                ${flexCol} 
                overflow-x-hidden 
                overflow-y-auto 
                mt-16.5
            `}
        >
            <p
                className="
                    block
                    mb-3
                    text-base 
                    !font-bold 
                    text-[#2A2A2A]
                "
            >
                비밀번호를 입력해주세요
            </p>
            <div className="mb-3">
                <Input
                    id="signup-password"
                    inputType="text" 
                    placeholder="영문, 숫자 포함 8자이상"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    hasError={!!error}
                />
            </div>
            <Input
                id="signup-password-confirm"
                inputType="text" 
                placeholder="비밀번호를 다시 입력해주세요"
                value={confirm}
                onChange={handleConfirmChange}
                onBlur={handleConfirmBlur}
                hasError={!!error}
            />
            {error && (
                <p className="text-error text-sm text-right mt-2">
                    {error}
                </p>
            )}
        </section>
    );
}

function validatePasswordValue(password: string): string | null {
    if (!password) return "비밀번호를 입력해주세요.";
    if (password.length < 8) return "비밀번호는 8자 이상이어야 합니다.";
    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
        return "사용하실 수 없는 비밀번호입니다.";
    }
    return null;
}

function validatePasswordConfirm(password: string, confirm: string): string | null {
    if (password !== confirm) return "비밀번호가 일치하지 않습니다.";
    return null;
}