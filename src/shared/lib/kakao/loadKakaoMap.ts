let kakaoMapPromise: Promise<void> | null = null;

export const loadKakaoMap = () => {
    if (window.kakao?.maps) {
        return Promise.resolve();
    }

    if (kakaoMapPromise) {
        return kakaoMapPromise;
    }

    kakaoMapPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");

        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services&autoload=false`;

        script.async = true;

        script.onload = () => {
            window.kakao.maps.load(() => {
                resolve();
            });
        };

        script.onerror = reject;

        document.head.appendChild(script);
    });

    return kakaoMapPromise;
};
