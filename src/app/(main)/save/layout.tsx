import { flexCol } from "@/mixin/style";
import { SaveHeader } from "@/components/header";
import { SideBar } from "@/app/DynamicImport";
import SaveMainPage from "@/components/save/SaveMainPage";

interface SaveLayoutProps {
  guest: React.ReactNode;
  authenticated: React.ReactNode;
}

export default  function SaveLayout({
  guest,
  authenticated,
}: SaveLayoutProps) {
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
          <SaveMainPage guest={guest} authenticated={authenticated} />
        </main>
        <div id="sidebar"></div>
        <SideBar />
    </div>
  );
}