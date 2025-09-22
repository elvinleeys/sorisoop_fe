import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Measurement from "@/model/Measurement";
import Place, { IPlace } from "@/model/Place";
import { getUserFromToken } from "@/lib/auth";
import { Types } from "mongoose";

export async function GET(req: NextRequest) {
    await dbConnect();

    // 토큰에서 유저 확인
    const accessToken = req.headers.get("authorization")?.split(" ")[1];
    const refreshToken = req.cookies.get("refreshToken")?.value;
    const authResult = await getUserFromToken(accessToken, refreshToken);

    if (!authResult?.user) {
        return NextResponse.json({ message: "인증 실패" }, { status: 401 });
    }

    const { user } = authResult;

    const measurements = await Measurement.find({ userId: user._id })
        .select("avgDecibel maxDecibel measuredAt placeId")
        .populate<{ placeId: IPlace }>({
            path: "placeId",      // Measurement에서 참조하는 필드 이름
            select: "placeName",  // Place에서 가져올 필드
            model: Place,       // 선택 사항, ref와 동일하면 생략 가능
        })
        .sort({ measuredAt: -1 })   // ✅ 최신순 정렬
        .exec();

    const result = measurements.map((m) => {
        const place = m.placeId as IPlace;

        return {
            id: (m._id as Types.ObjectId).toString(), // ObjectId → string
            avgDecibel: m.avgDecibel,
            maxDecibel: m.maxDecibel,
            measuredAt: m.measuredAt,
            placeName: place.placeName,
        };
    });

    return NextResponse.json(result, { status: 200 });
}