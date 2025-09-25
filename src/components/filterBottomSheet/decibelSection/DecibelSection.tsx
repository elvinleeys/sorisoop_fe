"use client";

import { flexCol, flexRow, flexRowCenter } from "@/mixin/style";
import { useFilterDataStore } from "@/store/filter/useFilterDataStore";
import { DecibelButton } from "soridam-design-system";
import { options } from "./Decibel";

export default function DecibelSection() {
  const { selectedNoiseLevels, toggleNoiseLevel } = useFilterDataStore();

  return (
    <div className={`${flexCol} gap-5`}>
      <div className={`${flexRow} gap-2`}>
        <p className="font-medium text-base text-neutral-black">
          소음 수준
        </p>
        <p className={`text-[#757575] text-sm ${flexRowCenter}`}>
          중복선택 가능
        </p>
      </div>

      {/* 옵션 목록 */}
      <ul className={`${flexCol} gap-4`}>
        {options.map((option, index) => (
          <li key={option.label} className={`${flexRow} items-center`}>
            <DecibelButton
              label={option.label}
              level={option.decibelLv}
              active={selectedNoiseLevels.includes(option.decibelLv)}
              onClick={() => toggleNoiseLevel(option.decibelLv)}
            />
            {index === 0 && (
              <span
                className={`ml-2 text-[#757575] text-sm ${flexRowCenter}`}
              >
                기본값
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
