export type DecibelListener = (db: number) => void;

export class AudioEngine {
    private audioContext: AudioContext | null = null;
    private analyser: AnalyserNode | null = null;
    private stream: MediaStream | null = null;
    private animationFrame: number | null = null;

    private listener: DecibelListener | null = null;

    private readonly calibrationOffset = 0;
    private readonly rmsOffset = 80;

    async start(listener: DecibelListener) {
        this.listener = listener;

        this.audioContext = new AudioContext();

        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 2048;

        this.stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });

        const source = this.audioContext.createMediaStreamSource(this.stream);

        source.connect(this.analyser);

        await this.audioContext.resume();

        this.loop();
    }

    private loop = () => {
        if (!this.analyser) return;

        const bufferLength = this.analyser.fftSize;

        const dataArray = new Float32Array(bufferLength);

        this.analyser.getFloatTimeDomainData(dataArray);

        let sumSquares = 0;

        for (let i = 0; i < bufferLength; i++) {
            sumSquares += dataArray[i] * dataArray[i];
        }

        const rms = Math.sqrt(sumSquares / bufferLength);

        const currentDb = rms > 0 ? 20 * Math.log10(rms) : -100;

        const finalDb = Math.min(
            Math.max(currentDb + this.calibrationOffset + this.rmsOffset, 0),
            120,
        );

        this.listener?.(finalDb);

        this.animationFrame = requestAnimationFrame(this.loop);
    };

    stop() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        this.stream?.getTracks().forEach((track) => {
            track.stop();
        });

        this.audioContext?.close();

        this.audioContext = null;
        this.analyser = null;
        this.stream = null;
        this.animationFrame = null;
    }
}
