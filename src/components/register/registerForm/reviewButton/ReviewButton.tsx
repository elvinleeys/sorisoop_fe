import React from "react";
import { Button } from "soridam-design-system";

interface ReviewButtonProps {
    isSubmitting: boolean;
    isValid: boolean; // store에서 가져오던 값 prop으로 전달
    onSubmit: () => void;
}

function ReviewButtonBase({ 
    onSubmit, 
    isSubmitting,
    isValid 
}: ReviewButtonProps) {

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
