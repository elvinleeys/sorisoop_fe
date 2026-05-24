const markerImageCache = new Map<string, kakao.maps.MarkerImage>();

export function getCachedMarkerImage(src: string, size: number) {
    const key = `${src}-${size}`;

    const cached = markerImageCache.get(key);

    if (cached) return cached;

    const image = new window.kakao.maps.MarkerImage(
        src,
        new window.kakao.maps.Size(size, size),
    );

    markerImageCache.set(key, image);

    return image;
}
