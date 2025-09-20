import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/model/User";
import { cookies } from "next/headers";

export async function POST() {
    try {
        await dbConnect();

        // 쿠키에서 refreshToken 가져오기
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get("refreshToken")?.value;
        if (refreshToken) {
            // 해당 refreshToken 가진 유저 찾아서 DB에서 삭제
            await User.updateOne(
                { "refreshToken.token": refreshToken },
                { $unset: { refreshToken: "" } }
            );
        }

        const res = NextResponse.json({ message: "로그아웃 성공" });

        // refreshToken 쿠키 삭제
        res.cookies.set({
            name: "refreshToken",
            value: "",
            maxAge: 0,
            path: "/api/auth",
        });

        return res;
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "서버 오류" }, { status: 500 });
    }
}