export interface CategoryOption {
  label: string;   // 화면에 표시될 한글 이름
  iconSrc: string; // 아이콘 경로
}

export const options: CategoryOption[] = [
  { label: "카페", iconSrc: "/icons/filter/category/cafe-ico.webp" },
  { label: "음식점", iconSrc: "/icons/filter/category/cutlery-ico.webp" },
  { label: "문화시설", iconSrc: "/icons/filter/category/culture-ico.webp" },
  { label: "관광명소", iconSrc: "/icons/filter/category/tour-ico.webp" },
];

// 한글 라벨 → Category 타입 매핑
export const labelToCategoryMap: Record<string, "cafe" | "cutlery" | "culture" | "tour"> = {
  카페: "cafe",
  음식점: "cutlery",
  문화시설: "culture",
  관광명소: "tour",
};
