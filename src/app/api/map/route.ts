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

        if (noiseLevels.length > 0) {
            const noiseConditions: FilterQuery<IPlace>[] = [];

            if (noiseLevels.includes("quiet")) {
                noiseConditions.push({
                    avgDecibelCached: { $lt: 70 },
                });
            }

            if (noiseLevels.includes("moderate")) {
                noiseConditions.push({
                    avgDecibelCached: {
                        $gte: 70,
                        $lt: 100,
                    },
                });
            }

            if (noiseLevels.includes("loud")) {
                noiseConditions.push({
                    avgDecibelCached: { $gte: 100 },
                });
            }

            placeQuery.$or = noiseConditions;
        }

        const places = await Place.find(placeQuery)
            .select({
                placeName: 1,
                location: 1,
                avgDecibelCached: 1,
                measurementCount: 1,
            })
            .lean();

        return NextResponse.json({
            success: true,
            data: places.map((place) => ({
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
