import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/soridam-design-system/**/*.{js,ts,jsx,tsx}",
        // 추가적인 경로를 포함시킬 수 있습니다.
    ],
    theme: {
        extend: {
            animation: {
                shimmer: "shimmer 2s infinite",
                barBounce: "barBounce 0.9s ease-in-out infinite",
            },
            keyframes: {
                shimmer: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(300%)" },
                },
                barBounce: {
                    "0%, 100%": { transform: "scaleY(0.4)" },
                    "50%": { transform: "scaleY(1)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
