interface SideBarItemType {
  label: string;
  path?: string;
  onClick?: () => void;
  className?: string;
}

// 2. SideBarSectionType 정의
interface SideBarSectionType {
  title: string;
  items: SideBarItemType[]; // items 배열은 SideBarItemType 객체만 가질 수 있도록 명시
}

export const SideBarMenu = (
    accessToken: string | null, 
    handleLogout: () => void, 
    handleDeleteAccount: () => void
): SideBarSectionType[] => [
  {
    title: "정보",
    items: [
      { label: "공지사항", className: "text-neutral-sub" }, // toast
    ],
  },
  {
    title: "고객센터",
    items: [
      { label: "1:1 문의", className: "text-neutral-sub" }, // toast
    ],
  },
  {
    title: "약관",
    items: [
      { label: "개인정보 처리방침", className: "text-neutral-sub" },
      { label: "서비스 이용약관", className: "text-neutral-sub" },
      { label: "오픈소스 라이선스", className: "text-neutral-sub" },
      !accessToken
        ? { label: "로그인", path: "/sign-in", className: "text-[#0F6FFF]" }
        : { label: "로그아웃", onClick: handleLogout, className: "text-[#0F6FFF]" },
      accessToken
        ? { label: "회원탈퇴", onClick: handleDeleteAccount, className: "text-[#FF826E]" }
        : null,
    ].filter(Boolean) as SideBarItemType[], // null 제거
  },
];