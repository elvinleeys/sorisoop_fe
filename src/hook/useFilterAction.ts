import { useFilterUIStore } from "@/store/filter/useFilterUIStore";
import { useFilterDataStore } from "@/store/filter/useFilterDataStore";

export function useFilterActions() {
  const close = useFilterUIStore((state) => state.close);
  const resetFilters = useFilterDataStore((state) => state.resetFilters);

  const closeWithReset = () => {
    resetFilters();
    close();
  };

  return { closeWithReset };
}