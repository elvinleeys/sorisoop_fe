export type DecibelListener = (db: number) => void;

export class AudioEngine {
    private audioContext: AudioContext | null = null;
    private analyser: AnalyserNode | null = null;
    private stream: MediaStream | null = null;
    private animationFrame: number | null = null;
    private prepared = false;
    private aborted = false;

    async prepare() {
        if (this.prepared) return;

        this.aborted = false;

        this.audioContext = new AudioContext();

        this.stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });

        if (this.aborted) return; // ⭐ 취소 체크

        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 2048;

        const source = this.audioContext.createMediaStreamSource(this.stream);
        source.connect(this.analyser);

        await this.audioContext.resume();

        if (this.aborted) return;

        this.prepared = true;
    }

    async start(listener: (db: number) => void) {
        if (!this.prepared) {
            await this.prepare();
        }

        this.loop(listener);
    }

    private loop = (listener: (db: number) => void) => {
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

        const finalDb = Math.min(Math.max(currentDb + 80, 0), 120);

        listener(finalDb);

        this.animationFrame = requestAnimationFrame(() => this.loop(listener));
    };

    stop() {
        this.aborted = true; // ⭐ 핵심

        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }

        this.stream?.getTracks().forEach((t) => t.stop());
        this.stream = null;

        this.audioContext?.close();
        this.audioContext = null;

        this.analyser = null;
        this.prepared = false;
    }

    destroy() {
        this.stop();
        this.stream?.getTracks().forEach((t) => t.stop());
        this.audioContext?.close();

        this.audioContext = null;
        this.analyser = null;
        this.stream = null;
        this.prepared = false;
    }
}
