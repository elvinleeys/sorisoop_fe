import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Measurement from "@/model/Measurement";
import Place, { IPlace } from "@/model/Place";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const x = parseFloat(searchParams.get("x") || "0"); // 경도
    const y = parseFloat(searchParams.get("y") || "0"); // 위도
    const radius = parseInt(searchParams.get("radius") || "500"); // 반경

    if (!x || !y) {
      return NextResponse.json({ error: "위도/경도 필요" }, { status: 400 });
    }

    // 주변 장소 조회 (2dsphere 인덱스 필요)
    const nearbyPlaces = await Place.find({
      location: {
        $geoWithin: {
          $centerSphere: [[x, y], radius / 6371000], // radius: m -> rad (지구 반지름 6371000m)
        },
      },
    }).lean();

    const placeIds = nearbyPlaces.map((p) => p._id);

    // 해당 장소의 Measurement 조회
    const measurements = await Measurement.find({
      placeId: { $in: placeIds },
    })
      .select("avgDecibel maxDecibel measuredAt placeId")
      .populate<{ placeId: IPlace }>({
        path: "placeId",
        select: "placeName location",
        model: Place,
      })
      .lean();

    const result = measurements.map((m) => {
      const place = m.placeId as IPlace;
      return {
        id: m._id.toString(),
        lat: place.location.coordinates[1], // 위도
        lng: place.location.coordinates[0], // 경도
        avgDecibel: m.avgDecibel,
        maxDecibel: m.maxDecibel,
        placeName: place.placeName,
      };
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "데이터 조회 실패" }, { status: 500 });
  }
}