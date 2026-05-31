export function getMapLevel(radius?: number | null) {
    if (!radius) return 2;

    if (radius <= 200) return 2;
    if (radius <= 300) return 3;
    if (radius <= 500) return 4;
    if (radius <= 1000) return 5;

    return 2;
}
