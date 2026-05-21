export function createDecibelScheduler(
    onUpdate: (db: number) => void,
    interval = 100,
) {
    let latestDb = 0;
    let timer: NodeJS.Timeout | null = null;

    const push = (db: number) => {
        latestDb = db;
    };

    const start = () => {
        timer = setInterval(() => {
            onUpdate(latestDb);
        }, interval);
    };

    const stop = () => {
        if (timer) clearInterval(timer);
    };

    return {
        push,
        start,
        stop,
    };
}
