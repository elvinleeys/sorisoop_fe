"use client";

import { useRef } from "react";

import { AudioEngine } from "../engine/AudioEngine";
import { createDecibelScheduler } from "../scheduler/createDecibelScheduler";
import { useDecibelUIStore } from "../store/decibel-ui";

export const useDecibelMeasurement = () => {
    const engineRef = useRef<AudioEngine | null>(null);

    const schedulerRef = useRef<ReturnType<
        typeof createDecibelScheduler
    > | null>(null);

    // 실제 저장용 전체 데이터
    const measurementHistoryRef = useRef<number[]>([]);

    const updateUI = useDecibelUIStore((s) => s.updateUI);
    const resetUI = useDecibelUIStore((s) => s.resetUI);

    const startMeasurement = async () => {
        resetUI();

        measurementHistoryRef.current = [];

        const engine = new AudioEngine();

        const scheduler = createDecibelScheduler((db) => {
            updateUI(db);
        }, 100);

        scheduler.start();

        await engine.start((db) => {
            // 전체 데이터 저장
            measurementHistoryRef.current.push(db);

            // UI 전송
            scheduler.push(db);
        });

        engineRef.current = engine;
        schedulerRef.current = scheduler;
    };

    const stopMeasurement = () => {
        engineRef.current?.stop();
        schedulerRef.current?.stop();

        engineRef.current = null;
        schedulerRef.current = null;
    };

    const getMeasurementHistory = () => {
        return measurementHistoryRef.current;
    };

    return {
        startMeasurement,
        stopMeasurement,
        getMeasurementHistory,
    };
};
