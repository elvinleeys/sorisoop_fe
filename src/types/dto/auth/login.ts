// 로그인 응답
export interface SignInResponse {
  accessToken?: string;
  message?: string;
}

// 로그인 에러 (추후 다른 에러들과 합칠 수도 있음)
export class SignInError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "SignInError";
  }
}

// 로그인 요청 payload
export interface SignInPayload {
  email: string;
  password: string;
}