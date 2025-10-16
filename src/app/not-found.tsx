import { flexCol, flexRowCenter } from "@/mixin/style";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <main 
            className={`
                w-full
                min-h-screen
                ${flexCol}
                items-center 
                pt-[14.5625rem]
                pr-[1.0625rem]
                pb-32
                pl-4.5
            `}
        >
            <figure className="w-49 h-23 mb-6.5 relative">
                <Image src="/icons/error-ico.webp" alt="404 에러 아이콘" fill priority />
            </figure>
            <section className={`${flexCol} items-center mb-47.5 text-center`}>
                <p className="text-base text-neutral-black">
                    불편을 드려 죄송합니다.
                </p>
                <p className="text-base text-neutral-black">
                    요청하신 페이지를 찾을 수 없어요.
                </p>
            </section>
            <Link 
                href="/"
                className={`
                    block 
                    w-85 
                    h-[3.125rem]
                    ${flexRowCenter}
                    rounded-[3.625rem] 
                    bg-primary 
                    text-xl 
                    font-semibold 
                    text-white
                `}
            >
                측정 페이지로 돌아가기
            </Link>
        </main>
    );
}