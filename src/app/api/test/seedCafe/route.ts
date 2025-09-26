// app/api/test-data/seedCafe/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Place from "@/model/Place";
import Measurement from "@/model/Measurement";
import mongoose from "mongoose";

export async function GET() {
  try {
    await dbConnect();

    // 테스트용 유저 ObjectId (실제 DB에 존재하는 값으로 변경)
    const testUserId = new mongoose.Types.ObjectId("68ce862fed0837638b79972f");

    const centerLat = 37.345; // 왕곡동 중심 위도
    const centerLng = 126.983; // 왕곡동 중심 경도

    // Place 10개 생성
    const testPlaces = Array.from({ length: 10 }).map((_, i) => ({
      placeName: `왕곡 카페${i + 1}`,
      location: {
        type: "Point",
        coordinates: [
          centerLng + (Math.random() - 0.5) * 0.005, // ±250m 범위
          centerLat + (Math.random() - 0.5) * 0.005,
        ],
      },
      categoryCode: "CE7",
      categoryName: "카페",
      kakaoPlaceId: null,
    }));

    // DB에 Place 저장
    const createdPlaces = await Place.insertMany(testPlaces);

    // Measurement용 enum 배열
    const timeSlots: ("5-11" | "11-18" | "18-22")[] = ["5-11", "11-18", "18-22"];

    // 각 Place에 Measurement 생성
    const testMeasurements = createdPlaces.map((place, i) => {
      const avgDecibel = Math.floor(Math.random() * 80) + 50; // 50~130
      const maxDecibel = avgDecibel + Math.floor(Math.random() * 20); // avg~avg+20
      return {
        userId: testUserId,
        placeId: place._id,
        measuredAt: new Date(),
        measuredDate: "2025-09-26",
        timeSlot: timeSlots[i % timeSlots.length], // enum 값 중 하나 선택
        avgDecibel,
        maxDecibel,
        comment: "테스트용 데이터",
      };
    });

    // DB에 Measurement 저장
    await Measurement.insertMany(testMeasurements);

    return NextResponse.json({
      success: true,
      message: "테스트 Place + Measurement 생성 완료",
      placesCount: createdPlaces.length,
      measurementsCount: testMeasurements.length,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "테스트 데이터 생성 실패" },
      { status: 500 }
    );
  }
}
