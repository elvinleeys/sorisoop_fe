import { flexColCenter } from "@/mixin/style";

export function MeasureDS() {
    return (
        <div 
            className={`
                ${flexColCenter} 
                w-full 
                min-h-[2.5rem]
            `}
        >
            <p className="text-sm text-neutral-sub text-center">
                소음 측정을 시작할 준비가 됐어요!
            </p>
            <p className="text-sm text-neutral-sub text-center">
                평균값을 얻으려면 15초 동안 측정해볼게요.
            </p>
        </div>
    );
}