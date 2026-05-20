export function formatDecibel(value: number) {
    return Math.round(value).toString().padStart(2, "0");
}
