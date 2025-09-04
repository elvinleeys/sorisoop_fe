import MeasureTime from "../measureInfo/measureTime/MeasureTime";

export default function MeasurementCard() {
    return (
        <div 
            className="
                w-full
                h-[27.75rem]
                pt-[0.875rem]
                px-[1rem] 
                pb-[1.0625rem]
                rounded-[1rem]
                bg-[#F4F4F4]
                border-2 
                border-[#D7D7D7]
            "
        >
            <MeasureTime />
        </div>
    );
}