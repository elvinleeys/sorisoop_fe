import { flexCol, flexColCenter, flexRowCenter } from "@/mixin/style";
import NoDataImg from "../noDataImg/NoDataImg";
import Link from "next/link";

export default function GuestNoiseDataView() {
    return (
        <section className={`${flexColCenter} gap-6 mt-17`}>
            <div className={`${flexCol} gap-8`}>
                <NoDataImg />
                <div className="text-center text-neutral-black">
                    <p className="text-base">
                        로그인되지 않았어요.
                    </p>
                    <p className="text-base">
                        로그인하면 측정한 소음을 저장하고
                    </p>
                    <p className="text-base">
                        기록을 확인할 수 있어요.
                    </p>
                </div>
            </div>
            <Link 
                href="/sign-in" 
                className={`
                    ${flexRowCenter}
                    w-85
                    h-[3.125rem] 
                    rounded-[3.625rem] 
                    bg-primary
                `}
            >
                <p className="text-xl font-semibold text-white">
                    로그인하거나 가입하기
                </p>
            </Link>
        </section>
    );
}