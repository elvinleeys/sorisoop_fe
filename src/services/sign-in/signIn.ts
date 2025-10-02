export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken?: string;
  message?: string;
}

export class SignInError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "SignInError";
  }
}

export async function signIn(payload: SignInPayload): Promise<SignInResponse> {
  const res = await fetch("/api/auth/sign-in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data: SignInResponse = await res.json();

  if (!res.ok) {
    throw new SignInError(data.message || "로그인 실패");
  }

  return data;
}