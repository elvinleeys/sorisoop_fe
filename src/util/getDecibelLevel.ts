// 데시벨 값에 따라 레벨을 결정하는 함수
export function getDecibelLevel(db: number, status: string) {
  if (status === "idle") return "default";
  if (db <= 70) return "quiet";
  if (db > 70 && db < 100) return "moderate";
  if (db >= 100) return "loud";
  return "default";
};

export function getMarkerImg(avgDecibel: number | null): string {
  if (avgDecibel === null) return "/icons/default.svg"; // 소음 데이터 없는 경우 기본 마커
  if (avgDecibel >= 100) return "/icons/loud.svg";
  if (avgDecibel >= 70) return "/icons/moderate.svg";
  return "/icons/quiet.svg";
}