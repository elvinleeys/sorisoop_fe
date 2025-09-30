import { LocationResponse } from '@/types/dto/Location';
import { NextRequest, NextResponse } from 'next/server';

type CategoryMap = {
  [key: string]: { code: "CT1" | "AT4" | "FD6" | "CE7"; name: "문화시설" | "관광명소" | "음식점" | "카페" };
};

const categoryMapping: CategoryMap = {
  "문화시설": { code: "CT1", name: "문화시설" },
  "관광명소": { code: "AT4", name: "관광명소" },
  "음식점": { code: "FD6", name: "음식점" },
  "카페": { code: "CE7", name: "카페" },
};

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
    const placeApiUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?query=&x=${x}&y=${y}&radius=1000&size=1`;
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
      const place = placeData.documents[0];

      const categoryInfo = categoryMapping[place.category_group_name] || { code: null, name: null };

      return NextResponse.json<LocationResponse>({
        kakaoPlaceId: place.id,
        placeName: place.place_name,
        location: {
          type: "Point",
          coordinates: [parseFloat(place.x), parseFloat(place.y)], // [경도, 위도]
        },
        categoryCode: categoryInfo.code,
        categoryName: categoryInfo.name,
      });
    }

    // 2. 좌표 → 주소 변환 fallback
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
      const simplifiedAddress = roadName && roadName.trim() !== "" 
        ? roadName 
        : jibunFull 
          ? jibunFull.split(" ").slice(-2).join(" ") 
          : "위치 정보 없음";

      return NextResponse.json<LocationResponse>({
        kakaoPlaceId: null,
        placeName: simplifiedAddress,
        location: {
          type: "Point",
          coordinates: [parseFloat(x), parseFloat(y)],
        },
        categoryCode: null,
        categoryName: null,
      });
    }

    return NextResponse.json<LocationResponse>({
      kakaoPlaceId: null,
      placeName: "위치 정보 없음",
      location: {
        type: "Point",
        coordinates: [parseFloat(x), parseFloat(y)],
      },
      categoryCode: null,
      categoryName: null,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '위치 정보를 가져오는 중 오류가 발생했습니다.' }, { status: 500 });
  }
}