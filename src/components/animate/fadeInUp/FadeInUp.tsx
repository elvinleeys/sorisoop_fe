import { AnimatePresence, motion } from "framer-motion";

interface FadeInUpProps {
  children: React.ReactNode;
  keyProp: string;
  className?: string; // 추가
}

export default function FadeInUp({ 
    children, 
    keyProp ,
    className = ""
}: FadeInUpProps) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={keyProp}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className={className}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}