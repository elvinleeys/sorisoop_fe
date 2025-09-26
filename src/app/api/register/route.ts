import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Place from "@/model/Place";
import Measurement from "@/model/Measurement";
import { getUserFromToken } from "@/lib/auth";

// DB 생성용 타입 (새 Place 생성 시)
type NewPlaceData = {
  placeName: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  categoryCode: "CT1" | "AT4" | "FD6" | "CE7" | "";
  categoryName: "문화시설" | "관광명소" | "음식점" | "카페" | "";
  kakaoPlaceId?: string | null;
};

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
      return NextResponse.json(
        { message: "필수 데이터가 누락되었습니다." },
        { status: 400 }
      );
    }

    // kakaoPlaceId가 빈 문자열이면 null 처리
    const safeKakaoPlaceId = kakaoPlaceId ? kakaoPlaceId : null;

    // 1. Place 저장 또는 조회
    let place = null;

    // 1-1. kakaoPlaceId 기반 조회
    if (safeKakaoPlaceId) {
      place = await Place.findOne({ kakaoPlaceId: safeKakaoPlaceId });
    }

    // 1-2. 좌표 + placeName 기반 조회 (좌표 오차 고려)
    if (!place) {
      place = await Place.findOne({
        placeName,
        location: {
          $near: {
            $geometry: location,
            $maxDistance: 5, // 5m 반경 내
          },
        },
      });
    }

    // 1-3. Place가 없으면 새로 생성
    if (!place) {
      const newPlaceData: NewPlaceData = {
        placeName,
        location,
        categoryCode: categoryCode || "",
        categoryName: categoryName || "",
      };
      if (safeKakaoPlaceId) newPlaceData.kakaoPlaceId = safeKakaoPlaceId;

      place = await Place.create(newPlaceData);
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
    console.error("Error in /api/register:", err);
    return NextResponse.json(
      { message: "측정 데이터 저장 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
