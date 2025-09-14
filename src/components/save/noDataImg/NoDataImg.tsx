import Image from "next/image";

export default function NoDataImg() {
    return (
        <div className="w-[15.8125rem] h-[10.875rem] relative">
            <Image src="icons/no-data.svg" alt="no data" fill priority />
        </div>
    );
}