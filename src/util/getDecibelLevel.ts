type MDecibelLevel = 'default' | 'quiet' | 'moderate' | 'loud';
type DecibelLevel = 'quiet' | 'moderate' | 'loud';

// 1. 오버로드 시그니처 (2가지 형태 정의)
export function getDecibelLevel(db: number, status: string): MDecibelLevel;
export function getDecibelLevel(db: number): DecibelLevel;

// 데시벨 값에 따라 레벨을 결정하는 함수
export function getDecibelLevel(db: number, status?: string) {
  if (status === "idle") return "default";
  if (db <= 70) return "quiet";
  if (db > 70 && db < 100) return "moderate";
  return "loud";
};

// 1. 오버로드 시그니처 (2가지 형태 정의)
export function getMarkerImg(avgDecibel: number | null): string;
export function getMarkerImg(db: number): string;

export function getMarkerImg(avgDecibel: number | null): string {
  if (avgDecibel === null) return "/icons/decibel/default.webp"; // 소음 데이터 없는 경우 기본 마커
  if (avgDecibel >= 100) return '/icons/decibel/loud.webp';
  if (avgDecibel >= 70) return '/icons/decibel/moderate.webp'; // 70 <= db < 100
  return '/icons/decibel/quiet.webp'; // db < 70
}