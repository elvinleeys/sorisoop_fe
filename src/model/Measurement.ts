import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMeasurement extends Document {
    measuredAt: Date; // 실제 측정 시간
    measuredDate: string; // YYYY-MM-DD 형식
    timeSlot: "5-11" | "11-18" | "18-22"; // 고정 시간대
    avgDecibel: number; // 평균 데시벨
    maxDecibel: number; // 최대 데시벨
    comment?: string; // 한줄평
    placeId: mongoose.Types.ObjectId; // Place 참조
    userId: mongoose.Types.ObjectId; // User 참조
}

const MeasurementSchema: Schema<IMeasurement> = new Schema(
    {
        measuredAt: { type: Date, required: true },
        measuredDate: { type: String, required: true }, // ex: "2025-09-20"
        timeSlot: {
            type: String,
            enum: ["5-11", "11-18", "18-22"],
            required: true,
        },
        avgDecibel: { type: Number, required: true },
        maxDecibel: { type: Number, required: true },
        comment: { type: String, trim: true },
        placeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Place",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// 빠른 조회용 인덱스
MeasurementSchema.index({ measuredDate: 1, timeSlot: 1 });
MeasurementSchema.index({ placeId: 1, measuredDate: 1 });
MeasurementSchema.index({ userId: 1, measuredDate: 1 }); // 특정 유저 + 날짜 조회

const Measurement: Model<IMeasurement> =
  mongoose.models.Measurement ||
  mongoose.model<IMeasurement>("Measurement", MeasurementSchema);

export default Measurement;