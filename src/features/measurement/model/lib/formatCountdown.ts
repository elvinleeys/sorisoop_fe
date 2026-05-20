export function formatCountdown(time: number) {
    if (time >= 0) {
        return `00:${time.toString().padStart(2, "0")}`;
    }

    const elapsed = Math.abs(time);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;

    return `+${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
}
