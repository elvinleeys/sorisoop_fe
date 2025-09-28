import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Measurement from "@/model/Measurement";
import Place from "@/model/Place";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await context.params;

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    // 1. timeSlot별로 그룹화
    const grouped = await Measurement.aggregate([
      { $match: { placeId: id, measuredDate: today } },
      {
        $group: {
          _id: "$timeSlot",
          avgDecibel: { $avg: "$avgDecibel" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 2. 한줄평 (최신순)
    const comments = await Measurement.find(
      { placeId: id, measuredDate: today, comment: { $exists: true, $ne: "" } },
      { comment: 1 }
    )
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    // 3. 장소 이름
    const place = await Place.findById(id).lean();

    // 4. UI 고정된 timeSlot 배열 생성 (빈 값도 보장)
    const timeSlots: ("5-11" | "11-18" | "18-22")[] = ["5-11", "11-18", "18-22"];
    const chartData = timeSlots.map((slot) => {
      const found = grouped.find((g) => g._id === slot);
      return {
        timeRange: slot,
        db: found ? Math.round(found.avgDecibel) : 0,
        count: found ? found.count : 0,
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        placeName: place?.placeName || "알 수 없음",
        chart: chartData,
        comments: comments.map((c) => c.comment),
      },
    });
  } catch (err: any) {
    console.error("API error", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
