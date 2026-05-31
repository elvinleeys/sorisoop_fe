import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";
import Place from "../model/Place";
import Measurement from "../model/Measurement";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI 없음");
}

async function migrate() {
    await mongoose.connect(MONGODB_URI);

    console.log("migration start");

    const measurements = await Measurement.aggregate([
        {
            $group: {
                _id: "$placeId",
                avgDecibelCached: {
                    $avg: "$avgDecibel",
                },
                measurementCount: {
                    $sum: 1,
                },
            },
        },
    ]);

    console.log(`aggregate done: ${measurements.length}`);

    const bulkOps = measurements.map((m) => ({
        updateOne: {
            filter: {
                _id: m._id,
            },
            update: {
                $set: {
                    avgDecibelCached:
                        typeof m.avgDecibelCached === "number"
                            ? Number(m.avgDecibelCached.toFixed(1))
                            : 0,
                    measurementCount: m.measurementCount,
                },
            },
        },
    }));

    if (bulkOps.length > 0) {
        await Place.bulkWrite(bulkOps);
    }

    console.log("migration complete");

    await mongoose.disconnect();
}

migrate().catch((err) => {
    console.error(err);
    process.exit(1);
});
