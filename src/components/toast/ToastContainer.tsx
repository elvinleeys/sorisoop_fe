"use client";

import { flexColCenter } from "@/mixin/style";
import { useToastStore } from "@/store/toast/useToastStore";
import { AnimatePresence, motion } from "framer-motion";

export default function ToastContainer() {
    const toasts = useToastStore((state) => state.toasts);

    return (
        <div className={`${flexColCenter} fixed bottom-12 left-1/2 transform -translate-x-1/2 z-[700] gap-2 sm:bottom-6 sm:left-auto sm:right-6`}>
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={() => useToastStore.getState().removeToast(toast.id)}
                        className="
                            min-w-[21.8125rem] 
                            max-w-[21.8125rem]
                            p-2.5
                            rounded-[0.5rem] 
                            bg-[#474747]
                            opacity-80 
                            text-white
                            text-base
                            !font-bold
                            text-center
                        "
                    >
                        {toast.message}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
