/**
 * 두 좌표가 거의 같은지 확인
 * @param aLat DB 또는 첫 번째 좌표 위도
 * @param aLng DB 또는 첫 번째 좌표 경도
 * @param bLat 비교할 두 번째 좌표 위도
 * @param bLng 비교할 두 번째 좌표 경도
 * @param tolerance 허용 오차 (기본: 0.0001)
 */
export function isSameLocation(
  aLat: number,
  aLng: number,
  bLat: number,
  bLng: number,
  tolerance = 0.0001
) {
  return (
    Math.abs(aLat - bLat) < tolerance &&
    Math.abs(aLng - bLng) < tolerance
  );
}