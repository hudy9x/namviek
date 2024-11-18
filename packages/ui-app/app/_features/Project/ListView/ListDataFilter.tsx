import DataFetcher from "@/components/DataFetcher";
import { useFilterAdvancedStore } from "@/features/FilterAdvanced/store";
import { ReactNode } from "react";

export default function ListDataFilter({ children }: { children: ReactNode }) {
  const filter = useFilterAdvancedStore(state => state.filter)

  console.log('update filter', filter)

  return <DataFetcher
    filter={filter}
    initialCursor={''}>
    {children}
  </DataFetcher>
}
