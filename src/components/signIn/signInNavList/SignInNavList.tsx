"use client";

import { flexRowCenter } from "@/mixin/style";
import { useToastStore } from "@/store/toast/useToastStore";
import Link from "next/link";

export default function SignInNavList() {
    const addToast = useToastStore((s) => s.addToast);

    const handleClick = (label: string) => {
        addToast(`${label} 기능은 현재 제공되지 않습니다.`);
    }

    return (
        <nav className={`${flexRowCenter} text-sm text-neutral-gray gap-3`}>
            <button 
                onClick={() => handleClick("아이디 찾기")}
            >
                아이디 찾기
            </button>
            <span>|</span>
            <button 
                onClick={() => handleClick("비밀번호 찾기")}
            >
                비밀번호 찾기
            </button>
            <span>|</span>
            <Link href="/sign-up">회원가입</Link>
        </nav>
    );
}