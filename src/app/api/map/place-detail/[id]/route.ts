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

        const [comments, place] = await Promise.all([
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

            Place.findById(placeObjectId)
                .select({
                    placeName: 1,
                    avgDecibelCached: 1,
                    measurementCount: 1,
                    timeSlotStats: 1,
                })
                .lean(),
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

        const timeSlots = ["5-11", "11-18", "18-22"] as const;

        const chartData = timeSlots.map((slot) => {
            const stat = place.timeSlotStats[slot];

            return {
                timeRange: slot,
                db:
                    stat.count > 0
                        ? Math.round(stat.totalDecibel / stat.count)
                        : 0,
                count: stat.count,
            };
        });

        return NextResponse.json({
            success: true,
            data: {
                placeId: place._id,
                placeName: place.placeName,

                avgDecibelCached: place.avgDecibelCached,

                measurementCount: place.measurementCount,

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
