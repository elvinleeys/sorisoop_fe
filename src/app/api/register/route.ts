import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Place from "@/model/Place";
import Measurement from "@/model/Measurement";
import { getUserFromToken } from "@/lib/getUserFromToken";

type NewPlaceData = {
    placeName: string;
    location: {
        type: "Point";
        coordinates: [number, number];
    };
    categoryCode: "CT1" | "AT4" | "FD6" | "CE7" | "";
    categoryName: "문화시설" | "관광명소" | "음식점" | "카페" | "";
    kakaoPlaceId?: string | null;
    avgDecibelCached: number;
    measurementCount: number;
};

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const accessToken = req.headers.get("authorization")?.split(" ")[1];
        const refreshToken = req.cookies.get("refreshToken")?.value;

        const tokenResult = await getUserFromToken(accessToken, refreshToken);
        if (!tokenResult?.user) {
            return NextResponse.json(
                { message: "인증되지 않은 사용자입니다." },
                { status: 401 },
            );
        }

        const user = tokenResult.user;
        const newAccessToken = tokenResult.newAccessToken;

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

        if (
            !placeName ||
            !location ||
            !measuredAt ||
            !measuredDate ||
            !timeSlot
        ) {
            return NextResponse.json(
                { message: "필수 데이터가 누락되었습니다." },
                { status: 400 },
            );
        }

        const safeKakaoPlaceId = kakaoPlaceId || null;

        // 1️⃣ Place 조회
        let place = null;

        if (safeKakaoPlaceId) {
            place = await Place.findOne({ kakaoPlaceId: safeKakaoPlaceId });
        }

        if (!place) {
            place = await Place.findOne({
                placeName,
                location: {
                    $near: {
                        $geometry: location,
                        $maxDistance: 5,
                    },
                },
            });
        }

        // 2️⃣ Place 없으면 생성
        if (!place) {
            place = await Place.create({
                placeName,
                location,
                categoryCode: categoryCode || "",
                categoryName: categoryName || "",
                kakaoPlaceId: safeKakaoPlaceId,
                avgDecibelCached: avgDecibel ?? 0,
                measurementCount: 1,
            } as NewPlaceData);
        }

        // 3️⃣ Measurement 먼저 저장 (핵심)
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

        // 4️⃣ Place atomic update (session 없이 안전하게)
        const updatedPlace = await Place.findById(place._id);

        if (updatedPlace) {
            const prevAvg = updatedPlace.avgDecibelCached ?? 0;
            const prevCount = updatedPlace.measurementCount ?? 0;

            const newCount = prevCount + 1;

            const newAvg = (prevAvg * prevCount + avgDecibel) / newCount;

            await Place.updateOne(
                { _id: place._id },
                {
                    $set: {
                        avgDecibelCached: Number(newAvg.toFixed(1)),
                        measurementCount: newCount,
                    },
                },
            );
        }

        // 5️⃣ token refresh 반영
        const headers: HeadersInit = {};
        if (newAccessToken) {
            headers["x-access-token"] = newAccessToken;
        }

        return NextResponse.json({ measurement }, { status: 201, headers });
    } catch (err) {
        console.error("Error in /api/register:", err);
        return NextResponse.json(
            { message: "측정 데이터 저장 중 오류" },
            { status: 500 },
        );
    }
}
