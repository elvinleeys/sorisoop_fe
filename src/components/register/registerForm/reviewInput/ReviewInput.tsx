"use client";

import { flexRowCenter } from "@/mixin/style";
import { Button, OneLineReviewInput } from "soridam-design-system";

interface ReviewInputProps {
    value: string;
    onChange: (val: string) => void;
    onSubmit: () => void;
}

export default function ReviewInput({ value, onChange, onSubmit }: ReviewInputProps) {
    return (
        <>
            <div className="mb-[4.0625rem]">
                <OneLineReviewInput value={value} onChange={onChange} maxLength={150} />
            </div>
            <div className={`w-full h-[3.125rem] ${flexRowCenter}`}>
                <Button buttonType="primary" size="large" onClick={onSubmit}>
                    등록하기
                </Button>
            </div>
        </>
  );
}
