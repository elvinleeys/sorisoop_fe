import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Place, { IPlace } from "@/model/Place";
import Measurement from "@/model/Measurement";
import { FilterQuery } from "mongoose";

export async function GET(req: NextRequest) {
    await dbConnect();

    try {
        const { searchParams } = new URL(req.url);

        const swLat = parseFloat(searchParams.get("swLat")!);
        const swLng = parseFloat(searchParams.get("swLng")!);
        const neLat = parseFloat(searchParams.get("neLat")!);
        const neLng = parseFloat(searchParams.get("neLng")!);

        const categories = searchParams.getAll("categories");
        const noiseLevels = searchParams.getAll("noiseLevels");

        if (isNaN(swLat) || isNaN(swLng) || isNaN(neLat) || isNaN(neLng)) {
            return NextResponse.json(
                { success: false, error: "위도/경도 필요" },
                { status: 400 },
            );
        }

        // 1️⃣ 장소 조회 (위치 + 카테고리)
        const placeQuery: FilterQuery<IPlace> = {
            location: {
                $geoWithin: {
                    $box: [
                        [swLng, swLat],
                        [neLng, neLat],
                    ],
                },
            },
        };

        if (categories.length > 0) {
            placeQuery.categoryCode = {
                $in: categories,
            };
        }

        const places = await Place.find(placeQuery).lean();
        if (places.length === 0) {
            return NextResponse.json({ success: true, data: [] });
        }

        const placeIds = places.map((p) => p._id);

        // 2️⃣ 측정 데이터 조회 (평균 dB)
        const measurements = await Measurement.aggregate([
            { $match: { placeId: { $in: placeIds } } },
            {
                $group: {
                    _id: "$placeId",
                    avgDecibel: { $avg: "$avgDecibel" },
                },
            },
        ]);

        const measurementMap = new Map(
            measurements.map((m) => [m._id.toString(), m.avgDecibel]),
        );

        // 3️⃣ 결과 매핑 + 소음 필터링
        const result = places
            .map((place) => {
                const avgDecibel =
                    measurementMap.get(place._id.toString()) ?? null;

                // noiseLevels 필터링
                if (
                    noiseLevels.length > 0 &&
                    avgDecibel !== null &&
                    !noiseLevels.some((level) => {
                        if (level === "quiet") return avgDecibel < 70;
                        if (level === "moderate")
                            return avgDecibel >= 70 && avgDecibel < 100;
                        if (level === "loud") return avgDecibel >= 100;
                        return false;
                    })
                ) {
                    return null;
                }

                return {
                    id: place._id.toString(),
                    lat: place.location.coordinates[1],
                    lng: place.location.coordinates[0],
                    avgDecibel,
                    placeName: place.placeName,
                };
            })
            .filter((d) => d !== null);

        return NextResponse.json({ success: true, data: result });
    } catch (err) {
        console.error("map API error:", err);
        return NextResponse.json(
            { success: false, error: "데이터 조회 실패" },
            { status: 500 },
        );
    }
}
