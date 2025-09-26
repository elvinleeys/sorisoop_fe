import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Place from "@/model/Place";
import Measurement from "@/model/Measurement";
import { isSameLocation } from "@/util/isSameLocation";

export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);

  const categories = searchParams.getAll("categories"); // CE7, FD6, ...
  const noiseLevels = searchParams.getAll("noiseLevels"); // quiet, moderate, loud
  const centerLat = parseFloat(searchParams.get("y") || "0");
  const centerLng = parseFloat(searchParams.get("x") || "0");
  const radius = parseInt(searchParams.get("radius") || "300"); // 기본 300m

  try {
    const finalData: { id: string; lat: number; lng: number; avgDecibel: number | null }[] = [];

    // 1️⃣ DB Place 조회 (categories가 있으면 category 필터 적용)
    const placeQuery: any = {
      location: {
        $geoWithin: { $centerSphere: [[centerLng, centerLat], radius / 6371000] },
      },
    };
    if (categories.length > 0) {
      placeQuery.categoryCode = { $in: categories };
    }

    const places = await Place.find(placeQuery).lean();
    const placeIds = places.map((p) => p._id);

    // 2️⃣ DB Measurement 조회
    const measurements = await Measurement.aggregate([
      { $match: { placeId: { $in: placeIds } } },
      { $group: { _id: "$placeId", avgDecibel: { $avg: "$avgDecibel" } } },
    ]);
    const measurementMap = new Map(measurements.map((m) => [m._id.toString(), m.avgDecibel]));

    // DB 데이터 처리
    for (const place of places) {
      const avgDecibel = measurementMap.get(place._id.toString()) || null;

      // noiseLevels가 선택되지 않았으면 모두 포함, 선택되면 범위 필터 적용
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

    // 3️⃣ Kakao Places 검색 (categories 있을 때만 호출)
    if (categories.length > 0) {
      for (const code of categories) {
        const res = await fetch(
          `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=${code}&x=${centerLng}&y=${centerLat}&radius=${radius}`,
          { headers: { Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}` } }
        );

        if (!res.ok) continue;
        const json = await res.json();
        if (!json.documents) continue;

        // Kakao 데이터 처리
        for (const kakaoPlace of json.documents) {
          const lat = parseFloat(kakaoPlace.y);
          const lng = parseFloat(kakaoPlace.x);
          const existsInDB = finalData.some((d) => isSameLocation(d.lat, d.lng, lat, lng));
          if (!existsInDB) {
            finalData.push({
              id: kakaoPlace.id,
              lat,
              lng,
              avgDecibel: null,
            });
          }
        }
      }
    }

    return NextResponse.json({ success: true, data: finalData });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to fetch places" }, { status: 500 });
  }
}
