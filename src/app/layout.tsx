import type { Metadata } from "next";
import "./globals.css";
import 'soridam-design-system/styles';
import { ToastContainer, UnifiedModalRenderer } from './DynamicImport';
import { Provider } from "./QueryClientProvider";

export const metadata: Metadata = {
  title: "SORIDAM",
  description: "소음 데이터를 측정하고 지도에 시각화하여 보여주는 페이지입니다.",
  openGraph: {
    title: "SORIDAM | 소음 지도 시각화 플랫폼",
    description: "소음 데이터를 측정하고 지도에 시각화하여 보여주는 서비스입니다.",
    type: "website",
    // 배포 전이라면 절대 URL 대신 상대경로 사용 가능 (Next.js가 public 기준으로 처리)
    images: [
      {
        url: "/icons/logo.webp",
        width: 1200,
        height: 630,
        alt: "SORIDAM Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SORIDAM",
    description: "소음 데이터를 측정하고 지도에 시각화하여 보여주는 페이지입니다.",
    images: ["/icons/logo.webp"],
  },
  // 배포 시 아래 추가
  // metadataBase: new URL("https://soridam.site"),
};

export default function RootLayout({ 
  children 
}: Readonly<{ children: React.ReactNode; }>) {
  
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
      </head>
      <body className="bg-white antialiased">
          <Provider>
            <div id="modal"></div>
            {children}
            <UnifiedModalRenderer />
            <ToastContainer />
          </Provider>
      </body>
    </html>
  );
}
