import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Measurement from "@/model/Measurement";
import { getUserFromToken } from "@/lib/auth";
import Place from "@/model/Place";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    await dbConnect();

    const { id } = await params;

    // 토큰에서 유저 확인
    const accessToken = req.headers.get("authorization")?.split(" ")[1];
    const refreshToken = req.cookies.get("refreshToken")?.value;
    const authResult = await getUserFromToken(accessToken, refreshToken);

    if (!authResult?.user) {
        return NextResponse.json({ message: "인증 실패" }, { status: 401 });
    }

    const { user } = authResult;

    try {
        // 본인 데이터만 삭제 가능하도록 userId 확인
        const deleted = await Measurement.findOneAndDelete({
            _id: id,
            userId: user._id,
        });

        if (!deleted) {
            return NextResponse.json({ message: "삭제할 데이터를 찾을 수 없음" }, { status: 404 });
        }

        // 해당 Place에 남아있는 Measurement가 있는지 확인
        const hasRemaining = await Measurement.exists({ placeId: deleted.placeId });

        if (!hasRemaining) {
            await Place.findByIdAndDelete(deleted.placeId);
        }

        return NextResponse.json({ success: true, message: "삭제 성공" }, { status: 200 });;
    } catch (err) {
        console.error("삭제 에러:", err);
        return NextResponse.json({ success: false, message: "서버 에러" }, { status: 500 });
    }
}
