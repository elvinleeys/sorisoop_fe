
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const x = searchParams.get('x');
    const y = searchParams.get('y');

    if (!x || !y) {
      return NextResponse.json({ error: '위도 또는 경도 값이 필요합니다.' }, { status: 400 });
    }

    const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;
    if (!KAKAO_REST_API_KEY) {
      return NextResponse.json({ error: 'API 키가 설정되지 않았습니다.' }, { status: 500 });
    }

    // 1. 주변 장소 검색 (searchNearbyPlace)
    const placeApiUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?query=&x=${x}&y=${y}&radius=500&size=1`;
    const placeRes = await fetch(placeApiUrl, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
      },
    });

    if (!placeRes.ok) {
      const errorBody = await placeRes.text();
      console.log("❌ 카카오 API 응답 실패:", placeRes.status, errorBody);
      // 카카오 API의 응답 실패를 클라이언트에 400 에러로 전달
      return NextResponse.json({ error: '주변 장소 검색 실패' }, { status: 400 });
    }
    const placeData = await placeRes.json();

    if (placeData.documents?.length > 0) {
      return NextResponse.json({ placeName: placeData.documents[0].place_name });
    }

    // 2. 좌표 → 주소 변환 (coord2Address)
    const addressApiUrl = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}`;
    const addressRes = await fetch(addressApiUrl, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
      },
    });

    if (!addressRes.ok) throw new Error('좌표 → 주소 변환 실패');
    const addressData = await addressRes.json();

    if (addressData.documents?.length > 0) {
      const addr = addressData.documents[0];
      const roadName = addr.road_address?.building_name;
      const jibunFull = addr.address?.address_name;

      if (roadName && roadName.trim() !== "") {
        return NextResponse.json({ placeName: roadName });
      } else if (jibunFull) {
        const parts = jibunFull.split(" ");
        const simplifiedAddress = parts.length >= 2 ? parts.slice(-2).join(" ") : parts[parts.length - 1];
        return NextResponse.json({ placeName: simplifiedAddress });
      }
    }

    return NextResponse.json({ placeName: '위치 정보 없음' });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '위치 정보를 가져오는 중 오류가 발생했습니다.' }, { status: 500 });
  }
}