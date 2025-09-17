"use client";

import { flexCol, flexRowCenter } from "@/mixin/style";
import { useSignUpStore } from "@/store/signUp/SignUpStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input } from "soridam-design-system";

export default function StepOneForm() {
    const router = useRouter();
    const { formData, setFormData } = useSignUpStore();

    const [nickname, setNickname] = useState(formData.nickname ?? "");
    const [error, setError] = useState<string>("");;

    // ✅ 유효성 검사 함수
    const validateNickname = (value: string): string | null => {
        if (!value.trim()) {
            return "닉네임을 입력해주세요";
        }
        // 한글 자모(ㄱ-ㅎ, ㅏ-ㅣ)까지 허용
        if (/[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]/.test(value)) {
            return "닉네임에 특수문자는 사용할 수 없습니다";
        }
        if (value.length > 8) {
            return "닉네임은 최대 8글자까지 가능합니다";
        }
        return null;
    };

    // ✅ 입력 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
        // 입력 중에는 에러 메시지 해제
        setError("");
    };

    // ✅ blur(포커스 해제) 시 유효성 검사
    const handleBlur = () => {
        const validationError = validateNickname(nickname);
        setError(validationError ?? "");
    };

    // ✅ 버튼 클릭 핸들러
    const handleNext = () => {
        const validationError = validateNickname(nickname);

        if (validationError) {
            setError(validationError);
            return;
        }

        // store에 저장
        setFormData({ nickname });

        // step2로 이동
        router.push("/sign-up/step2");
    };

    // 버튼 상태 (primary / secondary)
    const buttonType = error || !nickname ? "secondary" : "primary";

    return (
        <form className={`h-[36.3125rem] ${flexCol}`}>
            <section className="flex-1 overflow-y-auto space-y-3">
                <label 
                    htmlFor="nickname" 
                    className="
                        block
                        text-base 
                        !font-bold 
                        text-[#2A2A2A]
                    "
                >
                    사용할 닉네임을 입력해주세요
                </label>
                <Input 
                    id="nickname"
                    inputType="text" 
                    placeholder="최대 8글자"
                    value={nickname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    hasError={!!error}
                    onFocus={() => setError("")}
                />
                {error && (
                    <p className="text-error text-sm text-right">
                        {error}
                    </p>
                )}
            </section>
            <div className={`w-full ${flexRowCenter}`}>
                <Button buttonType={buttonType} size="large" onClick={handleNext}>
                    다음
                </Button>
            </div>
        </form>
    );
}