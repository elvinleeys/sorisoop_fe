import { MapControllerOptions } from "@/shared/types/kakaoMap";

export function createMapController(
    mapEl: HTMLElement,
    options: MapControllerOptions,
) {
    const map = new window.kakao.maps.Map(mapEl, {
        center: new window.kakao.maps.LatLng(options.lat, options.lng),
        level: options.level ?? 3,
        draggable: options.draggable ?? false,
    });

    map.setZoomable(options.zoomable ?? true);

    return {
        map,

        setCenter(lat: number, lng: number) {
            map.setCenter(new window.kakao.maps.LatLng(lat, lng));
        },

        setLevel(level: number) {
            map.setLevel(level);
        },
    };
}
