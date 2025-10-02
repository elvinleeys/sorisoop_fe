"use client";

import Link from "next/link";
import { useToastStore } from "@/store/toast/useToastStore";

interface SideBarItemProps {
    label: string;
    path?: string; // 경로 있으면 Link, 없으면 Toast
    onClick?: () => void;
    className?: string;
}

export default function SideBarItem({ label, path, onClick, className }: SideBarItemProps) {
    const addToast = useToastStore((s) => s.addToast);

    const baseClass = `text-sm text-left w-full`;

    if (onClick) {
        return (
            <button
                onClick={onClick}
                className={`${baseClass} ${className ?? ""}`}
            >
                {label}
            </button>
        );
    }

    if (path) {
        const isExternal = path.startsWith("http");
        return isExternal ? (
            <a
                href={path}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseClass} ${className ?? ""}`}
            >
                {label}
            </a>
        ) : (
            <Link href={path} className={`${baseClass} ${className ?? ""}`}>
                {label}
            </Link>
        );
    }

    return (
        <button
            onClick={() => addToast(`${label}은 준비 중인 서비스입니다.`)}
            className={`${baseClass} ${className ?? ""}`}
        >
            {label}
        </button>
    );
}