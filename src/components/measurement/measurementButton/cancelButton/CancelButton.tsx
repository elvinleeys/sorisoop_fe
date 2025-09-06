"use client";

import { flexRowCenter } from "@/mixin/style";
import { motion } from "framer-motion";
import { Button } from "soridam-design-system";

export default function CancelButton() {
    return (
        <motion.div
            key="cancel-alone"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className={`${flexRowCenter} w-full`}
        >
            <Button buttonType="secondary" size="large">
                측정 취소
            </Button>
        </motion.div>
    );
}