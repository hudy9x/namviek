
import { ReportSavedListProvider } from "./context";
import AddToSavedList from "./AddToSavedList";
import SavedList from "./SavedList";
import SetDefaultConfig from "./SetDefaultConfig";

export default function ReportSavedListContainer() {

  return <ReportSavedListProvider>
    <AddToSavedList />
    <SavedList />
    <SetDefaultConfig />
  </ReportSavedListProvider>
}
