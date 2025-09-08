export type DecibelLevel = "quiet" | "moderate" | "loud" | "default";
export type Decibelsize = "sm" | "md" | "lg"

export const modalItems: { 
    level: DecibelLevel; 
    size: Decibelsize; 
    levelText: string; 
    iconClassName: string; 
    description: string; 
}[] = [
    {
        level: "quiet",
        size: "md",
        levelText: "0~70dB",
        iconClassName: "quiet icon",
        description: "전화벨 수준으로, 일상 생활에 영향이 없습니다.",
    },
    {
        level: "moderate",
        size: "md",
        levelText: "70~100dB",
        iconClassName: "moderate icon",
        description: "자동차 경적 수준. 장시간 노출 시 주의가 필요합니다.",
    },
    {
        level: "loud",
        size: "md",
        levelText: "100~120dB",
        iconClassName: "loud icon",
        description: "항공기 이륙 수준. 짧은 시간 노출도 위험합니다.",
    },
];