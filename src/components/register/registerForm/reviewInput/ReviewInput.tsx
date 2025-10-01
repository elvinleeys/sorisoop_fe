"use client";

import { useReviewStore } from "@/store/register/reviewStore";
import { OneLineReviewInput } from "soridam-design-system";
import ReviewButton from "../reviewButton/ReviewButton";

interface ReviewInputProps {
    onSubmit: () => void;
    isSubmitting: boolean;
}

export default function ReviewInput({ 
    onSubmit, 
    isSubmitting 
}: ReviewInputProps) {

    const { 
        value, 
        setValue, 
        submitAttempted, 
        setSubmitAttempted, 
        isValid 
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
            <ReviewButton 
                onSubmit={onSubmit} 
                isSubmitting={isSubmitting} 
                isValid={isValid}
            />
        </>
    );
}
