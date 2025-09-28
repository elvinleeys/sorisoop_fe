import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Place from "@/model/Place";
import Measurement from "@/model/Measurement";

export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);

  const categories = searchParams.getAll("categories"); // CE7, FD6, ...
  const noiseLevels = searchParams.getAll("noiseLevels"); // quiet, moderate, loud
  const centerLat = parseFloat(searchParams.get("y") || "0");
  const centerLng = parseFloat(searchParams.get("x") || "0");
  const radius = parseInt(searchParams.get("radius") || "300"); // 기본 300m

  try {
    const finalData: {
      id: string;
      lat: number;
      lng: number;
      avgDecibel: number | null;
    }[] = [];

    // 1️⃣ DB Place 조회 (카테고리 필터 적용)
    const placeQuery: any = {
      location: {
        $geoWithin: {
          $centerSphere: [[centerLng, centerLat], radius / 6371000], // 반경(m) → radian
        },
      },
    };
    if (categories.length > 0) {
      placeQuery.categoryCode = { $in: categories };
    }

    const places = await Place.find(placeQuery).lean();
    const placeIds = places.map((p) => p._id);

    // 2️⃣ DB Measurement 조회 (평균값 집계)
    const measurements = await Measurement.aggregate([
      { $match: { placeId: { $in: placeIds } } },
      { $group: { _id: "$placeId", avgDecibel: { $avg: "$avgDecibel" } } },
    ]);
    const measurementMap = new Map(
      measurements.map((m) => [m._id.toString(), m.avgDecibel])
    );

    // 3️⃣ DB 데이터만 처리
    for (const place of places) {
      const avgDecibel = measurementMap.get(place._id.toString()) ?? null;

      // noiseLevels 필터링
      if (
        avgDecibel === null ||
        noiseLevels.length === 0 ||
        noiseLevels.some((level) => {
          if (level === "quiet") return avgDecibel < 70;
          if (level === "moderate") return avgDecibel >= 70 && avgDecibel < 100;
          if (level === "loud") return avgDecibel >= 100;
          return false;
        })
      ) {
        finalData.push({
          id: place._id.toString(),
          lat: place.location.coordinates[1],
          lng: place.location.coordinates[0],
          avgDecibel,
        });
      }
    }

    return NextResponse.json({ success: true, data: finalData });
  } catch (err) {
    console.error("with-measurement API error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch places" },
      { status: 500 }
    );
  }
}
