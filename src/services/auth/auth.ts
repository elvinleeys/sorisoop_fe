import { SignInError, SignInPayload, SignInResponse } from "@/types/dto/auth/login";
import { LogoutResponse } from "@/types/dto/auth/logout";
import { DeleteAccountResponse } from "@/types/dto/auth/deleteAccount";
import { AuthError } from "@/types/dto/auth/common";

// 로그인
export async function signIn(payload: SignInPayload): Promise<SignInResponse> {
  const res = await fetch("/api/auth/sign-in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data: SignInResponse = await res.json();
  if (!res.ok) throw new SignInError(data.message || "로그인 실패");
  return data;
}

// 로그아웃
export async function logoutRequest(): Promise<LogoutResponse> {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  const data: LogoutResponse = await res.json();
  if (!res.ok) throw new AuthError(data.message || "로그아웃 실패");
  return data;
}

// 회원탈퇴
export async function deleteAccountRequest(): Promise<DeleteAccountResponse> {
  const res = await fetch("/api/auth/delete", {
    method: "DELETE",
    credentials: "include",
  });
  const data: DeleteAccountResponse = await res.json();
  if (!res.ok) throw new AuthError(data.message || "회원 탈퇴 실패");
  return data;
}
