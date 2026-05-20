import React, { ReactNode } from "react";

interface CircleRingProps {
    progress?: number; // 0~1
    size?: number; // px
    strokeWidth?: number; // px
    children?: ReactNode;
    color?: string;
    spin?: boolean;
}

export default function CircleRing({
    progress = 0,
    size = 220,
    strokeWidth = 12,
    children,
    color = "#3D87FF",
    spin = false,
}: CircleRingProps) {
    const r = (size - strokeWidth) / 2;
    const circ = 2 * Math.PI * r;
    const dash = circ * Math.min(progress, 1);

    return (
        <div className="flex justify-center w-full h-[13.75rem] mb-[1.0625rem]">
            <div className="relative" style={{ width: size, height: size }}>
                <svg
                    width={size}
                    height={size}
                    className="absolute top-0 left-0 -rotate-90"
                >
                    {/* 배경 원 */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={r}
                        fill="none"
                        stroke="#CFE2FF"
                        strokeWidth={strokeWidth}
                    />
                    {/* 진행 원 */}
                    {spin ? (
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={r}
                            fill="none"
                            stroke={color}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={`${circ * 0.22} ${circ * 0.78}`}
                            className="animate-spin origin-center"
                        />
                    ) : (
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={r}
                            fill="none"
                            stroke={color}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={`${dash} ${circ - dash}`}
                            className="transition-[stroke-dasharray] duration-500 ease-in-out"
                        />
                    )}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {children}
                </div>
            </div>
        </div>
    );
}
