"use client";

import { MeasureDecibelLabel } from "soridam-design-system";

interface Props {
    level: "default" | "quiet" | "moderate" | "loud";
}

export default function DecibelLevelBadge({ level }: Props) {
    return <MeasureDecibelLabel level={level} />;
}
