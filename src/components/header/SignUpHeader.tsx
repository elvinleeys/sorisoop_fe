"use client";

import { flexRowBetween } from "@/mixin/style";
import { useSignUpStore } from "@/store/signUp/SignUpStore";
import { usePathname, useRouter } from "next/navigation";
import { SBackButton } from "soridam-design-system";

const stepMap: Record<string, string | null> = {
  "/sign-up": null,
  "/sign-up/step2": "/sign-up/step2",
  "/sign-up/step3": "/sign-up/step3",
};

export default function SignUpHeader() {
    const router = useRouter();
    const path = usePathname();
    const prevPath = stepMap[path];
    const resetSignUp = useSignUpStore((state) => state.reset);

    const handleBack = () => {
        if (path === "/sign-up") {
            resetSignUp();          // ✅ 회원가입 데이터 초기화
            router.push("/sign-in");// ✅ 로그인 화면으로 이동
        } else if (prevPath) {
            router.push(prevPath);  // ✅ 이전 단계로 이동
        }
    };

    return (
        <header 
            className={`
                w-full
                ${flexRowBetween} 
                pt-2.5
                pr-39 
                pb-6
                pl-4 
            `}
        >
            <SBackButton onClick={handleBack} size="md"/>
            <h2 className="text-lg leading-[0.5] text-neutral-black">
                회원가입
            </h2>
        </header>
    );
}