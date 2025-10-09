import { CheckEmailResponse } from "@/types/dto/sign-up/CheckEmail";

export interface CheckEmailRequest {
  email: string;
}

export async function fetchCheckEmail(
    body: CheckEmailRequest
): Promise<CheckEmailResponse> {
  const res = await fetch("/api/auth/check-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("서버와 통신 중 오류가 발생했습니다.");
  }

  return res.json();
}