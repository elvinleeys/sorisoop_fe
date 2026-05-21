"use client";

import { useRef } from "react";
import { AudioEngine } from "../engine/AudioEngine";
import { createDecibelScheduler } from "../scheduler/createDecibelScheduler";
import { useMeasurementSessionStore } from "../store/measurement-session";

export const useMeasurementController = () => {
    const engineRef = useRef<AudioEngine | null>(null);
    const schedulerRef = useRef<ReturnType<
        typeof createDecibelScheduler
    > | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const {
        startMeasurement,
        startPreparing,
        updateMeasurement,
        readyToSave,
        resetMeasurement,
    } = useMeasurementSessionStore();

    const start = async () => {
        startPreparing();

        try {
            if (!engineRef.current) {
                engineRef.current = new AudioEngine();
            }

            const engine = engineRef.current;

            await engine.prepare();

            // ⭐ 준비 중 취소됐으면 종료
            if (engineRef.current !== engine) return;

            startMeasurement();

            const scheduler = createDecibelScheduler((db) => {
                updateMeasurement(db);
            }, 100);

            scheduler.start();

            await engine.start((db) => {
                scheduler.push(db);
            });

            schedulerRef.current = scheduler;

            timeoutRef.current = setTimeout(() => {
                readyToSave();
            }, 15000);
        } catch {
            resetMeasurement();
        }
    };

    const stop = () => {
        engineRef.current?.stop();
        schedulerRef.current?.stop();

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const reset = () => {
        stop();
        resetMeasurement();
    };

    return {
        start,
        stop,
        reset,
    };
};
