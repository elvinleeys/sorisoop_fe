export function getMarkerSize(level: number) {
    switch (level) {
        case 1:
            return 32;
        case 2:
            return 28;
        case 3:
            return 24;
        case 4:
            return 20;
        case 5:
            return 16;
        default:
            return 24;
    }
}
