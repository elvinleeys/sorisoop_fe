import SLocationInfo from "./locationInfo/SLocationInfo";
import SDecibelResult from "./decibelResult/SDecibelResult";
import Comment from "./comment/Comment";
import { flexCol } from "@/mixin/style";
import { formatDateTime } from "@/util/formatDateTime";

const getDecibelLevel = (db: number) => {
  if (db <= 70) return "quiet";
  if (db < 100) return "moderate"; // 이미 db > 70 인 상황
  return "loud"; // 나머지는 전부 100 이상
};

export default function ResultDetail() {
    const comment = "저녁에는 시끄러웠는데, 의외로 점심 시간에는 조용했어요."
    const RDate = new Date();
    const { date, time } = formatDateTime(RDate);
    const avgDecibel = 30;
    const maxDecibel = 60;
    const decibelLevel = getDecibelLevel(avgDecibel);
    const placeName = "합정역 엔트러사이트";

    return (
        <section>
            <div className={`${flexCol} gap-[1.25rem]`}>
                <SLocationInfo placeName={placeName!} decibelLevel={decibelLevel} date={date} time={time} />
                <SDecibelResult avgDecibel={avgDecibel} maxDecibel={maxDecibel} />
                <Comment comment={comment} />
            </div>
        </section>
    );
}