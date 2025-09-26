import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Place from "@/model/Place";
import Measurement from "@/model/Measurement";

export async function GET() {
  await dbConnect();

  await Place.deleteMany({});
  await Measurement.deleteMany({});

  return NextResponse.json({ success: true, message: "DB 초기화 완료" });
}