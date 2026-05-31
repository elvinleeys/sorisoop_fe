import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Place, { IPlace } from "@/model/Place";
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

        const places = await Place.find(placeQuery)
            .select({
                placeName: 1,
                location: 1,
                avgDecibelCached: 1,
                measurementCount: 1,
            })
            .lean();

        const result = places.filter((place) => {
            const avg = place.avgDecibelCached;

            if (noiseLevels.length === 0) return true;

            return noiseLevels.some((level) => {
                if (level === "quiet") return avg < 70;
                if (level === "moderate") return avg >= 70 && avg < 100;
                if (level === "loud") return avg >= 100;

                return false;
            });
        });

        return NextResponse.json({
            success: true,
            data: result.map((place) => ({
                id: place._id.toString(),
                lat: place.location.coordinates[1],
                lng: place.location.coordinates[0],
                avgDecibel: place.avgDecibelCached,
                measurementCount: place.measurementCount,
                placeName: place.placeName,
            })),
        });
    } catch (err) {
        console.error("map API error:", err);

        return NextResponse.json(
            { success: false, error: "데이터 조회 실패" },
            { status: 500 },
        );
    }
}
