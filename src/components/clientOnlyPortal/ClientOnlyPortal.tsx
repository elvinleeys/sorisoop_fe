"use client";

import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ClientOnlyPortalProps {
    children: ReactNode;
    containerId: string; // portal을 붙일 root의 id
}

export default function ClientOnlyPortal({ children, containerId }: ClientOnlyPortalProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    const container = document.getElementById(containerId);
    if (!container) return null;

    return createPortal(children, container);
}