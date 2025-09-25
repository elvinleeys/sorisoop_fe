export function getMarkerImg(avgDecibel: number | null): string {
  if (avgDecibel === null) return "/icons/default.svg"; // 소음 데이터 없는 경우 기본 마커
  if (avgDecibel >= 100) return "/icons/loud.svg";
  if (avgDecibel >= 70) return "/icons/moderate.svg";
  return "/icons/quiet.svg";
}