import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Place from "@/model/Place";
import Measurement from "@/model/Measurement";
import { getUserFromToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const accessToken = req.headers.get("authorization")?.split(" ")[1];
    const refreshToken = req.cookies.get("refreshToken")?.value;

    // accessToken 검증 + 필요 시 refreshToken으로 재발급
    const tokenResult = await getUserFromToken(accessToken, refreshToken);

    if (!tokenResult?.user) {
      return NextResponse.json(
        { message: "인증되지 않은 사용자입니다." },
        { status: 401 }
      );
    }

    const user = tokenResult.user;
    const newAccessToken = tokenResult.newAccessToken;

    // 요청 body
    const body = await req.json();
    const {
      placeName,
      kakaoPlaceId,
      location,
      categoryCode,
      categoryName,
      measuredAt,
      measuredDate,
      timeSlot,
      avgDecibel,
      maxDecibel,
      comment,
    } = body;

    if (!placeName || !location || !measuredAt || !measuredDate || !timeSlot) {
      return NextResponse.json({ message: "필수 데이터가 누락되었습니다." }, { status: 400 });
    }

    // 1. Place 저장 또는 조회
    let place = null;
    if (kakaoPlaceId) {
      place = await Place.findOne({ kakaoPlaceId });
    }

    if (!place) {
      place = await Place.findOne({
        "location.coordinates": location.coordinates,
        placeName,
      });
    }

    if (!place) {
      place = await Place.create({
        kakaoPlaceId: kakaoPlaceId || "",
        placeName,
        location,
        categoryCode: categoryCode || "",
        categoryName: categoryName || "",
      });
    }

    // 2. Measurement 저장
    const measurement = await Measurement.create({
      userId: user._id,
      placeId: place._id,
      measuredAt: new Date(measuredAt),
      measuredDate,
      timeSlot,
      avgDecibel,
      maxDecibel,
      comment,
    });

    // 새 accessToken이 발급되었으면 헤더에 추가
    const headers: HeadersInit = {};
    if (newAccessToken) {
      headers["x-access-token"] = newAccessToken;
    }

    return NextResponse.json({ measurement }, { status: 201, headers });
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
    else console.error("Unknown error", err);
    return NextResponse.json({ message: "측정 데이터 저장 중 오류가 발생했습니다." }, { status: 500 });
  }
}
