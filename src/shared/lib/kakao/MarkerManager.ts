import {
    MapMarker,
    MarkerImageCache,
    MarkerInstance,
} from "@/shared/types/kakaoMap";

interface SyncMarkersParams {
    markers: MapMarker[];
    markerSize: number;
    imageCache: MarkerImageCache;
    onMarkerClick?: (marker: MapMarker) => void;
}

export function createMarkerManager(map: kakao.maps.Map) {
    const markerMap = new Map<string, MarkerInstance>();

    return {
        syncMarkers({
            markers,
            markerSize,
            imageCache,
            onMarkerClick,
        }: SyncMarkersParams) {
            const nextIds = new Set(markers.map((m) => m.id));

            /**
             * 제거
             */
            markerMap.forEach((value, id) => {
                if (!nextIds.has(id)) {
                    value.marker.setMap(null);
                    markerMap.delete(id);
                }
            });

            /**
             * 생성 + 업데이트
             */
            markers.forEach((m) => {
                if (!m.id) return;

                const position = new window.kakao.maps.LatLng(m.lat, m.lng);

                const existing = markerMap.get(m.id);

                if (existing) {
                    existing.marker.setPosition(position);

                    if (m.image) {
                        existing.marker.setImage(
                            imageCache(m.image, markerSize),
                        );
                    }

                    existing.marker.setMap(map);

                    existing.image = m.image;

                    return;
                }

                const marker = new window.kakao.maps.Marker({
                    position,
                    image: m.image
                        ? imageCache(m.image, markerSize)
                        : undefined,
                });

                if (onMarkerClick) {
                    window.kakao.maps.event.addListener(marker, "click", () => {
                        onMarkerClick(m);
                    });
                }

                marker.setMap(map);

                markerMap.set(m.id, {
                    marker,
                    image: m.image,
                });
            });
        },

        resizeMarkers(size: number, imageCache: MarkerImageCache) {
            markerMap.forEach((value) => {
                if (!value.image) return;

                value.marker.setImage(imageCache(value.image, size));
            });
        },

        clear() {
            markerMap.forEach((value) => {
                value.marker.setMap(null);
            });

            markerMap.clear();
        },
    };
}
