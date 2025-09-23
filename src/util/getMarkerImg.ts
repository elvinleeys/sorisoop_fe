export function getMarkerImg(avgDecibel: number): string {
  if (avgDecibel >= 100) return "/icons/loud.svg";
  if (avgDecibel > 70) return "/icons/moderate.svg";
  return "/icons/quiet.svg";
}