import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IPlace extends Document {
  _id: Types.ObjectId;
  kakaoPlaceId?: string;
  placeName: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [경도, 위도]
  };
  categoryCode: "CT1" | "AT4" | "FD6" | "CE7" | "";
  categoryName: "문화시설" | "관광명소" | "음식점" | "카페" | "";
}

const PlaceSchema: Schema<IPlace> = new Schema(
  {
    kakaoPlaceId: { type: String, unique: true, sparse: true },
    placeName: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"], // GeoJSON Point만 허용
        required: true,
      },
      coordinates: {
        type: [Number], // [경도, 위도]
        required: true,
      },
    },
    categoryCode: {
      type: String,
      enum: ["CT1", "AT4", "FD6", "CE7", ""],
      required: false,
    },
    categoryName: {
      type: String,
      enum: ["문화시설", "관광명소", "음식점", "카페", ""],
      required: false,
    },
  },
);

// GeoJSON 인덱스 생성 (위치 기반 검색에 필요)
PlaceSchema.index({ location: "2dsphere" });

const Place: Model<IPlace> =
  mongoose.models.Place || mongoose.model<IPlace>("Place", PlaceSchema);

export default Place;