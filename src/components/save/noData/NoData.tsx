import { flexColCenter } from "@/mixin/style";
import NoDataImg from "../noDataImg/NoDataImg";

export default function NoData() {
    const textStyle = "text-base";

    return (
        <section className={`${flexColCenter} gap-8 mt-25.5`}>
            <NoDataImg />
            <div className="text-center text-neutral-black">
                <p className={textStyle}>
                    저장된 데이터가 없습니다.
                </p>
                <p className={textStyle}>
                    소음을 측정하고 데이터를 저장해보세요!
                </p>
            </div>
        </section>
    );
}