import { useLocationStore } from "@/entities/location/model/store/locationStore";

export function useRegisterLocationUpdate() {
    const setLocation = useLocationStore((s) => s.setLocation);

    return async (lat: number, lng: number) => {
        const res = await fetch(`/api/location?x=${lng}&y=${lat}`);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error ?? "장소 정보 가져오기 실패");
        }

        setLocation(data);
    };
}
