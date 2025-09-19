import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    nickname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profileImg: { type: String }, // optional
    refreshToken: {
        token: { type: String, default: "" },
        expiredAt: { type: Date, default: null }
    },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);