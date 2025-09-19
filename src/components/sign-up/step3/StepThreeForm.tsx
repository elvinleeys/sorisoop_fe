"use client";

import { flexRowCenter } from "@/mixin/style";
import { useSignUpStore } from "@/store/signUp/SignUpStore";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "soridam-design-system";

export default function StepThreeForm() {
    const { formData } = useSignUpStore();
    const router = useRouter();
    const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        // scroll이 끝까지 내려갔을 경우
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            setIsScrolledToEnd(true);
        }
    };

    const handleSubmit = async () => {
        if (!isScrolledToEnd) return;
        if (!formData.email || !formData.password || !formData.nickname) {
            setError("회원가입 정보를 확인해주세요.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    nickname: formData.nickname,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "회원가입 중 오류가 발생했습니다.");
                setLoading(false);
                return;
            }

            // 회원가입 성공 시 /sign-in 페이지로 이동
            router.push("/sign-in");
        } catch (err) {
            console.error(err);
            setError("서버와 통신 중 오류가 발생했습니다.");
            setLoading(false);
        }
    };

    return(
        <section>
            <h3 className="text-base !font-bold text-[#2A2A2A] mb-3">
                개인정보 보호정책
            </h3>
            <article
                ref={scrollRef}
                onScroll={handleScroll}
                className="
                    w-full 
                    h-97 
                    px-3 
                    py-2.5 
                    mb-11 
                    overflow-y-scroll
                    bg-[#F5F5F5]
                    rounded-[0.5rem]
                "
            >
                <ol className="list-decimal pl-5 space-y-4">
                    <li>
                        <h4 className="font-semibold mb-1">개인정보 수집 목적</h4>
                        <p>
                            소리담은 사용자에게 최적의 서비스를 제공하고, 소음 측정 데이터를 저장 및 관리할 수 있도록 하기 위해 개인정보를 수집합니다.
                        </p>
                    </li>
                    <li>
                        <h4 className="font-semibold mb-1">수집하는 개인정보 항목</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>
                                <strong>필수 정보:</strong> 이메일, 닉네임, 비밀번호
                            </li>
                            <li>
                                <strong>선택 정보:</strong> 프로필 이미지 (추후 업데이트 예정)
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h4 className="font-semibold mb-1">개인정보 수집 및 이용 목적</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>계정 생성 및 사용자 인증</li>
                            <li>소음 데이터 저장 및 기록 관리</li>
                            <li>서비스 개선 및 고객 지원</li>
                        </ul>
                    </li>
                    <li>
                        <h4 className="font-semibold mb-1">개인정보 보관 기간</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>계정 탈퇴 시 즉시 삭제</li>
                            <li>법적 의무가 있는 경우, 해당 기간 동안 보관 후 삭제</li>
                        </ul>
                    </li>
                    <li>
                        <h4 className="font-semibold mb-1">개인정보 제3자 제공 여부</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>원칙적으로 사용자의 동의 없이 개인정보를 외부에 제공하지 않습니다.</li>
                            <li>법령에 의해 요구되는 경우에만 예외적으로 제공될 수 있습니다.</li>
                        </ul>
                    </li>
                    <li>
                        <h4 className="font-semibold mb-1">개인정보 보호를 위한 보안 조치</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>사용자 데이터는 암호화하여 안전하게 저장됩니다.</li>
                            <li>비밀번호는 해시 처리되어 저장되며, 내부에서도 확인할 수 없습니다.</li>
                        </ul>
                    </li>
                    <li>
                        <h4 className="font-semibold mb-1">사용자 권리 및 동의 철회</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>사용자는 언제든지 계정 정보를 수정하거나 삭제할 수 있습니다.</li>
                            <li>개인정보 관련 문의는 고객센터를 통해 접수 가능합니다.</li>
                        </ul>
                    </li>
                </ol>
            </article>
            <p className="px-5.5 text-sm text-[#454545] text-center">
                &apos;가입하기&apos;버튼을 누르면 소리담의 <span className="text-primary">개인정보보호 정책</span>과&nbsp;
                <span className="text-primary">서비스 이용 약관</span>을 읽고 동의한 것으로 간주합니다.
            </p>
            <div className={`w-full ${flexRowCenter} mt-[1.4375rem]`}>
                <Button 
                    buttonType={isScrolledToEnd || loading ? "primary" : "secondary"}
                    size="large" 
                    disabled={loading || !isScrolledToEnd}
                    onClick={handleSubmit}
                >
                    {loading ? "가입 중..." : "가입하기"}
                </Button>
            </div>
        </section>
    );
}