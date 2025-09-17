import { flexRowCenter } from "@/mixin/style";
import Link from "next/link";

export default function SignInNavList() {
    return (
        <nav className={`${flexRowCenter} text-sm text-neutral-gray gap-3`}>
            <Link href="#">아이디 찾기</Link>
            <span>|</span>
            <Link href="#">비밀번호 찾기</Link>
            <span>|</span>
            <Link href="/sign-up">회원가입</Link>
        </nav>
    );
}