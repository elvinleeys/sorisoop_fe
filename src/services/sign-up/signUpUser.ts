import { SignUpResponse } from "@/types/dto/SignUp";

export interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
}

export async function signUpUser(
    body: SignUpRequest
): Promise<SignUpResponse> {
    const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const data: SignUpResponse = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "회원가입 중 오류가 발생했습니다.");
    }

    return data;
}