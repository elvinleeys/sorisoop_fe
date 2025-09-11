import type { Metadata } from "next";
import "./globals.css";
import 'soridam-design-system/styles';
import InfoModal from "@/components/modal/infoModal/InfoModal";
import BackModal from "@/components/modal/backModal/BackModal";

export const metadata: Metadata = {
  title: 'Soridam Noise Map', // 사이트 기본 제목
  description: '소음 측정 데이터를 지도에 시각화하고 저장할 수 있는 서비스',
};

export default function RootLayout({ 
  children 
}: Readonly<{ children: React.ReactNode; }>) {
  
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="bg-white antialiased">
          <div id="modal" className="relative z-[9999]"></div>
          {children}
          <InfoModal />
          <BackModal />
      </body>
    </html>
  );
}
