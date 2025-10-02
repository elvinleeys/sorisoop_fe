import { SaveHeader } from "@/components/header";
import SideBar from "@/components/sideBar/SideBar";
import { flexCol } from "@/mixin/style";

interface SaveLayoutProps {
  children: React.ReactNode;
}

export default function SaveLayout({ children }: SaveLayoutProps) {
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
        <SaveHeader />
        <main 
            className={`
                ${flexCol}
                gap-[0.75rem]
                w-full 
                h-full
                pr-[1.3125rem] 
                pl-[1.375rem]
                pb-[7rem]
                overflow-y-scroll
            `}
        >
            {children}
        </main>
        <div id="sidebar"></div>
        <SideBar />
    </div>
  );
}