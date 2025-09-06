"use client";

import { flexCol } from "@/mixin/style";
import { motion } from "framer-motion";
import { Button } from "soridam-design-system";

export default function PostMeasurementBtn() {
    return (
        <div 
            key="save-cancel-group" 
            className={`
                ${flexCol} 
                gap-[0.375rem] 
                w-full
                items-center
            `}
        >
            <motion.div
              key="save"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }} // 딜레이를 줘서 순차적으로 올라오게 할 수 있습니다
            >
              <Button buttonType="primary" size="large">
                측정 저장
              </Button>
            </motion.div>
            <motion.div
              key="cancel-save"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Button buttonType="ghost" size="large">
                측정 취소
              </Button>
            </motion.div>
        </div>
    );
}