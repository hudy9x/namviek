import DataFetcher from "@/components/DataFetcher";
import { useFilterAdvancedStore } from "@/features/FilterAdvanced/store";
import { ReactNode } from "react";

export default function GridDataFilter({ children }: { children: ReactNode }) {
  const filter = useFilterAdvancedStore(state => state.filter)

  return <DataFetcher
    limit={5}
    filter={filter}
    initialCursor={''}>
    {children}
  </DataFetcher>
}
