// 공통 응답 DTO
export interface ApiResponse<T = undefined> {
  message: string;
  data?: T;
}

// 공통 에러
export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}