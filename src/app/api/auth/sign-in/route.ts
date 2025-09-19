import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import dbConnect from "@/lib/db";
import User from "@/model/User";

const ACCESS_EXPIRES_HOURS = parseInt(process.env.ACCESS_TOKEN_EXPIRES || "1", 10);
const REFRESH_EXPIRES_DAYS = parseInt(process.env.REFRESH_TOKEN_EXPIRES_DAYS || "7", 10);
const REFRESH_MAX_AGE_SECONDS = REFRESH_EXPIRES_DAYS * 24 * 60 * 60;

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "이메일과 비밀번호를 입력해주세요." }, { status: 400 });
        }

        await dbConnect();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "이메일 또는 비밀번호가 올바르지 않습니다." }, { status: 401 });
        }

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            return NextResponse.json({ message: "이메일 또는 비밀번호가 올바르지 않습니다." }, { status: 401 });
        }

        // JWT 시크릿
        const accessSecret = process.env.JWT_ACCESS_SECRET;
        const refreshSecret = process.env.JWT_REFRESH_SECRET;

        if (!accessSecret || !refreshSecret) {
            return NextResponse.json({ message: "JWT 시크릿이 설정되지 않았습니다." }, { status: 500 });
        }

        // payload
        const payload = { sub: user._id.toString(), email: user.email };

        // jwt.sign 타입 안전하게 처리
        const signOptions: SignOptions = { expiresIn: ACCESS_EXPIRES_HOURS * 60 * 60 }

        const accessToken = jwt.sign(payload, accessSecret, signOptions);
        const refreshToken = jwt.sign({ sub: user._id.toString() }, refreshSecret, { expiresIn: REFRESH_MAX_AGE_SECONDS });

        // DB에 refreshToken 객체로 저장
        const refreshExpiresAt = new Date(Date.now() + REFRESH_MAX_AGE_SECONDS * 1000);
        user.refreshToken = { token: refreshToken, expiredAt: refreshExpiresAt };
        await user.save();

        // Response
        const res = NextResponse.json({ accessToken }, { status: 200 });

        const secure = process.env.NODE_ENV === "production";
        res.cookies.set({
            name: "refreshToken",
            value: refreshToken,
            httpOnly: true,
            maxAge: REFRESH_MAX_AGE_SECONDS,
            path: "/api/auth",
            sameSite: "strict",
            secure,
        });

        return res;
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
    }
}
