import { SaveHeader } from "@/components/header";
import GuestNoiseDataView from "@/components/save/guestNoiseDataView/GuestNoiseDataView";
import NoData from "@/components/save/noData/NoData";
import SaveResult from "@/components/save/saveResult/SaveResult";
import { flexCol } from "@/mixin/style";

export default function SavePage() {
    return (
        <>
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
                <SaveResult id="1" />
            </main>
        </>
    );
}