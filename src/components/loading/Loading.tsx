"use client";

import { motion } from "framer-motion";

const delays = [0.1, 0.2, 0.3];

interface LoadingProps {
  text?: string; // optional, 기본값 설정 가능
}

const Loading: React.FC<LoadingProps> = ({ 
    text = "Loading..." 
}) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col justify-center items-center w-100% h-100% bg-white">
            <div className="w-25 flex justify-between mb-8">
                {delays.map((delay, idx) => (
                    <motion.div
                        key={idx}
                        className="w-4 h-4 bg-primary rounded-full"
                        animate={{ y: [0, 15, 0] }}
                        transition={{
                            y: {
                                duration: 0.6,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "linear",
                                delay,
                            },
                        }}
                    />
                ))}
            </div>
            <p className="text-base text-center text-neutral-gray">
                {text}
            </p>
        </div>
    );
}

export default Loading;