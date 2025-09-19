import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/model/User";

export async function POST(req: Request) {
    try{
        await dbConnect();

        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // 이메일 중복 확인
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ exists: true, message: "Email already registered" });
        } else {
            return NextResponse.json({ exists: false, message: "Email available" });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}