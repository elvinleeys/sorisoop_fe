import mongoose from "mongoose";

// User 스키마에 타입 지정
export interface IUserDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  nickname: string;
  email: string;
  password: string;
  profileImg?: string;
  refreshToken?: {
    token: string;
    expiredAt?: Date | null;
  };
}

const UserSchema = new mongoose.Schema({
    nickname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    profileImg: { type: String }, // optional
    refreshToken: {
        token: { type: String, default: "" },
        expiredAt: { type: Date, default: null }
    },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);