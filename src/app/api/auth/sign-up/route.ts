import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/db";
import User from "@/model/User";

export async function POST(req: Request) {
    const { email, password, nickname } = await req.json();

    if (!email || !password || !nickname) {
        return NextResponse.json(
            { message: "모든 필드를 입력해주세요." },
            { status: 400 }
        );
    }

    try {
        await dbConnect();

        // 이메일 중복 체크
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "이미 등록된 이메일입니다." },
                { status: 409 }
            );
        }

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);

        // refreshToken 초기값 설정 (가입 시에는 null 또는 빈 문자열)
        const refreshTokenObj = {
            token: "",            // 최초 가입 시에는 발급 안함
            expiredAt: null as Date | null,
        };

        // User 생성
        const user = await User.create({
            email,
            password: hashedPassword,
            nickname,
            profileImg: "", // 초기값 빈 문자열, 추후 업데이트 가능
            refreshToken: refreshTokenObj, // 초기값 빈 문자열
        });

        return NextResponse.json(
            { message: "회원가입 성공", userId: user._id },
            { status: 201 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "서버 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}
