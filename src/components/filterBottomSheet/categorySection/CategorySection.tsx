"use client";

import { flexCol, flexRow, flexRowCenter } from "@/mixin/style";
import Image from "next/image";
import { CategoryIconButton } from "soridam-design-system";
import { options, labelToCategoryMap } from "./Category";
import { categoryMap, useFilterDataStore } from "@/store/filter/useFilterDataStore";

export default function CategorySection({onClose}: {onClose: () => void}) {
  const { tempCategories, toggleCategory } = useFilterDataStore();

  return (
    <section className={`w-full ${flexCol} gap-[1.375rem]`}>
      {/* 제목 + 중복선택 표시 */}
      <div className={`w-full h-[2rem] ${flexRow} items-end justify-between`}>
        <div className={`${flexRow} gap-[0.6875rem]`}>
          <p className="text-base !font-medium text-neutral-black">
            카테고리를 골라주세요.
          </p>
          <p className={`text-[#757575] text-sm ${flexRowCenter}`}>
            중복선택 가능
          </p>
        </div>
        <button onClick={onClose} className="w-8 h-8 relative">
          <Image src="/icons/filter/close.svg" alt="close button" fill />
        </button>
      </div>

      {/* 옵션 목록 */}
      <div className={`${flexRow} overflow-x-auto whitespace-nowrap w-full`}>
        <ul className={`${flexRow} items-center gap-2`}>
          {options.map((option) => {
            const category = labelToCategoryMap[option.label]; // "cafe" | "cutlery" ...
            const categoryCode = categoryMap[category];        // "CE7" | "FD6" ...
            return (
              <li key={option.label} className="inline-block">
                <CategoryIconButton
                  label={option.label}
                  iconSrc={option.iconSrc}
                  active={tempCategories.includes(categoryCode)}
                  onClick={() => toggleCategory(category)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
