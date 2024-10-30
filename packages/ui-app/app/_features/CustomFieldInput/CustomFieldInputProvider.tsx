import { ReactNode } from "react";
import { CustomFieldInputContext } from "./context";

export default function CustomFieldInputProvider({ children, onChange }: { children: ReactNode, onChange?: (value: string) => void }) {

  const onChangeHandler = (val: string) => {
    onChange && onChange(val)
  }

  return <CustomFieldInputContext.Provider value={{
    onChange: onChangeHandler
  }}>
    {children}
  </CustomFieldInputContext.Provider>
}
