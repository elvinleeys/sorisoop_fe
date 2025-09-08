import { useRef } from "react";

export const useDecibelMeasurement = () => {
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const decibelsInIntervalRef = useRef<number[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const streamRef = useRef<MediaStream | null>(null); // 👈 추가

    const calibrationOffset = 0;
    const rmsOffset = 80;

    const stopMeasurement = () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop()); // 👈 마이크 정지
            streamRef.current = null;
        }
    };

    const startMeasurement = (addDecibel: (decibel: number) => void, setCurrentDecibel: (decibel: number) => void) => {
        stopMeasurement();
        decibelsInIntervalRef.current = [];

        const updateDecibel = () => {
            const analyser = analyserRef.current;
            if (!analyser) return;

            const bufferLength = analyser.fftSize;
            const dataArray = new Float32Array(bufferLength);
            analyser.getFloatTimeDomainData(dataArray);

            let sumSquares = 0;
            for (let i = 0; i < bufferLength; i++) {
                sumSquares += dataArray[i] * dataArray[i];
            }
            const rms = Math.sqrt(sumSquares / bufferLength);
            const currentDb = rms > 0 ? 20 * Math.log10(rms) : -100;
            const finalDb = Math.min(Math.max(currentDb + calibrationOffset + rmsOffset, 0), 120);

            decibelsInIntervalRef.current.push(finalDb);

            animationFrameRef.current = requestAnimationFrame(updateDecibel);
        };

        const startAudioProcessing = async () => {
            try {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
                analyserRef.current = audioContextRef.current.createAnalyser();
                analyserRef.current.fftSize = 2048;

                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                streamRef.current = stream; // 👈 저장
                const source = audioContextRef.current.createMediaStreamSource(stream);
                source.connect(analyserRef.current);

                await audioContextRef.current.resume();
                updateDecibel();

                intervalRef.current = setInterval(() => {
                    if (decibelsInIntervalRef.current.length > 0) {
                        const sum = decibelsInIntervalRef.current.reduce((a, b) => a + b, 0);
                        const averageDb = sum / decibelsInIntervalRef.current.length;

                        setCurrentDecibel(averageDb);
                        addDecibel(averageDb);

                        decibelsInIntervalRef.current = [];
                    }
                }, 250);

            } catch (err) {
                console.error("마이크 접근 실패:", err);
            }
        };

        startAudioProcessing();
    };

    return { startMeasurement, stopMeasurement };
};
