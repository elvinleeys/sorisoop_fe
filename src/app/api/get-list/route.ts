import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Measurement from "@/model/Measurement";
import Place from "@/model/Place";
import { getUserFromToken } from "@/lib/auth";

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
        .populate({
            path: "placeId",      // Measurement에서 참조하는 필드 이름
            select: "placeName",  // Place에서 가져올 필드
            model: Place,       // 선택 사항, ref와 동일하면 생략 가능
        });

    const result = measurements.map((m) => ({
        id: (m._id as string).toString(),
        avgDecibel: m.avgDecibel,
        maxDecibel: m.maxDecibel,
        measuredAt: m.measuredAt,
        placeName: (m.placeId as any)?.placeName || "알 수 없음",
    }));

    return NextResponse.json(result, { status: 200 });
}