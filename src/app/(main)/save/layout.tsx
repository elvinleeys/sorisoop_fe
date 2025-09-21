import { SaveHeader } from "@/components/header";
import { flexCol } from "@/mixin/style";

interface SaveLayoutProps {
  main: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function SaveLayout({ 
  main,
  sidebar, 
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
                overflow-y-scroll
            `}
        >
            {main}
        </main>
        {sidebar}
    </div>
  );
}