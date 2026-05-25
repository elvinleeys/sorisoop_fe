export interface MapMarker {
    id?: string;
    lat: number;
    lng: number;
    image?: string;
}

export interface MarkerInstance {
    marker: kakao.maps.Marker;
    image?: string;
    size?: number;
}

export interface MapControllerOptions {
    lat: number;
    lng: number;
    level?: number;
    draggable?: boolean;
    zoomable?: boolean;
}

export interface MapController {
    map: kakao.maps.Map;
    setCenter(lat: number, lng: number): void;
    setLevel(level: number): void;
}

export type MarkerImageCache = (
    src: string,
    size: number,
) => kakao.maps.MarkerImage;

export interface Bounds {
    swLat: number;
    swLng: number;
    neLat: number;
    neLng: number;
}
