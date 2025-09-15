import DeleteModal from "@/components/modal/deleteModal/DeleteModal";
import SaveDetailMap from "@/components/saveDetail/mapSection/SaveDetailMap";
import ResultDetail from "@/components/saveDetail/resultDetail/ResultDetail";

export default function SaveDetail() {
    const avgDecibel = 30; 

    return (
        <>
            <SaveDetailMap avgDecibel={avgDecibel} lat={37.554722} lng={126.970833} />
            <ResultDetail />
            <DeleteModal />
        </>
    );
}