import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    "./node_modules/soridam-design-system/**/*.{js,ts,jsx,tsx}",
    // 추가적인 경로를 포함시킬 수 있습니다.
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config;