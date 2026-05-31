"use client";

import Image from "next/image";

interface Props {
    onClick: () => void;
}

const LocateButton = ({ onClick }: Props) => {
    return (
        <button
            className="absolute bottom-2 right-2 bg-white shadow-md rounded-full p-2 z-[10]"
            onClick={onClick}
        >
            <Image
                src="/icons/locate-ico.webp"
                alt="내 위치로 이동"
                width={24}
                height={24}
                priority
            />
        </button>
    );
};

export default LocateButton;
