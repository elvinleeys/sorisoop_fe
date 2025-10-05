import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Measurement from "@/model/Measurement";
import Place from "@/model/Place";
import mongoose from "mongoose";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await context.params;
    console.log("id", id)

    // 2️⃣ string → ObjectId 변환
    const placeObjectId = new mongoose.Types.ObjectId(id);

    // ✅ 오늘 제한 제거 → 해당 장소 전체 데이터를 조회
    const grouped = await Measurement.aggregate([
      { $match: { placeId: placeObjectId } }, // measuredDate 조건 제거
      {
        $group: {
          _id: "$timeSlot",
          avgDecibel: { $avg: "$avgDecibel" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    console.log("grouped", grouped);

    // ✅ 한줄평도 오늘 제한 제거 → 장소 전체 코멘트
    const comments = await Measurement.find(
      { placeId: placeObjectId, comment: { $exists: true, $ne: "" } },
      { comment: 1 }
    )
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    // ✅ 장소 이름
    const place = await Place.findById(id).lean();

    // ✅ UI 고정된 timeSlot 배열
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
  } catch (err) {
    if (err instanceof Error) {
      console.error("API error", err);
      return NextResponse.json(
        { success: false, message: err.message },
        { status: 500 }
      );
    } else {
      console.error("Unexpected error", err);
      return NextResponse.json(
        { success: false, message: "서버에서 알 수 없는 오류가 발생했습니다." },
        { status: 500 }
      );
    }
  }
}
