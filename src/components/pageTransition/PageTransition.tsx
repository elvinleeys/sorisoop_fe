"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navOrder = ['/', '/map', '/save'];

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const prevIndexRef = useRef(0);
    const [direction, setDirection] = useState(1);

    const currentIndex = navOrder.indexOf(pathname);

    // pathname 변경 시 direction 계산
    useEffect(() => {
        setDirection(currentIndex >= prevIndexRef.current ? 1 : -1);
        prevIndexRef.current = currentIndex; // 여기서 업데이트
    }, [currentIndex]);

    const isRoot = pathname === '/'; // 루트 경로는 애니메이션 제거 가능

    return (
        <div className="relative w-full h-full overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={pathname}
                    initial={isRoot ? {} : { opacity: 0, x: 100 * direction + '%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={isRoot ? {} : { opacity: 0, x: -100 * direction + '%' }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}