import { flexCol, flexRow } from "@/mixin/style";

interface DecibelResultProps {
    avgDecibel: number;
    maxDecibel: number;
}

export default function SDecibelResult({ avgDecibel, maxDecibel }: DecibelResultProps) {
    return (
        <article className={`w-[13.5rem] ${flexCol} gap-[0.75rem]`}>
            <h3 className="w-full h-[1.5rem] text-base !font-bold text-neutral-black">
                소음 측정 결과
            </h3>
            <div className={`w-full h-[2.125rem] ${flexRow} gap-[1rem]`}>
                <div className="w-[6.25rem] h-[2.125rem] p-[0.3125rem] border border-neutral-gray-soft rounded-[0.375rem]">
                    <p className="text-base text-black">
                        평균 {avgDecibel.toFixed(0)}
                    </p>
                </div>
                <div className="w-[6.25rem] h-[2.125rem] p-[0.3125rem] border border-neutral-gray-soft rounded-[0.375rem]">
                    <p className="text-base text-black">
                        최대 {maxDecibel.toFixed(0)}
                    </p>
                </div>
            </div>
        </article>
    );
}