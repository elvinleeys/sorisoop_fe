export interface NoiseDataDto {
  id: string;
  lat: number;
  lng: number;
  avgDecibel: number | null;
  placeName: string;
}