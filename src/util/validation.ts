// Nickname validation
export function validateNickname(
    value: string
): string | null {
    if (!value.trim()) {
        return "닉네임을 입력해주세요";
    }
    // 한글 자모(ㄱ-ㅎ, ㅏ-ㅣ)까지 허용
    if (/[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]/.test(value)) {
        return "닉네임에 특수문자는 사용할 수 없습니다";
    }
    if (value.length > 8) {
        return "닉네임은 최대 8글자까지 가능합니다";
    }
    return null;
};

// Email validation
export function validateEmail(email: string): string | null {
  if (!email) return "이메일을 입력해주세요.";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return "올바른 이메일 형식이 아닙니다.";
  const allowedDomains = [
    "naver.com",
    "gmail.com",
    "daum.net",
    "kakao.com",
    "hotmail.com",
    "outlook.com",
    "yahoo.com",
  ];
  const domain = email.split("@")[1];
  if (!domain || !allowedDomains.includes(domain)) return "사용하실 수 없는 이메일입니다.";
  return null;
}

// Password validation
export function validatePasswordValue(
    password: string
): string | null {
  if (!password) return "비밀번호를 입력해주세요.";
  if (password.length < 8) return "비밀번호는 8자 이상이어야 합니다.";
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) return "사용하실 수 없는 비밀번호입니다.";
  return null;
}

export function validatePasswordConfirm(
    password: string, 
    confirm: string
): string | null {
  if (password !== confirm) return "비밀번호가 일치하지 않습니다.";
  return null;
}