import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import User from "@/model/User";

export async function DELETE() {
    try {
        await dbConnect();

        // 쿠키에서 refreshToken 가져오기
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get("refreshToken")?.value;

        if (!refreshToken) {
            return NextResponse.json(
                { message: "인증되지 않은 요청입니다." },
                { status: 401 }
            );
        }

        // 해당 refreshToken 가진 유저 찾아서 삭제
        const user = await User.findOne({ "refreshToken.token": refreshToken });
        if (!user) {
            return NextResponse.json(
                { message: "유효하지 않은 토큰입니다." },
                { status: 401 }
            );
        }

        await User.deleteOne({ _id: user._id });

        // 쿠키 삭제
        const res = NextResponse.json(
            { message: "회원 탈퇴가 완료되었습니다." },
            { status: 200 }
        );

        res.cookies.set({
            name: "refreshToken",
            value: "",
            maxAge: 0,
            path: "/api/auth",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res;
    } catch (err) {
        console.error("회원 탈퇴 에러:", err);
        return NextResponse.json(
            { message: "회원 탈퇴 처리 중 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}
