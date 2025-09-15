import { ReactNode } from "react";

interface SaveLayoutProps {
  children: ReactNode;
}

export default function SaveLayout({ children }: SaveLayoutProps) {
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
        {children}
    </div>
  );
}