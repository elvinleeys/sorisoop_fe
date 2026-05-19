import { useQuery } from "@tanstack/react-query";
import { fetchLocation } from "../../api/fetchLocation";
import { useEffect } from "react";
import { useLocationStore } from "../store/locationStore";
import { getCurrentPosition } from "../../lib/geolocation";

export function useCurrentLocationQuery() {
    const setLocation = useLocationStore((s) => s.setLocation);

    const geo = useQuery({
        queryKey: ["geo"],
        queryFn: getCurrentPosition,
    });

    const lat = geo.data?.coords.latitude;
    const lng = geo.data?.coords.longitude;

    const kakao = useQuery({
        queryKey: ["location", lat, lng],
        queryFn: () => fetchLocation(lat!, lng!),
        enabled: !!lat && !!lng,
    });

    useEffect(() => {
        if (kakao.isSuccess && kakao.data) {
            setLocation({
                kakaoPlaceId: kakao.data.kakaoPlaceId,
                placeName: kakao.data.placeName,
                location: kakao.data.location,
                categoryCode: kakao.data.categoryCode,
                categoryName: kakao.data.categoryName,
            });
        }
    }, [kakao.data]);

    return kakao;
}
