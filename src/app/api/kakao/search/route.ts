import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const keyword = searchParams.get("keyword");
        const lat = searchParams.get("lat");
        const lng = searchParams.get("lng");

        if (!keyword || keyword.trim() === "" || !lat || !lng ) {
            return NextResponse.json(
                { error: "검색어를 입력해주세요." },
                { status: 400 }
            );
        }

    const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;
    if (!KAKAO_REST_API_KEY) {
        return NextResponse.json(
            { error: "API 키가 설정되지 않았습니다." },
            { status: 500 }
        );
    }

    const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
      keyword
    )}&size=10&x=${lng}&y=${lat}&sort=distance`;

    const res = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
      },
    });

    if (!res.ok) {
        const errorBody = await res.text();
        console.error("❌ 카카오 API 응답 실패:", res.status, errorBody);
        return NextResponse.json(
            { error: "키워드 검색 실패" },
            { status: 400 }
        );
    }

    const data = await res.json();
    return NextResponse.json({ documents: data.documents });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "키워드 검색 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}