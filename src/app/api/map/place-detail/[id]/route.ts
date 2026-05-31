import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Measurement from "@/model/Measurement";
import Place from "@/model/Place";
import mongoose from "mongoose";

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> },
) {
    try {
        await dbConnect();
        const { id } = await context.params;
        // console.log("id", id)

        // 2️⃣ string → ObjectId 변환
        const placeObjectId = new mongoose.Types.ObjectId(id);

        const [grouped, comments, place] = await Promise.all([
            // ✅ 오늘 제한 제거 → 해당 장소 전체 데이터를 조회
            Measurement.aggregate([
                { $match: { placeId: placeObjectId } },
                {
                    $group: {
                        _id: "$timeSlot",
                        avgDecibel: { $avg: "$avgDecibel" },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { _id: 1 } },
            ]),

            // ✅ 한줄평도 오늘 제한 제거 → 장소 전체 코멘트
            Measurement.find(
                {
                    placeId: placeObjectId,
                    comment: { $exists: true, $ne: "" },
                },
                { comment: 1 },
            )
                .sort({ createdAt: -1 })
                .limit(20)
                .lean(),
            // ✅ 장소 이름
            Place.findById(placeObjectId).lean(),
        ]);

        if (!place) {
            return NextResponse.json(
                {
                    success: false,
                    message: "장소를 찾을 수 없습니다.",
                },
                { status: 404 },
            );
        }

        const groupedMap = new Map(grouped.map((item) => [item._id, item]));

        // ✅ UI 고정된 timeSlot 배열
        const timeSlots: ("5-11" | "11-18" | "18-22")[] = [
            "5-11",
            "11-18",
            "18-22",
        ];

        const chartData = timeSlots.map((slot) => {
            const found = groupedMap.get(slot);

            return {
                timeRange: slot,
                db: found ? Math.round(found.avgDecibel) : 0,
                count: found ? found.count : 0,
            };
        });

        return NextResponse.json({
            success: true,
            data: {
                placeId: place?._id,
                placeName: place?.placeName,
                avgDecibelCached: place?.avgDecibelCached ?? 0,
                measurementCount: place?.measurementCount ?? 0,
                chart: chartData,
                comments: comments.map((c) => c.comment),
            },
        });
    } catch (err) {
        if (err instanceof Error) {
            console.error("API error", err);
            return NextResponse.json(
                { success: false, message: err.message },
                { status: 500 },
            );
        } else {
            console.error("Unexpected error", err);
            return NextResponse.json(
                {
                    success: false,
                    message: "서버에서 알 수 없는 오류가 발생했습니다.",
                },
                { status: 500 },
            );
        }
    }
}
