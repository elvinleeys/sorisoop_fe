import SLocationInfo from "./locationInfo/SLocationInfo";
import SDecibelResult from "./decibelResult/SDecibelResult";
import Comment from "./comment/Comment";
import { flexCol } from "@/mixin/style";
import { formatDateTime } from "@/util/formatDateTime";
import { getDecibelLevel } from "@/util/getDecibelLevel";

interface ResultDetailProps {
    placeName: string;
    avgDecibel: number;
    maxDecibel: number;
    measuredAt: string;
    comment: string;
}

export default function ResultDetail({
    placeName,
    avgDecibel,
    maxDecibel,
    measuredAt,
    comment,
}: ResultDetailProps) {
    const RDate = new Date(measuredAt);
    const { date, time } = formatDateTime(RDate);
    const decibelLevel = getDecibelLevel(avgDecibel);

    return (
        <section>
            <div className={`${flexCol} gap-[1.25rem]`}>
                <SLocationInfo placeName={placeName} decibelLevel={decibelLevel} date={date} time={time} />
                <SDecibelResult avgDecibel={avgDecibel} maxDecibel={maxDecibel} />
                <Comment comment={comment} />
            </div>
        </section>
    );
}