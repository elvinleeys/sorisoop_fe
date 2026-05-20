"use client";

import FadeInUp from "@/components/animate/fadeInUp/FadeInUp";
import { flexColCenter } from "@/mixin/style";

import { useMeasurementSessionStore } from "../model/store/measurement-session";
import { MEASUREMENT_TEXT } from "../model/constant/measurement-text";

export function MeasurementDescription() {
    const status = useMeasurementSessionStore((s) => s.status);

    const [title, description] = MEASUREMENT_TEXT[status];

    return (
        <FadeInUp
            keyProp={status}
            className={`
                ${flexColCenter}
                w-full
                min-h-[2.5rem]
            `}
        >
            <p className="text-sm text-neutral-sub text-center">{title}</p>
            <p className="text-sm text-neutral-sub text-center">
                {description}
            </p>
        </FadeInUp>
    );
}
