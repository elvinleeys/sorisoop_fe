"use client";

import { useReviewStore } from "@/store/register/reviewStore";
import { OneLineReviewInput } from "soridam-design-system";
import ReviewButton from "../reviewButton/ReviewButton";

export default function ReviewInput({ onSubmit }: { onSubmit: () => void }) {
    const { 
        value, 
        setValue, 
        submitAttempted, 
        setSubmitAttempted 
    } = useReviewStore();

    return (
        <>
            <div className="mb-[4.0625rem]">
                <OneLineReviewInput
                value={value}
                onChange={(val) => setValue(val)}
                maxLength={150}
                submitAttempted={submitAttempted}
                onFocus={() => setSubmitAttempted(false)}
                />
            </div>
            <ReviewButton onSubmit={onSubmit} />
        </>
    );
}
