import React from "react";
import { Button } from "soridam-design-system";
import { useReviewStore } from "@/store/register/reviewStore";

interface ReviewButtonProps {
    isSubmitting: boolean
    onSubmit: () => void;
}

function ReviewButtonBase({ onSubmit, isSubmitting }: ReviewButtonProps) {
    // 타입 명시
    const isValid = useReviewStore((state) => state.isValid);

    return (
        <div className="w-full h-[3.125rem] flex justify-center items-center">
            <Button
                buttonType={isValid ? "primary" : "secondary"}
                size="large"
                disabled={isSubmitting}
                onClick={onSubmit}
            >
                {isSubmitting ? "등록 중..." : "등록하기"}
            </Button>
        </div>
    );
}

export default React.memo(ReviewButtonBase);
