import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Measurement from "@/model/Measurement";
import Place, { IPlace } from "@/model/Place";
import { getUserFromToken } from "@/lib/getUserFromToken";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    await dbConnect();

    // context.params가 Promise이므로 먼저 await
    const params = await context.params;
    const { id } = params;

    // 토큰에서 유저 확인
    const accessToken = req.headers.get("authorization")?.split(" ")[1];
    const refreshToken = req.cookies.get("refreshToken")?.value;
    const authResult = await getUserFromToken(accessToken, refreshToken);

    if (!authResult?.user) {
        return NextResponse.json({ message: "인증 실패" }, { status: 401 });
    }

    const { user } = authResult;

    try {
        const measurement = await Measurement.findOne({ _id: id, userId: user._id })
        .populate<{ placeId: IPlace }>({
            path: "placeId",
            select: "placeName location categoryCode categoryName",
            model: Place,
        });

        if (!measurement) {
            return NextResponse.json({ message: "데이터 없음" }, { status: 404 });
        }

        const populatedPlace = measurement.placeId as IPlace;

        const result = {
            id: measurement._id.toString(),
            avgDecibel: measurement.avgDecibel,
            maxDecibel: measurement.maxDecibel,
            measuredAt: measurement.measuredAt,
            comment: measurement.comment,
            place: {
                id: populatedPlace._id.toString(),
                placeName: populatedPlace.placeName,
                location: populatedPlace.location,
                categoryCode: populatedPlace.categoryCode || "",
                categoryName: populatedPlace.categoryName || "",
            },
        };

        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        console.error("상세 조회 에러:", err);
        return NextResponse.json({ message: "서버 에러" }, { status: 500 });
    }
}
